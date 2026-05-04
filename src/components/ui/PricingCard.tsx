import type { Pack } from "@/data/pricing";

import { Button } from "@/components/ui/Button";

export function PricingCard({ pack }: { pack: Pack }) {
  return (
    <article
      className={`relative flex h-full flex-col gap-6 rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
        pack.highlight
          ? "border-accent bg-surface-elevated shadow-[0_30px_80px_-30px_rgba(255,107,157,0.55)]"
          : "border-border bg-surface hover:border-accent/60 hover:bg-surface-elevated"
      }`}
    >
      {pack.badge && (
        <span className="absolute -top-3 left-8 rounded-full bg-accent px-4 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-background">
          {pack.badge}
        </span>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="text-display text-2xl text-text-primary md:text-3xl">{pack.name}</h3>
        <p className="text-display text-4xl text-accent md:text-5xl">{pack.price}</p>
      </div>

      <ul className="flex flex-1 flex-col gap-3 text-sm text-text-secondary">
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

      <Button as="link" href="/contact" variant={pack.highlight ? "primary" : "secondary"}>
        Choisir ce pack
      </Button>
    </article>
  );
}
