"use client";

import { motion } from "framer-motion";
import { SITE_CONTENT } from "@/src/content/site";

/**
 * Illustrative "Katalog pengadaan" interface preview (DESIGN.md §4 hero).
 * Interface chrome only — no fabricated prices, stock, or claims. All labels
 * come from verified content in `src/content/site.ts`.
 */
const BARS = [42, 66, 88, 74, 100, 84];

export default function ProcurementMock() {
  const mock = SITE_CONTENT.hero.mock;

  return (
    <div className="relative w-full max-w-[620px]">
      {/* Depth plate */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-4 -bottom-4 top-6 -z-10 rounded-[28px] bg-wash-2/70 blur-xl"
      />

      <div className="overflow-hidden rounded-card border border-rule bg-surface shadow-[0_24px_60px_-30px_rgba(14,22,33,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-rule/80 bg-wash/70 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rule-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule-strong" />
          <span className="ml-3 inline-flex items-center gap-1.5 rounded-pill border border-rule bg-canvas px-2.5 py-0.5 type-eyebrow text-[10px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {mock.badge}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-5 p-5 sm:p-6">
          {/* Title + tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-control bg-accent-soft text-accent-ink">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path
                    d="M4 7h16M4 12h16M4 17h10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="font-heading text-sm font-semibold text-ink">
                {mock.title}
              </span>
            </div>

            <div className="flex items-center gap-1 rounded-control border border-rule bg-wash p-0.5">
              {mock.tabs.map((tab, i) => (
                <span
                  key={tab}
                  className={`rounded-[9px] px-3 py-1 text-xs font-medium ${
                    i === 0
                      ? "bg-canvas text-ink shadow-2xs"
                      : "text-muted"
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {mock.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-control border border-rule/70 bg-wash/60 px-3 py-2.5"
              >
                <div className="text-[11px] font-medium text-muted">
                  {metric.label}
                </div>
                <div className="font-heading text-lg font-semibold tracking-tight text-ink">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="rounded-control border border-rule/70 bg-wash/40 p-4">
            <div className="mb-3 flex items-center justify-between text-[11px] font-medium text-muted">
              <span>Cakupan kategori etalase</span>
              <span className="text-accent-ink">INAPROC</span>
            </div>
            <div className="flex h-16 items-end gap-2">
              {BARS.map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex-1 rounded-t-[4px]"
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--color-accent) ${
                      30 + i * 12
                    }%, transparent)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Rows */}
          <div className="flex flex-col divide-y divide-rule/70 overflow-hidden rounded-control border border-rule/70">
            {mock.rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-3 bg-canvas px-3.5 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="h-6 w-6 shrink-0 rounded-[6px] bg-accent-soft" />
                  <div className="min-w-0">
                    <div className="truncate text-xs font-semibold text-ink">
                      {row.label}
                    </div>
                    <div className="truncate text-[11px] text-muted">
                      {row.detail}
                    </div>
                  </div>
                </div>
                <span className="shrink-0 rounded-pill border border-rule bg-wash px-2 py-0.5 text-[10px] font-medium text-muted">
                  {row.tag}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] leading-relaxed text-muted">
            {mock.footnote}
          </p>
        </div>
      </div>
    </div>
  );
}
