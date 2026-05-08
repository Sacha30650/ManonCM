import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";

export function About() {
  return (
    <section id="a-propos" className="section-padding relative overflow-hidden">
      <div className="container-page grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <FadeInWhenVisible className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/manon-portrait.jpg"
              alt="Manon Almu, créatrice de visuels Make my visu"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </FadeInWhenVisible>

        <div className="flex flex-col gap-8">
          <FadeInWhenVisible>
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-soft">
              À propos
            </span>
            <h2 className="text-display text-section mt-4 text-text-primary">
              Des visuels pensés <span className="text-accent">business</span>, pas déco.
            </h2>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.1}>
            <p className="text-base text-text-secondary md:text-lg">
              Je suis créatrice de visuels marketing spécialisée dans la création d&apos;affiches,
              flyers et contenus Instagram. J&apos;accompagne les entreprises (restaurants,
              coachs, commerces, événements) à développer leur visibilité et attirer plus de
              clients grâce à des visuels professionnels et impactants.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.15}>
            <div className="flex items-start gap-5 rounded-2xl border border-accent/30 bg-accent/5 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-soft">
                  Mon objectif
                </p>
                <p className="mt-1 text-base text-text-primary md:text-lg">
                  Transformer ta communication en outil pour générer des clients.
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
