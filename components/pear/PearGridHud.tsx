"use client";

import React from "react";
import { motion } from "framer-motion";

interface PearGridHudProps {
  progress: number;
  currentChapter: number;
}

export default function PearGridHud({ progress, currentChapter }: PearGridHudProps) {
  const percentText = Math.min(100, Math.max(0, Math.round(progress * 100)))
    .toString()
    .padStart(2, "0");

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden select-none"
    >
      {/* Outer framing border lines */}
      <div className="absolute inset-4 sm:inset-6 md:inset-8 border border-white/10 rounded-sm" />

      {/* Primary vertical guide 1 (left rail align) */}
      <div className="absolute top-0 bottom-0 left-12 sm:left-16 md:left-24 lg:left-32 w-px bg-white/[0.08]" />

      {/* Primary vertical guide 2 (right content balance) */}
      <div className="absolute top-0 bottom-0 right-8 sm:right-16 md:right-24 lg:right-32 w-px bg-white/[0.06] hidden md:block" />

      {/* Horizontal guide line (upper third) */}
      <div className="absolute left-0 right-0 top-20 sm:top-24 h-px bg-white/[0.07]" />

      {/* Horizontal guide line (lower third) */}
      <div className="absolute left-0 right-0 bottom-16 sm:bottom-20 h-px bg-white/[0.07]" />

      {/* Crosshair markers (+) at intersections */}
      <div className="absolute top-20 sm:top-24 left-12 sm:left-16 md:left-24 lg:left-32 -translate-x-1/2 -translate-y-1/2 text-accent/80 font-mono text-[11px] leading-none">
        +
      </div>
      <div className="absolute top-20 sm:top-24 right-8 sm:right-16 md:right-24 lg:right-32 -translate-x-1/2 -translate-y-1/2 text-accent/80 font-mono text-[11px] leading-none hidden md:block">
        +
      </div>
      <div className="absolute bottom-16 sm:bottom-20 left-12 sm:left-16 md:left-24 lg:left-32 -translate-x-1/2 -translate-y-1/2 text-accent/80 font-mono text-[11px] leading-none">
        +
      </div>
      <div className="absolute bottom-16 sm:bottom-20 right-8 sm:right-16 md:right-24 lg:right-32 -translate-x-1/2 -translate-y-1/2 text-accent/80 font-mono text-[11px] leading-none hidden md:block">
        +
      </div>

      {/* Subtle corner micro-technical coordinates */}
      <div className="absolute top-2.5 left-8 sm:left-12 text-[9px] tracking-widest text-white/35 font-mono uppercase hidden sm:block">
        AWN · BADUNG.BALI // 8.581° S, 115.177° E
      </div>

      <div className="absolute top-2.5 right-8 sm:right-12 text-[9px] tracking-widest text-accent/70 font-mono uppercase hidden sm:flex items-center gap-1.5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        e-Katalog LKPP: 742 SKUs
      </div>

      {/* Live percentage ticker on bottom left axis */}
      <div className="absolute bottom-6 sm:bottom-8 left-12 sm:left-16 md:left-24 lg:left-32 -translate-x-1/2 flex flex-col items-center">
        <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-accent">
          {percentText}%
        </span>
        <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono">
          PROG
        </span>
      </div>

      {/* Bottom right telemetry — moved higher up above footer bar */}
      <div className="absolute bottom-7 right-8 sm:right-12 text-[10px] tracking-wider text-white/40 font-mono hidden lg:flex items-center gap-4">
        <span>CH.0{currentChapter + 1}</span>
        <span className="text-white/20">|</span>
        <span>STATUS: VERIFIED VENDOR</span>
      </div>
    </div>
  );
}
