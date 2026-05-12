import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import { commitBinaryFile } from "@/lib/admin-github";

export const runtime = "nodejs";
export const maxDuration = 30;

const ALLOWED_FOLDERS = ["projects", "uploads"] as const;
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);
const MAX_BYTES = 4_500_000; // ~4.5 MB to stay under Vercel serverless limit

function safeFileName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: Request) {
  const jar = await cookies();
  if (!verifyToken(jar.get(ADMIN_COOKIE.name)?.value)) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const folder = String(form.get("folder") ?? "projects");
  const slugInput = String(form.get("slug") ?? "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Fichier manquant." }, { status: 400 });
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      { error: `Format non supporté (${file.type}). Utilise JPG, PNG ou WebP.` },
      { status: 400 },
    );
  }
  if (!ALLOWED_FOLDERS.includes(folder as (typeof ALLOWED_FOLDERS)[number])) {
    return NextResponse.json(
      { error: `Dossier non autorisé : ${folder}` },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `Fichier trop lourd (${Math.round(file.size / 1024)} KB). Max 4500 KB.` },
      { status: 400 },
    );
  }

  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const base = slugInput
    ? safeFileName(slugInput)
    : safeFileName(file.name.replace(/\.[^.]+$/, ""));
  const fileName = `${base}.${ext}`;
  const path = `public/${folder}/${fileName}`;
  const publicUrl = `/${folder}/${fileName}`;

  try {
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    await commitBinaryFile(path, base64, `admin: upload ${fileName}`);
    return NextResponse.json({ ok: true, url: publicUrl, path });
  } catch (err) {
    console.error("[admin/upload-image] error", err);
    const detail = err instanceof Error ? err.message : "Erreur inconnue.";
    return NextResponse.json(
      { error: `Upload échoué. ${detail}` },
      { status: 500 },
    );
  }
}
