"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/app/lib/anim";

export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const MAX = 8;
    const RADIUS = 40;
    const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v));

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const rectDist = Math.max(
        r.left - e.clientX,
        e.clientX - r.right,
        r.top - e.clientY,
        e.clientY - r.bottom,
      );
      if (rectDist > RADIUS) {
        onLeave();
        return;
      }
      xTo(clamp((e.clientX - cx) * strength));
      yTo(clamp((e.clientY - cy) * strength));
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
}