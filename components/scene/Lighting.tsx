"use client";

import React from "react";

/**
 * Lighting — DESIGN.md §6.2
 * Cinematic 3-point studio lighting setup:
 * - Warm key light (upper-left) for shape definition
 * - Cool rim light (behind) for sharp architectural bevel highlights
 * - Balanced soft fill for shadow legibility
 */
export default function Lighting() {
  return (
    <group>
      {/* Ambient white floor bounce baseline */}
      <ambientLight intensity={0.6} color="#FFFFFF" />

      {/* Key Light: Crisp, upper-left directional */}
      <directionalLight
        position={[-5.5, 7.5, 5.0]}
        intensity={2.2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={25}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0001}
      />

      {/* Rim Light: Gentle rim to separate the dark casing from the white page */}
      <directionalLight
        position={[4.5, 6.0, -6.5]}
        intensity={1.8}
        color="#E8F0FC"
      />

      {/* Soft Low Fill: Counterbalances dark areas with clean white fill */}
      <directionalLight
        position={[6.0, -1.0, 4.0]}
        intensity={0.7}
        color="#F0F2F5"
      />
    </group>
  );
}
