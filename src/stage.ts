export interface TimelineBeat {
  id: string;
  from: number;
  to: number;
  type: "loop" | "sequence" | "held";
  sequenceName?: string;
  loopVideoId?: string;
  focal: [number, number]; // [fx, fy] focal point for walk fallback
  veil: number; // 0..0.55
  transitionType?: number; // 0..7
}

export const TIMELINE: TimelineBeat[] = [
  // 0.00–0.04 | Hero: ambient loop of photo 1 (perusahaan)
  {
    id: "hero",
    from: 0.0,
    to: 0.04,
    type: "loop",
    loopVideoId: "hero-loop",
    focal: [0.72, 0.58],
    veil: 0.32,
    transitionType: 6, // ring reveal to walk
  },
  // 0.04–0.14 | Walk from company entrance to office (sequence t12)
  {
    id: "walk-t12",
    from: 0.04,
    to: 0.14,
    type: "sequence",
    sequenceName: "t12",
    focal: [0.55, 0.5],
    veil: 0.0,
    transitionType: 0,
  },
  // 0.14–0.24 | Empat Pilar over held office frame (last frame of t12)
  {
    id: "pilar",
    from: 0.14,
    to: 0.24,
    type: "held",
    sequenceName: "t12",
    focal: [0.5, 0.5],
    veil: 0.45,
    transitionType: 1, // breathe drift
  },
  // 0.24–0.38 | Walk from office to server room (sequence t23)
  {
    id: "walk-t23",
    from: 0.24,
    to: 0.38,
    type: "sequence",
    sequenceName: "t23",
    focal: [0.58, 0.52],
    veil: 0.0,
    transitionType: 0,
  },
  // 0.38–0.52 | Produk & Layanan (3 beats) over held server-room frame (last frame of t23)
  {
    id: "produk",
    from: 0.38,
    to: 0.52,
    type: "held",
    sequenceName: "t23",
    focal: [0.5, 0.5],
    veil: 0.45,
    transitionType: 1,
  },
  // 0.52–0.64 | Walk from server room into maintenance room (sequence t34)
  {
    id: "walk-t34",
    from: 0.52,
    to: 0.64,
    type: "sequence",
    sequenceName: "t34",
    focal: [0.5, 0.48],
    veil: 0.0,
    transitionType: 0,
  },
  // 0.64–0.74 | Cara Pengadaan over held maintenance-room frame (last frame of t34)
  {
    id: "cara-pengadaan",
    from: 0.64,
    to: 0.74,
    type: "held",
    sequenceName: "t34",
    focal: [0.5, 0.5],
    veil: 0.45,
    transitionType: 1,
  },
  // 0.74–0.84 | Walk from maintenance room to closing shot (sequence t45)
  {
    id: "walk-t45",
    from: 0.74,
    to: 0.84,
    type: "sequence",
    sequenceName: "t45",
    focal: [0.65, 0.5],
    veil: 0.0,
    transitionType: 0,
  },
  // 0.84–0.92 | FAQ accordion over faded closing frame (last frame of t45)
  {
    id: "faq",
    from: 0.84,
    to: 0.92,
    type: "held",
    sequenceName: "t45",
    focal: [0.5, 0.5],
    veil: 0.52,
    transitionType: 1,
  },
  // 0.92–1.00 | Hubungi Kami/footer: ambient loop of photo 5 (penutup)
  {
    id: "footer",
    from: 0.92,
    to: 1.0,
    type: "loop",
    loopVideoId: "footer-loop",
    focal: [0.65, 0.5],
    veil: 0.4,
    transitionType: 6,
  },
];

export function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function getCurrentBeat(p: number): TimelineBeat {
  for (let i = 0; i < TIMELINE.length; i++) {
    if (p >= TIMELINE[i].from && p <= TIMELINE[i].to) {
      return TIMELINE[i];
    }
  }
  return TIMELINE[TIMELINE.length - 1];
}
