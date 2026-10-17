"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Wrench, ArrowRight } from "lucide-react";
import {
  MAINTENANCE_CONTENT,
  getDisplayedServices,
} from "@/src/content/maintenance";

export default function MaintenanceExplodedView() {
  const content = MAINTENANCE_CONTENT;
  const items = content.items;

  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Refs for keyboard accessibility (returning focus on Escape)
  const hotspotRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const setHotspotRef = useCallback(
    (id: string) => (el: HTMLButtonElement | null) => {
      hotspotRefs.current[id] = el;
    },
    []
  );

  // Currently highlighted component (hover prioritizes over click)
  const currentHighlightedId = hoveredId || activeId;

  // Handle Escape key to close active popover card and restore focus to trigger hotspot
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

  return (
    <section
      id={content.sectionId}
      aria-labelledby="heading-pemeliharaan"
      className="w-full bg-wash/40 py-20 md:py-28 border-t border-b border-rule relative overflow-hidden"
    >
      <div className="shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 flex items-center justify-center gap-1.5">
            <Wrench className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{content.eyebrow}</span>
          </p>
          <h2
            id="heading-pemeliharaan"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink"
          >
            {content.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted max-w-2xl mx-auto">
            Dukungan pemeliharaan dan peremajaan komponen perangkat TI untuk
            menjaga keberlanjutan operasional instansi secara terencana.
          </p>
        </div>

        {/* =========================================================================
            DESKTOP PRESENTATION (>= 1024px)
            Exploded view image in center, 01-05 labels on left/right with leader lines.
            Zero overlap at 1024px and above (DESIGN.md §4.1).
           ========================================================================= */}
        <div className="hidden lg:block relative max-w-6xl mx-auto">
          <div className="grid grid-cols-12 items-center gap-4 relative min-h-[580px]">
            {/* Left Column Labels (items: 01 layar, 02 cooling, 04 baterai) */}
            <div className="col-span-3 relative h-full min-h-[580px]">
              {items
                .filter((item) => item.side === "left")
                .map((item) => {
                  const isHighlighted = currentHighlightedId === item.id;
                  const displayedServices = getDisplayedServices(item);

                  return (
                    <div
                      key={item.id}
                      style={{ top: `${item.y}%` }}
                      className="absolute right-0 -translate-y-1/2 w-full max-w-[270px] transition-transform duration-200"
                    >
                      <div
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={`rounded-card border bg-canvas p-4 transition-all duration-200 shadow-xs ${
                          isHighlighted
                            ? "border-accent ring-2 ring-accent/15 shadow-md bg-canvas"
                            : "border-rule hover:border-accent/40"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-mono text-xs font-bold text-accent">
                            {String(item.order).padStart(2, "0")}
                          </span>
                          {!item.confirmed && (
                            <span className="text-[10px] uppercase font-semibold tracking-wider text-muted bg-wash px-2 py-0.5 rounded-pill border border-rule">
                              Draft
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-semibold text-ink leading-snug">
                          {item.label}
                        </h3>

                        {/* Unconfirmed notice or confirmed services */}
                        {item.confirmed && displayedServices.length > 0 ? (
                          <ul className="mt-2 space-y-1 text-xs text-muted">
                            {displayedServices.map((srv, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-accent">&bull;</span>
                                <span>{srv}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-xs text-muted italic">
                            {content.unconfirmedNotice}
                          </p>
                        )}

                        <div className="mt-3 pt-2.5 border-t border-rule/60 flex items-center justify-between">
                          <Link
                            href={`/?layanan=${item.id}#kontak`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors group"
                          >
                            <span>{content.inquireActionLabel}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Center Column: Exploded View Image & Interactive SVG Leader Lines */}
            <div className="col-span-6 relative flex items-center justify-center">
              <div className="relative w-full aspect-[16/9] max-w-[560px] mx-auto select-none">
                {/* 2D Exploded View Image */}
                <Image
                  src="/images/laptop-exploded-view.webp"
                  alt="Ilustrasi pemeliharaan modular perangkat laptop komponen per komponen"
                  width={960}
                  height={540}
                  priority
                  className="w-full h-full object-contain pointer-events-none drop-shadow-md"
                />

                {/* SVG Leader Lines connecting Hotspots (item.x, item.y) to Side Margins */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {items.map((item) => {
                    const isHighlighted = currentHighlightedId === item.id;
                    const endX = item.side === "left" ? 0 : 100;

                    return (
                      <g key={`line-${item.id}`}>
                        {/* Leader line from hotspot (item.x, item.y) to left/right border */}
                        <line
                          x1={item.x}
                          y1={item.y}
                          x2={endX}
                          y2={item.y}
                          stroke={isHighlighted ? "var(--color-accent)" : "var(--color-rule)"}
                          strokeWidth={isHighlighted ? "0.8" : "0.5"}
                          strokeDasharray={isHighlighted ? "none" : "1.5,1.5"}
                          className="transition-all duration-300"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Hotspot Interactive Buttons */}
                {items.map((item) => {
                  const isHighlighted = currentHighlightedId === item.id;

                  return (
                    <button
                      key={`hotspot-${item.id}`}
                      ref={setHotspotRef(item.id)}
                      type="button"
                      style={{ left: `${item.x}%`, top: `${item.y}%` }}
                      onClick={() =>
                        setActiveId((prev) => (prev === item.id ? null : item.id))
                      }
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onFocus={() => setHoveredId(item.id)}
                      onBlur={() => setHoveredId(null)}
                      aria-label={`Komponen ${String(item.order).padStart(2, "0")}: ${item.label}`}
                      aria-expanded={activeId === item.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-hidden"
                    >
                      {/* Pulse Ring */}
                      <span
                        className={`absolute -inset-2 rounded-full transition-opacity duration-300 ${
                          isHighlighted
                            ? "bg-accent/25 animate-ping opacity-75"
                            : "opacity-0 group-hover:opacity-40 bg-accent/20"
                        }`}
                      />

                      {/* Hotspot Pin Badge */}
                      <span
                        className={`relative flex items-center justify-center w-6 h-6 rounded-full font-mono text-[11px] font-bold border transition-all duration-200 shadow-xs ${
                          isHighlighted
                            ? "bg-accent text-on-accent border-accent scale-110 shadow-sm"
                            : "bg-canvas text-ink border-rule group-hover:border-accent group-hover:text-accent"
                        }`}
                      >
                        {String(item.order).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column Labels (items: 03 motherboard, 05 sasis) */}
            <div className="col-span-3 relative h-full min-h-[580px]">
              {items
                .filter((item) => item.side === "right")
                .map((item) => {
                  const isHighlighted = currentHighlightedId === item.id;
                  const displayedServices = getDisplayedServices(item);

                  return (
                    <div
                      key={item.id}
                      style={{ top: `${item.y}%` }}
                      className="absolute left-0 -translate-y-1/2 w-full max-w-[270px] transition-transform duration-200"
                    >
                      <div
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={`rounded-card border bg-canvas p-4 transition-all duration-200 shadow-xs ${
                          isHighlighted
                            ? "border-accent ring-2 ring-accent/15 shadow-md bg-canvas"
                            : "border-rule hover:border-accent/40"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-mono text-xs font-bold text-accent">
                            {String(item.order).padStart(2, "0")}
                          </span>
                          {!item.confirmed && (
                            <span className="text-[10px] uppercase font-semibold tracking-wider text-muted bg-wash px-2 py-0.5 rounded-pill border border-rule">
                              Draft
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-semibold text-ink leading-snug">
                          {item.label}
                        </h3>

                        {/* Unconfirmed notice or confirmed services */}
                        {item.confirmed && displayedServices.length > 0 ? (
                          <ul className="mt-2 space-y-1 text-xs text-muted">
                            {displayedServices.map((srv, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-accent">&bull;</span>
                                <span>{srv}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-xs text-muted italic">
                            {content.unconfirmedNotice}
                          </p>
                        )}

                        <div className="mt-3 pt-2.5 border-t border-rule/60 flex items-center justify-between">
                          <Link
                            href={`/?layanan=${item.id}#kontak`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors group"
                          >
                            <span>{content.inquireActionLabel}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOBILE & TABLET PRESENTATION (< 1024px)
            Image on top with hotspots, components listed vertically below (01-05).
            No side labels to prevent clutter (DESIGN.md §4.1).
           ========================================================================= */}
        <div className="lg:hidden flex flex-col gap-8 max-w-2xl mx-auto">
          {/* Exploded View Image Card with Hotspots */}
          <div className="relative w-full aspect-[16/9] bg-canvas rounded-card border border-rule p-4 overflow-hidden shadow-xs flex items-center justify-center">
            <div className="relative w-full h-full max-w-[500px]">
              <Image
                src="/images/laptop-exploded-view.webp"
                alt="Ilustrasi pemeliharaan modular perangkat laptop komponen per komponen"
                width={800}
                height={450}
                priority
                className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
              />

              {/* Numbered Hotspot Pins */}
              {items.map((item) => {
                const isHighlighted = currentHighlightedId === item.id;

                return (
                  <button
                    key={`mobile-hotspot-${item.id}`}
                    ref={setHotspotRef(item.id)}
                    type="button"
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    onClick={() =>
                      setActiveId((prev) => (prev === item.id ? null : item.id))
                    }
                    aria-label={`Komponen ${String(item.order).padStart(2, "0")}: ${item.label}`}
                    aria-expanded={activeId === item.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-hidden"
                  >
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full font-mono text-[11px] font-bold border transition-transform duration-200 shadow-xs ${
                        isHighlighted
                          ? "bg-accent text-on-accent border-accent scale-110 shadow-sm ring-4 ring-accent/20"
                          : "bg-canvas text-ink border-rule"
                      }`}
                    >
                      {String(item.order).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vertical List of Component Cards (01 to 05 strictly ordered) */}
          <div className="flex flex-col gap-3">
            {items.map((item) => {
              const isHighlighted = currentHighlightedId === item.id;
              const displayedServices = getDisplayedServices(item);

              return (
                <div
                  key={`mobile-card-${item.id}`}
                  onClick={() => setActiveId(item.id)}
                  className={`rounded-card border p-4 transition-all duration-200 bg-canvas ${
                    isHighlighted
                      ? "border-accent ring-2 ring-accent/15 shadow-sm"
                      : "border-rule"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-wash font-mono text-xs font-bold text-accent border border-rule">
                        {String(item.order).padStart(2, "0")}
                      </span>
                      <h3 className="text-base font-semibold text-ink">
                        {item.label}
                      </h3>
                    </div>

                    {!item.confirmed && (
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-muted bg-wash px-2 py-0.5 rounded-pill border border-rule shrink-0">
                        Draft
                      </span>
                    )}
                  </div>

                  {/* Service Claims or Unconfirmed Notice */}
                  {item.confirmed && displayedServices.length > 0 ? (
                    <ul className="mt-2 space-y-1 text-sm text-muted">
                      {displayedServices.map((srv, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-accent">&bull;</span>
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted italic">
                      {content.unconfirmedNotice}
                    </p>
                  )}

                  <div className="mt-3 pt-2.5 border-t border-rule/60 flex items-center justify-between">
                    <Link
                      href={`/?layanan=${item.id}#kontak`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
                    >
                      <span>{content.inquireActionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Closing CTA */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            href={content.closingCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-control bg-accent px-8 py-3.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover shadow-xs focus:outline-hidden focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            <span>{content.closingCta.label}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
