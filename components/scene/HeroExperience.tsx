"use client";

import React, { useMemo, useState } from "react";
import { useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { HOSPITAL_MODULES } from "@/data/modules";
import DataCore from "./DataCore";
import ModuleTile from "./ModuleTile";
import Connection from "./Connection";
import Lighting from "./Lighting";
import StudioEnvironment from "./StudioEnvironment";
import CameraRig from "./CameraRig";

interface HeroExperienceProps {
  onHoverModule?: (id: string | null) => void;
  selectedModuleId?: string | null;
}

/**
 * HeroExperience — DESIGN.md §6
 * The unified, persistent 3D world:
 * - Data Core at center (warm satin ceramic + blue seam)
 * - 9 Module Tiles arranged in a precision radial ring
 * - Physical satin connection cables linking each module to the core
 * - Framed with generous negative space opposite the copy
 */
export default function HeroExperience({
  onHoverModule,
  selectedModuleId,
}: HeroExperienceProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { size } = useThree();
  const aspect = size.width / size.height;

  const ringRadius = 3.3;
  const coreRadius = 1.28;

  // Responsive system group offset:
  // On desktop (aspect >= 1.2), shifts rightward to x = 2.8 so text has ample room on left.
  // On tablet landscape (aspect >= 0.95), shifts rightward to x = 1.8.
  // On tablet portrait (aspect >= 0.6), shifts downward to y = -2.2 below text.
  // On mobile (aspect < 0.6), centers at x = 0 and sets y = -1.8 below headline.
  const systemPosition: [number, number, number] = useMemo(() => {
    if (aspect >= 1.2) return [3.2, 0, 0];
    if (aspect >= 0.95) return [2.0, 0, 0];
    if (aspect >= 0.6) return [0, -2.0, 0];
    return [0, -2.2, 0];
  }, [aspect]);

  // Compute 3D ring layout for the 9 modules
  const layout = useMemo(() => {
    const count = HOSPITAL_MODULES.length;
    return HOSPITAL_MODULES.map((mod, i) => {
      // Offset start angle so top module sits nicely centered
      const angle = (i * 2 * Math.PI) / count - Math.PI / 2;
      const x = ringRadius * Math.cos(angle);
      const z = ringRadius * Math.sin(angle);
      const y = -0.05;

      // Core socket origin (at blue seam height)
      const corePort: [number, number, number] = [
        coreRadius * Math.cos(angle),
        -0.16,
        coreRadius * Math.sin(angle),
      ];

      // Tile docking socket position
      const tilePort: [number, number, number] = [
        (ringRadius - 0.48) * Math.cos(angle),
        -0.12,
        (ringRadius - 0.48) * Math.sin(angle),
      ];

      // Oriented facing center-upward with ~26 degrees tilt to showcase debossed glyphs
      const yaw = -angle - Math.PI / 2;
      const pitch = -0.45;

      return {
        module: mod,
        position: [x, y, z] as [number, number, number],
        rotation: [pitch, yaw, 0] as [number, number, number],
        corePort,
        tilePort,
        angle,
      };
    });
  }, [ringRadius, coreRadius]);

  const activeId = selectedModuleId ?? hoveredId;

  return (
    <>
      <CameraRig />
      <Lighting />
      <StudioEnvironment />

      <group position={systemPosition}>
        {/* Ground Contact Shadow positioned directly under the system */}
        <ContactShadows
          position={[0, -0.65, 0]}
          opacity={0.65}
          scale={15}
          blur={2.4}
          far={5}
          resolution={512}
          color="#000000"
        />

        {/* Central Data Core */}
        <DataCore seamIntensity={activeId ? 1.3 : 1.0} />

        {/* 9 Radial Module Tiles and Physical Cable Connections */}
        {layout.map((item, index) => {
          const isSelected = item.module.id === activeId;

          return (
            <React.Fragment key={item.module.id}>
              {/* Cable connecting DataCore to ModuleTile */}
              <Connection
                start={item.corePort}
                end={item.tilePort}
                offsetPhase={index * 0.11}
                isActive={isSelected}
              />

              {/* Module Tile */}
              <ModuleTile
                module={item.module}
                position={item.position}
                rotation={item.rotation}
                idlePhase={index * 0.7}
                isHovered={isSelected}
                onPointerOver={() => {
                  setHoveredId(item.module.id);
                  onHoverModule?.(item.module.id);
                }}
                onPointerOut={() => {
                  setHoveredId(null);
                  onHoverModule?.(null);
                }}
                onClick={() => {
                  setHoveredId(item.module.id);
                  onHoverModule?.(item.module.id);
                }}
              />
            </React.Fragment>
          );
        })}
      </group>
    </>
  );
}
