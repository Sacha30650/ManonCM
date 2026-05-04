import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";
import { Button } from "@/components/ui/Button";
import { PricingCard } from "@/components/ui/PricingCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { packs, unitItems } from "@/data/pricing";

export function Pricing() {
  return (
    <section id="tarifs" className="section-padding relative bg-surface">
      <div className="container-page flex flex-col gap-14">
        <SectionHeading
          kicker="Tarifs"
          title="Des packs lisibles. Devis personnalisé sur demande."
          description="Choisis un pack ou compose à la carte. Toujours un devis clair en amont, jamais de surprise."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {packs.map((p, i) => (
            <FadeInWhenVisible key={p.id} delay={i * 0.08}>
              <PricingCard pack={p} />
            </FadeInWhenVisible>
          ))}
        </div>

        <FadeInWhenVisible className="rounded-3xl border border-border bg-background/60 p-8 md:p-10">
          <h3 className="text-display text-2xl text-text-primary md:text-3xl">
            Création à l&apos;unité
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Pour les besoins ponctuels — un visuel, un menu, une affiche, un carrousel.
          </p>

          <div className="mt-8 divide-y divide-border">
            {unitItems.map((item) => (
              <div
                key={item.label}
                className="flex flex-col justify-between gap-1 py-4 md:flex-row md:items-center"
              >
                <span className="text-base text-text-primary">{item.label}</span>
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  {item.range}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-text-muted">
            Tarifs indicatifs — devis personnalisé sur demande.
          </p>

          <div className="mt-6">
            <Button as="link" href="/contact">
              Demander un devis
            </Button>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
