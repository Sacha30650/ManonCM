"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { type PointerEvent, type ReactNode, useRef } from "react";

type Tilt3DProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
  scale?: number;
  perspective?: number;
};

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

export function Tilt3D({
  children,
  className,
  intensity = 12,
  glare = true,
  scale = 1.02,
  perspective = 1000,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);
  const z = useSpring(useMotionValue(0), SPRING);
  const glareX = useSpring(useMotionValue(50), SPRING);
  const glareY = useSpring(useMotionValue(50), SPRING);
  const glareOpacity = useSpring(useMotionValue(0), SPRING);

  const transform = useMotionTemplate`perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${z}px)`;
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,107,157,0.35), transparent 55%)`;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * intensity * 2);
    rotateX.set(-(py - 0.5) * intensity * 2);
    z.set(scale > 1 ? (scale - 1) * 30 : 0);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    z.set(0);
    glareOpacity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
      style={{
        transform,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <div style={{ transformStyle: "preserve-3d" }} className="relative h-full">
        {children}
        {glare && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background: glareBackground,
              opacity: glareOpacity,
              mixBlendMode: "screen",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
