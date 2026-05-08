import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section id="temoignages" className="section-padding-lg relative">
      <div className="container-page flex flex-col gap-16">
        <FadeInWhenVisible className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-20">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span className="accent-rule" aria-hidden="true" />
              <span className="text-eyebrow text-text-muted">06 — Témoignages</span>
            </div>
            <h2 className="text-display text-section text-text-primary">
              Ce qu&apos;en disent{" "}
              <span className="font-serif italic text-accent" style={{ fontFamily: "var(--font-serif)" }}>
                les clients
              </span>
              .
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeInWhenVisible key={t.id} delay={i * 0.08}>
              <TestimonialCard t={t} index={i} />
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
