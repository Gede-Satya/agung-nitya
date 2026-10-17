"use client";

import React from "react";
import { ExternalLink, ShieldCheck, CheckCircle2, FileText, Building2 } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

export default function VerificationSection() {
  return (
    <section id="verifikasi" className="relative z-10 w-full py-20 sm:py-28 bg-studio-mist border-t border-hairline-silver">
      <div className="shell flex flex-col gap-12 sm:gap-16">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-pricing-blue" />
            <span className="text-[12px] font-semibold tracking-[-0.12px] text-slate uppercase">
              Bukti Legalitas & Keaktifan
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-[40px] font-semibold leading-tight tracking-tight text-ink">
            Kepastian Faktual untuk{" "}
            <span className="text-pricing-blue">Pejabat Pengadaan & PPK</span>
          </h2>

          <p className="text-slate text-[15px] sm:text-[17px] leading-[1.47] tracking-[-0.374px]">
            Menghadirkan transparansi penuh bagi instansi pemerintah yang membutuhkan kepastian
            eksistensi badan usaha, keaktifan etalase, dan kepatuhan klasifikasi bidang usaha terdaftar.
          </p>
        </div>

        {/* Primary Verification Banner: Oversized #ffffff card, 28px radius, shadowless */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-9 rounded-[28px] bg-gallery-white border border-hairline-silver">
          <div className="lg:col-span-8 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  {SITE_CONTENT.company.inaprocStatus}
                </span>
                <span>•</span>
                <span>Tipe {SITE_CONTENT.company.inaprocProviderType}</span>
                <span>•</span>
                <span>{SITE_CONTENT.company.location}</span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-semibold text-ink">
                Profil Resmi Terdaftar di INAPROC Katalog Elektronik
              </h3>

              <p className="text-slate text-sm sm:text-base leading-relaxed max-w-2xl">
                PT Agung Wijaya Nitya adalah entitas Perseroan Terbatas yang beroperasi aktif
                dan memiliki produk resmi yang ditayangkan dalam etalase LKPP / INAPROC Katalog Elektronik
                untuk pemenuhan kebutuhan pengadaan barang dan jasa instansi.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={SITE_CONTENT.company.inaprocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-pricing-blue px-6 py-2.5 text-[14px] font-normal tracking-[-0.12px] text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
              >
                <span>Buka Etalase INAPROC</span>
                <ExternalLink className="h-4 w-4" />
              </a>

              <span className="text-xs text-slate">
                Teks resmi: INAPROC Katalog Elektronik
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end p-6 rounded-[22px] bg-studio-mist border border-hairline-silver">
            <span className="text-xs font-mono uppercase text-slate tracking-wider font-medium">
              TOTAL PRODUK TAYANG
            </span>
            <span className="font-heading text-4xl sm:text-5xl font-bold text-pricing-blue my-2">
              {SITE_CONTENT.company.activeProductsCount}
            </span>
            <span className="text-xs text-slate text-left lg:text-right">
              Total produk tercatat per {SITE_CONTENT.company.activeProductsDate}
            </span>
            <span className="text-[11px] text-slate/80 italic mt-2">
              (Verifikasi ulang berkala di etalase resmi)
            </span>
          </div>
        </div>

        {/* KBLI Registered Fields */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-ink flex items-center gap-2">
              <Building2 className="h-5 w-5 text-pricing-blue" />
              Klasifikasi Baku Lapangan Usaha Indonesia (KBLI)
            </h3>
            <p className="text-xs sm:text-sm text-slate">
              Bidang usaha terdaftar yang mendasari izin operasional dan lingkup pengadaan resmi perusahaan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SITE_CONTENT.kbliCategories.map((item, idx) => (
              <div
                key={`kbli-${idx}`}
                className="flex flex-col gap-2 p-5 rounded-[24px] bg-gallery-white border border-hairline-silver transition-colors hover:border-pricing-blue/40"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-heading text-sm font-semibold text-ink">
                    {item.name}
                  </span>
                </div>
                <p className="text-xs text-slate leading-relaxed pl-6">
                  {item.scope}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer Note (DESIGN.md §1.2 & §2) */}
        <div className="p-4 rounded-[20px] bg-gallery-white border border-hairline-silver flex items-start gap-3 text-xs text-slate">
          <FileText className="h-4 w-4 text-pricing-blue shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-ink">Catatan Kepatuhan Pengadaan:</strong> Seluruh klaim ketersediaan produk dan layanan
            di situs ini merujuk langsung pada data yang telah diverifikasi di portal resmi INAPROC Katalog Elektronik.
            Kami tidak mencantumkan logo OEM pihak ketiga maupun klaim tender tanpa bukti dokumen sah.
          </p>
        </div>
      </div>
    </section>
  );
}
