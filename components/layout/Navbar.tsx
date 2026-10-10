"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full h-12 backdrop-blur-md transition-colors ${
        isScrolled
          ? "bg-white/95 border-b border-[#d6d6d6]"
          : "bg-white/90 border-b border-[#d6d6d6]"
      }`}
    >
      <div className="shell flex h-full items-center justify-between">
        {/* Apple Product Local Title (SF Pro Display 19px/600) */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-ink transition-opacity hover:opacity-90"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-[6px] border border-[#d6d6d6] bg-[#f5f5f7] text-[11px] font-semibold text-ink">
            AN
          </span>
          <span className="font-semibold text-[19px] leading-[1.21] tracking-[0.228px] text-ink">
            Agung Nitya
          </span>
          <span className="hidden sm:inline-block text-[11px] font-normal text-muted tracking-tight pl-1 border-l border-[#d6d6d6]">
            SIMRS Enterprise
          </span>
        </a>

        {/* Global Navigation Links (SF Pro Text 12px/400, Ink, tanpa kotak) */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-7 text-[12px] tracking-[-0.12px] text-ink font-normal"
        >
          <a
            href="#hero"
            className="transition-colors hover:text-[#0066cc]"
          >
            Ikhtisar
          </a>
          <a
            href="#problem"
            className="transition-colors hover:text-[#0066cc]"
          >
            Fragmentasi
          </a>
          <a
            href="#solution"
            className="transition-colors hover:text-[#0066cc]"
          >
            Arsitektur
          </a>
          <a
            href="#modules"
            className="transition-colors hover:text-[#0066cc]"
          >
            Modul
          </a>
          <a
            href="#spesifikasi"
            className="transition-colors hover:text-[#0066cc]"
          >
            Spesifikasi
          </a>
        </nav>

        {/* Apple Controls: Outlined Explore Pill + Pricing Blue Conversion Pill */}
        <div className="flex items-center gap-2.5">
          <motion.a
            href="#modules"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-[#86868b] bg-transparent px-3 py-1 text-[12px] tracking-[-0.12px] text-ink font-normal transition-colors hover:bg-[#f5f5f7]"
          >
            Eksplorasi
          </motion.a>
          <motion.a
            href="#demo"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-flex items-center justify-center rounded-full bg-[#0071e3] px-3.5 py-1 text-[12px] tracking-[-0.12px] text-white font-normal transition-colors hover:bg-[#0077ed]"
          >
            Jadwalkan Demo
          </motion.a>
        </div>
      </div>
    </header>
  );
}
