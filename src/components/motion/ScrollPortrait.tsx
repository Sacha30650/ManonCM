"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";

type ScrollPortraitProps = {
  src: string;
  alt: string;
  fallback?: ReactNode;
  className?: string;
};

const SPRING = { stiffness: 120, damping: 30, mass: 0.6 };

export function ScrollPortrait({ src, alt, fallback, className }: ScrollPortraitProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, SPRING);

  const imageY = useTransform(smooth, [0, 1], ["-6%", "6%"]);
  const imageScale = useTransform(smooth, [0, 0.5, 1], [1.14, 1.04, 1.14]);
  const tilt = useTransform(smooth, [0, 0.5, 1], [-4, 0, 4]);
  const grayscale = useTransform(smooth, [0, 0.4, 0.55, 1], [0.55, 0, 0, 0.55]);
  const filter = useTransform(grayscale, (g) => `grayscale(${g}) saturate(${1 + (1 - g) * 0.2})`);
  const overlayOpacity = useTransform(smooth, [0, 0.5, 1], [0.4, 0.08, 0.4]);
  const sweepX = useTransform(smooth, [0, 1], ["-120%", "220%"]);
  const ringRotate = useTransform(smooth, [0, 1], [0, 360]);
  const ringOpacity = useTransform(smooth, [0, 0.2, 0.8, 1], [0, 0.7, 0.7, 0]);

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {fallback && (
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          {fallback}
        </div>
      )}

      <motion.div
        className="absolute inset-0 z-10"
        style={{ y: imageY, scale: imageScale, rotate: tilt, filter }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover"
          draggable={false}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-background/70 via-background/10 to-transparent"
        style={{ opacity: overlayOpacity }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 mix-blend-screen"
        style={{
          background:
            "linear-gradient(115deg, transparent 35%, rgba(255,107,157,0.32) 50%, transparent 65%)",
          x: sweepX,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 z-40"
        style={{ rotate: ringRotate, opacity: ringOpacity }}
      >
        <div
          className="absolute inset-0 rounded-[2rem] border border-accent/40"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(255,107,157,0) 0deg, rgba(255,107,157,0.55) 90deg, rgba(255,107,157,0) 180deg, rgba(245,184,200,0.45) 270deg, rgba(255,107,157,0) 360deg)",
            WebkitMask:
              "radial-gradient(circle, transparent calc(100% - 2px), black calc(100% - 2px))",
            mask: "radial-gradient(circle, transparent calc(100% - 2px), black calc(100% - 2px))",
          }}
        />
      </motion.div>
    </div>
  );
}
