"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
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
            className="flex min-h-11 items-center gap-2.5 hover:opacity-85 transition-opacity"
          >
            <span className="relative block h-7 w-7 shrink-0 overflow-hidden rounded-full border border-rule">
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
              <span className="block font-heading text-sm sm:text-base font-semibold text-ink tracking-tight">
                Agung Wijaya Nitya
              </span>
              <span className="block text-xs font-medium text-muted">
                Katalog & Solusi Pengadaan
              </span>
            </span>
          </Link>

          {/* Central links (desktop) */}
          <nav
            aria-label="Navigasi utama"
            className="hidden lg:flex items-center gap-1 text-sm font-medium text-ink/80"
          >
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative inline-flex min-h-11 items-center px-3 transition-colors hover:text-ink ${
                    isActive ? "text-accent font-semibold" : ""
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-px h-0.5 rounded-pill bg-accent transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0"
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
              className="hidden min-h-11 items-center justify-center rounded-control bg-accent px-5 text-sm font-medium text-on-accent transition-all hover:bg-accent-hover active:scale-[0.98] sm:inline-flex"
            >
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
                        isActive ? "text-accent font-semibold" : "text-ink"
                      }`}
                    >
                      {link.label}
                      <ChevronRight
                        aria-hidden="true"
                        className={`h-4 w-4 transition-all ${
                          isActive
                            ? "text-accent"
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
                  className="flex min-h-12 items-center justify-center rounded-control bg-accent text-base font-medium text-on-accent transition-colors hover:bg-accent-hover"
                >
                  {primaryAction.label}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
