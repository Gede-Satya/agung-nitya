"use client";

import { useEffect, useRef } from "react";
import { gsap, afterScrollReady } from "@/app/lib/anim";
import { metrics, trustIntro } from "@/app/lib/content";
import SpatialDecor from "./SpatialDecor";

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let mm: gsap.MatchMedia | undefined;
    let alive = true;

    afterScrollReady(2, () => {
      if (!alive || !sectionRef.current) return;
      const q = gsap.utils.selector(section);
      q("[data-counter]").forEach((el) => {
        el.textContent = "0";
      });

      mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const blocks = q("[data-trust-block]");
        const start = () =>
          section.getBoundingClientRect().top +
          window.scrollY -
          window.innerHeight * 0.72;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start,
            toggleActions: "play none none none",
          },
          defaults: { ease: "power3.out" },
        });
        tl.fromTo(
          blocks,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.14 },
        ).fromTo(
          q("[data-vline]"),
          { scaleY: 0 },
          { scaleY: 1, duration: 1.1, ease: "power2.inOut" },
          "-=0.6",
        );

        metrics.forEach((m, i) => {
          if (m.value === 0) return;
          const el = q("[data-counter]")[i];
          if (!el) return;
          const obj = { v: 0 };
          tl.add(
            gsap.fromTo(
              obj,
              { v: 0 },
              {
                v: m.value,
                duration: 1.3,
                ease: "power3.out",
                onUpdate: () => {
                  el.textContent = String(Math.round(obj.v));
                },
              },
            ),
            "-=0.5",
          );
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q("[data-trust-block]"), { autoAlpha: 1, y: 0 });
        gsap.set(q("[data-vline]"), { scaleY: 1 });
        q("[data-counter]").forEach((el, i) => {
          el.textContent = String(metrics[i].value);
        });
      });
    });

    return () => {
      alive = false;
      mm?.revert();
    };
  }, []);

  const [a, b, c] = metrics;

  return (
    <section
      ref={sectionRef}
      id="tolok-ukur"
      className="relative bg-onyx-canvas px-4 py-24 md:px-6 md:py-36"
      aria-label="Tolok ukur layanan"
    >
      <div className="tech-grid absolute inset-0 opacity-30" />
      <SpatialDecor variant="signal" />
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="mb-14 flex items-center gap-3">
          <span className="text-[10px] tracking-[0.3em] text-ash-text uppercase">
            {trustIntro.label}
          </span>
          <span className="h-px flex-1 bg-slate-border/30" />
          <span className="text-[10px] tracking-[0.3em] text-ash-text/70 uppercase">
            {trustIntro.sub}
          </span>
        </div>

        <h2 className="mb-12 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.02] tracking-tight text-ivory-text">
          {trustIntro.headline}
        </h2>

        <div className="grid grid-cols-12 gap-3">
          {/* primary metric */}
          <div
            data-trust-block
            className="relative col-span-12 overflow-hidden border border-slate-border/25 p-8 md:col-span-7 md:p-12"
          >
            <div className="tech-grid absolute inset-0 opacity-40" />
            <div className="relative flex min-h-[26vh] flex-col justify-between">
              <div className="flex items-baseline gap-3">
                <span
                  data-counter
                  className="font-display text-[clamp(6rem,16vw,13rem)] font-medium leading-[0.8] tracking-tighter text-ivory-text tabular-nums"
                >
                  0
                </span>
                <span className="stroke-text font-display text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[0.8]">
                  {a.suffix}
                </span>
              </div>
              <div className="mt-8">
                <h3 className="font-display text-xl font-medium tracking-tight text-ivory-text md:text-2xl">
                  {a.label}
                </h3>
                <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-ash-text">
                  {a.note}
                </p>
              </div>
            </div>
              <span data-vline className="absolute left-0 top-0 h-full w-px origin-top bg-trust-blue/50" />
          </div>

          {/* secondary pair */}
          <div className="col-span-12 grid gap-3 md:col-span-5">
            <div
              data-trust-block
              className="relative flex items-center justify-between gap-6 border border-slate-border/25 p-7 md:p-9"
            >
              <div>
                <div className="flex items-baseline gap-2">
                  <span
                    data-counter
                    className="font-display text-[clamp(3.4rem,7vw,5.6rem)] font-medium leading-none tracking-tighter text-ivory-text tabular-nums"
                  >
                    0
                  </span>
                  <span className="stroke-text font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-none">
                    {b.suffix}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[15px] font-medium tracking-tight text-ivory-text">
                  {b.label}
                </h3>
                <p className="mt-1.5 text-[12px] leading-snug text-ash-text">{b.note}</p>
              </div>
              <span className="hidden h-full min-h-16 shrink-0 w-px bg-slate-border/25 md:block" />
            </div>

            <div
              data-trust-block
              className="relative flex items-center justify-between gap-6 border border-slate-border/25 p-7 md:p-9"
            >
              <div>
                <div className="relative flex w-fit items-center">
                  <span
                    data-counter
                    className="font-display text-[clamp(3.4rem,7vw,5.6rem)] font-medium leading-none tracking-tighter text-ivory-text tabular-nums"
                  >
                    0
                  </span>
                  <span className="absolute left-[-4%] top-[22%] h-[3px] w-[108%] -rotate-12 bg-trust-blue" />
                </div>
                <h3 className="mt-4 font-display text-[15px] font-medium tracking-tight text-ivory-text">
                  {c.label}
                </h3>
                <p className="mt-1.5 text-[12px] leading-snug text-ash-text">{c.note}</p>
              </div>
              <span className="hidden h-full min-h-16 shrink-0 w-px bg-slate-border/25 md:block" />
            </div>
          </div>
        </div>

        <div data-trust-block className="mt-3 flex items-center gap-8 overflow-hidden">
          <span className="h-px w-16 shrink-0 bg-trust-blue" />
          <span className="truncate text-[10px] tracking-[0.3em] text-ash-text/70 uppercase">
            {a.label}
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-slate-border/50" />
          <span className="truncate text-[10px] tracking-[0.3em] text-ash-text/70 uppercase">
            {b.label}
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-slate-border/50" />
          <span className="truncate text-[10px] tracking-[0.3em] text-ash-text/70 uppercase">
            {c.label}
          </span>
        </div>
      </div>
    </section>
  );
}
