/** Palet 3D — selaras dengan token CSS (DESIGN §4). Biru hanya untuk jalur data aktif. */
export const P = {
  canvas: "#0b0b0d",
  graphite: "#151518",
  surface: "#1d1d21",
  border: "#34312d",
  muted: "#9b9892",
  text: "#f1eee8",
  blue: "#5b7cff",
} as const;

/** Material matte standar untuk badan modul. */
export const MATTE = {
  color: "#46464e",
  roughness: 0.7,
  metalness: 0.18,
} as const;

/** Material logam sikat untuk detail structural. */
export const BRUSHED = {
  color: "#56524a",
  roughness: 0.5,
  metalness: 0.55,
} as const;

/** Material grafit gelap untuk plinth dan inti. */
export const GRAPHITE = {
  color: "#35353b",
  roughness: 0.6,
  metalness: 0.28,
} as const;
