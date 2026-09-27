"use client";

import { useEffect, useRef } from "react";
import { gsap, deferScrollTriggers } from "@/app/lib/anim";
import { dataFlow } from "@/app/lib/content";
import SpatialDecor from "./SpatialDecor";

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
      className="relative bg-onyx-canvas px-4 py-20 md:px-6 md:py-28"
      aria-label="Alur data ambient — pendaftaran menuju billing"
    >
      <div className="tech-grid absolute inset-0 opacity-20" />
      {/* scrim: kartu node tidak tenggelam di atas objek 3D yang terang */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#0b0b0d_0%,rgba(11,11,13,0.7)_40%,rgba(11,11,13,0.7)_72%,#0b0b0d_100%)]"
      />
      <SpatialDecor variant="signal" />
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="shrink-0 text-[10px] tracking-[0.3em] text-ash-text uppercase">
                {dataFlow.label}
              </span>
              <span className="h-px w-10 shrink-0 bg-slate-border/30 md:w-16" />
              <span className="shrink-0 font-mono text-[10px] tracking-[0.3em] text-ash-text/60 uppercase">
                {dataFlow.nodes.map((n) => n.code).join(" → ")}
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.06] tracking-tight text-ivory-text">
              {dataFlow.headline}
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-relaxed text-ash-text md:text-right">
            {dataFlow.sub}
          </p>
        </div>

        {/* rail desktop */}
        <div
          aria-hidden="true"
          className="relative mb-7 hidden h-6 w-full overflow-hidden md:block"
        >
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-slate-border/40" />
          <span
            data-flow-rail
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 origin-left bg-gradient-to-r from-trust-blue/10 via-trust-blue/70 to-trust-blue/10"
          />
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              data-flow-packet
              className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-trust-blue shadow-[0_0_10px_rgba(91,124,255,0.9)]"
              style={{ left: `${-6 - i * 34}%` }}
            />
          ))}
        </div>

        <ol className="relative grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {dataFlow.nodes.map((node, i) => (
            <li
              key={node.code}
              data-flow-reveal
              className="relative border border-slate-border/30 bg-obsidian-button/80 p-6"
            >
              <span
                aria-hidden="true"
                className="absolute -top-7 left-7 hidden h-7 w-px bg-slate-border/40 md:block"
              />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.3em] text-trust-blue uppercase">
                  {node.code}
                </span>
                <span className="font-mono text-[10px] tracking-[0.3em] text-ash-text/50 uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-ivory-text">
                {node.label}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ash-text">
                {node.note}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-9 flex flex-wrap items-center gap-3 text-[10px] tracking-[0.3em] text-ash-text/70 uppercase">
          <span className="status-dot" />
          Paket data berjalan terus — tanpa salin, tanpa ketik ulang
        </div>
      </div>
    </section>
  );
}
