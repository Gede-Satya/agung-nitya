"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ConnectionTopologyProps {
  progress: number; // 0 to 1 (active in stage 4, progress >= 0.7)
}

/**
 * ConnectionTopology — DESIGN.md §5.2 (Lapisan 5)
 * Garis penghubung ke beberapa titik kecil sebagai simbol "instansi".
 * Mekar dan tersambung rapi pada Tahap 4 (Layanan).
 */
export default function ConnectionTopology({ progress }: ConnectionTopologyProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Institution nodes coordinates in 3D space
  const nodes = useMemo(
    () => [
      { id: "node-1", pos: [-2.4, 0.4, -0.6] as [number, number, number], label: "Dinas / Instansi Daerah" },
      { id: "node-2", pos: [2.5, 0.5, -0.8] as [number, number, number], label: "Pusat Data Wilayah" },
      { id: "node-3", pos: [0.0, 0.8, -2.1] as [number, number, number], label: "Pusat Layanan Instansi Terintegrasi" },
    ],
    []
  );

  // Line paths from device socket positions to nodes
  const lines = useMemo(() => {
    return nodes.map((n) => {
      const points = [
        new THREE.Vector3(0, 0.05, 0),
        new THREE.Vector3(n.pos[0] * 0.4, 0.25, n.pos[2] * 0.4),
        new THREE.Vector3(n.pos[0], n.pos[1], n.pos[2]),
      ];
      const curve = new THREE.CatmullRomCurve3(points);
      return curve.getPoints(32);
    });
  }, [nodes]);

  // Smooth appearance based on scroll progress
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Scale group according to progress (0 at p < 0.7, 1 at p >= 0.85)
    const scale = THREE.MathUtils.clamp((progress - 0.7) / 0.15, 0, 1);
    groupRef.current.scale.set(scale, scale, scale);

    // Subtle breathing pulse for node markers
    const pulse = 1 + Math.sin(t * 2.5) * 0.08;
    nodes.forEach((_, i) => {
      const child = groupRef.current?.children[i];
      if (child) {
        child.scale.set(pulse, pulse, pulse);
      }
    });
  });

  return (
    <group ref={groupRef} name="layer-5-connection-topology">
      {/* 3 Institution Nodes */}
      {nodes.map((node) => (
        <group key={node.id} position={node.pos}>
          {/* Outer halo ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.09, 0.12, 24]} />
            <meshBasicMaterial color="#0B6BAE" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>

          {/* Core Sphere */}
          <mesh>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshStandardMaterial
              color="#0B6BAE"
              emissive="#0B6BAE"
              emissiveIntensity={2.0}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}

      {/* Spline Connection Lines */}
      {lines.map((pts, idx) => {
        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <primitive
            key={`line-${idx}`}
            object={
              new THREE.Line(
                lineGeo,
                new THREE.LineBasicMaterial({
                  color: "#0B6BAE",
                  transparent: true,
                  opacity: 0.6,
                  linewidth: 1.5,
                })
              )
            }
          />
        );
      })}
    </group>
  );
}
