"use client";

import { useState } from "react";

import type { Pack, UnitItem } from "@/data/pricing-types";

type Status = { type: "idle" | "saving" | "success" | "error"; message?: string };

type PricingData = { packs: Pack[]; unitItems: UnitItem[] };

const inputClass =
  "w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none";

export function PricingEditor({ initial }: { initial: PricingData }) {
  const [draft, setDraft] = useState<PricingData>(initial);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  function setPack(i: number, partial: Partial<Pack>) {
    setDraft((d) => ({
      ...d,
      packs: d.packs.map((p, idx) => (idx === i ? { ...p, ...partial } : p)),
    }));
  }

  function setPackFeature(packIndex: number, featureIndex: number, value: string) {
    setDraft((d) => ({
      ...d,
      packs: d.packs.map((p, idx) =>
        idx === packIndex
          ? {
              ...p,
              features: p.features.map((f, fi) => (fi === featureIndex ? value : f)),
            }
          : p,
      ),
    }));
  }

  function addPackFeature(packIndex: number) {
    setDraft((d) => ({
      ...d,
      packs: d.packs.map((p, idx) =>
        idx === packIndex ? { ...p, features: [...p.features, ""] } : p,
      ),
    }));
  }

  function removePackFeature(packIndex: number, featureIndex: number) {
    setDraft((d) => ({
      ...d,
      packs: d.packs.map((p, idx) =>
        idx === packIndex
          ? { ...p, features: p.features.filter((_, fi) => fi !== featureIndex) }
          : p,
      ),
    }));
  }

  function setUnit(i: number, partial: Partial<UnitItem>) {
    setDraft((d) => ({
      ...d,
      unitItems: d.unitItems.map((u, idx) => (idx === i ? { ...u, ...partial } : u)),
    }));
  }

  function addUnit() {
    setDraft((d) => ({ ...d, unitItems: [...d.unitItems, { label: "", range: "" }] }));
  }

  function removeUnit(i: number) {
    setDraft((d) => ({ ...d, unitItems: d.unitItems.filter((_, idx) => idx !== i) }));
  }

  async function handleSave() {
    setStatus({ type: "saving", message: "Sauvegarde..." });
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "content/pricing.json",
          data: draft,
          message: "admin: update pricing",
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
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-5">
        <h2 className="text-eyebrow text-accent-soft">Packs</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {draft.packs.map((pack, i) => (
            <div
              key={pack.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5"
            >
              <Field label="Nom du pack">
                <input
                  type="text"
                  value={pack.name}
                  onChange={(e) => setPack(i, { name: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Prix" hint='Ex: "120 — 180€" ou "Sur devis"'>
                <input
                  type="text"
                  value={pack.price}
                  onChange={(e) => setPack(i, { price: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Badge (optionnel)" hint='Ex: "Populaire" ou laisse vide'>
                <input
                  type="text"
                  value={pack.badge ?? ""}
                  onChange={(e) =>
                    setPack(i, { badge: e.target.value || undefined })
                  }
                  className={inputClass}
                />
              </Field>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={pack.highlight ?? false}
                  onChange={(e) => setPack(i, { highlight: e.target.checked })}
                  className="h-4 w-4 accent-accent"
                />
                <span className="text-sm text-text-secondary">Pack mis en avant</span>
              </label>

              <div className="flex flex-col gap-2">
                <span className="text-eyebrow text-text-muted">Contenu du pack</span>
                {pack.features.map((feat, fi) => (
                  <div key={fi} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => setPackFeature(i, fi, e.target.value)}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => removePackFeature(i, fi)}
                      className="rounded-full border border-border px-3 py-2 text-xs text-text-secondary transition-colors hover:border-red-500/50 hover:text-red-300"
                      aria-label="Supprimer"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addPackFeature(i)}
                  className="self-start rounded-full border border-border px-3 py-1.5 text-eyebrow text-text-secondary transition-colors hover:border-accent hover:text-accent"
                >
                  + Ajouter
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-eyebrow text-accent-soft">Création à l&apos;unité</h2>
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
          {draft.unitItems.map((unit, i) => (
            <div key={i} className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end">
              <Field label="Prestation">
                <input
                  type="text"
                  value={unit.label}
                  onChange={(e) => setUnit(i, { label: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Fourchette de prix">
                <input
                  type="text"
                  value={unit.range}
                  onChange={(e) => setUnit(i, { range: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <button
                type="button"
                onClick={() => removeUnit(i)}
                className="h-fit rounded-full border border-border px-3 py-2 text-xs text-text-secondary transition-colors hover:border-red-500/50 hover:text-red-300"
                aria-label="Supprimer"
              >
                Supprimer
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addUnit}
            className="self-start rounded-full border border-border px-4 py-2 text-eyebrow text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            + Ajouter une prestation
          </button>
        </div>
      </section>

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
          {status.type === "saving" ? "Sauvegarde..." : "Sauvegarder les tarifs"}
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
