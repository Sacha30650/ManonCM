import { NextResponse } from "next/server";

import { CONTACT_EMAIL, getResend } from "@/lib/resend";
import { contactSchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const result = contactSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      { error: "Champs invalides.", issues: result.error.flatten() },
      { status: 400 },
    );
  }

  const data = result.data;

  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const resend = getResend();

  const subject = `Nouveau message — ${data.projectType} (${data.name})`;
  const text = `Nom: ${data.name}
Email: ${data.email}
Type de projet: ${data.projectType}
Budget: ${data.budget ?? "Non précisé"}

Message:
${data.message}`;

  const html = `
    <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0a0a0a;">
      <h2 style="font-size: 20px; margin: 0 0 16px;">Nouveau message via manon-almu.fr</h2>
      <p style="margin: 0 0 8px;"><strong>Nom :</strong> ${escapeHtml(data.name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email :</strong> ${escapeHtml(data.email)}</p>
      <p style="margin: 0 0 8px;"><strong>Type de projet :</strong> ${escapeHtml(data.projectType)}</p>
      <p style="margin: 0 0 16px;"><strong>Budget :</strong> ${escapeHtml(data.budget ?? "Non précisé")}</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
      <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(data.message)}</p>
    </div>
  `;

  if (!resend) {
    console.warn(
      "[contact] RESEND_API_KEY non configurée — affichage du message en log uniquement.",
    );
    console.info("[contact]", { subject, text });
    return NextResponse.json({ ok: true, fallback: true });
  }

  try {
    const { error } = await resend.emails.send({
      from: "Manon Almu <contact@manon-almu.fr>",
      to: [CONTACT_EMAIL],
      replyTo: data.email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json(
        { error: "Le message n'a pas pu être envoyé. Réessaie ou écris à " + CONTACT_EMAIL + "." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Exception", err);
    return NextResponse.json(
      { error: "Erreur serveur. Réessaie plus tard." },
      { status: 500 },
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
