"use client";

import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import HeroExperience from "./HeroExperience";
import StaticDiagram from "./StaticDiagram";
import { useWebGLCapability } from "@/hooks/useWebGLCapability";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SceneCanvasProps {
  pointer?: { x: number; y: number };
  scrollProgress?: number;
}

/**
 * SceneCanvas — DESIGN.md §5 & §7
 * - ACES Filmic tone mapping
 * - DPR cap: 1.5 maximum (efficient GPU consumption)
 * - Safe fallback to 2D StaticDiagram if WebGL fails or reduced motion requested
 * - Pauses render loop when browser tab is hidden
 */
export default function SceneCanvas({ pointer, scrollProgress = 0 }: SceneCanvasProps) {
  const isWebGLSupported = useWebGLCapability();
  const prefersReduced = useReducedMotion();
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Pause render loop when browser tab is inactive to preserve battery and GPU
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // 2D Static Diagram fallback if WebGL unavailable or reduced motion active
  if (!isWebGLSupported || prefersReduced) {
    return <StaticDiagram />;
  }

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 2.3, 7.6], fov: 32 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
          alpha: true,
        }}
        frameloop={isTabVisible ? "always" : "never"}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
        }}
      >
        <color attach="background" args={["#0B0B0D"]} />
        <HeroExperience pointer={pointer} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
