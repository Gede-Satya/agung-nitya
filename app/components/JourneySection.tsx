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

        /* keadaan awal eksplisit: tidak ada kedip konten sebelum timeline jalan */
        gsap.set([...head, ...stages], { autoAlpha: 0, y: 26 });
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
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ...q("[data-jr-head]"),
            ...q("[data-jr-stage]"),
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
      className="section-pad relative px-6 md:px-10"
      aria-label="Patient Journey — perjalanan pasien lewat sistem"
    >
      <div className="scrim-block relative z-10 mx-auto max-w-[1200px]">
        <div data-jr-head className="mb-16 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <div className="t-eyebrow mb-8 text-ash-text">{journey.label}</div>
            <h2 className="t-section text-ivory-text">{journey.headline}</h2>
          </div>
          <div className="col-span-12 flex items-end md:col-span-5">
            <p className="t-lede text-ash-text md:pl-10">{journey.sub}</p>
          </div>
        </div>

        <ol className="relative grid grid-cols-1 gap-y-12 lg:grid-cols-5 lg:gap-y-0">
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
                className="relative flex items-start gap-5 lg:block lg:pr-8"
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
                      className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-trust-blue"
                    />
                  </span>
                )}

                <div className="lg:mt-6">
                  <h3 className="font-display text-[17px] font-medium leading-snug tracking-tight text-ivory-text">
                    {step.label}
                  </h3>
                  <p className="mt-2.5 max-w-[30ch] text-[15px] leading-relaxed text-ash-text">
                    {step.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
