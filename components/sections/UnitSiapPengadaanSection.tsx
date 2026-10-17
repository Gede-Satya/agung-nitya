"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";
import Reveal, { EASE_OUT } from "@/components/ui/Reveal";

export default function UnitSiapPengadaanSection() {
  const spotlights = SITE_CONTENT.unitPengadaan.spotlights;
  const total = spotlights.length;
  const [index, setIndex] = useState(0);
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

  const handleStageKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const slideTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: EASE_OUT };

  return (
    <section
      id="unit-pengadaan"
      className="relative w-full py-14 sm:py-20 bg-canvas text-ink border-b border-rule/50 scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="shell flex flex-col gap-8 sm:gap-10">
        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-heading type-h2 text-ink">
              {SITE_CONTENT.unitPengadaan.title}
            </h2>
            <p className="type-body text-muted">
              {SITE_CONTENT.unitPengadaan.subtitle}
            </p>
          </div>

          <span className="text-xs text-muted font-normal">
            {SITE_CONTENT.unitPengadaan.notice}
          </span>
        </Reveal>

        {/* Stage */}
        <Reveal>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Sorotan unit siap pengadaan"
            onKeyDown={handleStageKeyDown}
            className="rounded-card bg-wash border border-rule/70 p-6 sm:p-10 shadow-xs"
          >
            <p aria-live="polite" className="sr-only">
              Menampilkan {active.title} ({index + 1} dari {total})
            </p>

            {/* Tabs */}
            <div
              role="tablist"
              aria-label="Pilih unit sorotan"
              className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 border-b border-rule/60"
            >
              {spotlights.map((s, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => select(i)}
                    className={`relative min-h-11 shrink-0 px-3 text-sm transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent rounded-control ${
                      isActive
                        ? "text-accent font-semibold"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {s.tag}
                    {isActive && (
                      <motion.span
                        layoutId="spotlight-tab-indicator"
                        aria-hidden="true"
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        className="absolute inset-x-2 -bottom-px h-0.5 rounded-pill bg-accent"
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
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={slideTransition}
                  className="flex flex-col items-start gap-4"
                >
                  <h3 className="font-heading type-h3 text-ink text-balance">
                    {active.headline}
                  </h3>
                  <p className="text-sm font-semibold text-accent">
                    {active.title}
                  </p>
                  <p className="type-body text-muted text-sm leading-relaxed">
                    {active.description}
                  </p>
                  <div className="rounded-control bg-wash border border-rule/50 px-4 py-2.5 text-xs text-muted leading-snug">
                    <span className="font-semibold text-ink">
                      Kebutuhan Instansi:{" "}
                    </span>
                    {active.target}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
                    <a
                      href="#kontak"
                      className="inline-flex min-h-11 items-center justify-center rounded-control bg-accent px-6 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      Minta Penawaran
                    </a>
                    <Link
                      href="/katalog"
                      className="inline-flex min-h-11 items-center justify-center rounded-control border border-rule bg-canvas px-6 text-sm font-medium text-ink transition-colors hover:bg-wash gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      <span>Lihat Semua di Katalog</span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Visual Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-control bg-wash border border-rule/50">
                {spotlights.map((s, i) => (
                  <motion.div
                    key={s.id}
                    aria-hidden={i === index ? undefined : true}
                    initial={false}
                    animate={{ opacity: i === index ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.4 }}
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

                {/* Prev / Next controls */}
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Unit sebelumnya"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-control bg-canvas/90 text-ink shadow-xs border border-rule/60 backdrop-blur-sm transition hover:bg-canvas cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Unit berikutnya"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-control bg-canvas/90 text-ink shadow-xs border border-rule/60 backdrop-blur-sm transition hover:bg-canvas cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <ChevronRight aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer: counter */}
            <div className="flex items-center justify-between pt-5 mt-6 border-t border-rule/60">
              <p className="text-xs text-muted tabular-nums">
                {index + 1} dari {total} unit sorotan
              </p>
              <Link
                href="/katalog"
                className="text-xs font-medium text-accent hover:text-accent-hover hover:underline"
              >
                Jelajahi seluruh etalase katalog &rarr;
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
