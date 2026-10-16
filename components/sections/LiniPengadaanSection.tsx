"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";
import Reveal from "@/components/ui/Reveal";

export default function LiniPengadaanSection() {
  const cards = [
    {
      badge: "PUSAT DATA & SERVER",
      title: "Server, Storage, dan UPS untuk operasional tanpa henti.",
      desc: "Arsitektur redundan berkeandalan industri dengan sertifikasi efisiensi titanium dan garansi pergantian part cepat.",
      image: "/images/card-server-storage.jpg",
      alt: "Enterprise Server & Storage Infrastructure",
    },
    {
      badge: "PRODUKTIVITAS KERJA",
      title: "Laptop bisnis, PC desktop, dan printer kecepatan tinggi.",
      desc: "Platform komputasi terkelola dengan keamanan vPro berbasis hardware untuk armada kerja skala ribuan unit.",
      image: "/images/card-workstation-pc.jpg",
      alt: "Business Workstations and Mobile PCs",
    },
    {
      badge: "FASILITAS & DISPLAY KOMERSIAL",
      title: "Smart display, monitor komersial, dan perlengkapan ruang modern.",
      desc: "Monitor kantor presisi tinggi, panel interaktif, dan display komersial heavy-duty untuk ruang rapat eksekutif, aula, serta fasilitas instansi.",
      image: "/images/card-commercial-display.jpg",
      alt: "Commercial Displays and Facility Electronics",
    },
  ];

  return (
    <section
      id="lini-utama"
      className="relative w-full py-16 sm:py-24 bg-wash text-ink"
    >
      <div className="shell flex flex-col gap-10 sm:gap-12">
        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <h2 className="font-heading text-2xl sm:text-4xl md:text-[42px] font-bold leading-tight tracking-tight text-ink">
              Kenali lini pengadaan utama.
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Dukungan komprehensif mulai dari pusat data, komputasi meja,
              hingga display modern.
            </p>
          </div>

          <a
            href={SITE_CONTENT.company.inaprocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1 text-[13px] sm:text-[14px] font-normal text-accent-strong hover:underline shrink-0"
          >
            <span>Lihat profil INAPROC</span>
            <ChevronRight className="h-4 w-4" />
          </a>
        </Reveal>

        {/* 3 Large White Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, idx) => (
            <Reveal
              key={idx}
              delay={idx * 0.08}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-[28px] bg-canvas border-0 shadow-none transition-transform hover:-translate-y-1 duration-300"
            >
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-semibold tracking-wider text-launch-orange uppercase">
                  {card.badge}
                </span>

                <h3 className="font-heading text-lg sm:text-[20px] font-semibold leading-snug text-ink">
                  {card.title}
                </h3>

                <p className="text-muted text-xs sm:text-[13px] leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Contained Media Frame */}
              <div className="relative w-full aspect-[16/10] mt-6 rounded-[20px] overflow-hidden bg-wash">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
