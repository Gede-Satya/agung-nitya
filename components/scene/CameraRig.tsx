"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

interface CameraRigProps {
  /** Optional pointer damping for desktop subtle mouse response */
  enablePointerResponse?: boolean;
}

/**
 * CameraRig — DESIGN.md §5.3
 * Narrow FOV (30-35°) studio camera rig tailored for product photography.
 * Calibrated for clean framing of the Generic IT Device on both desktop (1440px)
 * and mobile portrait (390px).
 */
export default function CameraRig({
  enablePointerResponse = true,
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

    // Default Desktop framing (FOV 32°)
    let targetX = 0;
    let targetY = 2.3;
    let targetZ = 7.6;
    let targetFov = 32;
    const lookAtX = 0;
    const lookAtY = -0.15;

    if (aspect < 0.75) {
      // Mobile portrait (390px): centered framing with comfortable buffer
      targetX = 0;
      targetY = 2.4;
      targetZ = 8.2;
      targetFov = 33;
    } else if (aspect < 1.1) {
      // Tablet view
      targetX = 0;
      targetY = 2.3;
      targetZ = 7.8;
      targetFov = 32;
    }

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

    const currentLookAt = new THREE.Vector3(lookAtX, lookAtY, 0);
    cam.lookAt(currentLookAt);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 2.0, 6.2]}
      fov={33}
      near={0.1}
      far={40}
    />
  );
}
