"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { moduleFocusPoint } from "./composition";
import { fractureAt, focusWeightAt, smoothstep, storyStore } from "./story";

const FOV = 40;

interface Key {
  p: number;
  pos: THREE.Vector3;
  look: THREE.Vector3;
}

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/**
 * Rail kamera per state cerita (MOTION §12–§17). Dolly panjang, tanpa
 * rotasi cepat, tanpa lompatan FOV (MOTION §31).
 */
const KEYS: Key[] = [
  // p0 Hero — artefak di ruang negatif, offset ke kanan dari kolom copy.
  { p: 0, pos: V(0.4, 3, 12.6), look: V(-1.5, 1.25, 0) },
  // p0.2 Problem — pull-back halus supaya fragmentasi terbaca.
  { p: 0.2, pos: V(-1.8, 3.3, 13.6), look: V(-0.6, 1.2, 0) },
  // p0.4 Solution — tetap lebar, berayun ke kiri.
  { p: 0.4, pos: V(-3.2, 4, 15.2), look: V(0, 1.3, 0) },
  // p0.6 Modules — dolly melewati cincin.
  { p: 0.6, pos: V(1.6, 2.3, 8.4), look: V(0, 1.3, 0) },
  // p0.75 Process — lateral track tiga-perempat, diredam.
  { p: 0.75, pos: V(4, 1.95, 7.2), look: V(1.2, 1.05, 1.1) },
  // p0.9 Trust — menetap, tenang, lebar.
  { p: 0.9, pos: V(-3.6, 2.7, 9.4), look: V(-0.4, 1.2, 0.3) },
  // p1 Final CTA — pull-back panjang seperti penutup film produk.
  { p: 1, pos: V(0.2, 4.6, 16), look: V(0, 1.2, 0) },
];

const STATIC = { pos: V(1, 3.1, 13.4), look: V(0, 1.2, 0) };

const posOut = new THREE.Vector3();
const lookOut = new THREE.Vector3();
const focusOut = new THREE.Vector3();
const focusPos = new THREE.Vector3();

function sample(p: number, outPos: THREE.Vector3, outLook: THREE.Vector3) {
  let i = 0;
  while (i < KEYS.length - 2 && p > KEYS[i + 1].p) i++;
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const t = smoothstep(a.p, b.p, p);
  outPos.copy(a.pos).lerp(b.pos, t);
  outLook.copy(a.look).lerp(b.look, t);
}

export default function CameraRig() {
  const look = useRef(new THREE.Vector3(0, 1.1, 0));
  /* Dolly-in pembuka: kamera masuk ke dunia saat pertama kali tampil,
     bukan berputar-putar tanpa tujuan. */
  const settle = useRef(0);

  useFrame((state, delta) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const p = storyStore.progress;

    if (storyStore.reduced) {
      camera.position.copy(STATIC.pos);
      look.current.copy(STATIC.look);
      camera.lookAt(STATIC.look);
      camera.fov = FOV;
      camera.updateProjectionMatrix();
      return;
    }

    settle.current = THREE.MathUtils.damp(settle.current, 1, 1.5, delta);
    sample(p, posOut, lookOut);

    const weight = focusWeightAt(p);
    if (weight > 0 && storyStore.focus >= 0) {
      moduleFocusPoint(storyStore.focus, fractureAt(p), focusOut);
      // Kamera keluar dari cincin dan sedikit menyamping supaya modul tampil
      // tiga-perempat, dengan sistem utuh sebagai latar.
      const len = Math.hypot(focusOut.x, focusOut.z) || 1;
      const ux = focusOut.x / len;
      const uz = focusOut.z / len;
      focusPos.set(
        focusOut.x + ux * 5 - uz * 2.1,
        focusOut.y + 2,
        focusOut.z + uz * 5 + ux * 2.1,
      );
      posOut.lerp(focusPos, weight);
      lookOut.lerp(focusOut, weight);
    }

    /* Idle minimal: hanya goyangan sangat halus, separuh amplitudo lama. */
    const t = state.clock.elapsedTime;
    const settleOffset = 1 - settle.current;
    posOut.z += settleOffset * 4.4;
    posOut.y += settleOffset * 1.1;
    posOut.x += Math.sin(t * 0.07) * 0.05;
    posOut.y += Math.sin(t * 0.055 + 1.2) * 0.035;

    camera.position.copy(posOut);
    const k = 1 - Math.exp(-5 * Math.min(delta, 0.1));
    look.current.lerp(lookOut, k);
    camera.lookAt(look.current);

    if (camera.fov !== FOV) {
      camera.fov = FOV;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
