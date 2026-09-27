import * as THREE from "three";
import { BRUSHED, GRAPHITE, MATTE, P } from "./palette";

/**
 * Material bersama untuk seluruh modul — dibuat sekali di tingkat modul,
 * dipakai lintas instance supaya jumlah material terbatas (MOTION §34).
 */
export const M = {
  matte: new THREE.MeshStandardMaterial({ ...MATTE }),
  matteLight: new THREE.MeshStandardMaterial({
    color: "#5a5a64",
    roughness: 0.62,
    metalness: 0.22,
  }),
  brushed: new THREE.MeshStandardMaterial({ ...BRUSHED }),
  graphite: new THREE.MeshStandardMaterial({ ...GRAPHITE }),
  /** Indikator jalur data aktif — intensitasnya diperbarui tiap frame. */
  accent: new THREE.MeshStandardMaterial({
    color: "#111a3d",
    emissive: new THREE.Color(P.blue),
    emissiveIntensity: 0.7,
    roughness: 0.42,
    metalness: 0.1,
  }),
  /** Layar/panel kecil dengan terang redup. */
  screen: new THREE.MeshStandardMaterial({
    color: "#121626",
    emissive: new THREE.Color("#2a3566"),
    emissiveIntensity: 0.5,
    roughness: 0.3,
    metalness: 0.05,
  }),
  /** Jalur data vertikal pada inti terpusat — intensitasnya di Frame. */
  coreStrip: new THREE.MeshStandardMaterial({
    color: "#0d1128",
    emissive: new THREE.Color(P.blue),
    emissiveIntensity: 0.5,
    roughness: 0.42,
    metalness: 0.1,
  }),
};
