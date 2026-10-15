"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

export default function LiniPengadaanSection() {
  const [activeSlide, setActiveSlide] = useState(0);

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
      badge: "FASILITAS & KOMERSIAL",
      title: "Smart TV, kulkas inverter, dan perlengkapan ruang modern.",
      desc: "Elektronik komersial heavy-duty untuk ruang rapat eksekutif, pantry kantor, aula pertemuan, dan unit perhotelan.",
      image: "/images/card-commercial-display.jpg",
      alt: "Commercial Displays and Facility Electronics",
    },
  ];

  return (
    <section id="lini-utama" className="relative w-full py-16 sm:py-24 bg-white text-[#1d1d1f]">
      <div className="shell flex flex-col gap-10 sm:gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-2xl">
            <h2 className="font-heading text-2xl sm:text-4xl md:text-[42px] font-bold leading-tight tracking-tight text-[#1d1d1f]">
              Kenali lini pengadaan utama.
            </h2>
            <p className="text-[#707070] text-sm sm:text-base leading-relaxed">
              Dukungan komprehensif mulai dari pusat data hingga meja kerja karyawan.
            </p>
          </div>

          <a
            href={SITE_CONTENT.company.inaprocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[13px] sm:text-[14px] font-normal text-[#0066cc] hover:underline shrink-0"
          >
            <span>Unduh Katalog PDF</span>
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        {/* 3 Large White Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-[28px] bg-white border border-[#d6d6d6] transition-all hover:border-[#86868b] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            >
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-semibold tracking-wider text-[#b64400] uppercase">
                  {card.badge}
                </span>

                <h3 className="font-heading text-lg sm:text-[20px] font-semibold leading-snug text-[#1d1d1f]">
                  {card.title}
                </h3>

                <p className="text-[#707070] text-xs sm:text-[13px] leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Contained Media Frame */}
              <div className="relative w-full aspect-[16/10] mt-6 rounded-[20px] overflow-hidden bg-[#f5f5f7] border border-[#e6e6e8]">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Indicator */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`transition-all duration-300 ${
                activeSlide === idx
                  ? "h-1.5 w-6 rounded-full bg-[#1d1d1f]"
                  : "h-1.5 w-1.5 rounded-full bg-[#d6d6d6] hover:bg-[#86868b]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
