"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

export default function HeroShowcase() {

  return (
    <section className="relative w-full pt-28 sm:pt-32 pb-12 sm:pb-16 bg-white text-[#1d1d1f] overflow-hidden">
      <div className="shell flex flex-col items-center text-center">
        {/* Eyebrow Label */}
        <p className="text-[13px] sm:text-[14px] font-medium tracking-tight text-[#1d1d1f]/80 mb-2 sm:mb-3">
          Mitra Pengadaan Hardware & Elektronik
        </p>

        {/* Display Headline */}
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold leading-[1.05] tracking-[-1.5px] text-[#1d1d1f] max-w-4xl text-balance">
          Skala Enterprise. Presisi di Setiap Unit.
        </h1>

        {/* Hero Hardware Lineup Showcase */}
        <div className="relative w-full max-w-5xl mt-6 sm:mt-8 flex flex-col items-center">
          <div className="relative w-full aspect-[16/9] max-h-[540px] flex items-center justify-center">
            <Image
              src="/images/hero-hardware-lineup.jpg"
              alt="Enterprise IT Hardware Lineup: Server, Laptop, Monitor, and Tower Unit"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1120px"
            />
          </div>

          {/* Floating Fact Capsule Callout */}
          <div className="mt-4 sm:mt-6 w-[94%] sm:w-auto sm:min-w-[540px] max-w-2xl px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white border border-[#d6d6d6] shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center justify-between gap-4 z-10">
            <div className="flex flex-col text-left pl-1">
              <span className="font-heading text-[13px] sm:text-[14px] font-semibold text-[#1d1d1f] tracking-tight">
                Melayani Pengadaan Korporat, BUMN/D, TIK/ KEMENLEMBAGA
              </span>
              <span className="text-[11px] sm:text-[12px] text-[#707070] tracking-[-0.12px]">
                {SITE_CONTENT.company.activeProductsCount} Produk Tayang INAPROC · Faktur Pajak & Garansi Resmi Principal
              </span>
            </div>

            <a
              href="#unit-pengadaan"
              className="inline-flex h-8 sm:h-9 items-center gap-1 rounded-full bg-[#0071e3] px-4 text-[12px] font-normal tracking-[-0.12px] text-white transition-opacity hover:opacity-90 active:scale-[0.98] shrink-0"
            >
              <span>Pilih Unit</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Horizontal Sub-navigation Anchor Bar (Divider) */}
      <div className="w-full mt-12 sm:mt-16 border-y border-[#d6d6d6] bg-white py-3">
        <div className="shell flex items-center justify-center gap-4 sm:gap-8 overflow-x-auto text-[12px] sm:text-[13px] text-[#707070] whitespace-nowrap">
          <a href="#lini-utama" className="hover:text-[#1d1d1f] transition-colors font-medium">
            Sorotan Lini
          </a>
          <span>•</span>
          <a href="#lini-utama" className="hover:text-[#1d1d1f] transition-colors font-medium">
            Infrastruktur Server
          </a>
          <span>•</span>
          <a href="#lini-utama" className="hover:text-[#1d1d1f] transition-colors font-medium">
            Komputasi & Kantor
          </a>
          <span>•</span>
          <a href="#lini-utama" className="hover:text-[#1d1d1f] transition-colors font-medium">
            Elektronik & Fasilitas
          </a>
          <span>•</span>
          <a href="#ekosistem" className="hover:text-[#1d1d1f] transition-colors font-medium">
            Alur Pengadaan
          </a>
        </div>
      </div>
    </section>
  );
}
