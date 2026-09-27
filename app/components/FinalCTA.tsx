"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, deferScrollTriggers } from "@/app/lib/anim";
import { useHydratedReducedMotion } from "@/app/lib/motion";
import { closing } from "@/app/lib/content";
import Magnetic from "./Magnetic";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useHydratedReducedMotion();
  const ctaTransition = reduceMotion
    ? { duration: 0.12, ease: [0.2, 0, 0, 1] as [number, number, number, number] }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: () => topAbs() - window.innerHeight * 0.6,
          end: () => topAbs() - window.innerHeight * 0.18,
          scrub: 0.8,
        },
      });
      gsap.set(q("[data-cw-word]"), { yPercent: 118 });
      tl.to(
        q("[data-cw-word]"),
        { yPercent: 0, stagger: 0.03, ease: "power4.out", duration: 0.9 },
      )
        .fromTo(
          q("[data-cw-sub]"),
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          q("[data-cw-cta]"),
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          "-=0.35",
        );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
        const q = gsap.utils.selector(section);
        gsap.set(
          [q("[data-cw-word]"), q("[data-cw-sub]"), q("[data-cw-cta]")],
          { autoAlpha: 1, y: 0, yPercent: 0 },
        );
      });
    });

    return () => {
      alive = false;
      mm?.revert();
    };
  }, []);

  const headlineWords = closing.headline.split(" ");

  return (
    <section
      ref={sectionRef}
      id="kontak"
      className="relative"
      style={{ height: "180vh" }}
      aria-label="Kontak — jadwalkan demo"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 md:px-10">
        {/* System 3D lengkap di belakang (COMPLETE) — tarikan kamera menutup cerita */}
        <div className="scrim-block relative z-10 flex max-w-3xl flex-col items-center text-center">
          <div className="t-eyebrow mb-7 text-ash-text">{closing.label}</div>

          <h2 className="t-section font-display text-ivory-text">
            <span data-cw-head>
              {headlineWords.map((w, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-top pt-[0.08em] -mb-[0.08em]"
                >
                  <span data-cw-word className="inline-block">
                    {w}
                    {i < headlineWords.length - 1 ? "\u00A0" : ""}
                  </span>
                </span>
              ))}
            </span>
          </h2>

          <p data-cw-sub className="t-lede mt-7 max-w-[46ch] text-ash-text">
            {closing.sub}
          </p>

          <div
            data-cw-cta
            className="mt-11 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <Magnetic strength={0.3}>
              <motion.a
                href="#kontak"
                data-cta-primary
                whileHover={reduceMotion ? undefined : { scale: 1.03, y: -1 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={ctaTransition}
                className="group inline-flex items-center gap-3 rounded-full bg-trust-blue px-9 py-4 text-[15px] font-medium tracking-[0.02em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trust-blue"
              >
                {closing.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </Magnetic>
            <a
              href="#modul"
              data-cta-secondary
              className="link-underline text-[15px] text-ash-text"
            >
              Lihat modul
            </a>
          </div>

          <p
            data-cw-sub
            className="mt-11 text-[15px] tracking-[0.06em] text-ivory-text/80"
          >
            PT. Agung Wijaya Nitya
          </p>
        </div>
      </div>
    </section>
  );
}
