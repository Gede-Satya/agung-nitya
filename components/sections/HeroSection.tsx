"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck, Database, MapPin } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";
import SceneCanvas from "@/components/scene/SceneCanvas";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function HeroSection() {
  const prefersReduced = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setPointer({ x, y });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative z-10 min-h-[calc(100svh-3.5rem)] w-full flex flex-col justify-center pt-14 pb-8 sm:pt-20 sm:pb-16 overflow-hidden"
    >
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center">
          {/* Left Column: Official Positioning, Headline, Single CTA, & Verified Facts */}
          <div className="lg:col-span-7 flex flex-col items-start gap-3.5 sm:gap-6">
            {/* 1. Official Verification Badge */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-graphite/90 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs text-muted"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-medium text-primary tracking-wide">
                {SITE_CONTENT.headline.badge}
              </span>
            </motion.div>

            {/* 2. Headline <h1>: Clean, Architectural, Space Grotesk 500 */}
            <motion.h1
              initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
              className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-medium leading-[1.15] tracking-tight text-primary"
            >
              <span>{SITE_CONTENT.headline.title}</span>{" "}
              <span className="text-accent">{SITE_CONTENT.headline.titleAccent}</span>
            </motion.h1>

            {/* 3. Subtitle: Clear & Factual */}
            <motion.p
              initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
              className="text-muted text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl"
            >
              {SITE_CONTENT.headline.subtitle}
            </motion.p>

            {/* 4. Single Primary CTA Button (Lihat Profil di INAPROC) */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-0.5 w-full sm:w-auto"
            >
              <a
                href={SITE_CONTENT.headline.ctaPrimary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] sm:min-h-[48px] items-center justify-center gap-2 rounded-xl bg-accent px-5 sm:px-6 py-2.5 sm:py-3 font-heading text-xs sm:text-sm font-medium text-white shadow-sm transition-all duration-150 hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span>{SITE_CONTENT.headline.ctaPrimary.label}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </motion.div>

            {/* 5. Verified Facts Strip (Katalog 742 Produk, Tipe UMKK, Lokasi Badung Bali) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="grid grid-cols-3 gap-2 sm:gap-3 pt-2.5 sm:pt-6 border-t border-border/80 w-full"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2.5 p-2 sm:p-2.5 rounded-lg bg-graphite/40 border border-border/50">
                <Database className="h-3.5 w-3.5 text-accent shrink-0" />
                <div className="flex flex-col">
                  <span className="font-heading text-[11px] sm:text-sm font-semibold text-primary">
                    {SITE_CONTENT.company.activeProductsCount} Produk
                  </span>
                  <span className="text-[9px] sm:text-[11px] text-muted">
                    Tayang INAPROC
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2.5 p-2 sm:p-2.5 rounded-lg bg-graphite/40 border border-border/50">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-heading text-[11px] sm:text-sm font-semibold text-primary">
                    Tipe {SITE_CONTENT.company.inaprocProviderType}
                  </span>
                  <span className="text-[9px] sm:text-[11px] text-muted">Penyedia Resmi</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2.5 p-2 sm:p-2.5 rounded-lg bg-graphite/40 border border-border/50">
                <MapPin className="h-3.5 w-3.5 text-muted shrink-0" />
                <div className="flex flex-col">
                  <span className="font-heading text-[11px] sm:text-sm font-semibold text-primary">
                    Badung, Bali
                  </span>
                  <span className="text-[9px] sm:text-[11px] text-muted">
                    {SITE_CONTENT.company.legalType}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: SATU Perangkat TI Generik (3D Canvas) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative w-full h-[280px] sm:h-[400px] lg:h-[520px] rounded-2xl border border-border/70 bg-graphite/30 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-2xl"
            >
              {/* The 3D Scene Canvas */}
              <SceneCanvas pointer={pointer} />

              {/* Minimalist Micro Label in Corner */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-muted px-2 py-1 rounded bg-canvas/80 border border-border/50 backdrop-blur-sm pointer-events-none">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Perangkat Keras & Solusi Terpadu
                </span>
                <span className="font-mono text-[10px]">INAPROC UMKK</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
