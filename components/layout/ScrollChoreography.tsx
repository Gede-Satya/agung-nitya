"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import AgenticFactory3D, { MachineMode } from "@/components/ui/agentic-factory-3d";
import Navbar from "./Navbar";
import HeroSection from "../sections/HeroSection";
import ProblemSection from "../sections/ProblemSection";
import SolutionSection, { SolutionExplorer } from "../sections/SolutionSection";
import ModuleExplorationSection from "../sections/ModuleExplorationSection";
import { Layers, Split, Cpu, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import AtmosphericBackground from "../scene/AtmosphericBackground";

/**
 * Scroll Tied 3D Scene Architecture (Referenced from Scroll-Tied Video Spec & Apple Product Page)
 *
 * STACK & LOGIC:
 * - Outer: relative h-[500vh] (natural scroll track)
 * - Inner: sticky top-0 w-full h-screen overflow-hidden
 * - Native scroll progress: p = clamp(0, 1, window.scrollY / (container.offsetHeight - window.innerHeight))
 * - Frame loop (rAF) with exponential lerp:
 *     dt = min(0.1, deltaSeconds)
 *     current += (target - current) * (1 - exp(-dt * LERP_TAU)) [LERP_TAU = 8, SNAP = 0.002]
 * - Sequential text section opacities:
 *     s1Opacity: p < 0.20 -> 1, else -> max(0, 1 - (p - 0.20) / 0.08)
 *     s2Opacity: p < 0.32 -> 0, p < 0.40 -> (p - 0.32) / 0.08, p < 0.55 -> 1, else -> max(0, 1 - (p - 0.55) / 0.08)
 *     s3Opacity: p < 0.67 -> 0, p < 0.75 -> (p - 0.67) / 0.08, else -> 1
 * - Children visible when section opacity > 0.3
 * - Strict Apple Rules: No gradients, no shadows, 28px card radius, 9999px pills.
 */

const LERP_TAU = 6.2;
const SNAP = 0.0004;

function smoothstep(min: number, max: number, val: number) {
  const x = Math.max(0, Math.min(1, (val - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export default function ScrollChoreography() {
  const prefersReduced = useReducedMotion();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [lerpedProgress, setLerpedProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastTimeRef = useRef<number>(0);
  const currentPRef = useRef<number>(0);
  const lastSetPRef = useRef<number>(-1);
  const lastSetLerpRef = useRef<number>(-1);

  // Compute scroll progress: p in [0, 1] across the 500vh container
  const computeProgress = useCallback(() => {
    if (!containerRef.current) return 0;
    const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;
    return Math.min(1, Math.max(0, window.scrollY / maxScroll));
  }, []);

  // rAF loop: continuous frame rate with exponential lerp & deadband throttling to eliminate React thrash
  useEffect(() => {
    let rafId: number;

    const loop = (time: number) => {
      rafId = requestAnimationFrame(loop);
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = Math.min(0.1, (time - lastTimeRef.current) / 1000);
      lastTimeRef.current = time;

      const p = computeProgress();
      if (Math.abs(p - lastSetPRef.current) > 0.0004) {
        lastSetPRef.current = p;
        setScrollProgress(p);
      }

      if (prefersReduced) {
        currentPRef.current = p;
        if (Math.abs(p - lastSetLerpRef.current) > 0.0004) {
          lastSetLerpRef.current = p;
          setLerpedProgress(p);
        }
      } else {
        const target = p;
        let current = currentPRef.current;
        current += (target - current) * (1 - Math.exp(-dt * LERP_TAU));
        if (Math.abs(target - current) < SNAP) {
          current = target;
        }
        currentPRef.current = current;
        if (Math.abs(current - lastSetLerpRef.current) > 0.0004) {
          lastSetLerpRef.current = current;
          setLerpedProgress(current);
        }
      }
    };

    rafId = requestAnimationFrame(loop);

    const onResize = () => {
      const p = computeProgress();
      setScrollProgress(p);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [computeProgress, prefersReduced]);

  // SEQUENTIAL TEXT SECTION OPACITIES (GPU-accelerated transform & opacity only, 120 FPS pure compositor)
  // Section 1 (Hero): fully visible at top [0, 0.15], dissolves out smoothly [0.15, 0.28]
  let s1Opacity = 1;
  let s1TranslateY = 0;
  let s1Scale = 1;

  if (lerpedProgress > 0.15) {
    const exitT = smoothstep(0.15, 0.28, lerpedProgress);
    s1Opacity = 1 - exitT;
    s1TranslateY = -32 * exitT;
    s1Scale = 1 - 0.03 * exitT;
  }

  // Section 2 (Problem): Fades in & floats up [0.22, 0.35], stable [0.35, 0.58], dissolves out [0.58, 0.70]
  let s2Opacity = 0;
  let s2TranslateY = 32;
  let s2Scale = 0.97;

  if (lerpedProgress >= 0.22 && lerpedProgress <= 0.35) {
    const enterT = smoothstep(0.22, 0.35, lerpedProgress);
    s2Opacity = enterT;
    s2TranslateY = 32 * (1 - enterT);
    s2Scale = 0.97 + 0.03 * enterT;
  } else if (lerpedProgress > 0.35 && lerpedProgress < 0.58) {
    s2Opacity = 1;
    s2TranslateY = 0;
    s2Scale = 1;
  } else if (lerpedProgress >= 0.58 && lerpedProgress <= 0.70) {
    const exitT = smoothstep(0.58, 0.70, lerpedProgress);
    s2Opacity = 1 - exitT;
    s2TranslateY = -32 * exitT;
    s2Scale = 1 - 0.03 * exitT;
  } else if (lerpedProgress > 0.70) {
    s2Opacity = 0;
    s2TranslateY = -32;
    s2Scale = 0.97;
  }

  // Section 3 (Solution): Fades in & floats up [0.64, 0.77], stable [0.77, 1.0]
  let s3Opacity = 0;
  let s3TranslateY = 32;
  let s3Scale = 0.97;

  if (lerpedProgress >= 0.64 && lerpedProgress <= 0.77) {
    const enterT = smoothstep(0.64, 0.77, lerpedProgress);
    s3Opacity = enterT;
    s3TranslateY = 32 * (1 - enterT);
    s3Scale = 0.97 + 0.03 * enterT;
  } else if (lerpedProgress > 0.77) {
    s3Opacity = 1;
    s3TranslateY = 0;
    s3Scale = 1;
  }

  const s1Visible = s1Opacity > 0.01;
  const s2Visible = s2Opacity > 0.01;
  const s3Visible = s3Opacity > 0.01;

  // 3D Scene states smoothly driven by lerpedProgress:
  const activeStage: MachineMode =
    lerpedProgress < 0.28
      ? "assembled"
      : lerpedProgress < 0.63
      ? "stations"
      : "order";

  // Fragmentation step 1..5 mapped across [0.32, 0.55]:
  const problemProgress =
    lerpedProgress < 0.32
      ? 0
      : lerpedProgress > 0.55
      ? 1
      : (lerpedProgress - 0.32) / (0.55 - 0.32);

  const fragmentationStep = Math.min(
    5,
    Math.max(1, Math.floor(problemProgress * 5) + 1)
  );

  const isClimax = lerpedProgress > 0.82;

  // Smooth programmatic scroll to progress target (utilizes Lenis inertial easing if active)
  const scrollToProgress = useCallback((targetP: number) => {
    if (!containerRef.current) return;
    const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = targetP * maxScroll;
    // @ts-expect-error global lenis instance
    if (typeof window !== "undefined" && window.__lenis) {
      // @ts-expect-error global lenis instance
      window.__lenis.scrollTo(targetY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }, []);

  const handleStepChange = useCallback(
    (step: number) => {
      if (step > 5) {
        scrollToProgress(0.78);
        return;
      }
      const stepTargetP = 0.32 + ((step - 0.5) / 5) * (0.55 - 0.32);
      scrollToProgress(stepTargetP);
    },
    [scrollToProgress]
  );

  // Synchronize hash (#problem, #solution, #unified, etc.) with smooth Lenis physics
  const handleHash = useCallback((hash: string) => {
    const raw = hash.replace(/^#/, "").toLowerCase();
    if (!containerRef.current) return;
    const maxScroll = containerRef.current.offsetHeight - window.innerHeight;

    const scrollToY = (y: number) => {
      // @ts-expect-error global lenis
      if (typeof window !== "undefined" && window.__lenis) {
        // @ts-expect-error global lenis
        window.__lenis.scrollTo(y, { duration: 1.2 });
      } else {
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    const scrollToElem = (el: HTMLElement) => {
      // @ts-expect-error global lenis
      if (typeof window !== "undefined" && window.__lenis) {
        // @ts-expect-error global lenis
        window.__lenis.scrollTo(el, { duration: 1.2, offset: -16 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (raw === "problem" || raw === "fragmentasi") {
      scrollToY(0.42 * maxScroll);
    } else if (raw === "solution" || raw === "arsitektur" || raw === "rekoneksi") {
      scrollToY(0.78 * maxScroll);
    } else if (raw === "hero" || raw === "unified" || raw === "") {
      scrollToY(0);
    } else if (raw === "modules") {
      const el = document.getElementById("modules");
      if (el) scrollToElem(el);
    } else if (raw === "spesifikasi") {
      const el = document.getElementById("spesifikasi");
      if (el) scrollToElem(el);
    } else if (raw === "demo") {
      const el = document.getElementById("closing-cta") || document.getElementById("demo");
      if (el) scrollToElem(el);
    }
  }, []);

  // Handle URL hash on initial page load and when hash changes
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) {
        handleHash(window.location.hash);
      }
    };
    window.addEventListener("hashchange", onHashChange);

    if (window.location.hash) {
      const timer = setTimeout(() => {
        handleHash(window.location.hash);
      }, 150);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("hashchange", onHashChange);
      };
    }

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [handleHash]);

  // Synchronize URL hash with active stage as user scrolls
  const lastSyncedHashRef = useRef<string>("");
  useEffect(() => {
    if (scrollProgress >= 0.98) return;

    let targetHash = "";
    if (activeStage === "assembled") {
      targetHash = "#unified";
    } else if (activeStage === "stations") {
      targetHash = "#problem";
    } else if (activeStage === "order") {
      targetHash = "#solution";
    }

    if (targetHash && targetHash !== lastSyncedHashRef.current) {
      lastSyncedHashRef.current = targetHash;
      window.history.replaceState(null, "", targetHash);
    }
  }, [activeStage, scrollProgress]);

  const isPast = scrollProgress >= 1;

  return (
    <div className="relative w-full bg-white text-ink">
      {/* 500vh Tall Scroll Track */}
      <div ref={containerRef} className="relative h-[500vh] w-full">
        {/* Full-viewport Scene (Fixed while scrolling track, absolute bottom-0 when past) */}
        <div
          className={`w-full h-screen overflow-hidden bg-white ${
            isPast ? "absolute bottom-0 left-0 right-0" : "fixed top-0 left-0 right-0"
          }`}
        >
          {/* Top Hairline Scroll Progress Bar (ScaleX driven by smooth progress) */}
          <div
            className="absolute top-0 left-0 right-0 z-50 h-[2px] bg-[#0071e3] origin-left pointer-events-none transition-transform duration-75"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />

          {/* Atmospheric Ambient Background (Clean White Gallery studio backdrop) */}
          <AtmosphericBackground
            stage={activeStage}
            fragmentationStep={fragmentationStep}
            isClimax={isClimax}
          />

          {/* 3D Scene Layer: Full viewport canvas with internal camera orchestration */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 pointer-events-auto"
          >
            <AgenticFactory3D
              embed={true}
              variant="simrs"
              mode={activeStage}
              fragmentationStep={fragmentationStep}
              isClimax={isClimax}
              scrollProgress={lerpedProgress}
              height="100%"
              className="h-full w-full !bg-transparent"
            />
          </div>

          {/* Navigation Bar (fixed top, 48px height, hairline silver border, no shadow) */}
          <Navbar />

          {/* SECTION 1: HERO (Vertical centered layout, z-20 so buttons are never blocked by canvas) */}
          <div
            className="absolute inset-0 z-20 pointer-events-none will-change-[opacity,transform]"
            style={{
              opacity: s1Opacity,
              transform: `translate3d(0, ${s1TranslateY.toFixed(2)}px, 0) scale(${s1Scale.toFixed(3)})`,
              visibility: s1Visible ? "visible" : "hidden",
            }}
          >
            <HeroSection />
          </div>

          {/* SECTION 2: PROBLEM / FRAGMENTASI (Sequential Opacity with Staggered Children) */}
          <div
            className="absolute inset-0 z-10 pb-20 will-change-[opacity,transform]"
            style={{
              opacity: s2Opacity,
              transform: `translate3d(0, ${s2TranslateY.toFixed(2)}px, 0) scale(${s2Scale.toFixed(3)})`,
              pointerEvents: s2Visible && s2Opacity > 0.4 ? "auto" : "none",
              visibility: s2Visible ? "visible" : "hidden",
            }}
          >
            <ProblemSection
              activeStep={fragmentationStep}
              problemProgress={problemProgress}
              onStepChange={handleStepChange}
            />
          </div>

          {/* SECTION 3: SOLUTION / REKONEKSI (Sequential Opacity with Staggered Children) */}
          <div
            className="absolute inset-0 z-10 pb-20 will-change-[opacity,transform]"
            style={{
              opacity: s3Opacity,
              transform: `translate3d(0, ${s3TranslateY.toFixed(2)}px, 0) scale(${s3Scale.toFixed(3)})`,
              pointerEvents: s3Visible && s3Opacity > 0.4 ? "auto" : "none",
              visibility: s3Visible ? "visible" : "hidden",
            }}
          >
            <SolutionSection />
          </div>

          {/* SATU KONTROL FLOATING BAWAH: Carousel Playback Control Style (Tengah-Bawah Viewport) */}
          <aside
            aria-label="Kontrol Navigasi Tahap 3D"
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center transition-all duration-300 ${
              isPast ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100 pointer-events-auto translate-y-0"
            }`}
          >
            <div className="flex items-center gap-1 rounded-full border border-[#d6d6d6] bg-[rgba(210,210,215,0.64)] p-1 backdrop-blur-md">
              {/* Tombol kembali ke core / atas bila sudah scroll */}
              {scrollProgress > 0.15 && (
                <button
                  type="button"
                  onClick={() => scrollToProgress(0)}
                  title="Kembali ke Core"
                  aria-label="Kembali ke Core"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[rgba(0,0,0,0.56)] hover:text-ink transition-colors mr-0.5 cursor-pointer"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
              )}

              <div className="px-2 py-0.5 font-mono text-[11px] text-[rgba(0,0,0,0.56)] border-r border-[#d6d6d6]/80 hidden sm:block">
                <span>STORY</span>
              </div>

              {/* 01 Unified button */}
              <motion.button
                type="button"
                whileHover={{ scale: prefersReduced ? 1 : 1.02 }}
                whileTap={{ scale: prefersReduced ? 1 : 0.98 }}
                onClick={() => {
                  scrollToProgress(0);
                  window.history.replaceState(null, "", "#unified");
                }}
                className={`relative inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] tracking-[-0.12px] transition-colors cursor-pointer ${
                  activeStage === "assembled"
                    ? "text-ink font-medium"
                    : "text-[rgba(0,0,0,0.56)] hover:text-ink font-normal"
                }`}
                aria-pressed={activeStage === "assembled"}
              >
                {activeStage === "assembled" && (
                  <motion.div
                    layoutId="active-stage-indicator"
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                    transition={{ type: "spring", stiffness: 480, damping: 34 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" />
                  <span>01 Unified</span>
                </span>
              </motion.button>

              {/* 02 Fragmentasi button */}
              <motion.button
                type="button"
                whileHover={{ scale: prefersReduced ? 1 : 1.02 }}
                whileTap={{ scale: prefersReduced ? 1 : 0.98 }}
                onClick={() => {
                  scrollToProgress(0.42);
                  window.history.replaceState(null, "", "#problem");
                }}
                className={`relative inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] tracking-[-0.12px] transition-colors cursor-pointer ${
                  activeStage === "stations"
                    ? "text-ink font-medium"
                    : "text-[rgba(0,0,0,0.56)] hover:text-ink font-normal"
                }`}
                aria-pressed={activeStage === "stations"}
              >
                {activeStage === "stations" && (
                  <motion.div
                    layoutId="active-stage-indicator"
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                    transition={{ type: "spring", stiffness: 480, damping: 34 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Split className="h-3.5 w-3.5" />
                  <span>
                    02 Fragmentasi
                    {activeStage === "stations" ? ` (0${fragmentationStep}/05)` : ""}
                  </span>
                </span>
              </motion.button>

              {/* 03 Rekoneksi button */}
              <motion.button
                type="button"
                whileHover={{ scale: prefersReduced ? 1 : 1.02 }}
                whileTap={{ scale: prefersReduced ? 1 : 0.98 }}
                onClick={() => {
                  scrollToProgress(0.78);
                  window.history.replaceState(null, "", "#solution");
                }}
                className={`relative inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] tracking-[-0.12px] transition-colors cursor-pointer ${
                  activeStage === "order"
                    ? "text-ink font-medium"
                    : "text-[rgba(0,0,0,0.56)] hover:text-ink font-normal"
                }`}
                aria-pressed={activeStage === "order"}
              >
                {activeStage === "order" && (
                  <motion.div
                    layoutId="active-stage-indicator"
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                    transition={{ type: "spring", stiffness: 480, damping: 34 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>
                    03 Rekoneksi
                    {isClimax ? " · Climax" : ""}
                  </span>
                </span>
              </motion.button>
            </div>
          </aside>
        </div>
      </div>

      {/* Normal Scrolling Content Below the 500vh Experience Track */}
      <div className="relative z-20 bg-white">
        {/* BAB EKSPLORASI MODUL: 3D Works Wheel 9 Modul SIMRS Enterprise */}
        <ModuleExplorationSection />

        {/* SECTION 6: Spesifikasi & Modul Explorer (Studio Mist #f5f5f7 band, 28px cards, py-[90px]) */}
        <SolutionExplorer />

        {/* Closing Editorial CTA Checkpoint (Gallery White #ffffff, py-[90px], 28px card) */}
        <section
          id="closing-cta"
          className="shell relative z-10 border-t border-[#d6d6d6] py-[90px] text-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-xl rounded-[28px] border border-[#d6d6d6] bg-[#f5f5f7] p-8"
          >
            <span className="type-apple-kicker text-ink font-semibold text-[12px] uppercase">
              SIMRS ENTERPRISE · AGUNG NITYA
            </span>
            <h3 className="mt-2 text-[22px] sm:text-[26px] font-semibold tracking-[-0.3px] text-ink">
              Mulai Transformasi Digital Rumah Sakit Anda
            </h3>
            <p className="mt-3 text-[15px] tracking-[-0.224px] text-muted leading-relaxed">
              Diskusikan implementasi arsitektur satu basis data Agung Nitya bersama konsultan ahli kami.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="#demo"
                whileHover={{ scale: prefersReduced ? 1 : 1.03 }}
                whileTap={{ scale: prefersReduced ? 1 : 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="rounded-full bg-[#0071e3] px-6 py-2 text-[12px] tracking-[-0.12px] font-normal text-white hover:bg-[#0077ed] transition-colors"
              >
                Jadwalkan Demo
              </motion.a>
              <motion.button
                type="button"
                whileHover={{ y: prefersReduced ? 0 : -2 }}
                whileTap={{ y: prefersReduced ? 0 : 1 }}
                onClick={() => scrollToProgress(0)}
                className="inline-flex items-center gap-1 text-[13px] text-[#0066cc] hover:underline font-normal cursor-pointer"
              >
                <span>Kembali ke Atas</span>
                <ArrowUp className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
