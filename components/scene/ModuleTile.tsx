"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { HospitalModule } from "@/data/modules";
import ModuleGlyph from "./ModuleGlyph";
import { getMicroSurfaceTexture } from "@/lib/surface-texture";

interface ModuleTileProps {
  module: HospitalModule;
  position: [number, number, number];
  rotation?: [number, number, number];
  idlePhase?: number;
  isHovered?: boolean;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  onClick?: () => void;
}

/**
 * ModuleTile — DESIGN.md §6.1
 * Identical rounded slab (1.0 × 1.0 × 0.24, radius 0.08) in graphite anodized metal.
 * Carries debossed geometric glyph and cable connection port.
 */
export default function ModuleTile({
  module,
  position,
  rotation = [0, 0, 0],
  idlePhase = 0,
  isHovered = false,
  onPointerOver,
  onPointerOut,
  onClick,
}: ModuleTileProps) {
  const groupRef = useRef<THREE.Group>(null);

  const microTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    return getMicroSurfaceTexture();
  }, []);

  // Graphite anodized metal material
  const tileMaterial = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#18181C"),
      metalness: 0.6,
      roughness: 0.44,
      clearcoat: 0.08,
      clearcoatRoughness: 0.4,
      bumpScale: 0.002,
    });
    if (microTexture) {
      mat.bumpMap = microTexture;
      mat.needsUpdate = true;
    }
    return mat;
  }, [microTexture]);

  // Cable docking socket port material
  const socketMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#101014"),
      roughness: 0.4,
      metalness: 0.8,
    });
  }, []);

  // Subtle telemetry led indicator
  const portLedMaterial = useMemo(() => {
    const col = new THREE.Color(isHovered ? "#5B7CFF" : "#323846");
    return new THREE.MeshStandardMaterial({
      color: col,
      emissive: col,
      emissiveIntensity: isHovered ? 1.0 : 0.3,
      roughness: 0.3,
    });
  }, [isHovered]);

  // Subtle desynchronized idle float & tilt (DESIGN.md §6.3: ±0.04 units, <=2 deg, period 6-10s)
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const freq = 0.7 + (idlePhase % 4) * 0.1;
    const floatY = Math.sin(t * freq + idlePhase) * 0.035;
    const tiltX = Math.sin(t * (freq * 0.8) + idlePhase * 1.5) * 0.015;
    const tiltZ = Math.cos(t * (freq * 0.9) + idlePhase * 1.2) * 0.018;

    groupRef.current.position.y = position[1] + floatY + (isHovered ? 0.15 : 0);
    groupRef.current.rotation.x = rotation[0] + tiltX;
    groupRef.current.rotation.z = rotation[2] + tiltZ;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver?.();
      }}
      onPointerOut={() => onPointerOut?.()}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {/* Main Graphite Anodized Slab (1.0 x 1.0 x 0.24, bevel 0.08) */}
      <RoundedBox
        args={[1.0, 1.0, 0.24]}
        radius={0.08}
        smoothness={4}
        material={tileMaterial}
        castShadow
        receiveShadow
      />

      {/* Recessed glyph area */}
      <ModuleGlyph type={module.glyph} />

      {/* Cable docking port at bottom edge */}
      <group position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh material={socketMaterial}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 24]} />
        </mesh>
        <mesh material={portLedMaterial} position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
        </mesh>
      </group>
    </group>
  );
}
