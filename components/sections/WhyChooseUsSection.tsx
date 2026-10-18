"use client";

import { FileCheck2, Headset, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const POINT_ICONS: LucideIcon[] = [Store, FileCheck2, Headset];

export default function WhyChooseUsSection() {
  const content = SITE_CONTENT.whyUs;

  return (
    <section
      id="why-us"
      className="relative w-full bg-wash py-16 sm:py-24 border-y border-rule/60"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          lead={content.subtitle}
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {content.points.map((point, i) => {
            const Icon = POINT_ICONS[i] ?? Store;
            return (
              <Reveal key={point.title} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-rule/70 bg-canvas p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-control bg-ink text-accent">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {point.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
