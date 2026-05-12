"use client";

import { useState } from "react";

import type { HeroData } from "@/data/hero-types";

type Status = { type: "idle" | "saving" | "success" | "error"; message?: string };

const inputClass =
  "w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none";

export function HeroEditor({ initial }: { initial: HeroData }) {
  const [draft, setDraft] = useState<HeroData>(initial);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  function setField<K extends keyof HeroData>(key: K, value: HeroData[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function setStat(i: number, key: "value" | "label", value: string) {
    setDraft((d) => ({
      ...d,
      stats: d.stats.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)),
    }));
  }

  function setSpeciality(i: number, value: string) {
    setDraft((d) => ({
      ...d,
      specialities: d.specialities.map((s, idx) => (idx === i ? value : s)),
    }));
  }

  function addSpeciality() {
    setDraft((d) => ({ ...d, specialities: [...d.specialities, ""] }));
  }

  function removeSpeciality(i: number) {
    setDraft((d) => ({ ...d, specialities: d.specialities.filter((_, idx) => idx !== i) }));
  }

  async function handleSave() {
    setStatus({ type: "saving", message: "Sauvegarde..." });
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "content/hero.json",
          data: draft,
          message: "admin: update hero",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Sauvegarde échouée.");
      setStatus({
        type: "success",
        message: "Sauvegardé. Vercel redéploie sous ~1 minute.",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Sauvegarde échouée.",
      });
    }
  }

  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-border bg-surface p-6 md:p-8">
      <Field
        label="Sur-titre (kicker)"
        hint="Petit texte au-dessus du titre principal"
      >
        <input
          type="text"
          value={draft.kicker}
          onChange={(e) => setField("kicker", e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Titre principal" hint='Ex: "DES VISUELS QUI"'>
          <input
            type="text"
            value={draft.headlinePrimary}
            onChange={(e) => setField("headlinePrimary", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Mot rose accent" hint='Ex: "CONVERTISSENT."'>
          <input
            type="text"
            value={draft.headlineAccent}
            onChange={(e) => setField("headlineAccent", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Sous-titre" hint='Ex: "VOS PROSPECTS EN CLIENTS."'>
        <input
          type="text"
          value={draft.subheadline}
          onChange={(e) => setField("subheadline", e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Paragraphe d'introduction">
        <textarea
          rows={4}
          value={draft.description}
          onChange={(e) => setField("description", e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Bouton principal — texte">
          <input
            type="text"
            value={draft.ctaPrimaryLabel}
            onChange={(e) => setField("ctaPrimaryLabel", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Bouton principal — lien">
          <input
            type="text"
            value={draft.ctaPrimaryHref}
            onChange={(e) => setField("ctaPrimaryHref", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Bouton secondaire — texte">
          <input
            type="text"
            value={draft.ctaSecondaryLabel}
            onChange={(e) => setField("ctaSecondaryLabel", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Bouton secondaire — lien">
          <input
            type="text"
            value={draft.ctaSecondaryHref}
            onChange={(e) => setField("ctaSecondaryHref", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Phrase-signature (italique à droite)" hint='Ex: "Le visuel doit faire vendre, pas juste décorer."'>
        <input
          type="text"
          value={draft.tagline}
          onChange={(e) => setField("tagline", e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="flex flex-col gap-3">
        <span className="text-eyebrow text-text-muted">
          Liste &laquo;&nbsp;Spécialités&nbsp;&raquo; (à droite)
        </span>
        <div className="flex flex-col gap-2">
          {draft.specialities.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={s}
                onChange={(e) => setSpeciality(i, e.target.value)}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeSpeciality(i)}
                className="rounded-full border border-border px-3 py-2 text-xs text-text-secondary transition-colors hover:border-red-500/50 hover:text-red-300"
                aria-label={`Supprimer ${s}`}
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSpeciality}
            className="self-start rounded-full border border-border px-4 py-2 text-eyebrow text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            + Ajouter
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-eyebrow text-text-muted">Statistiques (en bas du Hero)</span>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {draft.stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-xl border border-border bg-background/40 p-3"
            >
              <Field label="Valeur" hint="Ex: 30+">
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => setStat(i, "value", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Libellé" hint="Ex: Clients">
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => setStat(i, "label", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
          ))}
        </div>
      </div>

      {status.message && (
        <p
          role="status"
          className={`rounded-xl border px-4 py-3 text-sm ${
            status.type === "error"
              ? "border-red-500/40 bg-red-500/10 text-red-300"
              : status.type === "success"
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border-border bg-background/50 text-text-secondary"
          }`}
        >
          {status.message}
        </p>
      )}

      <div className="flex justify-end border-t border-border pt-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={status.type === "saving"}
          className="rounded-full bg-accent px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status.type === "saving" ? "Sauvegarde..." : "Sauvegarder l'accueil"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-eyebrow text-text-muted">{label}</span>
      {children}
      {hint && <span className="text-xs text-text-muted">{hint}</span>}
    </label>
  );
}
