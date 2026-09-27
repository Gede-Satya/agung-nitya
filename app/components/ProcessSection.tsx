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

const DECKS: Record<
  Phase["number"],
  {
    icon: typeof ScanSearch;
    label: string;
    items?: string[];
    caption: string;
  }
> = {
  "01": {
    icon: ScanSearch,
    label: "Audit alur",
    items: [
      "Alur tiap unit",
      "Kebutuhan medis & non-medis",
      "Data historis",
    ],
    caption:
      "memetakan titik-titik yang harus menyatu sebelum satu baris data pun dipindahkan.",
  },
  "02": {
    icon: DatabaseBackup,
    label: "Satu tujuan",
    items: ["Satu basis data", "Rekonsiliasi di tiap tahap"],
    caption: "setiap tahap diverifikasi sebelum tahap berikutnya dimulai.",
  },
  "03": {
    icon: UserRoundCheck,
    label: "Manusia dulu",
    items: ["Staf medis", "Farmasi", "Laboratorium", "Administrasi"],
    caption: "dibiasakan sebelum sistem diluncurkan.",
  },
  "04": {
    icon: Rocket,
    label: "Pendampingan",
    caption:
      "peluncuran dengan pendampingan di lapangan hingga seluruh unit berjalan pada satu alur.",
  },
};

function Deck({ phase }: { phase: Phase }) {
  const deck = DECKS[phase.number];
  const Icon = deck.icon;
  return (
    <div className="relative w-full">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-ash-text/60" strokeWidth={1.6} />
        <span className="t-eyebrow text-ash-text">{deck.label}</span>
      </div>
      {deck.items?.length ? (
        <ul className="mt-6">
          {deck.items.map((label) => (
            <li
              key={label}
              className="hairline-b py-3 text-[15px] leading-snug text-ivory-text/90"
            >
              {label}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="t-body mt-6 text-ash-text">{deck.caption}</p>
    </div>
  );
}

function StagePanel({
  phase,
  index,
  className,
}: {
  phase: Phase;
  index: number;
  className: string;
}) {
  return (
    <article
      className={`proc-stage relative flex shrink-0 flex-col justify-center gap-8 border-l border-slate-border/25 ${className}`}
    >
      <div className="relative z-10 flex items-start justify-between gap-6">
        <span className="p-info font-display text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-tight text-ivory-text">
          {phase.number}
        </span>
        <span className="p-info t-eyebrow mt-4 hidden text-ash-text lg:block">
          {phase.code}
        </span>
      </div>

      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
        <div className="p-info scrim-block">
          <h3 className="t-sub text-ivory-text">{phase.name}</h3>
          <p className="t-lede mt-5 text-ash-text">{phase.body}</p>
        </div>
        <div className="p-info scrim-block hairline-b border-t border-slate-border/30 pt-7">
          <Deck phase={phase} />
        </div>
      </div>
      <span className="sr-only">Tahap {index + 1} dari 4</span>
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
                start: "left 95%",
                end: "left 60%",
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
      className="relative overflow-hidden"
      aria-label="Proses — bagaimana sistem dipasang"
    >
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

      {/* tanpa z-10: agar scrim `p-info` tidak terperangkap di atas teks lain */}
      <div className="relative max-w-[1600px]">
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
            <div className="scrim-block">
              <div className="mb-7 flex items-center gap-3">
                <span className="t-eyebrow text-ash-text">
                  {processIntro.label}
                </span>
                <span className="h-px w-10 bg-trust-blue" />
              </div>
              <h2 className="t-section text-ivory-text">
                {processIntro.headline}
              </h2>
              <p className="t-lede mt-6 max-w-[46ch] text-ash-text">
                {processIntro.sub}{" "}
                {useHorizontalRail
                  ? "Geser ke samping untuk menelusuri setiap tahap."
                  : "Pilih tahap di bawah untuk melihat detailnya."}
              </p>
              <div
                className={`mt-9 items-center gap-2 text-ash-text ${
                  useHorizontalRail ? "flex" : "hidden"
                }`}
              >
                <ArrowDownRight className="h-4 w-4" strokeWidth={1.6} />
                <span className="t-eyebrow">Geser / gulir</span>
              </div>
            </div>
          </div>

          {/* stage panels */}
          {useHorizontalRail ? (
            phases.map((phase, index) => (
              <StagePanel
                key={phase.number}
                phase={phase}
                index={index}
                className="w-[92vw] px-6 md:px-12 lg:w-[64vw] xl:w-[60vw]"
              />
            ))
          ) : (
            <div className="w-full px-6 pb-28 md:px-10">
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
                        className={`min-w-0 rounded-xl border px-2.5 py-4 text-left transition-colors duration-300 sm:px-4 ${
                          active
                            ? "border-trust-blue/60 bg-obsidian-button"
                            : "border-slate-border/20 bg-transparent text-ash-text hover:border-slate-border/40"
                        }`}
                      >
                        <span className="block font-display text-lg text-ivory-text">
                          {phase.number}
                        </span>
                        <span className="t-eyebrow tab-eyebrow mt-2 block text-ash-text">
                          {phase.code}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-5 text-[15px] text-ash-text" aria-live="polite">
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
                        className="w-full px-0 py-10 md:py-14"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          {/* end cap */}
          {useHorizontalRail ? (
            <div className="relative flex w-[60vw] shrink-0 items-center justify-center lg:w-[34vw]">
              <span className="t-eyebrow text-ash-text">Berikutnya</span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
