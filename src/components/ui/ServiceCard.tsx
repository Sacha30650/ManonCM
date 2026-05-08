"use client";

import { motion } from "framer-motion";

import type { Service } from "@/data/services";

const icons: Record<Service["icon"], React.ReactNode> = {
  palette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0 0 18c1.6 0 2.8-1.2 2.8-2.7 0-.7-.3-1.4-.8-1.9a1.6 1.6 0 0 1 1.1-2.7H17a4 4 0 0 0 4-4c0-3.7-4-6.7-9-6.7Z" />
      <circle cx="7.5" cy="11" r="1.2" fill="currentColor" />
      <circle cx="10" cy="7.5" r="1.2" fill="currentColor" />
      <circle cx="14" cy="7.5" r="1.2" fill="currentColor" />
      <circle cx="17" cy="11" r="1.2" fill="currentColor" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M3 19V5" />
      <path d="M3 19h18" />
      <path d="M7 15l4-4 3 3 6-7" />
      <path d="M14 7h6v6" />
    </svg>
  ),
};

type ServiceCardProps = {
  service: Service;
  index: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full flex-col gap-8 overflow-hidden rounded-sm border border-border bg-surface p-8 transition-colors duration-300 hover:border-accent/60 hover:bg-surface-elevated md:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-accent/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      <header className="flex items-start justify-between">
        <span className="editorial-num text-text-muted transition-colors group-hover:text-accent-soft">
          {String(index + 1).padStart(2, "0")} / {String(3).padStart(2, "0")}
        </span>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-accent transition-colors group-hover:border-accent">
          <div className="h-5 w-5">{icons[service.icon]}</div>
        </div>
      </header>

      <div className="flex flex-col gap-3">
        <h3 className="text-display text-3xl text-text-primary md:text-4xl">{service.title}</h3>
        <div className="h-px w-12 bg-accent" aria-hidden="true" />
      </div>

      <ul className="flex flex-col gap-3 text-[15px] leading-relaxed text-text-secondary">
        {service.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-end justify-between border-t border-border pt-6">
        <span className="text-eyebrow text-text-muted">Tarif</span>
        <span className="font-serif text-xl italic text-accent-soft" style={{ fontFamily: "var(--font-serif)" }}>
          {service.price}
        </span>
      </div>
    </motion.article>
  );
}
