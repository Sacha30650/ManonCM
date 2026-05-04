import type { Service } from "@/data/services";

const icons: Record<Service["icon"], React.ReactNode> = {
  palette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0 0 18c1.6 0 2.8-1.2 2.8-2.7 0-.7-.3-1.4-.8-1.9a1.6 1.6 0 0 1 1.1-2.7H17a4 4 0 0 0 4-4c0-3.7-4-6.7-9-6.7Z" />
      <circle cx="7.5" cy="11" r="1.2" fill="currentColor" />
      <circle cx="10" cy="7.5" r="1.2" fill="currentColor" />
      <circle cx="14" cy="7.5" r="1.2" fill="currentColor" />
      <circle cx="17" cy="11" r="1.2" fill="currentColor" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M3 19V5" />
      <path d="M3 19h18" />
      <path d="M7 15l4-4 3 3 6-7" />
      <path d="M14 7h6v6" />
    </svg>
  ),
};

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex h-full flex-col gap-6 rounded-3xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-surface-elevated hover:shadow-[0_24px_60px_-24px_rgba(255,107,157,0.45)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background/60 text-accent transition-colors group-hover:border-accent">
        <div className="h-7 w-7">{icons[service.icon]}</div>
      </div>

      <h3 className="text-display text-3xl text-text-primary">{service.title}</h3>

      <ul className="flex flex-col gap-2.5 text-sm text-text-secondary">
        {service.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center gap-2 pt-4 text-xs font-semibold uppercase tracking-[0.24em] text-accent-soft">
        <span>{service.price}</span>
      </div>
    </article>
  );
}
