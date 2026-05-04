import { SectionHeading } from "@/components/ui/SectionHeading";
import { MethodStepRow } from "@/components/ui/MethodStep";
import { methodSteps } from "@/data/method";

export function Method() {
  return (
    <section id="methode" className="section-padding relative">
      <div className="container-page flex flex-col gap-16">
        <SectionHeading
          kicker="Méthode"
          title="Un process clair, en 4 étapes."
          description="Pas de zone grise : chaque étape t'amène à un livrable concret et exploitable."
        />

        <div className="flex flex-col">
          {methodSteps.map((step, i) => (
            <MethodStepRow key={step.number} step={step} isLast={i === methodSteps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
