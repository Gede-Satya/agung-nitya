/**
 * formation-poses.ts
 *
 * Layout engine and mathematical helpers for Formation 3D gallery.
 * Custom implementation supporting Datar (Flat), Melingkar (Ring 3D), and Miring (Cover Flow Tilt).
 */

export interface Work {
  image: string;
  title: string;
  category?: string;
  href?: string;
  isPlaceholder?: boolean;
}

export interface Pose {
  o: number; // opacity (0..1)
  rx: number; // rotation X (deg)
  ry: number; // rotation Y (deg)
  rz: number; // rotation Z (deg)
  s: number; // scale (e.g. 1)
  x: number; // translation X (px)
  y: number; // translation Y (px)
  z: number; // translation Z (px)
}

export type FormationMode = "flat" | "ring" | "tilt";

export interface FmLayout {
  W: number;
  H: number;
  cardW: number;
  cardH: number;
  gap: number;
  count: number;
}

export const MODES: { id: FormationMode; label: string }[] = [
  { id: "flat", label: "Datar" },
  { id: "ring", label: "Melingkar" },
  { id: "tilt", label: "Miring" },
];

export const HOVER_EASE = 0.15;
export const HOVER_ZOOM = 0.06;
export const MORPH_DUR = 600;
export const MORPH_STAGGER = 200;
export const PARALLAX_MAX = 8;
export const PERSP = 1200;
export const SPRING = 0.12;
export const SWAP_BAND = 180;
export const SWAP_FLOOR = 0.25;
export const SWAP_SPEED_REF = 40;

export const clamp = (val: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, val));

export const copyPose = (dest: Pose, src: Pose): void => {
  dest.o = src.o;
  dest.rx = src.rx;
  dest.ry = src.ry;
  dest.rz = src.rz;
  dest.s = src.s;
  dest.x = src.x;
  dest.y = src.y;
  dest.z = src.z;
};

export const easeInOut = (t: number): number =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

export const lerpPose = (out: Pose, a: Pose, b: Pose, t: number): void => {
  out.o = a.o + (b.o - a.o) * t;
  out.rx = a.rx + (b.rx - a.rx) * t;
  out.ry = a.ry + (b.ry - a.ry) * t;
  out.rz = a.rz + (b.rz - a.rz) * t;
  out.s = a.s + (b.s - a.s) * t;
  out.x = a.x + (b.x - a.x) * t;
  out.y = a.y + (b.y - a.y) * t;
  out.z = a.z + (b.z - a.z) * t;
};

export const focusScore = (p: Pose): number => {
  const distFromCenter = Math.hypot(p.x, p.y);
  return distFromCenter - p.z * 0.4;
};

export const poseTransform = (p: Pose): string =>
  `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, ${p.z.toFixed(2)}px) ` +
  `rotateX(${p.rx.toFixed(2)}deg) rotateY(${p.ry.toFixed(2)}deg) rotateZ(${p.rz.toFixed(2)}deg) ` +
  `scale(${p.s.toFixed(4)})`;

export const getLayout = (w: number, h: number, count: number): FmLayout => {
  const isMobile = w < 640;
  const isTablet = w >= 640 && w < 1024;

  let cardW: number;
  let cardH: number;

  if (isMobile) {
    cardW = clamp(Math.round(w * 0.62), 200, 270);
    cardH = clamp(Math.round(cardW * 1.25), 250, 340);
  } else if (isTablet) {
    cardW = clamp(Math.round(w * 0.36), 240, 310);
    cardH = clamp(Math.round(cardW * 1.25), 300, 390);
  } else {
    cardW = clamp(Math.round(w * 0.22), 260, 330);
    cardH = clamp(Math.round(cardW * 1.25), 330, 420);
  }

  const maxH = Math.max(180, h - 80);
  if (cardH > maxH) {
    const scale = maxH / cardH;
    cardH = maxH;
    cardW = Math.round(cardW * scale);
  }

  const gap = isMobile ? 20 : 28;

  return {
    W: w,
    H: h,
    cardW,
    cardH,
    gap,
    count: Math.max(1, count),
  };
};

export const poseFor = (
  mode: FormationMode,
  index: number,
  L: FmLayout,
  browse: number
): Pose => {
  const n = L.count;
  const spacing = L.cardW + L.gap;
  const trackW = n * spacing;

  // 1. RING MODE (Melingkar): Obvious 3D cylindrical carousel
  if (mode === "ring") {
    const radius = Math.max(L.cardW * 1.5, L.W * 0.4);
    const step = (2 * Math.PI) / n;
    // Angle driven by position + browsing offset
    const angle = index * step + browse / (L.cardW * 1.4);
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const x = sinA * radius;
    // Front card is at z = 40, back cards recede into 3D depth
    const z = (cosA - 1) * radius * 0.95 + 40;
    // Rotate card around Y to align with the tangent of the cylinder
    const ry = (angle * 180) / Math.PI;

    // Normalizing depth factor (0 at back, 1 at front)
    const depth = (cosA + 1) / 2;
    const s = 0.7 + 0.35 * depth;
    const o = clamp(0.2 + 0.8 * depth, 0.15, 1);

    return {
      o,
      rx: 0,
      ry,
      rz: 0,
      s,
      x,
      y: 0,
      z,
    };
  }

  // 2. TILT MODE (Miring): High-Impact 3D Cover Flow with distinct inward rotation
  if (mode === "tilt") {
    const stepX = L.cardW * 0.52;
    const trackWidthTilt = n * stepX;
    const rawX = index * stepX + browse;
    const wrappedX =
      ((((rawX + trackWidthTilt / 2) % trackWidthTilt) + trackWidthTilt) %
        trackWidthTilt) -
      trackWidthTilt / 2;

    const threshold = L.cardW * 0.32;
    let ry = 0;
    let z = 0;
    let s = 1;
    let o = 1;

    if (Math.abs(wrappedX) < threshold) {
      // Center focused card: flat, elevated, prominent
      const norm = wrappedX / threshold;
      ry = -norm * 22;
      z = 60;
      s = 1.08;
      o = 1;
    } else if (wrappedX > 0) {
      // Right wing: tilted sharply inward at 55 degrees
      const dist = (wrappedX - threshold) / (L.cardW * 0.55);
      ry = -55;
      z = -40 - dist * 90;
      s = clamp(0.92 - dist * 0.05, 0.7, 0.95);
      o = clamp(0.95 - dist * 0.12, 0.3, 1);
    } else {
      // Left wing: tilted sharply inward at 55 degrees
      const dist = (Math.abs(wrappedX) - threshold) / (L.cardW * 0.55);
      ry = 55;
      z = -40 - dist * 90;
      s = clamp(0.92 - dist * 0.05, 0.7, 0.95);
      o = clamp(0.95 - dist * 0.12, 0.3, 1);
    }

    return {
      o,
      rx: 0,
      ry,
      rz: 0,
      s,
      x: wrappedX,
      y: 0,
      z,
    };
  }

  // 3. FLAT MODE (Datar): Flat horizontal conveyor
  const rawX = index * spacing + browse;
  const wrappedX =
    ((((rawX + trackW / 2) % trackW) + trackW) % trackW) - trackW / 2;
  const distNorm = Math.abs(wrappedX) / (trackW / 2);

  const z = -distNorm * 80;
  const s = clamp(1 - distNorm * 0.12, 0.8, 1);
  const o = clamp(1 - distNorm * 0.35, 0.35, 1);

  return {
    o,
    rx: 0,
    ry: 0,
    rz: 0,
    s,
    x: wrappedX,
    y: 0,
    z,
  };
};
