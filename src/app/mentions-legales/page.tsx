import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site manon-almu.fr.",
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
          <section className="flex flex-col gap-2">
            <h2 className="text-display text-2xl text-text-primary">Éditeur du site</h2>
            <p>
              Le site <strong className="text-text-primary">manon-almu.fr</strong> est édité par
              Manon Almu, micro-entrepreneuse en région PACA (France).
            </p>
            <p>Email : almudever.manon@gmail.com</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-display text-2xl text-text-primary">Hébergement</h2>
            <p>Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, United States.</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-display text-2xl text-text-primary">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, visuels, logos,
              illustrations) est la propriété de Manon Almu, sauf mention contraire. Toute
              reproduction sans autorisation préalable est interdite.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-display text-2xl text-text-primary">Données personnelles</h2>
            <p>
              Les informations transmises via le formulaire de contact sont utilisées
              exclusivement pour répondre à votre demande. Aucune donnée n&apos;est cédée à des
              tiers. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
              rectification et de suppression de vos données.
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
