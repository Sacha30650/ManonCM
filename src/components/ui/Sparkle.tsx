"use client";

import { motion } from "framer-motion";

type SparkleProps = {
  size?: number;
  className?: string;
  delay?: number;
  color?: string;
};

export function Sparkle({
  size = 24,
  className,
  delay = 0,
  color = "currentColor",
}: SparkleProps) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      initial={{ scale: 1, opacity: 0.55 }}
      animate={{ scale: [1, 1.18, 1], opacity: [0.55, 1, 0.55] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <path
        d="M12 0L13.5 9.2C13.6 9.85 14.15 10.4 14.8 10.5L24 12L14.8 13.5C14.15 13.6 13.6 14.15 13.5 14.8L12 24L10.5 14.8C10.4 14.15 9.85 13.6 9.2 13.5L0 12L9.2 10.5C9.85 10.4 10.4 9.85 10.5 9.2L12 0Z"
        fill={color}
      />
    </motion.svg>
  );
}
