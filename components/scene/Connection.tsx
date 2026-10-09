"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  offsetPhase?: number;
  isActive?: boolean;
}

/**
 * Connection — DESIGN.md §6.1
 * Tangible, satin cable connecting each module tile to the central data core.
 * Features a gentle structural arc and a slow, restrained data pulse bead.
 */
export default function Connection({
  start,
  end,
  offsetPhase = 0,
  isActive = false,
}: ConnectionProps) {
  const pulseRef = useRef<THREE.Mesh>(null);

  // Pre-calculate smooth catenary curve
  const curve = useMemo(() => {
    const vStart = new THREE.Vector3(...start);
    const vEnd = new THREE.Vector3(...end);

    // Midpoint dropped slightly for a natural physical drape / low arc
    const mid = new THREE.Vector3()
      .addVectors(vStart, vEnd)
      .multiplyScalar(0.5);
    mid.y -= 0.18; // gentle subtle sag

    return new THREE.QuadraticBezierCurve3(vStart, mid, vEnd);
  }, [start, end]);

  // Cable tube geometry
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 32, 0.02, 12, false);
  }, [curve]);

  // Satin woven dark rubber / cable jacket material
  const cableMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#202025"),
      roughness: 0.65,
      metalness: 0.2,
    });
  }, []);

  // Subtle data pulse bead material (Healthcare Blue #5B7CFF)
  const pulseMaterial = useMemo(() => {
    const col = new THREE.Color(isActive ? "#7593FF" : "#5B7CFF");
    return new THREE.MeshStandardMaterial({
      color: col,
      emissive: col,
      emissiveIntensity: isActive ? 1.4 : 0.8,
      roughness: 0.3,
    });
  }, [isActive]);

  // Restrained pulse travel along curve (period ~5.5s)
  useFrame((state) => {
    if (!pulseRef.current) return;
    const t = state.clock.getElapsedTime();
    const progress = (t * 0.18 + offsetPhase) % 1;
    const point = curve.getPointAt(progress);
    pulseRef.current.position.copy(point);
  });

  return (
    <group>
      {/* Physical satin cable tube */}
      <mesh geometry={tubeGeometry} material={cableMaterial} receiveShadow />

      {/* Discrete physical pulse bead travelling along cable */}
      <mesh ref={pulseRef} material={pulseMaterial}>
        <sphereGeometry args={[0.038, 16, 16]} />
      </mesh>
    </group>
  );
}
