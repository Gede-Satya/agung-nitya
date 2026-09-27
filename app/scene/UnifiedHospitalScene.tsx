"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import CameraRig from "./CameraRig";
import Connections from "./Connections";
import DataCore from "./DataCore";
import Environment from "./Environment";
import Lighting from "./Lighting";
import ModulesField from "./ModulesField";
import { subscribeStory } from "./story";

export interface SceneProps {
  quality?: "high" | "low";
}

/**
 * Unified Hospital Data System — satu scene yang berevolusi mengikuti
 * progres scroll (DESIGN §9, §10; MOTION §30). Tidak ada scene terpisah
 * per seksi.
 */
export default function UnifiedHospitalScene({ quality = "high" }: SceneProps) {
  /* Frameloop "demand" (reduced motion) hanya render saat diminta — listener
     ini meneruskan perubahan story menjadi render ulang. */
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => subscribeStory(() => invalidate()), [invalidate]);

  return (
    <group>
      <Lighting />
      <Environment />
      <DataCore />
      <ModulesField quality={quality} />
      <Connections quality={quality} />
      <CameraRig />
    </group>
  );
}
