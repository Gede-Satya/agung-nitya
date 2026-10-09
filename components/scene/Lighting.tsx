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
      {/* Ambient floor bounce baseline */}
      <ambientLight intensity={0.45} color="#18181F" />

      {/* Key Light: Warm, upper-left directional */}
      <directionalLight
        position={[-5.5, 7.5, 5.0]}
        intensity={2.8}
        color="#FFF4E8"
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

      {/* Rim Light: Cool, high-contrast kicker from behind */}
      <directionalLight
        position={[4.5, 6.0, -6.5]}
        intensity={2.4}
        color="#D6E4FF"
      />

      {/* Soft Low Fill: Counterbalances dark areas without washing out shadows */}
      <directionalLight
        position={[6.0, -1.0, 4.0]}
        intensity={0.65}
        color="#8B92A0"
      />
    </group>
  );
}
