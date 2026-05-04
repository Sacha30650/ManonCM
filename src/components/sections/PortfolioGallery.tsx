"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { categoryLabels, projects, type Project, type ProjectCategory } from "@/data/projects";

type Filter = "all" | ProjectCategory;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "event", label: categoryLabels.event },
  { id: "fitness", label: categoryLabels.fitness },
  { id: "food", label: categoryLabels.food },
  { id: "coaching", label: categoryLabels.coaching },
];

export function PortfolioGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {filters.map((f) => {
          const isActive = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                isActive
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-transparent text-text-secondary hover:border-accent hover:text-accent"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <motion.div
        layout
        className="mt-12 grid auto-rows-[260px] grid-cols-1 gap-4 md:grid-cols-3 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} onClick={setActive} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 px-6 py-12 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface md:grid-cols-[1.4fr_1fr]"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Fermer"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-text-primary transition-colors hover:border-accent hover:text-accent"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>

              <div
                className="aspect-[4/3] md:aspect-auto"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(255,107,157,0.15), rgba(20,20,20,0.6) 60%), url(${active.cover})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                aria-hidden="true"
              />

              <div className="flex flex-col gap-4 p-8 md:p-10">
                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent-soft">
                  {active.categoryLabel} · {active.year}
                </span>
                <h3 className="text-display text-3xl text-text-primary md:text-4xl">
                  {active.title}
                </h3>
                <p className="text-sm uppercase tracking-[0.18em] text-accent">{active.client}</p>
                <p className="text-base text-text-secondary md:text-lg">{active.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
