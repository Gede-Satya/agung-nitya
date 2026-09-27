"use client";

import "@/app/lib/threeQuiet";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import UnifiedHospitalScene from "./UnifiedHospitalScene";
import { P } from "./palette";
import { storyStore } from "./story";

const readReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Kanvas 3D persistent — satu konteks WebGL untuk seluruh halaman.
 * Kualitas menyesuaikan perangkat; reduced motion memakai frameloop demand
 * (render saat berhenti bergerak saja).
 *
 * Frameloop juga dijeda oleh IntersectionObserver pada pembungkus kanvas
 * (PROMPTS #4): scene berhenti me-render begitu tidak ada di viewport,
 * sama seperti saat tab disembunyikan.
 */
export default function SceneCanvas({ quality = "high" }: { quality?: "high" | "low" }) {
  const [reduced, setReduced] = useState(readReduced);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    storyStore.quality = quality;
    storyStore.reduced = reduced;
  }, [quality, reduced]);

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);

    const element = host.current;
    const io = element
      ? new IntersectionObserver(
          (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
          { threshold: 0 },
        )
      : null;
    if (element && io) io.observe(element);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      mq.removeEventListener("change", onChange);
      io?.disconnect();
    };
  }, []);

  const frameloop =
    reduced ? "demand" : visible && inView ? "always" : "never";

  return (
    <div ref={host} className="absolute inset-0">
      <Canvas
        frameloop={frameloop}
        dpr={quality === "high" ? [1, 1.6] : [1, 1.25]}
        camera={{ fov: 40, near: 0.1, far: 90, position: [0.8, 3.1, 11.6] }}
        gl={{
          antialias: quality === "high",
          powerPreference: "high-performance",
          alpha: false,
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.16;
        }}
      >
        <color attach="background" args={[P.canvas]} />
        <fog attach="fog" args={[P.canvas, 13, 48]} />
        <UnifiedHospitalScene quality={quality} />
      </Canvas>
    </div>
  );
}
