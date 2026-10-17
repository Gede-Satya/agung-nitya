"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";
import Reveal from "@/components/ui/Reveal";

export default function LiniPengadaanSection() {
  const content = SITE_CONTENT.liniPengadaan;

  return (
    <section
      id="lini-utama"
      className="relative w-full py-14 sm:py-20 bg-canvas text-ink border-b border-rule/50"
    >
      <div className="shell flex flex-col gap-10 sm:gap-12">
        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <span className="text-xs font-semibold tracking-wider text-accent uppercase">
              {content.eyebrow}
            </span>
            <h2 className="font-heading type-h2 text-ink">
              {content.title}
            </h2>
            <p className="type-body text-muted">
              {content.subtitle}
            </p>
          </div>

          <a
            href={SITE_CONTENT.company.inaprocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover shrink-0"
          >
            <span>{content.profileLinkText}</span>
            <ChevronRight className="h-4 w-4" />
          </a>
        </Reveal>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {content.cards.map((card, idx) => (
            <Reveal
              key={idx}
              delay={idx * 0.08}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-card bg-wash border border-rule/70 transition-all hover:border-accent/40 hover:-translate-y-1 duration-300 shadow-2xs"
            >
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-wider text-accent uppercase">
                  {card.badge}
                </span>

                <h3 className="font-heading type-h3 text-ink">
                  {card.title}
                </h3>

                <p className="type-body text-muted text-sm">
                  {card.desc}
                </p>
              </div>

              {/* Contained Media Frame */}
              <div className="relative w-full aspect-[16/10] mt-6 rounded-control overflow-hidden bg-wash border border-rule/50">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Action: Link to filtered catalog */}
              <div className="mt-4 pt-3 border-t border-rule/60">
                <a
                  href={
                    idx === 0
                      ? "/katalog?kategori=Peralatan%20Elektronik"
                      : idx === 1
                      ? "/katalog?kategori=Peralatan%20Kantor"
                      : "/katalog?kategori=Peralatan%20Elektronik"
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-hover group"
                >
                  <span>Buka di katalog</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
