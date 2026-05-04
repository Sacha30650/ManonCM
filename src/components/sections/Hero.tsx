"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { Sparkle } from "@/components/ui/Sparkle";

const headlineWords = ["DES", "VISUELS", "QUI", "CONVERTISSENT"];
const subheadlineWords = ["VOS", "PROSPECTS", "EN", "CLIENTS."];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 md:pt-48 lg:pb-32">
      <NoiseOverlay />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-accent-soft/10 blur-[120px]"
      />

      <Sparkle
        size={28}
        className="pointer-events-none absolute right-[8%] top-[22%] text-accent-soft"
        delay={0.3}
      />
      <Sparkle
        size={20}
        className="pointer-events-none absolute left-[10%] top-[36%] text-accent-soft"
        delay={1.1}
      />
      <Sparkle
        size={36}
        className="pointer-events-none absolute right-[30%] bottom-[22%] text-accent"
        delay={0.7}
      />
      <Sparkle
        size={16}
        className="pointer-events-none absolute left-[28%] bottom-[12%] text-accent-soft"
        delay={1.6}
      />

      <div className="container-page relative">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block text-xs font-semibold uppercase tracking-[0.36em] text-accent-soft"
        >
          Créatrice de visuels & contenus Instagram
        </motion.span>

        <h1 className="text-display text-mega mt-6 max-w-[12ch] text-text-primary">
          {headlineWords.map((w, i) => (
            <motion.span
              key={w + i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: "easeOut" }}
              className="mr-[0.18em] inline-block"
            >
              {w}
            </motion.span>
          ))}
          <br />
          {subheadlineWords.map((w, i) => (
            <motion.span
              key={w + i + "b"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1 + (headlineWords.length + i) * 0.06,
                ease: "easeOut",
              }}
              className={`mr-[0.18em] inline-block ${i === 3 ? "text-accent" : ""}`}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 max-w-2xl text-lg text-text-secondary md:text-xl"
        >
          Affiches, flyers et contenus Instagram conçus pour transformer ta communication en
          machine à attirer des clients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button as="link" href="#portfolio" variant="primary">
            Voir le portfolio
          </Button>
          <Button as="link" href="/contact" variant="secondary">
            Demander un devis
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 grid max-w-3xl grid-cols-2 gap-6 border-t border-border pt-10 md:grid-cols-4"
        >
          {[
            { v: "30+", k: "Clients accompagnés" },
            { v: "150+", k: "Visuels créés" },
            { v: "4", k: "Secteurs couverts" },
            { v: "24h", k: "Réponse garantie" },
          ].map((s) => (
            <div key={s.k}>
              <p className="text-display text-4xl text-accent md:text-5xl">{s.v}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-text-muted">{s.k}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
