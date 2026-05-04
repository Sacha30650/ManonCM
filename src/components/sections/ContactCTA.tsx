import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";
import { ContactForm } from "@/components/ui/ContactForm";
import { Sparkle } from "@/components/ui/Sparkle";

export function ContactCTA() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[140px]"
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
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-soft">
            Démarrer un projet
          </span>
          <h2 className="text-display text-section text-text-primary">
            Prêt·e à transformer ta <span className="text-accent">communication</span> ?
          </h2>
          <p className="text-base text-text-secondary md:text-lg">
            Décris-moi ton projet, je reviens vers toi sous 24h. Premier échange offert pour
            cadrer ensemble tes besoins.
          </p>

          <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6">
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
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-primary transition-colors hover:text-accent"
              >
                Suis-moi sur Instagram
              </a>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible
          delay={0.1}
          className="rounded-3xl border border-border bg-surface p-8 md:p-10"
        >
          <ContactForm />
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
