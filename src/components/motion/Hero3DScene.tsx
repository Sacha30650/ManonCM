"use client";

import { motion, useReducedMotion } from "framer-motion";

type Hero3DSceneProps = {
  className?: string;
};

export function Hero3DScene({ className }: Hero3DSceneProps) {
  const reduced = useReducedMotion();

  const float = (duration: number, delay = 0) => ({
    y: reduced ? 0 : [-12, 12, -12],
    transition: {
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  });

  const spin = (duration: number, reverse = false) => ({
    rotate: reduced ? 0 : reverse ? [0, -360] : [0, 360],
    transition: { duration, repeat: Infinity, ease: "linear" as const },
  });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      style={{ perspective: "1400px" }}
    >
      <motion.div
        className="absolute right-[6%] top-[14%]"
        animate={float(8)}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={spin(22)}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-40 w-40 md:h-56 md:w-56"
        >
          <Cube size="100%" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-[4%] top-[55%] hidden md:block"
        animate={float(10, 0.6)}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={spin(28, true)}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-32 w-32 md:h-44 md:w-44"
        >
          <Torus />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute right-[34%] top-[68%] hidden lg:block"
        animate={float(7, 1)}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={spin(18)}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-24 w-24 md:h-32 md:w-32"
        >
          <Pyramid />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-[42%] top-[8%] hidden md:block"
        animate={float(9, 1.4)}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={spin(34, true)}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-20 w-20 md:h-28 md:w-28"
        >
          <Sphere />
        </motion.div>
      </motion.div>
    </div>
  );
}

function Cube({ size = "100%" }: { size?: string }) {
  const faceBase =
    "absolute inset-0 rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/30 via-accent/10 to-transparent backdrop-blur-[2px]";
  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
        transformStyle: "preserve-3d",
      }}
    >
      <div className={faceBase} style={{ transform: "translateZ(70px)" }} />
      <div className={faceBase} style={{ transform: "rotateY(180deg) translateZ(70px)" }} />
      <div className={faceBase} style={{ transform: "rotateY(90deg) translateZ(70px)" }} />
      <div className={faceBase} style={{ transform: "rotateY(-90deg) translateZ(70px)" }} />
      <div className={faceBase} style={{ transform: "rotateX(90deg) translateZ(70px)" }} />
      <div className={faceBase} style={{ transform: "rotateX(-90deg) translateZ(70px)" }} />
    </div>
  );
}

function Torus() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full drop-shadow-[0_18px_40px_rgba(255,107,157,0.35)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <defs>
        <radialGradient id="torus-grad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(255,133,174,0.85)" />
          <stop offset="60%" stopColor="rgba(255,107,157,0.45)" />
          <stop offset="100%" stopColor="rgba(255,107,157,0)" />
        </radialGradient>
      </defs>
      <ellipse
        cx="100"
        cy="100"
        rx="78"
        ry="34"
        fill="none"
        stroke="url(#torus-grad)"
        strokeWidth="14"
      />
      <ellipse
        cx="100"
        cy="100"
        rx="78"
        ry="34"
        fill="none"
        stroke="rgba(245,184,200,0.55)"
        strokeWidth="2"
      />
    </svg>
  );
}

function Pyramid() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full drop-shadow-[0_14px_30px_rgba(245,184,200,0.35)]"
    >
      <defs>
        <linearGradient id="pyr-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,107,157,0.65)" />
          <stop offset="100%" stopColor="rgba(255,107,157,0.05)" />
        </linearGradient>
        <linearGradient id="pyr-b" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(245,184,200,0.55)" />
          <stop offset="100%" stopColor="rgba(245,184,200,0.05)" />
        </linearGradient>
      </defs>
      <polygon
        points="100,18 30,170 100,140"
        fill="url(#pyr-a)"
        stroke="rgba(255,107,157,0.7)"
        strokeWidth="1.5"
      />
      <polygon
        points="100,18 170,170 100,140"
        fill="url(#pyr-b)"
        stroke="rgba(245,184,200,0.7)"
        strokeWidth="1.5"
      />
      <polygon
        points="30,170 100,140 170,170"
        fill="rgba(20,20,20,0.6)"
        stroke="rgba(255,107,157,0.5)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function Sphere() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <defs>
        <radialGradient id="sph-grad" cx="35%" cy="32%" r="65%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="35%" stopColor="rgba(255,107,157,0.65)" />
          <stop offset="100%" stopColor="rgba(20,20,20,0.95)" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#sph-grad)" />
      <ellipse
        cx="100"
        cy="100"
        rx="80"
        ry="22"
        fill="none"
        stroke="rgba(245,184,200,0.35)"
        strokeWidth="1.2"
      />
      <ellipse
        cx="100"
        cy="100"
        rx="22"
        ry="80"
        fill="none"
        stroke="rgba(245,184,200,0.25)"
        strokeWidth="1.2"
      />
    </svg>
  );
}
