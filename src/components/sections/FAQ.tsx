import { FAQItem } from "@/components/ui/FAQItem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/faq";

export function FAQ() {
  return (
    <section id="faq" className="section-padding relative bg-surface">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          kicker="Questions fréquentes"
          title="Tout ce qu'il faut savoir avant de démarrer."
          description="Une question qui n'est pas listée ? Écris-moi, je réponds sous 24h."
        />
        <div className="rounded-3xl border border-border bg-background/40 px-6 md:px-10">
          {faqs.map((f, i) => (
            <FAQItem key={f.question} item={f} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
