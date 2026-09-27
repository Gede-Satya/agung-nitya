"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== "undefined") {
  (window as unknown as { gsap?: typeof gsap }).gsap = gsap;
  (window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;
}

/* ScrollTrigger mengukur posisi saat trigger dibuat. Pin hero dibuat belakangan
   (setelah Loader selesai / hydration), sehingga trigger yang dibuat saat mount
   menyimpan posisi yang salah (selisih tinggi pin-spacer hero) dan refresh
   internal tidak memperbaikinya. Seluruh pembuatan trigger seksi di-side
   sampaikan lewat deferScrollTriggers() supaya mengukur layout final. */
let resolveHeroPinned: (() => void) | null = null;
const heroPinned = new Promise<void>((resolve) => {
  resolveHeroPinned = resolve;
});

export const heroPinnedEvent = "agung:hero-pinned";

export const markHeroPinned = () => {
  (window as unknown as { __heroPinnedMarked?: boolean }).__heroPinnedMarked = true;
  resolveHeroPinned?.();
  resolveHeroPinned = null;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(heroPinnedEvent));
  }
};

const afterRaf = (frames: number) =>
  new Promise<void>((resolve) => {
    const tick = () =>
      frames-- <= 0 ? resolve() : requestAnimationFrame(tick);
    requestAnimationFrame(tick);
  });

/* Jalankan callback setelah pin hero ada, lalu setelah `frames` rAF. Pakai
   DOM event (bukan Promise.then) supaya bebas dari kendala transform callback
   promise di build, lalu tetap diberi garansi urutan yang sama: tahap ini pasti
   berjalan setelah setup pin (tahap A) selesai. */
export const afterScrollReady = (frames: number, cb: () => void) => {
  if (typeof window === "undefined") return;
  const run = () => {
    let f = frames;
    const tick = () => (f-- <= 0 ? cb() : requestAnimationFrame(tick));
    requestAnimationFrame(tick);
  };
  if ((window as unknown as { __heroPinnedMarked?: boolean }).__heroPinnedMarked) {
    run();
  } else {
    window.addEventListener(heroPinnedEvent, run, { once: true });
  }
};

/* Tahap A — pembuatan pin (pin proses). Trigger tahap ini harus selesai dulu
   supaya pengukuran tahap B mencakup spacer pin proses. */
export const deferPinSetups = () => heroPinned.then(() => afterRaf(1));

/* Tahap B — semua trigger reveal/scrub/tracking lain. Dua rAF membuat tahap ini
   pasti berjalan setelah setup pin (tahap A) selesai, berapa pun urutan
   subscription component-nya. */
export const deferScrollTriggers = () => heroPinned.then(() => afterRaf(2));

export { gsap, ScrollTrigger };