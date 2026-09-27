"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Motion foundation — core helpers (hooks, guards, factories).

   Aturan seluruh motion di project ini:
   1. Motion punya tujuan komunikasi — bukan di semua elemen.
   2. prefers-reduced-motion: hentikan continuous animation,
      kurangi transform, hapus parallax, PERTAHANKAN konten.
   3. Semua komponen motion di app/components/motion/ berbasis
      helper di file ini.
   ───────────────────────────────────────────────────────────── */

/* ── media query + reduced-motion guard ─────────────────────── */

function subscribeMedia(query: string) {
  return function subscribe(onStoreChange: () => void) {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onStoreChange);
    return () => mql.removeEventListener("change", onStoreChange);
  };
}

function getMatch(query: string): boolean {
  return typeof window !== "undefined" && window.matchMedia(query).matches;
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => getMatch(query),
    () => false,
  );
}

/** True saat user mengaktifkan "prefers-reduced-motion: reduce". */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useHydratedReducedMotion(): boolean {
  const preference = useFramerReducedMotion();
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  return hydrated ? Boolean(preference) : true;
}

/* ── reveal variant (dipakai motion/Reveal) ─────────────────── */

export type RevealVariant = "fade" | "up" | "down" | "left" | "right" | "scale";