/**
 * Store cerita 3D — satu-satunya sumber progres untuk Unified Hospital Data
 * System. Ditulis oleh driver scroll (ScrollTrigger) di AppShell dan dibaca
 * tiap frame oleh komponen scene. Objek dimutasi langsung (tanpa React state)
 * supaya tidak ada render ulang per frame.
 */

export type StoryState =
  | "UNIFIED"
  | "FRAGMENTED"
  | "RECONNECTING"
  | "EXPLORING"
  | "OPERATIONAL"
  | "COMPLETE";

/** Batas progres tiap state — mengikuti Master 3D Timeline (MOTION §11). */
export const STATE_BOUNDS: ReadonlyArray<readonly [StoryState, number, number]> =
  [
    ["UNIFIED", 0, 0.2],
    ["FRAGMENTED", 0.2, 0.4],
    ["RECONNECTING", 0.4, 0.6],
    ["EXPLORING", 0.6, 0.75],
    ["OPERATIONAL", 0.75, 0.9],
    ["COMPLETE", 0.9, 1],
  ];

export interface StoryStore {
  /** Progres scroll global 0..1. */
  progress: number;
  /** Indeks modul yang sedang dieksplorasi, -1 = tanpa fokus. */
  focus: number;
  /** Kualitas scene: "high" desktop, "low" tablet/mobile. */
  quality: "high" | "low";
  /** prefers-reduced-motion — matikan gerak, pertahankan komposisi. */
  reduced: boolean;
}

export const storyStore: StoryStore = {
  progress: 0,
  focus: -1,
  quality: "high",
  reduced: false,
};

/* Listener perubahan story — dipakai scene pada frameloop "demand"
   (reduced motion) supaya update progres tetap memicu render ulang. */
type StoryListener = () => void;
const listeners = new Set<StoryListener>();

export function subscribeStory(fn: StoryListener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function notify() {
  listeners.forEach((fn) => fn());
}

export function setStory(progress: number, focus = storyStore.focus) {
  const next = clamp01(progress);
  const changed = next !== storyStore.progress || focus !== storyStore.focus;
  storyStore.progress = next;
  storyStore.focus = focus;
  if (changed) notify();
}

/** Fokus modul (indeks MODULES, -1 = tanpa fokus) — dari pemilihan di UI. */
export function setFocus(index: number) {
  if (storyStore.focus === index) return;
  storyStore.focus = index;
  notify();
}

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const smoothstep = (start: number, end: number, value: number) => {
  const t = clamp01((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

/** Progres ternormalisasi di dalam rentang [a, b]. */
export const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Pendekatan eksponensial bebas-frame-rate (damping). */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-lambda * Math.min(dt, 0.1)));

export function stateAt(progress: number): StoryState {
  const p = clamp01(progress);
  for (const [state, start, end] of STATE_BOUNDS) {
    if (p < end || state === "COMPLETE") {
      if (p >= start) return state;
    }
  }
  return "UNIFIED";
}

/**
 * Derajat fragmentasi 0..1: diam di UNIFIED, naik penuh di akhir FRAGMENTED,
 * turun kembali selama RECONNECTING, nol untuk sisa cerita.
 */
export function fractureAt(p: number): number {
  if (p <= 0.2) return 0;
  if (p <= 0.4) return smoothstep(0.2, 0.4, p);
  if (p <= 0.6) return 1 - smoothstep(0.4, 0.6, p);
  return 0;
}

/**
 * Kekuatan aliran data 0..1: tenang di UNIFIED, terputus saat fragmentasi,
 * pulih dan menguat setelah reconnection.
 */
export function flowAt(p: number): number {
  if (p <= 0.2) return 0.5;
  if (p <= 0.4) return lerp(0.5, 0.08, smoothstep(0.2, 0.4, p));
  if (p <= 0.6) return lerp(0.08, 1, smoothstep(0.4, 0.6, p));
  if (p <= 0.9) return 1;
  return 0.85;
}

/**
 * Bobot kamera menuju modul yang sedang dieksplorasi (0..1) — hanya aktif di
 * rentang EXPLORING.
 */
export function focusWeightAt(p: number): number {
  if (storyStore.focus < 0) return 0;
  if (p <= 0.58 || p >= 0.78) return 0;
  return Math.min(smoothstep(0.58, 0.64, p), 1 - smoothstep(0.74, 0.78, p));
}
