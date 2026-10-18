"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function EkosistemPengadaanSection() {
  const content = SITE_CONTENT.ekosistem;

  return (
    <section
      id="ekosistem"
      className="relative w-full scroll-mt-16 border-b border-rule/50 bg-canvas py-16 text-ink sm:scroll-mt-20 sm:py-24"
    >
      <div className="shell flex flex-col gap-12 sm:gap-16">
        {/* Narrative + profile */}
        <Reveal>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow={content.eyebrow}
                title={content.title}
                lead={content.paragraphs[0]}
              />
              {content.paragraphs[1] && (
                <p className="type-body mt-4 max-w-[58ch] text-muted">
                  {content.paragraphs[1]}
                </p>
              )}
            </div>

            <div className="lg:col-span-5 lg:text-right">
              <a
                href={SITE_CONTENT.company.inaprocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-control border border-rule bg-canvas px-5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-ink"
              >
                <ShieldCheck className="h-4 w-4 text-accent-ink" />
                <span>{content.profileLinkText}</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Procurement pathway */}
        <Reveal delay={0.08}>
          <ol className="relative grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-5">
            {/* Desktop connector */}
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-5 hidden h-px bg-rule md:block"
            />
            {/* Mobile connector */}
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-5 top-2 w-px bg-rule md:hidden"
            />

            {content.workflowItems.map((item, idx) => (
              <li
                key={item.title}
                className="relative flex gap-4 md:flex-col md:gap-4"
              >
                <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rule bg-canvas font-mono text-xs font-bold text-accent-ink">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5 pb-2 md:pb-0">
                  <h3 className="font-heading text-sm font-semibold leading-snug text-ink">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Footer note */}
        <Reveal delay={0.12}>
          <div className="flex flex-col items-start justify-between gap-4 rounded-card border border-rule/70 bg-wash px-6 py-5 sm:flex-row sm:items-center">
            <span className="text-sm text-muted">
              {content.cardFooterNotice}
            </span>
            <a
              href="#kontak"
              className="group inline-flex min-h-11 items-center gap-2 rounded-control bg-accent px-5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
            >
              <span>{content.ctaActionText}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
