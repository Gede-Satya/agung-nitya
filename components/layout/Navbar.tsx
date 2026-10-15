"use client";

import React, { useState, useEffect } from "react";
import { SITE_CONTENT } from "@/src/content/site";
import { ExternalLink } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-gallery-white/85 border-b border-hairline-silver backdrop-blur-md"
          : "bg-gallery-white/60 border-b border-transparent backdrop-blur-sm"
      }`}
    >
      <div className="shell flex h-11 sm:h-12 items-center justify-between">
        {/* Brand Name & Product Identifier */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-ink transition-opacity hover:opacity-80"
          aria-label="PT Agung Wijaya Nitya - Beranda"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-hairline-silver bg-studio-mist font-heading text-[10px] font-semibold text-pricing-blue">
            AN
          </span>
          <div className="flex items-center gap-2">
            <span className="font-heading text-[14px] sm:text-[15px] font-semibold tracking-[-0.2px] text-ink">
              {SITE_CONTENT.company.name}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-studio-mist border border-hairline-silver text-[10px] text-slate font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              INAPROC Aktif
            </span>
          </div>
        </a>

        {/* In-page Anchor Navigation & Apple Pill Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden md:flex items-center gap-5 text-[12px] tracking-[-0.12px] text-ink/80 font-normal">
            <a href="#cerita" className="hover:text-apple-blue transition-colors">
              Ikhtisar Solusi
            </a>
            <a href="#verifikasi" className="hover:text-apple-blue transition-colors">
              Bukti & Legalitas
            </a>
            <a href="#pilar-pendukung" className="hover:text-apple-blue transition-colors">
              Pilar Pengadaan
            </a>
            <a href="#kontak" className="hover:text-apple-blue transition-colors">
              Kontak
            </a>
          </nav>

          {/* Pricing Blue Filled Pill (DESIGN.md: filled conversion control) */}
          <a
            href={SITE_CONTENT.company.inaprocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-7 items-center gap-1.5 rounded-full bg-pricing-blue px-3.5 text-[12px] font-normal tracking-[-0.12px] text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            <span>Katalog INAPROC</span>
            <ExternalLink className="h-3 w-3 opacity-90" />
          </a>
        </div>
      </div>
    </header>
  );
}
