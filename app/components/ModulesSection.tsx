"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, deferScrollTriggers } from "@/app/lib/anim";
import { useHydratedReducedMotion } from "@/app/lib/motion";
import { modules, edges, modulesIntro, type ModuleNode } from "@/app/lib/content";
import { setFocus } from "@/app/scene/story";
import { focusIndexOf } from "@/app/scene/composition";
import SpatialDecor from "./SpatialDecor";
import {
  UserPlus,
  BedDouble,
  Pill,
  Microscope,
  Receipt,
  FileText,
  Boxes,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "user-plus": UserPlus,
  "bed-double": BedDouble,
  pill: Pill,
  microscope: Microscope,
  receipt: Receipt,
  "file-text": FileText,
  boxes: Boxes,
};

function partners(id: string): string[] {
  return edges
    .filter((e) => e.from === id || e.to === id)
    .map((e) => (e.from === id ? e.to : e.from))
    .filter((p) => p !== "hub")
    .map((pid) => modules.find((m) => m.id === pid)?.short ?? "")
    .filter(Boolean);
}

function InfoPanel({ m }: { m: ModuleNode }) {
  const Icon = iconMap[m.icon] ?? FileText;
  const rel = partners(m.id);
  return (
    <div className="hairline-b border-t border-slate-border/25 pb-5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-trust-blue" strokeWidth={1.6} />
          <span className="text-[10px] tracking-[0.3em] text-ash-text uppercase">
            Modul terkoneksi
          </span>
        </span>
        <span className="status-dot" />
      </div>
      <h3 className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight text-ivory-text">
        {m.title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-ash-text">{m.desc}</p>
      <p className="mt-2 text-[12px] leading-relaxed text-ash-text/80">
        <span className="text-trust-blue">→&nbsp;</span>
        {m.hint}
      </p>
      {rel.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {rel.map((r) => (
            <span
              key={r}
              className="rounded-full border border-slate-border/40 px-3 py-1 text-[9px] tracking-[0.22em] text-ash-text uppercase"
            >
              {r}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function ModulesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string>("pendaftaran");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const reduceMotion = useHydratedReducedMotion();

  const revealInitial = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 24 };
  const revealVisible = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 };
  const revealTransition = reduceMotion
    ? { duration: 0.12, ease: [0.2, 0, 0, 1] as [number, number, number, number] }
    : { duration: 0.62, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  const infoVariants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0 },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 },
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let mm: gsap.MatchMedia | undefined;
    let alive = true;

    deferScrollTriggers().then(() => {
      if (!alive || !sectionRef.current) return;
      mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(section);
      const topAbs = () => section.getBoundingClientRect().top + window.scrollY;
      const vh = () => window.innerHeight;
      gsap.fromTo(
        q("[data-mod-head]"),
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: () => topAbs() - vh() * 0.72, toggleActions: "play none none none" },
        },
      );
    });
    });

    return () => {
      alive = false;
      mm?.revert();
    };
  }, []);

  const activeNode = modules.find((m) => m.id === activeId) ?? modules[0];

  /* Node yang sedang ditunjuk: hover (desktop) mengalahkan selection.
     Dipakai untuk meredupkan modul lain & menyorot koneksi terkait (PROMPTS #11). */
  const focusId = hoverId ?? activeId;
  const relatedShorts = partners(focusId);

  /* Pilihan modul di UI menjadi fokus kamera scene (EXPLORING). */
  useEffect(() => {
    setFocus(focusIndexOf(activeId));
  }, [activeId]);

  return (
    <section
      ref={sectionRef}
      id="modul"
      className="relative bg-onyx-canvas px-4 py-24 md:px-6 md:py-36"
      aria-label="Modul SIMRS — satu sistem, tujuh unit"
    >
      <SpatialDecor variant="orbit" />
      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div data-mod-head className="mb-6 flex items-center gap-3">
              <span className="text-[10px] tracking-[0.3em] text-ash-text uppercase">
                {modulesIntro.label}
              </span>
              <span className="h-px w-10 bg-trust-blue" />
            </div>
            <h2
              data-mod-head
              className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-medium leading-[0.94] tracking-tight text-ivory-text"
            >
              {modulesIntro.headline}
            </h2>
          </div>
          <p
            data-mod-head
            className="max-w-sm text-[14px] leading-relaxed text-ash-text"
          >
            {modulesIntro.sub}
          </p>
        </div>

        {/* sistem 3D di kiri (EXPLORING) — panel modul di kanan */}
        <div className="mt-12 grid grid-cols-12 gap-3 md:mt-16">
          <div className="order-2 col-span-12 flex flex-col justify-end md:order-1 md:col-span-7">
            <div className="hidden items-center gap-3 text-[10px] tracking-[0.3em] text-ash-text/70 uppercase md:flex">
              <span className="status-dot" />
              Arahkan kursor ke modul — kamera mengikuti pilihan Anda
            </div>
          </div>

          {/* right rail */}
          <div className="order-1 col-span-12 flex flex-col gap-3 md:order-2 md:col-span-5">
            <motion.div
              initial={revealInitial}
              whileInView={revealVisible}
              viewport={{ once: true, amount: 0.3 }}
              transition={revealTransition}
              className="mb-1 hidden items-center justify-between md:flex"
            >
              <span className="text-[10px] tracking-[0.3em] text-ash-text uppercase">
                Pilih modul
              </span>
              <span className="text-[10px] tracking-[0.28em] text-ash-text/70 uppercase">
                01 — 07
              </span>
            </motion.div>

            {/* info panel */}
            <motion.div
              initial={revealInitial}
              whileInView={revealVisible}
              viewport={{ once: true, amount: 0.2 }}
              transition={revealTransition}
              className="panel min-h-[238px] p-5"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeNode.id}
                  variants={infoVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={revealTransition}
                >
                  <InfoPanel m={activeNode} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* module list */}
            <motion.div
              initial={revealInitial}
              whileInView={revealVisible}
              viewport={{ once: true, amount: 0.12 }}
              transition={revealTransition}
              className="panel divide-y divide-slate-border/15"
            >
              {modules.map((m, i) => {
                const active = m.id === activeId;
                const focused = m.id === focusId;
                const related = relatedShorts.includes(m.short);
                /* modul lain meredup; koneksi terkait tetap terbaca */
                const dim = focused
                  ? 1
                  : related
                    ? 0.82
                    : active
                      ? 0.7
                      : 0.42;
                return (
                  <motion.button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveId(m.id)}
                    onMouseEnter={() => {
                      setHoverId(m.id);
                      setFocus(focusIndexOf(m.id));
                    }}
                    onMouseLeave={() => {
                      setHoverId(null);
                      setFocus(focusIndexOf(activeId));
                    }}
                    onFocus={() => {
                      setHoverId(m.id);
                      setFocus(focusIndexOf(m.id));
                    }}
                    onBlur={() => {
                      setHoverId(null);
                      setFocus(focusIndexOf(activeId));
                    }}
                    aria-pressed={active}
                    style={{ opacity: dim }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            scale: 1.02,
                            y: -4,
                            transition: {
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1] as [
                                number,
                                number,
                                number,
                                number,
                              ],
                            },
                          }
                    }
                    whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                    className={`group relative flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-[background-color,opacity] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-trust-blue ${
                      active ? "bg-obsidian-button" : "hover:bg-obsidian-button/50"
                    }`}
                  >
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute top-0 left-0 h-full w-px bg-trust-blue"
                      />
                    ) : null}
                    <span className="flex items-center gap-3">
                      <span
                        className={`font-display text-[11px] tracking-[0.3em] ${
                          active ? "text-trust-blue" : "text-ash-text/60"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-[12px] tracking-[0.18em] uppercase ${
                          active ? "text-ivory-text" : "text-ash-text"
                        }`}
                      >
                        {m.short}
                      </span>
                    </span>
                    <span className="flex items-center gap-2.5">
                      {related && !active ? (
                        <span
                          aria-hidden="true"
                          title="terhubung"
                          className="h-1 w-1 rounded-full bg-trust-blue"
                        />
                      ) : null}
                      <ArrowUpRight
                        className={`h-3.5 w-3.5 transition-all duration-300 ${
                          active
                            ? "rotate-45 text-trust-blue"
                            : "text-ash-text/40 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ash-text"
                        }`}
                      />
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 text-[10px] tracking-[0.3em] text-ash-text/70 uppercase">
          <span className="status-dot" />
          Bukan tujuh aplikasi terpisah — tujuh pintu masuk pada satu basis data
        </div>
      </div>
    </section>
  );
}
