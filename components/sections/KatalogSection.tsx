"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { formationProducts } from "@/lib/formation-products";

const Formation = dynamic(() => import("@/components/ui/formation"), {
  ssr: false,
  loading: () => (
    <div className="h-[560px] w-full flex items-center justify-center rounded-2xl bg-white border border-zinc-200 text-zinc-400 text-sm shadow-xs">
      Memuat galeri produk unggulan...
    </div>
  ),
});

export default function KatalogSection() {
  return (
    <section
      id="katalog"
      className="relative w-full py-16 sm:py-24 bg-[#F5F5F7] text-ink scroll-mt-28"
    >
      <div className="shell flex flex-col gap-8 sm:gap-10">
        {/* Section Header with Featured Title & "Lihat semua produk" Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-accent">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Produk Unggulan e-Katalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
              Kurasi produk pilihan.
            </h2>
            <p className="text-muted text-base sm:text-lg">
              Sebagian perangkat dan peralatan terverifikasi yang tersedia lewat etalase resmi INAPROC LKPP.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-xs sm:text-sm font-semibold hover:bg-accent-strong transition-all shadow-xs group"
            >
              <span>Lihat semua produk</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Formation Gallery Component showcasing Featured Items */}
        <div className="relative w-full">
          <Formation works={formationProducts} />
        </div>

        {/* Bottom Banner directing to /katalog */}
        <div className="w-full rounded-2xl bg-white border border-black/8 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-ink">
              Mencari daftar lengkap spesifikasi dan harga?
            </span>
            <p className="text-xs text-slate-500">
              Kunjungi halaman katalog khusus dengan filter kategori, pencarian interaktif, dan tautan langsung ke etalase INAPROC.
            </p>
          </div>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#F5F5F7] text-ink hover:bg-slate-200 transition-colors shrink-0"
          >
            <span>Buka Halaman Katalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
