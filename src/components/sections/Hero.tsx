"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { Button } from "@/components/ui/Button";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

const headlinePrimary = ["DES", "VISUELS", "QUI"];
const headlineAccent = "CONVERTISSENT.";
const subheadline = ["VOS", "PROSPECTS", "EN", "CLIENTS."];

const stats = [
  { v: "30+", k: "Clients" },
  { v: "150+", k: "Visuels" },
  { v: "4", k: "Secteurs" },
  { v: "24h", k: "Réponse" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

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
              <span className="text-eyebrow text-accent-soft">
                Make my visu · Studio créatif
              </span>
            </motion.div>

            <h1 className="text-display text-mega mt-8 max-w-[14ch] text-text-primary">
              {headlinePrimary.map((w, i) => (
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
                {headlineAccent}
              </motion.span>
              <br />
              {subheadline.map((w, i) => (
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
              Affiches, flyers et contenus Instagram conçus pour transformer ta communication
              en machine à attirer des clients. Pour les restaurants, coachs et commerces qui
              veulent qu&apos;on les remarque.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <Button as="link" href="/contact" variant="primary">
                Réserver mon bilan offert
              </Button>
              <Button as="link" href="#portfolio" variant="ghost">
                Voir le portfolio
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
            <span className="text-eyebrow text-text-muted">Spécialités</span>
            <ul className="flex flex-col gap-2 text-right text-sm text-text-secondary">
              <li>Affiches événementielles</li>
              <li>Flyers commerce</li>
              <li>Contenus Instagram</li>
              <li>Identités visuelles</li>
            </ul>
            <div className="ml-auto h-px w-16 bg-border-strong" aria-hidden="true" />
            <p className="ml-auto max-w-[18ch] text-right font-serif text-base italic text-accent-soft">
              Le visuel doit faire vendre, pas juste décorer.
            </p>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-20 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-10 md:mt-24 md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.k}
              className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-1"
            >
              <span className="editorial-num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-display text-3xl text-text-primary md:text-4xl">{s.v}</p>
                <p className="mt-1 text-eyebrow text-text-muted">{s.k}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
