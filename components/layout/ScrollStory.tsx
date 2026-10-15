"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Cpu, Layers, Network, ShieldCheck, Database, MapPin, ChevronDown } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";
import SceneCanvas from "@/components/scene/SceneCanvas";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const [smoothProgress, setSmoothProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const rawProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Derive active stage cleanly from smoothProgress without extra render cascades
  const activeStage =
    smoothProgress < 0.24 ? 1 : smoothProgress < 0.48 ? 2 : smoothProgress < 0.72 ? 3 : 4;

  const startLerp = useCallback(() => {
    if (animFrameRef.current !== null) return;

    const tick = () => {
      const diff = rawProgressRef.current - smoothProgressRef.current;
      if (Math.abs(diff) < 0.0005) {
        smoothProgressRef.current = rawProgressRef.current;
        setSmoothProgress(rawProgressRef.current);
        animFrameRef.current = null;
        return;
      }
      smoothProgressRef.current += diff * 0.12;
      setSmoothProgress(smoothProgressRef.current);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  // Handle scroll progress computation
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;

    const progress = clamp(-rect.top / totalScrollable, 0, 1);
    rawProgressRef.current = progress;
    startLerp();
  }, [startLerp]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [handleScroll]);

  // Mouse parallax on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setPointer({ x, y });
  };

  // Jump to stage on indicator click
  const jumpToStage = (stageNum: number) => {
    if (!containerRef.current) return;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = stageNum === 1 ? 0 : stageNum === 2 ? 0.33 : stageNum === 3 ? 0.6 : 0.88;
    const targetY = containerRef.current.offsetTop + targetProgress * totalScrollable;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative min-h-[420vh] w-full bg-canvas text-primary">
      {/* Sticky Stage Viewport */}
      <div
        onMouseMove={handleMouseMove}
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden pt-16 sm:pt-20 pb-6 sm:pb-8"
      >
        <div className="shell h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center h-full max-h-[860px]">
            {/* Left Column: Narrative Copy per Stage */}
            <div className="lg:col-span-6 flex flex-col justify-center relative min-h-[360px] sm:min-h-[460px]">
              <AnimatePresence mode="wait">
                {/* ────────────────────────────────────────────────
                    STAGE 1: HERO (0.00 – 0.24)
                    Perangkat Utuh, Headline, Tombol INAPROC
                    ──────────────────────────────────────────────── */}
                {activeStage === 1 && (
                  <motion.div
                    key="stage-1"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="flex flex-col items-start gap-4 sm:gap-6"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-graphite/90 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs text-muted">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="font-medium text-primary tracking-wide">
                        {SITE_CONTENT.headline.badge}
                      </span>
                    </div>

                    <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-primary">
                      <span>{SITE_CONTENT.headline.title}</span>{" "}
                      <span className="text-accent">{SITE_CONTENT.headline.titleAccent}</span>
                    </h1>

                    <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xl">
                      {SITE_CONTENT.headline.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 w-full sm:w-auto">
                      <a
                        href={SITE_CONTENT.headline.ctaPrimary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] sm:min-h-[48px] items-center justify-center gap-2 rounded-xl bg-accent px-5 sm:px-6 py-2.5 sm:py-3 font-heading text-xs sm:text-sm font-medium text-white shadow-sm transition-all duration-150 hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <span>{SITE_CONTENT.headline.ctaPrimary.label}</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>

                    {/* Verified Facts Chips */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-border/80 w-full">
                      <div className="flex flex-col items-start gap-1 p-2 rounded-lg bg-graphite/40 border border-border/50">
                        <Database className="h-3.5 w-3.5 text-accent shrink-0" />
                        <span className="font-heading text-[11px] sm:text-sm font-semibold text-primary">
                          {SITE_CONTENT.company.activeProductsCount} Produk
                        </span>
                        <span className="text-[9px] text-muted">Tayang INAPROC</span>
                      </div>

                      <div className="flex flex-col items-start gap-1 p-2 rounded-lg bg-graphite/40 border border-border/50">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span className="font-heading text-[11px] sm:text-sm font-semibold text-primary">
                          Tipe {SITE_CONTENT.company.inaprocProviderType}
                        </span>
                        <span className="text-[9px] text-muted">Penyedia Resmi</span>
                      </div>

                      <div className="flex flex-col items-start gap-1 p-2 rounded-lg bg-graphite/40 border border-border/50">
                        <MapPin className="h-3.5 w-3.5 text-muted shrink-0" />
                        <span className="font-heading text-[11px] sm:text-sm font-semibold text-primary">
                          Badung, Bali
                        </span>
                        <span className="text-[9px] text-muted">Perseroan Terbatas</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ────────────────────────────────────────────────
                    STAGE 2: HARDWARE (0.24 – 0.48)
                    Casing Terbuka, Teks Pilar Perangkat TI
                    ──────────────────────────────────────────────── */}
                {activeStage === 2 && (
                  <motion.div
                    key="stage-2"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="flex flex-col items-start gap-4 sm:gap-6"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-graphite/90 px-3 py-1 text-xs text-muted">
                      <Cpu className="h-3.5 w-3.5 text-accent" />
                      <span className="font-medium text-primary">
                        Pilar 2 · Perangkat TI
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-primary">
                      Infrastruktur &{" "}
                      <span className="text-accent">Perangkat Keras Komputasi</span>
                    </h2>

                    <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xl">
                      Penyediaan unit komputer kerja, stasiun komputasi, perangkat pemindai data,
                      dan periferal operasional terstandarisasi untuk mendukung keandalan birokrasi instansi.
                    </p>

                    <div className="flex flex-col gap-2.5 w-full pt-1">
                      {[
                        "Komputer Kerja & Mini PC Khusus Operasional Instansi",
                        "Perangkat Pemindai Data, Dokumen, & Identifikasi",
                        "Infrastruktur Jaringan & Perangkat Elektronik Kantor",
                      ].map((item, idx) => (
                        <div
                          key={`hw-${idx}`}
                          className="flex items-center gap-3 p-3 rounded-xl bg-graphite/40 border border-border/60"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-accent text-xs font-semibold">
                            {idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-primary">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ────────────────────────────────────────────────
                    STAGE 3: SOFTWARE (0.48 – 0.72)
                    Panel Melayang, Pilar Utama Software & Jasa TI
                    ──────────────────────────────────────────────── */}
                {activeStage === 3 && (
                  <motion.div
                    key="stage-3"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="flex flex-col items-start gap-4 sm:gap-6"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent">
                      <Layers className="h-3.5 w-3.5 text-accent" />
                      <span className="font-medium">
                        Pilar Utama · Software & Jasa TI (Headline)
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-primary">
                      Solusi Sistem Informasi &{" "}
                      <span className="text-accent">Rekayasa Perangkat Lunak</span>
                    </h2>

                    <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xl">
                      Rancang bangun arsitektur aplikasi kustom, implementasi alur kerja digital,
                      serta kapabilitas reverse-engineering untuk modernisasi dan bridging sistem instansi.
                    </p>

                    {/* Verified Official Software Product Spotlight */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-accent/15 via-graphite to-graphite border border-accent/30 w-full">
                      <div className="flex items-center justify-between pb-1">
                        <span className="text-[10px] font-mono tracking-wider text-accent uppercase font-semibold">
                          PRODUK RESMI TAYANG DI KATALOG INAPROC
                        </span>
                        <span className="text-[10px] text-muted">Etalase Terdaftar</span>
                      </div>
                      <h3 className="font-heading text-sm sm:text-base font-semibold text-primary">
                        SIMDINKES Layanan Manajemen dan SDM Kesehatan
                      </h3>
                      <p className="text-muted text-xs pt-1">
                        Satu produk perangkat lunak resmi yang telah tayang di katalog elektronik untuk tata kelola administrasi dan sumber daya kesehatan.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 w-full pt-1">
                      <div className="p-2.5 rounded-lg bg-graphite/40 border border-border/50 text-center">
                        <span className="block font-heading text-xs font-semibold text-primary">Pembuatan</span>
                        <span className="text-[10px] text-muted">Sistem Kustom</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-graphite/40 border border-border/50 text-center">
                        <span className="block font-heading text-xs font-semibold text-primary">Implementasi</span>
                        <span className="text-[10px] text-muted">Deployment & Migrasi</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-graphite/40 border border-border/50 text-center">
                        <span className="block font-heading text-xs font-semibold text-primary">Reverse-Eng</span>
                        <span className="text-[10px] text-muted">Modernisasi Sistem</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ────────────────────────────────────────────────
                    STAGE 4: SERVICES & TOPOLOGY (0.72 – 1.00)
                    Perangkat Tersambung Rapi, Layanan & Implementasi
                    ──────────────────────────────────────────────── */}
                {activeStage === 4 && (
                  <motion.div
                    key="stage-4"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="flex flex-col items-start gap-4 sm:gap-6"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-graphite/90 px-3 py-1 text-xs text-muted">
                      <Network className="h-3.5 w-3.5 text-accent" />
                      <span className="font-medium text-primary">
                        Layanan · Topologi & Integrasi
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight text-primary">
                      Konektivitas Terpadu &{" "}
                      <span className="text-accent">Dukungan Berkelanjutan</span>
                    </h2>

                    <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xl">
                      Menghubungkan perangkat komputasi, perangkat lunak kustom, dan pusat data instansi
                      dengan pendampingan teknis deployment, pelatihan operator, dan pemeliharaan terstruktur.
                    </p>

                    <div className="flex flex-col gap-2.5 w-full pt-1">
                      {[
                        "Instalasi & Konfigurasi Server Terpadu di Lingkungan Instansi",
                        "Bridging Data & Interoperabilitas Sistem Sektor Publik",
                        "Jaminan Pemeliharaan Berkala & Penanganan Teknis Cepat",
                      ].map((item, idx) => (
                        <div
                          key={`srv-${idx}`}
                          className="flex items-center gap-3 p-3 rounded-xl bg-graphite/40 border border-border/60"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                            ✓
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-primary">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <a
                        href={SITE_CONTENT.headline.ctaPrimary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-accent px-5 py-2.5 font-heading text-xs sm:text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-hover"
                      >
                        <span>Cek Produk di INAPROC</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: SATU Perangkat TI Generik (3D Canvas Terurai) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center w-full">
              <div className="relative w-full h-[280px] sm:h-[400px] lg:h-[540px] rounded-2xl border border-border/70 bg-graphite/30 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-2xl">
                {/* 3D Scene Canvas responding to scrollProgress */}
                <SceneCanvas pointer={pointer} scrollProgress={smoothProgress} />

                {/* Dynamic Status Pill */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-muted px-3 py-1.5 rounded-lg bg-canvas/85 border border-border/60 backdrop-blur-sm pointer-events-none">
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full transition-colors ${
                        activeStage === 1
                          ? "bg-emerald-500"
                          : activeStage === 2
                          ? "bg-amber-400"
                          : activeStage === 3
                          ? "bg-accent"
                          : "bg-blue-400"
                      }`}
                    />
                    <span className="font-medium text-primary">
                      {activeStage === 1
                        ? "Tahap 1: Perangkat Utuh"
                        : activeStage === 2
                        ? "Tahap 2: Dekonstruksi Perangkat Keras"
                        : activeStage === 3
                        ? "Tahap 3: Panel Solusi Digital"
                        : "Tahap 4: Topologi Layanan Terhubung"}
                    </span>
                  </span>
                  <span className="font-mono text-[10px]">
                    {Math.round(smoothProgress * 100)}% SCROLL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stage Timeline Navigator (Desktop) */}
        <div className="shell flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted">
            <span className="font-mono text-[10px] text-muted">ALUR CERITA:</span>
            {[
              { num: 1, label: "Hero" },
              { num: 2, label: "Perangkat TI" },
              { num: 3, label: "Software & Jasa TI" },
              { num: 4, label: "Layanan" },
            ].map((step) => (
              <button
                key={step.num}
                onClick={() => jumpToStage(step.num)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  activeStage === step.num
                    ? "bg-accent text-white"
                    : "text-muted hover:text-primary hover:bg-graphite"
                }`}
              >
                <span>0{step.num}</span>
                <span className="hidden md:inline">{step.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted">
            <span>Scroll untuk eksplorasi</span>
            <ChevronDown className="h-3.5 w-3.5 animate-bounce text-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
