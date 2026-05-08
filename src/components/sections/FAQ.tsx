import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";
import { FAQItem } from "@/components/ui/FAQItem";
import { faqs } from "@/data/faq";

export function FAQ() {
  return (
    <section id="faq" className="section-padding-lg relative bg-surface">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
        <FadeInWhenVisible className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="accent-rule" aria-hidden="true" />
            <span className="text-eyebrow text-text-muted">07 — FAQ</span>
          </div>
          <h2 className="text-display text-section text-text-primary">
            Questions{" "}
            <span className="font-serif italic text-accent" style={{ fontFamily: "var(--font-serif)" }}>
              fréquentes
            </span>
            .
          </h2>
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            Une question qui n&apos;est pas listée ? Écris-moi, je réponds sous 24h.
          </p>
        </FadeInWhenVisible>

        <FadeInWhenVisible className="border-t border-border">
          {faqs.map((f, i) => (
            <FAQItem key={f.question} item={f} defaultOpen={i === 0} />
          ))}
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
