import { NextResponse } from "next/server";

import { ADMIN_COOKIE, checkPassword, createToken } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: { password?: string };
  try {
    payload = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const password = (payload.password ?? "").trim();
  if (!password) {
    return NextResponse.json({ error: "Mot de passe requis." }, { status: 400 });
  }
  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE.name,
    value: createToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ADMIN_COOKIE.maxAge,
    path: "/",
  });
  return response;
}
