"use client";

import React from "react";
import { MachineMode } from "@/components/ui/agentic-factory-3d";

interface AtmosphericBackgroundProps {
  stage: MachineMode;
  fragmentationStep: number;
  isClimax: boolean;
}

/**
 * Pure, serene Apple Studio Mist backdrop (#f5f5f7 to #ffffff).
 * Free of random particles or cybernetic radar rings.
 * Depth fog and spatial mist are rendered natively in Three.js.
 */
export default function AtmosphericBackground({}: AtmosphericBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#f5f5f7]"
    />
  );
}
