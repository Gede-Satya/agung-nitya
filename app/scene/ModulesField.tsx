"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import ModuleUnit from "./ModuleUnit";
import {
  MODULES,
  moduleFacingY,
  moduleIndices,
  modulePosition,
  moduleRotationY,
} from "./composition";
import { fractureAt, flowAt, storyStore } from "./story";
import { M } from "./materials";

const tmp = new THREE.Vector3();

/**
 * Semua modul rumah sakit — transformasi (fragmentasi + orientasi inti)
 * dihitung satu kali per frame untuk seluruh field, tanpa render ulang React.
 */
export default function ModulesField({ quality }: { quality: "high" | "low" }) {
  const groups = useRef<Array<THREE.Group | null>>([]);
  const indices = moduleIndices(quality);

  useFrame(() => {
    const fracture = fractureAt(storyStore.progress);
    const flow = flowAt(storyStore.progress);

    for (const i of indices) {
      const group = groups.current[i];
      if (!group) continue;
      modulePosition(i, fracture, tmp);
      group.position.copy(tmp);
      group.rotation.y = moduleFacingY(i) + moduleRotationY(i, fracture);
    }

    M.accent.emissiveIntensity = 0.18 + flow * 0.8;
  });

  return (
    <group>
      {indices.map((i) => (
        <group
          key={MODULES[i].id}
          ref={(element) => {
            groups.current[i] = element;
          }}
          scale={MODULES[i].scale}
        >
          <ModuleUnit index={i} />
        </group>
      ))}
    </group>
  );
}
