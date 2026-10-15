"use client";

import React, { useState, useEffect } from "react";
import { SITE_CONTENT } from "@/src/content/site";
import { ExternalLink } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-canvas/80 border-b border-rule backdrop-blur-md shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="shell flex h-14 sm:h-16 items-center justify-between">
        {/* Brand Name & INAPROC Status */}
        <a
          href="#"
          className="group flex items-center gap-3 text-ink transition-opacity hover:opacity-90"
          aria-label="PT Agung Wijaya Nitya - Beranda"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-rule bg-wash font-heading text-xs font-semibold text-accent">
            AN
          </span>
          <div className="flex flex-col">
            <span className="font-heading text-sm sm:text-base font-semibold tracking-tight text-ink">
              {SITE_CONTENT.company.name}
            </span>
            <span className="text-[11px] text-muted flex items-center gap-1.5 font-medium">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
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
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-rule bg-wash/80 px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <span>INAPROC Katalog</span>
            <ExternalLink className="h-3.5 w-3.5 text-muted group-hover:text-accent" />
          </a>
        </div>
      </div>
    </header>
  );
}
