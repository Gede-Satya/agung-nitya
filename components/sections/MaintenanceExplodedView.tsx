"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { Wrench, ArrowRight } from "lucide-react";
import {
  MAINTENANCE_CONTENT,
  getDisplayedServices,
} from "@/src/content/maintenance";

const FRAME_CONFIG = {
  folder: "/frames/laptop",
  count: 300,
  extension: "webp",
};

export default function MaintenanceExplodedView() {
  const shouldReduceMotion = useReducedMotion();
  const content = MAINTENANCE_CONTENT;
  const items = content.items;

  const sectionContainerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // Layout bounds of rendered image inside canvas (object-contain)
  const [renderBounds, setRenderBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);
  const hotspotRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const setHotspotRef = useCallback(
    (id: string) => (el: HTMLButtonElement | null) => {
      hotspotRefs.current[id] = el;
    },
    []
  );

  // Sync active component index with scroll progress (0.0 to 1.0 across 5 items)
  const activeScrollIndex = Math.min(
    items.length - 1,
    Math.floor(scrollProgress * items.length)
  );
  const currentScrollItem = items[activeScrollIndex];

  // Active highlighted component: hover takes precedence, then click, then scroll stage
  const currentHighlightedId = hoveredId || activeId || currentScrollItem?.id;

  const getFrameUrl = useCallback((index: number) => {
    const padded = String(index + 1).padStart(4, "0");
    return `${FRAME_CONFIG.folder}/${padded}.${FRAME_CONFIG.extension}`;
  }, []);

  // Draw current frame to canvas using object-contain math
  const renderCanvasFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    // Find requested frame or nearest loaded fallback
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete) {
      for (let offset = 1; offset < 30; offset++) {
        if (frameIdx - offset >= 0 && imagesRef.current[frameIdx - offset]?.complete) {
          img = imagesRef.current[frameIdx - offset];
          break;
        }
        if (
          frameIdx + offset < FRAME_CONFIG.count &&
          imagesRef.current[frameIdx + offset]?.complete
        ) {
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

    // object-contain math
    const naturalW = img.naturalWidth || 1600;
    const naturalH = img.naturalHeight || 900;
    const imgRatio = naturalW / naturalH;
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
  }, []);

  // Preload frames
  useEffect(() => {
    imagesRef.current = new Array(FRAME_CONFIG.count).fill(null);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const step = isMobile ? 3 : 1;

    // Load first frame immediately
    const firstImg = new window.Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      renderCanvasFrame(0);

      // Preload remaining frames in background
      for (let i = 1; i < FRAME_CONFIG.count; i += step) {
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
  }, [getFrameUrl, renderCanvasFrame]);

  // ResizeObserver for canvas redraws
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      renderCanvasFrame(Math.round(currentFrameRef.current));
    });

    ro.observe(container);
    return () => ro.disconnect();
  }, [renderCanvasFrame]);

  // Track section visibility to pause rAF loop when off-screen
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

  // Passive scroll listener: scrubs targetFrameRef based on scroll progress
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
                FRAME_CONFIG.count - 1,
                Math.floor(progress * (FRAME_CONFIG.count - 1))
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
  }, [shouldReduceMotion]);

  // Smooth rAF render loop
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

  // Handle Escape key: close active card & restore focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeId) {
        const idToRestore = activeId;
        setActiveId(null);
        hotspotRefs.current[idToRestore]?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeId]);

  // Scroll directly to a component's corresponding stage
  const scrollToComponent = (idx: number) => {
    const container = sectionContainerRef.current;
    if (!container) return;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;

    const targetProgress = (idx + 0.5) / items.length;
    const targetScrollTop = container.offsetTop + targetProgress * totalScrollable;
    window.scrollTo({ top: targetScrollTop, behavior: "smooth" });
  };

  const handleContactNavigation = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = document.getElementById("kontak");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const leftItems = useMemo(() => items.filter((it) => it.side === "left"), [items]);
  const rightItems = useMemo(() => items.filter((it) => it.side === "right"), [items]);

  return (
    <section
      id={content.sectionId}
      ref={sectionContainerRef}
      aria-labelledby="heading-pemeliharaan"
      className="relative w-full bg-canvas text-ink"
      style={{ height: shouldReduceMotion ? "auto" : "300svh" }}
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-svh w-full flex flex-col justify-between overflow-hidden pt-16 sm:pt-20 pb-4 px-3 sm:px-6">
        <div className="shell max-w-7xl mx-auto w-full flex flex-col justify-between h-full min-h-0">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 shrink-0 pb-2">
            <div className="flex flex-col gap-1 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-ink flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{content.eyebrow}</span>
              </p>
              <h2
                id="heading-pemeliharaan"
                className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-ink"
              >
                {content.title}
              </h2>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs text-muted">
              <span className="font-medium text-accent-ink bg-accent/10 px-2.5 py-1 rounded-pill border border-accent/20">
                Tahap {activeScrollIndex + 1} dari 5: {currentScrollItem?.label}
              </span>
              <span>• Gulir untuk melihat animasi komponen</span>
            </div>
          </div>

          {/* Center Stage Card */}
          <div className="relative w-full flex-1 min-h-0 rounded-card bg-canvas border border-rule p-3 sm:p-5 shadow-xs flex flex-col justify-between overflow-hidden my-2">
            <div className="w-full flex-1 min-h-0 relative flex flex-col lg:grid lg:grid-cols-12 gap-3 items-center">
              {/* DESKTOP: Left Column Cards (01 Layar, 02 Cooling, 04 Baterai) */}
              <div className="hidden lg:flex lg:col-span-3 flex-col justify-around h-full py-2 gap-3 z-20 pointer-events-auto">
                {leftItems.map((item) => {
                  const globalIdx = items.findIndex((c) => c.id === item.id);
                  const isSelected = currentHighlightedId === item.id;
                  const displayedServices = getDisplayedServices(item);

                  const stageStart = globalIdx / items.length;
                  const stageEnd = (globalIdx + 1) / items.length;
                  const stageFill = Math.max(
                    0,
                    Math.min(1, (scrollProgress - stageStart) / (stageEnd - stageStart))
                  );

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setActiveId(item.id);
                        scrollToComponent(globalIdx);
                      }}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveId(item.id);
                          scrollToComponent(globalIdx);
                        }
                      }}
                      className={`group relative p-3.5 rounded-card border transition-all duration-200 cursor-pointer text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent overflow-hidden ${
                        isSelected
                          ? "bg-canvas border-accent ring-2 ring-accent/15 shadow-sm"
                          : "bg-canvas border-rule hover:border-accent/40 shadow-xs opacity-85 hover:opacity-100"
                      }`}
                    >
                      {/* Synchronized Progress Line */}
                      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-rule overflow-hidden rounded-t-card">
                        <div
                          className="h-full bg-accent transition-all duration-75"
                          style={{ width: `${Math.round(stageFill * 100)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2 mb-1 pt-0.5">
                        <span className="font-mono text-xs font-bold text-accent-ink">
                          {String(item.order).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="font-heading text-sm font-semibold text-ink leading-snug">
                        {item.label}
                      </h3>

                      {/* Service Claims (confirmed) or neutral component summary */}
                      {item.confirmed && displayedServices.length > 0 ? (
                        <ul className="mt-2 space-y-1 text-xs text-muted">
                          {displayedServices.map((srv, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-accent-ink">&bull;</span>
                              <span>{srv}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-1.5 text-xs text-muted leading-relaxed">
                          {item.summary}
                        </p>
                      )}

                      <div className="mt-2 pt-2 border-t border-rule/60 flex items-center justify-between">
                        <Link
                          href={`/?layanan=${item.id}#kontak`}
                          onClick={handleContactNavigation}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-accent-ink hover:text-accent-hover transition-colors"
                        >
                          <span>{content.inquireActionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CENTER: Canvas Exploded Animation with Hotspots & Leader Lines */}
              <div
                ref={canvasContainerRef}
                className="w-full lg:col-span-6 h-full min-h-[320px] relative flex items-center justify-center select-none"
              >
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-contain pointer-events-auto"
                />

                {/* SVG Leader Lines */}
                {renderBounds.width > 0 && (
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
                    aria-hidden="true"
                  >
                    {items.map((item) => {
                      const isHighlighted = currentHighlightedId === item.id;
                      const hx = renderBounds.x + (item.x / 100) * renderBounds.width;
                      const hy = renderBounds.y + (item.y / 100) * renderBounds.height;
                      const ex = item.side === "left" ? 0 : renderBounds.x + renderBounds.width;

                      return (
                        <line
                          key={`canvas-line-${item.id}`}
                          x1={hx}
                          y1={hy}
                          x2={ex}
                          y2={hy}
                          stroke={isHighlighted ? "var(--color-accent)" : "var(--color-rule)"}
                          strokeWidth={isHighlighted ? 1.5 : 1}
                          strokeDasharray={isHighlighted ? "none" : "2,2"}
                          className="transition-colors duration-200"
                        />
                      );
                    })}
                  </svg>
                )}

                {/* Hotspot Buttons */}
                {renderBounds.width > 0 &&
                  items.map((item) => {
                    const isHighlighted = currentHighlightedId === item.id;
                    const hx = renderBounds.x + (item.x / 100) * renderBounds.width;
                    const hy = renderBounds.y + (item.y / 100) * renderBounds.height;
                    const globalIdx = items.findIndex((c) => c.id === item.id);

                    return (
                      <button
                        key={`hotspot-${item.id}`}
                        ref={setHotspotRef(item.id)}
                        type="button"
                        style={{ left: `${hx}px`, top: `${hy}px` }}
                        onClick={() => {
                          setActiveId(item.id);
                          scrollToComponent(globalIdx);
                        }}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onFocus={() => setHoveredId(item.id)}
                        onBlur={() => setHoveredId(null)}
                        aria-label={`Komponen ${String(item.order).padStart(2, "0")}: ${item.label}`}
                        aria-expanded={activeId === item.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-full z-30 min-w-11 min-h-11 flex items-center justify-center"
                      >
                        {/* Minimum 44x44px Touch Target Wrapper */}
                        <span className="absolute -inset-2.5 rounded-full" />

                        {/* Pulse Ring */}
                        <span
                          className={`absolute -inset-1.5 rounded-full transition-opacity duration-300 ${
                            isHighlighted
                              ? "bg-accent/25 animate-ping opacity-75"
                              : "opacity-0 group-hover:opacity-40 bg-accent/20"
                          }`}
                        />

                        {/* Pin Dot */}
                        <span
                          className={`relative flex items-center justify-center w-6 h-6 rounded-full font-mono text-[11px] font-bold border transition-all duration-200 shadow-xs ${
                            isHighlighted
                              ? "bg-accent text-on-accent border-accent scale-110 shadow-sm"
                              : "bg-canvas text-ink border-rule group-hover:border-accent group-hover:text-accent-ink"
                          }`}
                        >
                          {String(item.order).padStart(2, "0")}
                        </span>
                      </button>
                    );
                  })}
              </div>

              {/* DESKTOP: Right Column Cards (03 Motherboard, 05 Sasis) */}
              <div className="hidden lg:flex lg:col-span-3 flex-col justify-around h-full py-2 gap-3 z-20 pointer-events-auto">
                {rightItems.map((item) => {
                  const globalIdx = items.findIndex((c) => c.id === item.id);
                  const isSelected = currentHighlightedId === item.id;
                  const displayedServices = getDisplayedServices(item);

                  const stageStart = globalIdx / items.length;
                  const stageEnd = (globalIdx + 1) / items.length;
                  const stageFill = Math.max(
                    0,
                    Math.min(1, (scrollProgress - stageStart) / (stageEnd - stageStart))
                  );

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setActiveId(item.id);
                        scrollToComponent(globalIdx);
                      }}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveId(item.id);
                          scrollToComponent(globalIdx);
                        }
                      }}
                      className={`group relative p-3.5 rounded-card border transition-all duration-200 cursor-pointer text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent overflow-hidden ${
                        isSelected
                          ? "bg-canvas border-accent ring-2 ring-accent/15 shadow-sm"
                          : "bg-canvas border-rule hover:border-accent/40 shadow-xs opacity-85 hover:opacity-100"
                      }`}
                    >
                      {/* Synchronized Progress Line */}
                      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-rule overflow-hidden rounded-t-card">
                        <div
                          className="h-full bg-accent transition-all duration-75"
                          style={{ width: `${Math.round(stageFill * 100)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2 mb-1 pt-0.5">
                        <span className="font-mono text-xs font-bold text-accent-ink">
                          {String(item.order).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="font-heading text-sm font-semibold text-ink leading-snug">
                        {item.label}
                      </h3>

                      {/* Service Claims (confirmed) or neutral component summary */}
                      {item.confirmed && displayedServices.length > 0 ? (
                        <ul className="mt-2 space-y-1 text-xs text-muted">
                          {displayedServices.map((srv, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-accent-ink">&bull;</span>
                              <span>{srv}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-1.5 text-xs text-muted leading-relaxed">
                          {item.summary}
                        </p>
                      )}

                      <div className="mt-2 pt-2 border-t border-rule/60 flex items-center justify-between">
                        <Link
                          href={`/?layanan=${item.id}#kontak`}
                          onClick={handleContactNavigation}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-accent-ink hover:text-accent-hover transition-colors"
                        >
                          <span>{content.inquireActionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* MOBILE: Active Component Floating Card below canvas */}
              <div className="lg:hidden w-full z-20 pt-2">
                {currentScrollItem && (
                  <div className="p-3.5 rounded-card border border-accent bg-canvas shadow-xs">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-accent-ink px-2 py-0.5 rounded-pill bg-wash border border-rule">
                          {String(currentScrollItem.order).padStart(2, "0")}
                        </span>
                        <h3 className="font-heading text-sm font-semibold text-ink">
                          {currentScrollItem.label}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-muted my-1.5">
                      {currentScrollItem.summary}
                    </p>

                    <div className="pt-2 border-t border-rule flex items-center justify-between">
                      <Link
                        href={`/?layanan=${currentScrollItem.id}#kontak`}
                        onClick={handleContactNavigation}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent-ink"
                      >
                        <span>{content.inquireActionLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <div className="flex items-center gap-1">
                        {items.map((it, idx) => (
                          <button
                            key={it.id}
                            type="button"
                            onClick={() => scrollToComponent(idx)}
                            aria-label={`Lihat komponen ${it.label}`}
                            className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                              currentScrollItem.id === it.id ? "bg-accent" : "bg-rule"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Footer Action */}
            <div className="pt-2 sm:pt-3 border-t border-rule/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
              <span>
                *Seluruh modul perangkat keras dapat diperiksa dan dirawat secara modular.
              </span>
              <Link
                href={content.closingCta.href}
                onClick={handleContactNavigation}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-accent px-6 text-xs font-semibold text-on-accent transition-colors hover:bg-accent-hover shadow-xs"
              >
                <span>{content.closingCta.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
