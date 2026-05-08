"use client";

import { Tilt3D } from "@/components/motion/Tilt3D";
import { Button } from "@/components/ui/Button";
import type { Pack } from "@/data/pricing";

export function PricingCard({ pack }: { pack: Pack }) {
  return (
    <Tilt3D className="h-full" intensity={pack.highlight ? 12 : 9} scale={1.03}>
      <article
        className={`relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border p-8 transition-colors duration-300 ${
          pack.highlight
            ? "border-accent bg-surface-elevated shadow-[0_30px_80px_-30px_rgba(255,107,157,0.55)]"
            : "border-border bg-surface hover:border-accent/60 hover:bg-surface-elevated"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -left-20 -bottom-24 h-52 w-52 rounded-full blur-3xl ${
            pack.highlight ? "bg-accent/20" : "bg-accent/10"
          }`}
          style={{ transform: "translateZ(20px)" }}
        />

        {pack.badge && (
          <span
            className="absolute -top-3 left-8 rounded-full bg-accent px-4 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-background"
            style={{ transform: "translateZ(80px)" }}
          >
            {pack.badge}
          </span>
        )}

        <div className="flex flex-col gap-2" style={{ transform: "translateZ(50px)" }}>
          <h3 className="text-display text-2xl text-text-primary md:text-3xl">{pack.name}</h3>
          <p className="text-display text-4xl text-accent md:text-5xl">{pack.price}</p>
        </div>

        <ul
          className="flex flex-1 flex-col gap-3 text-sm text-text-secondary"
          style={{ transform: "translateZ(25px)" }}
        >
          {pack.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-0.5 shrink-0 text-accent"
                aria-hidden="true"
              >
                <path d="M5 12l4 4 10-10" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        <div style={{ transform: "translateZ(40px)" }}>
          <Button as="link" href="/contact" variant={pack.highlight ? "primary" : "secondary"}>
            Choisir ce pack
          </Button>
        </div>
      </article>
    </Tilt3D>
  );
}
