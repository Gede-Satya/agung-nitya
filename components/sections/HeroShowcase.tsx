"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

export default function HeroShowcase() {
  return (
    <section className="relative w-full pt-20 sm:pt-24 pb-8 sm:pb-12 bg-white text-[#1d1d1f] overflow-hidden">
      <div className="shell flex flex-col items-center text-center">
        {/* Product Eyebrow / Kicker (SF Pro Display 19px/21px style) */}
        <p className="font-heading text-[15px] sm:text-[17px] md:text-[19px] font-semibold tracking-[-0.2px] text-[#1d1d1f] mb-1.5 sm:mb-2">
          Mitra Pengadaan Hardware & Elektronik
        </p>

        {/* Hero Display Headline (SF Pro Display 80px/600 style, compact & bold) */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold leading-[1.04] tracking-[-1.5px] text-[#1d1d1f] max-w-4xl text-balance">
          Skala Enterprise. Presisi di Setiap Unit.
        </h1>

        {/* Availability / Procurement Credential Statement */}
        <div className="mt-3 sm:mt-4 text-[13px] sm:text-[14px] text-[#86868b] leading-tight flex flex-col gap-0.5">
          <span>Katalog Elektronik LKPP / INAPROC Resmi · 742 Produk Aktif</span>
          <span>Siap Pengadaan Korporat, Tender Pemerintah & Termin TOP Terverifikasi</span>
        </div>

        {/* Hero Hardware Visual Stage */}
        <div className="relative w-full max-w-4xl mt-4 sm:mt-6 flex flex-col items-center">
          {/* Hardware Lineup Image with seamless blending */}
          <div className="relative w-full aspect-[16/9] max-h-[380px] sm:max-h-[440px] flex items-center justify-center">
            <Image
              src="/images/hero-hardware-lineup.jpg"
              alt="Enterprise IT Hardware Lineup: Server, Laptop, Monitor, and Tower Unit"
              fill
              priority
              className="object-contain mix-blend-multiply"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>

          {/* Floating Pricing / Procurement Context Capsule (Apple iPhone Duo Style) */}
          <div className="relative -mt-6 sm:-mt-10 z-20 w-[95%] sm:w-auto sm:min-w-[560px] max-w-2xl px-5 sm:px-6 py-3 rounded-full bg-[#fbfbfd]/90 backdrop-blur-xl border border-[#d2d2d7] shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center justify-between gap-4 transition-transform duration-300 hover:scale-[1.01]">
            <div className="flex flex-col text-left pl-1">
              <span className="font-heading text-[13px] sm:text-[14px] font-semibold text-[#1d1d1f] tracking-tight">
                Melayani Pengadaan Korporat, BUMN/D, TIK/ KEMENLEMBAGA
              </span>
              <span className="text-[11px] sm:text-[12px] text-[#6e6e73] tracking-[-0.12px]">
                {SITE_CONTENT.company.activeProductsCount} Produk Tayang INAPROC · Faktur Pajak & Garansi Resmi Principal
              </span>
            </div>

            <a
              href="#unit-pengadaan"
              className="inline-flex h-8 sm:h-9 items-center gap-1 rounded-full bg-[#0071e3] px-4 text-[12px] font-medium tracking-[-0.12px] text-white transition-all hover:bg-[#0077ed] active:scale-[0.98] shrink-0"
            >
              <span>Pilih Unit</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
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
