import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";
import { ScrollPortrait } from "@/components/motion/ScrollPortrait";
import { Tilt3D } from "@/components/motion/Tilt3D";
import { Sparkle } from "@/components/ui/Sparkle";

export function About() {
  return (
    <section id="a-propos" className="section-padding perspective-scene relative overflow-hidden">
      <div className="container-page grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <FadeInWhenVisible className="relative">
          <Tilt3D className="block" intensity={14} scale={1.02}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-surface">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, rgba(255,107,157,0.35), transparent 60%), radial-gradient(circle at 80% 80%, rgba(245,184,200,0.25), transparent 55%), linear-gradient(180deg, #1c1c1c, #0a0a0a)",
                }}
                aria-hidden="true"
              />
              <div className="grain-overlay" aria-hidden="true" />

              <ScrollPortrait
                src="/manon-portrait.jpg"
                alt="Manon Almu, créatrice de visuels Make my visu"
                className="absolute inset-0"
                fallback={
                  <span className="text-display text-[clamp(3rem,11vw,7rem)] leading-none text-accent/90">
                    MMV
                  </span>
                }
              />

              <Sparkle
                size={24}
                className="pointer-events-none absolute right-6 top-6 text-accent-soft"
                delay={0.4}
              />
              <Sparkle
                size={32}
                className="pointer-events-none absolute bottom-8 left-8 text-accent"
                delay={1}
              />
            </div>
          </Tilt3D>
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
