"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

const DEFAULT_EASE = [0.22, 1, 0.36, 1] as const;

// Physical Monitor screen surface coordinates within bezel
const SCREEN_BOX = {
  left: "8.9%",
  top: "6.5%",
  width: "82.2%",
  height: "64.0%",
} as const;

export default function HeroShowcase() {
  const reduceMotion = useReducedMotion() ?? false;
  const hero = SITE_CONTENT.hero;

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100svh-3.5rem)] bg-wash text-ink flex flex-col justify-between pt-20 sm:pt-24 pb-4 overflow-hidden select-none"
    >
      <div className="shell flex flex-col items-center text-center flex-1 justify-center my-auto w-full">
        {/* Header Block: Headline, Subtitle, CTAs, Chips */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: DEFAULT_EASE }}
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <a
            href={SITE_CONTENT.company.inaprocUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${hero.badge} di INAPROC LKPP (buka tab baru)`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-canvas border border-rule shadow-2xs mb-3 hover:border-accent transition-colors group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="h-2 w-2 rounded-pill bg-accent" />
            <span className="text-xs font-medium text-muted group-hover:text-ink transition-colors">
              {hero.badge}
            </span>
            <span className="text-xs text-accent font-semibold tracking-wide">↗</span>
          </a>

          {/* 1. Headline */}
          <h1 className="font-heading type-hero text-ink text-balance max-w-4xl">
            {hero.title}
          </h1>

          {/* 2. Subjudul */}
          <p className="mt-3 type-body text-muted max-w-2xl text-balance">
            {hero.subtitle}
          </p>

          {/* 3. CTA Buttons (Primary: Lihat Katalog, Secondary: Minta Penawaran) */}
          <div className="mt-5 flex flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href={hero.ctaPrimary.href}
              className="inline-flex min-h-11 items-center justify-center rounded-control bg-accent hover:bg-accent-hover px-6 sm:px-7 text-sm font-semibold text-on-accent transition-all shadow-xs active:scale-[0.98] gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <span>{hero.ctaPrimary.label}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={hero.ctaSecondary.href}
              className="inline-flex min-h-11 items-center justify-center rounded-control border border-rule bg-canvas hover:bg-wash px-5 sm:px-6 text-sm font-medium text-ink transition-all active:scale-[0.98] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {hero.ctaSecondary.label}
            </a>
          </div>

          {/* 4. Chip Kategori */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-2xl">
            {hero.categoryChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center px-3 py-1 rounded-pill bg-canvas border border-rule text-muted text-xs font-medium shadow-2xs"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 5. Visual Produk: Komposisi Tunggal (Server rack, monitor, UPS) */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: DEFAULT_EASE }}
          className="relative w-full max-w-[840px] mt-4 mx-auto flex flex-col items-center"
        >
          {/* Baseline Row */}
          <div className="relative w-full flex items-end justify-center gap-3 sm:gap-6 md:gap-8 z-10 px-4">
            {/* Kiri: Server Rack */}
            <div className="relative w-[90px] sm:w-[125px] md:w-[145px] lg:w-[165px] aspect-[1/1] shrink-0 transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="/images/hero-trio-rack-hd.png"
                alt="Ilustrasi rak server dan pusat data"
                fill
                priority
                className="object-contain object-bottom pointer-events-none select-none drop-shadow-sm"
                sizes="(max-width: 768px) 125px, 165px"
              />
            </div>

            {/* Tengah: Monitor Komersial */}
            <div className="relative w-[190px] sm:w-[270px] md:w-[325px] lg:w-[365px] aspect-[507/386] shrink-0 z-20 transition-transform duration-300 hover:scale-[1.01]">
              <Image
                src="/images/hero-monitor-flawless.png"
                alt="Ilustrasi monitor komersial dan stasiun kerja"
                fill
                priority
                className="object-contain object-bottom pointer-events-none select-none z-10"
                sizes="(max-width: 768px) 270px, 365px"
              />

              {/* Layar Monitor: Dashboard Preview Interaktif & Realistis */}
              <div
                style={{ ...SCREEN_BOX }}
                className="absolute z-30 overflow-hidden rounded-[2px] bg-[#0E1726] text-white select-none shadow-inner flex flex-col p-1.5 sm:p-2.5 font-sans"
              >
                {/* Window Header */}
                <div className="flex items-center justify-between pb-1 sm:pb-1.5 border-b border-white/10 shrink-0">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-400/80" />
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400/80" />
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400/80" />
                    <span className="ml-1 text-[8px] sm:text-[10px] font-semibold text-white/90 tracking-tight hidden xs:inline">
                      INAPROC LKPP Portal
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded-full bg-accent/30 text-accent-hover text-[7px] sm:text-[9px] font-medium border border-accent/40 text-blue-300">
                      742 Produk
                    </span>
                  </div>
                </div>

                {/* Dashboard Body */}
                <div className="flex-1 flex flex-col justify-between pt-1 sm:pt-2 min-h-0">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
                    <div className="p-1 sm:p-1.5 rounded bg-white/5 border border-white/10">
                      <div className="text-[6px] sm:text-[8px] text-white/60">Server Rack</div>
                      <div className="text-[8px] sm:text-[11px] font-bold text-white leading-tight">Ready BoQ</div>
                    </div>
                    <div className="p-1 sm:p-1.5 rounded bg-white/5 border border-white/10">
                      <div className="text-[6px] sm:text-[8px] text-white/60">Workstation</div>
                      <div className="text-[8px] sm:text-[11px] font-bold text-blue-400 leading-tight">E-Katalog</div>
                    </div>
                    <div className="p-1 sm:p-1.5 rounded bg-white/5 border border-white/10">
                      <div className="text-[6px] sm:text-[8px] text-white/60">Status UMKK</div>
                      <div className="text-[8px] sm:text-[11px] font-bold text-emerald-400 leading-tight">Aktif Bali</div>
                    </div>
                  </div>

                  {/* Mini Visual Bar / Flow */}
                  <div className="p-1 sm:p-1.5 rounded bg-white/5 border border-white/10 flex items-end justify-between gap-1 h-6 sm:h-10 mt-1">
                    <div className="w-1/6 bg-blue-500/40 rounded-t h-[40%]" />
                    <div className="w-1/6 bg-blue-500/60 rounded-t h-[65%]" />
                    <div className="w-1/6 bg-blue-500/80 rounded-t h-[90%]" />
                    <div className="w-1/6 bg-blue-400 rounded-t h-[75%]" />
                    <div className="w-1/6 bg-accent rounded-t h-[100%]" />
                    <div className="w-1/6 bg-emerald-400/90 rounded-t h-[85%]" />
                  </div>
                </div>

                {/* Glass Reflection Highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none" />
              </div>
            </div>

            {/* Kanan: Unit UPS */}
            <div className="relative w-[90px] sm:w-[125px] md:w-[145px] lg:w-[165px] aspect-[4/3] shrink-0 transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="/images/hero-trio-ups-hd.png"
                alt="Ilustrasi unit catu daya cadangan UPS"
                fill
                priority
                className="object-contain object-bottom pointer-events-none select-none drop-shadow-sm"
                sizes="(max-width: 768px) 125px, 165px"
              />
            </div>
          </div>

          {/* Bayangan Lantai Lembut */}
          <div
            aria-hidden="true"
            className="w-[88%] max-w-[720px] h-3.5 sm:h-4 mx-auto bg-ink/10 blur-[10px] sm:blur-[12px] rounded-pill pointer-events-none -mt-1.5 sm:-mt-2 z-0"
          />
        </motion.div>
      </div>

      {/* 6. Trust Strip */}
      <div className="w-full mt-3 pt-3 pb-1 border-t border-rule/60">
        <div className="shell flex items-center justify-center flex-wrap gap-x-6 sm:gap-x-8 gap-y-2 text-xs text-muted">
          {hero.trustPoints.map((point) => (
            <div key={point} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              <span className="font-medium text-ink">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
