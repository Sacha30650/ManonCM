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
    <FadeInWhenVisible className="relative grid grid-cols-[auto_1fr] gap-8 md:gap-16">
      <div className="relative flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-7xl leading-none text-accent md:text-8xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {step.number}
        </motion.span>
        {!isLast && (
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="mt-6 h-full w-px flex-1 origin-top bg-gradient-to-b from-accent/50 via-border to-transparent"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="pb-16 md:pb-24">
        <h3 className="text-display text-2xl text-text-primary md:text-3xl">{step.title}</h3>
        <div className="mt-3 h-px w-12 bg-accent/50" aria-hidden="true" />
        <ul className="mt-6 flex flex-col gap-3 text-[15px] leading-relaxed text-text-secondary md:text-base">
          {step.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span
                className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent-soft"
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
