"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Center, Environment, useGLTF } from "@react-three/drei";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Component, Suspense, useRef, type ReactNode, type RefObject } from "react";
import type * as THREE from "three";

type Model3DViewerProps = {
  url: string;
  containerRef: RefObject<HTMLDivElement | null>;
  className?: string;
};

function ScrollRotatingModel({
  url,
  progressRef,
}: {
  url: string;
  progressRef: RefObject<number>;
}) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = progressRef.current * Math.PI * 2;
    ref.current.rotation.y += (target - ref.current.rotation.y) * Math.min(delta * 6, 1);
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}

class SilentBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    // Swallow — fallback "MMV" remains visible behind the (now-empty) canvas.
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function Model3DViewer({ url, containerRef, className }: Model3DViewerProps) {
  const progressRef = useRef(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.1, 3.4], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 5, 4]} intensity={1.1} color="#ffe9f0" />
        <directionalLight position={[-4, 2, -3]} intensity={0.55} color="#ff6b9d" />
        <SilentBoundary>
          <Suspense fallback={null}>
            <Bounds fit clip observe margin={1.05}>
              <Center>
                <ScrollRotatingModel url={url} progressRef={progressRef} />
              </Center>
            </Bounds>
            <Environment preset="studio" />
          </Suspense>
        </SilentBoundary>
      </Canvas>
    </div>
  );
}
