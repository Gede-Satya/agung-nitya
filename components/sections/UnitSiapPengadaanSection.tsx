"use client";

import React from "react";
import { SITE_CONTENT } from "@/src/content/site";

export default function UnitSiapPengadaanSection() {
  const units = [
    {
      tag: "RACK SERVER",
      title: "AWN 2U Dual Xeon",
      specs: "Dual Intel Xeon Silver, 128GB ECC DDR5, Redundant 800W Titanium PSU, 8-Bay Hot-Swap SAS/SATA.",
      target: "Perusahaan BUMN, Telekomunikasi, Private Cloud",
    },
    {
      tag: "MOBILE WORKSTATION",
      title: "ProBook Enterprise 14",
      specs: 'Core i7 vPro / 32GB RAM / 1TB NVMe / Layar 14" IPS FHD 400 nits / Garansi 3 Tahun Onsite.',
      target: "Divisi Keuangan, Engineering CAD, Manajemen",
    },
    {
      tag: "POWER PROTECTION",
      title: "Smart Online UPS 3kVA",
      specs: "Online Double-Conversion, Pure Sine Wave, SNMP Network Card, Extended Battery Module support.",
      target: "Server Room, Ruang Medis, Lini Produksi Otomasi",
    },
    {
      tag: "DISPLAY KOMERSIAL",
      title: "Commercial 4K 55-inch",
      specs: "Panel IPS 4K UHD 400 nits, Operasional 16/7, Bezel Tipis 1.2mm, Anti-Glare Coating, HDMI CEC.",
      target: "Video Conference Hall, Digital Signage, Lobby",
    },
  ];

  return (
    <section id="unit-pengadaan" className="relative w-full py-16 sm:py-24 bg-[#f5f5f7] text-[#1d1d1f]">
      <div className="shell flex flex-col gap-10 sm:gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-heading text-2xl sm:text-4xl md:text-[42px] font-bold leading-tight tracking-tight text-[#1d1d1f]">
              Unit siap pengadaan.
            </h2>
            <p className="text-[#707070] text-sm sm:text-base leading-relaxed">
              Daftar konfigurasi perangkat keras favorit untuk pengadaan semester ini.
            </p>
          </div>

          <span className="text-[12px] sm:text-[13px] text-[#707070] font-normal">
            Semua unit bergaransi distributor resmi Indonesia
          </span>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {units.map((unit, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 rounded-[28px] bg-white border border-[#d6d6d6] transition-all hover:border-[#86868b] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            >
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold tracking-wider text-[#b64400] uppercase">
                  {unit.tag}
                </span>

                <h3 className="font-heading text-lg font-semibold text-[#1d1d1f]">
                  {unit.title}
                </h3>

                <p className="text-[#707070] text-xs leading-relaxed min-h-[48px]">
                  {unit.specs}
                </p>

                {/* Target Audience Box */}
                <div className="p-3 rounded-[14px] bg-[#f5f5f7] border border-[#e6e6e8] text-[11px] text-[#707070] leading-snug">
                  <span className="block font-semibold text-[#1d1d1f] mb-0.5">
                    Kebutuhan Pengadaan:
                  </span>
                  <span>{unit.target}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-6 mt-2 border-t border-[#f0f0f2]">
                <a
                  href={SITE_CONTENT.company.inaprocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex h-8 items-center justify-center rounded-full border border-[#d6d6d6] bg-transparent text-[11px] font-medium text-[#1d1d1f] hover:border-[#1d1d1f] transition-colors"
                >
                  Spesifikasi
                </a>
                <a
                  href="#cta-pengadaan"
                  className="flex-1 inline-flex h-8 items-center justify-center rounded-full bg-[#0071e3] text-[11px] font-medium text-white hover:opacity-90 transition-opacity"
                >
                  Minta Kuotasi
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
