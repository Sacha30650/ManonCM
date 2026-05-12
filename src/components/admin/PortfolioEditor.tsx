"use client";

import { useRef, useState } from "react";

import type { Project, ProjectCategory } from "@/data/project-types";
import { categoryLabels } from "@/data/project-types";

type Status = { type: "idle" | "saving" | "uploading" | "success" | "error"; message?: string };

const CATEGORY_OPTIONS: ProjectCategory[] = ["event", "fitness", "food", "coaching"];
const SIZE_OPTIONS = ["square", "wide", "tall"] as const;

export function PortfolioEditor({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editing, setEditing] = useState<string | null>(null);

  function updateLocal(oldSlug: string, updated: Project) {
    setProjects((curr) => curr.map((p) => (p.slug === oldSlug ? updated : p)));
    if (updated.slug !== oldSlug) setEditing(updated.slug);
  }

  function removeLocal(slug: string) {
    setProjects((curr) => curr.filter((p) => p.slug !== slug));
  }

  function addNew() {
    const slug = `nouveau-projet-${Date.now()}`;
    const draft: Project = {
      slug,
      title: "Nouveau projet",
      client: "",
      category: "event",
      categoryLabel: categoryLabels.event,
      year: String(new Date().getFullYear()),
      description: "",
      cover: "/projects/711-rock-vs-sbk.jpg",
      size: "square",
      order: Math.max(0, ...projects.map((p) => p.order ?? 0)) + 10,
    };
    setProjects((curr) => [...curr, draft]);
    setEditing(slug);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-text-secondary">
          {projects.length} projet{projects.length > 1 ? "s" : ""} · Clique sur un projet pour
          le modifier.
        </p>
        <button
          type="button"
          onClick={addNew}
          className="rounded-full bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-accent-hover"
        >
          + Nouveau projet
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            open={editing === project.slug}
            onToggle={() => setEditing((c) => (c === project.slug ? null : project.slug))}
            onChange={(updated) => updateLocal(project.slug, updated)}
            onDelete={() => removeLocal(project.slug)}
          />
        ))}
      </div>
    </div>
  );
}

type ProjectCardProps = {
  project: Project;
  open: boolean;
  onToggle: () => void;
  onChange: (p: Project) => void;
  onDelete: () => void;
};

function ProjectCard({ project, open, onToggle, onChange, onDelete }: ProjectCardProps) {
  const [draft, setDraft] = useState<Project>(project);
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const fileInput = useRef<HTMLInputElement | null>(null);

  function setField<K extends keyof Project>(key: K, value: Project[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus({ type: "uploading", message: "Upload en cours..." });
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", "projects");
      form.append("slug", draft.slug);
      const res = await fetch("/api/admin/upload-image", { method: "POST", body: form });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Upload échoué.");
      }
      setField("cover", data.url);
      setStatus({
        type: "success",
        message: "Image uploadée. N'oublie pas de sauvegarder.",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Upload échoué.",
      });
    } finally {
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  async function handleSave() {
    let toSave = draft;
    if (draft.slug.startsWith("nouveau-projet-")) {
      const generated = slugify(draft.title);
      if (generated) {
        toSave = { ...draft, slug: generated };
        setDraft(toSave);
      }
    }
    setStatus({ type: "saving", message: "Sauvegarde..." });
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: `content/projects/${toSave.slug}.json`,
          data: toSave,
          message: `admin: update project ${toSave.slug}`,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Sauvegarde échouée.");
      onChange(toSave);
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

  async function handleDelete() {
    if (!window.confirm(`Supprimer le projet "${draft.title}" ?`)) return;
    setStatus({ type: "saving", message: "Suppression..." });
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: `content/projects/${draft.slug}.json`,
          delete: true,
          message: `admin: delete project ${draft.slug}`,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Suppression échouée.");
      onDelete();
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Suppression échouée.",
      });
    }
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface">
      <button
        type="button"
        onClick={onToggle}
        className="block w-full text-left"
        aria-expanded={open}
      >
        <div
          className="aspect-[4/3] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${draft.cover})` }}
          aria-hidden="true"
        />
        <div className="flex flex-col gap-1 p-4">
          <span className="text-eyebrow text-accent-soft">{draft.categoryLabel}</span>
          <h3 className="text-base font-semibold text-text-primary">{draft.title}</h3>
          <p className="text-xs text-text-muted">{draft.client}</p>
        </div>
      </button>

      {open && (
        <div className="flex flex-col gap-5 border-t border-border bg-background/40 p-5">
          <Field label="Photo">
            <div className="flex flex-col gap-2">
              <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent/20">
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />
                Changer la photo
              </label>
              <p className="text-xs text-text-muted">
                JPG / PNG / WebP · max 4,5 Mo · idéal {">"}1200 px
              </p>
            </div>
          </Field>

          <Field label="Titre">
            <input
              type="text"
              value={draft.title}
              onChange={(e) => setField("title", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Client">
            <input
              type="text"
              value={draft.client}
              onChange={(e) => setField("client", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Description">
            <textarea
              rows={3}
              value={draft.description}
              onChange={(e) => setField("description", e.target.value)}
              className={`${inputClass} resize-y`}
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Catégorie">
              <select
                value={draft.category}
                onChange={(e) => {
                  const cat = e.target.value as ProjectCategory;
                  setDraft((d) => ({
                    ...d,
                    category: cat,
                    categoryLabel: categoryLabels[cat],
                  }));
                }}
                className={inputClass}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {categoryLabels[c]}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Année">
              <input
                type="text"
                value={draft.year}
                onChange={(e) => setField("year", e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Taille">
              <select
                value={draft.size ?? "square"}
                onChange={(e) =>
                  setField("size", e.target.value as Project["size"])
                }
                className={inputClass}
              >
                {SIZE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s === "wide" ? "Large" : s === "tall" ? "Hauteur" : "Carré"}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Ordre d'affichage (plus petit = en premier)">
            <input
              type="number"
              value={draft.order ?? 0}
              onChange={(e) =>
                setField("order", Number(e.target.value) || 0)
              }
              className={inputClass}
            />
          </Field>

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

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-full border border-red-500/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-300 transition-colors hover:bg-red-500/10"
            >
              Supprimer
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={status.type === "saving" || status.type === "uploading"}
              className="rounded-full bg-accent px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status.type === "saving" ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-eyebrow text-text-muted">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
