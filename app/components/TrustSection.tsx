"use client";

import { useEffect, useRef } from "react";
import { gsap, afterScrollReady } from "@/app/lib/anim";
import { metrics, trustIntro } from "@/app/lib/content";

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

  return (
    <section
      ref={sectionRef}
      id="tolok-ukur"
      className="section-pad relative px-6 md:px-10"
      aria-label="Tolok ukur layanan"
    >
      <div className="relative mx-auto max-w-[1200px]">
        <div className="scrim-block relative z-10 mb-14 flex items-center gap-4">
          <span className="t-eyebrow text-ash-text">{trustIntro.label}</span>
          <span className="h-px flex-1 bg-slate-border/30" />
          <span className="t-eyebrow text-ash-text/70">{trustIntro.sub}</span>
        </div>

        <h2 className="t-section relative z-10 mb-14 max-w-[22ch] text-ivory-text">
          {trustIntro.headline}
        </h2>

        <div className="scrim-block grid grid-cols-1 border-t border-slate-border/30 md:grid-cols-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              data-trust-block
              className="hairline-b border-slate-border/25 py-9 md:border-b-0 md:border-l md:px-9 md:py-11 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <div className="flex items-baseline gap-2">
                <span
                  data-counter
                  className="font-display text-[clamp(3rem,6vw,4.4rem)] font-medium leading-none tracking-tight text-ivory-text tabular-nums"
                >
                  0
                </span>
                <span className="font-display text-[clamp(1.2rem,2vw,1.6rem)] font-medium leading-none text-ivory-text/70">
                  {m.suffix}
                </span>
              </div>
              <h3 className="mt-6 text-[17px] leading-snug text-ivory-text">
                {m.label}
              </h3>
              <p className="t-body mt-2 text-ash-text">{m.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
