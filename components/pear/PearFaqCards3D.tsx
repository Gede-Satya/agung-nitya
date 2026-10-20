"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    question: "Bagaimana mekanisme pemesanan via e-Katalog LKPP?",
    answer:
      "Pemesanan dilakukan langsung melalui portal katalog.inaproc.id pada akun PT Agung Wijaya Nitya. Pejabat Pembuat Komitmen (PPK) atau Pejabat Pengadaan dapat menerbitkan Surat Pesanan (e-Purchasing) secara resmi dengan kepastian harga baku pemerintah.",
  },
  {
    id: 2,
    question: "Apakah 742 produk memiliki izin dan legalitas resmi?",
    answer:
      "Ya. Seluruh 742 produk aktif terdaftar resmi di INAPROC LKPP dengan klasifikasi KBLI terverifikasi, kepatuhan perpajakan instansi, dan status aktif penyedia UMKK di Kabupaten Badung, Bali.",
  },
  {
    id: 3,
    question: "Bagaimana jaminan garansi & SLA purna jual perangkat?",
    answer:
      "Setiap unit perangkat keras dilengkapi garansi resmi pabrikan dan garansi layanan. Untuk proyek instansi, kami menyediakan opsi SLA unit pengganti (temporary unit) jika terjadi kendala teknis operasional.",
  },
  {
    id: 4,
    question: "Berapa lama estimasi pengiriman dan instalasi ke instansi?",
    answer:
      "Pengiriman wilayah Bali siap tiba dalam 1–3 hari kerja, sedangkan luar Bali mengikuti jadwal ekspedisi resmi pengadaan. Tim teknisi kami mendampingi pengujian fungsi hingga Berita Acara Serah Terima (BAST).",
  },
];

export default function PearFaqCards3D() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % FAQ_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + FAQ_DATA.length) % FAQ_DATA.length);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center">
      {/* 3D Orbit / Perspective Carousel Container */}
      <div className="relative w-full h-[280px] sm:h-[300px] perspective-stage flex items-center justify-center">
        {FAQ_DATA.map((item, idx) => {
          // Calculate relative offset from active item
          const offset = (idx - activeIndex + FAQ_DATA.length) % FAQ_DATA.length;
          // offset 0 = active, 1 = right, FAQ_DATA.length - 1 = left
          const isCurrent = offset === 0;
          const isNext = offset === 1;
          const isPrev = offset === FAQ_DATA.length - 1;

          let transformStyle = "scale(0.85) opacity-0 pointer-events-none";
          let zIndex = 0;

          if (isCurrent) {
            transformStyle = "scale(1) translateZ(30px) opacity-100 pointer-events-auto shadow-2xl bg-[#091a30]/95 backdrop-blur-2xl";
            zIndex = 20;
          } else if (isNext) {
            transformStyle = "scale(0.94) translateY(16px) translateZ(-20px) opacity-30 pointer-events-auto cursor-pointer bg-[#071526]/80 blur-[0.5px]";
            zIndex = 10;
          } else if (isPrev) {
            transformStyle = "scale(0.94) translateY(-16px) translateZ(-40px) opacity-30 pointer-events-auto cursor-pointer bg-[#071526]/80 blur-[0.5px]";
            zIndex = 5;
          }

          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`absolute top-0 w-full max-w-md p-6 sm:p-7 rounded-2xl border border-white/20 transition-all duration-500 ease-out select-none ${transformStyle}`}
              style={{ zIndex }}
            >
              {/* Star ornament matching pear.no style */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-widest text-accent uppercase flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 fill-accent" viewBox="0 0 24 24">
                    <path d="M12 0Q13.1 10.9 24 12Q13.1 13.1 12 24Q10.9 13.1 0 12Q10.9 10.9 12 0Z" />
                  </svg>
                  TANYA JAWAB PENGADAAN // 0{idx + 1}
                </span>
                <span className="font-mono text-[11px] text-white/40">
                  {idx + 1}/{FAQ_DATA.length}
                </span>
              </div>

              <h4 className="font-editorial text-lg sm:text-xl font-medium text-white leading-snug mb-3">
                {item.question}
              </h4>

              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                {item.answer}
              </p>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4 mt-4 z-20">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="FAQ Sebelumnya"
          className="p-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {FAQ_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Ke Pertanyaan ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-6 bg-accent" : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="FAQ Selanjutnya"
          className="p-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
