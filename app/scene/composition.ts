import * as THREE from "three";
import { clamp01 } from "./story";

export type ModuleVariant =
  | "registration"
  | "outpatient"
  | "inpatient"
  | "pharmacy"
  | "laboratory"
  | "radiology"
  | "records"
  | "billing"
  | "asset";

export interface ModuleDef {
  id: string;
  code: string;
  name: string;
  variant: ModuleVariant;
  /** Sudut di bidang xz (derajat); 90 = berada di +z, menghadap kamera. */
  angle: number;
  /** Jarak dari inti data (satuan dunia). */
  radius: number;
  /** Ketinggian dasar modul di atas lantai. */
  y: number;
  /** Jarak dorong menjauh dari inti saat fragmentasi. */
  drift: number;
  /** Kenaikan vertikal saat fragmentasi. */
  lift: number;
  /** Rotasi arah saat fragmentasi (radian). */
  spin: number;
  /** Skala badan modul. */
  scale: number;
}

/**
 * Komposisi: cincin teknis mengelilingi inti data — bukan diagram literal
 * (DESIGN §9.2), tapi relasi spasial "banyak unit → satu sistem".
 */
export const MODULES: ReadonlyArray<ModuleDef> = [
  { id: "pendaftaran", code: "REG", name: "Pendaftaran", variant: "registration", angle: 100, radius: 4.5, y: 0, drift: 1.7, lift: 0.22, spin: 0.16, scale: 1 },
  { id: "rawatjalan", code: "OUT", name: "Rawat Jalan", variant: "outpatient", angle: 140, radius: 5.3, y: 0.06, drift: 2.3, lift: 0.46, spin: -0.22, scale: 0.95 },
  { id: "rawatinap", code: "INP", name: "Rawat Inap", variant: "inpatient", angle: 180, radius: 5, y: 0, drift: 2.6, lift: 0.58, spin: 0.24, scale: 1.05 },
  { id: "farmasi", code: "PHA", name: "Farmasi", variant: "pharmacy", angle: 220, radius: 4.6, y: 0.1, drift: 1.9, lift: 0.3, spin: -0.14, scale: 1 },
  { id: "laboratorium", code: "LAB", name: "Laboratorium", variant: "laboratory", angle: 260, radius: 4.9, y: 0, drift: 2.1, lift: 0.4, spin: 0.2, scale: 0.98 },
  { id: "radiologi", code: "RAD", name: "Radiologi", variant: "radiology", angle: 300, radius: 5.4, y: 0.04, drift: 2.5, lift: 0.52, spin: -0.26, scale: 1 },
  { id: "rekammedis", code: "RME", name: "Rekam Medis", variant: "records", angle: 340, radius: 4.7, y: 0, drift: 1.6, lift: 0.24, spin: 0.12, scale: 1.02 },
  { id: "billing", code: "BIL", name: "Billing", variant: "billing", angle: 20, radius: 5.1, y: 0.08, drift: 2.2, lift: 0.36, spin: -0.18, scale: 0.96 },
  { id: "asset", code: "AST", name: "Aset & Logistik", variant: "asset", angle: 60, radius: 4.4, y: 0, drift: 1.8, lift: 0.3, spin: 0.2, scale: 1 },
];

/** Subset untuk perangkat lemah: tetap menyebar merata di cincin. */
export const LOW_QUALITY_INDICES = [0, 2, 4, 6, 8];

export function moduleIndices(quality: "high" | "low"): number[] {
  return quality === "high" ? MODULES.map((_, i) => i) : LOW_QUALITY_INDICES;
}

/** Pemetaan id modul konten (content.ts) → indeks modul scene. */
const CONTENT_TO_SCENE: Record<string, number> = {
  pendaftaran: 0,
  "rawat-inap": 2,
  farmasi: 3,
  "lab-rad": 4,
  billing: 7,
  rme: 6,
  aset: 8,
};

/** Indeks fokus scene untuk sebuah modul konten; -1 bila tidak dikenal. */
export function focusIndexOf(moduleId: string): number {
  const mapped = CONTENT_TO_SCENE[moduleId];
  if (mapped !== undefined) return mapped;
  return MODULES.findIndex((m) => m.id === moduleId);
}

const RAD = Math.PI / 180;

export function moduleBase(index: number, out = new THREE.Vector3()) {
  const m = MODULES[index];
  return out.set(
    Math.cos(m.angle * RAD) * m.radius,
    m.y,
    Math.sin(m.angle * RAD) * m.radius,
  );
}

/**
 * Posisi modul untuk derajat fragmentasi tertentu (0 = terhubung, 1 = terpisah
 * penuh). Arah dorong radial menjauh dari inti supaya pemisahan terbaca.
 */
export function modulePosition(
  index: number,
  fracture: number,
  out = new THREE.Vector3(),
) {
  const m = MODULES[index];
  const f = clamp01(fracture);
  const radial = new THREE.Vector3(
    Math.cos(m.angle * RAD),
    0,
    Math.sin(m.angle * RAD),
  );
  return out
    .set(
      Math.cos(m.angle * RAD) * m.radius,
      m.y + m.lift * f,
      Math.sin(m.angle * RAD) * m.radius,
    )
    .addScaledVector(radial, m.drift * f);
}

export function moduleRotationY(index: number, fracture: number) {
  return MODULES[index].spin * clamp01(fracture);
}

/**
 * Orientasi dasar modul: sisi "depan" (detail) menghadap keluar dari inti,
 * sisi penghubung menghadap inti — supaya relasi spasial terbaca.
 */
export function moduleFacingY(index: number) {
  const m = MODULES[index];
  return Math.atan2(Math.cos(m.angle * RAD), Math.sin(m.angle * RAD));
}

/** Titik penghubung di sisi modul yang menghadap inti (untuk jalur data). */
export function modulePort(
  index: number,
  fracture: number,
  out = new THREE.Vector3(),
) {
  const m = MODULES[index];
  modulePosition(index, fracture, out);
  const inward = new THREE.Vector3(
    -Math.cos(m.angle * RAD),
    0,
    -Math.sin(m.angle * RAD),
  );
  return out.addScaledVector(inward, 0.48 * m.scale).setY(out.y + 0.42 * m.scale);
}

/** Titik awal jalur data di tepi inti. */
export function corePort(index: number, out = new THREE.Vector3()) {
  const m = MODULES[index];
  return out.set(
    Math.cos(m.angle * RAD) * 1.45,
    1.15,
    Math.sin(m.angle * RAD) * 1.45,
  );
}

/** Titik fokus kamera saat mengeksplorasi modul (pusat massa modul). */
export function moduleFocusPoint(
  index: number,
  fracture: number,
  out = new THREE.Vector3(),
) {
  modulePosition(index, fracture, out);
  return out.setY(out.y + 0.62 * MODULES[index].scale);
}
