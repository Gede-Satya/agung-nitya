"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

interface CameraRigProps {
  /** Optional pointer damping for desktop subtle mouse response */
  enablePointerResponse?: boolean;
  /** Scroll progress through choreography (0.0 to 1.0) */
  scrollProgress?: number;
}

function smoothstep(min: number, max: number, val: number) {
  const x = Math.max(0, Math.min(1, (val - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

/**
 * CameraRig — DESIGN.md §5.3
 * Narrow FOV (30-35°) studio camera rig with smooth scroll tracking
 * and responsive framing across all viewport sizes.
 */
export default function CameraRig({
  enablePointerResponse = true,
  scrollProgress = 0,
}: CameraRigProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const pointerPos = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    if (!enablePointerResponse) return;
    const handlePointerMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointerPos.current.x = nx;
      pointerPos.current.y = ny;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [enablePointerResponse]);

  useFrame(() => {
    const cam = cameraRef.current;
    if (!cam) return;

    const aspect = size.width / size.height;
    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);

    // Scroll transitions across 4 stages
    const sHardware = smoothstep(0.18, 0.38, p);
    const sSoftware = smoothstep(0.42, 0.65, p);
    const sServices = smoothstep(0.68, 0.92, p);

    const baseTargetX = 0;
    let baseTargetY = 2.3 + sHardware * 0.4 - sSoftware * 0.2 - sServices * 0.2;
    let baseTargetZ = 7.6 - sHardware * 0.4 + sSoftware * 0.5 + sServices * 0.5;
    let targetFov = 32 + sServices * 1.5;
    let lookAtY = -0.15 + sHardware * 0.15;

    if (aspect < 0.75) {
      // Mobile portrait (390px): centered with comfortable buffer
      baseTargetY = 2.3 + sHardware * 0.3;
      baseTargetZ = 8.2 - sHardware * 0.2 + sSoftware * 0.4;
      targetFov = 33;
      lookAtY = -0.1;
    } else if (aspect < 1.1) {
      // Tablet view
      baseTargetY = 2.3 + sHardware * 0.35;
      baseTargetZ = 7.8 - sHardware * 0.3 + sSoftware * 0.4;
      targetFov = 32;
    }

    let targetX = baseTargetX;
    let targetY = baseTargetY;
    const targetZ = baseTargetZ;

    // Subtle pointer response on desktop (restrained, gentle)
    if (enablePointerResponse && aspect >= 1.0) {
      targetX += pointerPos.current.x * 0.18;
      targetY += -pointerPos.current.y * 0.12;
    }

    // Smooth dampening towards target pose
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, targetX, 0.04);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, targetY, 0.04);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, targetZ, 0.04);

    if (Math.abs(cam.fov - targetFov) > 0.01) {
      cam.fov = THREE.MathUtils.lerp(cam.fov, targetFov, 0.04);
      cam.updateProjectionMatrix();
    }

    const currentLookAt = new THREE.Vector3(0, lookAtY, 0);
    cam.lookAt(currentLookAt);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 2.3, 7.6]}
      fov={32}
      near={0.1}
      far={40}
    />
  );
}
