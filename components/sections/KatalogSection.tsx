"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { formationProducts } from "@/lib/formation-products";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function KatalogSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);

  const total = formationProducts.length;
  const stepAngle = 360 / total;
  const stageRef = useRef<HTMLDivElement>(null);

  // Compute cylinder radius
  const [radius, setRadius] = useState(480);
  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 640) setRadius(290);
      else if (w < 1024) setRadius(400);
      else setRadius(480);
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const rotateToIndex = useCallback(
    (index: number) => {
      const normalized = (index + total) % total;
      setActiveIndex(normalized);
      const targetBase = -normalized * stepAngle;
      setRotationAngle((prev) => {
        const k = Math.round((prev - targetBase) / 360);
        return targetBase + k * 360;
      });
    },
    [total, stepAngle]
  );

  const next = useCallback(() => {
    setRotationAngle((a) => {
      const newA = a - stepAngle;
      const nearestIdx = Math.round(-newA / stepAngle);
      setActiveIndex(((nearestIdx % total) + total) % total);
      return newA;
    });
  }, [stepAngle, total]);

  const prev = useCallback(() => {
    setRotationAngle((a) => {
      const newA = a + stepAngle;
      const nearestIdx = Math.round(-newA / stepAngle);
      setActiveIndex(((nearestIdx % total) + total) % total);
      return newA;
    });
  }, [stepAngle, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setDragStartAngle(rotationAngle);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotationAngle(dragStartAngle + deltaX * 0.28);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest 45-degree angle
    const snapped = Math.round(rotationAngle / stepAngle) * stepAngle;
    setRotationAngle(snapped);
    const nearestIdx = Math.round(-snapped / stepAngle);
    setActiveIndex(((nearestIdx % total) + total) % total);
  };

  const currentProduct = formationProducts[activeIndex];

  return (
    <section
      id="katalog"
      className="relative w-full scroll-mt-20 border-b border-rule/50 bg-gradient-to-b from-canvas via-wash to-canvas py-16 text-ink sm:py-24 overflow-hidden"
    >
      <div className="shell flex flex-col gap-8 sm:gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Katalog Elektronik 3D · Circular Carousel"
            title="Kurasi produk pilihan."
            lead="Putar carousel melingkar untuk menjelajahi kurasi perangkat keras TI dan perlengkapan institusi resmi."
            action={
              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Putar sebelumnya"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-rule bg-canvas text-ink shadow-xs transition-all hover:bg-wash hover:scale-105 active:scale-95"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Putar berikutnya"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-rule bg-canvas text-ink shadow-xs transition-all hover:bg-wash hover:scale-105 active:scale-95"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <Link
                  href="/katalog"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-control bg-accent px-5 text-sm font-semibold text-on-accent shadow-xs transition-all hover:bg-accent-hover focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <span>Lihat semua produk</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            }
          />
        </Reveal>

        {/* 3D Circular Cylinder Stage */}
        <Reveal delay={0.08}>
          <div
            ref={stageRef}
            className="relative w-full h-[540px] sm:h-[620px] flex items-center justify-center select-none touch-pan-y cursor-grab active:cursor-grabbing"
            style={{ perspective: "1250px", perspectiveOrigin: "50% 36%" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* 3D Orbital floor platform disk */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl h-[95%] max-h-5xl rounded-full pointer-events-none"
              style={{
                transform: "translateX(-50%) rotateX(82deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 rounded-full border border-dashed border-accent/30" />
              <div className="absolute inset-[15%] rounded-full border border-rule/60 shadow-[0_0_40px_rgba(11,107,174,0.12)]" />
              <div
                className="absolute inset-[25%] rounded-full blur-2xl opacity-60"
                style={{
                  background:
                    "radial-gradient(circle, rgba(11, 107, 174, 0.22) 0%, rgba(201, 162, 39, 0.1) 50%, transparent 70%)",
                }}
              />
            </div>

            {/* Rotating 3D Cylinder Track */}
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
                transform: `translateZ(-${radius}px) rotateY(${rotationAngle}deg)`,
                transition: isDragging
                  ? "none"
                  : "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {formationProducts.map((item, index) => {
                const cardAngle = index * stepAngle;
                let facing = (cardAngle + rotationAngle) % 360;
                if (facing > 180) facing -= 360;
                if (facing < -180) facing += 360;
                const absFacing = Math.abs(facing);

                const isActive = absFacing < 22;
                const isFlank = absFacing >= 22 && absFacing < 65;
                const isSide = absFacing >= 65 && absFacing < 115;
                const isRear = absFacing >= 115;

                const opacity = isActive
                  ? 1
                  : isFlank
                  ? 0.85
                  : isSide
                  ? 0.55
                  : 0.22;

                return (
                  <article
                    key={item.title}
                    onClick={() => !isActive && rotateToIndex(index)}
                    className="absolute w-[270px] sm:w-[340px] h-[450px] sm:h-[495px] rounded-card border transition-all duration-300 [transform-style:preserve-3d] cursor-pointer"
                    style={{
                      transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                      opacity,
                      filter: isActive ? "none" : "brightness(0.85)",
                      pointerEvents: isRear ? "none" : "auto",
                      borderColor: isActive
                        ? "rgba(11, 107, 174, 0.35)"
                        : "rgba(29, 29, 31, 0.12)",
                      boxShadow: isActive
                        ? "0 24px 60px -12px rgba(11, 107, 174, 0.28), 0 0 0 2px rgba(201, 162, 39, 0.5)"
                        : "0 16px 36px -10px rgba(11, 29, 54, 0.10)",
                      background: "#FFFFFF",
                    }}
                  >
                    <div className="relative w-full h-full flex flex-col p-5 overflow-hidden rounded-card">
                      {/* Top status */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[10px] tracking-wider text-accent-ink uppercase font-semibold truncate max-w-[170px]">
                          {item.category}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-semibold">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          INAPROC
                        </span>
                      </div>

                      {/* Pedestal Media */}
                      <div className="relative w-full h-40 sm:h-44 rounded-xl bg-gradient-to-b from-wash to-canvas border border-rule/50 flex items-center justify-center mb-3 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          loading="lazy"
                          className="object-contain p-4 transition-transform duration-500 hover:scale-105"
                          sizes="(max-width: 640px) 270px, 340px"
                        />
                      </div>

                      {/* Content details */}
                      <div className="flex flex-1 flex-col">
                        <h3 className="font-heading line-clamp-2 text-base font-bold leading-snug text-ink mb-2">
                          {item.title}
                        </h3>

                        <div className="mt-auto flex items-center gap-2 pt-3 border-t border-rule/60">
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-control bg-[#0B192C] hover:bg-accent text-white text-xs font-semibold transition-colors"
                          >
                            <span>Lihat di INAPROC</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                          <a
                            href="#kontak"
                            className="inline-flex items-center justify-center py-2 px-3 rounded-control border border-rule bg-wash hover:bg-canvas text-ink text-xs font-semibold transition-colors"
                          >
                            Penawaran
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Edge floating buttons */}
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 sm:left-4 z-40 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-rule shadow-lg flex items-center justify-center text-ink hover:text-accent hover:scale-110 transition-all"
              aria-label="Putar ke kiri"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-2 sm:right-4 z-40 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-rule shadow-lg flex items-center justify-center text-ink hover:text-accent hover:scale-110 transition-all"
              aria-label="Putar ke kanan"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </Reveal>

        {/* Telemetry and Dots */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3 text-xs font-mono text-muted">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              [{String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}]
            </span>
            <span className="font-semibold text-ink truncate max-w-[280px]">
              {currentProduct?.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {formationProducts.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => rotateToIndex(i)}
                aria-label={`Ke slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-7 bg-accent" : "w-2 bg-rule hover:bg-ink/30"
                }`}
              />
            ))}
          </div>

          <span className="text-[11px] font-mono text-muted/80">
            Putar / seret untuk rotasi melingkar 360°
          </span>
        </div>
      </div>
    </section>
  );
}
