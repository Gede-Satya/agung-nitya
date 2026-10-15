"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#fbfbfd] border-t border-[#d2d2d7] py-14 text-[#6e6e73] text-[12px] leading-relaxed">
      <div className="shell max-w-[1140px] mx-auto px-4">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-[#e6e6e8]">
          {/* Column 1: Identity */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="relative h-6 w-6 shrink-0">
                <Image
                  src="/images/logo-awn-transparent.png"
                  alt="Logo PT Agung Wijaya Nitya"
                  fill
                  className="object-contain"
                  sizes="24px"
                />
              </div>
              <span className="font-semibold text-[#1d1d1f] text-[13px] tracking-tight">
                PT Agung Wijaya Nitya
              </span>
            </div>
            <p className="text-[#6e6e73]">
              Penyedia perangkat keras, komputasi bisnis, dan instrumen riset komersial berstandar industri nasional.
            </p>
            <div className="pt-1 text-[11px] text-[#86868b]">
              <span>{SITE_CONTENT.company.legalType} · {SITE_CONTENT.company.location}</span>
            </div>
          </div>

          {/* Column 2: Kantor Pusat & Operasional */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-[#1d1d1f] text-[12px] uppercase tracking-wider mb-1">
              Kantor Pusat & Workshop
            </h4>
            <p className="text-[#6e6e73]">
              Jl. Sunset Road / Raya Kuta, Kab. Badung, Bali 80361, Indonesia.
            </p>
            <p className="text-[#1d1d1f] font-medium pt-1">
              Telp / WA: {SITE_CONTENT.company.phonePlaceholder}
            </p>
            <p className="text-[#6e6e73]">
              Email: {SITE_CONTENT.company.email}
            </p>
          </div>

          {/* Column 3: Kredensial & Portal */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-[#1d1d1f] text-[12px] uppercase tracking-wider mb-1">
              Kredensial & Portal
            </h4>
            <ul className="flex flex-col gap-1.5">
              <li>
                <a
                  href={SITE_CONTENT.company.inaprocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0071e3] transition-colors inline-flex items-center gap-1"
                >
                  <span>INAPROC Katalog ({SITE_CONTENT.company.activeProductsCount} Produk)</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </li>
              <li>
                <a href="#ekosistem" className="hover:text-[#0071e3] transition-colors">
                  Kepatuhan TKDN & BMP
                </a>
              </li>
              <li>
                <a href="#ekosistem" className="hover:text-[#0071e3] transition-colors">
                  Tata Rekanan B2B & B2G
                </a>
              </li>
              <li>
                <a href="#ekosistem" className="hover:text-[#0071e3] transition-colors">
                  Pusat Regulasi Instansi
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Jaminan Kualitas */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#1d1d1f] text-[12px] uppercase tracking-wider mb-1">
              Jaminan Kualitas
            </h4>
            <p className="text-[#6e6e73]">
              Terakreditasi ISO 9001:2015 untuk Sistem Manajemen Pengadaan & Distribusi peralatan komersial.
            </p>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded border border-[#d2d2d7] bg-white px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[#1d1d1f] uppercase shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                TERDAFTAR RESMI LPSE & KATALOG
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#86868b]">
          <p>
            &copy; {currentYear} PT Agung Wijaya Nitya (AWN). Hak Cipta Dilindungi Undang-Undang. Seluruh spesifikasi instrumen terverifikasi B2B/B2G.
          </p>

          <div className="flex items-center gap-5">
            <a href="#kebijakan" className="hover:text-[#1d1d1f] transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#syarat" className="hover:text-[#1d1d1f] transition-colors">
              Syarat Pengadaan
            </a>
            <a href="#sla" className="hover:text-[#1d1d1f] transition-colors">
              SLA Dukungan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
