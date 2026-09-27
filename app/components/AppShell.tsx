"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/app/lib/anim";
import { scrollToId } from "@/app/lib/scroll";
import CanvasGuard from "./CanvasGuard";
import Cursor from "./Cursor";
import Loader from "./Loader";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import JourneySection from "./JourneySection";
import DataFlowSection from "./DataFlowSection";
import ProblemSection from "./ProblemSection";
import SolutionSection from "./SolutionSection";
import ModulesSection from "./ModulesSection";
import ProcessSection from "./ProcessSection";
import ServicesSection from "./ServicesSection";
import TrustSection from "./TrustSection";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
import { createStoryDriver } from "@/app/scene/storyDriver";

/* Unified Hospital Data System — kanvas 3D persistent tunggal di belakang
   seluruh halaman, hanya di klien; gagal = hilang (bukan error). */
const SceneLayer = dynamic(() => import("@/app/scene/SceneCanvas"), {
  ssr: false,
});

export default function AppShell() {
  const [ready, setReady] = useState(false);
  const [quality, setQuality] = useState<"high" | "low">("high");
  const lenisRef = useRef<Lenis | null>(null);

  /* Kualitas scene: layar sempit (mobile) → geometri/dpr lebih ringan. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setQuality(mq.matches ? "high" : "low");
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Driver cerita: satu ScrollTrigger → progres story 0..1. */
  useEffect(() => createStoryDriver(), []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.stop();

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    const t = setTimeout(() => ScrollTrigger.refresh(), 1500);
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(t);
    };
  }, []);

  /* Any bare <a href="#…"> (footer, hero CTA, secondary links) glides via
     Lenis instead of snapping to the anchor. */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const anchor = (e.target as Element | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash.length < 2) return;
      e.preventDefault();
      scrollToId(hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const handleReady = useCallback(() => {
    setReady(true);
    lenisRef.current?.start();
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      {/* Lapisan 3D persistent: menetap di belakang seluruh halaman. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <CanvasGuard fallback={null}>
          <SceneLayer key={quality} quality={quality} />
        </CanvasGuard>
      </div>
      <Cursor />
      <Loader onDone={handleReady} />
      <Navbar />
      <a href="#main" className="skip-link">
        Lewati ke konten
      </a>
      <main id="main">
        <HeroSection ready={ready} />
        <JourneySection />
        <DataFlowSection />
        <ProblemSection />
        <SolutionSection />
        <ModulesSection />
        <ProcessSection />
        <ServicesSection />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}