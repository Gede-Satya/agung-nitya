"use client";

import React from "react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300">
      <div className="shell flex h-20 items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="group flex items-center gap-3 font-display text-lg font-medium tracking-tight text-ink"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-sm border border-rule bg-graphite text-xs text-blue">
            AN
          </span>
          <span>Agung Nitya</span>
        </a>

        {/* Navigation links */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-8 text-sm text-muted"
        >
          <a
            href="#modul"
            className="transition-colors hover:text-ink focus-visible:text-ink"
          >
            Modul
          </a>
          <a
            href="#proses"
            className="transition-colors hover:text-ink focus-visible:text-ink"
          >
            Proses
          </a>
          <a
            href="#keamanan"
            className="transition-colors hover:text-ink focus-visible:text-ink"
          >
            Keamanan
          </a>
          <a
            href="#faq"
            className="transition-colors hover:text-ink focus-visible:text-ink"
          >
            FAQ
          </a>
        </nav>

        {/* CTA Button (DESIGN.md: dark text on blue button for 5.4:1 contrast) */}
        <div className="flex items-center gap-4">
          <a
            href="#demo"
            className="inline-flex min-h-10 sm:min-h-11 items-center justify-center rounded-full bg-blue px-4 sm:px-5 text-xs sm:text-sm font-medium text-canvas transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            Jadwalkan Demo
          </a>
        </div>
      </div>
    </header>
  );
}
