"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

// Apple standard cubic-bezier curve
const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

// Physical Monitor screen surface coordinates within bezel
const SCREEN_BOX = {
  left: "8.9%",
  top: "6.5%",
  width: "82.2%",
  height: "64.0%",
} as const;

const CATEGORY_CHIPS = [
  "Komputer & Workstation",
  "Server Rack & Storage",
  "Backup Power (UPS)",
  "Commercial Display",
] as const;

const TRUST_POINTS = [
  "Tersedia di E-Katalog INAPROC",
  "Penawaran & Faktur Pajak Resmi",
  "Garansi Resmi Distributor",
  "Dukungan Teknis & BoQ Tender",
] as const;

export default function HeroShowcase() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative w-full min-h-[calc(100svh-3.5rem)] lg:h-[calc(100svh-3.5rem)] max-h-[1080px] bg-[#f5f5f7] text-[#1d1d1f] flex flex-col justify-between pt-16 sm:pt-20 pb-2 sm:pb-3 overflow-hidden select-none">
      <div className="shell flex flex-col items-center text-center flex-1 justify-center my-auto w-full">
        {/* Header Block: Headline, Subtitle, CTA, Chips */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          {/* 1. Headline (~56px desktop, semibold, tracking rapat) */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-semibold tracking-[-0.03em] text-[#1d1d1f] text-balance leading-[1.1] max-w-4xl">
            Pengadaan perangkat IT untuk instansi dan proyek pemerintah.
          </h1>

          {/* 2. Subjudul */}
          <p className="mt-2 text-[14px] sm:text-[16px] md:text-[17px] text-[#6e6e73] font-normal max-w-2xl text-balance leading-relaxed">
            Komputer, server, UPS, dan display dengan penawaran resmi, tersedia juga lewat e-katalog INAPROC.
          </p>

          {/* 3. CTA Buttons (Primary #0B6BAE + Secondary Chat WhatsApp) */}
          <div className="mt-3.5 sm:mt-4 flex flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#cta-pengadaan"
              className="inline-flex h-10 sm:h-11 items-center justify-center rounded-full bg-[#0B6BAE] hover:bg-[#085891] px-6 sm:px-7 text-[14px] sm:text-[15px] font-medium text-white transition-all shadow-[0_2px_8px_rgba(11,107,174,0.25)] hover:shadow-[0_4px_14px_rgba(11,107,174,0.35)] active:scale-[0.98]"
            >
              Minta Penawaran
            </a>
            <a
              href={SITE_CONTENT.company.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 sm:h-11 items-center justify-center rounded-full border border-[#0B6BAE] text-[#0B6BAE] hover:bg-[#0B6BAE]/8 px-5 sm:px-6 text-[14px] sm:text-[15px] font-medium transition-all active:scale-[0.98] gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#0B6BAE]" />
              <span>Chat WhatsApp</span>
            </a>
          </div>

          {/* 4. Chip Kategori */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-2xl">
            {CATEGORY_CHIPS.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center px-3 py-0.5 sm:px-3.5 sm:py-0.5 rounded-full bg-white border border-[#d2d2d7]/70 text-[#424245] text-[11px] sm:text-[12px] font-medium tracking-tight shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 5. Visual Produk: Komposisi Tunggal (Rak Server kiri, Monitor Besar tengah, UPS kanan) */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: APPLE_EASE }}
          className="relative w-full max-w-[840px] mt-3 sm:mt-4 mx-auto flex flex-col items-center"
        >
          {/* Baseline Row: Semua produk berdiri di baseline yang sama */}
          <div className="relative w-full flex items-end justify-center gap-2 sm:gap-5 md:gap-7 z-10 px-4">
            {/* Kiri: Rak Server Indorack */}
            <div className="relative w-[90px] sm:w-[125px] md:w-[145px] lg:w-[165px] aspect-[1/1] shrink-0 transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="/images/hero-trio-rack-hd.png"
                alt="Indorack Server Rack Cabinet"
                fill
                priority
                className="object-contain object-bottom pointer-events-none select-none drop-shadow-[0_6px_14px_rgba(0,0,0,0.08)]"
                sizes="(max-width: 768px) 125px, 165px"
              />
            </div>

            {/* Tengah: Monitor Besar (Layar Gradient Brand Polos) */}
            <div className="relative w-[190px] sm:w-[270px] md:w-[325px] lg:w-[365px] aspect-[507/386] shrink-0 z-20 transition-transform duration-300 hover:scale-[1.01]">
              <Image
                src="/images/hero-monitor-flawless.png"
                alt="Monitor & Display Komersial Enterprise"
                fill
                priority
                className="object-contain object-bottom pointer-events-none select-none z-10"
                sizes="(max-width: 768px) 270px, 365px"
              />

              {/* Layar Monitor: Gradient Brand Polos (Tanpa Wallpaper Windows) */}
              <div
                style={{ ...SCREEN_BOX }}
                className="absolute z-30 overflow-hidden rounded-[2px] bg-gradient-to-br from-[#062c4a] via-[#0B6BAE] to-[#041a2e] select-none shadow-inner"
              >
                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Kanan: UPS Heavy-Duty ICA */}
            <div className="relative w-[90px] sm:w-[125px] md:w-[145px] lg:w-[165px] aspect-[4/3] shrink-0 transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="/images/hero-trio-ups-hd.png"
                alt="ICA Online Heavy-Duty UPS"
                fill
                priority
                className="object-contain object-bottom pointer-events-none select-none drop-shadow-[0_6px_14px_rgba(0,0,0,0.08)]"
                sizes="(max-width: 768px) 125px, 165px"
              />
            </div>
          </div>

          {/* Satu Bayangan Lantai Lembut (Bukan tiga gumpalan bayangan) */}
          <div
            aria-hidden="true"
            className="w-[88%] max-w-[720px] h-3.5 sm:h-4 mx-auto bg-gradient-to-r from-transparent via-black/[0.20] to-transparent blur-[10px] sm:blur-[12px] rounded-[100%] pointer-events-none -mt-1.5 sm:-mt-2 z-0"
          />
        </motion.div>
      </div>

      {/* 6. Trust Strip: Terlihat penuh di layar 1080p tanpa scroll */}
      <div className="w-full mt-2 sm:mt-3 pt-2.5 pb-1 border-t border-[#d2d2d7]/50">
        <div className="shell flex items-center justify-center flex-wrap gap-x-5 sm:gap-x-7 gap-y-1.5 text-[11px] sm:text-[12px] md:text-[13px] text-[#6e6e73]">
          {TRUST_POINTS.map((point) => (
            <div key={point} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0B6BAE] shrink-0" />
              <span className="font-medium text-[#1d1d1f]">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
