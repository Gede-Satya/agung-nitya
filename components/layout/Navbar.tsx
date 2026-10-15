"use client";

import React, { useState, useEffect } from "react";
import { SITE_CONTENT } from "@/src/content/site";
import { ExternalLink } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-colors duration-200 ${
        isScrolled
          ? "bg-canvas/95 border-b border-border shadow-sm backdrop-blur-md"
          : "bg-canvas/80 border-b border-border/60 backdrop-blur-sm"
      }`}
    >
      <div className="shell flex h-14 sm:h-16 items-center justify-between">
        {/* Brand Name & INAPROC Status */}
        <a
          href="#"
          className="group flex items-center gap-3 text-primary transition-opacity hover:opacity-90"
          aria-label="PT Agung Wijaya Nitya - Beranda"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-graphite font-heading text-xs font-semibold text-accent">
            AN
          </span>
          <div className="flex flex-col">
            <span className="font-heading text-sm sm:text-base font-medium tracking-tight text-primary">
              {SITE_CONTENT.company.name}
            </span>
            <span className="text-[11px] text-muted flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {SITE_CONTENT.company.inaprocStatus} · INAPROC
            </span>
          </div>
        </a>

        {/* Right CTA / INAPROC direct badge */}
        <div className="flex items-center gap-3">
          <a
            href={SITE_CONTENT.company.inaprocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-border bg-graphite/80 px-4 py-2 text-xs font-medium text-primary transition-colors hover:border-accent hover:text-white"
          >
            <span>INAPROC Katalog</span>
            <ExternalLink className="h-3.5 w-3.5 text-muted" />
          </a>
        </div>
      </div>
    </header>
  );
}
