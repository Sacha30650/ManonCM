import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";

export function About() {
  return (
    <section id="a-propos" className="section-padding-lg relative overflow-hidden">
      <div className="container-page">
        <FadeInWhenVisible className="mb-12 flex items-center gap-4">
          <span className="accent-rule" aria-hidden="true" />
          <span className="text-eyebrow text-text-muted">01 — À propos</span>
        </FadeInWhenVisible>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:items-start">
          <FadeInWhenVisible className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/manon-portrait.jpg"
                alt="Manon Almu, créatrice de visuels Make my visu"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
              />
            </div>
            <div className="mt-5 flex items-center justify-between text-eyebrow text-text-muted">
              <span>Manon Almudever</span>
              <span>Loire, France</span>
            </div>
          </FadeInWhenVisible>

          <div className="flex flex-col gap-10">
            <FadeInWhenVisible>
              <h2 className="text-display text-section text-text-primary">
                Des visuels pensés <span className="font-serif italic text-accent" style={{ fontFamily: "var(--font-serif)" }}>business</span>, pas déco.
              </h2>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.1}>
              <blockquote className="pull-quote font-serif text-pull text-text-primary" style={{ fontFamily: "var(--font-serif)" }}>
                Un beau visuel qui ne convertit pas, c&apos;est une dépense. Mon métier
                c&apos;est d&apos;en faire un investissement qui te ramène des clients.
              </blockquote>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.18}>
              <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                <p className="text-base leading-relaxed text-text-secondary md:text-[17px]">
                  Je suis créatrice de visuels marketing spécialisée dans la création
                  d&apos;affiches, flyers et contenus Instagram. J&apos;accompagne les
                  entreprises locales — restaurants, coachs, commerces, événements — à
                  développer leur visibilité.
                </p>
                <p className="text-base leading-relaxed text-text-secondary md:text-[17px]">
                  Chaque livrable est conçu autour d&apos;un seul axe : ce que tu vends,
                  et à qui. Pas de visuels jolis pour faire joli. Des supports qui
                  servent ton chiffre d&apos;affaires.
                </p>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.25}>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-8 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-eyebrow text-text-muted">Basée à</span>
                  <span className="text-text-primary">La Grand-Croix · Loire</span>
                </div>
                <div className="hidden h-8 w-px bg-border md:block" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <span className="text-eyebrow text-text-muted">Disponible</span>
                  <span className="text-text-primary">Mai 2026 — 2 places</span>
                </div>
                <div className="hidden h-8 w-px bg-border md:block" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <span className="text-eyebrow text-text-muted">Format</span>
                  <span className="text-text-primary">Visio + sur place Loire</span>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  );
}
