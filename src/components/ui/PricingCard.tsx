"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import type { Pack } from "@/data/pricing";

type PricingCardProps = {
  pack: Pack;
  index: number;
};

export function PricingCard({ pack, index }: PricingCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex h-full flex-col gap-8 overflow-hidden rounded-sm border p-8 transition-colors duration-300 md:p-10 ${
        pack.highlight
          ? "border-accent/70 bg-surface-elevated"
          : "border-border bg-surface hover:border-accent/40 hover:bg-surface-elevated"
      }`}
    >
      {pack.highlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-transparent"
        />
      )}

      <header className="relative flex items-start justify-between">
        <span className="editorial-num text-text-muted">
          {String(index + 1).padStart(2, "0")} / {String(3).padStart(2, "0")}
        </span>
        {pack.badge && (
          <span className="rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
            {pack.badge}
          </span>
        )}
      </header>

      <div className="relative flex flex-col gap-4">
        <h3 className="text-display text-3xl text-text-primary md:text-4xl">{pack.name}</h3>
        <div className="h-px w-12 bg-accent" aria-hidden="true" />
        <p className="font-display text-5xl text-accent md:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
          {pack.price}
        </p>
      </div>

      <ul className="relative flex flex-1 flex-col gap-3 text-[15px] leading-relaxed text-text-secondary">
        {pack.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mt-1 shrink-0 text-accent"
              aria-hidden="true"
            >
              <path d="M5 12l4 4 10-10" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <div className="relative">
        <Button as="link" href="/contact" variant={pack.highlight ? "primary" : "secondary"}>
          Choisir ce pack
        </Button>
      </div>
    </motion.article>
  );
}
