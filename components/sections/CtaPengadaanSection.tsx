"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

export default function CtaPengadaanSection() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section id="cta-pengadaan" className="w-full bg-white py-20 sm:py-24 border-t border-[#e6e6e8]">
      <div className="shell max-w-[820px] mx-auto text-center px-4">
        {/* Eyebrow */}
        <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider text-[#d9531e] mb-3">
          Layanan Konsultasi 24 Jam Kerja
        </p>

        {/* Headline */}
        <h2 className="text-[28px] sm:text-[38px] md:text-[44px] font-bold text-[#1d1d1f] tracking-[-0.025em] leading-[1.15] mb-4">
          Siap memenuhi kebutuhan pengadaan Anda.
        </h2>

        {/* Subtitle */}
        <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#6e6e73] leading-relaxed max-w-[620px] mx-auto mb-9">
          Unggah daftar kebutuhan atau hubungi konsultan pengadaan B2B kami untuk penawaran harga khusus korporat dan fasilitas pemerintah.
        </p>

        {/* Search / RFQ Input Pill */}
        <form onSubmit={handleSubmit} className="relative max-w-[580px] mx-auto mb-8">
          <div className="relative flex items-center rounded-full border border-[#d2d2d7] bg-white p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus-within:border-[#0071e3] focus-within:ring-2 focus-within:ring-[#0071e3]/20 transition-all">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Masukkan email korporat, atau nomor RFQ..."
              className="flex-1 bg-transparent px-5 py-2.5 text-[14px] text-[#1d1d1f] placeholder-[#86868b] outline-none"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[#0071e3] px-6 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#0077ed] active:scale-[0.98] shrink-0"
            >
              <span>Ajukan BoQ</span>
            </button>
          </div>

          {submitted && (
            <div className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-1.5 text-[13px] font-medium text-emerald-600 animate-in fade-in slide-in-from-top-1">
              <CheckCircle2 className="h-4 w-4" />
              <span>Permintaan terkirim. Tim pengadaan AWN akan menghubungi dalam 1 jam kerja.</span>
            </div>
          )}
        </form>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-2 text-[13px] font-medium text-[#0071e3]">
          <a
            href={SITE_CONTENT.company.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 hover:underline underline-offset-4"
          >
            <span>Hubungi via WhatsApp</span>
            <span className="transition-transform group-hover:translate-x-0.5">›</span>
          </a>

          <a
            href={`mailto:${SITE_CONTENT.company.email}?subject=Permintaan%20Penawaran%20BoQ`}
            className="group inline-flex items-center gap-1 hover:underline underline-offset-4"
          >
            <span>Kirim detail BoQ</span>
            <span className="transition-transform group-hover:translate-x-0.5">›</span>
          </a>

          <a
            href="#inaproc"
            className="group inline-flex items-center gap-1 hover:underline underline-offset-4"
          >
            <span>Unduh Format Penawaran Resmi</span>
            <span className="transition-transform group-hover:translate-x-0.5">›</span>
          </a>
        </div>
      </div>
    </section>
  );
}
