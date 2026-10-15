"use client";

import React from "react";
import { ContactShadows } from "@react-three/drei";
import GenericITDevice from "./GenericITDevice";
import Lighting from "./Lighting";
import StudioEnvironment from "./StudioEnvironment";
import CameraRig from "./CameraRig";

interface HeroExperienceProps {
  pointer?: { x: number; y: number };
  scrollProgress?: number;
}

/**
 * HeroExperience — DESIGN.md §5 & §6
 * Studio environment containing:
 * - Studio lighting & local Lightformers
 * - Contact shadows for realistic grounding
 * - SATU perangkat TI generik (GenericITDevice) with scroll-driven layers
 * - Narrow FOV camera rig
 */
export default function HeroExperience({ pointer, scrollProgress = 0 }: HeroExperienceProps) {
  return (
    <>
      <CameraRig scrollProgress={scrollProgress} />
      <Lighting />
      <StudioEnvironment />

      {/* Ground Contact Shadow positioned directly under the device */}
      <ContactShadows
        position={[0, -0.62, 0]}
        opacity={0.65}
        scale={8.5}
        blur={2.2}
        far={3.5}
        resolution={512}
        color="#000000"
      />

      {/* The Generic IT Device with 5 deconstructable layers */}
      <GenericITDevice pointer={pointer} scrollProgress={scrollProgress} />
    </>
  );
}
