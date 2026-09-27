"use client";

import { useEffect, useRef } from "react";
import { gsap, deferScrollTriggers } from "@/app/lib/anim";
import { dataFlow } from "@/app/lib/content";

/**
 * AMBIENT DATA FLOW (PROMPTS #9) — Pendaftaran → RME → Billing.
 * Rail horizontal dengan packet yang terus bergerak (CSS/GSAP, bukan WebGL).
 * Berhenti saat seksi keluar viewport (IntersectionObserver) dan saat
 * prefers-reduced-motion; mobile memakai tulang punggung vertikal statis.
 */
export default function DataFlowSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let mm: gsap.MatchMedia | undefined;
    let alive = true;

    deferScrollTriggers().then(() => {
      if (!alive || !sectionRef.current) return;
      mm = gsap.matchMedia();
      const q = gsap.utils.selector(section);

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(q("[data-flow-reveal]"), { autoAlpha: 0, y: 26 });
        gsap.set(q("[data-flow-rail]"), { scaleX: 0 });

        const topAbs = () =>
          section.getBoundingClientRect().top + window.scrollY;

        const reveal = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: () => topAbs() - window.innerHeight * 0.82,
            toggleActions: "play none none none",
          },
        });
        reveal
          .to(q("[data-flow-rail]"), { scaleX: 1, duration: 0.9, ease: "power2.inOut" })
          .to(
            q("[data-flow-reveal]"),
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 },
            "-=0.55",
          );

        /* packet horizontal — hanya desktop, hanya saat seksi terlihat */
        const tweens: gsap.core.Tween[] = [];
        if (window.matchMedia("(min-width: 768px)").matches) {
          const packets = q("[data-flow-packet]");
          gsap.set(packets, { left: "-6%" });
          packets.forEach((packet, i) => {
            tweens.push(
              gsap.to(packet, {
                left: "106%",
                duration: 3.4,
                ease: "none",
                repeat: -1,
                delay: i * 1.15,
                paused: true,
              }),
            );
          });

          const io = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                for (const tween of tweens) {
                  if (entry.isIntersecting) tween.play();
                  else tween.pause();
                }
              }
            },
            { threshold: 0.12 },
          );
          io.observe(section);

          return () => {
            io.disconnect();
            tweens.forEach((tween) => tween.kill());
          };
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q("[data-flow-reveal]"), { autoAlpha: 1, y: 0 });
        gsap.set(q("[data-flow-rail]"), { scaleX: 1 });
        gsap.set(q("[data-flow-packet]"), { autoAlpha: 0 });
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
      id="alur-data"
      className="section-pad relative px-6 md:px-10"
      aria-label="Alur data ambient — pendaftaran menuju billing"
    >
      <div className="scrim-block relative z-10 mx-auto max-w-[1200px]">
        <div className="relative z-10 mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="t-eyebrow mb-8 text-ash-text">{dataFlow.label}</div>
            <h2 className="t-section text-ivory-text">{dataFlow.headline}</h2>
          </div>
          <p className="t-lede max-w-md text-ash-text md:text-right">
            {dataFlow.sub}
          </p>
        </div>

        {/* rail desktop */}
        <div
          aria-hidden="true"
          className="relative mb-9 hidden h-6 w-full overflow-hidden md:block"
        >
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-slate-border/40" />
          <span
            data-flow-rail
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 origin-left bg-gradient-to-r from-trust-blue/10 via-trust-blue/70 to-trust-blue/10"
          />
          {[0, 1].map((i) => (
            <span
              key={i}
              data-flow-packet
              className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-trust-blue"
              style={{ left: `${-6 - i * 46}%` }}
            />
          ))}
        </div>

        <ol className="scrim-block relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {dataFlow.nodes.map((node) => (
            <li
              key={node.code}
              data-flow-reveal
              className="relative border-t border-slate-border/40 pt-7"
            >
              <span className="t-eyebrow block text-trust-blue">
                {node.code}
              </span>
              <h3 className="mt-5 font-display text-[26px] font-medium leading-tight tracking-tight text-ivory-text">
                {node.label}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ash-text">
                {node.note}
              </p>
            </li>
          ))}
        </ol>

        <p className="scrim-block mt-12 text-[15px] leading-relaxed text-ash-text/80">
          Paket data berjalan terus — tanpa salin, tanpa ketik ulang.
        </p>
      </div>
    </section>
  );
}
