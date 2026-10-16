"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";
import Reveal, { EASE_OUT } from "@/components/ui/Reveal";

const AUTOPLAY_MS = 6000;

export default function UnitSiapPengadaanSection() {
  const spotlights = SITE_CONTENT.spotlights;
  const total = spotlights.length;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const reduceMotion = useReducedMotion();
  const active = spotlights[index];

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + total) % total);
    },
    [total]
  );

  const select = useCallback((i: number) => {
    setIndex(i);
  }, []);

  // Rotasi otomatis — berhenti saat dijeda, di-hover/di-fokus, atau reduced-motion
  useEffect(() => {
    if (isPaused || isHovering || reduceMotion || total <= 1) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, isPaused, isHovering, reduceMotion, total]);

  const handleStageKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const waHref = (title: string) =>
    `${SITE_CONTENT.company.whatsappUrl}?text=${encodeURIComponent(
      `Halo PT Agung Wijaya Nitya, saya ingin bertanya tentang unit ${title}.`
    )}`;

  const slideTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: EASE_OUT };

  return (
    <section
      id="unit-pengadaan"
      className="relative w-full py-16 sm:py-24 bg-wash text-ink"
    >
      <div className="shell flex flex-col gap-8 sm:gap-10">
        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-heading text-2xl sm:text-4xl md:text-[42px] font-bold leading-tight tracking-tight text-ink">
              Unit siap pengadaan.
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Sorotan perangkat andalan untuk pengadaan semester ini.
            </p>
          </div>

          <span className="text-[12px] sm:text-[13px] text-muted font-normal">
            Semua unit bergaransi resmi Indonesia
          </span>
        </Reveal>

        {/* Stage */}
        <Reveal>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Sorotan unit siap pengadaan"
            onKeyDown={handleStageKeyDown}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onFocus={() => setIsHovering(true)}
            onBlur={() => setIsHovering(false)}
            className="rounded-[28px] bg-canvas p-6 sm:p-10"
          >
            <p aria-live="polite" className="sr-only">
              Menampilkan {active.title} ({index + 1} dari {total})
            </p>

            {/* Tabs */}
            <div
              role="tablist"
              aria-label="Pilih unit sorotan"
              className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1"
            >
              {spotlights.map((s, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => select(i)}
                    className={`relative min-h-11 shrink-0 px-3 text-[13px] sm:text-[14px] transition-colors ${
                      isActive
                        ? "text-accent-strong font-medium"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {s.tag}
                    {isActive && (
                      <motion.span
                        layoutId="spotlight-tab-indicator"
                        aria-hidden="true"
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Slide */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-6 sm:pt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id + "-copy"}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={slideTransition}
                  className="flex flex-col items-start gap-4"
                >
                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-bold leading-[1.15] tracking-tight text-ink text-balance">
                    {active.headline}
                  </h3>
                  <p className="text-[14px] font-medium text-ink">
                    {active.title}
                  </p>
                  <p className="text-muted text-[13px] sm:text-[14px] leading-relaxed">
                    {active.specs}
                  </p>
                  <div className="rounded-[14px] bg-wash px-3.5 py-2.5 text-[12px] text-muted leading-snug">
                    <span className="font-semibold text-ink">
                      Kebutuhan Pengadaan:{" "}
                    </span>
                    {active.target}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-2 w-full sm:w-auto">
                    <a
                      href="#cta-pengadaan"
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-[13px] font-medium text-on-accent transition-colors hover:bg-accent-strong"
                    >
                      Minta Kuotasi
                    </a>
                    <a
                      href={waHref(active.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-rule px-6 text-[13px] font-medium text-ink transition-colors hover:border-ink"
                    >
                      Tanya via WhatsApp
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Visual — crossfade berlapis */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-wash">
                {spotlights.map((s, i) => (
                  <motion.div
                    key={s.id}
                    aria-hidden={i === index ? undefined : true}
                    initial={false}
                    animate={{ opacity: i === index ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={s.image}
                      alt={i === index ? s.imageAlt : ""}
                      fill
                      priority={i === 0}
                      className="object-contain p-4 sm:p-6"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                ))}

                {/* Prev / Next */}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Unit sebelumnya"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-canvas/90 text-ink shadow-sm backdrop-blur transition hover:bg-canvas"
                  >
                    <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Unit berikutnya"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-canvas/90 text-ink shadow-sm backdrop-blur transition hover:bg-canvas"
                  >
                    <ChevronRight aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer: counter + pause */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-rule/60">
              <p className="text-[12px] text-muted tabular-nums">
                {index + 1} / {total}
              </p>
              {!reduceMotion && (
                <button
                  type="button"
                  onClick={() => setIsPaused((v) => !v)}
                  aria-pressed={isPaused}
                  aria-label={
                    isPaused
                      ? "Putar rotasi otomatis"
                      : "Jeda rotasi otomatis"
                  }
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-rule px-4 text-[12px] font-medium text-ink transition-colors hover:border-ink"
                >
                  {isPaused ? (
                    <Play aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : (
                    <Pause aria-hidden="true" className="h-3.5 w-3.5" />
                  )}
                  {isPaused ? "Putar otomatis" : "Jeda"}
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
