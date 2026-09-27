"use client";

import { useEffect, useRef } from "react";
import { gsap, deferScrollTriggers } from "@/app/lib/anim";
import { problem } from "@/app/lib/content";
import SpatialDecor from "./SpatialDecor";

const fragments = ["Pendaftaran", "Apotek", "Kasir"];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let mm: gsap.MatchMedia | undefined;
    let alive = true;

    deferScrollTriggers().then(() => {
      if (!alive || !sectionRef.current) return;
      mm = gsap.matchMedia();

      mm.add(
        {
          desktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const q = gsap.utils.selector(section);
          const wordEls = q("[data-pw]");
          const isDesktop = !!ctx.conditions?.desktop;
          const topAbs = () =>
            section.getBoundingClientRect().top + window.scrollY;
          const tl = gsap.timeline({
            defaults: { ease: "power4.out" },
            scrollTrigger: {
              trigger: section,
              start: () =>
                isDesktop
                  ? topAbs() - window.innerHeight * 0.82
                  : topAbs() - window.innerHeight * 0.8,
              end: () =>
                isDesktop
                  ? topAbs() + window.innerHeight * 0.2
                  : topAbs() + section.offsetHeight - window.innerHeight * 0.25,
              scrub: 0.6,
            },
          });
        gsap.set(wordEls, { yPercent: 118 });
        tl.to(wordEls, { yPercent: 0, duration: 1, stagger: 0.03 })
          .fromTo(
            q("[data-pbody]"),
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 0.8 },
            "-=0.7",
          )
          .fromTo(
            q("[data-shard]"),
            { autoAlpha: 0, y: 20, scale: 0.94 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.06 },
            "-=0.7",
          )
          .fromTo(
            q("[data-stat]"),
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.7 },
            "-=0.6",
          )
          .fromTo(
            q("[data-merge]"),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.5, ease: "power3.inOut" },
            "<0.2",
          );
      },
    );

    mm.add("(prefers-reduced-motion: reduce)", () => {
        const q = gsap.utils.selector(section);
        gsap.set(
          [
            q("[data-pw]"),
            q("[data-pbody]"),
            q("[data-shard]"),
            q("[data-stat]"),
            q("[data-merge]"),
          ],
          { autoAlpha: 1, y: 0, yPercent: 0, scale: 1, scaleX: 1 },
        );
      });
    });

    return () => {
      alive = false;
      mm?.revert();
    };
  }, []);

  const titleWords = problem.title.split(" ");

  return (
    <section
      ref={sectionRef}
      id="masalah"
      className="relative bg-onyx-canvas md:h-[200vh]"
      aria-label="Masalah — sistem terfragmentasi"
    >
      {/* bleed from the hero's ink into onyx */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-30 h-32 bg-gradient-to-b from-deep-canvas to-transparent md:h-44"
        aria-hidden="true"
      />
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden">
        <div className="tech-grid absolute inset-0 opacity-40" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(75% 60% at 82% 40%, rgba(91,124,255,0.06) 0%, rgba(11,11,13,0) 60%), linear-gradient(180deg, #0b0b0d 0%, rgba(11,11,13,0.14) 50%, #0b0b0d 100%)",
          }}
        />
        <SpatialDecor variant="fragment" />

        {/* watermark */}
        <div className="pointer-events-none absolute top-6 right-0 z-0 font-display text-[clamp(8rem,22vw,20rem)] font-medium leading-none tracking-tighter text-transparent opacity-[0.05] [-webkit-text-stroke:1px_rgba(237,237,243,0.4)] select-none">
          01
        </div>

        <div className="relative z-10 mx-auto grid h-full max-w-[1200px] grid-cols-12 gap-3 px-4 py-20 md:px-6">
          {/* left — editorial */}
          <div className="relative col-span-12 flex flex-col justify-center md:col-span-7">
            {/* scrim lokal: teks tetap terbaca saat scene 3D lewat di belakangnya */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-4 right-0 -top-6 -bottom-6 bg-[linear-gradient(90deg,rgba(11,11,13,0.92),rgba(11,11,13,0.6)_62%,transparent)]"
            />
            <div className="relative">
            <div className="mb-8 flex items-center gap-3">
              <span className="text-[10px] tracking-[0.3em] text-ash-text uppercase">
                {problem.eyebrow}
              </span>
              <span className="h-px flex-1 bg-slate-border/30" />
              <span className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-ash-text uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-border" />
                Fase 1 — Fragment
              </span>
            </div>

            <h2 className="font-display font-medium leading-[1.02] tracking-tight text-ivory-text">
              {titleWords.map((w, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-top pt-[0.08em] -mb-[0.08em]"
                >
                  <span
                    data-pw
                    className="inline-block text-[clamp(2.1rem,4.6vw,3.9rem)]"
                  >
                    {w.startsWith("banyak") || w.startsWith("sistem") ? (
                      <span className="stroke-text">{w}</span>
                    ) : (
                      w
                    )}
                    {i < titleWords.length - 1 ? "\u00A0" : ""}
                  </span>
                </span>
              ))}
            </h2>

            <p
              data-pbody
              className="mt-7 max-w-lg text-[15px] leading-relaxed text-ash-text"
            >
              {problem.body}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {fragments.map((f, i) => {
                const last = i === fragments.length - 1;
                return (
                  <span key={f} className="flex items-center gap-2">
                    <span
                      data-shard
                      className="rounded-full border border-slate-border/40 bg-obsidian-button px-4 py-1.5 text-[10px] tracking-[0.25em] text-ash-text uppercase"
                    >
                      {f}
                    </span>
                    {!last ? (
                      <span className="block h-px w-5 border-t border-dashed border-slate-border/50" />
                    ) : null}
                  </span>
                );
              })}
              <span className="ml-2 flex items-center gap-2">
                <span
                  data-merge
                  className="block h-px w-9 origin-left bg-trust-blue"
                />
                <span className="text-[10px] tracking-[0.25em] text-ash-text uppercase">
                  1 basis data
                </span>
              </span>
            </div>
            </div>
          </div>

          {/* right — ruang negatif: fragmentasi ditunjukkan oleh scene 3D */}
          <div className="col-span-12 flex flex-col justify-center md:col-span-5">
            <div data-stat className="flex items-end justify-between gap-6 px-1">
              <div className="flex items-end gap-2">
                <span className="font-display text-[clamp(4.5rem,9vw,7.5rem)] font-medium leading-[0.85] tracking-tight text-ivory-text">
                  {problem.statLine.slice(0, 1)}
                </span>
                <span className="stroke-text -mb-1 font-display text-[clamp(2.4rem,5vw,4rem)] font-medium leading-none">
                  {problem.statLine.slice(1)}
                </span>
              </div>
              <p className="max-w-[13rem] text-right text-[10px] leading-snug text-ash-text">
                {problem.statCaption}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-6 hidden items-center gap-3 text-[10px] tracking-[0.35em] text-ash-text/70 uppercase md:flex">
          <span className="status-dot" />
          Simulasi rekonsiliasi berhenti — satu entri tersisa
        </div>
      </div>
    </section>
  );
}
