"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "../sections/HeroSection";
import SceneMount from "../scene/SceneMount";

export default function HeroFrameClient() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  return (
    <div className="relative min-h-svh w-full bg-canvas text-ink overflow-x-hidden">
      {/* Skip link for keyboard accessibility (DESIGN.md §10) */}
      <a href="#main" className="skip-link">
        Lewati ke konten utama
      </a>

      {/* 3D Scene Layer (Fixed / Absolute behind UI) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 h-full w-full pointer-events-auto"
      >
        <SceneMount
          selectedModuleId={activeModuleId}
          onHoverModule={setActiveModuleId}
        />
      </div>

      {/* Interactive UI Layer */}
      <div className="relative z-10 flex min-h-svh flex-col justify-between">
        <Navbar />
        <main id="main">
          <HeroSection
            activeModuleId={activeModuleId}
            onSelectModule={setActiveModuleId}
          />
        </main>
      </div>
    </div>
  );
}
