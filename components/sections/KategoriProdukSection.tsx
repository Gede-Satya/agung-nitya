"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HardDrive, Monitor, Presentation, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE_CONTENT, type KategoriIcon } from "@/src/content/site";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const ICONS: Record<KategoriIcon, LucideIcon> = {
  server: HardDrive,
  monitor: Monitor,
  display: Presentation,
  wrench: Wrench,
};

export default function KategoriProdukSection() {
  const content = SITE_CONTENT.kategori;

  return (
    <section
      id="lini-utama"
      className="relative w-full bg-canvas py-16 sm:py-24"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          lead={content.subtitle}
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item, i) => {
            const Icon = ICONS[item.icon];
            const isExternal = item.href.startsWith("http");
            const linkProps = isExternal
              ? { target: "_blank", rel: "noopener noreferrer" as const }
              : {};

            return (
              <Reveal key={item.title} delay={i * 0.08} className="h-full">
                <Link
                  href={item.href}
                  {...linkProps}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-rule/70 bg-canvas transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-ink/5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-wash">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-control bg-accent-soft text-accent-ink">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>

                    <h3 className="mt-4 font-heading text-base font-semibold leading-snug text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.desc}
                    </p>

                    <span className="mt-auto pt-4 text-xs font-medium uppercase tracking-wide text-muted">
                      {item.items}
                    </span>

                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink transition-colors group-hover:text-accent-hover">
                      {content.linkText}
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
