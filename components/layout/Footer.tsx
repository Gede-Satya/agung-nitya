"use client";

import React from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full bg-graphite border-t border-border py-12 sm:py-16 text-muted">
      <div className="shell flex flex-col gap-10 sm:gap-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Col 1: Identity & Legal */}
          <div className="md:col-span-5 flex flex-col items-start gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-canvas font-heading text-xs font-semibold text-accent">
                AN
              </span>
              <span className="font-heading text-base font-semibold text-primary">
                {SITE_CONTENT.company.name}
              </span>
            </div>

            <p className="text-xs text-muted leading-relaxed max-w-sm">
              Mitra pengadaan resmi solusi sistem informasi, implementasi sistem terpadu,
              dan perangkat teknologi informasi untuk instansi pemerintah.
            </p>

            <div className="flex items-center gap-2 text-xs pt-1">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>{SITE_CONTENT.company.legalType} · {SITE_CONTENT.company.location}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Etalase & Verifikasi
            </span>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <a
                  href={SITE_CONTENT.company.inaprocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                >
                  <span>INAPROC Katalog Elektronik</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <span className="text-muted/80">
                  {SITE_CONTENT.company.activeProductsCount} Produk Tayang ({SITE_CONTENT.company.activeProductsDate})
                </span>
              </li>
              <li>
                <span className="text-muted/80">
                  Tipe Penyedia: {SITE_CONTENT.company.inaprocProviderType}
                </span>
              </li>
              <li>
                <span className="text-muted/60 text-[11px]">
                  (TODO: cek aturan brand logo resmi INAPROC)
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Kontak Resmi
            </span>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href={`mailto:${SITE_CONTENT.company.email}`}
                className="hover:text-accent transition-colors"
              >
                {SITE_CONTENT.company.email}
              </a>
              <span className="text-muted/80">
                {SITE_CONTENT.company.phonePlaceholder}
              </span>
              <span className="text-muted/80">
                Kab. Badung, Bali
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/60 text-[11px] text-muted">
          <p>
            &copy; {currentYear} {SITE_CONTENT.company.name}. Seluruh hak cipta dilindungi undang-undang.
          </p>
          <p className="text-muted/70">
            Disusun untuk transparansi pejabat pengadaan (PPK) & instansi pemerintah.
          </p>
        </div>
      </div>
    </footer>
  );
}
