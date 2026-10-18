"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, CalendarCheck } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollActiveId, setScrollActiveId] = useState<string | null>(null);
  const activeId = pathname === "/katalog" ? "katalog" : scrollActiveId;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const navLinks = SITE_CONTENT.navigation.links;
  const primaryAction = SITE_CONTENT.navigation.primaryAction;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active link based on scrollspy
  useEffect(() => {
    if (pathname === "/katalog") return;

    const handleScrollspy = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      const elements = navLinks
        .filter((l) => l.href.startsWith("/#") || l.href.startsWith("#"))
        .map((l) => ({
          id: l.id,
          el: document.getElementById(l.id),
        }))
        .filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

      if (elements.length === 0) return;

      // Cek apakah mendekati dasar halaman (highlight kontak)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setScrollActiveId(elements[elements.length - 1].id);
        return;
      }

      let currentActive: string | null = null;
      for (const item of elements) {
        const top = item.el.offsetTop;
        const bottom = top + item.el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < bottom) {
          currentActive = item.id;
          break;
        }
      }

      setScrollActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScrollspy, { passive: true });
    window.addEventListener("resize", handleScrollspy, { passive: true });
    handleScrollspy();

    return () => {
      window.removeEventListener("scroll", handleScrollspy);
      window.removeEventListener("resize", handleScrollspy);
    };
  }, [pathname, navLinks]);

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
        className={`relative w-full bg-canvas/90 backdrop-blur-md transition-all duration-300 ${
          isScrolled || menuOpen
            ? "border-b border-rule shadow-xs"
            : "border-b border-rule/60"
        }`}
      >
        <div className="shell flex h-14 items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="/"
            className="flex min-h-11 items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <span className="relative block h-8 w-8 sm:h-9 sm:w-9 shrink-0">
              <Image
                src="/images/logo-awn-transparent.png"
                alt="Logo Resmi PT. Agung Wijaya Nitya"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 32px, 36px"
              />
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-base sm:text-lg font-bold text-[#0c1f38] tracking-tight">
                PT. Agung Wijaya Nitya
              </span>
              <span className="block text-xs sm:text-[13px] font-medium text-slate-600">
                Vendor Pengadaan Barang &amp; Jasa
              </span>
            </span>
          </Link>

          {/* Central links (desktop) */}
          <nav
            aria-label="Navigasi utama"
            className="hidden lg:flex items-center gap-2 text-sm sm:text-[15px] font-medium text-slate-700"
          >
            {navLinks.map((link) => {
              const isActive = activeId === link.id || (link.id === "hero" && activeId === null);
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative inline-flex min-h-11 items-center px-3.5 transition-colors hover:text-[#0c1f38] ${
                    isActive ? "text-[#0c1f38] font-bold" : "text-slate-600"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-2.5 -bottom-[1px] h-[3px] rounded-full bg-[#c28e2b] transition-all duration-200 ${
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-50"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href={primaryAction.href}
              className="hidden min-h-10 items-center justify-center gap-2 rounded-lg bg-[#c28e2b] px-4.5 py-2 text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#ad7e24] active:scale-[0.98] sm:inline-flex"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>{primaryAction.label}</span>
            </Link>

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
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-control text-ink transition-colors hover:bg-wash lg:hidden"
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
              {navLinks.map((link, i) => {
                const isActive = activeId === link.id;
                return (
                  <li key={link.id}>
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      tabIndex={menuOpen ? 0 : -1}
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex min-h-12 items-center justify-between text-base transition-colors ${
                        isActive ? "text-accent-ink font-semibold" : "text-ink"
                      }`}
                    >
                      {link.label}
                      <ChevronRight
                        aria-hidden="true"
                        className={`h-4 w-4 transition-all ${
                          isActive
                            ? "text-accent-ink"
                            : "text-muted group-hover:translate-x-0.5 group-hover:text-ink"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
              <li className="py-3">
                <Link
                  href={primaryAction.href}
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#c28e2b] text-base font-semibold text-white transition-colors hover:bg-[#ad7e24]"
                >
                  <CalendarCheck className="h-5 w-5" />
                  <span>{primaryAction.label}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
