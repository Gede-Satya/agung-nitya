"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-wash border-t border-rule py-14 text-muted text-[13px] leading-relaxed">
      <div className="shell max-w-[1140px] mx-auto px-4">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-rule/70">
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
              <span className="font-semibold text-ink text-[14px] tracking-tight">
                PT Agung Wijaya Nitya
              </span>
            </div>
            <p className="text-muted">
              Mitra pengadaan perangkat TI dan display enterprise untuk
              korporat dan instansi.
            </p>
            <div className="pt-1 text-[12px] text-muted">
              <span>{SITE_CONTENT.company.legalType} · {SITE_CONTENT.company.location}</span>
            </div>
          </div>

          {/* Column 2: Kantor & Kontak */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-ink text-[12px] uppercase tracking-wider mb-1">
              Kantor & Kontak
            </h4>
            <p className="text-muted">
              Kab. Badung, Bali, Indonesia.
            </p>
            <p className="text-muted">
              Email:{" "}
              <a
                href={`mailto:${SITE_CONTENT.company.email}`}
                className="text-ink font-medium hover:text-accent transition-colors"
              >
                {SITE_CONTENT.company.email}
              </a>
            </p>
            <p>
              <a
                href={SITE_CONTENT.company.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-medium text-accent-strong hover:underline underline-offset-4"
              >
                Hubungi via WhatsApp
              </a>
            </p>
          </div>

          {/* Column 3: Kredensial & Portal */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-ink text-[12px] uppercase tracking-wider mb-1">
              Kredensial & Portal
            </h4>
            <ul className="flex flex-col gap-1.5">
              <li>
                <a
                  href={SITE_CONTENT.company.inaprocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 hover:text-accent transition-colors"
                >
                  <span>INAPROC Katalog Elektronik</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </li>
              <li>
                <a href="/katalog" className="inline-flex min-h-11 items-center hover:text-accent transition-colors font-medium text-ink">
                  Katalog Produk & Solusi
                </a>
              </li>
              <li>
                <a href="/#lini-utama" className="inline-flex min-h-11 items-center hover:text-accent transition-colors">
                  Lini pengadaan utama
                </a>
              </li>
              <li>
                <a href="#unit-pengadaan" className="inline-flex min-h-11 items-center hover:text-accent transition-colors">
                  Unit siap pengadaan
                </a>
              </li>
              <li>
                <a href="#ekosistem" className="inline-flex min-h-11 items-center hover:text-accent transition-colors">
                  Alur pengadaan
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Tentang */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-ink text-[12px] uppercase tracking-wider mb-1">
              Tentang Kami
            </h4>
            <p className="text-muted">
              Berbasis di Kab. Badung, Bali — melayani pengadaan korporat dan
              instansi dengan dokumen penawaran yang rapi dan terverifikasi.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-muted">
          <p>
            &copy; {currentYear} PT Agung Wijaya Nitya (AWN). Hak cipta dilindungi undang-undang.
          </p>

          <div className="flex items-center gap-5">
            <a href="#lini-utama" className="inline-flex min-h-11 items-center hover:text-ink transition-colors">
              Lini Pengadaan
            </a>
            <a href="#ekosistem" className="inline-flex min-h-11 items-center hover:text-ink transition-colors">
              Ekosistem
            </a>
            <a href="#cta-pengadaan" className="inline-flex min-h-11 items-center hover:text-ink transition-colors">
              Kontak
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
