import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";
import { CalendlyEmbed } from "@/components/ui/CalendlyEmbed";
import { Sparkle } from "@/components/ui/Sparkle";

export const CALENDLY_URL = "https://calendly.com/manon-almudever/bilan-strategique";

const benefits = [
  {
    title: "30 minutes en visio",
    description: "On fait le point sur ta com actuelle et tes objectifs business.",
  },
  {
    title: "Diagnostic concret",
    description:
      "Je repère ce qui freine tes conversions et les axes d’amélioration prioritaires.",
  },
  {
    title: "Plan d’action clair",
    description:
      "Tu repars avec des recommandations actionnables, que tu travailles avec moi ou non.",
  },
];

export function ContactCTA() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-accent-soft/10 blur-[140px]"
      />
      <Sparkle
        size={26}
        className="pointer-events-none absolute right-[12%] top-[18%] text-accent-soft"
        delay={0.3}
      />
      <Sparkle
        size={20}
        className="pointer-events-none absolute left-[8%] top-[30%] text-accent-soft"
        delay={1.2}
      />

      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <FadeInWhenVisible className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-[pulseSlow_3s_ease-in-out_infinite]" />
            Bilan stratégique offert
          </span>

          <h2 className="text-display text-section text-text-primary">
            Réserve ton <span className="text-accent">bilan stratégique</span> — 100&nbsp;%
            offert.
          </h2>
          <p className="text-base text-text-secondary md:text-lg">
            Un appel court, structuré, zéro pression de vente. On regarde ensemble comment
            transformer ta communication en machine à attirer des clients.
          </p>

          <ul className="mt-2 flex flex-col gap-4">
            {benefits.map((b) => (
              <li key={b.title} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    aria-hidden="true"
                  >
                    <path d="M5 12l4 4 10-10" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-primary">
                    {b.title}
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">{b.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-soft">
              Ou directement
            </p>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M3 7l9 6 9-6" />
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                </svg>
              </span>
              <a
                href="mailto:almudever.manon@gmail.com"
                className="text-sm text-text-primary transition-colors hover:text-accent"
              >
                almudever.manon@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </span>
              <a
                href="https://www.instagram.com/makemyvisu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-primary transition-colors hover:text-accent"
              >
                Suis-moi sur Instagram
              </a>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1}>
          <CalendlyEmbed url={CALENDLY_URL} height={760} />
          <p className="mt-4 text-center text-xs uppercase tracking-[0.24em] text-text-muted">
            Confidentiel · Sans engagement · Visio Google&nbsp;Meet
          </p>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
