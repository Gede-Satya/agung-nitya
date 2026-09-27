"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useHydratedReducedMotion } from "@/app/lib/motion";
import { labels } from "@/app/lib/content";
import SpatialDecor from "./SpatialDecor";
import {
  Bot,
  Boxes,
  ChevronDown,
  Code2,
  Hospital,
  type LucideIcon,
} from "lucide-react";

type Variant = "build" | "core" | "ledger" | "flow";

type Service = {
  number: string;
  title: string;
  body: string;
  details: string[];
  icon: LucideIcon;
  state: string;
  variant: Variant;
  span: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Website Development",
    body: "Pengalaman digital premium yang membuat perusahaan serius mustahil diabaikan.",
    details: [
      "Peta halaman, hierarki pesan, dan arsitektur konten",
      "Desain antarmuka, sistem visual, dan prototipe interaksi",
      "Build, uji responsif dan aksesibilitas, lalu serah terima",
    ],
    icon: Code2,
    state: "Building",
    variant: "build",
    span: "md:col-span-7",
  },
  {
    number: "02",
    title: "SIMRS Development",
    body: "Sistem rumah sakit yang dirancang di sekitar satu rekam medis dan satu kebenaran operasional.",
    details: [
      "Pemetaan alur klinis dan administratif tiap unit",
      "Konfigurasi modul pendaftaran, rawat jalan, rawat inap, farmasi, laboratorium, dan billing",
      "Migrasi data, uji integrasi antar unit, dan pendampingan go-live",
    ],
    icon: Hospital,
    state: "Deploying",
    variant: "core",
    span: "md:col-span-5",
  },
  {
    number: "03",
    title: "ERP Solution",
    body: "Infrastruktur enterprise yang menghubungkan keuangan, operasi, orang, dan pertumbuhan.",
    details: [
      "Satu kerangka data untuk keuangan, stok, dan tenaga kerja",
      "Laporan operasional yang dapat ditelusuri sampai sumbernya",
      "Hak akses, alur persetujuan, dan jejak perubahan",
    ],
    icon: Boxes,
    state: "Connecting",
    variant: "ledger",
    span: "md:col-span-5",
  },
  {
    number: "04",
    title: "AI Automation",
    body: "Kecerdasan praktis yang menghapus pekerjaan repetitif dan memberi ruang bagi tim untuk berpikir.",
    details: [
      "Inventarisasi tugas repetitif yang aman diotomasi",
      "Alur kerja otomatis dengan tinjauan manusia di titik penting",
      "Monitoring hasil dan penyesuaian berkala",
    ],
    icon: Bot,
    state: "Automating",
    variant: "flow",
    span: "md:col-span-7",
  },
];

/* Motif per state — sengaja berbeda bentuk supaya empat kartu tidak seragam. */
function Motif({ variant }: { variant: Variant }) {
  if (variant === "build") {
    return (
      <div aria-hidden="true" className="flex w-full flex-col gap-2 md:w-44">
        {[88, 62, 44].map((w, i) => (
          <span
            key={w}
            className={`block h-1.5 origin-left ${i === 1 ? "bg-trust-blue/70" : "bg-slate-border/70"}`}
            style={{ width: `${w}%` }}
          />
        ))}
        <span className="mt-1 block h-px w-full bg-slate-border/40" />
        <span className="whitespace-nowrap font-mono text-[9px] tracking-[0.3em] text-ash-text/60 uppercase">
          layer · schema · ship
        </span>
      </div>
    );
  }
  if (variant === "core") {
    return (
      <div aria-hidden="true" className="relative h-24 w-24 shrink-0">
        <span className="absolute inset-0 rounded-full border border-slate-border/50" />
        <span className="absolute inset-4 rounded-full border border-slate-border/35" />
        <span className="absolute inset-8 rounded-full border border-trust-blue/50" />
        <span className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-trust-blue" />
      </div>
    );
  }
  if (variant === "ledger") {
    return (
      <div aria-hidden="true" className="flex w-full flex-col gap-2.5">
        {[100, 76, 88, 58].map((w, i) => (
          <span key={w} className="flex items-center gap-2">
            <span
              className="block h-px bg-slate-border/60"
              style={{ width: `${w}%` }}
            />
            {i === 2 ? (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-trust-blue" />
            ) : null}
          </span>
        ))}
      </div>
    );
  }
  return (
    <div aria-hidden="true" className="flex w-full items-center gap-2">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-trust-blue" />
      <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,var(--color-structural-border)_0_6px,transparent_6px_12px)]" />
      <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-slate-border/60" />
      <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,var(--color-structural-border)_0_6px,transparent_6px_12px)]" />
      <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-slate-border/60" />
    </div>
  );
}

const shells: Record<Variant, string> = {
  build: "bg-graphite-card/60",
  core: "bg-graphite-card/65",
  ledger: "bg-obsidian-button/65",
  flow: "bg-graphite-card/60",
};

export default function ServicesSection() {
  const reduced = useHydratedReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  const revealInitial = reduced ? { opacity: 0 } : { opacity: 0, y: 26 };
  const revealVisible = reduced ? { opacity: 1 } : { opacity: 1, y: 0 };
  const revealTransition = reduced
    ? { duration: 0.12, ease: [0.2, 0, 0, 1] as [number, number, number, number] }
    : { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return (
    <section
      id="layanan"
      className="relative bg-onyx-canvas px-4 py-24 md:px-6 md:py-36"
      aria-label="Layanan — empat mode pengerjaan sistem"
    >
      <div className="tech-grid absolute inset-0 opacity-25" />
      <SpatialDecor variant="signal" />
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="text-[10px] tracking-[0.3em] text-ash-text uppercase">
                {labels.services}
              </span>
              <span className="h-px w-10 bg-trust-blue" />
            </div>
            <h2 className="font-display text-[clamp(2.6rem,7vw,5.6rem)] font-medium leading-[0.96] tracking-tight text-ivory-text">
              Empat mode
              <br />
              <span className="stroke-text">membangun sistem.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-ash-text">
            Dari pixel pertama hingga migrasi basis data terakhir — setiap
            layanan dikerjakan sebagai satu arsitektur, bukan tumpukan tugas
            terpisah.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-3 md:mt-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isBuild = service.variant === "build";
            const isFlow = service.variant === "flow";
            const isLedger = service.variant === "ledger";
            const open = openId === service.number;
            const panelId = `svc-detail-${service.number}`;
            const toggle = () => setOpenId(open ? null : service.number);

            return (
              <motion.article
                key={service.title}
                data-cursor="view"
                data-cursor-label={open ? "Tutup" : "Lihat"}
                initial={revealInitial}
                whileInView={revealVisible}
                whileHover={
                  reduced
                    ? undefined
                    : {
                        scale: 1.015,
                        y: -5,
                        transition: {
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1] as [
                            number,
                            number,
                            number,
                            number,
                          ],
                        },
                      }
                }
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  ...revealTransition,
                  delay: reduced ? 0 : index * 0.07,
                }}
                onMouseMove={(e) => {
                  if (reduced) return;
                  const card = e.currentTarget;
                  const r = card.getBoundingClientRect();
                  const px = ((e.clientX - r.left) / r.width - 0.5) * 30;
                  const py = ((e.clientY - r.top) / r.height - 0.5) * 30;
                  card.style.setProperty("--sheen-x", `${px}%`);
                  card.style.setProperty("--sheen-y", `${py}%`);
                }}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("button")) return;
                  toggle();
                }}
                className={`group relative col-span-12 flex min-h-[240px] flex-col justify-between overflow-hidden border border-slate-border/25 p-7 transition-colors duration-500 hover:border-trust-blue/50 md:min-h-[280px] md:p-9 ${service.span} ${shells[service.variant]}`}
              >
                <span aria-hidden className="card-sheen" />

                {/* 01 BUILD — konten kiri, motif material di kanan */}
                {isBuild ? (
                  <div className="relative flex flex-col gap-8 md:h-full md:flex-row md:items-end md:justify-between">
                    <div className="max-w-md">
                      <Header service={service} Icon={Icon} />
                      <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-ivory-text md:text-3xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-ash-text">
                        {service.body}
                      </p>
                    </div>
                    <Motif variant={service.variant} />
                  </div>
                ) : null}

                {/* 02 CORE — motif lingkaran di atas, judul di bawah */}
                {service.variant === "core" ? (
                  <div className="relative flex flex-col justify-between gap-8">
                    <div className="flex items-start justify-between">
                      <Header service={service} Icon={Icon} compact />
                      <Motif variant={service.variant} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-medium tracking-tight text-ivory-text md:text-3xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-ash-text">
                        {service.body}
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* 03 LEDGER — angka oversized di kiri, teks kanan */}
                {isLedger ? (
                  <div className="relative flex items-start gap-5">
                    <span
                      aria-hidden="true"
                      className="stroke-text font-display text-[clamp(3.4rem,7vw,5rem)] font-medium leading-[0.8]"
                    >
                      {service.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <Header service={service} Icon={Icon} compact />
                      <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-ivory-text md:text-3xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-ash-text">
                        {service.body}
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* 04 FLOW — jalur data di atas, konten di bawah */}
                {isFlow ? (
                  <div className="relative flex flex-col justify-between gap-8">
                    <Motif variant={service.variant} />
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                      <div className="max-w-md">
                        <Header service={service} Icon={Icon} compact />
                        <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-ivory-text md:text-3xl">
                          {service.title}
                        </h3>
                      </div>
                      <p className="max-w-sm text-[14px] leading-relaxed text-ash-text md:text-right">
                        {service.body}
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="relative mt-7 flex items-center justify-between gap-4 border-t border-slate-border/25 pt-4">
                  <button
                    type="button"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="flex items-center gap-2 text-[10px] tracking-[0.28em] text-ash-text uppercase transition-colors duration-300 hover:text-ivory-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-healthcare-blue"
                  >
                    {open ? "Tutup detail" : "Lihat detail"}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  <span className="font-mono text-[9px] tracking-[0.3em] text-ash-text/50 uppercase">
                    {open ? "scope terbuka" : "scope"}
                  </span>
                </div>

                <motion.div
                  id={panelId}
                  initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.38,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  }}
                  className="relative overflow-hidden"
                >
                  <ul className="mt-4 space-y-3 pb-1">
                    {service.details.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[13px] leading-relaxed text-ash-text"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-trust-blue/80"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-3 flex items-center gap-3 text-[10px] tracking-[0.3em] text-ash-text/70 uppercase">
          <span className="status-dot" />
          Satu tim · satu arsitektur · dari build hingga go-live
        </div>
      </div>
    </section>
  );
}

function Header({
  service,
  Icon,
  compact = false,
}: {
  service: Service;
  Icon: LucideIcon;
  compact?: boolean;
}) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <span className="flex items-center gap-3">
        <span className="font-display text-[11px] tracking-[0.3em] text-ash-text/60 uppercase">
          {service.number}
        </span>
        <span className="h-px w-6 bg-trust-blue/70" />
        <span className="font-mono text-[10px] tracking-[0.28em] text-trust-blue/80 uppercase">
          {service.state}
        </span>
      </span>
      <Icon
        className={`${
          compact ? "h-5 w-5" : "h-6 w-6"
        } text-ash-text transition-colors duration-500 group-hover:text-trust-blue`}
        strokeWidth={1.3}
      />
    </div>
  );
}
