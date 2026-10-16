"use client";

import React from "react";
import dynamic from "next/dynamic";
import { formationProducts } from "@/lib/formation-products";

const Formation = dynamic(() => import("@/components/ui/formation"), {
  ssr: false,
  loading: () => (
    <div className="h-[560px] w-full flex items-center justify-center rounded-2xl bg-white border border-zinc-200 text-zinc-400 text-sm shadow-xs">
      Memuat galeri produk e-katalog...
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
        {/* Section Header */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent">
            e-Katalog INAPROC
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
            Jelajahi katalog.
          </h2>
          <p className="text-muted text-base sm:text-lg">
            Sebagian produk yang tersedia lewat e-katalog INAPROC.
          </p>
        </div>

        {/* Formation Gallery Component with White Canvas Stage & Caption Bar */}
        <div className="relative w-full">
          <Formation works={formationProducts} />
        </div>
      </div>
    </section>
  );
}
