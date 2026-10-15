"use client";

import React, { useState, useEffect } from "react";
import { SITE_CONTENT } from "@/src/content/site";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full font-sans transition-all duration-300">
      {/* Apple-style Unified White Navigation Bar (48px) */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-[#d2d2d7] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
            : "bg-white/90 backdrop-blur-md border-b border-[#e6e6e8]"
        }`}
      >
        <div className="shell flex h-12 items-center justify-between">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-[#1d1d1f] text-white text-[9px] font-black tracking-tighter">
                AWN
              </span>
              <span className="font-heading text-[14px] sm:text-[15px] font-semibold text-[#1d1d1f] tracking-[-0.2px]">
                Agung Wijaya Nitya
              </span>
            </a>
          </div>

          {/* Central Category Links (Apple SF Pro Text 12px) */}
          <nav className="hidden lg:flex items-center gap-7 text-[12px] text-[#1d1d1f]/80 font-normal tracking-[-0.12px]">
            <a href="#infrastruktur" className="hover:text-[#0071e3] transition-colors">
              Infrastruktur Server
            </a>
            <a href="#komputasi" className="hover:text-[#0071e3] transition-colors">
              Komputasi Kantor
            </a>
            <a href="#elektronik" className="hover:text-[#0071e3] transition-colors">
              Elektronik Komersial
            </a>
            <a href="#ekosistem" className="hover:text-[#0071e3] transition-colors">
              Ekosistem B2B
            </a>
            <a
              href={SITE_CONTENT.company.inaprocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-medium"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>INAPROC (742 Unit)</span>
            </a>
          </nav>

          {/* Right Action Controls: Outlined Pill & Pricing Blue Pill */}
          <div className="flex items-center gap-2.5">
            <a
              href={SITE_CONTENT.company.inaprocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex h-7 items-center justify-center rounded-full border border-[#86868b] bg-transparent px-3 text-[12px] font-normal tracking-[-0.12px] text-[#1d1d1f] transition-all hover:border-[#1d1d1f] hover:bg-black/[0.02]"
            >
              <span>Katalog Lengkap</span>
            </a>

            <a
              href="#cta-pengadaan"
              className="inline-flex h-7 items-center justify-center rounded-full bg-[#0071e3] px-3.5 text-[12px] font-normal tracking-[-0.12px] text-white transition-all hover:bg-[#0077ed] active:scale-[0.98]"
            >
              <span>Ajukan Penawaran</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
