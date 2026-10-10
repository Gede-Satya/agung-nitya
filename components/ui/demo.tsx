"use client";

import React from "react";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

// 9 Modul SIMRS Enterprise Agung Nitya dengan citra klinis definisi tinggi
export const SIMRS_NINE_WHEEL_MODULES: WorksWheelItem[] = [
  {
    title: "Pendaftaran & Admisi",
    subtitle: "MODUL 01 · BRIDGING NIK & SATUSEHAT",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    href: "#modul-01",
  },
  {
    title: "Rawat Jalan & Poliklinik",
    subtitle: "MODUL 02 · SOAP & E-RESEP TERPADU",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
    href: "#modul-02",
  },
  {
    title: "Rawat Inap & Bangsal",
    subtitle: "MODUL 03 · BED MANAGEMENT REAL-TIME",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    href: "#modul-03",
  },
  {
    title: "Farmasi & Depo Obat",
    subtitle: "MODUL 04 · SMART DISPENSING & FIFO",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80",
    href: "#modul-04",
  },
  {
    title: "Laboratorium (LIS)",
    subtitle: "MODUL 05 · BRIDGING ANALYZER OTOMATIS",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    href: "#modul-05",
  },
  {
    title: "Radiologi & PACS",
    subtitle: "MODUL 06 · DICOM PACS VIEWER",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    href: "#modul-06",
  },
  {
    title: "Rekam Medis Elektronik",
    subtitle: "MODUL 07 · STANDAR KEMENKES PMK 24",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    href: "#modul-07",
  },
  {
    title: "Kasir & Billing BPJS",
    subtitle: "MODUL 08 · VCLAIM & INA-CBGS BRIDGING",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    href: "#modul-08",
  },
  {
    title: "Aset & Logistik Medis",
    subtitle: "MODUL 09 · KALIBRASI ALKES & INVENTARIS",
    image:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    href: "#modul-09",
  },
];

export function WorksWheelDemo() {
  return (
    <div className="relative w-full h-screen bg-white text-ink flex flex-col justify-between overflow-hidden">
      {/* Top Header bar */}
      <header className="relative z-20 flex items-center justify-between px-8 py-5 border-b border-[#d6d6d6] bg-white/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-[6px] border border-[#d6d6d6] bg-[#f5f5f7] text-[11px] font-semibold text-ink">
            AN
          </span>
          <span className="font-semibold text-[15px] tracking-tight text-ink">
            Agung Nitya · 9 Modul SIMRS
          </span>
        </div>
        <span className="text-[11px] font-mono tracking-wider text-[#86868b] uppercase hidden sm:inline">
          3D Wheel Carousel · Putar dengan Scroll Mouse / Drag
        </span>
      </header>

      {/* Main 3D Drum Wheel with Pure White Background */}
      <main className="relative flex-1 w-full overflow-hidden bg-white">
        <WorksWheel
          items={SIMRS_NINE_WHEEL_MODULES}
          label="9 Modul SIMRS"
          action="Eksplorasi Modul"
          className="h-full bg-white"
        />
      </main>

      {/* Bottom status bar */}
      <footer className="relative z-20 flex items-center justify-between px-8 py-3 border-t border-[#d6d6d6] bg-white/90 text-[11px] font-mono text-[#86868b]">
        <span>TERHUBUNG KE SATU BASIS DATA TERPADU</span>
        <span>AGUNG NITYA ENTERPRISE</span>
      </footer>
    </div>
  );
}

export default WorksWheelDemo;
