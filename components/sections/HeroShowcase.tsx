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
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-pill bg-canvas border border-rule shadow-2xs mb-3 hover:border-accent transition-colors group cursor-pointer"
          >
            <span className="h-2 w-2 rounded-pill bg-accent" />
            <span className="text-xs font-medium text-muted group-hover:text-ink transition-colors">
              {hero.badge}
            </span>
            <span className="text-[10px] text-accent font-semibold tracking-wide">↗</span>
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
              className="inline-flex min-h-11 items-center justify-center rounded-control bg-accent hover:bg-accent-hover px-6 sm:px-7 text-sm font-medium text-on-accent transition-all shadow-xs active:scale-[0.98] gap-2"
            >
              <span>{hero.ctaPrimary.label}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={hero.ctaSecondary.href}
              className="inline-flex min-h-11 items-center justify-center rounded-control border border-rule bg-canvas hover:bg-wash px-5 sm:px-6 text-sm font-medium text-ink transition-all active:scale-[0.98]"
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

              {/* Layar Monitor: Warna Brand Aksen Tenang */}
              <div
                style={{ ...SCREEN_BOX }}
                className="absolute z-30 overflow-hidden rounded-[2px] bg-accent/90 select-none shadow-inner"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
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
