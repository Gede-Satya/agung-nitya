"use client";

import React from "react";
import { motion } from "framer-motion";

export interface Chapter {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  targetProgress: number;
}

export const CHAPTERS: Chapter[] = [
  {
    id: "mandate",
    num: "Ch. 1",
    title: "The Mandate",
    subtitle: "Penyedia Resmi LKPP",
    targetProgress: 0.05,
  },
  {
    id: "inventory",
    num: "Ch. 2",
    title: "The Inventory",
    subtitle: "742 Produk INAPROC",
    targetProgress: 0.35,
  },
  {
    id: "governance",
    num: "Ch. 3",
    title: "The Governance",
    subtitle: "Kepatuhan & SLA",
    targetProgress: 0.65,
  },
  {
    id: "inquiry",
    num: "Ch. 4",
    title: "The Inquiry",
    subtitle: "FAQ & Permohonan",
    targetProgress: 0.92,
  },
];

interface PearChapterRailProps {
  currentChapter: number;
  onSelectChapter: (progress: number) => void;
}

export default function PearChapterRail({
  currentChapter,
  onSelectChapter,
}: PearChapterRailProps) {
  return (
    <nav
      aria-label="Navigasi Bab Scrollytelling"
      className="fixed left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-5 sm:gap-6 pointer-events-auto"
    >
      {CHAPTERS.map((ch, idx) => {
        const isActive = currentChapter === idx;

        return (
          <button
            key={ch.id}
            onClick={() => onSelectChapter(ch.targetProgress)}
            className="group relative flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1"
            title={`${ch.num}: ${ch.title}`}
          >
            {/* Indicator tick mark */}
            <div className="relative flex items-center justify-center w-6">
              <span
                className={`block transition-all duration-300 ${
                  isActive
                    ? "w-4 h-[2px] bg-accent shadow-[0_0_8px_rgba(201,162,39,0.8)]"
                    : "w-2 h-[1px] bg-white/30 group-hover:w-3 group-hover:bg-white/60"
                }`}
              />
            </div>

            {/* Chapter labels (shown on tablet & desktop) */}
            <div className="hidden lg:flex flex-col ml-2.5 transition-all duration-300">
              <span
                className={`font-mono text-[10px] uppercase tracking-wider transition-colors duration-200 ${
                  isActive ? "text-accent font-semibold" : "text-white/40 group-hover:text-white/70"
                }`}
              >
                {ch.num}
              </span>
              <span
                className={`font-editorial text-xs transition-colors duration-200 ${
                  isActive ? "text-white font-medium" : "text-white/40 group-hover:text-white/70"
                }`}
              >
                {ch.title}
              </span>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
