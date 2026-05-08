"use client";

import { motion } from "framer-motion";

import type { MethodStep as MethodStepType } from "@/data/method";

import { FadeInWhenVisible } from "@/components/motion/FadeInWhenVisible";

type Props = {
  step: MethodStepType;
  isLast?: boolean;
};

export function MethodStepRow({ step, isLast }: Props) {
  return (
    <FadeInWhenVisible className="relative grid grid-cols-[auto_1fr] gap-6 md:gap-12">
      <div className="relative flex flex-col items-center" style={{ perspective: "800px" }}>
        <motion.span
          initial={{ rotateY: -90, opacity: 0 }}
          whileInView={{ rotateY: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotateY: 18, rotateX: -10, scale: 1.06 }}
          className="text-display text-6xl text-accent leading-none md:text-7xl"
          style={{
            transformStyle: "preserve-3d",
            textShadow:
              "0 1px 0 rgba(255,107,157,0.55), 0 2px 0 rgba(255,107,157,0.4), 0 4px 0 rgba(255,107,157,0.25), 0 10px 30px rgba(255,107,157,0.35)",
          }}
        >
          {step.number}
        </motion.span>
        {!isLast && (
          <motion.span
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-4 h-full w-px flex-1 origin-top bg-gradient-to-b from-accent/60 via-border to-transparent"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="pb-16 md:pb-20">
        <h3 className="text-display text-2xl text-text-primary md:text-3xl">{step.title}</h3>
        <ul className="mt-4 flex flex-col gap-2 text-sm text-text-secondary md:text-base">
          {step.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-soft"
                aria-hidden="true"
              />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </FadeInWhenVisible>
  );
}
