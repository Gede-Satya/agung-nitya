"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

export default function EkosistemPengadaanSection() {
  const slaItems = [
    {
      title: "Garansi Principal Resmi 1-5 Tahun",
      desc: "Perlindungan purnajual langsung suku cadang & servis resmi",
    },
    {
      title: "Dukungan Teknis SLA 4 Jam On-Site",
      desc: "Teknisi tersertifikasi siaga untuk server & infrastruktur kritis",
    },
    {
      title: "Pengiriman Terjadwal Se-Jabodetabek & Nasional",
      desc: "Armada logistik konsolidasi penanganan elektronik sensitif",
    },
    {
      title: "Sertifikasi TKDN & Kelengkapan Faktur Pajak",
      desc: "Kepatuhan regulasi belanja modal BUMN & institusi publik",
    },
    {
      title: "Uji Kelayakan Pre-Delivery Inspection (PDI)",
      desc: "Pengecekan firmware & burn-in test sebelum serah terima",
    },
  ];

  return (
    <section id="ekosistem" className="relative w-full py-16 sm:py-24 bg-white text-[#1d1d1f]">
      <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Narrative Copy */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-5 pt-2">
          <span className="text-[12px] font-semibold tracking-wider text-[#1d1d1f] uppercase">
            Ekosistem Pengadaan Resmi
          </span>

          <h2 className="font-heading text-2xl sm:text-4xl md:text-[42px] font-bold leading-[1.12] tracking-tight text-[#1d1d1f]">
            Transparan dari BoQ hingga Berita Acara.
          </h2>

          <div className="flex flex-col gap-4 text-[#707070] text-sm sm:text-[15px] leading-relaxed">
            <p>
              Sebagai rekanan pengadaan B2B terpercaya di Indonesia, PT Agung Wijaya Nitya memenuhi seluruh kriteria legalitas korporat dan administrasi tender pemerintah. Seluruh pengiriman unit disertai faktur pajak valid, dokumen COO (Certificate of Origin), dan kartu garansi resmi distributor tunggal.
            </p>
            <p>
              Terdaftar aktif di sistem e-katalog LKPP / INAPROC ({SITE_CONTENT.company.activeProductsCount} produk tayang), PaDi UMKM BUMN, serta siap melayani mekanisme Purchase Order korporat dengan termin pembayaran (TOP) terverifikasi.
            </p>
          </div>

          <div className="pt-2">
            <a
              href={SITE_CONTENT.company.inaprocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[14px] font-normal text-[#0066cc] hover:underline"
            >
              <span>Pelajari dokumen legalitas & kepatuhan</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Right Column: SLA Card */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-[28px] bg-[#f5f5f7] border border-[#e6e6e8]">
          <h3 className="font-heading text-base sm:text-lg font-semibold text-[#1d1d1f] mb-5">
            Standar Layanan & Jaminan Kontrak AWN
          </h3>

          <div className="flex flex-col gap-2.5">
            {slaItems.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 p-3.5 sm:p-4 rounded-[14px] bg-white border border-[#e6e6e8]"
              >
                <span className="font-heading text-[13px] sm:text-[14px] font-semibold text-[#1d1d1f] shrink-0">
                  {item.title}
                </span>
                <span className="text-[12px] text-[#707070] sm:text-right">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Footer of Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-5 mt-2 border-t border-[#e6e6e8] text-[11px] text-[#707070]">
            <span>Sertifikasi Manajemen Mutu ISO 9001:2015 terdaftar resmi.</span>
            <a
              href="#cta-pengadaan"
              className="font-semibold text-[#b64400] tracking-wider uppercase hover:underline"
            >
              VERIFIKASI SURAT
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
