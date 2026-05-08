"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { Hero3DScene } from "@/components/motion/Hero3DScene";
import { Button } from "@/components/ui/Button";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { Sparkle } from "@/components/ui/Sparkle";

const headlineWords = ["DES", "VISUELS", "QUI", "CONVERTISSENT"];
const subheadlineWords = ["VOS", "PROSPECTS", "EN", "CLIENTS."];

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const parallaxRotate = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 8]);
  const headlineDepth = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -160]);

  return (
    <section
      ref={ref}
      className="perspective-scene relative overflow-hidden pb-24 pt-36 md:pt-48 lg:pb-32"
    >
      <NoiseOverlay />

      <motion.div
        aria-hidden="true"
        style={{ y: parallaxY }}
        className="pointer-events-none absolute inset-0 grid-3d"
      />

      <motion.div
        aria-hidden="true"
        style={{ rotate: parallaxRotate }}
        className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[140px]"
      />
      <motion.div
        aria-hidden="true"
        style={{ rotate: parallaxRotate }}
        className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-accent-soft/10 blur-[120px]"
      />

      <Hero3DScene />

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

      <div className="container-page relative preserve-3d">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block text-xs font-semibold uppercase tracking-[0.36em] text-accent-soft"
        >
          Créatrice de visuels & contenus Instagram
        </motion.span>

        <motion.h1
          style={{ z: headlineDepth, transformStyle: "preserve-3d" }}
          className="text-display text-mega mt-6 max-w-[12ch] text-text-primary preserve-3d"
        >
          {headlineWords.map((w, i) => (
            <motion.span
              key={w + i}
              initial={{ opacity: 0, y: 60, rotateX: -80, z: -120 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.1 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformStyle: "preserve-3d", transformOrigin: "50% 100% -40px" }}
              className="mr-[0.18em] inline-block"
            >
              {w}
            </motion.span>
          ))}
          <br />
          {subheadlineWords.map((w, i) => (
            <motion.span
              key={w + i + "b"}
              initial={{ opacity: 0, y: 60, rotateX: -80, z: -120 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.1 + (headlineWords.length + i) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformStyle: "preserve-3d", transformOrigin: "50% 100% -40px" }}
              className={`mr-[0.18em] inline-block ${i === 3 ? "shimmer-text" : ""}`}
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 max-w-2xl text-lg text-text-secondary md:text-xl"
        >
          Affiches, flyers et contenus Instagram conçus pour transformer ta communication en
          machine à attirer des clients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <motion.div whileHover={{ rotateX: -8, rotateY: 6, z: 12 }} style={{ transformStyle: "preserve-3d" }}>
            <Button as="link" href="#portfolio" variant="primary">
              Voir le portfolio
            </Button>
          </motion.div>
          <motion.div whileHover={{ rotateX: -8, rotateY: -6, z: 12 }} style={{ transformStyle: "preserve-3d" }}>
            <Button as="link" href="/contact" variant="secondary">
              Demander un devis
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-20 grid max-w-3xl grid-cols-2 gap-6 border-t border-border pt-10 md:grid-cols-4"
        >
          {[
            { v: "30+", k: "Clients accompagnés" },
            { v: "150+", k: "Visuels créés" },
            { v: "4", k: "Secteurs couverts" },
            { v: "24h", k: "Réponse garantie" },
          ].map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 20, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, delay: 1.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotateX: 8, rotateY: -6, z: 14 }}
              style={{ transformStyle: "preserve-3d", transformOrigin: "50% 50% -20px" }}
            >
              <p className="text-display text-4xl text-accent md:text-5xl">{s.v}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-text-muted">{s.k}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
