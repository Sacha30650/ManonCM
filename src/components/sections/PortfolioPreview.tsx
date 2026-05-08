import Link from "next/link";

import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export function PortfolioPreview() {
  const featured = projects.slice(0, 6);

  return (
    <section id="portfolio" className="section-padding-lg relative bg-surface">
      <div className="container-page flex flex-col gap-16">
        <FadeInWhenVisible className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-20">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span className="accent-rule" aria-hidden="true" />
              <span className="text-eyebrow text-text-muted">03 — Portfolio</span>
            </div>
            <h2 className="text-display text-section text-text-primary">
              Des marques qui{" "}
              <span className="font-serif italic text-accent" style={{ fontFamily: "var(--font-serif)" }}>
                assument
              </span>{" "}
              leur image.
            </h2>
          </div>
          <div className="flex items-end justify-between gap-6 lg:pb-3">
            <p className="max-w-md text-base leading-relaxed text-text-secondary md:text-lg">
              Une sélection de projets récents — événementiel, fitness, food, coaching.
            </p>
            <Link
              href="/portfolio"
              className="group inline-flex shrink-0 items-center gap-2 text-eyebrow text-accent-soft transition-colors hover:text-accent"
            >
              Tout voir
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </FadeInWhenVisible>

        <div className="grid auto-rows-[260px] grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
