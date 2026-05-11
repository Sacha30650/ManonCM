import Link from "next/link";

const navigationLinks = [
  { href: "/", label: "Accueil" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [{ href: "/mentions-legales", label: "Mentions légales" }];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="container-page py-20 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform group-hover:scale-150" aria-hidden="true" />
              <span className="text-display text-3xl tracking-[0.04em] text-text-primary md:text-4xl">
                Make my visu
              </span>
            </Link>
            <p
              className="max-w-md font-serif text-xl italic leading-snug text-text-primary md:text-2xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Le visuel doit faire vendre,{" "}
              <span className="text-accent">pas juste décorer</span>.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
              Créatrice de visuels marketing et contenus Instagram. Des supports pensés
              business, pour des marques qui veulent qu&apos;on les remarque.
            </p>
          </div>

          <nav aria-label="Navigation pied de page" className="flex flex-col gap-4">
            <h3 className="text-eyebrow text-text-muted">Navigation</h3>
            <ul className="flex flex-col gap-3">
              {navigationLinks.map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    <span className="text-text-muted/70" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h3 className="text-eyebrow text-text-muted">Contact</h3>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:almudever.manon@gmail.com"
                className="text-text-secondary transition-colors hover:text-accent"
              >
                almudever.manon@gmail.com
              </a>
              <a
                href="https://www.instagram.com/makemyvisu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary transition-colors hover:text-accent"
                aria-label="Instagram de Make my visu"
              >
                @makemyvisu
              </a>
              <span className="text-text-secondary">Loire · France</span>
            </div>
            <Link
              href="/contact"
              className="mt-4 inline-flex w-fit items-center gap-2 border-b border-accent/40 pb-1 text-eyebrow text-accent transition-colors hover:border-accent hover:text-accent-hover"
            >
              Bilan offert
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-text-muted md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Make my visu — Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
            <span>Site conçu en Loire</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
