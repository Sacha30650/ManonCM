"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { Button } from "@/components/ui/Button";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import type { HeroData } from "@/data/hero-types";

type HeroProps = { data: HeroData };

export function Hero({ data }: HeroProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const headlinePrimaryWords = data.headlinePrimary.split(/\s+/).filter(Boolean);
  const subheadlineWords = data.subheadline.split(/\s+/).filter(Boolean);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pb-20 pt-32 md:pt-44 lg:pb-28"
    >
      <NoiseOverlay />

      <motion.div
        aria-hidden="true"
        style={{ y: parallaxY, opacity: fade }}
        className="pointer-events-none absolute inset-0 grid-3d"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 h-[480px] w-[480px] rounded-full bg-accent/15 blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-accent-soft/8 blur-[140px]"
      />

      <div className="container-page relative">
        <div className="grid gap-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-4"
            >
              <span className="accent-rule" aria-hidden="true" />
              <span className="text-eyebrow text-accent-soft">{data.kicker}</span>
            </motion.div>

            <h1 className="text-display text-mega mt-8 max-w-[14ch] text-text-primary">
              {headlinePrimaryWords.map((w, i) => (
                <motion.span
                  key={w + i}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="mr-[0.18em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
              <br />
              <motion.span
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[0.85em] italic text-accent"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {data.headlineAccent}
              </motion.span>
              <br />
              {subheadlineWords.map((w, i) => (
                <motion.span
                  key={w + i + "b"}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.55 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mr-[0.18em] inline-block text-text-primary/70"
                >
                  {w}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-10 max-w-xl text-base text-text-secondary md:text-lg"
            >
              {data.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <Button as="link" href={data.ctaPrimaryHref} variant="primary">
                {data.ctaPrimaryLabel}
              </Button>
              <Button as="link" href={data.ctaSecondaryHref} variant="ghost">
                {data.ctaSecondaryLabel}
                <span aria-hidden="true" className="transition-transform">
                  →
                </span>
              </Button>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="hidden flex-col gap-6 lg:flex"
          >
            <span className="text-eyebrow text-text-muted">{data.specialitiesLabel}</span>
            <ul className="flex flex-col gap-2 text-right text-sm text-text-secondary">
              {data.specialities.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="ml-auto h-px w-16 bg-border-strong" aria-hidden="true" />
            <p className="ml-auto max-w-[18ch] text-right font-serif text-base italic text-accent-soft">
              {data.tagline}
            </p>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-20 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-10 md:mt-24 md:grid-cols-4"
        >
          {data.stats.map((s, i) => (
            <div
              key={s.label}
              className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-1"
            >
              <span className="editorial-num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-display text-3xl text-text-primary md:text-4xl">{s.value}</p>
                <p className="mt-1 text-eyebrow text-text-muted">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
