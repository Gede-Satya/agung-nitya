"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";
import Reveal from "@/components/ui/Reveal";

export default function EkosistemPengadaanSection() {
  const slaItems = [
    {
      title: "Garansi resmi 1–5 tahun",
      desc: "Perlindungan purnajual suku cadang & servis resmi",
    },
    {
      title: "Dukungan teknis on-site",
      desc: "Teknisi siaga untuk server & infrastruktur kritis",
    },
    {
      title: "Pengiriman terjadwal nasional",
      desc: "Logistik konsolidasi untuk penanganan elektronik sensitif",
    },
    {
      title: "Kelengkapan faktur pajak",
      desc: "Administrasi rapi untuk pengadaan institusi",
    },
    {
      title: "Uji kelayakan pre-delivery (PDI)",
      desc: "Pengecekan firmware & burn-in test sebelum serah terima",
    },
  ];

  return (
    <section
      id="ekosistem"
      className="relative w-full py-16 sm:py-24 bg-canvas text-ink"
    >
      <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Narrative Copy */}
        <Reveal className="lg:col-span-5 flex flex-col justify-center gap-5 pt-2">
          <span className="text-[12px] font-semibold tracking-wider text-ink uppercase">
            Ekosistem Pengadaan Resmi
          </span>

          <h2 className="font-heading text-2xl sm:text-4xl md:text-[42px] font-bold leading-[1.12] tracking-tight text-ink">
            Transparan dari BoQ hingga Berita Acara.
          </h2>

          <div className="flex flex-col gap-4 text-muted text-sm sm:text-[15px] leading-relaxed max-w-[64ch]">
            <p>
              PT Agung Wijaya Nitya terdaftar di INAPROC Katalog Elektronik.
              Seluruh pengiriman unit disertai faktur pajak dan kartu garansi
              resmi.
            </p>
            <p>
              Melayani mekanisme purchase order korporat dan pengadaan instansi
              dengan dokumen penawaran yang dapat diverifikasi langsung di
              profil INAPROC kami.
            </p>
          </div>

          <div className="pt-2">
            <a
              href={SITE_CONTENT.company.inaprocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-[14px] font-normal text-accent-strong hover:underline"
            >
              <span>Cek profil INAPROC kami</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        {/* Right Column: SLA Card */}
        <Reveal
          delay={0.1}
          className="lg:col-span-7 p-6 sm:p-8 rounded-[28px] bg-wash"
        >
          <h3 className="font-heading text-base sm:text-lg font-semibold text-ink mb-5">
            Standar Layanan & Jaminan Kontrak AWN
          </h3>

          <ul className="flex flex-col gap-2.5">
            {slaItems.map((item, idx) => (
              <li
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 p-3.5 sm:p-4 rounded-[14px] bg-canvas"
              >
                <span className="font-heading text-[13px] sm:text-[14px] font-semibold text-ink shrink-0">
                  {item.title}
                </span>
                <span className="text-[12px] text-muted sm:text-right">
                  {item.desc}
                </span>
              </li>
            ))}
          </ul>

          {/* Footer of Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-5 mt-2 border-t border-rule text-[12px] text-muted">
            <span>
              Dokumen penawaran tersedia dalam format resmi untuk PPK & panitia.
            </span>
            <a
              href="#cta-pengadaan"
              className="inline-flex min-h-11 items-center font-semibold text-accent-strong tracking-wider uppercase hover:underline"
            >
              Minta penawaran
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
