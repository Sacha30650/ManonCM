import Link from "next/link";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-display text-3xl tracking-[0.06em] text-text-primary">
            MAKE MY VISU
          </Link>
          <p className="max-w-sm text-sm text-text-secondary">
            Créatrice de visuels marketing et contenus Instagram. Des supports pensés business,
            pour des marques qui veulent qu&apos;on les remarque.
          </p>
        </div>

        <nav aria-label="Pieds de page" className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-soft">
            Navigation
          </h3>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-soft">
            Contact
          </h3>
          <a
            href="mailto:almudever.manon@gmail.com"
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            almudever.manon@gmail.com
          </a>
          <a
            href="https://www.instagram.com/makemyvisu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
            aria-label="Instagram de Make my visu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            Instagram
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-6 text-xs text-text-muted md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Make my visu — Tous droits réservés.</p>
          <p>Site conçu en PACA · Made with care.</p>
        </div>
      </div>
    </footer>
  );
}
