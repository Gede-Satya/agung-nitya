"use client";

import React from "react";
import Image from "next/image";

export default function HeroShowcase() {
  return (
    <section className="relative w-full pt-12 sm:pt-16 pb-8 sm:pb-12 bg-white text-[#1d1d1f] overflow-hidden">
      <div className="shell flex flex-col items-center text-center">
        {/* Two-Line Eyebrow / Kicker with Official Slogan */}
        <div className="flex flex-col items-center mb-2 sm:mb-2.5">
          <p className="font-heading text-[16px] sm:text-[18px] md:text-[19px] font-semibold tracking-[-0.2px] text-[#1d1d1f]">
            PT Agung Wijaya Nitya
          </p>
          <p className="text-[12px] sm:text-[13px] text-[#0071e3] font-medium tracking-tight mt-0.5">
            Unlocking Innovation, Empowering Possibilities
          </p>
        </div>

        {/* Display Headline (Option A: Exactly 2 Balanced Lines) */}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-[40px] lg:text-[44px] font-bold leading-[1.14] tracking-[-1.2px] text-[#1d1d1f] max-w-6xl">
          Penyediaan Perangkat IT & Display Enterprise Terbaik
          <br className="hidden md:inline" /> untuk Kebutuhan Bisnis Anda.
        </h1>

        {/* Subhead / Statement with INAPROC facts */}
        <div className="mt-3 text-[13px] sm:text-[14px] text-[#6e6e73] leading-relaxed max-w-2xl text-balance">
          <p>Siap memenuhi volume besar untuk pengadaan korporasi, instansi, dan proyek pemerintah.</p>
          <p>Penyedia resmi e-Katalog LKPP / INAPROC dengan 742 produk tayang aktif per 15 Oktober 2026.</p>
        </div>

        {/* Hero Front-Facing Monitor Visual (Background Removed, Crisp Apple Style) */}
        <div className="relative w-full max-w-2xl sm:max-w-3xl lg:max-w-[760px] mt-4 sm:mt-6 flex flex-col items-center justify-center">
          <div className="relative w-full aspect-[16/10] max-h-[420px] sm:max-h-[460px] flex items-center justify-center">
            <Image
              src="/images/hero-monitor-flawless.png"
              alt="Penyediaan Unit Monitor & Display Komersial Enterprise"
              fill
              priority
              className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>
        </div>
      </div>

      {/* Horizontal Sub-navigation Anchor Bar */}
      <div className="w-full mt-10 sm:mt-14 border-y border-[#d2d2d7] bg-white py-3">
        <div className="shell flex items-center justify-center gap-5 sm:gap-8 overflow-x-auto text-[12px] sm:text-[13px] text-[#6e6e73] whitespace-nowrap">
          <a href="#lini-utama" className="hover:text-[#1d1d1f] transition-colors font-medium">
            Sorotan Lini
          </a>
          <span className="text-[#d2d2d7]">•</span>
          <a href="#lini-utama" className="hover:text-[#1d1d1f] transition-colors font-medium">
            Infrastruktur Server
          </a>
          <span className="text-[#d2d2d7]">•</span>
          <a href="#lini-utama" className="hover:text-[#1d1d1f] transition-colors font-medium">
            Komputasi & Kantor
          </a>
          <span className="text-[#d2d2d7]">•</span>
          <a href="#lini-utama" className="hover:text-[#1d1d1f] transition-colors font-medium">
            Elektronik & Fasilitas
          </a>
          <span className="text-[#d2d2d7]">•</span>
          <a href="#ekosistem" className="hover:text-[#1d1d1f] transition-colors font-medium">
            Alur Pengadaan
          </a>
        </div>
      </div>
    </section>
  );
}
