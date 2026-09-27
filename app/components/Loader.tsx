"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/anim";

export default function Loader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const counter = root.querySelector("[data-counter]");
    const line = root.querySelector("[data-line]") as HTMLElement | null;
    const lines = root.querySelectorAll("[data-lines]");
    const complete = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDone();
    };

    if (reduce) {
      gsap.to(root, { autoAlpha: 0, duration: 0.001, onComplete: complete });
      return;
    }

    const obj = { v: 0 };
    const tl = gsap.timeline({ onComplete: complete });

    tl.to(obj, {
      v: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counter) {
          counter.textContent = String(Math.round(obj.v)).padStart(3, "0");
        }
        if (line) line.style.transform = `scaleY(${obj.v / 100})`;
      },
    })
      .to(lines, {
        yPercent: -110,
        duration: 0.8,
        ease: "power4.inOut",
        stagger: 0.04,
      })
      .to(root, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
      })
      .set(root, { display: "none" });

    /* Safety net: if the rAF-driven timeline is ever blocked (tab throttling,
    Lenis/GSAP stall), never let the overlay blank the app forever. */
    const failsafe = window.setTimeout(complete, 4000);
    return () => window.clearTimeout(failsafe);
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[400] flex flex-col justify-between bg-onyx-canvas px-6 py-6 md:px-10 md:py-8"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between">
        <span
          data-lines
          className="font-display text-[11px] tracking-[0.3em] text-ivory-text/70 uppercase"
        >
          Agung Nitya
        </span>
        <span
          data-lines
          className="text-[10px] tracking-[0.3em] text-ash-text uppercase"
        >
          SIMRS — Sistem Informasi Manajemen Rumah Sakit
        </span>
      </div>

      <div className="relative mx-auto flex min-h-[30vh] w-full max-w-6xl items-center">
        <span
          data-lines
          className="font-display text-[clamp(2.4rem,9vw,8rem)] font-medium leading-[0.9] tracking-[-0.03em] text-transparent [-webkit-text-stroke:1px_rgba(237,237,243,0.5)]"
        >
          Satu sistem.
          <br />
          Satu bahasa.
          <br />
          Satu basis data.
        </span>
      </div>

      <div className="flex items-end justify-between">
        <span data-lines className="text-[10px] tracking-[0.3em] text-ash-text uppercase">
          Menghubungkan unit…
        </span>
        <div className="flex items-center gap-4">
          <span data-lines className="text-[10px] tracking-[0.3em] text-ash-text uppercase">
            Inisialisasi
          </span>
          <span
            data-counter
            className="font-display text-2xl font-medium tabular-nums text-ivory-text md:text-3xl"
          >
            000
          </span>
        </div>
      </div>

      <div
        data-line
        className="absolute top-0 right-6 h-full w-px origin-top bg-trust-blue md:right-12"
      />
    </div>
  );
}