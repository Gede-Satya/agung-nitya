"use client";

import React from "react";
import { HOSPITAL_MODULES } from "@/data/modules";

interface HeroSectionProps {
  activeModuleId: string | null;
  onSelectModule: (id: string | null) => void;
}

export default function HeroSection({
  activeModuleId,
  onSelectModule,
}: HeroSectionProps) {
  const activeModule = HOSPITAL_MODULES.find((m) => m.id === activeModuleId);

  return (
    <section className="relative min-h-svh w-full flex flex-col justify-between pt-28 pb-10 overflow-hidden">
      {/* Hero content container: full shell width, text column anchored to left on desktop */}
      <div className="shell relative z-10 my-auto w-full">
        <div className="flex flex-col gap-5 w-full max-w-[32rem] lg:max-w-[35rem]">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
            <p className="type-eyebrow text-muted">
              SIMRS — INTEGRATED HOSPITAL SYSTEM
            </p>
          </div>

          {/* Headline (One single <h1> per page) */}
          <h1 className="type-display text-ink">
            Rekam medis, farmasi, dan billing rumah sakit Anda, akhirnya bicara{" "}
            <span className="text-muted">satu bahasa.</span>
          </h1>

          {/* Subtitle */}
          <p className="type-body max-w-[44ch] text-muted">
            Agung Nitya membangun SIMRS yang menyatukan setiap unit ke dalam satu
            basis data — bukan sekadar menghubungkan aplikasi yang berbeda satu
            per satu.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#demo"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-blue px-7 text-sm font-medium text-canvas transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              Jadwalkan Demo
            </a>
            <a
              href="#modul"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-rule bg-graphite/60 px-6 text-sm font-medium text-ink transition-colors hover:border-muted/40 hover:bg-graphite"
            >
              Lihat Modul
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Module Indicator Bar at bottom (shows selected/hovered module) */}
      <div className="shell relative z-10 pt-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-t border-rule/60 pt-4 sm:pt-5 w-full min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="type-eyebrow text-muted">SISTEM AKTIF:</span>
            {activeModule ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-blue" />
                <span className="text-xs font-medium text-ink">
                  {activeModule.name}
                </span>
                <span className="text-[11px] text-muted">
                  ({activeModule.groupLabel})
                </span>
              </div>
            ) : (
              <>
                <span className="text-xs text-muted hidden sm:inline">
                  9 Modul Terkoneksi ke Data Core Pusat
                </span>
                <span className="text-xs text-muted sm:hidden">
                  9 Modul Terkoneksi
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none w-full min-w-0">
            {HOSPITAL_MODULES.map((mod) => (
              <button
                key={mod.id}
                type="button"
                onClick={() =>
                  onSelectModule(activeModuleId === mod.id ? null : mod.id)
                }
                className={`min-h-8 rounded-full px-3 text-xs transition-colors whitespace-nowrap ${
                  activeModuleId === mod.id
                    ? "border border-blue bg-blue/15 text-ink font-medium"
                    : "border border-rule/40 bg-graphite/40 text-muted hover:text-ink hover:border-rule"
                }`}
              >
                {mod.nameEn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
