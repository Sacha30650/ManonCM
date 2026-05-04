import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="section-padding relative bg-background">
      <div className="container-page flex flex-col gap-14">
        <SectionHeading
          kicker="Services"
          title="3 piliers, 1 objectif : faire avancer ton business."
          description="Chaque livrable est pensé pour servir tes ventes, tes inscriptions ou ton remplissage. Pas juste pour faire joli."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <FadeInWhenVisible key={service.id} delay={i * 0.08}>
              <ServiceCard service={service} />
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
