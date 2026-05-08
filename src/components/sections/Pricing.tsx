import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";
import { Button } from "@/components/ui/Button";
import { PricingCard } from "@/components/ui/PricingCard";
import { packs, unitItems } from "@/data/pricing";

export function Pricing() {
  return (
    <section id="tarifs" className="section-padding-lg relative bg-surface">
      <div className="container-page flex flex-col gap-16">
        <FadeInWhenVisible className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-20">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span className="accent-rule" aria-hidden="true" />
              <span className="text-eyebrow text-text-muted">05 — Tarifs</span>
            </div>
            <h2 className="text-display text-section text-text-primary">
              Des packs{" "}
              <span className="font-serif italic text-accent" style={{ fontFamily: "var(--font-serif)" }}>
                lisibles
              </span>
              .<br className="hidden md:block" /> Devis personnalisé sur demande.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-text-secondary md:text-lg lg:pb-3">
            Choisis un pack ou compose à la carte. Toujours un devis clair en amont, jamais
            de surprise.
          </p>
        </FadeInWhenVisible>

        <div className="grid gap-6 md:grid-cols-3">
          {packs.map((p, i) => (
            <FadeInWhenVisible key={p.id} delay={i * 0.08}>
              <PricingCard pack={p} index={i} />
            </FadeInWhenVisible>
          ))}
        </div>

        <FadeInWhenVisible className="rounded-sm border border-border bg-background/40 p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-3">
              <span className="text-eyebrow text-text-muted">À la carte</span>
              <h3 className="text-display text-2xl text-text-primary md:text-3xl">
                Création à l&apos;unité
              </h3>
              <p className="text-sm text-text-secondary md:text-base">
                Pour les besoins ponctuels — un visuel, un menu, une affiche, un carrousel.
              </p>
            </div>
          </div>

          <div className="mt-10 divide-y divide-border">
            {unitItems.map((item) => (
              <div
                key={item.label}
                className="flex flex-col justify-between gap-1 py-5 md:flex-row md:items-center"
              >
                <span className="text-base text-text-primary">{item.label}</span>
                <span className="font-serif text-lg italic text-accent" style={{ fontFamily: "var(--font-serif)" }}>
                  {item.range}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <p className="text-xs text-text-muted">
              Tarifs indicatifs — devis personnalisé sur demande.
            </p>
            <Button as="link" href="/contact">
              Réserver mon bilan offert
            </Button>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
