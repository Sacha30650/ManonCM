import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site makemyvisu.fr.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <section className="section-padding pt-36 md:pt-44">
      <div className="container-page flex max-w-3xl flex-col gap-10">
        <header className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-soft">
            Informations légales
          </span>
          <h1 className="text-display text-section">Mentions légales</h1>
        </header>

        <div className="flex flex-col gap-8 text-base text-text-secondary">
          <section className="flex flex-col gap-3">
            <h2 className="text-display text-2xl text-text-primary">Éditeur du site</h2>
            <p>
              Le site <strong className="text-text-primary">makemyvisu.fr</strong> (Make my visu)
              est édité par Manon Almudever, micro-entrepreneuse.
            </p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm md:text-base">
              <dt className="text-text-muted">Adresse</dt>
              <dd className="text-text-primary">695 rue de la Péronnière, 42320 La Grand-Croix</dd>
              <dt className="text-text-muted">SIREN</dt>
              <dd className="text-text-primary">794 365 338</dd>
              <dt className="text-text-muted">Email</dt>
              <dd className="text-text-primary">
                <a
                  href="mailto:almudever.manon@gmail.com"
                  className="transition-colors hover:text-accent"
                >
                  almudever.manon@gmail.com
                </a>
              </dd>
              <dt className="text-text-muted">Directrice de publication</dt>
              <dd className="text-text-primary">Manon Almudever</dd>
            </dl>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-display text-2xl text-text-primary">Hébergement</h2>
            <p>Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, United States.</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-display text-2xl text-text-primary">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, visuels, logos,
              illustrations) est la propriété de Manon Almudever, sauf mention contraire. Toute
              reproduction sans autorisation préalable est interdite.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-display text-2xl text-text-primary">Données personnelles</h2>
            <p>
              Les informations transmises lors de la prise de rendez-vous via Calendly et par
              email sont utilisées exclusivement pour répondre à votre demande. Aucune donnée
              n&apos;est cédée à des tiers. Conformément au RGPD, vous disposez d&apos;un droit
              d&apos;accès, de rectification et de suppression de vos données.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-display text-2xl text-text-primary">Cookies</h2>
            <p>
              Ce site n&apos;utilise pas de cookies de tracking publicitaire. Si une solution
              d&apos;analytics respectueuse de la vie privée (Plausible, Umami) est ajoutée,
              cette page sera mise à jour.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
