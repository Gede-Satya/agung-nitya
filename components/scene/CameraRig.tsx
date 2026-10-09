"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

interface CameraRigProps {
  /** Optional pointer damping for desktop subtle mouse response (DESIGN.md §6.3) */
  enablePointerResponse?: boolean;
}

/**
 * CameraRig — DESIGN.md §6.3
 * Responsively frames the Unified Hospital Data System:
 * - On widescreen desktop (1440px): frames 3D system on right side with zero text collision
 * - On tablet landscape (1024px): offsets rightward with comfortable margins
 * - On tablet portrait (768px) & mobile (390px): projects 3D system cleanly into lower viewport below text copy
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

    let targetX = 0.8;
    let targetY = 5.0;
    let targetZ = 7.6;
    let targetFov = 37;
    let lookAtX = 0.8;
    let lookAtY = -0.15;

    if (aspect < 0.6) {
      // Mobile portrait (390px):
      // System sits cleanly in lower half of viewport below headline and CTAs
      targetX = 0;
      targetY = 6.0;
      targetZ = 8.8;
      targetFov = 42;
      lookAtX = 0;
      lookAtY = 1.2;
    } else if (aspect < 0.95) {
      // Tablet portrait (768px):
      // Projects 3D system down into lower viewport cleanly below text
      targetX = 0;
      targetY = 6.4;
      targetZ = 9.4;
      targetFov = 40;
      lookAtX = 0;
      lookAtY = 1.8;
    } else if (aspect < 1.2) {
      // Tablet landscape / small laptop (1024px)
      targetX = 0.4;
      targetY = 5.2;
      targetZ = 7.8;
      targetFov = 37;
      lookAtX = 0.4;
      lookAtY = 0;
    } else {
      // Desktop widescreen (1440px+)
      targetX = 1.0;
      targetY = 5.0;
      targetZ = 7.6;
      targetFov = 37;
      lookAtX = 1.0;
      lookAtY = -0.15;
    }

    // Subtle pointer response (desktop only, restrained)
    if (enablePointerResponse && aspect >= 1.0) {
      targetX += pointerPos.current.x * 0.2;
      targetY += -pointerPos.current.y * 0.15;
    }

    // Smooth dampening towards target pose
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, targetX, 0.05);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, targetY, 0.05);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, targetZ, 0.05);

    if (Math.abs(cam.fov - targetFov) > 0.01) {
      cam.fov = THREE.MathUtils.lerp(cam.fov, targetFov, 0.05);
      cam.updateProjectionMatrix();
    }

    const currentLookAt = new THREE.Vector3(lookAtX, lookAtY, 0);
    cam.lookAt(currentLookAt);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0.8, 5.0, 7.6]}
      fov={37}
      near={0.1}
      far={50}
    />
  );
}
