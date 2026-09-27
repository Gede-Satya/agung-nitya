"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, deferPinSetups } from "@/app/lib/anim";
import { useHydratedReducedMotion, useMediaQuery } from "@/app/lib/motion";
import { phases, processIntro, type Phase } from "@/app/lib/content";
import {
  ScanSearch,
  DatabaseBackup,
  UserRoundCheck,
  Rocket,
  ArrowDownRight,
} from "lucide-react";
import SpatialDecor from "./SpatialDecor";

function Deck({
  phase,
  staticMode = false,
}: {
  phase: Phase;
  staticMode?: boolean;
}) {
  if (phase.number === "01") {
    return (
      <div className="relative w-full">
        <div className="flex items-center justify-between">
          <ScanSearch className="h-5 w-5 text-ash-text/50" strokeWidth={1.6} />
          <span className="text-[9px] tracking-[0.3em] text-ash-text/70 uppercase">
            Audit alur
          </span>
        </div>
        <ul className="mt-7 space-y-5">
          {["Alur tiap unit", "Kebutuhan medis & non-medis", "Data historis"].map(
            (label, i) => (
              <li key={label} className="flex items-center gap-3">
                <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                  <span className="h-4 w-4 rounded-[3px] border border-slate-border/50 bg-obsidian-button" />
                  <span className="p-blip absolute h-4 w-4 rounded-[3px] bg-trust-blue" />
                </span>
                <span
                  className="p-fill block h-px flex-1 origin-left bg-slate-border/60"
                  style={{ width: `${100 - i * 18}%` }}
                />
                <span className="shrink-0 text-[11px] tracking-[0.15em] text-ash-text uppercase">
                  {label}
                </span>
              </li>
            ),
          )}
        </ul>
        <p className="mt-8 text-[11px] lowercase leading-relaxed text-ash-text/70">
          memetakan titik-titik yang harus menyatu sebelum satu baris data pun
          dipindahkan.
        </p>
      </div>
    );
  }

  if (phase.number === "02") {
    return (
      <div className="relative w-full">
        <div className="flex items-center justify-between">
          <DatabaseBackup className="h-5 w-5 text-ash-text/50" strokeWidth={1.6} />
          <span className="text-[9px] tracking-[0.3em] text-ash-text/70 uppercase">
            Satu tujuan
          </span>
        </div>
        <div className="mt-7 space-y-3">
          {[100, 82, 64, 46].map((w, i) => (
            <div key={w} className="flex items-center gap-3">
              <span
                className="p-fill block h-1.5 origin-left rounded-full bg-slate-border/70"
                style={{ width: `${w}%` }}
              />
              <span className="text-[9px] tracking-[0.2em] text-ash-text/50">
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3">
          <span className="p-blip flex h-10 items-center rounded-md border border-trust-blue/40 bg-obsidian-button px-3 text-[9px] tracking-[0.25em] text-ivory-text">
            1 BASIS DATA
          </span>
          <span className="text-[11px] text-ash-text/70">
            verifikasi di tiap tahap
          </span>
        </div>
      </div>
    );
  }

  if (phase.number === "03") {
    return (
      <div className="relative w-full">
        <div className="flex items-center justify-between">
          <UserRoundCheck className="h-5 w-5 text-ash-text/50" strokeWidth={1.6} />
          <span className="text-[9px] tracking-[0.3em] text-ash-text/70 uppercase">
            Manusia dulu
          </span>
        </div>
        <div className="mt-7 grid w-fit grid-cols-3 gap-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-border/40 bg-obsidian-button"
            >
              <span className="p-blip absolute inset-0 rounded-full bg-trust-blue/80" />
            </span>
          ))}
        </div>
        <p className="mt-7 text-[11px] lowercase leading-relaxed text-ash-text/70">
          staf medis, farmasi, laboratorium & administrasi dibiasakan sebelum
          sistem diluncurkan.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex w-full items-stretch gap-6">
      <div className="relative h-40 w-2 shrink-0">
        <span
          className="p-beam absolute inset-x-0 bottom-0 top-0 origin-bottom bg-trust-blue/60"
          style={{ transform: staticMode ? "scaleY(1)" : "scaleY(0)" }}
        />
        <span className="p-launch absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-trust-blue shadow-[0_0_12px_rgba(91,124,255,0.8)]" />
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-border/40 bg-obsidian-button px-3.5 py-1.5">
          <span className="p-blink h-1.5 w-1.5 rounded-full bg-trust-blue" />
          <span className="text-[9px] tracking-[0.3em] text-ivory-text">
            SISTEM AKTIF
          </span>
        </div>
        <p className="text-[11px] lowercase leading-relaxed text-ash-text/70">
          peluncuran dengan pendampingan di lapangan hingga seluruh unit
          berjalan pada satu alur.
        </p>
      </div>
      <Rocket className="p-blip absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 text-ash-text/40" strokeWidth={1.4} />
    </div>
  );
}

function StagePanel({
  phase,
  index,
  className,
  staticMode = false,
}: {
  phase: Phase;
  index: number;
  className: string;
  staticMode?: boolean;
}) {
  return (
    <article
      className={`proc-stage relative flex shrink-0 flex-col justify-center gap-8 border-l border-slate-border/20 ${className}`}
    >
      <div className="absolute right-2 top-8 flex items-center gap-2 md:right-6">
        <span className="text-[9px] tracking-[0.3em] text-ash-text/70 uppercase">
          Stage {String(index + 1).padStart(2, "0")} / 04
        </span>
      </div>

      <div className="flex items-start justify-between gap-6">
        <span className="stroke-text p-info font-display text-[clamp(4rem,9vw,8rem)] font-medium leading-none tracking-tighter">
          {phase.number}
        </span>
        <span className="p-info mt-3 hidden text-[10px] tracking-[0.35em] text-ash-text/70 uppercase lg:block">
          {phase.code}
        </span>
      </div>

      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="p-info">
          <h3 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-tight tracking-tight text-ivory-text">
            {phase.name}
          </h3>
          <p className="mt-4 text-[14px] leading-relaxed text-ash-text">
            {phase.body}
          </p>
        </div>
        <div className="panel p-6 p-rise-back">
          <Deck phase={phase} staticMode={staticMode} />
        </div>
      </div>
    </article>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useHydratedReducedMotion();
  const desktopViewport = useMediaQuery("(min-width: 1024px)");
  const useHorizontalRail = desktopViewport && !reduceMotion;
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const activePhase = phases[activePhaseIndex] ?? phases[0];
  const stageTransition = reduceMotion
    ? { duration: 0.12, ease: [0.2, 0, 0, 1] as [number, number, number, number] }
    : { duration: 0.32, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  const stageVariants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 },
  };

  useLayoutEffect(() => {
    if (!useHorizontalRail) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    let mm: gsap.MatchMedia | undefined;
    let alive = true;
    if (barRef.current) gsap.set(barRef.current, { scaleX: 0 });

    deferPinSetups().then(() => {
      if (!alive || !sectionRef.current || !trackRef.current) return;
      const track = trackRef.current;
      mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const getTravel = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          const master = gsap.to(track, {
            x: () => -getTravel(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: () =>
                section.getBoundingClientRect().top + window.scrollY,
              end: () => "+=" + getTravel(),
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (barRef.current)
                  barRef.current.style.transform = `scaleX(${self.progress})`;
              },
            },
          });

          gsap.utils.toArray<HTMLElement>(".proc-stage").forEach((stage) => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: stage,
                containerAnimation: master,
                start: "left 78%",
                end: "left 12%",
                scrub: 0.5,
              },
            });

            const stageEl = (sel: string) =>
              gsap.utils.toArray<HTMLElement>(stage.querySelectorAll(sel));

            const add = (
              targets: HTMLElement[],
              from: gsap.TweenVars,
              to: gsap.TweenVars,
              position: number,
            ) => {
              if (targets.length) tl.fromTo(targets, from, to, position);
            };

            add(
              stageEl(".p-info"),
              { y: 34, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.12 },
              0,
            );
            add(
              stageEl(".p-fill"),
              { scaleX: 0 },
              { scaleX: 1, duration: 0.9, stagger: 0.15, ease: "none" },
              0.05,
            );
            add(
              stageEl(".p-blip"),
              { scale: 0.3, autoAlpha: 0 },
              { scale: 1, autoAlpha: 1, duration: 0.3, stagger: 0.1, ease: "back.out(2)" },
              0.1,
            );
            add(
              stageEl(".p-beam"),
              { scaleY: 0 },
              { scaleY: 1, duration: 0.4, ease: "none" },
              0.2,
            );
            add(
              stageEl(".p-launch"),
              { yPercent: 150, autoAlpha: 0 },
              { yPercent: -160, autoAlpha: 1, duration: 0.9, ease: "power1.inOut" },
              0.25,
            );
          });
        },
      );
    });

    return () => {
      alive = false;
      mm?.revert();
    };
  }, [useHorizontalRail]);

  return (
    <section
      ref={sectionRef}
      id="proses"
      className="relative overflow-hidden bg-onyx-canvas"
      aria-label="Proses — bagaimana sistem dipasang"
    >
      <SpatialDecor variant="tunnel" />
      {/* progress bar */}
      <div
        ref={barRef}
        className="absolute left-0 top-0 z-30 h-[3px] w-full origin-left bg-trust-blue"
        style={{
          transform: useHorizontalRail
            ? undefined
            : `scaleX(${(activePhaseIndex + 1) / phases.length})`,
        }}
        aria-hidden="true"
      />
      <div className="absolute left-0 top-0 z-10 h-[3px] w-full bg-slate-border/20" />

      <div className="relative z-10 max-w-[1600px]">
        <div
          ref={trackRef}
          className={`flex min-h-[100vh] items-stretch will-change-transform ${
            useHorizontalRail ? "lg:h-[100vh] lg:flex-row" : "flex-col"
          }`}
        >
          {/* intro panel */}
          <div
            className={`relative flex w-full shrink-0 flex-col justify-center px-4 md:px-10 ${
              useHorizontalRail
                ? "lg:h-[100vh] lg:w-[44vw]"
                : "min-h-[78svh] py-24"
            }`}
            data-phead
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="text-[10px] tracking-[0.3em] text-ash-text uppercase">
                {processIntro.label}
              </span>
              <span className="h-px w-10 bg-trust-blue" />
            </div>
            <h2 className="font-display text-[clamp(2.6rem,5.5vw,4.8rem)] font-medium leading-[0.96] tracking-tight text-ivory-text">
              {processIntro.headline}
            </h2>
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-ash-text">
              {processIntro.sub}{" "}
              {useHorizontalRail
                ? "Geser ke samping untuk menelusuri setiap tahap."
                : "Pilih tahap di bawah untuk melihat detailnya."}
            </p>
            <div
              className={`mt-10 items-center gap-2 text-[10px] tracking-[0.3em] text-ash-text/70 uppercase ${
                useHorizontalRail ? "flex" : "hidden"
              }`}
            >
              <ArrowDownRight className="h-4 w-4" />
              Geser / gulir
            </div>
          </div>

          {/* stage panels */}
          {useHorizontalRail ? (
            phases.map((phase, index) => (
              <StagePanel
                key={phase.number}
                phase={phase}
                index={index}
                className="w-[92vw] px-4 md:px-10 lg:w-[64vw] xl:w-[60vw]"
              />
            ))
          ) : (
            <div className="w-full px-4 pb-24 md:px-10">
              <div className="mx-auto max-w-5xl">
                <div
                  className="grid grid-cols-4 gap-2"
                  role="group"
                  aria-label="Pilih tahap proses"
                >
                  {phases.map((phase, index) => {
                    const active = index === activePhaseIndex;
                    return (
                      <button
                        key={phase.number}
                        type="button"
                        onClick={() => setActivePhaseIndex(index)}
                        aria-pressed={active}
                        className={`min-w-0 rounded-xl border px-2 py-3 text-left transition-colors duration-300 sm:px-4 ${
                          active
                            ? "border-trust-blue/60 bg-obsidian-button"
                            : "border-slate-border/20 bg-transparent text-ash-text hover:border-slate-border/40"
                        }`}
                      >
                        <span className="block font-display text-lg text-ivory-text">
                          {phase.number}
                        </span>
                        <span className="mt-1 block truncate text-[9px] tracking-[0.18em] uppercase">
                          {phase.code}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p
                  className="mt-4 text-[10px] tracking-[0.25em] text-ash-text/70 uppercase"
                  aria-live="polite"
                >
                  Tahap {activePhaseIndex + 1} dari {phases.length} — {activePhase.name}
                </p>
                <div className="mt-8 min-h-[520px] md:min-h-[440px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activePhase.number}
                      variants={stageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={stageTransition}
                      className="w-full"
                    >
                      <StagePanel
                        phase={activePhase}
                        index={activePhaseIndex}
                        staticMode
                        className="w-full px-0 py-10 md:py-14"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] text-ash-text/70 uppercase">
                  <span className="status-dot" />
                  Proses berjalan maju — lanjut ke bawah
                </div>
              </div>
            </div>
          )}

          {/* end cap */}
          {useHorizontalRail ? (
            <div className="relative flex w-[60vw] shrink-0 items-center justify-center lg:w-[34vw]">
              <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] text-ash-text/70 uppercase">
                <span className="status-dot" />
                Proses berjalan maju — lanjut ke bawah
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
