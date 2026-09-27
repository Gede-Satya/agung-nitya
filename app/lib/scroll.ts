"use client";

type LenisLike = {
  scrollTo: (
    target: HTMLElement | number,
    options?: { offset?: number; duration?: number; immediate?: boolean },
  ) => void;
};

function getLenis(): LenisLike | undefined {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

function prefersReduced(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToId(hash: string) {
  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.6 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

/** Gulir ke posisi absolut `y` (px) — lewat Lenis bila aktif, instan saat reduced-motion. */
export function scrollToY(y: number, duration = 1.4) {
  if (prefersReduced()) {
    window.scrollTo(0, y);
    return;
  }
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(y, { duration });
  } else {
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
