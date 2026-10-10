"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  FlaskConical,
  Pill,
  UserCheck,
  CreditCard,
  ArrowRight,
  Database,
  Lock,
  type LucideIcon,
} from "lucide-react";

export interface SimrsModulePreview {
  id: string;
  name: string;
  badge: string;
  icon: LucideIcon;
  headline: string;
  description: string;
  features: string[];
}

const SIMRS_MODULES: SimrsModulePreview[] = [
  {
    id: "poli",
    name: "Poliklinik & RME",
    badge: "Rekam Medis Elektronik",
    icon: Stethoscope,
    headline: "Anamnesis Berbasis SOAP & E-Resep Terpadu",
    description:
      "Dokter spesialis mengakses seluruh riwayat kunjungan, alergi, dan hasil pemeriksaan laboratorium terdahulu dalam satu layar tanpa perlu memanggil kurir berkas.",
    features: [
      "Input SOAP terstandarisasi dengan kode ICD-10 & ICD-9-CM otomatis",
      "E-Resep langsung terkirim ke depo farmasi saat konsultasi selesai",
      "Order penunjang lab dan radiologi satu klik tanpa formulir kertas",
    ],
  },
  {
    id: "penunjang",
    name: "Penunjang (Lab & Rad)",
    badge: "LIS & PACS Viewer",
    icon: FlaskConical,
    headline: "Integrasi Alat LIS & Viewer Radiologi DICOM",
    description:
      "Alat analisis laboratorium mentransfer nilai numerik langsung ke rekam medis pasien. Dokter dapat meninjau hasil rontgen dan CT scan langsung dari workstation poli.",
    features: [
      "Bridging alat hematologi, kimia darah, dan urine analyzer otomatis",
      "PACS DICOM viewer tersemat dengan alat zoom, windowing, dan anotasi",
      "Notifikasi nilai kritis (critical value) instan ke smartphone dokter jaga",
    ],
  },
  {
    id: "farmasi",
    name: "Farmasi & Depo",
    badge: "Smart Dispensing",
    icon: Pill,
    headline: "Telaah Resep Otomatis & Kontrol Stok Multi-Depo",
    description:
      "Sistem memvalidasi dosis, interaksi antar-obat, dan duplikasi terapi secara real-time. Stok obat terpotong otomatis dengan metode FIFO/FEFO yang akurat.",
    features: [
      "Peringatan interaksi obat dan alergi pasien sebelum proses racik",
      "Pencetakan etiket barcode otomatis dengan instruksi minum terstandar",
      "Monitoring minimum stock level dan peringatan kedaluwarsa otomatis",
    ],
  },
  {
    id: "pendaftaran",
    name: "Pendaftaran & Admisi",
    badge: "SATUSEHAT & NIK",
    icon: UserCheck,
    headline: "Validasi NIK Dukcapil & Display Antrean Online",
    description:
      "Pendaftaran pasien baru tervalidasi seketika dengan Nomor Induk Kependudukan (NIK) dan terhubung ke platform SATUSEHAT Kemenkes RI untuk penomoran IHS otomatis.",
    features: [
      "Bridging SATUSEHAT Kemenkes RI berbasis protokol HL7 FHIR",
      "Integrasi Antrean Online BPJS Mobile JKN dengan display ruang tunggu pintar",
      "Pencetakan gelang identitas pasien berstandar barcode GS1",
    ],
  },
  {
    id: "kasir",
    name: "Kasir & Klaim BPJS",
    badge: "VClaim & INA-CBGs",
    icon: CreditCard,
    headline: "Grouping INA-CBGs Otomatis & Penagihan Terpadu",
    description:
      "Seluruh tindakan medis, penggunaan kamar, obat, dan laboratorium terkonsolidasi ke dalam satu invoice. Koder BPJS dapat melakukan grouping klaim sebelum pasien pulang.",
    features: [
      "Bridging resmi BPJS Kesehatan VClaim 2.0 dan E-Klaim INA-CBGs",
      "Validasi kelengkapan berkas resume medis otomatis mencegah pending klaim",
      "Multi-metode pembayaran (Tunai, QRIS, Kartu Debit/Kredit, Asuransi Swasta)",
    ],
  },
];

const ARCHITECTURE_PILLARS = [
  {
    icon: Database,
    title: "PostgreSQL Relasional Terpusat",
    desc: "Single source of truth berkecepatan tinggi. Nol disparitas data antar-instalasi dengan jaminan transaksi ACID penuh.",
  },
  {
    icon: Cpu,
    title: "Event-Driven Real-Time Conduits",
    desc: "Aksi dokter di RME seketika memicu antrean farmasi, order lab, dan kalkulasi billing secara simultan tanpa input ulang.",
  },
  {
    icon: ShieldCheck,
    title: "Bridging Resmi HL7 FHIR & BPJS",
    desc: "Kepatuhan regulasi Kemenkes RI SATUSEHAT dan VClaim 2.0 built-in, memangkas risiko pending klaim hingga nol.",
  },
];

export interface SolutionSectionProps {
  visible?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SolutionSection(props: SolutionSectionProps = {}) {
  return (
    <section
      id="solution"
      className="relative h-svh min-h-[560px] w-full flex flex-col justify-center pt-16 pb-16 overflow-hidden pointer-events-none"
    >
      <div className="shell relative z-10 w-full">
        <div className="flex flex-col gap-4 sm:gap-5 w-full max-w-[34rem] lg:max-w-[38rem] p-6 lg:p-7 [@media(max-height:800px)]:p-5 rounded-[28px] bg-white border border-[#d6d6d6] shadow-[0_16px_40px_rgba(0,0,0,0.06)] pointer-events-auto">
          {/* Eyebrow with active Pricing Blue beacon */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-[#0071e3] opacity-75" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
            </span>
            <p className="type-apple-kicker text-[#0071e3] font-semibold uppercase text-[12px] sm:text-[14px]">
              03 REKONEKSI — THE UNIFIED HOSPITAL ARCHITECTURE
            </p>
          </div>

          {/* VISUAL CLIMAX: Apple Display Statement (SF Pro Display, leading 1.05, tracking -1.2px) */}
          <div className="flex flex-col gap-1 text-ink">
            <h2 className="text-[30px] sm:text-[42px] lg:text-[48px] font-semibold tracking-[-1.2px] text-ink leading-[1.05]">
              Satu Basis Data.
            </h2>
            <span className="text-[30px] sm:text-[42px] lg:text-[48px] font-semibold tracking-[-1.2px] text-[#0071e3] leading-[1.05]">
              Semua Unit. Satu Bahasa.
            </span>
          </div>

          {/* Editorial Subtitle (SF Pro Text 17px/400, leading 1.47, tracking -0.374px) */}
          <p className="type-apple-body text-muted leading-relaxed text-[13px] sm:text-[15px] lg:text-[16px] max-w-[46ch]">
            Seluruh instalasi rumah sakit — Poliklinik, Penunjang, Farmasi, Pendaftaran, dan
            Kasir — kembali bersatu di atas satu arsitektur relasional real-time. Sekali data
            dimasukkan, seluruh unit bekerja dalam harmoni sempurna tanpa friksi.
          </p>

          {/* Apple Floating Telemetry Capsule: 20px Radius, Solid Studio Mist */}
          <div className="rounded-[20px] border border-[#d6d6d6] bg-[#f5f5f7] p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] tracking-[-0.12px] pointer-events-auto">
            <div className="flex items-center gap-2 text-[#0066cc] font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>SINKRONISASI RELASIONAL AKTIF (0ms LATENCY)</span>
            </div>
            <div className="flex items-center gap-2 text-muted text-[11px] font-mono">
              <Lock className="h-3 w-3 text-[#0066cc]" />
              <span>HL7 FHIR & SATUSEHAT READY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Pillars + interactive module explorer: scrolls normally after the sticky track */
export function SolutionExplorer() {
  const prefersReduced = useReducedMotion();
  const [selectedModuleId, setSelectedModuleId] = useState<string>("poli");
  const activeModuleData =
    SIMRS_MODULES.find((m) => m.id === selectedModuleId) || SIMRS_MODULES[0];
  const ActiveIcon = activeModuleData.icon;

  return (
    <section
      id="spesifikasi"
      className="relative w-full py-[100px] sm:py-[120px] bg-[#f5f5f7] border-t border-[#d6d6d6]"
    >
      <div className="shell relative z-10 w-full flex flex-col items-center">
        {/* Section Kicker, Apple Centered Feature Heading & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20, filter: prefersReduced ? "none" : "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col items-center text-center max-w-[760px] mx-auto gap-3"
        >
          <span className="type-apple-kicker text-ink uppercase text-[12px] sm:text-[13px] tracking-[0.08em] font-semibold">
            SPESIFIKASI ARSITEKTUR & KEANDALAN
          </span>
          <h2 className="text-[34px] sm:text-[46px] lg:text-[52px] font-semibold text-ink tracking-[-0.03em] leading-[1.08] [text-wrap:balance]">
            Tiga pilar keandalan tanpa kompromi.
          </h2>
          <p className="text-[16px] sm:text-[18px] text-slate leading-[1.45] tracking-[-0.2px] max-w-[620px] [text-wrap:balance]">
            Dibangun di atas fondasi relasional tunggal untuk menjamin integritas data medis,
            transaksi nol-latensi, dan kepatuhan penuh regulasi nasional.
          </p>
        </motion.div>

        {/* Three Architectural Pillars: Apple 3-Column Centered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 w-full max-w-[1040px] mx-auto mt-12">
          {ARCHITECTURE_PILLARS.map((pillar, idx) => {
            const PillarIcon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 20, filter: prefersReduced ? "none" : "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
                className="rounded-[24px] border border-[#d6d6d6] bg-white p-7 sm:p-8 flex flex-col justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
              >
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-[12px] border border-[#d6d6d6] bg-[#f5f5f7] flex items-center justify-center text-[#0071e3]">
                      <PillarIcon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#86868b] bg-[#f5f5f7] px-2.5 py-0.5 rounded-full border border-[#d6d6d6]/60">
                      PILAR 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-semibold text-ink leading-snug tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] tracking-[-0.12px] text-slate leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Product UI / Interactive SIMRS Unit Explorer */}
        <div className="flex flex-col items-center gap-6 w-full max-w-[1040px] mx-auto mt-16 pt-8 border-t border-[#d6d6d6]/60">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <span className="text-[#0066cc] font-mono text-[11px] font-semibold uppercase tracking-[0.08em] flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span>EKSPLORASI ANTARMUKA SIMRS AGUNG NITYA</span>
            </span>
            <p className="text-[14px] text-slate">Pilih unit instalasi untuk meninjau alur kerja terpadu:</p>
          </div>

          {/* Apple 9999px Capsule Module Picker Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-full border border-[#d6d6d6] bg-white scrollbar-none max-w-full shadow-sm">
            {SIMRS_MODULES.map((mod) => {
              const isSelected = mod.id === selectedModuleId;
              return (
                <motion.button
                  key={mod.id}
                  type="button"
                  whileHover={{ scale: prefersReduced ? 1 : 1.02 }}
                  whileTap={{ scale: prefersReduced ? 1 : 0.98 }}
                  onClick={() => setSelectedModuleId(mod.id)}
                  className={`relative whitespace-nowrap py-1.5 px-4 rounded-full text-[12px] sm:text-[13px] tracking-[-0.12px] font-normal transition-colors cursor-pointer ${
                    isSelected
                      ? "text-white font-medium"
                      : "text-slate hover:text-ink"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-solution-pill"
                      className="absolute inset-0 rounded-full bg-[#0071e3]"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{mod.name}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Apple 28px Radius Feature Media Card in Balanced 12-Column Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModuleData.id}
              initial={{
                opacity: 0,
                y: prefersReduced ? 0 : 16,
                filter: prefersReduced ? "none" : "blur(6px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: prefersReduced ? 0 : -16,
                filter: prefersReduced ? "none" : "blur(6px)",
              }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] as const }}
              className="w-full rounded-[28px] border border-[#d6d6d6] bg-white p-8 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left 7 Columns: Clinical Details & Action */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                <div className="flex items-center gap-3.5">
                  <div className="rounded-[12px] border border-[#0066cc]/30 bg-[#0066cc]/10 p-2.5 text-[#0066cc]">
                    <ActiveIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#86868b]">
                      {activeModuleData.name} · SINGLE DATA CORE
                    </span>
                    <h3 className="text-[20px] sm:text-[24px] font-semibold text-ink leading-tight">
                      {activeModuleData.headline}
                    </h3>
                  </div>
                </div>

                <p className="text-[14px] sm:text-[15px] text-slate leading-relaxed">
                  {activeModuleData.description}
                </p>

                <div className="flex flex-col gap-2.5 pt-1">
                  {activeModuleData.features.map((feat) => (
                    <div
                      key={feat}
                      className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-ink/90"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#0066cc] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#e6e6e8]">
                  <motion.a
                    href="#demo"
                    whileHover={{ scale: prefersReduced ? 1 : 1.03 }}
                    whileTap={{ scale: prefersReduced ? 1 : 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-5 py-2 text-[12px] tracking-[-0.12px] font-normal text-white hover:bg-[#0077ed] transition-colors"
                  >
                    <span>Uji Demo Modul Ini</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </motion.a>
                  <span className="text-[11px] font-mono text-slate">
                    SIAP DITERAPKAN DI RUMAH SAKIT TIPE A, B, C & D
                  </span>
                </div>
              </div>

              {/* Right 5 Columns: Apple Studio Mist Clinical Telemetry Panel */}
              <div className="lg:col-span-5 rounded-[22px] border border-[#d6d6d6] bg-[#f5f5f7] p-6 sm:p-7 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#d6d6d6]/70">
                  <span className="font-mono text-[11px] font-semibold text-ink uppercase tracking-wider">
                    TELEMETRI & REGULASI
                  </span>
                  <span className="rounded-full bg-white border border-[#d6d6d6] px-2.5 py-0.5 text-[10px] font-mono font-medium text-[#0071e3]">
                    {activeModuleData.badge}
                  </span>
                </div>

                <div className="flex flex-col gap-3 font-mono text-[11px]">
                  <div className="flex justify-between items-center py-1.5 border-b border-[#d6d6d6]/40">
                    <span className="text-slate">KONSISTENSI DATA</span>
                    <span className="font-semibold text-ink">100% ACID TRANS</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-[#d6d6d6]/40">
                    <span className="text-slate">LATENSI BRIDGING</span>
                    <span className="font-semibold text-[#0071e3]">&lt; 15ms SATUSEHAT</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-[#d6d6d6]/40">
                    <span className="text-slate">ENKRIPSI BERKAS</span>
                    <span className="font-semibold text-ink">AES-256 GCM + TTE</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-[#d6d6d6]/40">
                    <span className="text-slate">STANDAR REGULASI</span>
                    <span className="font-semibold text-ink">PERMENKES PMK 24/2022</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate">BRIDGING BPJS</span>
                    <span className="font-semibold text-ink">VCLAIM 2.0 & INA-CBGs</span>
                  </div>
                </div>

                <div className="pt-3 flex items-center gap-2 text-[10px] font-mono text-[#86868b] border-t border-[#d6d6d6]/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
                  <span>SINKRONISASI RELASIONAL REAL-TIME AKTIF</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
