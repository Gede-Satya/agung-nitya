"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Clock,
  CheckCircle2,
  ChevronRight,
  Wrench,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  MAINTENANCE_COMPONENTS,
} from "@/src/data/maintenanceData";
import { MAINTENANCE_CONFIG } from "@/src/config/maintenanceConfig";

export default function MaintenanceExplodedView() {
  const shouldReduceMotion = useReducedMotion();
  const config = MAINTENANCE_CONFIG;

  const sectionContainerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // Layout coordinates of rendered image inside canvas
  const [renderBounds, setRenderBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Calculate current active component synced with video scroll progress (0.0 - 1.0)
  const activeScrollIndex = Math.min(
    MAINTENANCE_COMPONENTS.length - 1,
    Math.floor(scrollProgress * MAINTENANCE_COMPONENTS.length)
  );
  const currentScrollComponent = MAINTENANCE_COMPONENTS[activeScrollIndex];

  // Active component ID: prioritize hover, then manual click, then scroll-synced video state
  const activeComponentId = hoveredId || activeId || currentScrollComponent?.id;

  // Format frame path e.g. /frames/laptop/0001.webp
  const getFrameUrl = useCallback(
    (index: number) => {
      const paddedIndex = String(index + 1).padStart(4, "0");
      return `${config.frameFolder}/${paddedIndex}.${config.fileExtension}`;
    },
    [config.frameFolder, config.fileExtension]
  );

  // Draw current frame to canvas using object-contain math
  const renderCanvasFrame = useCallback(
    (frameIdx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;

      // Find best available frame (exact or nearest loaded fallback)
      let img = imagesRef.current[frameIdx];
      if (!img || !img.complete) {
        for (let offset = 1; offset < 30; offset++) {
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

      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // object-contain math: centered
      const imgRatio = (img.naturalWidth || 1600) / (img.naturalHeight || 900);
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

  // Preload frames: first frame immediately, rest progressively
  useEffect(() => {
    imagesRef.current = new Array(config.frameCount).fill(null);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const step = isMobile ? 2 : 1;

    // Load First Frame immediately
    const firstImg = new window.Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      setIsFirstFrameLoaded(true);
      renderCanvasFrame(0);

      // Background progressive preload of remaining frames
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
  }, [config.frameCount, getFrameUrl, renderCanvasFrame]);

  // ResizeObserver on canvas container ensures instant redraw on layout changes
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      renderCanvasFrame(Math.round(currentFrameRef.current));
    });

    ro.observe(container);
    return () => ro.disconnect();
  }, [renderCanvasFrame]);

  // Track section visibility to pause rAF loop when out of view
  useEffect(() => {
    const container = sectionContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsSectionVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          renderCanvasFrame(Math.round(currentFrameRef.current));
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [renderCanvasFrame]);

  // Passive scroll listener: scrubs targetFrameRef and updates scrollProgress
  useEffect(() => {
    if (shouldReduceMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = sectionContainerRef.current;
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

  // Smooth easing animation loop (rAF)
  useEffect(() => {
    if (shouldReduceMotion || !isSectionVisible) return;

    const animateLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.08) {
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

  // Escape key to close popover
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveId(null);
        setHoveredId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Jump to specific component in the video scroll
  const scrollToComponent = (idx: number) => {
    const container = sectionContainerRef.current;
    if (!container) return;
    const containerTop = container.offsetTop;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetProgress = (idx + 0.5) / MAINTENANCE_COMPONENTS.length;
    const targetScrollY = containerTop + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });

    setActiveId(MAINTENANCE_COMPONENTS[idx].id);
  };

  const handleHotspotClick = (id: string) => {
    const idx = MAINTENANCE_COMPONENTS.findIndex((c) => c.id === id);
    if (idx !== -1) {
      scrollToComponent(idx);
    }
  };

  const leftComponents = MAINTENANCE_COMPONENTS.filter((c) => c.side === "left");
  const rightComponents = MAINTENANCE_COMPONENTS.filter((c) => c.side === "right");

  return (
    <section
      id="pemeliharaan-hardware"
      ref={sectionContainerRef}
      className="relative w-full bg-wash text-ink scroll-mt-0"
      style={{ height: shouldReduceMotion ? "auto" : "320svh" }}
      aria-label="Pemeliharaan dan Perbaikan Komponen Perangkat Keras"
    >
      <div id="pemeliharaan" className="sr-only scroll-mt-0" aria-hidden="true" />

      {/* Sticky Full-Viewport View Container */}
      <div className="sticky top-0 h-svh w-full flex flex-col justify-between overflow-hidden pt-14 pb-3 sm:pb-4 px-3 sm:px-6">
        <div className="shell max-w-[1280px] mx-auto w-full flex flex-col justify-between h-full min-h-0">
          
          {/* Top Header Strip */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 shrink-0 pt-2 pb-1">
            <div className="flex flex-col gap-0.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-accent">
                <Wrench className="w-3.5 h-3.5" />
                <span>Pemeliharaan & Purnajual</span>
              </div>
              <h2 className="font-heading text-lg sm:text-2xl lg:text-[28px] font-bold tracking-tight text-ink leading-tight">
                Dirancang untuk dirawat, bukan diganti.
              </h2>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs text-muted pb-0.5">
              <span className="inline-flex items-center gap-1 font-medium text-accent bg-accent/8 px-2.5 py-1 rounded-full border border-accent/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tahap {activeScrollIndex + 1} dari 5: {currentScrollComponent?.name}</span>
              </span>
              <span>• Gulir untuk melihat animasi laptop</span>
            </div>
          </div>

          {/* Center Stage Card */}
          <div className="relative w-full flex-1 min-h-0 rounded-[28px] bg-canvas border border-black/8 p-3 sm:p-4 lg:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between overflow-hidden my-1">
            
            <div className="w-full flex-1 min-h-0 relative flex flex-col md:grid md:grid-cols-12 gap-3 items-center">
              
              {/* DESKTOP: Left Column Cards (01 Layar, 02 Cooling, 04 Baterai) */}
              <div className="hidden md:flex md:col-span-3 flex-col justify-around h-full py-2 gap-3 z-20 pointer-events-auto">
                {leftComponents.map((comp) => {
                  const globalIdx = MAINTENANCE_COMPONENTS.findIndex((c) => c.id === comp.id);
                  const isSelected = activeComponentId === comp.id;

                  // Progress bar fill for this card's stage
                  const stageStart = globalIdx / MAINTENANCE_COMPONENTS.length;
                  const stageEnd = (globalIdx + 1) / MAINTENANCE_COMPONENTS.length;
                  const stageFill = Math.max(
                    0,
                    Math.min(1, (scrollProgress - stageStart) / (stageEnd - stageStart))
                  );

                  return (
                    <motion.div
                      key={comp.id}
                      animate={{
                        scale: isSelected ? 1.02 : 1,
                        x: isSelected ? 4 : 0,
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      onMouseEnter={() => setHoveredId(comp.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => scrollToComponent(globalIdx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          scrollToComponent(globalIdx);
                        }
                      }}
                      className={`group relative p-3 lg:p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-accent overflow-hidden ${
                        isSelected
                          ? "bg-white border-accent shadow-[0_8px_24px_rgba(11,107,174,0.12)] ring-1 ring-accent/30"
                          : "bg-white/85 hover:bg-white border-black/8 hover:border-black/15 shadow-2xs opacity-80 hover:opacity-100"
                      }`}
                    >
                      {/* Top Synchronized Progress Bar */}
                      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-black/5 overflow-hidden rounded-t-2xl">
                        <div
                          className="h-full bg-accent transition-all duration-75"
                          style={{ width: `${Math.round(stageFill * 100)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2 mb-1 pt-0.5">
                        <span
                          className={`text-xs font-bold tracking-wider px-2 py-0.5 rounded-full transition-colors ${
                            isSelected
                              ? "bg-accent text-white"
                              : "bg-wash text-muted group-hover:text-ink"
                          }`}
                        >
                          {comp.number}
                        </span>
                        <span className="text-[11px] font-medium text-muted flex items-center gap-1">
                          <Clock className="w-3 h-3 text-accent" />
                          {comp.duration}
                        </span>
                      </div>

                      <h3
                        className={`font-heading text-xs lg:text-sm font-semibold transition-colors leading-snug ${
                          isSelected ? "text-accent" : "text-ink group-hover:text-accent"
                        }`}
                      >
                        {comp.name}
                      </h3>

                      {/* Expanded Details when Selected */}
                      {isSelected ? (
                        <div className="mt-2 pt-2 border-t border-black/6 flex flex-col gap-1.5">
                          <p className="text-[11px] text-muted leading-relaxed line-clamp-2">
                            {comp.description}
                          </p>

                          <ul className="space-y-1">
                            {comp.services.slice(0, 3).map((srv, sIdx) => (
                              <li
                                key={sIdx}
                                className="text-[11px] flex items-start gap-1.5 leading-snug text-ink font-medium"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{srv}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="pt-1">
                            <Link
                              href={`/#cta-pengadaan?layanan=${encodeURIComponent(comp.name)}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center justify-between w-full px-3 py-1.5 rounded-xl bg-accent text-white text-[11px] font-semibold hover:bg-accent-strong transition-all shadow-2xs active:scale-[0.98]"
                            >
                              <span>Tanya layanan ini</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <ul className="mt-1.5 space-y-0.5">
                          {comp.services.slice(0, 2).map((srv, sIdx) => (
                            <li
                              key={sIdx}
                              className="text-[11px] flex items-start gap-1 leading-tight truncate text-muted"
                            >
                              <span className="text-accent mt-0.5">•</span>
                              <span className="truncate">{srv}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* SINGLE SHARED CANVAS STAGE: Active on both Desktop & Mobile */}
              <div
                ref={canvasContainerRef}
                className="w-full md:col-span-6 relative aspect-[16/9] md:aspect-auto md:h-full min-h-[220px] md:min-h-0 flex items-center justify-center overflow-hidden shrink-0"
              >
                <canvas
                  ref={canvasRef}
                  className="w-full h-full block"
                  aria-label="Laptop yang sedang menjalani servis berkala"
                  role="img"
                />

                {/* Loading state indicator */}
                {!isFirstFrameLoaded && (
                  <div className="absolute inset-0 z-30 flex items-center justify-center bg-canvas/80 backdrop-blur-xs">
                    <span className="text-sm font-medium text-slate-500">Memuat visual laptop...</span>
                  </div>
                )}

                {/* Responsive SVG Leader Lines Layer (Desktop only) */}
                {renderBounds.width > 0 && (
                  <svg
                    className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10"
                    aria-hidden="true"
                  >
                    {MAINTENANCE_COMPONENTS.map((comp) => {
                      const isSelected = activeComponentId === comp.id;
                      const hx = renderBounds.x + (comp.hotspot.x / 100) * renderBounds.width;
                      const hy = renderBounds.y + (comp.hotspot.y / 100) * renderBounds.height;
                      const startX = comp.side === "left" ? 0 : renderBounds.x + renderBounds.width;

                      return (
                        <g key={`leader-${comp.id}`}>
                          <line
                            x1={startX}
                            y1={hy}
                            x2={hx}
                            y2={hy}
                            stroke={isSelected ? "#0B6BAE" : "#D6D6D6"}
                            strokeWidth={isSelected ? 2 : 1}
                            strokeDasharray={isSelected ? "none" : "3, 3"}
                            className="transition-all duration-300"
                            opacity={isSelected ? 1 : 0.4}
                          />
                        </g>
                      );
                    })}
                  </svg>
                )}

                {/* Interactive Hotspot Buttons anchored to rendered image coordinates */}
                {renderBounds.width > 0 &&
                  MAINTENANCE_COMPONENTS.map((comp) => {
                    const globalIdx = MAINTENANCE_COMPONENTS.findIndex((c) => c.id === comp.id);
                    const isSelected = activeComponentId === comp.id;
                    const isHovered = hoveredId === comp.id;
                    const hx = renderBounds.x + (comp.hotspot.x / 100) * renderBounds.width;
                    const hy = renderBounds.y + (comp.hotspot.y / 100) * renderBounds.height;

                    return (
                      <div
                        key={`hotspot-${comp.id}`}
                        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${hx}px`, top: `${hy}px` }}
                      >
                        <button
                          type="button"
                          aria-label={`Hotspot komponen ${comp.number}: ${comp.name}`}
                          onClick={() => scrollToComponent(globalIdx)}
                          onMouseEnter={() => setHoveredId(comp.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          className={`relative flex items-center justify-center w-6 sm:w-7 h-6 sm:h-7 rounded-full cursor-pointer transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-accent ${
                            isSelected ? "scale-125 z-30" : "hover:scale-110 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <span
                            className={`absolute inset-0 rounded-full bg-accent/35 transition-opacity ${
                              shouldReduceMotion ? "" : "animate-ping"
                            } ${isSelected ? "opacity-100" : "opacity-0"}`}
                          />
                          <span
                            className={`absolute inset-0.5 rounded-full transition-colors ${
                              isSelected ? "bg-accent/40" : "bg-accent/20"
                            } backdrop-blur-xs`}
                          />
                          <span
                            className={`relative z-10 flex items-center justify-center w-4 sm:w-4.5 h-4 sm:h-4.5 rounded-full text-[9px] sm:text-[10px] font-bold text-white shadow-xs border border-white transition-all ${
                              isSelected
                                ? "bg-accent-strong ring-2 ring-accent/30 shadow-md"
                                : "bg-accent"
                            }`}
                          >
                            {comp.number}
                          </span>
                        </button>

                        {/* Sleek, Non-Obstructive Hover Tooltip Badge */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9, y: comp.hotspot.y > 60 ? 4 : -4 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: comp.hotspot.y > 60 ? 4 : -4 }}
                              transition={{ duration: 0.15 }}
                              className={`absolute pointer-events-none z-30 whitespace-nowrap px-2.5 py-1 rounded-full bg-ink/90 text-white text-[11px] font-medium shadow-md backdrop-blur-xs border border-white/10 ${
                                comp.hotspot.y > 60
                                  ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
                                  : "top-full mt-2 left-1/2 -translate-x-1/2"
                              }`}
                            >
                              <span className="text-accent-light font-bold mr-1">{comp.number}</span>
                              <span>{comp.name}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
              </div>

              {/* DESKTOP: Right Column Cards (03 Motherboard, 05 Bottom Cover) */}
              <div className="hidden md:flex md:col-span-3 flex-col justify-around h-full py-2 gap-3 z-20 pointer-events-auto">
                {rightComponents.map((comp) => {
                  const globalIdx = MAINTENANCE_COMPONENTS.findIndex((c) => c.id === comp.id);
                  const isSelected = activeComponentId === comp.id;

                  // Progress bar fill for this card's stage
                  const stageStart = globalIdx / MAINTENANCE_COMPONENTS.length;
                  const stageEnd = (globalIdx + 1) / MAINTENANCE_COMPONENTS.length;
                  const stageFill = Math.max(
                    0,
                    Math.min(1, (scrollProgress - stageStart) / (stageEnd - stageStart))
                  );

                  return (
                    <motion.div
                      key={comp.id}
                      animate={{
                        scale: isSelected ? 1.02 : 1,
                        x: isSelected ? -4 : 0,
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      onMouseEnter={() => setHoveredId(comp.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => scrollToComponent(globalIdx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          scrollToComponent(globalIdx);
                        }
                      }}
                      className={`group relative p-3 lg:p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-accent overflow-hidden ${
                        isSelected
                          ? "bg-white border-accent shadow-[0_8px_24px_rgba(11,107,174,0.12)] ring-1 ring-accent/30"
                          : "bg-white/85 hover:bg-white border-black/8 hover:border-black/15 shadow-2xs opacity-80 hover:opacity-100"
                      }`}
                    >
                      {/* Top Synchronized Progress Bar */}
                      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-black/5 overflow-hidden rounded-t-2xl">
                        <div
                          className="h-full bg-accent transition-all duration-75"
                          style={{ width: `${Math.round(stageFill * 100)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2 mb-1 pt-0.5">
                        <span
                          className={`text-xs font-bold tracking-wider px-2 py-0.5 rounded-full transition-colors ${
                            isSelected
                              ? "bg-accent text-white"
                              : "bg-wash text-muted group-hover:text-ink"
                          }`}
                        >
                          {comp.number}
                        </span>
                        <span className="text-[11px] font-medium text-muted flex items-center gap-1">
                          <Clock className="w-3 h-3 text-accent" />
                          {comp.duration}
                        </span>
                      </div>

                      <h3
                        className={`font-heading text-xs lg:text-sm font-semibold transition-colors leading-snug ${
                          isSelected ? "text-accent" : "text-ink group-hover:text-accent"
                        }`}
                      >
                        {comp.name}
                      </h3>

                      {/* Expanded Details when Selected */}
                      {isSelected ? (
                        <div className="mt-2 pt-2 border-t border-black/6 flex flex-col gap-1.5">
                          <p className="text-[11px] text-muted leading-relaxed line-clamp-2">
                            {comp.description}
                          </p>

                          <ul className="space-y-1">
                            {comp.services.slice(0, 3).map((srv, sIdx) => (
                              <li
                                key={sIdx}
                                className="text-[11px] flex items-start gap-1.5 leading-snug text-ink font-medium"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{srv}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="pt-1">
                            <Link
                              href={`/#cta-pengadaan?layanan=${encodeURIComponent(comp.name)}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center justify-between w-full px-3 py-1.5 rounded-xl bg-accent text-white text-[11px] font-semibold hover:bg-accent-strong transition-all shadow-2xs active:scale-[0.98]"
                            >
                              <span>Tanya layanan ini</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <ul className="mt-1.5 space-y-0.5">
                          {comp.services.slice(0, 2).map((srv, sIdx) => (
                            <li
                              key={sIdx}
                              className="text-[11px] flex items-start gap-1 leading-tight truncate text-muted"
                            >
                              <span className="text-accent mt-0.5">•</span>
                              <span className="truncate">{srv}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* MOBILE ONLY: Component Accordion List below the canvas */}
              <div className="block md:hidden w-full overflow-y-auto max-h-[230px] space-y-2 mt-2">
                {MAINTENANCE_COMPONENTS.map((comp, idx) => {
                  const isSelected = activeComponentId === comp.id;
                  const isExpanded = activeId === comp.id || (activeId === null && isSelected);

                  return (
                    <div
                      key={`mob-card-${comp.id}`}
                      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                        isSelected
                          ? "bg-white border-accent shadow-sm ring-1 ring-accent/30"
                          : "bg-white border-black/8"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => scrollToComponent(idx)}
                        className="w-full p-2.5 flex items-center justify-between gap-2 text-left focus:outline-none"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 transition-colors ${
                              isSelected ? "bg-accent text-white" : "bg-wash text-muted"
                            }`}
                          >
                            {comp.number}
                          </span>
                          <div>
                            <h4
                              className={`font-heading text-xs font-semibold ${
                                isSelected ? "text-accent" : "text-ink"
                              }`}
                            >
                              {comp.name}
                            </h4>
                            <span className="text-[10px] text-muted">
                              {comp.category} • {comp.duration}
                            </span>
                          </div>
                        </div>

                        <ChevronRight
                          className={`w-3.5 h-3.5 text-muted transition-transform duration-200 ${
                            isExpanded ? "rotate-90 text-accent" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="px-3 pb-3 pt-1 border-t border-black/5 flex flex-col gap-2 bg-wash/40">
                          <p className="text-[11px] text-slate leading-relaxed">
                            {comp.description}
                          </p>

                          <div className="pt-1">
                            <span className="text-[10px] font-semibold text-ink block mb-1">
                              Layanan Tersedia:
                            </span>
                            <ul className="space-y-0.5">
                              {comp.services.map((item, i) => (
                                <li
                                  key={i}
                                  className="text-[11px] text-muted flex items-start gap-1"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-1">
                            <Link
                              href={`/#cta-pengadaan?layanan=${encodeURIComponent(
                                comp.name
                              )}`}
                              className="inline-flex items-center justify-center gap-1 w-full py-2 rounded-full bg-accent text-white text-[11px] font-semibold hover:bg-accent-strong transition-colors"
                            >
                              <span>Tanya layanan ini</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Contextual CTA Strip */}
          <div className="w-full rounded-2xl bg-canvas border border-black/8 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs shrink-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <div className="text-xs text-ink">
                <span className="text-muted">Layanan pemeliharaan berkala untuk instansi dan korporasi.</span>
              </div>
            </div>

            <Link
              href="/#cta-pengadaan?tujuan=pemeliharaan"
              className="inline-flex min-h-9 items-center justify-center rounded-full bg-accent px-5 text-xs font-semibold text-on-accent transition-all hover:bg-accent-strong active:scale-[0.98] shadow-xs text-center shrink-0 w-full sm:w-auto"
            >
              <span>Jadwalkan Pemeliharaan</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
