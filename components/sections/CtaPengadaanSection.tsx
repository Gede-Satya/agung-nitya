"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, ExternalLink, Wrench } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";
import { MAINTENANCE_CONTENT } from "@/src/content/maintenance";
import Reveal from "@/components/ui/Reveal";

function ContactActions() {
  const searchParams = useSearchParams();
  const layananParam = searchParams.get("layanan");
  const tujuanParam = searchParams.get("tujuan");

  const contact = SITE_CONTENT.contact;
  const company = SITE_CONTENT.company;

  // Ensure landing on #kontak scrolls section into view if arriving with hash or query params
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    const isContactTarget =
      hash === "#kontak" ||
      hash === "#cta-pengadaan" ||
      layananParam !== null ||
      tujuanParam !== null;

    if (isContactTarget) {
      const el = document.getElementById("kontak");
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [layananParam, tujuanParam]);

  // Check if a specific maintenance component was requested
  const matchedItem = layananParam
    ? MAINTENANCE_CONTENT.items.find((it) => it.id === layananParam)
    : null;

  let subject = "Permintaan Penawaran Pengadaan Perangkat TI";
  let activeNeedLabel: string | null = null;

  if (matchedItem) {
    activeNeedLabel = `Pemeliharaan ${matchedItem.label}`;
    subject = `Tanya Layanan Pemeliharaan ${matchedItem.label}`;
  } else if (tujuanParam === "pemeliharaan") {
    activeNeedLabel = "Jadwal Pemeliharaan & Purnajual Perangkat TI";
    subject = "Permintaan Jadwal Pemeliharaan Perangkat TI";
  }

  const mailHref = `mailto:${company.email}?subject=${encodeURIComponent(subject)}`;

  return (
    <>
      {activeNeedLabel && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-card border border-accent/30 bg-accent/5 px-4 py-2.5 text-xs font-medium text-accent">
          <Wrench className="w-4 h-4 shrink-0" />
          <span>
            Kebutuhan Terpilih: <strong>{activeNeedLabel}</strong>
          </span>
        </div>
      )}

      {/* Direct contact action: Primary Email */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-[580px] mx-auto mb-8">
        <a
          href={mailHref}
          className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-control bg-accent px-8 text-sm font-semibold text-white transition-all hover:bg-accent-hover hover:scale-[1.01] active:scale-[0.99] gap-2 shadow-sm"
        >
          <Mail className="w-4 h-4" />
          <span>{contact.directEmailLabel}</span>
        </a>
        <a
          href={company.inaprocUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-control border border-white/20 bg-white/10 px-7 text-sm font-medium text-white transition-colors hover:bg-white/15 gap-2 backdrop-blur-xs"
        >
          <span>{contact.catalogProfileLabel}</span>
          <ExternalLink className="w-4 h-4 text-white/70" />
        </a>
      </div>
    </>
  );
}

export default function CtaPengadaanSection() {
  const contact = SITE_CONTENT.contact;
  const company = SITE_CONTENT.company;

  return (
    <section
      id="kontak"
      className="w-full bg-wash py-14 sm:py-20 border-t border-rule/50 scroll-mt-16 sm:scroll-mt-20"
    >
      <div id="cta-pengadaan" className="sr-only" aria-hidden="true" />
      <div className="shell px-4">
        <Reveal className="relative rounded-card bg-ink text-white p-8 sm:p-14 overflow-hidden border border-white/10 shadow-lg text-center max-w-4xl mx-auto">
          {/* Subtle Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-accent/30 blur-3xl rounded-full pointer-events-none"
          />

          {/* Eyebrow */}
          <p className="relative text-xs font-semibold uppercase tracking-wider text-blue-300 mb-3">
            {contact.eyebrow}
          </p>

          {/* Headline */}
          <h2 className="relative font-heading type-h2 text-white tracking-tight mb-4">
            {contact.title}
          </h2>

          {/* Subtitle */}
          <p className="relative type-body text-white/75 max-w-[620px] mx-auto mb-8">
            {contact.subtitle}
          </p>

          <div className="relative">
            <Suspense fallback={null}>
              <ContactActions />
            </Suspense>
          </div>

          {/* Verified contact note */}
          <div className="relative flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 border-t border-white/10 text-xs text-white/60">
            <span>
              Email Resmi: <strong className="text-white">{company.email}</strong>
            </span>
            <span>&bull;</span>
            <span>
              Domisili: <strong className="text-white">{company.location}</strong>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
