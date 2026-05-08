import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";
import { MethodStepRow } from "@/components/ui/MethodStep";
import { methodSteps } from "@/data/method";

export function Method() {
  return (
    <section id="methode" className="section-padding-lg relative">
      <div className="container-page flex flex-col gap-16">
        <FadeInWhenVisible className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-20">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span className="accent-rule" aria-hidden="true" />
              <span className="text-eyebrow text-text-muted">04 — Méthode</span>
            </div>
            <h2 className="text-display text-section text-text-primary">
              Un process{" "}
              <span className="font-serif italic text-accent" style={{ fontFamily: "var(--font-serif)" }}>
                clair
              </span>
              , en 4 étapes.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-text-secondary md:text-lg lg:pb-3">
            Pas de zone grise : chaque étape t&apos;amène à un livrable concret et exploitable.
          </p>
        </FadeInWhenVisible>

        <div className="flex flex-col">
          {methodSteps.map((step, i) => (
            <MethodStepRow key={step.number} step={step} isLast={i === methodSteps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
