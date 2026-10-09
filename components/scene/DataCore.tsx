"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { getMicroSurfaceTexture } from "@/lib/surface-texture";

interface DataCoreProps {
  /** Seam ring brightness multiplier (1.0 = standard calm blue) */
  seamIntensity?: number;
}

/**
 * DataCore — DESIGN.md §6.1
 * 3 stacked, bevelled platters in warm satin ceramic, with one thin
 * Healthcare Blue (#5B7CFF) seam ring between platters.
 * Symbolizes "One database — one source of truth" without literal DB clichés.
 */
export default function DataCore({ seamIntensity = 1.0 }: DataCoreProps) {
  const microTexture = useMemo(() => {
    if (typeof window === "undefined") return null;
    return getMicroSurfaceTexture();
  }, []);

  // Warm satin ceramic material
  const ceramicMaterial = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#E5E2DC"),
      roughness: 0.38,
      metalness: 0.08,
      clearcoat: 0.12,
      clearcoatRoughness: 0.35,
      bumpScale: 0.003,
    });
    if (microTexture) {
      mat.bumpMap = microTexture;
      mat.needsUpdate = true;
    }
    return mat;
  }, [microTexture]);

  // Dark structural core chassis
  const chassisMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#151518"),
      roughness: 0.5,
      metalness: 0.65,
    });
  }, []);

  // Healthcare Blue physical accent seam (#5B7CFF)
  const seamMaterial = useMemo(() => {
    const blueColor = new THREE.Color("#5B7CFF");
    return new THREE.MeshStandardMaterial({
      color: blueColor,
      emissive: blueColor,
      emissiveIntensity: 0.85 * seamIntensity,
      roughness: 0.25,
      metalness: 0.3,
    });
  }, [seamIntensity]);

  // Top cap polished inset ring
  const topInsetMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#222226"),
      roughness: 0.3,
      metalness: 0.8,
    });
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Internal structural cylinder core */}
      <mesh material={chassisMaterial} position={[0, 0, 0]}>
        <cylinderGeometry args={[1.05, 1.15, 0.95, 48]} />
      </mesh>

      {/* Platter 1: Bottom tier */}
      <group position={[0, -0.32, 0]}>
        <mesh material={ceramicMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[1.35, 1.42, 0.24, 64]} />
        </mesh>
        {/* Soft bevel lip */}
        <mesh material={ceramicMaterial} position={[0, 0.12, 0]}>
          <cylinderGeometry args={[1.3, 1.35, 0.04, 64]} />
        </mesh>
      </group>

      {/* Recessed blue accent seam ring between platters 1 and 2 */}
      <mesh material={seamMaterial} position={[0, -0.16, 0]}>
        <torusGeometry args={[1.26, 0.024, 16, 64]} />
      </mesh>

      {/* Platter 2: Middle tier */}
      <group position={[0, 0, 0]}>
        <mesh material={ceramicMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[1.28, 1.28, 0.24, 64]} />
        </mesh>
        {/* Subtle decorative groove */}
        <mesh material={chassisMaterial} position={[0, 0, 0]}>
          <torusGeometry args={[1.285, 0.008, 16, 64]} />
        </mesh>
      </group>

      {/* Platter 3: Top tier */}
      <group position={[0, 0.32, 0]}>
        <mesh material={ceramicMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[1.2, 1.28, 0.24, 64]} />
        </mesh>

        {/* Top surface engineered circular indent */}
        <mesh material={topInsetMaterial} position={[0, 0.125, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.015, 48]} />
        </mesh>

        {/* Central focal node in top platter */}
        <mesh material={ceramicMaterial} position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.35, 0.38, 0.03, 36]} />
        </mesh>

        {/* Subtle blue telemetry pin at center */}
        <mesh material={seamMaterial} position={[0, 0.165, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.02, 24]} />
        </mesh>
      </group>
    </group>
  );
}
