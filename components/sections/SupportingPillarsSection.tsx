"use client";

import React from "react";
import { Package, Wrench, Server, Archive, FlaskConical, Stethoscope, RefreshCw, Cpu, HeadphonesIcon } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

export default function SupportingPillarsSection() {
  const pilar3 = SITE_CONTENT.pillars.find((p) => p.id === "equipment-supplies");
  const pilar4 = SITE_CONTENT.pillars.find((p) => p.id === "services-rental");

  return (
    <section id="pilar-pendukung" className="relative z-10 w-full py-20 sm:py-28 bg-gallery-white border-t border-hairline-silver">
      <div className="shell flex flex-col gap-12 sm:gap-16">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-semibold tracking-[-0.12px] text-slate uppercase">
              Pilar Pelengkap Pengadaan
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-[40px] font-semibold leading-tight tracking-tight text-ink">
            Peralatan, Perlengkapan &{" "}
            <span className="text-pricing-blue">Layanan Pendukung Instansi</span>
          </h2>

          <p className="text-slate text-[15px] sm:text-[17px] leading-[1.47] tracking-[-0.374px]">
            Selain solusi perangkat lunak dan komputasi TI utama, kami menyediakan perlengkapan fisik fasilitas
            dan opsi pemeliharaan berkesinambungan sesuai klasifikasi KBLI resmi.
          </p>
        </div>

        {/* 2 Static Cards Grid (Pilar 3 & Pilar 4) - DESIGN.md: 28px radius, shadowless, flat white on studio mist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pilar 3: Peralatan & Perlengkapan */}
          {pilar3 && (
            <div className="flex flex-col justify-between gap-6 p-7 sm:p-9 rounded-[28px] bg-studio-mist border border-hairline-silver transition-colors hover:border-pricing-blue/40">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gallery-white border border-hairline-silver text-pricing-blue">
                    <Package className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-gallery-white border border-hairline-silver text-slate">
                    {pilar3.badge}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-xl sm:text-2xl font-semibold text-ink">
                    {pilar3.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-pricing-blue font-medium">
                    {pilar3.subtitle}
                  </p>
                  <p className="text-slate text-sm sm:text-base leading-relaxed pt-1">
                    {pilar3.description}
                  </p>
                </div>

                {/* Sub-item feature list: flat #ffffff cards with 18px radius */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 p-3.5 rounded-[18px] bg-gallery-white border border-hairline-silver">
                    <Server className="h-4 w-4 text-pricing-blue shrink-0" />
                    <span className="text-xs font-medium text-ink">Rak Server & Jaringan</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3.5 rounded-[18px] bg-gallery-white border border-hairline-silver">
                    <Archive className="h-4 w-4 text-pricing-blue shrink-0" />
                    <span className="text-xs font-medium text-ink">Lemari Arsip & Dokumen</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3.5 rounded-[18px] bg-gallery-white border border-hairline-silver">
                    <FlaskConical className="h-4 w-4 text-pricing-blue shrink-0" />
                    <span className="text-xs font-medium text-ink">Peralatan Lab Umum</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3.5 rounded-[18px] bg-gallery-white border border-hairline-silver">
                    <Stethoscope className="h-4 w-4 text-pricing-blue shrink-0" />
                    <span className="text-xs font-medium text-ink">Perlengkapan Fasilitas Kesehatan</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate border-t border-hairline-silver pt-4">
                Sesuai Klasifikasi KBLI Perdagangan Besar Perlengkapan Laboratorium, Kedokteran & Kantor
              </div>
            </div>
          )}

          {/* Pilar 4: Servis & Sewa */}
          {pilar4 && (
            <div className="flex flex-col justify-between gap-6 p-7 sm:p-9 rounded-[28px] bg-studio-mist border border-hairline-silver transition-colors hover:border-pricing-blue/40">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gallery-white border border-hairline-silver text-pricing-blue">
                    <Wrench className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-gallery-white border border-hairline-silver text-slate">
                    {pilar4.badge}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-xl sm:text-2xl font-semibold text-ink">
                    {pilar4.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-pricing-blue font-medium">
                    {pilar4.subtitle}
                  </p>
                  <p className="text-slate text-sm sm:text-base leading-relaxed pt-1">
                    {pilar4.description}
                  </p>
                </div>

                {/* Sub-item feature list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 p-3.5 rounded-[18px] bg-gallery-white border border-hairline-silver">
                    <RefreshCw className="h-4 w-4 text-pricing-blue shrink-0" />
                    <span className="text-xs font-medium text-ink">Pemeliharaan & Reparasi TI</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3.5 rounded-[18px] bg-gallery-white border border-hairline-silver">
                    <Cpu className="h-4 w-4 text-pricing-blue shrink-0" />
                    <span className="text-xs font-medium text-ink">Penyewaan Perangkat Komputasi</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3.5 rounded-[18px] bg-gallery-white border border-hairline-silver">
                    <HeadphonesIcon className="h-4 w-4 text-pricing-blue shrink-0" />
                    <span className="text-xs font-medium text-ink">Konsultasi Kebutuhan TI</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3.5 rounded-[18px] bg-gallery-white border border-hairline-silver">
                    <Wrench className="h-4 w-4 text-pricing-blue shrink-0" />
                    <span className="text-xs font-medium text-ink">Dukungan Kontrak Servis Instansi</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate border-t border-hairline-silver pt-4">
                Sesuai Klasifikasi KBLI Jasa Reparasi & Aktivitas Penyewaan Peralatan
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
