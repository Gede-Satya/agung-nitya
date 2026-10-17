"use client";

import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

import type {
  FmLayout,
  FormationMode,
  Pose,
  Work,
} from "./formation-utils/formation-poses";
import {
  clamp,
  copyPose,
  easeInOut,
  focusScore,
  getLayout,
  HOVER_EASE,
  HOVER_ZOOM,
  lerpPose,
  MODES,
  MORPH_DUR,
  MORPH_STAGGER,
  PARALLAX_MAX,
  PERSP,
  poseFor,
  poseTransform,
  SPRING,
  SWAP_BAND,
  SWAP_FLOOR,
  SWAP_SPEED_REF,
} from "./formation-utils/formation-poses";

const SANS = 'var(--font-inter), system-ui, -apple-system, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';

interface CustomCSS extends CSSProperties {
  [key: `--${string}`]: string | number | undefined;
}

interface CardState {
  index: number;
  work: Work;
  cur: Pose;
  from: Pose;
  hov: number;
  swap: number;
  prevZ: number;
  outer: HTMLDivElement | null;
  inner: HTMLDivElement | null;
}

interface LoopState {
  raf: number;
  lastTime: number;
  onScreen: boolean;
  visible: boolean;
  reduced: boolean;
  browse: number;
  vel: number;
  morphing: boolean;
  morphMs: number;
  seeded: boolean;
  hoverCard: CardState | null;
  lastFocused: CardState | null;
  curTX: number;
  curTY: number;
  cursor: { x: number; y: number; inside: boolean };
  press: { x: number; y: number; id: number; committed: boolean } | null;
  lastX: number;
}

const zeroPose = (): Pose => ({
  o: 0,
  rx: 0,
  ry: 0,
  rz: 0,
  s: 1,
  x: 0,
  y: 0,
  z: 0,
});

const createState = (): LoopState => ({
  browse: 0,
  curTX: 0,
  curTY: 0,
  cursor: { inside: false, x: 0, y: 0 },
  hoverCard: null,
  lastFocused: null,
  lastTime: 0,
  lastX: 0,
  morphMs: 0,
  morphing: false,
  onScreen: true,
  press: null,
  raf: 0,
  reduced: false,
  seeded: false,
  vel: 0,
  visible: true,
});

const makeCards = (works: Work[]): CardState[] =>
  works.map((work, index) => ({
    cur: zeroPose(),
    from: zeroPose(),
    hov: 0,
    index,
    inner: null,
    outer: null,
    prevZ: 0,
    swap: 0,
    work,
  }));

const pad = (n: number) => String(n).padStart(2, "0");

const isDragging = (s: LoopState) => s.press?.committed === true;

const isUI = (target: EventTarget | null) =>
  target instanceof Element && target.closest("[data-fm-ui]") !== null;

interface FormationProps {
  works: Work[];
}

export const Formation = ({ works }: FormationProps): ReactNode => {
  const [mode, setMode] = useState<FormationMode>("flat");
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  const rootRef = useRef<HTMLElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  const sRef = useRef<LoopState | null>(null);
  if (!sRef.current) {
    sRef.current = createState();
  }
  const S = sRef.current;

  const worksRef = useRef<Work[] | null>(null);
  const cardsRef = useRef<CardState[]>([]);
  if (worksRef.current !== works) {
    worksRef.current = works;
    cardsRef.current = makeCards(works);
  }
  const cards = cardsRef.current;
  const n = cards.length;

  const layoutRef = useRef<FmLayout | null>(null);
  const boxRef = useRef({ h: 0, left: 0, top: 0, w: 0 });
  const modeRef = useRef<FormationMode>("flat");

  // Immediate mode change handler
  const handleModeChange = useCallback(
    (newMode: FormationMode) => {
      setMode(newMode);
      modeRef.current = newMode;
      for (const card of cards) {
        copyPose(card.from, card.cur);
      }
      S.browse = 0;
      S.vel = 0;
      S.morphing = true;
      S.morphMs = 0;
    },
    [cards, S]
  );

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const applyCardSizes = () => {
    const L = layoutRef.current;
    if (!L) return;
    for (const card of cards) {
      const { outer } = card;
      if (!outer) continue;
      outer.style.width = `${L.cardW}px`;
      outer.style.height = `${L.cardH}px`;
      outer.style.marginLeft = `${-L.cardW / 2}px`;
      outer.style.marginTop = `${-L.cardH / 2}px`;
    }
  };

  const hoverHit = (px: number, py: number) => {
    const box = boxRef.current;
    const inRect = (el: HTMLDivElement) => {
      const r = el.getBoundingClientRect();
      const l = r.left - box.left;
      const t = r.top - box.top;
      return px >= l && px <= l + r.width && py >= t && py <= t + r.height;
    };
    const stickyCard = S.hoverCard;
    if (
      stickyCard &&
      stickyCard.cur.o >= 0.5 &&
      stickyCard.outer &&
      inRect(stickyCard.outer)
    ) {
      return stickyCard;
    }
    let best: CardState | null = null;
    let bestZ = -Infinity;
    for (const card of cards) {
      if (card.cur.o < 0.5) continue;
      const el = card.outer;
      if (!el) continue;
      if (inRect(el) && card.cur.z > bestZ) {
        bestZ = card.cur.z;
        best = card;
      }
    }
    return best;
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (isUI(e.target)) return;
    if (S.press) return;
    const box = boxRef.current;
    const lx = e.clientX - box.left;
    const ly = e.clientY - box.top;
    S.cursor.x = lx;
    S.cursor.y = ly;
    S.cursor.inside = true;
    S.lastX = lx;
    S.press = { committed: false, id: e.pointerId, x: lx, y: ly };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const { press } = S;
    if (press && press.id !== e.pointerId) return;
    const box = boxRef.current;
    const lx = e.clientX - box.left;
    const ly = e.clientY - box.top;
    S.cursor.x = lx;
    S.cursor.y = ly;
    S.cursor.inside = true;
    if (press && !S.morphing) {
      if (!press.committed) {
        const dist = Math.hypot(lx - press.x, ly - press.y);
        if (dist > 8) {
          press.committed = true;
          try {
            rootRef.current?.setPointerCapture(press.id);
          } catch {
            /* noop */
          }
        }
      }
      if (press.committed) {
        const gain =
          modeRef.current === "flat" || modeRef.current === "ring" ? 1.4 : 1;
        const d = (lx - S.lastX) * gain;
        S.browse += d;
        S.vel = d;
      }
    }
    S.lastX = lx;
  };

  const endPress = (e: ReactPointerEvent<HTMLElement>) => {
    const { press } = S;
    if (!press || press.id !== e.pointerId) return;
    const root = rootRef.current;
    if (root?.hasPointerCapture(press.id)) {
      root.releasePointerCapture(press.id);
    }
    S.press = null;
  };

  const onPointerLeave = () => {
    if (S.press && !S.press.committed) {
      S.press = null;
    }
    if (isDragging(S)) return;
    S.cursor.inside = false;
    S.hoverCard = null;
  };

  const stepBrowse = useCallback(
    (direction: "prev" | "next") => {
      const L = layoutRef.current;
      const step = L ? L.cardW + L.gap : 280;
      const impulse = direction === "next" ? -step : step;
      S.browse += impulse;
      S.vel = impulse * 0.15;
    },
    [S]
  );

  const onKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepBrowse("prev");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      stepBrowse("next");
    }
  };

  // Main animation loop
  useEffect(() => {
    const root = rootRef.current;
    if (!root || isReducedMotion) return;
    const st = S;
    const box = boxRef.current;

    const measure = () => {
      const r = root.getBoundingClientRect();
      box.left = r.left;
      box.top = r.top;
      if (r.width < 1 || r.height < 1) return false;
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      const changed = w !== box.w || h !== box.h;
      box.w = w;
      box.h = h;
      return changed;
    };

    const relayout = () => {
      if (!measure()) return;
      layoutRef.current = getLayout(box.w, box.h, n);
      if (!st.cursor.inside) {
        st.cursor.x = box.w / 2;
        st.cursor.y = box.h / 2;
      }
      applyCardSizes();
    };

    relayout();

    const updateFocusedCard = () => {
      let focused = st.hoverCard;
      if (!focused) {
        let best = Infinity;
        for (const card of cards) {
          const score = focusScore(card.cur);
          if (score < best) {
            best = score;
            focused = card;
          }
        }
      }
      if (focused && focused !== st.lastFocused) {
        st.lastFocused = focused;
        setFocusedIndex(focused.index);
      }
    };

    const staggerDenom = Math.max(1, n - 1);

    const advancePoses = (L: FmLayout, mode2: FormationMode, dt: number) => {
      if (st.morphing) {
        st.morphMs += dt;
        let allDone = true;
        for (const card of cards) {
          const p = clamp(
            (st.morphMs - (MORPH_STAGGER * card.index) / staggerDenom) /
              MORPH_DUR,
            0,
            1
          );
          if (p < 1) allDone = false;
          lerpPose(
            card.cur,
            card.from,
            poseFor(mode2, card.index, L, 0),
            easeInOut(p)
          );
        }
        if (allDone) st.morphing = false;
        return;
      }
      for (const card of cards) {
        const t2 = poseFor(mode2, card.index, L, st.browse);
        const { cur } = card;
        if (!st.seeded || (mode2 === "tilt" && Math.abs(t2.x - cur.x) > L.W)) {
          copyPose(cur, t2);
        } else {
          lerpPose(cur, cur, t2, SPRING);
        }
      }
      st.seeded = true;
    };

    const swapTarget = (card: CardState, L: FmLayout) => {
      let tgt = 0;
      const a = card.cur;
      for (const other of cards) {
        if (other === card) continue;
        const b = other.cur;
        if (
          Math.abs(a.x - b.x) < (L.cardW * a.s + L.cardW * b.s) / 2 &&
          Math.abs(a.y - b.y) < (L.cardH * a.s + L.cardH * b.s) / 2
        ) {
          const gapNow = a.z - b.z;
          const prox = Math.max(0, 1 - Math.abs(gapNow) / SWAP_BAND);
          const gapPrev = card.prevZ - other.prevZ;
          const cross = Math.min(
            1,
            Math.abs(gapNow - gapPrev) / SWAP_SPEED_REF
          );
          const v = prox * cross;
          if (v > tgt) tgt = v;
        }
      }
      return tgt;
    };

    const frame = (now: number) => {
      const L = layoutRef.current;
      if (!L) {
        st.raf = requestAnimationFrame(frame);
        return;
      }
      const dt = Math.min(50, now - (st.lastTime || now));
      st.lastTime = now;
      const mode2 = modeRef.current;
      const dragging = isDragging(st);

      const rr = root.getBoundingClientRect();
      box.left = rr.left;
      box.top = rr.top;

      if (dragging || st.morphing) {
        st.hoverCard = null;
      } else if (st.cursor.inside) {
        st.hoverCard = hoverHit(st.cursor.x, st.cursor.y);
      }

      root.style.cursor = dragging ? "grabbing" : "grab";

      if (!dragging && !st.morphing) {
        st.browse += st.vel;
        st.vel *= 0.92;
        if (Math.abs(st.vel) < 0.02) st.vel = 0;
      }

      const ty = (st.cursor.x / L.W - 0.5) * PARALLAX_MAX;
      const tx = (0.5 - st.cursor.y / L.H) * PARALLAX_MAX;
      st.curTX += (tx - st.curTX) * 0.06;
      st.curTY += (ty - st.curTY) * 0.06;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `rotateX(${st.curTX}deg) rotateY(${st.curTY}deg)`;
      }

      advancePoses(L, mode2, dt);

      for (const card of cards) {
        card.hov += ((card === st.hoverCard ? 1 : 0) - card.hov) * HOVER_EASE;
      }

      for (const card of cards) {
        card.swap += (swapTarget(card, L) - card.swap) * 0.3;
      }

      for (const card of cards) {
        const { cur } = card;
        if (card.outer) {
          card.outer.style.transform = poseTransform(cur);
          card.outer.style.opacity = String(
            cur.o * (1 - card.swap * (1 - SWAP_FLOOR))
          );
        }
        card.inner?.style.setProperty("--hv", String(card.hov));
        card.prevZ = cur.z;
      }

      updateFocusedCard();
      st.raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!st.raf) {
        st.lastTime = 0;
        st.raf = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      if (st.raf) {
        cancelAnimationFrame(st.raf);
        st.raf = 0;
      }
    };
    const evalRun = () => {
      if (st.onScreen && st.visible) start();
      else stop();
    };

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;
        st.onScreen = entry.isIntersecting;
        evalRun();
      },
      { threshold: 0 }
    );
    io.observe(root);

    const onVis = () => {
      st.visible = document.visibilityState === "visible";
      evalRun();
    };
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver(() => relayout());
    ro.observe(root);
    window.addEventListener("resize", relayout);

    // Horizontal wheel only; vertical scroll is NEVER prevented
    const onWheel = (e: WheelEvent) => {
      if (isUI(e.target)) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (st.morphing) return;
        const gain =
          modeRef.current === "flat" || modeRef.current === "ring" ? 0.6 : 0.8;
        const impulse = -e.deltaX * gain;
        st.browse += impulse;
        st.vel = impulse * 0.25;
      }
    };
    root.addEventListener("wheel", onWheel, { passive: false });

    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", relayout);
      root.removeEventListener("wheel", onWheel);
      st.seeded = false;
      box.w = 0;
      box.h = 0;
    };
  }, [cards, n, S, isReducedMotion]);

  // Entrance animation
  useEffect(() => {
    if (isReducedMotion) return;
    const inners = cards
      .map((c) => c.inner)
      .filter((el): el is HTMLDivElement => el !== null);
    if (!inners.length) return;

    gsap.set(inners, {
      opacity: 0,
      scale: 0.9,
      yPercent: 4,
    });
    let cancelled = false;
    let tween: gsap.core.Tween | null = null;
    const play = () => {
      if (cancelled) return;
      tween = gsap.to(inners, {
        delay: 0.05,
        duration: 0.8,
        ease: "power3.out",
        opacity: 1,
        scale: 1,
        stagger: { each: 0.03, from: "edges" },
        yPercent: 0,
      });
    };
    const playWhenReady = async () => {
      await document.fonts.ready;
      play();
    };
    void playWhenReady();
    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, [cards, isReducedMotion]);

  const currentWork = works[focusedIndex] || works[0];

  // Reduced motion alternative: clean static responsive grid
  if (isReducedMotion) {
    return (
      <div className="w-full flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {works.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-xs flex flex-col justify-between"
            >
              <div className="w-full aspect-square flex items-center justify-center p-4 bg-zinc-50 rounded-xl mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {item.category || "INAPROC"}
                </span>
                <h4 className="text-sm font-semibold text-ink line-clamp-2">
                  {item.title}
                </h4>
              </div>
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 text-xs font-medium text-accent hover:underline"
                >
                  Lihat di INAPROC <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const stageStyle: CustomCSS = {
    "--fm-bg": "#FFFFFF",
    "--fm-fg": "#111827",
    background: "#FFFFFF",
    color: "#111827",
    fontFamily: SANS,
    touchAction: "pan-y",
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Top Gallery Toolbar: Hints on left, Mode Switcher on right (always clear of sticky navbar) */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 py-1">
        {/* Mode Switcher: Datar, Melingkar, Miring */}
        <div
          role="tablist"
          data-fm-ui
          aria-label="Mode tampilan katalog"
          className="flex items-center gap-1 rounded-full p-1 bg-white border border-zinc-200 shadow-xs"
        >
          {MODES.map((m) => {
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                role="tab"
                type="button"
                data-fm-ui
                aria-selected={active}
                onClick={(e) => {
                  e.preventDefault();
                  handleModeChange(m.id);
                }}
                className={`cursor-pointer rounded-full transition-all duration-200 text-xs sm:text-sm font-medium px-4 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-accent/40 ${
                  active
                    ? "bg-accent text-white shadow-xs font-semibold"
                    : "text-zinc-600 hover:text-ink hover:bg-zinc-100"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Formation Stage with crisp White Canvas & Subtle Border */}
      <section
        ref={rootRef}
        tabIndex={0}
        role="region"
        aria-label="Galeri Produk Interaktif"
        onKeyDown={onKeyDown}
        className="relative w-full h-[500px] sm:h-[560px] select-none overflow-hidden rounded-2xl border border-zinc-200/90 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-accent/40"
        style={stageStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPress}
        onPointerCancel={endPress}
        onPointerLeave={onPointerLeave}
      >
        {/* Subtle stage ambient illumination */}
        <div className="pointer-events-none absolute inset-0 bg-radial from-zinc-50/60 to-transparent opacity-80" />

        <div
          className="absolute inset-0"
          style={{ perspective: `${PERSP}px`, perspectiveOrigin: "50% 50%" }}
        >
          <div
            ref={parallaxRef}
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {cards.map((card) => (
              <div
                key={card.index}
                ref={(el) => {
                  card.outer = el;
                }}
                role="img"
                aria-label={`${card.work.title} - ${card.work.category || "Produk INAPROC"}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  opacity: 0,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                {/* Clean White Card with soft natural shadow */}
                <div
                  ref={(el) => {
                    card.inner = el;
                  }}
                  className="absolute inset-0 overflow-hidden bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between"
                  style={{
                    boxShadow:
                      "0 12px 32px -8px rgba(0, 0, 0, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div
                    className="relative w-full flex-1 flex items-center justify-center overflow-hidden transition-transform duration-200"
                    style={{
                      transform: `scale(calc(1 + ${HOVER_ZOOM} * var(--hv, 0)))`,
                    }}
                  >
                    <img
                      src={card.work.image}
                      alt={card.work.title}
                      className="max-h-full max-w-full object-contain pointer-events-none select-none drop-shadow-xs"
                      loading="lazy"
                    />
                  </div>

                  {/* Card Label on Bottom */}
                  <div className="w-full pt-3 border-t border-zinc-100 flex flex-col gap-0.5 text-center">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-accent truncate">
                      {card.work.category || "e-Katalog INAPROC"}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-ink line-clamp-2 leading-snug">
                      {card.work.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Caption Bar below the stage with details, actions, counter, and accessible buttons */}
      <div
        data-fm-ui
        className="w-full bg-white rounded-2xl border border-zinc-200/90 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs"
      >
        {/* Left: Product Info */}
        <div className="flex flex-col gap-1 text-center md:text-left min-w-0 flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">
              {currentWork.category || "e-Katalog INAPROC"}
            </span>
            <span className="text-zinc-300">•</span>
            <span
              className="text-xs font-mono font-medium text-zinc-500"
              style={{ fontFamily: MONO }}
            >
              {`${pad(focusedIndex + 1)} / ${pad(n)}`}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-ink truncate max-w-xl">
            {currentWork.title}
          </h3>
        </div>

        {/* Right: Actions and Previous/Next Controls */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 sm:gap-3">
          {/* Arrow navigation buttons */}
          <div className="flex items-center gap-1 mr-1">
            <button
              type="button"
              onClick={() => stepBrowse("prev")}
              aria-label="Produk sebelumnya"
              className="p-2 sm:p-2.5 rounded-full border border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-ink transition-colors focus:outline-hidden focus:ring-2 focus:ring-accent/40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => stepBrowse("next")}
              aria-label="Produk berikutnya"
              className="p-2 sm:p-2.5 rounded-full border border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-ink transition-colors focus:outline-hidden focus:ring-2 focus:ring-accent/40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Action 1: Lihat di INAPROC */}
          {currentWork.href && (
            <a
              href={currentWork.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-4 py-2 rounded-full border border-zinc-300 text-zinc-800 hover:bg-zinc-50 hover:border-zinc-400 transition-colors focus:outline-hidden focus:ring-2 focus:ring-accent/40"
            >
              Lihat di INAPROC
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
            </a>
          )}

          {/* Action 2: Minta Penawaran */}
          <a
            href="#cta-pengadaan"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-4 py-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-colors shadow-xs focus:outline-hidden focus:ring-2 focus:ring-accent/40"
          >
            Minta Penawaran
          </a>
        </div>
      </div>
    </div>
  );
};

export default Formation;
