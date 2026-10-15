"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Cpu, Layers, Network, ChevronDown } from "lucide-react";
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
    const lenis = (window as unknown as { __lenis?: { on: (event: string, cb: () => void) => void; off: (event: string, cb: () => void) => void } }).__lenis;
    if (lenis) {
      lenis.on("scroll", handleScroll);
    }
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (lenis) {
        lenis.off("scroll", handleScroll);
      }
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
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(targetY);
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-[420vh] w-full bg-gallery-white text-ink">
      {/* Sticky Stage Viewport — Centered Gallery Stage (DESIGN.md) */}
      <div
        onMouseMove={handleMouseMove}
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden pt-16 sm:pt-20 pb-4 sm:pb-6"
      >
        <div className="shell h-full flex flex-col justify-between items-center max-w-5xl">
          {/* Centered Editorial Narrative per Stage */}
          <div className="w-full flex flex-col items-center text-center pt-1 sm:pt-2">
            <AnimatePresence mode="wait">
              {/* STAGE 1: HERO */}
              {activeStage === 1 && (
                <motion.div
                  key="stage-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col items-center gap-2 sm:gap-2.5 max-w-3xl"
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[12px] font-semibold leading-4 tracking-[-0.12px] text-launch-orange uppercase">
                      {SITE_CONTENT.headline.badge}
                    </span>
                    <span className="font-heading text-[16px] sm:text-[18px] font-semibold text-ink tracking-[0.23px]">
                      PT Agung Wijaya Nitya
                    </span>
                  </div>

                  <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-semibold leading-[1.08] tracking-[-1.2px] text-ink text-balance">
                    <span>Solusi Sistem Informasi &</span>{" "}
                    <span className="text-pricing-blue">Perangkat TI untuk Instansi</span>
                  </h1>

                  <p className="text-slate text-[13px] sm:text-[15px] leading-[1.45] tracking-[-0.374px] max-w-xl text-balance">
                    {SITE_CONTENT.headline.subtitle}
                  </p>

                  <div className="flex items-center justify-center gap-3 pt-0.5">
                    <a
                      href={SITE_CONTENT.headline.ctaPrimary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[38px] sm:min-h-[42px] items-center justify-center gap-2 rounded-full bg-pricing-blue px-5 py-2 text-[13px] font-normal tracking-[-0.12px] text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
                    >
                      <span>{SITE_CONTENT.headline.ctaPrimary.label}</span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-90" />
                    </a>

                    <a
                      href="#verifikasi"
                      className="inline-flex min-h-[38px] sm:min-h-[42px] items-center justify-center gap-2 rounded-full border border-steel/70 bg-transparent px-4 sm:px-5 py-2 text-[13px] font-normal tracking-[-0.12px] text-ink transition-colors hover:border-ink active:scale-[0.98]"
                    >
                      <span>Verifikasi Legalitas</span>
                    </a>
                  </div>
                </motion.div>
              )}

              {/* STAGE 2: HARDWARE */}
              {activeStage === 2 && (
                <motion.div
                  key="stage-2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center gap-2 sm:gap-3 max-w-3xl"
                >
                  <div className="flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5 text-pricing-blue" />
                    <span className="text-[12px] font-semibold tracking-[-0.12px] text-slate uppercase">
                      Pilar 2 · Perangkat TI
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-4xl lg:text-[46px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink text-balance">
                    Infrastruktur &{" "}
                    <span className="text-pricing-blue">Perangkat Keras Komputasi</span>
                  </h2>

                  <p className="text-slate text-[14px] sm:text-[16px] leading-[1.47] tracking-[-0.374px] max-w-2xl text-balance">
                    Penyediaan unit komputer kerja, stasiun komputasi, perangkat pemindai data, dan periferal operasional terstandarisasi untuk keandalan instansi.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[12px] text-slate">
                    <span className="px-3 py-1 rounded-full bg-studio-mist border border-hairline-silver text-ink">
                      Komputer Kerja & Mini PC
                    </span>
                    <span className="px-3 py-1 rounded-full bg-studio-mist border border-hairline-silver text-ink">
                      Pemindai Dokumen & Identifikasi
                    </span>
                    <span className="px-3 py-1 rounded-full bg-studio-mist border border-hairline-silver text-ink">
                      Infrastruktur Jaringan Terpadu
                    </span>
                  </div>
                </motion.div>
              )}

              {/* STAGE 3: SOFTWARE */}
              {activeStage === 3 && (
                <motion.div
                  key="stage-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center gap-2 sm:gap-3 max-w-3xl"
                >
                  <div className="flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-pricing-blue" />
                    <span className="text-[12px] font-semibold tracking-[-0.12px] text-pricing-blue uppercase">
                      Pilar Utama · Software & Jasa TI
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-4xl lg:text-[46px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink text-balance">
                    Solusi Sistem Informasi &{" "}
                    <span className="text-pricing-blue">Rekayasa Perangkat Lunak</span>
                  </h2>

                  <p className="text-slate text-[14px] sm:text-[16px] leading-[1.47] tracking-[-0.374px] max-w-2xl text-balance">
                    Rancang bangun arsitektur aplikasi kustom, implementasi alur kerja digital, dan reverse-engineering untuk bridging sistem instansi.
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="px-3 py-1 rounded-full bg-studio-mist border border-hairline-silver text-[12px] font-medium text-ink">
                      Produk Resmi: SIMDINKES Manajemen & SDM Kesehatan
                    </span>
                  </div>
                </motion.div>
              )}

              {/* STAGE 4: SERVICES */}
              {activeStage === 4 && (
                <motion.div
                  key="stage-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center gap-2 sm:gap-3 max-w-3xl"
                >
                  <div className="flex items-center gap-1.5">
                    <Network className="h-3.5 w-3.5 text-pricing-blue" />
                    <span className="text-[12px] font-semibold tracking-[-0.12px] text-slate uppercase">
                      Layanan · Topologi & Integrasi
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-4xl lg:text-[46px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink text-balance">
                    Konektivitas Terpadu &{" "}
                    <span className="text-pricing-blue">Dukungan Berkelanjutan</span>
                  </h2>

                  <p className="text-slate text-[14px] sm:text-[16px] leading-[1.47] tracking-[-0.374px] max-w-2xl text-balance">
                    Menghubungkan perangkat komputasi, perangkat lunak kustom, dan pusat data instansi dengan pendampingan teknis deployment dan pemeliharaan.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[12px] text-slate">
                    <span className="px-3 py-1 rounded-full bg-studio-mist border border-hairline-silver text-ink">
                      Konfigurasi Server Terpadu
                    </span>
                    <span className="px-3 py-1 rounded-full bg-studio-mist border border-hairline-silver text-ink">
                      Bridging Data Sektor Publik
                    </span>
                    <span className="px-3 py-1 rounded-full bg-studio-mist border border-hairline-silver text-ink">
                      Kontrak Pemeliharaan Terstruktur
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Centered Dominant 3D Visual Event (DESIGN.md: Center product renders as visual event) */}
          <div className="relative w-full flex-1 flex items-center justify-center min-h-[280px] sm:min-h-[380px] lg:min-h-[460px] max-h-[520px]">
            {/* 3D Scene Canvas responding to scrollProgress */}
            <SceneCanvas pointer={pointer} scrollProgress={smoothProgress} />

            {/* Floating Pricing / Fact Callout Capsule (DESIGN.md: 28px capsule over/near lower render) */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-auto sm:min-w-[420px] max-w-lg p-3 sm:p-3.5 rounded-[28px] bg-gallery-white border border-hairline-silver flex items-center justify-between gap-3 sm:gap-4 z-20">
              <div className="flex flex-col pl-2 sm:pl-3 text-left">
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

          {/* Bottom Stage Timeline Navigator */}
          <div className="w-full flex items-center justify-between pt-2 border-t border-hairline-silver/60">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate">
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
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-[-0.12px] transition-all ${
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
    </div>
  );
}
