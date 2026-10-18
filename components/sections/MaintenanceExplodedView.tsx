"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { Wrench, ArrowRight } from "lucide-react";
import {
  MAINTENANCE_CONTENT,
  getDisplayedServices,
} from "@/src/content/maintenance";

/**
 * Static exploded-view image (DESIGN.md §4.1).
 *
 * The previous 300-frame clip was removed on purpose: it ships ~24.7 MB of
 * frames, takes far more than the allowed 500 ms to separate the layers, and
 * its baked-in callouts contain duplicated labels ("04 Screen" appears twice),
 * which §4.1 forbids ("no duplicated labels"). The animation is explicitly
 * optional, so we render a single label-free exploded frame instead. This also
 * keeps the section fully usable without JavaScript (§4.1 fallbacks).
 */
const EXPLODED_VIEW = {
  src: "/frames/laptop/0230.webp",
  fallbackRatio: 16 / 9,
  alt: "Tampilan ledak laptop dengan lima komponen: layar dan panel display, cooling fan dan heat pipe, motherboard dengan RAM dan SSD, baterai, serta bottom cover.",
};

export default function MaintenanceExplodedView() {
  const content = MAINTENANCE_CONTENT;
  const items = content.items;

  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Bounds of the object-contain image inside its wrapper, in CSS px.
  const [renderBounds, setRenderBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const hotspotRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Highlight: hover takes precedence, lalu pilihan klik.
  const currentHighlightedId = hoveredId || activeId;

  const setHotspotRef = useCallback(
    (id: string) => (el: HTMLButtonElement | null) => {
      hotspotRefs.current[id] = el;
    },
    []
  );

  // object-contain math: place hotspots on the rendered image, not the box.
  const updateRenderBounds = useCallback(() => {
    const wrapper = imageWrapperRef.current;
    if (!wrapper) return;
    const cw = wrapper.clientWidth;
    const ch = wrapper.clientHeight;
    if (cw === 0 || ch === 0) return;

    const nw = imgRef.current?.naturalWidth ?? 0;
    const nh = imgRef.current?.naturalHeight ?? 0;
    const imgRatio = nw > 0 && nh > 0 ? nw / nh : EXPLODED_VIEW.fallbackRatio;
    const wrapperRatio = cw / ch;

    let rw = cw;
    let rh = ch;
    if (wrapperRatio > imgRatio) {
      rh = ch;
      rw = ch * imgRatio;
    } else {
      rw = cw;
      rh = cw / imgRatio;
    }

    const next = { x: (cw - rw) / 2, y: (ch - rh) / 2, width: rw, height: rh };
    setRenderBounds((prev) => {
      if (
        Math.abs(prev.x - next.x) < 1 &&
        Math.abs(prev.y - next.y) < 1 &&
        Math.abs(prev.width - next.width) < 1 &&
        Math.abs(prev.height - next.height) < 1
      ) {
        return prev;
      }
      return next;
    });
  }, []);

  // Recompute bounds on resize.
  useEffect(() => {
    const wrapper = imageWrapperRef.current;
    if (!wrapper) return;
    const ro = new ResizeObserver(updateRenderBounds);
    ro.observe(wrapper);
    updateRenderBounds();
    return () => ro.disconnect();
  }, [updateRenderBounds]);

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

  const handleContactNavigation = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = document.getElementById("kontak");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const leftItems = useMemo(() => items.filter((it) => it.side === "left"), [items]);
  const rightItems = useMemo(() => items.filter((it) => it.side === "right"), [items]);

  const ComponentCard = ({ item }: { item: (typeof items)[number] }) => {
    const isSelected = currentHighlightedId === item.id;
    const displayedServices = getDisplayedServices(item);

    return (
      <div
        onClick={() => setActiveId(item.id)}
        onMouseEnter={() => setHoveredId(item.id)}
        onMouseLeave={() => setHoveredId(null)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setActiveId(item.id);
          }
        }}
        className={`group relative p-3.5 rounded-card border transition-all duration-200 cursor-pointer text-left focus:outline-hidden focus:ring-2 focus:ring-accent ${
          isSelected
            ? "bg-canvas border-accent ring-2 ring-accent/15 shadow-sm"
            : "bg-canvas border-rule hover:border-accent/40 shadow-xs"
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="font-mono text-xs font-bold text-accent-ink">
            {String(item.order).padStart(2, "0")}
          </span>
        </div>

        <h3 className="font-heading text-sm font-semibold text-ink leading-snug">
          {item.label}
        </h3>

        {/* Service claims hanya jika confirmed; jika belum, tampilkan ringkasan netral */}
        {item.confirmed && displayedServices.length > 0 ? (
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {displayedServices.map((srv, idx) => (
              <li key={idx} className="flex items-start gap-1">
                <span className="text-accent-ink">&bull;</span>
                <span>{srv}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1.5 text-sm text-muted leading-relaxed">{item.summary}</p>
        )}

        <div className="mt-2 pt-2 border-t border-rule/60 flex items-center justify-between">
          <Link
            href={`/?layanan=${item.id}#kontak`}
            onClick={handleContactNavigation}
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent-ink hover:text-accent-hover transition-colors"
          >
            <span>{content.inquireActionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section
      id={content.sectionId}
      aria-labelledby="heading-pemeliharaan"
      className="relative w-full bg-canvas text-ink py-14 sm:py-20 border-b border-rule/50 scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="shell max-w-7xl mx-auto w-full flex flex-col gap-6 sm:gap-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="flex flex-col gap-1 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-ink flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{content.eyebrow}</span>
            </p>
            <h2
              id="heading-pemeliharaan"
              className="font-heading type-h2 tracking-tight text-ink"
            >
              {content.title}
            </h2>
          </div>

          <span className="text-sm text-muted">
            5 komponen modular yang dapat dirawat satu per satu.
          </span>
        </div>

        {/* Center Stage Card */}
        <div className="relative w-full rounded-card bg-canvas border border-rule p-3 sm:p-5 shadow-xs">
          <div className="w-full relative flex flex-col lg:grid lg:grid-cols-12 gap-4 items-start">
            {/* DESKTOP: Left Column Cards (01 Layar, 02 Cooling, 04 Baterai) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-3 z-20 pointer-events-auto">
              {leftItems.map((item) => (
                <ComponentCard key={item.id} item={item} />
              ))}
            </div>

            {/* CENTER: Exploded View with Hotspots & Leader Lines */}
            <div
              ref={imageWrapperRef}
              className="w-full lg:col-span-6 min-h-[320px] sm:min-h-[420px] relative flex items-center justify-center select-none"
            >
              <Image
                ref={imgRef}
                src={EXPLODED_VIEW.src}
                alt={EXPLODED_VIEW.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                onLoad={(e) => {
                  imgRef.current = e.currentTarget;
                  updateRenderBounds();
                }}
                className="object-contain pointer-events-none"
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

                  return (
                    <button
                      key={`hotspot-${item.id}`}
                      ref={setHotspotRef(item.id)}
                      type="button"
                      style={{ left: `${hx}px`, top: `${hy}px` }}
                      onClick={() => setActiveId(item.id)}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onFocus={() => setHoveredId(item.id)}
                      onBlur={() => setHoveredId(null)}
                      aria-label={`Komponen ${String(item.order).padStart(2, "0")}: ${item.label}`}
                      aria-pressed={activeId === item.id}
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
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-3 z-20 pointer-events-auto">
              {rightItems.map((item) => (
                <ComponentCard key={item.id} item={item} />
              ))}
            </div>

            {/* MOBILE: daftar seluruh komponen sebagai kartu vertikal */}
            <div className="lg:hidden w-full flex flex-col gap-3 z-20">
              {items.map((item) => (
                <ComponentCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Bottom Footer Action */}
          <div className="pt-3 sm:pt-4 mt-3 border-t border-rule/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted">
            <span>
              *Seluruh modul perangkat keras dapat diperiksa dan dirawat secara modular.
            </span>
            <Link
              href={content.closingCta.href}
              onClick={handleContactNavigation}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-accent px-6 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <span>{content.closingCta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
