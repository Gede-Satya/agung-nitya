"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const company = SITE_CONTENT.company;
  const footer = SITE_CONTENT.footer;

  return (
    <footer className="navy-surface relative w-full overflow-hidden border-t border-white/10 py-14 text-sm leading-relaxed text-white/70">
      <div
        aria-hidden="true"
        className="navy-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <div className="shell relative max-w-[1200px] mx-auto px-4">
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Column 1: Identity */}
          <div className="flex flex-col gap-3 lg:col-span-2 max-w-md">
            <div className="flex items-center gap-2.5">
              <div className="relative h-6 w-6 shrink-0 rounded-full overflow-hidden border border-white/20">
                <Image
                  src="/images/logo-awn-transparent.png"
                  alt="Logo PT Agung Wijaya Nitya"
                  fill
                  className="object-contain"
                  sizes="24px"
                />
              </div>
              <span className="font-semibold text-white text-sm tracking-tight">
                {company.name}
              </span>
            </div>
            <p className="leading-relaxed text-white/70">{footer.description}</p>
            <div className="pt-1 text-sm text-white/60">
              <span>
                {company.legalType} &bull; {company.location}
              </span>
            </div>
          </div>

          {/* Column 2: Navigasi */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-1">
              Navigasi Halaman
            </h4>
            <ul className="flex flex-col gap-1.5">
              {footer.columns[0].links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-8 items-center text-white/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Kredensial & Kontak Resmi */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-1">
              Kontak &amp; Kredensial
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <span className="block text-sm text-white/60">Email Resmi:</span>
                <a
                  href={`mailto:${company.email}`}
                  className="text-white font-medium hover:text-accent transition-colors"
                >
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={company.inaprocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-8 items-center gap-1.5 text-accent hover:text-accent-hover font-medium transition-colors"
                >
                  <span>Profil INAPROC LKPP</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <span className="text-white/60">
                  Status:{" "}
                  <strong className="text-white">
                    {company.inaprocStatus} ({company.inaprocProviderType})
                  </strong>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>
            &copy; {currentYear} {company.name}. Hak cipta dilindungi undang-undang.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/#lini-utama"
              className="inline-flex min-h-8 items-center hover:text-white transition-colors"
            >
              Lini Produk
            </Link>
            <Link
              href="/#pemeliharaan"
              className="inline-flex min-h-8 items-center hover:text-white transition-colors"
            >
              Pemeliharaan
            </Link>
            <Link
              href="/#kontak"
              className="inline-flex min-h-8 items-center hover:text-white transition-colors"
            >
              Kontak
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
