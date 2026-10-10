"use client";

// A portfolio and module index built as a 3D wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// Pure white background theme adapted for SIMRS Enterprise 9 Modul.

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Project/Module name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art / medical photography. Any src an <img> takes. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
  /** Subtitle / category tag (optional) */
  subtitle?: string;
}

export interface WorksWheelProps
  extends Omit<React.ComponentPropsWithoutRef<"section">, "children"> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default "9 Modul SIMRS" */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default "Pelajari" */
  action?: string;
}

/* Geometry. The card is measured against the stage; everything else is measured
   against the card, so a narrow stage - where the card is capped by width, not
   height - scales the whole wheel down with it instead of leaving a small card
   swinging on a huge drum. */
const CARD_H = 0.38; // front card height, of the stage
const CARD_MAX_W = 0.34; // ... but never wider than this much of the stage
const CARD_RATIO = 1.45; // card width / height
const STEP = 40; // degrees between cards on the drum
const DRUM = 2.22; // drum radius, in card heights
const LENS = 2.7; // perspective distance
const RING_R = 1.14; // ring radius
const BOW = 1.82;
const TITLE = 0.124; // ring label and front-card title
const INDEX = 0.04; // the index down the right-hand side
const CULL = 1.6;

/** How much of a wheel-notch or a dragged pixel counts as one item. */
const WHEEL_UNITS = 650;
const DRAG_UNITS = 420;
/** Quiet time after the last wheel event before the wheel settles gently on an item. */
const SETTLE = 240;
/** Fraction of the remaining distance closed each frame for silky inertial easing. */
const EASE = 0.085;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

/** How far left the arc has carried something that has turned `drumDeg` off the
    front. Zero at the front, so the piece being read stays centred. */
const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

/** Both states in one chain: the ring terms fall away as `m` reaches the drum,
    and the drum terms are still zero while the ring is up. */
function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "9 Modul SIMRS",
  action = "Pelajari",
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    };
  }, [stage, count]);

  // One pass per frame: ease toward the target, then write every transform.
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m
          );
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last]
  );

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > 0 && next < last + 1) event.preventDefault();
      to(next);
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => to(Math.round(target.current)),
        SETTLE
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  const drag = React.useRef<number | null>(null);
  const settling = React.useRef(0);

  return (
    <section
      aria-label={label}
      className={cn(
        "relative h-full min-h-[28rem] w-full overflow-hidden select-none bg-white text-ink",
        className
      )}
      {...props}
    >
      <div
        ref={stageRef}
        data-lenis-prevent
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-[#0071e3] absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          to(target.current + (drag.current - event.clientY) / DRAG_UNITS);
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          if (target.current > 1) to(Math.round(target.current));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") to(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") to(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const Tag = (item.href ? "a" : "div") as "a";
            return (
              <React.Fragment key={item.title}>
                <Tag
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node;
                  }}
                  className="group absolute [backface-visibility:hidden]"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  <span className="relative block size-full overflow-hidden rounded-[20px] border border-[#d6d6d6] bg-[#f5f5f7] shadow-[0_16px_36px_-12px_rgba(0,0,0,0.12)] transition-shadow group-hover:shadow-[0_20px_42px_-10px_rgba(0,0,0,0.16)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80 pointer-events-none" />

                    {/* Card Label Bottom Left */}
                    <div className="absolute left-4 bottom-3.5 z-10 pointer-events-none text-white flex flex-col">
                      {item.subtitle && (
                        <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-white/80">
                          {item.subtitle}
                        </span>
                      )}
                      <span className="text-[13px] sm:text-[15px] font-semibold tracking-tight text-white drop-shadow-sm">
                        {item.title}
                      </span>
                    </div>

                    {/* Hover Action Badge Bottom Right */}
                    {action && item.href ? (
                      <span className="pointer-events-none absolute right-3.5 bottom-3.5 z-20 flex translate-y-1 items-center gap-1.5 rounded-full border border-white/40 bg-white/95 px-3 py-1 text-[11px] font-medium text-[#1d1d1f] opacity-0 shadow-sm backdrop-blur-md transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        <span>{action}</span>
                        <ArrowUpRight className="h-3 w-3 text-[#0071e3]" />
                      </span>
                    ) : null}
                  </span>
                </Tag>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Ring title (at rest) */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute inset-0 grid place-items-center font-semibold tracking-[-0.03em] text-[#1d1d1f]"
        style={{ fontSize: metrics.title }}
      >
        <div className="text-center">
          <span className="block">{label}</span>
          <span className="block text-[0.28em] font-mono font-normal uppercase tracking-[0.14em] text-[#86868b] mt-1">
            GULIR UNTUK MEMUTAR DRUM 3D
          </span>
        </div>
      </div>

      {/* Front-card title (in motion) */}
      <div
        ref={titleRef}
        className="pointer-events-none absolute top-1/2 left-[6%] -translate-y-1/2 max-w-[42%] tracking-[-0.03em] opacity-0 transition-opacity"
        style={{ fontSize: metrics.title }}
      >
        <span className="block font-mono text-[0.24em] font-medium uppercase tracking-[0.12em] text-[#0071e3] mb-1">
          {items[active]?.subtitle || `MODUL 0${active + 1} / 0${count}`}
        </span>
        <span className="block font-semibold text-[#1d1d1f] leading-[1.08]">
          {items[active]?.title}
        </span>
      </div>

      {/* Right Index List */}
      <ol
        className="absolute top-[8%] right-[3%] text-right leading-[1.8] font-mono select-none"
        style={{ fontSize: metrics.index }}
      >
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                "cursor-pointer text-[#86868b] transition-colors outline-none hover:text-[#1d1d1f] focus-visible:text-[#0071e3]",
                i === active && "font-semibold text-[#0071e3]"
              )}
            >
              <span className="mr-2 text-[0.85em] opacity-60">0{i + 1}</span>
              <span>{item.title}</span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default WorksWheel;
