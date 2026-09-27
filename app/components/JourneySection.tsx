"use client";

import { useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  DoorOpen,
  LogOut,
  Pill,
  Stethoscope,
} from "lucide-react";
import { gsap, deferScrollTriggers } from "@/app/lib/anim";
import { journey } from "@/app/lib/content";
import SpatialDecor from "./SpatialDecor";

const iconMap: Record<string, LucideIcon> = {
  datang: DoorOpen,
  daftar: ClipboardList,
  periksa: Stethoscope,
  resep: Pill,
  pulang: LogOut,
};

/**
 * PATIENT JOURNEY — titik masuk manusia dari sistem (PROMPTS #7).
 * Lima tahap menjadi alur data mini: connection menarik packet, tahap berikutnya
 * aktif. Mobile = tulang punggung vertikal statis (motion disederhanakan).
 */
export default function JourneySection() {
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
        const stages = q("[data-jr-stage]");
        const fills = q("[data-jr-fill]");
        const pulses = q("[data-jr-pulse]");
        const head = q("[data-jr-head]");
        const foot = q("[data-jr-foot]");

        /* keadaan awal eksplisit: tidak ada kedip konten sebelum timeline jalan */
        gsap.set([...head, ...stages, ...foot], { autoAlpha: 0, y: 26 });
        gsap.set(fills, { scaleX: 0 });
        gsap.set(pulses, { autoAlpha: 0, left: "0%" });

        const topAbs = () =>
          section.getBoundingClientRect().top + window.scrollY;

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: () => topAbs() - window.innerHeight * 0.78,
            toggleActions: "play none none none",
          },
        });

        tl.to(head, { autoAlpha: 1, y: 0, duration: 0.7 });

        stages.forEach((stage, i) => {
          tl.to(
            stage,
            { autoAlpha: 1, y: 0, duration: 0.55 },
            i === 0 ? "-=0.35" : ">-0.18",
          );
          const fill = fills[i];
          const pulse = pulses[i];
          if (!fill) return;
          tl.to(
            fill,
            { scaleX: 1, duration: 0.5, ease: "power2.inOut" },
            ">-0.05",
          );
          if (pulse) {
            tl.fromTo(
              pulse,
              { left: "0%", autoAlpha: 1 },
              { left: "100%", autoAlpha: 1, duration: 0.5, ease: "none" },
              "<",
            ).set(pulse, { autoAlpha: 0 });
          }
        });

        tl.to(foot, { autoAlpha: 1, y: 0, duration: 0.6 }, ">-0.2");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ...q("[data-jr-head]"),
            ...q("[data-jr-stage]"),
            ...q("[data-jr-foot]"),
          ],
          { autoAlpha: 1, y: 0 },
        );
        gsap.set(q("[data-jr-fill]"), { scaleX: 1 });
        gsap.set(q("[data-jr-pulse]"), { autoAlpha: 0 });
      });
    });

    return () => {
      alive = false;
      mm?.revert();
    };
  }, []);

  const last = journey.steps.length - 1;

  return (
    <section
      ref={sectionRef}
      id="perjalanan"
      className="relative bg-onyx-canvas px-4 py-20 md:px-6 md:py-28"
      aria-label="Patient Journey — perjalanan pasien lewat sistem"
    >
      <div className="tech-grid absolute inset-0 opacity-25" />
      {/* scrim: teks tetap terbaca saat scene 3D lewat di belakangnya */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,13,0.92)_0%,rgba(11,11,13,0.68)_38%,rgba(11,11,13,0.68)_70%,#0b0b0d_100%)]"
      />
      <SpatialDecor variant="tunnel" />
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div data-jr-head className="mb-12 grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-7">
            <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="shrink-0 text-[10px] tracking-[0.3em] text-ash-text uppercase">
                {journey.label}
              </span>
              <span className="h-px w-10 shrink-0 bg-slate-border/30" />
              <span className="shrink-0 text-[10px] tracking-[0.3em] text-ash-text/70 uppercase">
                05 tahap · 1 berkas
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.05] tracking-tight text-ivory-text">
              {journey.headline}
            </h2>
          </div>
          <div className="col-span-12 flex items-end md:col-span-5">
            <p className="text-[14px] leading-relaxed text-ash-text md:pl-8">
              {journey.sub}
            </p>
          </div>
        </div>

        <ol className="relative grid grid-cols-1 gap-y-9 lg:grid-cols-5 lg:gap-y-0">
          {/* tulang punggung vertikal — hanya mobile */}
          <span
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[17px] w-px bg-slate-border/40 lg:hidden"
          />
          {journey.steps.map((step, i) => {
            const Icon = iconMap[step.key] ?? DoorOpen;
            return (
              <li
                key={step.key}
                data-jr-stage
                className="relative flex items-start gap-4 lg:block lg:pr-6"
              >
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center border border-slate-border/60 bg-obsidian-button text-trust-blue">
                  <Icon size={15} strokeWidth={1.6} aria-hidden="true" />
                </span>

                {i < last && (
                  <span
                    data-jr-link
                    aria-hidden="true"
                    className="absolute top-[18px] right-0 left-9 hidden h-px lg:block"
                  >
                    <span
                      data-jr-fill
                      className="absolute inset-0 origin-left bg-trust-blue/70"
                    />
                    <span
                      data-jr-pulse
                      className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-trust-blue shadow-[0_0_10px_rgba(91,124,255,0.9)]"
                    />
                  </span>
                )}

                <div className="lg:mt-4">
                  <span className="font-mono text-[10px] tracking-[0.28em] text-ash-text/70 uppercase">
                    {String(i + 1).padStart(2, "0")} · {step.code}
                  </span>
                  <h3 className="mt-1.5 font-display text-lg font-medium tracking-tight text-ivory-text">
                    {step.label}
                  </h3>
                  <p className="mt-1.5 max-w-[30ch] text-[13px] leading-relaxed text-ash-text">
                    {step.desc}
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-[10px] tracking-[0.22em] text-ash-text/60 uppercase">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-trust-blue" />
                    {step.signal}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div
          data-jr-foot
          className="mt-12 flex items-center gap-3 border-t border-slate-border/25 pt-5 text-[10px] tracking-[0.3em] text-ash-text/70 uppercase"
        >
          <span className="status-dot" />
          Satu berkas kunjungan — lima tahap, nol entri ulang
        </div>
      </div>
    </section>
  );
}
