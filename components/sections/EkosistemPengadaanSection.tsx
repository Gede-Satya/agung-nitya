"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";
import Reveal from "@/components/ui/Reveal";

export default function EkosistemPengadaanSection() {
  const content = SITE_CONTENT.ekosistem;

  return (
    <section
      id="ekosistem"
      className="relative w-full py-14 sm:py-20 bg-canvas text-ink border-b border-rule/50"
    >
      <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Narrative Copy */}
        <Reveal className="lg:col-span-5 flex flex-col justify-center gap-4 pt-2">
          <span className="text-xs font-semibold tracking-wider text-accent uppercase">
            {content.eyebrow}
          </span>

          <h2 className="font-heading type-h2 text-ink">
            {content.title}
          </h2>

          <div className="flex flex-col gap-3 type-body text-muted max-w-[64ch]">
            {content.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="pt-2">
            <a
              href={SITE_CONTENT.company.inaprocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover hover:underline"
            >
              <span>{content.profileLinkText}</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        {/* Right Column: Workflow Card */}
        <Reveal
          delay={0.1}
          className="lg:col-span-7 p-6 sm:p-8 rounded-card bg-wash border border-rule/60 shadow-2xs"
        >
          <h3 className="font-heading type-h3 text-ink mb-5">
            {content.cardTitle}
          </h3>

          <ul className="flex flex-col gap-2.5">
            {content.workflowItems.map((item, idx) => (
              <li
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 p-3.5 sm:p-4 rounded-control bg-canvas border border-rule/50"
              >
                <span className="font-heading text-sm font-semibold text-ink shrink-0">
                  {item.title}
                </span>
                <span className="text-xs text-muted sm:text-right">
                  {item.desc}
                </span>
              </li>
            ))}
          </ul>

          {/* Footer of Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 mt-3 border-t border-rule text-xs text-muted">
            <span>
              {content.cardFooterNotice}
            </span>
            <a
              href="#kontak"
              className="inline-flex min-h-11 items-center font-semibold text-accent hover:text-accent-hover tracking-wider uppercase"
            >
              {content.ctaActionText}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
