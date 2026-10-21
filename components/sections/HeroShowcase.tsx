"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

const DEFAULT_EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroShowcase() {
  const hero = SITE_CONTENT.hero;

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#0d1c36] text-white min-h-screen flex flex-col justify-between pt-24 pb-8"
    >
      {/* Background Media: Architectural Glass Lobby Entrance */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/films/t12/f_001.webp"
          alt="Fasilitas Gedung PT Agung Wijaya Nitya"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark Navy Atmospheric Gradient Overlay (Smooth Left-to-Right Fade) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1c36]/96 via-[#0f2444]/90 via-35% md:via-42% to-[#0d1c36]/15 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b172c]/80 via-transparent to-[#0b172c]/40" />
      </div>

      {/* Hero Center-Left Content Block */}
      <div className="shell relative z-10 w-full my-auto px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: DEFAULT_EASE }}
          className="max-w-2xl"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="w-2 h-2 bg-[#d2e4fc] inline-block shrink-0" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.14em] uppercase text-[#d2e4fc] font-semibold">
              {hero.badge}
            </span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="font-serif italic text-white font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.05] tracking-tight drop-shadow-md">
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

      {/* Architectural Bottom Bar HUD */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto pt-6">
        <div className="w-full h-px bg-white/25 mb-3" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span className="font-mono text-xs text-[#d7e6ff]/80 tracking-wide">
            Unlocking Innovation, Empowering Possibilities
          </span>
          <div className="flex items-center gap-4 font-mono text-xs">
            <span className="text-white font-bold relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-white">
              01
            </span>
            <span className="text-white/40">02</span>
            <span className="text-white/40">03</span>
            <span className="text-white/40">04</span>
            <span className="text-white/40">05</span>
          </div>
        </div>
        <div className="text-right mt-1">
          <span className="font-mono text-[10px] text-white/40">
            Visual ilustratif, bukan dokumentasi fasilitas perusahaan.
          </span>
        </div>
      </div>
    </section>
  );
}
