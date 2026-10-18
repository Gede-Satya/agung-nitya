"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formationProducts } from "@/lib/formation-products";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function KatalogSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setAtStart(rail.scrollLeft <= 2);
    setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    updateEdges();
    rail.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      rail.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollRail = (dir: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-rail-card]");
    const amount = (card?.offsetWidth ?? 320) + 20;
    rail.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  return (
    <section
      id="katalog"
      className="relative w-full scroll-mt-20 border-b border-rule/50 bg-wash py-16 text-ink sm:py-24"
    >
      <div className="shell flex flex-col gap-8 sm:gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Katalog Elektronik"
            title="Kurasi produk pilihan."
            lead="Sebagian perangkat dan perlengkapan yang tersedia lewat etalase resmi INAPROC LKPP."
            action={
              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={() => scrollRail(-1)}
                    disabled={atStart}
                    aria-label="Produk sebelumnya"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-rule bg-canvas text-ink transition-colors hover:bg-wash disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollRail(1)}
                    disabled={atEnd}
                    aria-label="Produk berikutnya"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-rule bg-canvas text-ink transition-colors hover:bg-wash disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <Link
                  href="/katalog"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-control bg-accent px-5 text-sm font-semibold text-on-accent shadow-xs transition-all hover:bg-accent-hover focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <span>Lihat semua produk</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            }
          />
        </Reveal>

        {/* Product rail */}
        <Reveal delay={0.08}>
          <div
            ref={railRef}
            className="scrollbar-none -mx-[var(--space-gutter)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--space-gutter)] pb-2"
          >
            {formationProducts.map((item) => (
              <article
                key={item.title}
                data-rail-card
                className="group flex w-[264px] shrink-0 snap-start flex-col overflow-hidden rounded-card border border-rule/70 bg-canvas transition-colors hover:border-accent/40 sm:w-[300px]"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b border-rule/60 bg-wash">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    loading="lazy"
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="300px"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <span className="type-eyebrow text-accent-ink">
                    {item.category}
                  </span>
                  <h3 className="font-heading line-clamp-2 text-sm font-semibold leading-snug text-ink">
                    {item.title}
                  </h3>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buka etalase resmi ${item.title} di INAPROC LKPP (tab baru)`}
                    className="mt-auto inline-flex min-h-9 items-center gap-1.5 pt-2 text-xs font-semibold text-accent-ink hover:text-accent-hover"
                  >
                    <span>Lihat di INAPROC</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
