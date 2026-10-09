"use client";

import React from "react";
import { Environment, Lightformer } from "@react-three/drei";

/**
 * StudioEnvironment — DESIGN.md §6.2
 * Lightweight procedural studio environment built with Drei Lightformers.
 * Delivers realistic PBR specular reflections without downloading any external HDR file.
 */
export default function StudioEnvironment() {
  return (
    <Environment resolution={256}>
      <group rotation={[-Math.PI / 4, -0.3, 0]}>
        {/* Overhead diffused softbox */}
        <Lightformer
          form="rect"
          intensity={1.8}
          color="#FFF8F2"
          position={[0, 6, -1]}
          scale={[10, 6, 1]}
          target={[0, 0, 0]}
        />

        {/* Side fill reflection strip */}
        <Lightformer
          form="rect"
          intensity={1.2}
          color="#E8EFFF"
          position={[-7, 2, 2]}
          scale={[12, 2, 1]}
          rotation={[0, Math.PI / 3, 0]}
        />

        {/* Opposite kicker accent strip */}
        <Lightformer
          form="rect"
          intensity={1.0}
          color="#D8E2F8"
          position={[7, 1, -2]}
          scale={[8, 1.5, 1]}
          rotation={[0, -Math.PI / 3, 0]}
        />

        {/* Low rim reflector */}
        <Lightformer
          form="ring"
          intensity={0.6}
          color="#7B88A0"
          position={[0, -3, 4]}
          scale={5}
        />
      </group>
    </Environment>
  );
}
