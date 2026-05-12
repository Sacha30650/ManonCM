import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import { commitTextFile, deleteFile } from "@/lib/admin-github";
import { CONTENT_TAGS } from "@/lib/content-loader";

export const runtime = "nodejs";

const ALLOWED_PATH = /^content\/(hero|pricing|projects\/[a-z0-9-]+)\.json$/;

type SaveBody = {
  path: string;
  data?: unknown;
  delete?: boolean;
  message?: string;
};

function tagsForPath(path: string): { tag: string; pathsToRevalidate: string[] } {
  if (path === "content/hero.json") {
    return { tag: CONTENT_TAGS.hero, pathsToRevalidate: ["/"] };
  }
  if (path === "content/pricing.json") {
    return { tag: CONTENT_TAGS.pricing, pathsToRevalidate: ["/", "/tarifs"] };
  }
  return {
    tag: CONTENT_TAGS.projects,
    pathsToRevalidate: ["/", "/portfolio"],
  };
}

export async function POST(request: Request) {
  const jar = await cookies();
  if (!verifyToken(jar.get(ADMIN_COOKIE.name)?.value)) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  let payload: SaveBody;
  try {
    payload = (await request.json()) as SaveBody;
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const { path, data, message } = payload;
  if (!path || !ALLOWED_PATH.test(path)) {
    return NextResponse.json(
      { error: `Chemin non autorisé: ${path}` },
      { status: 400 },
    );
  }

  try {
    if (payload.delete) {
      await deleteFile(path, message ?? `admin: delete ${path}`);
    } else {
      if (data === undefined) {
        return NextResponse.json({ error: "Aucune donnée fournie." }, { status: 400 });
      }
      const contents = `${JSON.stringify(data, null, 2)}\n`;
      await commitTextFile(path, contents, message ?? `admin: update ${path}`);
    }

    const { tag, pathsToRevalidate } = tagsForPath(path);
    revalidateTag(tag);
    if (path.startsWith("content/projects/")) {
      revalidateTag(CONTENT_TAGS.projectsList);
    }
    for (const p of pathsToRevalidate) {
      revalidatePath(p);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/save] error", err);
    const detail = err instanceof Error ? err.message : "Erreur inconnue.";
    return NextResponse.json(
      { error: `Sauvegarde échouée. ${detail}` },
      { status: 500 },
    );
  }
}
