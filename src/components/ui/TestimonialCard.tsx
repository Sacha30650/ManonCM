import type { Testimonial } from "@/data/testimonials";

type TestimonialCardProps = {
  t: Testimonial;
  index: number;
};

export function TestimonialCard({ t, index }: TestimonialCardProps) {
  return (
    <article className="group flex h-full flex-col justify-between gap-8 rounded-sm border border-border bg-surface p-8 transition-colors duration-300 hover:border-accent/40 hover:bg-surface-elevated md:p-10">
      <div className="flex flex-col gap-6">
        <span className="editorial-num text-text-muted transition-colors group-hover:text-accent-soft">
          {String(index + 1).padStart(2, "0")}
        </span>

        <blockquote
          className="font-serif text-xl italic leading-snug text-text-primary md:text-2xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <span className="text-accent" aria-hidden="true">
            “
          </span>
          {t.quote}
          <span className="text-accent" aria-hidden="true">
            ”
          </span>
        </blockquote>
      </div>

      <footer className="flex items-center gap-4 border-t border-border pt-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-eyebrow text-accent-soft">
          {t.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-text-primary">{t.name}</span>
          <span className="text-eyebrow text-text-muted">{t.role}</span>
        </div>
      </footer>
    </article>
  );
}
