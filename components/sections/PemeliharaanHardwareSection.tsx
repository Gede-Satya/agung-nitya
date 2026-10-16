"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { MAINTENANCE_CONFIG } from "@/src/config/maintenanceConfig";

export default function PemeliharaanHardwareSection() {
  const shouldReduceMotion = useReducedMotion();
  const config = MAINTENANCE_CONFIG;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageCardRef = useRef<HTMLDivElement>(null);

  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // Layout coordinates of rendered image inside canvas for exact marker positioning
  const [renderBounds, setRenderBounds] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Store preloaded images in a ref to avoid re-renders
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Helper to format frame path e.g. /frames/laptop/0001.webp
  const getFrameUrl = useCallback(
    (index: number) => {
      const paddedIndex = String(index + 1).padStart(4, "0");
      return `${config.frameFolder}/${paddedIndex}.${config.fileExtension}`;
    },
    [config.frameFolder, config.fileExtension]
  );

  // Preloading frames: first frame immediately, rest in background
  useEffect(() => {
    if (shouldReduceMotion) return;

    imagesRef.current = new Array(config.frameCount).fill(null);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const step = isMobile ? 2 : 1;

    // 1. Load First Frame immediately
    const firstImg = new window.Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      setIsFirstFrameLoaded(true);

      // 2. Background preload of remaining frames
      for (let i = 1; i < config.frameCount; i += step) {
        const img = new window.Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          imagesRef.current[i] = img;
        };
      }
    };

    return () => {
      imagesRef.current = [];
    };
  }, [config.frameCount, getFrameUrl, shouldReduceMotion]);

  // Track section visibility to pause rAF loop when out of view
  useEffect(() => {
    if (shouldReduceMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  // Draw current frame to canvas using object-contain
  const renderCanvasFrame = useCallback(
    (frameIdx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Find best available frame (exact or nearest loaded fallback)
      let img = imagesRef.current[frameIdx];
      if (!img || !img.complete) {
        for (let offset = 1; offset < 15; offset++) {
          if (frameIdx - offset >= 0 && imagesRef.current[frameIdx - offset]?.complete) {
            img = imagesRef.current[frameIdx - offset];
            break;
          }
          if (frameIdx + offset < config.frameCount && imagesRef.current[frameIdx + offset]?.complete) {
            img = imagesRef.current[frameIdx + offset];
            break;
          }
        }
      }

      if (!img || !img.complete) {
        img = imagesRef.current[0];
      }

      if (!img || !img.complete) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // object-contain math
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;
      let rw = width;
      let rh = height;
      let rx = 0;
      let ry = 0;

      if (canvasRatio > imgRatio) {
        rh = height;
        rw = height * imgRatio;
        rx = (width - rw) / 2;
      } else {
        rw = width;
        rh = width / imgRatio;
        ry = (height - rh) / 2;
      }

      ctx.drawImage(img, rx, ry, rw, rh);
      ctx.restore();

      setRenderBounds((prev) => {
        if (
          Math.abs(prev.x - rx) < 1 &&
          Math.abs(prev.y - ry) < 1 &&
          Math.abs(prev.width - rw) < 1 &&
          Math.abs(prev.height - rh) < 1
        ) {
          return prev;
        }
        return { x: rx, y: ry, width: rw, height: rh };
      });
    },
    [config.frameCount]
  );

  // Passive scroll listener: calculate progress & active stage
  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      setScrollProgress(progress);
      targetFrameRef.current = Math.min(
        config.frameCount - 1,
        Math.floor(progress * (config.frameCount - 1))
      );

      // Determine active stage from config scrollStart thresholds
      let currentStageIdx = 0;
      for (let i = config.stages.length - 1; i >= 0; i--) {
        if (progress >= config.stages[i].scrollStart - 0.02) {
          currentStageIdx = i;
          break;
        }
      }
      setActiveStageIndex(currentStageIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [config.frameCount, config.stages, shouldReduceMotion]);

  // Handle window resize for canvas redraw
  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleResize = () => {
      renderCanvasFrame(Math.round(currentFrameRef.current));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderCanvasFrame, shouldReduceMotion]);

  // Smooth easing animation loop inside requestAnimationFrame
  useEffect(() => {
    if (shouldReduceMotion || !isSectionVisible) return;

    const animateLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.1) {
        currentFrameRef.current += diff * 0.18;
        renderCanvasFrame(Math.round(currentFrameRef.current));
      } else if (Math.round(current) !== target) {
        currentFrameRef.current = target;
        renderCanvasFrame(target);
      }

      animFrameIdRef.current = requestAnimationFrame(animateLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(animateLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isSectionVisible, renderCanvasFrame, shouldReduceMotion]);

  // Initial draw once first frame loads
  useEffect(() => {
    if (isFirstFrameLoaded && !shouldReduceMotion) {
      renderCanvasFrame(0);
    }
  }, [isFirstFrameLoaded, renderCanvasFrame, shouldReduceMotion]);

  // Smooth scroll to stage on button click
  const scrollToStage = (stageIdx: number) => {
    const container = containerRef.current;
    if (!container) return;

    const stage = config.stages[stageIdx];
    const containerTop = container.offsetTop;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetScrollY = containerTop + stage.scrollStart * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const currentStage = config.stages[activeStageIndex];

  // Calculate dynamic marker position on screen
  const markerPos = useMemo(() => {
    const { x: rx, y: ry, width: rw, height: rh } = renderBounds;
    if (rw === 0 || rh === 0) return { left: "50%", top: "50%", visible: false };

    const marker = currentStage.marker;
    const leftPx = rx + marker.x * rw;
    const topPx = ry + marker.y * rh;

    return {
      left: `${leftPx}px`,
      top: `${topPx}px`,
      visible: true,
    };
  }, [renderBounds, currentStage.marker]);

  // Reduced motion mode fallback: static exploded view + plain list
  if (shouldReduceMotion) {
    const finalFrameUrl = getFrameUrl(config.frameCount - 1);
    return (
      <section
        id="pemeliharaan-hardware"
        className="w-full py-16 sm:py-24 bg-[#F5F5F7] text-ink"
      >
        <div className="shell flex flex-col gap-10">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-xs font-semibold text-[#0B6BAE] uppercase tracking-wider">
              {config.sectionBadge}
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-ink">
              {config.sectionTitle}
            </h2>
          </div>

          <div className="rounded-[28px] overflow-hidden bg-white border border-black/5 shadow-sm p-4 sm:p-8 flex flex-col items-center gap-6">
            <Image
              src={finalFrameUrl}
              alt={config.caption}
              width={1600}
              height={900}
              unoptimized
              className="w-full max-w-4xl h-auto object-contain"
            />
            <p className="text-sm text-slate-500 font-medium">{config.caption}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {config.stages.map((stage) => (
              <div
                key={stage.id}
                className="bg-white rounded-2xl p-5 border border-black/5 flex flex-col gap-2.5"
              >
                <span className="text-xs font-mono font-bold text-[#0B6BAE]">
                  {stage.number} · {stage.kicker}
                </span>
                <h3 className="font-heading text-base font-bold text-ink">{stage.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{stage.body}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {stage.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[13px] bg-[#F5F5F7] text-slate-700"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="pemeliharaan-hardware"
      ref={containerRef}
      className="relative w-full bg-[#F5F5F7] text-ink"
      style={{ height: "500vh" }}
      aria-label="Pemeliharaan perangkat keras"
    >
      {/* Sticky Full-Height Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
        
        {/* Top Header Strip: Single badge & title */}
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-1 sm:gap-4 shrink-0">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-semibold text-[#0B6BAE] uppercase tracking-wider">
              {config.sectionBadge}
            </span>
            <h2 className="font-heading text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-ink leading-tight">
              {config.sectionTitle}
            </h2>
          </div>

          {/* Polite live region for screen readers */}
          <div className="sr-only" aria-live="polite">
            Tahap {currentStage.number}: {currentStage.title}. {currentStage.body}
          </div>
        </div>

        {/* Center Stage Card (#F5F5F7 backdrop with rounded corners matching site) */}
        <div
          ref={stageCardRef}
          className="relative w-full max-w-6xl mx-auto flex-1 my-2 sm:my-3 rounded-[24px] sm:rounded-[28px] bg-[#ECECED] border border-black/[0.06] shadow-sm overflow-hidden flex flex-col items-center justify-center min-h-0"
        >
          {/* Canvas for responsive object-contain frame drawing */}
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            aria-label="Ilustrasi interaktif arsitektur dan pemeliharaan perangkat laptop"
            role="img"
          />

          {/* Loading state indicator */}
          {!isFirstFrameLoaded && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#ECECED]">
              <span className="text-sm font-medium text-slate-500">Memuat...</span>
            </div>
          )}

          {/* Active Stage Callout Card (Desktop: Top-left inside stage, mobile: positioned clean) */}
          <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 max-w-[280px] sm:max-w-[340px] pointer-events-none">
            <div
              key={currentStage.id}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex flex-col gap-2 transition-all duration-300"
            >
              <span className="text-xs font-mono font-bold tracking-wider text-[#0B6BAE]">
                {currentStage.number} / 04 · {currentStage.kicker}
              </span>

              <h3 className="font-heading text-base sm:text-lg font-bold text-ink leading-snug">
                {currentStage.title}
              </h3>

              <p className="text-[14px] text-slate-600 leading-relaxed">
                {currentStage.body}
              </p>

              {/* Specification Chips (Minimum text 13px) */}
              <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-black/5">
                {currentStage.chips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md text-[13px] font-medium bg-[#F5F5F7] text-slate-700"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Single small blue marker dot moving smoothly to current stage anchor position */}
          {markerPos.visible && (
            <div
              className="absolute z-10 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
              style={{ left: markerPos.left, top: markerPos.top }}
            >
              <div className="relative flex items-center justify-center">
                {/* Soft outer ring */}
                <div className="w-8 h-8 rounded-full bg-[#0B6BAE]/20 animate-ping absolute" />
                <div className="w-6 h-6 rounded-full bg-[#0B6BAE]/30 absolute" />
                {/* Center dot */}
                <div className="w-3.5 h-3.5 rounded-full bg-[#0B6BAE] border-2 border-white shadow-md relative z-10" />
              </div>
            </div>
          )}

          {/* Quiet scroll hint (fades out as soon as user starts scrolling) */}
          <div
            className={`absolute bottom-3 right-4 z-20 pointer-events-none transition-opacity duration-300 text-xs text-slate-500 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-black/5 ${
              scrollProgress > 0.03 ? "opacity-0" : "opacity-100"
            }`}
          >
            Scroll untuk membongkar
          </div>

          {/* Quiet stage caption */}
          <div className="absolute bottom-3 left-4 z-20 pointer-events-none text-xs text-slate-400 font-medium">
            {config.caption}
          </div>
        </div>

        {/* Bottom Stepper Navigation (01-04 Real Clickable Buttons) */}
        <div className="w-full max-w-4xl mx-auto shrink-0 pb-1">
          <nav
            aria-label="Tahapan pemeliharaan"
            className="grid grid-cols-2 sm:grid-cols-4 gap-2"
          >
            {config.stages.map((stage, idx) => {
              const isActive = activeStageIndex === idx;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => scrollToStage(idx)}
                  aria-current={isActive ? "step" : undefined}
                  className={`text-left px-3 py-2 sm:py-2.5 rounded-xl transition-all flex flex-col gap-0.5 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B6BAE] focus:ring-offset-2 ${
                    isActive
                      ? "bg-white text-ink border-black/15 shadow-sm scale-[1.01]"
                      : "bg-white/50 hover:bg-white/80 text-slate-500 border-black/5"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className={isActive ? "text-[#0B6BAE] font-bold" : "text-slate-400"}>
                      {stage.number}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B6BAE]" />
                    )}
                  </div>
                  <span
                    className={`text-xs sm:text-[13px] font-semibold truncate ${
                      isActive ? "text-ink" : "text-slate-600"
                    }`}
                  >
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
