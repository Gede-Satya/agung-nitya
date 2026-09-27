"use client";

import { useEffect, useRef } from "react";
import { gsap, deferScrollTriggers } from "@/app/lib/anim";
import { problem } from "@/app/lib/content";

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
            q("[data-stat]"),
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.7 },
            "-=0.6",
          );
      },
    );

    mm.add("(prefers-reduced-motion: reduce)", () => {
        const q = gsap.utils.selector(section);
        gsap.set(
          [
            q("[data-pw]"),
            q("[data-pbody]"),
            q("[data-stat]"),
          ],
          { autoAlpha: 1, y: 0, yPercent: 0, scale: 1 },
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
      className="relative md:h-[200vh]"
      aria-label="Masalah — sistem terfragmentasi"
    >
      {/* bleed from the hero's ink into onyx */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-30 h-32 bg-gradient-to-b from-deep-canvas to-transparent md:h-44"
        aria-hidden="true"
      />
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden">
        <div className="relative mx-auto grid h-full max-w-[1200px] grid-cols-12 gap-6 px-6 py-24 md:px-10 md:py-28">
          {/* kiri — editorial; fragmentasi ditunjukkan oleh scene 3D di kanan */}
          <div className="scrim-inline relative col-span-12 flex flex-col justify-center md:col-span-7">
            <div className="t-eyebrow mb-9 text-ash-text">{problem.eyebrow}</div>

            <h2 className="t-section font-display text-ivory-text">
              {titleWords.map((w, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-top pt-[0.08em] -mb-[0.08em]"
                >
                  <span data-pw className="inline-block">
                    {w}
                    {i < titleWords.length - 1 ? "\u00A0" : ""}
                  </span>
                </span>
              ))}
            </h2>

            <p
              data-pbody
              className="t-lede mt-8 max-w-[52ch] text-ash-text"
            >
              {problem.body}
            </p>

            <div
              data-stat
              className="mt-10 flex max-w-[52ch] items-end justify-between gap-8 border-t border-slate-border/30 pt-6"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[clamp(3rem,5vw,4rem)] font-medium leading-none tracking-tight text-ivory-text">
                  {problem.statLine.slice(0, 1)}
                </span>
                <span className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-none tracking-tight text-ivory-text/70">
                  {problem.statLine.slice(1)}
                </span>
              </div>
              <p className="max-w-[26rem] text-right text-[15px] leading-snug text-ash-text">
                {problem.statCaption}
              </p>
            </div>
          </div>

          {/* kanan — ruang negatif: fragmentasi fisik terlihat di scene 3D */}
          <div className="hidden md:col-span-5 md:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
