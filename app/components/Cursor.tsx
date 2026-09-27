"use client";

import { useEffect } from "react";
import { gsap } from "@/app/lib/anim";

export default function Cursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className =
      "custom-cursor fixed left-0 top-0 z-[300] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-trust-blue pointer-events-none";
    ring.className =
      "custom-cursor fixed left-0 top-0 z-[299] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ivory-text/25 pointer-events-none";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    const dx = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let targetScale = 1;
    let active = false;
    let lastX = -1;
    let lastY = -1;

    const onMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      if (!active) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        active = true;
      }
    };

    const applyTarget = (under: HTMLElement | null) => {
      const interactive =
        under && typeof under.closest === "function"
          ? (under.closest(
              "a, button, [data-cursor], .cursor-target",
            ) as HTMLElement | null)
          : null;
      if (interactive) {
        targetScale = 1.8;
        gsap.to(ring, {
          backgroundColor: "rgba(91,124,255,0.1)",
          borderColor: "rgba(91,124,255,0.65)",
          duration: 0.3,
        });
      } else {
        targetScale = 1;
        gsap.to(ring, {
          backgroundColor: "rgba(91,124,255,0)",
          borderColor: "rgba(237,237,243,0.25)",
          duration: 0.3,
        });
      }
    };

    const onOver = (e: MouseEvent) => {
      applyTarget(e.target as HTMLElement | null);
    };

    const refresh = () => {
      if (lastX < 0) return;
      window.setTimeout(() => {
        applyTarget(document.elementFromPoint(lastX, lastY) as HTMLElement | null);
      }, 60);
    };

    let scale = 1;
    const tick = () => {
      scale += (targetScale - scale) * 0.14;
      gsap.set(ring, { scale });
    };

    gsap.ticker.add(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("click", refresh, { passive: true });

    gsap.set([dot, ring], { opacity: 0 });
    document.documentElement.classList.add("has-cursor");

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("click", refresh);
      dot.remove();
      ring.remove();
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return null;
}
