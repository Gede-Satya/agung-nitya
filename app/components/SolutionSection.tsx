"use client";

import { useEffect, useRef } from "react";
import { gsap, deferScrollTriggers } from "@/app/lib/anim";
import { solution } from "@/app/lib/content";

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
      className="section-pad-tall relative px-6 md:px-10"
      aria-label="Solusi — satu basis data, seluruh unit terhubung"
    >
      {/* MOMEN UTAMA: tesis ditulis besar di atas sistem yang kembali menyatu.
          Scrim hanya di belakang blok teks; artefak tetap terbaca di sekelilingnya. */}
      <div className="scrim-block relative z-10 mx-auto max-w-[1040px] text-center">
        <div className="t-eyebrow mb-10 text-ash-text">{solution.label}</div>

        <h2 className="t-section relative z-10 font-display text-ivory-text">
          {headlineWords.map((w, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-top pt-[0.08em] -mb-[0.08em]"
            >
              <span data-sys-line className="inline-block">
                {w}
                {i < headlineWords.length - 1 ? "\u00A0" : ""}
              </span>
            </span>
          ))}
        </h2>

        <p
          data-sys-body
          className="t-lede relative z-10 mx-auto mt-9 max-w-[54ch] text-ash-text"
        >
          {solution.body}
        </p>

        <ul className="relative z-10 mt-16 grid grid-cols-1 gap-8 border-t border-slate-border/40 pt-10 text-left md:grid-cols-3 md:gap-10">
          {solution.points.map((point) => (
            <li key={point} data-sys-point className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-trust-blue"
              />
              <span className="text-[16px] leading-relaxed text-ivory-text/85">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
