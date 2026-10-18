"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

const DEFAULT_EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroShowcase() {
  const hero = SITE_CONTENT.hero;

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#07162c] text-white pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 min-h-[480px] lg:min-h-[540px] flex items-center"
    >
      {/* Background Image: Server racks + Workstation + Logistics Warehouse with Van */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-procurement-bg.jpg"
          alt="Operasional Pengadaan dan Fasilitas Logistik TI PT Agung Wijaya Nitya"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-[75%_center] lg:object-right"
        />
        {/* Darkening base layer */}
        <div className="absolute inset-0 bg-[#07162c]/35" />

        {/* Desktop Gradient: solid dark navy on the left tapering off to show the server racks & warehouse on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#07162c]/95 via-[48%] to-transparent hidden md:block" />

        {/* Mobile / Tablet overlay to guarantee crisp typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07162c] via-[#07162c]/90 to-[#07162c]/75 md:hidden" />
      </div>

      {/* Hero Content */}
      <div className="shell relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: DEFAULT_EASE }}
          className="max-w-2xl lg:max-w-xl"
        >
          {/* Main Headline */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight text-white leading-[1.14]">
            Vendor Pengadaan<br />
            Barang &amp; Jasa Terpercaya di Bali
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/90 font-normal leading-relaxed max-w-xl">
            {hero.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="mt-7 sm:mt-8 flex flex-row flex-wrap items-center gap-3.5">
            <Link
              href={hero.ctaPrimary.href}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg bg-[#c28e2b] px-6 text-sm sm:text-base font-semibold text-white shadow-lg shadow-black/25 transition-all hover:bg-[#ad7e24] active:scale-[0.98]"
            >
              <LayoutGrid className="h-4.5 w-4.5" />
              <span>{hero.ctaPrimary.label}</span>
            </Link>

            <Link
              href={hero.ctaSecondary.href}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/85 bg-[#07162c]/40 px-6 text-sm sm:text-base font-semibold text-white backdrop-blur-xs transition-all hover:bg-white/10 hover:border-white active:scale-[0.98]"
            >
              {hero.ctaSecondary.label}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
