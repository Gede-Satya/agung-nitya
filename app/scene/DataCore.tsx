"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { fractureAt, flowAt, seg, storyStore } from "./story";
import { BRUSHED, GRAPHITE, MATTE, P } from "./palette";
import { M } from "./materials";

const DISCS = [
  { y: 0.78, radius: 1.3 },
  { y: 1.44, radius: 1.08 },
  { y: 2.08, radius: 0.86 },
];

const STRUTS = [45, 135, 225, 315];
const STRIPS = [0, 90, 180, 270];

/**
 * Inti data terpusat — elemen arsitektural: plinth bertingkat, permukaan
 * bertingkat berupa kaca asap, tulang punggung, dan cincin logam sikat.
 * Terangnya hanya dijalur data aktif (DESIGN §9.3, §9.6).
 */
export default function DataCore() {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const rimMats = useRef<Array<THREE.MeshStandardMaterial | null>>([]);
  const light = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const p = storyStore.progress;
    const flow = flowAt(p);
    const fracture = fractureAt(p);
    const staticMode = storyStore.reduced;
    const t = state.clock.elapsedTime;

    /* Yaw terikat ke progres cerita (maks 0 → 0.85 rad) — kamera yang
       mengamati, bukan objek yang berputar tanpa henti (MOTION §7.1). */
    if (group.current) {
      const target = p * 0.85;
      group.current.rotation.y = staticMode
        ? target
        : THREE.MathUtils.damp(group.current.rotation.y, target, 4, delta);
    }

    // Inti menguat saat reconnection & operasional — arsitektur jadi dominan.
    const strength =
      0.3 + flow * 0.6 + seg(p, 0.4, 0.6) * 0.4 - fracture * 0.15;
    const breathe = staticMode ? 0 : Math.sin(t * 1.4) * 0.05;

    M.coreStrip.emissiveIntensity = Math.min(
      0.65,
      Math.max(0.12, 0.26 + strength * 0.4 + breathe),
    );
    rimMats.current.forEach((mat, i) => {
      if (!mat) return;
      mat.emissiveIntensity = Math.min(
        0.45,
        Math.max(0.06, strength * (0.32 + i * 0.1)),
      );
      mat.opacity = 0.3 + flow * 0.32;
    });
    if (light.current) {
      light.current.intensity = Math.min(2.2, 1.1 + flow * 1.4);
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0.07, 0]} castShadow={false}>
        <cylinderGeometry args={[1.66, 1.78, 0.14, 56]} />
        <meshStandardMaterial {...GRAPHITE} />
      </mesh>
      <mesh position={[0, 0.19, 0]}>
        <cylinderGeometry args={[1.44, 1.54, 0.1, 56]} />
        <meshStandardMaterial {...MATTE} />
      </mesh>

      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.4, 0.44, 2.36, 24]} />
        <meshStandardMaterial {...GRAPHITE} />
      </mesh>

      {STRIPS.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <mesh
            key={angle}
            position={[Math.cos(rad) * 0.41, 1.42, Math.sin(rad) * 0.41]}
            rotation={[0, Math.atan2(Math.cos(rad), Math.sin(rad)), 0]}
            material={M.coreStrip}
          >
            <boxGeometry args={[0.07, 2.16, 0.03]} />
          </mesh>
        );
      })}

      {STRUTS.map((angle) => (
        <mesh
          key={angle}
          position={[
            Math.cos((angle * Math.PI) / 180) * 1.12,
            1.42,
            Math.sin((angle * Math.PI) / 180) * 1.12,
          ]}
        >
          <boxGeometry args={[0.055, 2.4, 0.055]} />
          <meshStandardMaterial {...BRUSHED} />
        </mesh>
      ))}

      {DISCS.map((disc, i) => (
        <group key={disc.y} position={[0, disc.y, 0]}>
          <mesh>
            <cylinderGeometry args={[disc.radius, disc.radius, 0.055, 48]} />
            <meshStandardMaterial
              color={P.surface}
              roughness={0.16}
              metalness={0.2}
              transparent
              opacity={0.34}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[disc.radius, 0.014, 8, 64]} />
            <meshStandardMaterial
              ref={(mat) => {
                rimMats.current[i] = mat;
              }}
              color="#1b2340"
              emissive={P.blue}
              emissiveIntensity={0.6}
              roughness={0.4}
              metalness={0.1}
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      ))}

      <mesh ref={ringA} position={[0, 1.1, 0]} rotation={[0.16, 0, 0]}>
        <torusGeometry args={[1.46, 0.022, 10, 72]} />
        <meshStandardMaterial {...BRUSHED} />
      </mesh>
      <mesh ref={ringB} position={[0, 1.86, 0]} rotation={[-0.12, 0, 0]}>
        <torusGeometry args={[1.62, 0.016, 10, 72]} />
        <meshStandardMaterial {...BRUSHED} />
      </mesh>

      <mesh position={[0, 2.64, 0]}>
        <cylinderGeometry args={[0.46, 0.58, 0.14, 32]} />
        <meshStandardMaterial {...MATTE} />
      </mesh>
      <mesh position={[0, 2.72, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.03, 24]} />
        <meshStandardMaterial
          color="#141a3d"
          emissive={P.blue}
          emissiveIntensity={0.5}
          roughness={0.4}
        />
      </mesh>

      <pointLight ref={light} position={[0, 1.5, 0]} distance={8} color={P.blue} />
    </group>
  );
}
