import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-surface-elevated">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        className="text-accent"
        aria-hidden="true"
      >
        <path
          d="M7 10c0-2.2 1.8-4 4-4V3C6.6 3 3 6.6 3 11v8h8v-8H7v-1Zm10 0c0-2.2 1.8-4 4-4V3c-4.4 0-8 3.6-8 8v8h8v-8h-4v-1Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>

      <p className="flex-1 text-base text-text-primary md:text-lg">{t.quote}</p>

      <div className="border-t border-border pt-4">
        <p className="text-sm font-semibold text-text-primary">{t.name}</p>
        <p className="text-xs uppercase tracking-[0.24em] text-text-muted">{t.role}</p>
      </div>
    </article>
  );
}
