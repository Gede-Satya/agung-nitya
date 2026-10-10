"use client";

import React from "react";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

export interface ModuleItem {
  id: string;
  indexStr: string;
  name: string;
  kicker: string;
  valueSentence: string;
  hotspotLabel: string;
  hotspotSpec: string;
  features: string[];
}

// 9 Modul SIMRS Enterprise Agung Nitya dengan citra klinis definisi tinggi
export const SIMRS_NINE_WHEEL_MODULES: WorksWheelItem[] = [
  {
    title: "Pendaftaran & Admisi",
    subtitle: "MODUL 01 · BRIDGING NIK & SATUSEHAT",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    href: "#spesifikasi",
  },
  {
    title: "Rawat Jalan & Poliklinik",
    subtitle: "MODUL 02 · SOAP & E-RESEP TERPADU",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
    href: "#spesifikasi",
  },
  {
    title: "Rawat Inap & Bangsal",
    subtitle: "MODUL 03 · BED MANAGEMENT REAL-TIME",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    href: "#spesifikasi",
  },
  {
    title: "Farmasi & Depo Obat",
    subtitle: "MODUL 04 · SMART DISPENSING & FIFO",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80",
    href: "#spesifikasi",
  },
  {
    title: "Laboratorium (LIS)",
    subtitle: "MODUL 05 · BRIDGING ANALYZER OTOMATIS",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    href: "#spesifikasi",
  },
  {
    title: "Radiologi & PACS",
    subtitle: "MODUL 06 · DICOM PACS VIEWER",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    href: "#spesifikasi",
  },
  {
    title: "Rekam Medis Elektronik",
    subtitle: "MODUL 07 · STANDAR KEMENKES PMK 24",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    href: "#spesifikasi",
  },
  {
    title: "Kasir & Billing BPJS",
    subtitle: "MODUL 08 · VCLAIM & INA-CBGS BRIDGING",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    href: "#spesifikasi",
  },
  {
    title: "Aset & Logistik Medis",
    subtitle: "MODUL 09 · KALIBRASI ALKES & INVENTARIS",
    image:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    href: "#spesifikasi",
  },
];

export default function ModuleExplorationSection() {
  return (
    <section
      id="modules"
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] bg-white text-ink flex flex-col justify-between overflow-hidden border-t border-[#d6d6d6]"
    >
      {/* Top Section Header */}
      <div className="shell relative z-20 pt-8 pb-2 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="type-apple-kicker font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.08em] text-[#86868b]">
            EKSPLORASI 9 MODUL SIMRS · ALUR PASIEN
          </span>
          <h2 className="text-[20px] sm:text-[24px] font-semibold text-ink tracking-tight">
            Arsitektur Layanan Terpadu Rumah Sakit
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#0071e3] bg-[#f5f5f7] border border-[#d6d6d6] px-3 py-1 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3] animate-pulse" />
          <span>Putar Drum 3D dengan Scroll / Drag</span>
        </div>
      </div>

      {/* 3D Works Wheel with Pure White Background */}
      <div className="relative flex-1 w-full overflow-hidden bg-white">
        <WorksWheel
          items={SIMRS_NINE_WHEEL_MODULES}
          label="9 Modul SIMRS"
          action="Lihat Spesifikasi"
          className="h-full bg-white"
        />
      </div>

      {/* Bottom Status Footnote */}
      <div className="shell relative z-20 pb-5 pt-2 flex items-center justify-between font-mono text-[11px] text-[#86868b] border-t border-[#d6d6d6]/70">
        <span>TERHUBUNG KE SATU BASIS DATA TERPADU</span>
        <span className="hidden sm:inline">GULIR KE ATAS / BAWAH UNTUK MELANJUTKAN</span>
        <span>AGUNG NITYA ENTERPRISE</span>
      </div>
    </section>
  );
}