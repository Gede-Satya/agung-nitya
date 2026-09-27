"use client";

import { motion } from "framer-motion";
import { useHydratedReducedMotion } from "@/app/lib/motion";
import { labels } from "@/app/lib/content";

type Service = {
  number: string;
  title: string;
  body: string;
  details: string[];
  state: string;
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
    state: "Building",
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
    state: "Deploying",
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
    state: "Connecting",
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
    state: "Automating",
  },
];

export default function ServicesSection() {
  const reduced = useHydratedReducedMotion();

  const revealInitial = reduced ? { opacity: 0 } : { opacity: 0, y: 26 };
  const revealVisible = reduced ? { opacity: 1 } : { opacity: 1, y: 0 };
  const revealTransition = reduced
    ? { duration: 0.12, ease: [0.2, 0, 0, 1] as [number, number, number, number] }
    : { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return (
    <section
      id="layanan"
      className="section-pad relative px-6 md:px-10"
      aria-label="Layanan — empat mode pengerjaan sistem"
    >
      <div className="relative mx-auto max-w-[1200px]">
        <div className="scrim-block relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-7 flex items-center gap-3">
              <span className="t-eyebrow text-ash-text">{labels.services}</span>
              <span className="h-px w-10 bg-trust-blue" />
            </div>
            <h2 className="t-section max-w-[16ch] text-ivory-text">
              Empat mode membangun sistem.
            </h2>
          </div>
          <p className="t-lede max-w-[40ch] text-ash-text">
            Dari pixel pertama hingga migrasi basis data terakhir — setiap
            layanan dikerjakan sebagai satu arsitektur, bukan tumpukan tugas
            terpisah.
          </p>
        </div>

        <div className="scrim-block mt-14 border-t border-slate-border/30 md:mt-20">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={revealInitial}
              whileInView={revealVisible}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                ...revealTransition,
                delay: reduced ? 0 : index * 0.06,
              }}
              className="group grid grid-cols-1 gap-y-6 border-b border-slate-border/30 px-1 py-10 transition-colors duration-500 hover:bg-[rgba(255,255,255,0.025)] md:grid-cols-12 md:gap-x-8 md:py-14"
            >
              <div className="t-eyebrow text-ash-text/70 transition-colors duration-500 group-hover:text-trust-blue md:col-span-1">
                {service.number}
              </div>

              <div className="md:col-span-4">
                <h3 className="font-display text-[clamp(1.4rem,2.2vw,1.75rem)] font-medium leading-tight tracking-tight text-ivory-text">
                  {service.title}
                </h3>
              </div>

              <p className="t-body max-w-[42ch] text-ash-text md:col-span-3">
                {service.body}
              </p>

              <ul className="md:col-span-4">
                {service.details.map((item) => (
                  <li
                    key={item}
                    className="hairline-b py-3 text-[15px] leading-snug text-ivory-text/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <p className="t-lede mt-8 text-ash-text">
          Satu tim · satu arsitektur · dari build hingga go-live
        </p>
      </div>
    </section>
  );
}
