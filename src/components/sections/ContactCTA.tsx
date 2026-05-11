import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";

export const CALENDLY_URL = "https://calendly.com/almudever42/bilan-strategique-offert";

const benefits = [
  {
    n: "01",
    title: "30 minutes en visio",
    description: "On fait le point sur ta com actuelle et tes objectifs business.",
  },
  {
    n: "02",
    title: "Diagnostic concret",
    description:
      "Je repère ce qui freine tes conversions et les axes d’amélioration prioritaires.",
  },
  {
    n: "03",
    title: "Plan d’action clair",
    description:
      "Tu repars avec des recommandations actionnables, que tu travailles avec moi ou non.",
  },
];

export function ContactCTA() {
  return (
    <section id="contact" className="section-padding-lg relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-accent-soft/8 blur-[160px]"
      />

      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <FadeInWhenVisible className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span className="accent-rule" aria-hidden="true" />
              <span className="text-eyebrow text-text-muted">08 — Contact</span>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-[pulseSlow_3s_ease-in-out_infinite]" />
              Bilan stratégique offert
            </span>

            <h2 className="text-display text-section text-text-primary">
              Réserve ton{" "}
              <span className="font-serif italic text-accent" style={{ fontFamily: "var(--font-serif)" }}>
                bilan stratégique
              </span>{" "}
              — 100% offert.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-text-secondary md:text-lg">
              Un appel court, structuré, zéro pression de vente. On regarde ensemble comment
              transformer ta communication en machine à attirer des clients.
            </p>
          </div>

          <ul className="flex flex-col">
            {benefits.map((b) => (
              <li
                key={b.title}
                className="grid grid-cols-[auto_1fr] gap-6 border-t border-border py-6 last:border-b last:border-border"
              >
                <span className="editorial-num text-accent">{b.n}</span>
                <div>
                  <p className="text-base font-medium text-text-primary md:text-lg">
                    {b.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary md:text-base">
                    {b.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="grid gap-4 text-sm">
            <span className="text-eyebrow text-text-muted">Ou directement</span>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:almudever.manon@gmail.com"
                className="text-text-primary transition-colors hover:text-accent"
              >
                almudever.manon@gmail.com
              </a>
              <a
                href="https://www.instagram.com/makemyvisu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary transition-colors hover:text-accent"
              >
                @makemyvisu sur Instagram →
              </a>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1} className="flex flex-col gap-4">
          <CalendlyEmbed url={CALENDLY_URL} height={760} />
          <p className="text-center text-eyebrow text-text-muted">
            Confidentiel · Sans engagement · Visio Google&nbsp;Meet
          </p>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
