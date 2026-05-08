import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="section-padding-lg relative bg-background">
      <div className="container-page flex flex-col gap-14">
        <FadeInWhenVisible className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-20">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span className="accent-rule" aria-hidden="true" />
              <span className="text-eyebrow text-text-muted">02 — Services</span>
            </div>
            <h2 className="text-display text-section text-text-primary">
              3 piliers,{" "}
              <span className="font-serif italic text-accent" style={{ fontFamily: "var(--font-serif)" }}>
                1 objectif
              </span>{" "}
              : faire avancer ton business.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-text-secondary md:text-lg lg:pb-3">
            Chaque livrable est pensé pour servir tes ventes, tes inscriptions ou ton
            remplissage. Pas juste pour faire joli.
          </p>
        </FadeInWhenVisible>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <FadeInWhenVisible key={service.id} delay={i * 0.08}>
              <ServiceCard service={service} index={i} />
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
