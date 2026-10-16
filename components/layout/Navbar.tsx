"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Produk", href: "#lini-utama", id: "lini-utama" },
  { label: "Pemeliharaan", href: "#pemeliharaan-hardware", id: "pemeliharaan-hardware" },
  { label: "Ekosistem", href: "#ekosistem", id: "ekosistem" },
  { label: "Ketersediaan", href: "#unit-pengadaan", id: "unit-pengadaan" },
  { label: "Kontak", href: "#cta-pengadaan", id: "cta-pengadaan" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy: tandai link section yang sedang aktif di viewport secara presisi
  useEffect(() => {
    const handleScrollspy = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      const elements = NAV_LINKS.map((l) => ({
        id: l.id,
        el: document.getElementById(l.id),
      })).filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

      if (elements.length === 0) return;

      // Cek apakah mendekati dasar halaman (highlight kontak)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveId(elements[elements.length - 1].id);
        return;
      }

      let currentActive: string | null = null;

      // Keep "Produk" (#lini-utama) active when #katalog is in view
      const katalogEl = document.getElementById("katalog");
      if (katalogEl) {
        const kTop = katalogEl.offsetTop;
        const kBottom = kTop + katalogEl.offsetHeight;
        if (scrollPosition >= kTop && scrollPosition < kBottom) {
          setActiveId("lini-utama");
          return;
        }
      }

      for (const item of elements) {
        const top = item.el.offsetTop;
        const bottom = top + item.el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < bottom) {
          currentActive = item.id;
          break;
        }
      }

      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScrollspy, { passive: true });
    window.addEventListener("resize", handleScrollspy, { passive: true });
    handleScrollspy();

    return () => {
      window.removeEventListener("scroll", handleScrollspy);
      window.removeEventListener("resize", handleScrollspy);
    };
  }, []);

  // Drawer: Esc menutup, kunci scroll badan, kelola fokus
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const toggleNode = toggleRef.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      toggleNode?.focus();
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full font-sans">
      {/* Backdrop drawer mobile */}
      {menuOpen && (
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-ink/20 lg:hidden"
        />
      )}

      <div
        className={`relative w-full bg-canvas/80 backdrop-blur-xl transition-all duration-300 ${
          isScrolled || menuOpen
            ? "border-b border-rule shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
            : "border-b border-rule/60"
        }`}
      >
        <div className="shell flex h-14 items-center justify-between gap-4">
          {/* Brand */}
          <a
            href="#konten-utama"
            className="flex min-h-11 items-center gap-2.5 hover:opacity-85 transition-opacity"
          >
            <span className="relative block h-7 w-7 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/logo-awn-transparent.png"
                alt="Logo Resmi PT Agung Wijaya Nitya"
                fill
                priority
                className="object-cover"
                sizes="28px"
              />
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-[14px] sm:text-[15px] font-semibold text-ink tracking-tight">
                Agung Wijaya Nitya
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-wider text-muted">
                Perangkat TI & Display
              </span>
            </span>
          </a>

          {/* Central links (desktop) */}
          <nav
            aria-label="Navigasi utama"
            className="hidden lg:flex items-center gap-1 text-[13px] font-normal text-ink/80"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative inline-flex min-h-11 items-center px-3 transition-colors hover:text-ink ${
                    isActive ? "text-accent-strong" : ""
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a
              href="#cta-pengadaan"
              className="hidden min-h-11 items-center justify-center rounded-full bg-accent px-5 text-[13px] font-medium text-on-accent transition-all hover:bg-accent-strong active:scale-[0.98] sm:inline-flex"
            >
              <span>Minta Penawaran</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="navigasi-mobile"
              aria-label={
                menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
              }
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-black/[0.04] lg:hidden"
            >
              {menuOpen ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
            menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <nav
            id="navigasi-mobile"
            aria-label="Navigasi mobile"
            className="min-h-0"
            inert={!menuOpen}
          >
            <ul className="flex flex-col border-t border-rule px-5 py-2">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeId === link.id;
                return (
                  <li key={link.id}>
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      tabIndex={menuOpen ? 0 : -1}
                      aria-current={isActive ? "true" : undefined}
                      className={`group flex min-h-12 items-center justify-between text-[15px] transition-colors ${
                        isActive ? "text-accent-strong font-medium" : "text-ink"
                      }`}
                    >
                      {link.label}
                      <ChevronRight
                        aria-hidden="true"
                        className={`h-4 w-4 transition-all ${
                          isActive
                            ? "text-accent-strong"
                            : "text-muted group-hover:translate-x-0.5 group-hover:text-ink"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
              <li className="py-3">
                <a
                  href="#cta-pengadaan"
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                  className="flex min-h-12 items-center justify-center rounded-full bg-accent text-[15px] font-medium text-on-accent transition-colors hover:bg-accent-strong"
                >
                  Minta Penawaran
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
