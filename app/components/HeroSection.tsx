"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger, markHeroPinned } from "@/app/lib/anim";
import { useReducedMotion } from "@/app/lib/motion";

/* Reveal tipografi hero (MOTION §8): eyebrow → judul → salinan → CTA,
   jeda 80–120ms, hanya opacity + translasi kecil. */
const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Hero — panggung Unified Hospital Data System (DESIGN §10.1, §12.2).
 * Satu-satunya visual 3D adalah scene persistent di belakang halaman;
 * hero hanya menahan pandangan (pin) supaya kamera sempat mengamati
 * arsitektur sebelum scroll memisahkan sistem di section Problem.
 */
export default function HeroSection({ ready = true }: { ready?: boolean }) {
  const section = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = section.current;
    if (reduced) {
      markHeroPinned();
      return;
    }
    if (!element) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });
      /* Salinan menghilang perlahan di akhir pin — panggung diserahkan
         ke section Problem saat state berpindah ke FRAGMENTED. */
      if (copy.current) {
        timeline.to(
          copy.current,
          { autoAlpha: 0, y: -26, ease: "none", duration: 0.3 },
          0.66,
        );
      }
      if (hint.current) {
        timeline.to(hint.current, { autoAlpha: 0, ease: "none", duration: 0.12 }, 0.05);
      }
    }, element);

    markHeroPinned();
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      window.clearTimeout(refresh);
      context.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={section}
      id="hero"
      aria-label="Hero — Unified Hospital Data System"
      className="relative h-svh w-full overflow-hidden"
    >
      {/* Scrim agar editorial typography tetap terbaca di atas scene. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,13,0.88),rgba(11,11,13,0.34)_46%,rgba(11,11,13,0.78))] md:bg-[linear-gradient(90deg,rgba(11,11,13,0.94),rgba(11,11,13,0.7)_38%,rgba(11,11,13,0)_72%)]"
      />

      <div ref={copy} className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <motion.div
            variants={group}
            initial={reduced ? "show" : "hidden"}
            animate={ready ? "show" : "hidden"}
            className="max-w-[660px]"
          >
            <motion.span
              variants={item}
              className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-muted-text uppercase"
            >
              <span className="h-px w-8 bg-healthcare-blue" />
              SIMRS — Integrated Hospital Information System
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-7 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.02] tracking-tight text-primary-text"
            >
              Rekam medis, farmasi, dan billing rumah sakit Anda, akhirnya
              bicara satu bahasa.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-[520px] text-[15px] leading-relaxed text-muted-text md:text-base"
            >
              Agung Nitya membangun SIMRS yang menyatukan setiap unit ke dalam
              satu basis data — bukan sekadar menghubungkan aplikasi yang
              berbeda satu per satu.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#kontak"
                data-cursor="magnetic"
                className="inline-flex items-center gap-2 rounded-full bg-healthcare-blue px-7 py-3.5 text-sm font-medium text-primary-text transition-all duration-300 hover:-translate-y-px hover:scale-[1.02] hover:bg-[#6d8aff] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-healthcare-blue motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
              >
                Jadwalkan Demo
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#modul"
                data-cursor="magnetic"
                className="inline-flex items-center gap-2 rounded-full border border-structural-border px-6 py-3.5 text-sm font-medium text-primary-text transition-all duration-300 hover:-translate-y-px hover:scale-[1.02] hover:border-muted-text/60 hover:bg-[rgba(255,255,255,0.05)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-healthcare-blue motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
              >
                Lihat Modul
                <span aria-hidden="true">↓</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div
        ref={hint}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="text-[10px] tracking-[0.3em] text-muted-text uppercase">
          scroll ▾
        </span>
      </div>
    </section>
  );
}
