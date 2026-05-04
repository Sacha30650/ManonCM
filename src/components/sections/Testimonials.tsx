import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section id="temoignages" className="section-padding relative">
      <div className="container-page flex flex-col gap-14">
        <SectionHeading
          kicker="Témoignages"
          title="Ce qu'en disent les clientes & clients."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeInWhenVisible key={t.id} delay={i * 0.08}>
              <TestimonialCard t={t} />
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
