"use client";

import { motion } from "framer-motion";

import type { Project } from "@/data/project-types";

const sizeClasses: Record<NonNullable<Project["size"]>, string> = {
  wide: "md:col-span-2 aspect-[16/10]",
  tall: "md:row-span-2 aspect-[3/4]",
  square: "aspect-square",
};

type ProjectCardProps = {
  project: Project;
  onClick?: (project: Project) => void;
};

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const sizeClass = project.size ? sizeClasses[project.size] : "aspect-[4/5]";

  return (
    <motion.button
      type="button"
      onClick={() => onClick?.(project)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative block w-full overflow-hidden rounded-sm border border-border bg-surface text-left transition-colors duration-300 hover:border-accent/50 ${sizeClass}`}
    >
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255,107,157,0.15), rgba(20,20,20,0.55) 60%), url(${project.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col justify-end p-6 md:p-7">
        <span className="text-eyebrow text-accent-soft">
          {project.categoryLabel} · {project.year}
        </span>
        <h3 className="mt-3 text-display text-2xl text-text-primary md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">{project.client}</p>

        <div className="mt-4 max-h-0 overflow-hidden text-sm leading-relaxed text-text-secondary opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
          {project.description}
        </div>
      </div>
    </motion.button>
  );
}
