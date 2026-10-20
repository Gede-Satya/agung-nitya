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
      className="relative w-full overflow-hidden bg-navy text-white pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 min-h-[480px] lg:min-h-[540px] flex items-center"
    >
      {/* Background: operational procurement & IT logistics facility */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-procurement-v2.jpg"
          alt="Ilustrasi fasilitas pengadaan, perangkat TI, dan logistik"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-center lg:object-right"
        />
        {/* Darkening base layer */}
        <div className="absolute inset-0 bg-navy/15" />

        {/* Desktop gradient: solid navy on the left tapering off to reveal the imagery on the right */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-navy via-navy/80 via-42% to-transparent md:block" />

        {/* Mobile / tablet overlay to guarantee crisp typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/70 md:hidden" />
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
          <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[50px] lg:leading-[1.14]">
            {hero.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/90 font-normal leading-relaxed max-w-xl">
            {hero.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="mt-7 sm:mt-8 flex flex-row flex-wrap items-center gap-3.5">
            <Link
              href={hero.ctaPrimary.href}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-control bg-accent px-6 text-sm font-semibold text-on-accent shadow-lg shadow-black/25 transition-all hover:bg-accent-hover active:scale-[0.98] sm:text-base"
            >
              <LayoutGrid className="h-4 w-4" />
              <span>{hero.ctaPrimary.label}</span>
            </Link>

            <Link
              href={hero.ctaSecondary.href}
              className="inline-flex min-h-12 items-center justify-center rounded-control border border-white/85 bg-navy/40 px-6 text-sm font-semibold text-white backdrop-blur-xs transition-all hover:border-white hover:bg-white/10 active:scale-[0.98] sm:text-base"
            >
              {hero.ctaSecondary.label}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
