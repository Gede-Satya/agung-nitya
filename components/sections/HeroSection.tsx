"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface HeroSectionProps {
  visible?: boolean;
  activeModuleId?: string | null;
  onSelectModule?: (id: string | null) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HeroSection(props: HeroSectionProps = {}) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      id="hero"
      className="relative z-20 w-full flex flex-col items-center pt-12 sm:pt-14 px-4 pointer-events-auto"
    >
      <div className="flex flex-col items-center text-center max-w-[1200px] mx-auto gap-3 sm:gap-3.5">
        {/* 1. Kicker: Display 21px / 600, Ink, tanpa bullet biru */}
        <motion.p
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="type-apple-kicker text-ink uppercase"
        >
          SIMRS ENTERPRISE · AGUNG NITYA
        </motion.p>

        {/* 2. Headline: 80px/600 di Ink, maksimal 2 baris di desktop (>=1280px) */}
        <motion.h1
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] as const }}
          className="type-apple-hero text-ink text-center max-w-[1200px] [text-wrap:balance]"
        >
          <span className="block">Rekam medis, farmasi, dan billing.</span>
          <span className="block text-[#86868b]">Bicara satu bahasa.</span>
        </motion.h1>

        {/* 3. Paragraf deskripsi 17px, warna Slate, max-width ~640px, rata tengah */}
        <motion.p
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] as const }}
          className="type-apple-body text-slate text-center max-w-[640px]"
        >
          Agung Nitya membangun SIMRS yang menyatukan setiap unit ke dalam satu
          basis data — bukan sekadar menghubungkan aplikasi yang berbeda satu
          per satu.
        </motion.p>

        {/* 4. Dua CTA sejajar, gap 20px: "Jadwalkan Demo" (pill fill #0071e3) & "Lihat Fragmentasi Sistem" */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-wrap items-center justify-center gap-5 pt-1"
        >
          <motion.a
            href="#demo"
            whileHover={{ scale: prefersReduced ? 1 : 1.03 }}
            whileTap={{ scale: prefersReduced ? 1 : 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-flex min-h-[38px] items-center justify-center rounded-full bg-[#0071e3] px-5 text-[12px] leading-[1.33] tracking-[-0.12px] font-normal text-white transition-colors hover:bg-[#0077ed]"
          >
            Jadwalkan Demo
          </motion.a>

          <motion.a
            href="#problem"
            whileHover={{ x: prefersReduced ? 0 : 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-flex items-center gap-1 text-[14px] leading-normal tracking-[-0.224px] text-[#0066cc] hover:underline font-normal transition-colors"
          >
            <span>Lihat Fragmentasi Sistem</span>
            <ChevronRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
