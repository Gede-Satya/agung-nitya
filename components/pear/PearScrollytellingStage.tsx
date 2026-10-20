"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, ShieldCheck, Check, Sparkles, Building2, Package, Wrench, Database } from "lucide-react";
import PearGridHud from "./PearGridHud";
import PearChapterRail, { CHAPTERS } from "./PearChapterRail";
import PearFaqCards3D from "./PearFaqCards3D";
import PearApplicationForm3D from "./PearApplicationForm3D";
import { SITE_CONTENT } from "@/src/content/site";

export default function PearScrollytellingStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);

  // Monitor scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.min(1, Math.max(0, currentScroll / totalScrollable));
      setProgress(rawProgress);

      // Determine active chapter based on progress ranges
      if (rawProgress < 0.28) {
        setCurrentChapter(0);
      } else if (rawProgress < 0.58) {
        setCurrentChapter(1);
      } else if (rawProgress < 0.82) {
        setCurrentChapter(2);
      } else {
        setCurrentChapter(3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Jump to chapter on click
  const handleSelectChapter = (targetProgress: number) => {
    if (!containerRef.current) return;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = containerRef.current.offsetTop + targetProgress * totalScrollable;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[460vh] bg-[#071324] text-white selection:bg-accent/30 selection:text-white"
    >
      {/* ──────────────────────────────────────────────────────────
          PINNED STAGE (STATIONARY 100VH VIEWPORT)
          ────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background Layer: Deep Cerulean Sky with subtle Vignette & Halftone Dots */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#113156_0%,#08172c_65%,#040c17_100%)]" />
          <div className="absolute inset-0 bg-halftone-dots opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(201,162,39,0.08)_0%,transparent_50%)]" />
          
          {/* Subtle celestial geometric circle / arc matching classical pear engraving style */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none opacity-20"
            viewBox="0 0 900 900"
            fill="none"
          >
            <circle cx="450" cy="450" r="380" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 6" className="text-white/40" />
            <circle cx="450" cy="450" r="280" stroke="currentColor" strokeWidth="0.5" className="text-accent/30" />
            <circle cx="450" cy="450" r="180" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 4" className="text-white/20" />
          </svg>
        </div>

        {/* Architectural HUD Overlay with Crosshairs and Percentage */}
        <PearGridHud progress={progress} currentChapter={currentChapter} />

        {/* Vertical Left Chapter Rail (Ch. 1 - Ch. 4) */}
        <PearChapterRail
          currentChapter={currentChapter}
          onSelectChapter={handleSelectChapter}
        />

        {/* ──────────────────────────────────────────────────────────
            TOP HEADER / BRANDING BAR
            ────────────────────────────────────────────────────────── */}
        <header className="relative z-30 w-full px-5 sm:px-8 md:px-12 pt-5 sm:pt-6 flex items-center justify-between pointer-events-auto">
          {/* Logo Monogram */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-accent/40 bg-accent/10 flex items-center justify-center text-accent font-serif font-bold text-base shadow-[0_0_15px_rgba(201,162,39,0.2)]">
              Ω
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[11px] tracking-widest text-white uppercase font-bold">
                PT AGUNG WIJAYA NITYA
              </span>
              <span className="font-mono text-[9px] tracking-wider text-accent/80">
                PENYEDIA RESMI INAPROC · BADUNG, BALI
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://katalog.inaproc.id/agung-wijaya-nitya"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] tracking-wider uppercase transition-colors"
            >
              <span>e-Katalog LKPP</span>
              <ExternalLink className="w-3 h-3 text-accent" />
            </a>

            <button
              onClick={() => handleSelectChapter(0.92)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent hover:bg-accent-hover text-navy font-mono text-[10px] tracking-wider uppercase font-bold transition-all shadow-md shadow-accent/20"
            >
              <span>Minta Penawaran</span>
              <span className="text-xs">→</span>
            </button>
          </div>
        </header>

        {/* ──────────────────────────────────────────────────────────
            CENTER STAGE: CHAPTER CONTENT (KINETIC TRANSITIONS)
            ────────────────────────────────────────────────────────── */}
        <main className="relative z-20 flex-1 flex items-center justify-center px-6 sm:px-12 md:px-20 lg:px-28 w-full max-w-7xl mx-auto">
          
          {/* CHAPTER 1: THE MANDATE */}
          {currentChapter === 0 && (
            <motion.div
              key="ch-1"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-start lg:items-center text-left lg:text-center max-w-4xl"
            >
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-accent font-medium">
                  BAB 1 · MANDAT & LEGALITAS PENGADAAN
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.08] tracking-tight">
                Bukan sekadar penyedia di atas kertas,{" "}
                <span className="italic font-normal text-accent block sm:inline">
                  rekanan terpercaya
                </span>{" "}
                di setiap lini pengadaan.
              </h1>

              {/* Editorial Subhead */}
              <p className="mt-5 sm:mt-6 font-sans text-sm sm:text-base md:text-lg text-white/75 max-w-2xl font-light leading-relaxed">
                PT Agung Wijaya Nitya adalah penyedia aktif kualifikasi UMKK pada
                Katalog Elektronik INAPROC LKPP berbasis di Kabupaten Badung, Bali.
                Kami menyederhanakan pemenuhan belanja instansi pemerintah secara transparan, tepat waktu, dan akuntabel.
              </p>

              {/* Kinetic Micro-Beats */}
              <div className="mt-8 flex flex-wrap items-center justify-start lg:justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 font-mono text-xs text-white/70">
                  <span className="w-1 h-1 rounded-full bg-accent" />
                  <span>KAMI SEDIAKAN PRODUKNYA.</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-white/70">
                  <span className="w-1 h-1 rounded-full bg-accent" />
                  <span>KAMI JAMIN LEGALITASNYA.</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-white/70">
                  <span className="w-1 h-1 rounded-full bg-accent" />
                  <span>KAMI KAWAL HINGGA SERAH TERIMA.</span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleSelectChapter(0.92)}
                  className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-navy font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-accent/20 flex items-center gap-2"
                >
                  Ajukan Permohonan Pengadaan
                  <span>→</span>
                </button>
                <button
                  onClick={() => handleSelectChapter(0.35)}
                  className="px-5 py-3 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 text-white font-sans text-xs sm:text-sm transition-colors"
                >
                  Eksplorasi 742 Produk
                </button>
              </div>
            </motion.div>
          )}

          {/* CHAPTER 2: THE INVENTORY */}
          {currentChapter === 1 && (
            <motion.div
              key="ch-2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center max-w-5xl"
            >
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-accent font-medium">
                  BAB 2 · 742 PRODUK TERDAFTAR RESMI
                </span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light text-center text-white leading-tight">
                Inventaris terverifikasi untuk seluruh kebutuhan satker.
              </h2>
              <p className="mt-2 text-center text-xs sm:text-sm text-white/70 max-w-xl font-light">
                Seluruh produk ditayangkan resmi pada e-Katalog LKPP dengan kepatuhan harga baku pemerintah dan spesifikasi jelas.
              </p>

              {/* 4 Interactive Category Cards */}
              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full">
                {/* 1. Hardware & Komputasi */}
                <div className="p-5 rounded-2xl pear-glass-card border border-white/10 hover:border-accent/50 transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent mb-3 group-hover:scale-105 transition-transform">
                    <Package className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] text-accent tracking-widest uppercase">
                    01 // HARDWARE
                  </span>
                  <h3 className="font-editorial text-lg text-white font-medium mt-1">
                    Komputasi & Jaringan
                  </h3>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed font-light">
                    PC Desktop, Laptop dinas, Server instansi, UPS, Switch & Router jaringan berspesifikasi resmi.
                  </p>
                </div>

                {/* 2. SIMDINKES & Solusi Digital */}
                <div className="p-5 rounded-2xl pear-glass-card border border-white/10 hover:border-accent/50 transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent mb-3 group-hover:scale-105 transition-transform">
                    <Database className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] text-accent tracking-widest uppercase">
                    02 // SOFTWARE
                  </span>
                  <h3 className="font-editorial text-lg text-white font-medium mt-1">
                    SIMDINKES Digital
                  </h3>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed font-light">
                    Sistem informasi manajemen & SDM kesehatan instansi, implementasi sistem dan integrasi data.
                  </p>
                </div>

                {/* 3. Logistik Kantor & Laboratorium */}
                <div className="p-5 rounded-2xl pear-glass-card border border-white/10 hover:border-accent/50 transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent mb-3 group-hover:scale-105 transition-transform">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] text-accent tracking-widest uppercase">
                    03 // PERALATAN
                  </span>
                  <h3 className="font-editorial text-lg text-white font-medium mt-1">
                    Peralatan Kantor & Lab
                  </h3>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed font-light">
                    Perlengkapan administrasi instansi, elektronik ruangan rapat, instrumen uji laboratorium.
                  </p>
                </div>

                {/* 4. Pemeliharaan & SLA */}
                <div className="p-5 rounded-2xl pear-glass-card border border-white/10 hover:border-accent/50 transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent mb-3 group-hover:scale-105 transition-transform">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] text-accent tracking-widest uppercase">
                    04 // LAYANAN
                  </span>
                  <h3 className="font-editorial text-lg text-white font-medium mt-1">
                    Jasa Pemeliharaan
                  </h3>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed font-light">
                    Perawatan berkala perangkat keras, diagnostik sistem, opsi unit pengganti operasional darurat.
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="mt-7 flex items-center gap-4">
                <a
                  href="https://katalog.inaproc.id/agung-wijaya-nitya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-navy font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
                >
                  <span>Buka 742 Produk di INAPROC LKPP</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}

          {/* CHAPTER 3: THE GOVERNANCE */}
          {currentChapter === 2 && (
            <motion.div
              key="ch-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-accent font-medium">
                  BAB 3 · TATA KELOLA & INTEGRITAS
                </span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-5xl font-light text-center text-white leading-tight">
                Transparansi mutlak. Tanpa biaya tersembunyi.
              </h2>
              <p className="mt-3 text-center text-xs sm:text-base text-white/75 max-w-2xl font-light">
                Pengadaan instansi negara membutuhkan kepastian hukum. Kami menjalankan setiap kontrak dengan prinsip transparansi penuh dan siap audit.
              </p>

              {/* 3 Pillars Table / Grid */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="p-6 rounded-2xl pear-glass-card border border-white/10">
                  <div className="font-mono text-xs text-accent tracking-wider mb-2">
                    01 // E-PURCHASING SAH
                  </div>
                  <h4 className="font-editorial text-xl text-white font-medium mb-2">
                    Audit-Ready
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    Seluruh pesanan tercatat dalam katalog nasional LKPP dengan faktur resmi, memudahkan pemeriksaan Inspektorat dan BPK.
                  </p>
                </div>

                <div className="p-6 rounded-2xl pear-glass-card border border-white/10">
                  <div className="font-mono text-xs text-accent tracking-wider mb-2">
                    02 // KUALIFIKASI UMKK
                  </div>
                  <h4 className="font-editorial text-xl text-white font-medium mb-2">
                    Prioritas Belanja PDN
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    Membantu Satker dan PPK memenuhi kewajiban alokasi belanja produk dalam negeri (PDN) dan pemberdayaan usaha mikro-kecil.
                  </p>
                </div>

                <div className="p-6 rounded-2xl pear-glass-card border border-white/10">
                  <div className="font-mono text-xs text-accent tracking-wider mb-2">
                    03 // JAMINAN SLA
                  </div>
                  <h4 className="font-editorial text-xl text-white font-medium mb-2">
                    Layanan Purna Jual
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    Kesiapan teknisi pendamping di wilayah Bali dan jaringan rekanan logistik nasional dengan komitmen garansi resmi.
                  </p>
                </div>
              </div>

              {/* Bottom Quote Note */}
              <div className="mt-8 p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3 max-w-xl text-center">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                <span className="font-mono text-xs text-white/80">
                  PT AGUNG WIJAYA NITYA · NPWP & KBLI TERVERIFIKASI SISTEM PENGADAAN NASIONAL
                </span>
              </div>
            </motion.div>
          )}

          {/* CHAPTER 4: THE INQUIRY & FORM */}
          {currentChapter === 3 && (
            <motion.div
              key="ch-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl py-4"
            >
              {/* Left Column: 3D Rotating FAQ */}
              <div className="flex flex-col items-start justify-center">
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-[10px] tracking-widest uppercase text-accent font-medium">
                    BAB 4 · TANYA JAWAB PEJABAT PENGADAAN
                  </span>
                </div>

                <h2 className="font-editorial text-3xl sm:text-4xl font-light text-white leading-tight mb-2">
                  Pertanyaan Seputar Pemesanan & Kontrak.
                </h2>
                <p className="font-sans text-xs sm:text-sm text-white/70 font-light mb-6">
                  Klik atau geser kartu di bawah untuk melihat rincian mekanisme e-Purchasing dan jaminan purna jual.
                </p>

                <PearFaqCards3D />
              </div>

              {/* Right Column: 3D Perspective Application Form */}
              <div className="flex items-center justify-center">
                <PearApplicationForm3D />
              </div>
            </motion.div>
          )}

        </main>

        {/* ──────────────────────────────────────────────────────────
            FOOTER BAR (BOTTOM TELEMETRY & BRAND DETAILS)
            ────────────────────────────────────────────────────────── */}
        <footer className="relative z-30 w-full px-8 sm:px-16 md:px-24 lg:px-36 pb-3 sm:pb-4 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/50 border-t border-white/[0.07] pt-2.5 pointer-events-auto bg-[#071324]/60 backdrop-blur-md">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-white/80">PT AGUNG WIJAYA NITYA</span>
            <span className="text-white/20">·</span>
            <span>KAB. BADUNG, BALI</span>
            <span className="text-white/20 hidden md:inline">·</span>
            <span className="hidden md:inline">INAPROC AKTIF UMKK</span>
          </div>

          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <a
              href="mailto:info@agungwijayanitya.com"
              className="text-accent hover:underline"
            >
              INFO@AGUNGWIJAYANITYA.COM
            </a>
            <span className="text-white/20">·</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-white transition-colors"
            >
              KEMBALI KE ATAS ↑
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
