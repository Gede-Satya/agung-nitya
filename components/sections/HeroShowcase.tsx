"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

const DEFAULT_EASE = [0.22, 1, 0.36, 1] as const;

interface HeroSceneItem {
  id: string;
  tag: string;
  label: string;
  video: string;
  poster: string;
}

const HERO_SCENES: HeroSceneItem[] = [
  {
    id: "01",
    tag: "01 // EKSTERIOR GEDUNG & FASILITAS",
    label: "Gedung & Lobi",
    video: "/films/perusahaan-loop.mp4",
    poster: "/films/perusahaan-loop-poster.jpg",
  },
  {
    id: "02",
    tag: "02 // PERENCANAAN & KOLABORASI TIM",
    label: "Ruang Kantor",
    video: "/films/kantor-loop.mp4",
    poster: "/films/kantor-loop-poster.jpg",
  },
  {
    id: "03",
    tag: "03 // PUSAT DATA & RAK SERVER",
    label: "Server Room",
    video: "/films/server-loop.mp4",
    poster: "/films/server-loop-poster.jpg",
  },
  {
    id: "04",
    tag: "04 // PEMELIHARAAN & DIAGNOSTIK HARDWARE",
    label: "Pemeliharaan",
    video: "/films/pemeliharaan-loop.mp4",
    poster: "/films/pemeliharaan-loop-poster.jpg",
  },
  {
    id: "05",
    tag: "05 // SOLUSI KONSULTASI & WORKSTATION",
    label: "Konsultasi",
    video: "/films/penutup-loop.mp4",
    poster: "/films/penutup-loop-poster.jpg",
  },
];

export default function HeroShowcase() {
  const hero = SITE_CONTENT.hero;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const duration = 6500; // 6.5s per scene

  // Automatic rotation timer with progress tracking
  useEffect(() => {
    let startTime = performance.now();
    let frameId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (elapsed >= duration) {
        setCurrentIdx((prev) => (prev + 1) % HERO_SCENES.length);
        startTime = now;
        setProgress(0);
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [currentIdx]);

  const activeScene = HERO_SCENES[currentIdx];

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#0d1c36] text-white min-h-screen flex flex-col justify-between py-12 md:py-20"
    >
      {/* Background Media: Dynamic Crossfade Video */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeScene.video}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={activeScene.poster}
              className="w-full h-full object-cover object-center"
            >
              <source src={activeScene.video} type="video/mp4" />
            </video>
          </motion.div>
        </AnimatePresence>

        {/* Dark Navy Atmospheric Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1c36]/96 via-[#0f2444]/90 via-35% md:via-42% to-[#0d1c36]/25 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b172c]/85 via-transparent to-[#0b172c]/40" />
      </div>

      {/* Hero Center-Left Content Block */}
      <div className="shell relative z-10 w-full my-auto px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: DEFAULT_EASE }}
          className="max-w-2xl"
        >
          {/* Eyebrow Badge (Dynamic per scene) */}
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="w-2 h-2 bg-[#d2e4fc] inline-block shrink-0" />
            <motion.span
              key={activeScene.tag}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-xs sm:text-sm tracking-[0.14em] uppercase text-[#d2e4fc] font-semibold"
            >
              {activeScene.tag}
            </motion.span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="font-heading not-italic text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.05] tracking-tight drop-shadow-md">
            <span className="block">Pengadaan</span>
            <span className="block">Perangkat IT dan</span>
            <span className="block">Perlengkapan Institusi</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-white/85 font-normal leading-relaxed max-w-lg">
            {hero.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-row flex-wrap items-center gap-4">
            <Link
              href={hero.ctaPrimary.href}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#0B192C] border border-white/20 px-6 py-3 text-xs sm:text-sm font-mono font-semibold text-white shadow-xl shadow-black/30 transition-all hover:bg-[#112847] hover:border-white/40 active:scale-[0.98]"
            >
              <span>{hero.ctaPrimary.label}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href={hero.ctaSecondary.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/5 px-6 py-3 text-xs sm:text-sm font-mono font-semibold text-white backdrop-blur-md transition-all hover:bg-white/15 hover:border-white active:scale-[0.98]"
            >
              <span>{hero.ctaSecondary.label}</span>
              <ArrowDown className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Bar with Interactive Scene Switcher */}
      <div className="shell relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto pt-6 border-t border-white/15">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {HERO_SCENES.map((sc, idx) => {
              const isActive = idx === currentIdx;
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    setCurrentIdx(idx);
                    setProgress(0);
                  }}
                  className={`relative overflow-hidden rounded-full px-3.5 py-1.5 text-xs font-mono font-medium transition-all backdrop-blur-md border ${
                    isActive
                      ? "bg-[#0B192C]/80 border-[#d2e4fc]/80 text-white shadow-lg shadow-black/40"
                      : "bg-white/5 border-white/15 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className="font-bold text-[#d2e4fc]">{sc.id}</span>
                    <span className="hidden md:inline font-sans text-xs">{sc.label}</span>
                  </span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
