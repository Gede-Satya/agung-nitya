"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Check, Mouse } from "lucide-react";
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

      // On desktop (width >= 768px), slightly shift the laptop rightward
      // so it is not occluded by the callout card on the left
      const isDesktop = width >= 768;
      const shiftX = isDesktop ? Math.min(width * 0.14, 110) : 0;
      rx = rx + shiftX;

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

  // Passive scroll listener with requestAnimationFrame
  useEffect(() => {
    if (shouldReduceMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            const totalScrollable = container.offsetHeight - window.innerHeight;
            if (totalScrollable > 0) {
              const currentScroll = -rect.top;
              const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

              setScrollProgress(progress);
              targetFrameRef.current = Math.min(
                config.frameCount - 1,
                Math.floor(progress * (config.frameCount - 1))
              );

              // Tahap aktif = floor(progres * 4)
              const stageIdx = Math.min(3, Math.floor(progress * 4));
              setActiveStageIndex(stageIdx);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [config.frameCount, shouldReduceMotion]);

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

  // Smooth scroll to stage on tab click
  const scrollToStage = (stageIdx: number) => {
    const container = containerRef.current;
    if (!container) return;

    const containerTop = container.offsetTop;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetProgress = stageIdx * 0.25;
    const targetScrollY = containerTop + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const currentStage = config.stages[activeStageIndex];

  // Calculate dynamic marker position on screen relative to canvas
  const markerPos = useMemo(() => {
    const { x: rx, y: ry, width: rw, height: rh } = renderBounds;
    if (rw === 0 || rh === 0) return { left: "50%", top: "50%", visible: false };

    const hotspot = currentStage.hotspot;
    const leftPx = rx + (hotspot.x / 100) * rw;
    const topPx = ry + (hotspot.y / 100) * rh;

    return {
      left: `${leftPx}px`,
      top: `${topPx}px`,
      visible: true,
    };
  }, [renderBounds, currentStage.hotspot]);

  // Reduced motion mode fallback: static exploded view + clean structured list
  if (shouldReduceMotion) {
    const finalFrameUrl = getFrameUrl(config.frameCount - 1);
    return (
      <section
        id="pemeliharaan-hardware"
        className="w-full py-16 sm:py-24 bg-[#F5F5F7] text-ink scroll-mt-28"
      >
        <div id="pemeliharaan" className="sr-only" aria-hidden="true" />
        <div className="w-full max-w-[1240px] mx-auto px-6 flex flex-col gap-8">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-[14px] font-semibold text-[#0B6BAE] tracking-tight">
              {config.sectionBadge}
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-ink">
              {config.sectionTitle}
            </h2>
          </div>

          <div
            className="rounded-[28px] ring-1 ring-black/5 overflow-hidden p-6 sm:p-10 flex flex-col items-center justify-center"
            style={{
              background:
                "radial-gradient(ellipse at center, #FFFFFF 0%, #EEF0F4 60%, #E3E6EC 100%)",
            }}
          >
            <Image
              src={finalFrameUrl}
              alt="Laptop yang sedang menjalani servis berkala"
              width={1600}
              height={900}
              unoptimized
              className="w-full max-w-4xl h-auto object-contain mix-blend-multiply"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {config.stages.map((stage) => (
              <div
                key={stage.id}
                className="bg-white rounded-2xl p-5 ring-1 ring-black/5 shadow-xs flex flex-col gap-2.5"
              >
                <span className="text-[14px] font-medium text-[#0B6BAE]">
                  {stage.stepLabel}
                </span>
                <h3 className="font-heading text-[18px] font-semibold text-ink leading-snug">
                  {stage.title}
                </h3>
                <p className="text-[15px] text-[#515154] leading-relaxed">
                  {stage.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {stage.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium bg-[#F5F5F7] text-ink"
                    >
                      <Check className="w-3.5 h-3.5 text-[#0B6BAE] shrink-0" strokeWidth={2.5} />
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="pt-2.5 border-t border-black/5 flex items-baseline gap-1.5 text-[14px]">
                  <span className="font-semibold text-ink shrink-0">Hasil:</span>
                  <span className="text-[#515154]">{stage.deliverable}</span>
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
      className="relative w-full bg-[#F5F5F7] text-ink scroll-mt-0"
      style={{ height: "380svh" }}
      aria-label="Pemeliharaan perangkat keras"
    >
      {/* Anchor alias so both #pemeliharaan and #pemeliharaan-hardware link targets work */}
      <div id="pemeliharaan" className="sr-only scroll-mt-0" aria-hidden="true" />

      {/* Embedded CSS for 350ms fade + translateY(6px) card transitions */}
      <style>{`
        @keyframes stageCardFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Sticky Full-Height Viewport Container (h-svh per requirement) */}
      <div className="sticky top-0 h-svh w-full flex flex-col justify-between overflow-hidden pt-15 sm:pt-16 pb-2 sm:pb-3 px-3 sm:px-6">
        
        {/* Top Header Strip: matches navbar max-w 1240px and px-6 */}
        <div className="w-full max-w-[1240px] mx-auto flex flex-col justify-between shrink-0 mb-1 sm:mb-1.5">
          <div className="flex flex-col gap-0.5">
            <span className="text-[14px] font-semibold text-[#0B6BAE] tracking-tight">
              {config.sectionBadge}
            </span>
            <h2 className="font-heading text-lg sm:text-2xl lg:text-[26px] font-bold tracking-tight text-ink leading-tight">
              {config.sectionTitle}
            </h2>
          </div>
        </div>

        {/* Center Stage Card (Single ring-1 ring-black/5, radius 28px, radial gradient) */}
        <div
          ref={stageCardRef}
          className="relative w-full max-w-[1240px] mx-auto flex-1 my-0.5 sm:my-1 rounded-[28px] ring-1 ring-black/5 overflow-hidden flex flex-col justify-between min-h-0"
          style={{
            background:
              "radial-gradient(ellipse at center, #FFFFFF 0%, #EEF0F4 60%, #E3E6EC 100%)",
          }}
        >
          {/* Main Visual & Canvas Area */}
          <div className="relative w-full flex-1 min-h-0 overflow-hidden">
            {/* Canvas for responsive object-contain frame drawing */}
            <canvas
              ref={canvasRef}
              className="w-full h-full block mix-blend-multiply"
              aria-label="Laptop yang sedang menjalani servis berkala"
              role="img"
            />

            {/* Loading state indicator */}
            {!isFirstFrameLoaded && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#EEF0F4]">
                <span className="text-sm font-medium text-slate-500">Memuat...</span>
              </div>
            )}

            {/* Desktop Active Stage Callout Card (Top-Left inside stage) */}
            <div
              className="hidden md:block absolute top-4 left-5 lg:top-5 lg:left-6 z-20 w-[300px] lg:w-[320px] pointer-events-auto"
              aria-live="polite"
            >
              <div
                key={currentStage.id}
                className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 ring-1 ring-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col gap-2.5 transition-all duration-350 motion-reduce:transition-none"
                style={{
                  animation: shouldReduceMotion ? "none" : "stageCardFadeIn 350ms ease-out",
                }}
              >
                {/* Sentence case, brand color, non-mono, non-uppercase */}
                <span className="text-[14px] font-medium text-[#0B6BAE]">
                  {currentStage.stepLabel}
                </span>

                {/* Judul 20px semibold */}
                <h3 className="font-heading text-[20px] font-semibold text-ink leading-snug">
                  {currentStage.title}
                </h3>

                {/* Deskripsi 15px, line-height longgar */}
                <p className="text-[15px] text-[#515154] leading-relaxed">
                  {currentStage.description}
                </p>

                {/* Chip dengan ikon centang */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentStage.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium bg-[#F5F5F7] text-ink"
                    >
                      <Check className="w-3.5 h-3.5 text-[#0B6BAE] shrink-0" strokeWidth={2.5} />
                      {chip}
                    </span>
                  ))}
                </div>

                {/* Garis pemisah tipis, lalu Hasil: ... */}
                <div className="pt-2.5 border-t border-black/5 flex items-baseline gap-1.5 text-[14px] leading-snug">
                  <span className="font-semibold text-ink shrink-0">Hasil:</span>
                  <span className="text-[#515154]">{currentStage.deliverable}</span>
                </div>
              </div>
            </div>

            {/* Mobile Active Stage Card (Top inside stage, 16px left/right margins) */}
            <div
              className="block md:hidden absolute top-2.5 left-3 right-3 z-20 pointer-events-auto"
              aria-live="polite"
            >
              <div
                key={currentStage.id}
                className="bg-white/95 backdrop-blur-md rounded-xl p-3 ring-1 ring-black/10 shadow-sm flex flex-col gap-1 transition-all duration-350 motion-reduce:transition-none"
                style={{
                  animation: shouldReduceMotion ? "none" : "stageCardFadeIn 350ms ease-out",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-[#0B6BAE]">
                    {currentStage.stepLabel}
                  </span>
                </div>

                <h3 className="font-heading text-[15px] font-semibold text-ink leading-tight">
                  {currentStage.title}
                </h3>

                <p className="text-[13px] text-[#515154] leading-snug line-clamp-2">
                  {currentStage.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-0.5">
                  {currentStage.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F5F5F7] text-ink"
                    >
                      <Check className="w-3 h-3 text-[#0B6BAE] shrink-0" strokeWidth={2.5} />
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="pt-1 border-t border-black/5 flex items-baseline gap-1 text-[12px]">
                  <span className="font-semibold text-ink shrink-0">Hasil:</span>
                  <span className="text-[#515154] truncate">{currentStage.deliverable}</span>
                </div>
              </div>
            </div>

            {/* Pulsing Hotspot Marker with dark pill label */}
            {markerPos.visible && (
              <div
                className="absolute z-20 pointer-events-none -translate-x-3 -translate-y-1/2 flex items-center transition-all duration-500 ease-out motion-reduce:transition-none"
                style={{ left: markerPos.left, top: markerPos.top }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-7 h-7 rounded-full bg-[#0B6BAE]/25 animate-ping motion-reduce:animate-none" />
                  <span className="absolute w-5 h-5 rounded-full bg-[#0B6BAE]/30" />
                  <span className="relative z-10 w-3 h-3 rounded-full bg-[#0B6BAE] border-2 border-white shadow-xs" />
                </div>
                <span className="relative z-10 ml-2.5 inline-flex items-center px-2.5 py-1 rounded-full bg-[#1D1D1F]/90 backdrop-blur-xs text-white text-[12px] font-medium shadow-md whitespace-nowrap tracking-normal">
                  {currentStage.hotspot.label}
                </span>
              </div>
            )}

            {/* Scroll Hint: "Gulir untuk lanjut" with Mouse icon, fades out when progress >= 4% */}
            <div
              className={`absolute bottom-3 right-4 z-20 pointer-events-none transition-opacity duration-300 flex items-center gap-1.5 text-[13px] text-[#515154] bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full ring-1 ring-black/5 shadow-xs ${
                scrollProgress > 0.04 ? "opacity-0" : "opacity-100"
              }`}
            >
              <Mouse className="w-3.5 h-3.5 text-[#515154]" />
              <span>Gulir untuk lanjut</span>
            </div>
          </div>

          {/* Bottom Stage Navigation: Inside stage card, full width, 4 equal columns */}
          <nav
            aria-label="Tahapan pemeliharaan"
            className="w-full shrink-0 border-t border-black/5 bg-white/80 backdrop-blur-md grid grid-cols-4 divide-x divide-black/5"
          >
            {config.stages.map((stage, idx) => {
              const isActive = activeStageIndex === idx;

              // Calculate progress bar fill (0 to 1) for stage idx
              const stageStart = idx * 0.25;
              const stageEnd = (idx + 1) * 0.25;
              let fill = 0;
              if (scrollProgress >= stageEnd) {
                fill = 1;
              } else if (scrollProgress > stageStart) {
                fill = (scrollProgress - stageStart) / 0.25;
              }

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => scrollToStage(idx)}
                  aria-current={isActive ? "step" : undefined}
                  className={`relative min-h-[48px] sm:min-h-[58px] px-1.5 sm:px-4 py-1.5 sm:py-2.5 flex flex-col justify-center transition-colors cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-[#0B6BAE] focus-visible:ring-inset focus-visible:outline-none ${
                    isActive ? "bg-white/60" : "hover:bg-white/40"
                  }`}
                >
                  {/* Top 3px Progress Bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-black/5 overflow-hidden">
                    <div
                      className="h-full bg-[#0B6BAE] transition-all duration-100 ease-out"
                      style={{ width: `${Math.min(100, Math.max(0, fill * 100))}%` }}
                    />
                  </div>

                  {/* Mobile Label (<768px): short title */}
                  <span className="block sm:hidden text-center truncate text-[12px] font-medium leading-tight">
                    <span className={isActive ? "text-[#0B6BAE] font-semibold" : "text-[#515154]"}>
                      {stage.shortTitle}
                    </span>
                  </span>

                  {/* Desktop Label (>=768px): full title */}
                  <div className="hidden sm:flex items-center gap-2 truncate">
                    <span
                      className={`text-[14px] font-semibold shrink-0 ${
                        isActive ? "text-[#0B6BAE]" : "text-[#86868B]"
                      }`}
                    >
                      0{stage.number}.
                    </span>
                    <span
                      className={`text-[14px] font-medium truncate ${
                        isActive ? "text-ink font-semibold" : "text-[#515154]"
                      }`}
                    >
                      {stage.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}
