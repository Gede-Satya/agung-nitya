"use client";

import React, { useState, useEffect } from "react";
import { Search, Globe } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full font-sans">
      {/* Tier 1: Global Utility Navigation (38px, Apple Style) */}
      <div className="w-full bg-[#161617]/95 text-[#f5f5f7] border-b border-[#333336] text-[11px] sm:text-[12px] tracking-[-0.12px]">
        <div className="shell flex h-9 sm:h-10 items-center justify-between">
          {/* Logo Glyph */}
          <a href="#" className="flex items-center gap-1.5 font-heading font-bold text-white tracking-wider hover:opacity-85">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-white text-[#161617] text-[10px] font-black">
              AWN
            </span>
          </a>

          {/* Nav Categories */}
          <nav className="hidden lg:flex items-center gap-6 text-[#d2d2d7]">
            <a href="#infrastruktur" className="hover:text-white transition-colors">
              Infrastruktur IT
            </a>
            <a href="#komputasi" className="hover:text-white transition-colors">
              Komputasi
            </a>
            <a href="#elektronik" className="hover:text-white transition-colors">
              Elektronik Komersial
            </a>
            <a href="#lini-utama" className="hover:text-white transition-colors">
              Perangkat
            </a>
            <a href="#ekosistem" className="hover:text-white transition-colors">
              Pengadaan B2B
            </a>
            <a href="#cta-pengadaan" className="hover:text-white transition-colors">
              Kontak
            </a>
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-4 text-[#d2d2d7]">
            <a href={SITE_CONTENT.company.inaprocUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1 hover:text-white transition-colors text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>INAPROC Aktif</span>
            </a>
            <button aria-label="Search" className="hover:text-white transition-colors">
              <Search className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-center gap-1 hover:text-white cursor-pointer">
              <Globe className="h-3.5 w-3.5" />
              <span className="text-[11px]">ID</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 2: Product Local Navigation Bar (46px, Sticky Apple Style) */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 border-b border-[#d6d6d6] shadow-[0_1px_3px_rgba(0,0,0,0.05)] backdrop-blur-md"
            : "bg-white/90 border-b border-[#e6e6e8] backdrop-blur-sm"
        }`}
      >
        <div className="shell flex h-12 items-center justify-between">
          {/* Brand Name & Tagline */}
          <div className="flex items-center gap-2.5">
            <a href="#" className="font-heading text-[15px] sm:text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.2px] hover:opacity-85">
              Agung Wijaya Nitya
            </a>
            <span className="hidden md:inline-block text-[#86868b] text-[12px] font-normal">
              Mitra Resmi B2B & Korporat
            </span>
          </div>

          {/* Conversion Action Pills */}
          <div className="flex items-center gap-2.5">
            <a
              href={SITE_CONTENT.company.inaprocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 items-center justify-center rounded-full border border-[#86868b] bg-transparent px-3.5 text-[12px] font-normal tracking-[-0.12px] text-[#1d1d1f] transition-colors hover:border-[#1d1d1f]"
            >
              <span>Katalog Lengkap</span>
            </a>

            <a
              href="#cta-pengadaan"
              className="inline-flex h-7 items-center justify-center rounded-full bg-[#0071e3] px-3.5 text-[12px] font-normal tracking-[-0.12px] text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              <span>Ajukan Penawaran</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
