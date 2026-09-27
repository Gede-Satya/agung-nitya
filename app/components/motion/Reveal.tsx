"use client";

import {
  useLayoutEffect,
  useRef,
  type ElementType,
  type Ref,
  type FC,
  type ReactNode,
} from "react";
import { gsap, deferScrollTriggers } from "@/app/lib/anim";
import { useReducedMotion, type RevealVariant } from "@/app/lib/motion";

interface RevealProps {
  as?: ElementType;
  variant?: RevealVariant;
  distance?: number;
  delay?: number;
  duration?: number;
  ease?: string;
  /** > 0 → animasikan anak langsung dengan stagger (bukan wrapper). */
  stagger?: number;
  /** Selektor target animasi (mis. "> .item") — menggantikan children. */
  items?: string;
  start?: string;
  once?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Scroll reveal yang reusable.
 * - Tanpa `stagger`: wrapper di-animasi sebagai satu blok.
 * - Dengan `stagger`/`items`: elemen-elemen anak di-reveal bertahap.
 * Reduced-motion → semua di-set ke keadaan akhir (konten tak hilang).
 */
export default function Reveal({
  as = "div",
  variant = "up",
  distance = 28,
  delay = 0,
  duration = 1,
  ease = "power3.out",
  stagger = 0,
  items,
  start = "top 85%",
  once = true,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cx: ReturnType<typeof gsap.context> | undefined;
    let alive = true;

    deferScrollTriggers().then(() => {
      if (!alive || !ref.current) return;
      const from =
        variant === "fade"
          ? { autoAlpha: 0 }
          : {
              autoAlpha: 0,
              x: variant === "left" ? distance : variant === "right" ? -distance : 0,
              y: variant === "up" ? distance : variant === "down" ? -distance : 0,
              scale: variant === "scale" ? 0.96 : 1,
            };
      const targets = items
        ? el.querySelectorAll(items)
        : stagger
          ? Array.from(el.children)
          : [el];

      cx = gsap.context(() => {
        if (reduce) {
          gsap.set(targets, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
          return;
        }
        gsap.fromTo(
          targets,
          from,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration,
            delay,
            ease,
            stagger: stagger || undefined,
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: once ? "play none none none" : "play none none reverse",
            },
          },
        );
      }, el);
    });

    return () => {
      alive = false;
      cx?.revert();
    };
  }, [reduce, variant, distance, delay, duration, ease, stagger, items, start, once]);

  const Comp = as as unknown as FC<{
    ref?: Ref<HTMLElement>;
    className?: string;
    children?: ReactNode;
  }>;
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}