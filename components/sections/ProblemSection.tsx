"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  Stethoscope,
  FlaskConical,
  Pill,
  UserCheck,
  CreditCard,
  Unplug,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

export interface ProblemStepData {
  step: number;
  id: string;
  moduleName: string;
  moduleShort: string;
  icon: LucideIcon;
  disconnectedFlow: string;
  metric: string;
  metricNarrative: string;
  narrativeDesc: string;
  clinicalImpactLabel: string;
  clinicalImpactDesc: string;
  financialImpactLabel: string;
  financialImpactDesc: string;
}

export const PROBLEM_STEPS: ProblemStepData[] = [
  {
    step: 1,
    id: "engine",
    moduleName: "Poliklinik & Rawat Jalan",
    moduleShort: "01 POLIKLINIK",
    icon: Stethoscope,
    disconnectedFlow: "PENDAFTARAN ✕ REKAM MEDIS",
    metric: "+65 MENIT",
    metricNarrative: "waktu tunggu akibat dokter mencari berkas riwayat fisik manual",
    narrativeDesc:
      "Dokter spesialis memulai anamnesis tanpa riwayat kunjungan terdahulu. Riwayat alergi obat dan penyakit penyerta tertahan di map kertas poliklinik lain, memaksa dokter mengulang wawancara klinis dari awal.",
    clinicalImpactLabel: "45–90 MENIT",
    clinicalImpactDesc:
      "Keterlambatan penegakan diagnosa awal. Risiko medication error saat resep obat kontraindikasi tidak terpantau.",
    financialImpactLabel: "KAPASITAS POLI TERBUANG",
    financialImpactDesc:
      "Waktu konsultasi per pasien molor 2x lipat, memperpanjang antrean ruang tunggu dan menurunkan throughput harian.",
  },
  {
    step: 2,
    id: "admin",
    moduleName: "Penunjang Medis (Lab & Radiologi)",
    moduleShort: "02 PENUNJANG",
    icon: FlaskConical,
    disconnectedFlow: "LAB & RADIOLOGI ✕ POLIKLINIK",
    metric: "3–4x DUPLIKASI",
    metricNarrative: "pemeriksaan diagnostik diulang karena hasil tes tidak tersambung",
    narrativeDesc:
      "Hasil pemeriksaan LIS laboratorium dan citra PACS radiologi tersimpan di server terpisah. Dokter jaga IGD dan ruangan tidak dapat mengakses hasil secara langsung, menanti kurir fisik mengantar berkas cetak antar-gedung.",
    clinicalImpactLabel: "DIAGNOSA TERTUNDA",
    clinicalImpactDesc:
      "Penanganan pasien kritis di IGD tertahan hingga 1.5 jam menunggu printout hasil enzim jantung dan darah lengkap.",
    financialImpactLabel: "PEMBOROSAN REAGEN",
    financialImpactDesc:
      "Biaya pengujian berulang dan sediaan kontras membengkak. Pengajuan klaim pemeriksaan ganda ditolak verifikator BPJS.",
  },
  {
    step: 3,
    id: "storefront",
    moduleName: "Farmasi & Depo Obat",
    moduleShort: "03 FARMASI",
    icon: Pill,
    disconnectedFlow: "RESEP DOKTER ✕ FARMASI",
    metric: "4 JAM / SHIFT",
    metricNarrative: "terbuang hanya untuk mengetik ulang resep fisik ke sistem gudang",
    narrativeDesc:
      "Resep kertas dokter diserahkan ke loket depo rawat jalan. Asisten apoteker mengetik ulang nama obat, dosis, dan stok ke aplikasi kasir farmasi yang berdiri sendiri, memicu antrean pengambilan obat yang mengular berjam-jam.",
    clinicalImpactLabel: "RISIKO DOSIS SALAH",
    clinicalImpactDesc:
      "Potensi medication error tinggi akibat tulisan resep dokter yang ambigu atau sulit terbaca oleh asisten apoteker.",
    financialImpactLabel: "DISPARITAS STOK",
    financialImpactDesc:
      "Saldo kartu stok fisik tidak sinkron dengan sistem penjualan, memicu kebocoran persediaan hingga puluhan juta per bulan.",
  },
  {
    step: 4,
    id: "cabinet",
    moduleName: "Pendaftaran & Admisi",
    moduleShort: "04 PENDAFTARAN",
    icon: UserCheck,
    disconnectedFlow: "DATA PASIEN ✕ SEMUA UNIT",
    metric: "3x INPUT MANUAL",
    metricNarrative: "data demografis diketik ulang di loket, poli, dan ruang rawat inap",
    narrativeDesc:
      "Pasien harus menyebutkan NIK, nomor telepon, dan identitas keluarga berulang kali di setiap instalasi. Tanpa integrasi SATUSEHAT real-time, sistem tidak dapat memverifikasi Nomor Rekam Medis (IHS) secara otomatis.",
    clinicalImpactLabel: "DUPLIKASI IDENTITAS",
    clinicalImpactDesc:
      "Pasien yang sama terdaftar dengan 2 atau 3 nomor rekam medis ganda, mengacaukan kesinambungan riwayat klinis.",
    financialImpactLabel: "RISIKO SANKSI REGULASI",
    financialImpactDesc:
      "Kemenkes RI mensyaratkan bridging SATUSEHAT penuh. Kegagalan sinkronisasi mengancam akreditasi dan izin operasional.",
  },
  {
    step: 5,
    id: "cashdesk",
    moduleName: "Kasir, Billing & Klaim BPJS",
    moduleShort: "05 KASIR & BPJS",
    icon: CreditCard,
    disconnectedFlow: "TINDAKAN KLINIS ✕ BILLING & KLAIM",
    metric: "15–25% PENDING",
    metricNarrative: "klaim BPJS tertahan hingga 3 bulan menahan arus kas rumah sakit",
    narrativeDesc:
      "Koder klaim menghabiskan waktu berhari-hari menelusuri map rekam medis manual untuk mencocokkan diagnosis ICD-10 dengan tindakan dokter dan laporan operasi. Berkas yang tidak lengkap langsung dikembalikan verifikator BPJS.",
    clinicalImpactLabel: "BEBAN DOKTER MEMBENGKAK",
    clinicalImpactDesc:
      "Dokter spesialis dipanggil berkali-kali untuk merevisi resume medis manual di sela-sela jam praktik operasi.",
    financialImpactLabel: "PIUTANG MACET RATUSAN JUTA",
    financialImpactDesc:
      "Pending klaim ratusan juta rupiah tertahan cair selama berbulan-bulan, menekan likuiditas kas operasional rumah sakit.",
  },
];

interface ProblemSectionProps {
  visible?: boolean;
  activeStep?: number;
  problemProgress?: number;
  onStepChange?: (step: number) => void;
}

export default function ProblemSection({
  activeStep = 1,
  problemProgress = 0,
  onStepChange,
}: ProblemSectionProps) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const currentStepData =
    PROBLEM_STEPS.find((s) => s.step === activeStep) || PROBLEM_STEPS[0];
  const Icon = currentStepData.icon;

  return (
    <section
      ref={containerRef}
      id="problem"
      className="relative h-svh min-h-[560px] w-full flex flex-col justify-center pt-14 pb-14 overflow-hidden pointer-events-none"
    >
      <div className="shell relative z-10 w-full">
        <div className="flex flex-col gap-3 [@media(max-height:800px)]:gap-2 w-full max-w-[32rem] lg:max-w-[37rem] p-5 sm:p-6 [@media(max-height:800px)]:p-4.5 rounded-[28px] bg-white border border-[#d6d6d6] shadow-[0_16px_40px_rgba(0,0,0,0.06)] pointer-events-auto">
          {/* Eyebrow with Launch Orange beacon */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[#b64400] opacity-75" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#b64400]" />
              </span>
              <p className="type-apple-kicker text-[#b64400] font-semibold uppercase text-[12px] sm:text-[14px]">
                02 FRAGMENTASI — KETIKA SISTEM TERISOLASI
              </p>
            </div>
            <a
              href="#solution"
              className="text-[12px] tracking-[-0.12px] text-[#0066cc] hover:underline hidden sm:inline-flex items-center gap-1 pointer-events-auto"
            >
              <span>Langsung ke Arsitektur</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Apple Feature Heading (SF Pro Display 40px/600, leading 1.1, tracking 0px) */}
          <div className="flex flex-col gap-0.5 text-ink">
            <span className="text-muted text-[14px] sm:text-[16px] tracking-[-0.374px] font-normal [@media(max-height:760px)]:hidden">
              Ketika setiap instalasi berjalan sendiri,
            </span>
            <h2 className="type-apple-feature-heading text-ink text-[28px] sm:text-[36px] lg:text-[40px]">
              Rumah sakit Anda{" "}
              <span className="text-[#b64400]">membayar harganya.</span>
            </h2>
          </div>

          {/* Editorial Subtitle (SF Pro Text 17px/400, leading 1.24, tracking -0.374px) */}
          <p className="type-apple-feature-copy text-muted max-w-[48ch] text-[13px] sm:text-[15px] lg:text-[16px] [@media(max-height:860px)]:hidden">
            Aplikasi pendaftaran, laboratorium, dan farmasi dari vendor berbeda tertahan
            di silo masing-masing — alur pelayanan terputus dan ratusan juta rupiah klaim tertahan.
          </p>

          {/* Apple Minimalist Story Stepper Rail (Grouped 9999px capsule) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[11px] text-muted font-mono tracking-tight">
              <span className="flex items-center gap-1.5 text-[#b64400] font-medium">
                <Unplug className="h-3 w-3" />
                <span>STEP {String(activeStep).padStart(2, "0")} / 05 — {currentStepData.moduleName.toUpperCase()}</span>
              </span>
              <span>GULIR ATAU KLIK UNTUK EKSPLORASI</span>
            </div>

            <div className="flex items-center gap-1 p-1 rounded-full border border-[#d6d6d6]/80 bg-[#f5f5f7] pointer-events-auto">
              {PROBLEM_STEPS.map((stepItem) => {
                const isActive = stepItem.step === activeStep;
                const isPast = stepItem.step < activeStep;

                return (
                  <motion.button
                    key={stepItem.step}
                    type="button"
                    whileHover={{ scale: prefersReduced ? 1 : 1.03 }}
                    whileTap={{ scale: prefersReduced ? 1 : 0.97 }}
                    onClick={() => onStepChange?.(stepItem.step)}
                    className={`relative flex-1 py-1 px-2 rounded-full text-center transition-colors text-[11px] sm:text-[12px] tracking-[-0.12px] font-normal cursor-pointer ${
                      isActive
                        ? "text-white font-medium"
                        : isPast
                        ? "text-muted hover:text-ink"
                        : "text-muted/60 hover:text-muted"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-step-pill"
                        className="absolute inset-0 rounded-full bg-[#b64400]"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-1">
                      <span className="hidden sm:inline">{stepItem.moduleShort}</span>
                      <span className="sm:hidden">0{stepItem.step}</span>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Continuous Pin Scrub Progress Indicator (No gradient) */}
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-[#e6e6e8]">
              <div
                className="h-full bg-[#b64400] transition-all duration-150"
                style={{ width: `${Math.max(4, Math.min(100, Math.round(problemProgress * 100)))}%` }}
              />
            </div>
          </div>

          {/* Apple Feature Media Card: 22px Radius, Nested Clean Card with igloo.inc blur dissolve */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepData.step}
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
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
              className="rounded-[22px] border border-[#e6e6e8] bg-[#fbfbfd] p-4 sm:p-5 [@media(max-height:800px)]:p-3.5 flex flex-col gap-2.5 [@media(max-height:800px)]:gap-2"
            >
              {/* Disconnected Signal Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6e6e8] pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="rounded-[10px] border border-[#b64400]/30 bg-[#b64400]/10 p-1.5 text-[#b64400]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-ink leading-tight">
                      {currentStepData.moduleName}
                    </h3>
                    <p className="text-[11px] sm:text-[12px] tracking-[-0.12px] text-muted">
                      Modul ke-{currentStepData.step} dalam alur pelayanan rumah sakit
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#b64400]/30 bg-[#b64400]/10 px-2.5 py-0.5 text-[11px] font-mono font-medium text-[#b64400]">
                  <Unplug className="h-3 w-3" />
                  <span>{currentStepData.disconnectedFlow}</span>
                </div>
              </div>

              {/* Editorial Large Metric Callout */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3.5">
                <span className="text-[22px] sm:text-[28px] font-semibold tracking-[-0.5px] text-[#b64400] sm:whitespace-nowrap leading-none">
                  {currentStepData.metric}
                </span>
                <p className="text-[12px] sm:text-[13px] text-muted leading-snug font-normal tracking-[-0.224px]">
                  {currentStepData.metricNarrative}
                </p>
              </div>

              {/* Narrative Story Description (SF Pro Text 13px-14px) */}
              <p className="text-[12px] sm:text-[13px] leading-relaxed text-ink/90 border-t border-[#e6e6e8] pt-2 tracking-[-0.224px]">
                {currentStepData.narrativeDesc}
              </p>

              {/* Clinical & Financial Impact Row with 16px radius */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="rounded-[16px] border border-[#e6e6e8] bg-white p-2.5 sm:p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#b64400] font-medium">
                    <AlertTriangle className="h-3 w-3 shrink-0" />
                    <span>CLINICAL IMPACT: {currentStepData.clinicalImpactLabel}</span>
                  </div>
                  <p className="text-[11px] sm:text-[12px] text-muted leading-relaxed tracking-[-0.12px]">
                    {currentStepData.clinicalImpactDesc}
                  </p>
                </div>

                <div className="rounded-[16px] border border-[#e6e6e8] bg-white p-2.5 sm:p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#b64400] font-medium">
                    <AlertTriangle className="h-3 w-3 shrink-0" />
                    <span>FINANCIAL IMPACT: {currentStepData.financialImpactLabel}</span>
                  </div>
                  <p className="text-[11px] sm:text-[12px] text-muted leading-relaxed tracking-[-0.12px]">
                    {currentStepData.financialImpactDesc}
                  </p>
                </div>
              </div>

              {/* Next Step Teaser or Link to Reconnection (Apple Blue #0066cc) - only on taller displays */}
              <div className="flex items-center justify-between pt-2 border-t border-[#e6e6e8] text-[12px] tracking-[-0.12px] text-muted [@media(max-height:860px)]:hidden">
                <span className="font-mono text-[11px]">
                  {activeStep < 5
                    ? `Gulir ke bawah: Langkah 0${activeStep + 1} (${PROBLEM_STEPS[activeStep].moduleName})`
                    : "Langkah 05 selesai — Gulir ke bawah untuk Rekoneksi"}
                </span>

                {activeStep < 5 ? (
                  <motion.button
                    type="button"
                    whileHover={{ x: prefersReduced ? 0 : 2 }}
                    whileTap={{ scale: prefersReduced ? 1 : 0.98 }}
                    onClick={() => onStepChange?.(activeStep + 1)}
                    className="inline-flex items-center gap-1 text-[#0066cc] hover:underline font-normal transition-colors pointer-events-auto cursor-pointer"
                  >
                    <span>Lanjut ke 0{activeStep + 1}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    whileHover={{ x: prefersReduced ? 0 : 2 }}
                    whileTap={{ scale: prefersReduced ? 1 : 0.98 }}
                    onClick={() => onStepChange?.(6)}
                    className="inline-flex items-center gap-1 text-[#0066cc] hover:underline font-normal transition-colors pointer-events-auto cursor-pointer"
                  >
                    <span>Buka Rekoneksi 03</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
