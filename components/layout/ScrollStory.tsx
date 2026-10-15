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
    <div ref={containerRef} className="relative min-h-[420vh] w-full bg-canvas text-ink">
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
                    {/* Launch Status Label (DESIGN.md: bare #b64400 text, no pill background or border) */}
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-[12px] font-semibold leading-4 tracking-[-0.12px] text-launch-orange">
                        {SITE_CONTENT.headline.badge}
                      </span>
                      <span className="font-heading text-[18px] sm:text-[21px] font-semibold text-ink tracking-[0.23px]">
                        PT Agung Wijaya Nitya
                      </span>
                    </div>

                    {/* Hero Display Statement (DESIGN.md: SF Pro Display 80px/600, -1.2px tracking, 1.05 line height) */}
                    <h1 className="font-heading text-3xl sm:text-5xl lg:text-[64px] font-semibold leading-[1.05] tracking-[-1.2px] text-ink max-w-2xl">
                      <span>{SITE_CONTENT.headline.title}</span>{" "}
                      <span className="text-pricing-blue">{SITE_CONTENT.headline.titleAccent}</span>
                    </h1>

                    {/* SF Pro Text 17px/400 body copy with -0.374px tracking */}
                    <p className="text-slate text-[15px] sm:text-[17px] leading-[1.47] tracking-[-0.374px] max-w-xl">
                      {SITE_CONTENT.headline.subtitle}
                    </p>

                    {/* Conversion Controls: Pricing Blue Pill & Outlined Explore Pill */}
                    <div className="flex flex-wrap items-center gap-3 pt-1 w-full sm:w-auto">
                      <a
                        href={SITE_CONTENT.headline.ctaPrimary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-pricing-blue px-6 py-2.5 text-[14px] font-normal tracking-[-0.12px] text-white transition-opacity hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pricing-blue"
                      >
                        <span>{SITE_CONTENT.headline.ctaPrimary.label}</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>

                      <a
                        href="#verifikasi"
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-steel/70 bg-transparent px-5 py-2.5 text-[14px] font-normal tracking-[-0.12px] text-ink transition-colors hover:border-ink active:scale-[0.98]"
                      >
                        <span>Verifikasi Legalitas</span>
                      </a>
                    </div>

                    {/* Verified Facts Row (Flat #ffffff surfaces, 28px radius, 1px hairline, zero shadow) */}
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 pt-4 border-t border-hairline-silver w-full">
                      <div className="flex flex-col items-start gap-1 p-3 rounded-[20px] bg-gallery-white border border-hairline-silver">
                        <Database className="h-4 w-4 text-pricing-blue shrink-0" />
                        <span className="font-heading text-[12px] sm:text-[14px] font-semibold text-ink tracking-tight">
                          {SITE_CONTENT.company.activeProductsCount} Produk
                        </span>
                        <span className="text-[10px] text-slate tracking-[-0.12px]">Tayang INAPROC</span>
                      </div>

                      <div className="flex flex-col items-start gap-1 p-3 rounded-[20px] bg-gallery-white border border-hairline-silver">
                        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span className="font-heading text-[12px] sm:text-[14px] font-semibold text-ink tracking-tight">
                          Tipe {SITE_CONTENT.company.inaprocProviderType}
                        </span>
                        <span className="text-[10px] text-slate tracking-[-0.12px]">Penyedia Resmi</span>
                      </div>

                      <div className="flex flex-col items-start gap-1 p-3 rounded-[20px] bg-gallery-white border border-hairline-silver">
                        <MapPin className="h-4 w-4 text-slate shrink-0" />
                        <span className="font-heading text-[12px] sm:text-[14px] font-semibold text-ink tracking-tight">
                          Badung, Bali
                        </span>
                        <span className="text-[10px] text-slate tracking-[-0.12px]">Perseroan Terbatas</span>
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
                    <div className="flex items-center gap-2">
                      <Cpu className="h-3.5 w-3.5 text-pricing-blue" />
                      <span className="text-[12px] font-semibold tracking-[-0.12px] text-slate uppercase">
                        Pilar 2 · Perangkat TI
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-4xl lg:text-[48px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
                      Infrastruktur &{" "}
                      <span className="text-pricing-blue">Perangkat Keras Komputasi</span>
                    </h2>

                    <p className="text-slate text-[15px] sm:text-[17px] leading-[1.47] tracking-[-0.374px] max-w-xl">
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
                          className="flex items-center gap-3 p-3.5 rounded-[20px] bg-studio-mist border border-hairline-silver"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gallery-white border border-hairline-silver text-pricing-blue text-xs font-semibold">
                            {idx + 1}
                          </span>
                          <span className="text-xs sm:text-[14px] font-medium text-ink">
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
                    <div className="flex items-center gap-2">
                      <Layers className="h-3.5 w-3.5 text-pricing-blue" />
                      <span className="text-[12px] font-semibold tracking-[-0.12px] text-pricing-blue uppercase">
                        Pilar Utama · Software & Jasa TI (Headline)
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-4xl lg:text-[48px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
                      Solusi Sistem Informasi &{" "}
                      <span className="text-pricing-blue">Rekayasa Perangkat Lunak</span>
                    </h2>

                    <p className="text-slate text-[15px] sm:text-[17px] leading-[1.47] tracking-[-0.374px] max-w-xl">
                      Rancang bangun arsitektur aplikasi kustom, implementasi alur kerja digital,
                      serta kapabilitas reverse-engineering untuk modernisasi dan bridging sistem instansi.
                    </p>

                    {/* Verified Official Software Product Spotlight (28px radius, shadowless) */}
                    <div className="p-4 sm:p-5 rounded-[24px] bg-studio-mist border border-hairline-silver w-full">
                      <div className="flex items-center justify-between pb-1">
                        <span className="text-[10px] font-mono tracking-wider text-pricing-blue uppercase font-semibold">
                          PRODUK RESMI TAYANG DI KATALOG INAPROC
                        </span>
                        <span className="text-[10px] text-slate">Etalase Terdaftar</span>
                      </div>
                      <h3 className="font-heading text-sm sm:text-base font-semibold text-ink">
                        SIMDINKES Layanan Manajemen dan SDM Kesehatan
                      </h3>
                      <p className="text-slate text-xs pt-1">
                        Satu produk perangkat lunak resmi yang telah tayang di katalog elektronik untuk tata kelola administrasi dan sumber daya kesehatan.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 w-full pt-1">
                      <div className="p-3 rounded-[18px] bg-studio-mist border border-hairline-silver text-center">
                        <span className="block font-heading text-xs font-semibold text-ink">Pembuatan</span>
                        <span className="text-[10px] text-slate">Sistem Kustom</span>
                      </div>
                      <div className="p-3 rounded-[18px] bg-studio-mist border border-hairline-silver text-center">
                        <span className="block font-heading text-xs font-semibold text-ink">Implementasi</span>
                        <span className="text-[10px] text-slate">Deployment & Migrasi</span>
                      </div>
                      <div className="p-3 rounded-[18px] bg-studio-mist border border-hairline-silver text-center">
                        <span className="block font-heading text-xs font-semibold text-ink">Reverse-Eng</span>
                        <span className="text-[10px] text-slate">Modernisasi Sistem</span>
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
                    <div className="flex items-center gap-2">
                      <Network className="h-3.5 w-3.5 text-pricing-blue" />
                      <span className="text-[12px] font-semibold tracking-[-0.12px] text-slate uppercase">
                        Layanan · Topologi & Integrasi
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-4xl lg:text-[48px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
                      Konektivitas Terpadu &{" "}
                      <span className="text-pricing-blue">Dukungan Berkelanjutan</span>
                    </h2>

                    <p className="text-slate text-[15px] sm:text-[17px] leading-[1.47] tracking-[-0.374px] max-w-xl">
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
                          className="flex items-center gap-3 p-3.5 rounded-[20px] bg-studio-mist border border-hairline-silver"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 text-xs font-semibold">
                            ✓
                          </span>
                          <span className="text-xs sm:text-[14px] font-medium text-ink">
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
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-pricing-blue px-6 py-2.5 text-[14px] font-normal tracking-[-0.12px] text-white transition-opacity hover:opacity-90"
                      >
                        <span>Cek Produk di INAPROC</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: SATU Perangkat TI Generik (3D Canvas Terurai)
                DESIGN.md: Place the foldable-device render directly beneath/beside the text WITHOUT a containing card.
                No enclosing box, no shadow, floats seamlessly on #ffffff canvas with soft contact shadow.
            */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center w-full relative">
              <div className="relative w-full h-[320px] sm:h-[440px] lg:h-[580px] flex items-center justify-center">
                {/* 3D Scene Canvas responding to scrollProgress */}
                <SceneCanvas pointer={pointer} scrollProgress={smoothProgress} />

                {/* Floating Pricing / Fact Callout (DESIGN.md §Components: Floating Pricing Callout)
                    Role: Purchase context over product imagery
                    Float a #ffffff rounded 28px capsule near the lower product render with 14px/600 #1d1d1f pricing text
                    and compact secondary copy. Keep the blue Pricing Blue pill inside the callout; do not use drop shadows.
                */}
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-auto sm:min-w-[420px] max-w-lg p-3 sm:p-3.5 rounded-[28px] bg-gallery-white border border-hairline-silver flex items-center justify-between gap-3 sm:gap-4 z-20">
                  <div className="flex flex-col pl-2 sm:pl-3">
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-[14px] font-semibold tracking-[-0.2px] text-ink">
                        {SITE_CONTENT.company.activeProductsCount} Produk Tayang
                      </span>
                      <span className="hidden xs:inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-studio-mist text-slate border border-hairline-silver">
                        Tipe {SITE_CONTENT.company.inaprocProviderType}
                      </span>
                    </div>
                    <span className="text-[12px] text-slate tracking-[-0.12px]">
                      Katalog Elektronik INAPROC · Badung, Bali
                    </span>
                  </div>
                  <a
                    href={SITE_CONTENT.company.inaprocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 sm:h-9 items-center gap-1.5 rounded-full bg-pricing-blue px-3.5 sm:px-4 text-[12px] font-normal tracking-[-0.12px] text-white transition-opacity hover:opacity-90 active:scale-[0.98] shrink-0"
                  >
                    <span>Buka Katalog</span>
                    <ExternalLink className="h-3 w-3 opacity-90" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stage Timeline Navigator (Desktop) */}
        <div className="shell flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate">
            <span className="font-mono text-[10px] text-slate font-semibold tracking-wider">TAHAP:</span>
            {[
              { num: 1, label: "Hero" },
              { num: 2, label: "Perangkat TI" },
              { num: 3, label: "Software & Jasa TI" },
              { num: 4, label: "Layanan" },
            ].map((step) => (
              <button
                key={step.num}
                onClick={() => jumpToStage(step.num)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-[-0.12px] transition-all ${
                  activeStage === step.num
                    ? "bg-pricing-blue text-white"
                    : "text-slate hover:text-ink hover:bg-studio-mist"
                }`}
              >
                <span>0{step.num}</span>
                <span className="hidden md:inline">{step.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate font-medium">
            <span>Scroll untuk eksplorasi</span>
            <ChevronDown className="h-3.5 w-3.5 animate-bounce text-pricing-blue" />
          </div>
        </div>
      </div>
    </div>
  );
}
