"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
} & HTMLMotionProps<"div">;

export function FadeInWhenVisible({
  children,
  delay = 0,
  y = 40,
  className,
  ...rest
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
