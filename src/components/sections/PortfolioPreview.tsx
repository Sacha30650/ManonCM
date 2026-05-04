import Link from "next/link";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function PortfolioPreview() {
  const featured = projects.slice(0, 6);

  return (
    <section id="portfolio" className="section-padding relative bg-surface">
      <div className="container-page flex flex-col gap-14">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            kicker="Portfolio"
            title="Des marques qui assument leur image."
            description="Une sélection de projets récents — événementiel, fitness, food, coaching."
          />
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent-soft transition-colors hover:text-accent"
          >
            Voir tout le portfolio
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid auto-rows-[260px] grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
