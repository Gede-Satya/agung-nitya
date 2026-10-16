"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SITE_CONTENT } from "@/src/content/site";
import Reveal, { EASE_OUT } from "@/components/ui/Reveal";

export default function CtaPengadaanSection() {
  const waHref = `${SITE_CONTENT.company.whatsappUrl}?text=${encodeURIComponent(
    "Halo PT Agung Wijaya Nitya, saya ingin meminta penawaran pengadaan perangkat TI.",
  )}`;
  const mailHref = `mailto:${SITE_CONTENT.company.email}?subject=${encodeURIComponent(
    "Permintaan Penawaran Pengadaan",
  )}`;
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="cta-pengadaan"
      className="w-full bg-canvas py-20 sm:py-24 border-t border-rule"
    >
      <Reveal className="shell max-w-[820px] mx-auto text-center px-4">
        {/* Eyebrow */}
        <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider text-launch-orange mb-3">
          Konsultasi Pengadaan
        </p>

        {/* Headline */}
        <h2 className="text-[28px] sm:text-[38px] md:text-[44px] font-bold text-ink tracking-tight leading-[1.15] mb-4">
          Siap memenuhi kebutuhan pengadaan Anda.
        </h2>

        {/* Subtitle */}
        <p className="text-[14px] sm:text-[15px] md:text-[16px] text-muted leading-relaxed max-w-[620px] mx-auto mb-9">
          Hubungi konsultan pengadaan B2B kami untuk penawaran harga korporat
          dan instansi. Cantumkan daftar kebutuhan (BoQ) agar kami dapat
          menyiapkan penawaran dengan tepat.
        </p>

        {/* Direct contact actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-[580px] mx-auto mb-8">
          <motion.a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-full bg-accent px-8 text-[14px] font-medium text-on-accent transition-colors hover:bg-accent-strong"
          >
            Hubungi via WhatsApp
          </motion.a>
          <a
            href={mailHref}
            className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-full border border-rule px-8 text-[14px] font-medium text-ink transition hover:border-ink"
          >
            Kirim detail BoQ via Email
          </a>
        </div>

        {/* Secondary link */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-2 text-[13px] font-medium text-accent-strong">
          <a
            href={SITE_CONTENT.company.inaprocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-1 hover:underline underline-offset-4"
          >
            <span>Lihat profil INAPROC</span>
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              ›
            </span>
          </a>

          <a
            href={mailHref}
            className="group inline-flex min-h-11 items-center gap-1 hover:underline underline-offset-4"
          >
            <span>{SITE_CONTENT.company.email}</span>
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              ›
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
