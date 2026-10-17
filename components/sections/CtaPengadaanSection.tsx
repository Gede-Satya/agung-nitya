"use client";

import React from "react";
import { Mail, ExternalLink } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";
import Reveal from "@/components/ui/Reveal";

export default function CtaPengadaanSection() {
  const contact = SITE_CONTENT.contact;
  const company = SITE_CONTENT.company;

  const mailHref = `mailto:${company.email}?subject=${encodeURIComponent(
    "Permintaan Penawaran Pengadaan Perangkat TI",
  )}`;

  return (
    <section
      id="kontak"
      className="w-full bg-canvas py-16 sm:py-24 border-t border-rule"
    >
      <div id="cta-pengadaan" className="sr-only" aria-hidden="true" />
      <Reveal className="shell max-w-[820px] mx-auto text-center px-4">
        {/* Eyebrow */}
        <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
          {contact.eyebrow}
        </p>

        {/* Headline */}
        <h2 className="font-heading type-h2 text-ink tracking-tight mb-4">
          {contact.title}
        </h2>

        {/* Subtitle */}
        <p className="type-body text-muted max-w-[620px] mx-auto mb-8">
          {contact.subtitle}
        </p>

        {/* Direct contact action: Primary Email */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-[580px] mx-auto mb-8">
          <a
            href={mailHref}
            className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-control bg-accent px-8 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover gap-2 shadow-xs"
          >
            <Mail className="w-4 h-4" />
            <span>{contact.directEmailLabel}</span>
          </a>
          <a
            href={company.inaprocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-control border border-rule bg-canvas px-7 text-sm font-medium text-ink transition-colors hover:bg-wash gap-2"
          >
            <span>{contact.catalogProfileLabel}</span>
            <ExternalLink className="w-4 h-4 text-muted" />
          </a>
        </div>

        {/* Verified contact note */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs text-muted">
          <span>
            Email Resmi: <strong className="text-ink">{company.email}</strong>
          </span>
          <span>&bull;</span>
          <span>
            Domisili: <strong className="text-ink">{company.location}</strong>
          </span>
        </div>
      </Reveal>
    </section>
  );
}
