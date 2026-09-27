"use client";

import { gsap, ScrollTrigger, deferScrollTriggers } from "@/app/lib/anim";
import { setStory, setFocus, storyStore } from "./story";

/* Hook QA (hanya di dev) — memudahkan pemeriksaan progres cerita di browser. */
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  (window as unknown as { __story?: unknown }).__story = {
    storyStore,
    setStory,
    setFocus,
  };
}

/**
 * Driver cerita — satu ScrollTrigger (scrub) menerjemahkan scroll halaman
 * menjadi progres 0..1 → state UNIFIED..COMPLETE (MOTION §10, §11, §30).
 *
 * Pemetaan antar-jangkar dibuat piecewise-linear di ruang scroll, sehingga
 * batas state selalu menempel pada posisi seksi (aman terhadap tinggi konten
 * yang berubah / pin spacer), bukan persentase tinggi dokumen yang kaku.
 * Jangkar diukur ulang pada tiap refresh ScrollTrigger.
 */
const ANCHORS: ReadonlyArray<readonly [selector: string, progress: number]> = [
  ["#masalah", 0.2],
  ["#sistem", 0.4],
  ["#modul", 0.6],
  ["#proses", 0.75],
  ["#tolok-ukur", 0.9],
];

export function createStoryDriver(): () => void {
  let dead = false;
  let kill: (() => void) | null = null;

  /* proxy.raw = progres linear dokumen (0..1) yang di-smooth oleh scrub */
  const proxy = { raw: 0 };
  let edges: number[] = [0, 1];
  let targets: number[] = [0, 1];

  const measure = () => {
    const max = Math.max(1, ScrollTrigger.maxScroll(window));
    const pairs: Array<[number, number]> = [[0, 0]];
    for (const [sel, p] of ANCHORS) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const top = Math.min(
        el.getBoundingClientRect().top + window.scrollY,
        max,
      );
      if (top <= pairs[pairs.length - 1][0] + 1) continue;
      pairs.push([top / max, p]);
    }
    if (pairs[pairs.length - 1][0] < 1) pairs.push([1, 1]);
    edges = pairs.map((pair) => pair[0]);
    targets = pairs.map((pair) => pair[1]);
  };

  const map = (raw: number) => {
    const r = raw < 0 ? 0 : raw > 1 ? 1 : raw;
    const last = edges.length - 1;
    for (let i = 0; i < last; i++) {
      if (r <= edges[i + 1] || i === last - 1) {
        const span = edges[i + 1] - edges[i];
        const t = span <= 0 ? 1 : (r - edges[i]) / span;
        const u = t < 0 ? 0 : t > 1 ? 1 : t;
        return targets[i] + (targets[i + 1] - targets[i]) * u;
      }
    }
    return 1;
  };

  deferScrollTriggers().then(() => {
    if (dead) return;
    measure();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tween = gsap.to(proxy, {
      raw: 1,
      ease: "none",
      onUpdate: () => setStory(map(proxy.raw)),
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "max",
        scrub: reduced ? true : 0.65,
        invalidateOnRefresh: true,
        onRefresh: measure,
      },
    });
    kill = () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    setStory(map(proxy.raw));
  });

  return () => {
    dead = true;
    kill?.();
    kill = null;
  };
}
