"use client";

import { useEffect, useRef } from "react";
import { gsap, deferScrollTriggers } from "@/app/lib/anim";
import { solution } from "@/app/lib/content";
import SpatialDecor from "./SpatialDecor";

/**
 * 02 — The System. Sesi solusi: arsitektur bersama dijelaskan dalam bahasa
 * sederhana, saat visual 3D kembali terhubung (reconnection).
 */
export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let mm: gsap.MatchMedia | undefined;
    let alive = true;

    deferScrollTriggers().then(() => {
      if (!alive || !sectionRef.current) return;
      mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(section);
        const topAbs = () =>
          section.getBoundingClientRect().top + window.scrollY;
        const vh = () => window.innerHeight;
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: () => topAbs() - vh() * 0.72,
            toggleActions: "play none none none",
          },
        });
        tl.fromTo(
          q("[data-sys-line]"),
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
        )
          .fromTo(
            q("[data-sys-body]"),
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 0.8 },
            "-=0.55",
          )
          .fromTo(
            q("[data-sys-point]"),
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
            "-=0.5",
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const q = gsap.utils.selector(section);
        gsap.set(
          [
            q("[data-sys-line]"),
            q("[data-sys-body]"),
            q("[data-sys-point]"),
          ],
          { autoAlpha: 1, y: 0 },
        );
      });
    });

    return () => {
      alive = false;
      mm?.revert();
    };
  }, []);

  const headlineWords = solution.headline.split(" ");

  return (
    <section
      ref={sectionRef}
      id="sistem"
      className="relative bg-onyx-canvas px-4 py-24 md:px-6 md:py-36"
      aria-label="Solusi — satu basis data, seluruh unit terhubung"
    >
      <div className="tech-grid absolute inset-0 opacity-25" />
      <SpatialDecor variant="converge" />
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="grid grid-cols-12 gap-3">
          <div className="relative col-span-12 md:col-span-7">
            {/* scrim lokal: paragraf tetap terbaca di atas scene reconnection */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-4 right-0 -top-6 -bottom-6 bg-[linear-gradient(90deg,rgba(11,11,13,0.92),rgba(11,11,13,0.6)_62%,transparent)]"
            />
            <div className="relative">
            <div className="mb-8 flex items-center gap-3">
              <span className="text-[10px] tracking-[0.3em] text-ash-text uppercase">
                {solution.label}
              </span>
              <span className="h-px w-10 bg-trust-blue" />
            </div>

            <h2 className="font-display font-medium leading-[1.02] tracking-tight text-ivory-text">
              {headlineWords.map((w, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-top pt-[0.08em] -mb-[0.08em]"
                >
                  <span
                    data-sys-line
                    className="inline-block text-[clamp(2.1rem,4.6vw,3.9rem)]"
                  >
                    {i >= 2 ? (
                      <span className="stroke-text">{w}</span>
                    ) : (
                      w
                    )}
                    {i < headlineWords.length - 1 ? "\u00A0" : ""}
                  </span>
                </span>
              ))}
            </h2>

            <p
              data-sys-body
              className="mt-7 max-w-lg text-[15px] leading-relaxed text-ash-text"
            >
              {solution.body}
            </p>
            </div>
          </div>

          <div className="col-span-12 flex flex-col justify-center gap-3 md:col-span-5">
            <div className="panel p-6">
              <div className="flex items-center justify-between border-b border-slate-border/40 pb-4">
                <span className="text-[10px] tracking-[0.3em] text-ivory-text uppercase">
                  Satu sumber kebenaran
                </span>
                <span className="status-dot" />
              </div>
              <ul className="mt-5 space-y-4">
                {solution.points.map((point) => (
                  <li
                    key={point}
                    data-sys-point
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-trust-blue" />
                    <span className="text-[14px] leading-relaxed text-ash-text">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-slate-border/40 pt-4">
                <span className="text-[10px] tracking-[0.25em] text-ash-text/70 uppercase">
                  One database · every unit connected
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 text-[10px] tracking-[0.3em] text-ash-text/70 uppercase">
          <span className="status-dot" />
          Fragmentasi berakhir — satu alur data untuk seluruh unit
        </div>
      </div>
    </section>
  );
}
