"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { formationProducts } from "@/lib/formation-products";

export default function KatalogSection() {
  const featured = formationProducts.slice(0, 4);

  return (
    <section
      id="katalog"
      className="relative w-full py-16 sm:py-24 bg-wash text-ink scroll-mt-20"
    >
      <div className="shell flex flex-col gap-8 sm:gap-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold tracking-wider uppercase text-accent">
              Katalog Elektronik
            </span>
            <h2 className="font-heading type-h2 text-ink">
              Kurasi produk pilihan.
            </h2>
            <p className="type-body text-muted">
              Sebagian perangkat dan perlengkapan yang tersedia lewat etalase resmi INAPROC LKPP.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/katalog"
              className="inline-flex min-h-11 items-center gap-2 px-5 py-2.5 rounded-control bg-accent text-on-accent text-sm font-semibold hover:bg-accent-hover transition-all shadow-xs group"
            >
              <span>Lihat semua produk</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* 4 Featured Products Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-card bg-canvas border border-rule/70 p-5 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="flex flex-col gap-3">
                <div className="relative aspect-square w-full rounded-control bg-wash overflow-hidden border border-rule/50 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-xs font-medium text-muted">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-sm font-semibold text-ink leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-rule/50">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-hover group"
                >
                  <span>Lihat di INAPROC</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
