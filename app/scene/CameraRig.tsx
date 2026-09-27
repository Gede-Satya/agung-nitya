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
  { p: 0, pos: V(1, 3, 12.8), look: V(0, 1.2, 0) },
  { p: 0.2, pos: V(-1.4, 3.4, 13.4), look: V(0, 1.2, 0) },
  { p: 0.4, pos: V(-3, 4.4, 15), look: V(0, 1.3, 0) },
  { p: 0.6, pos: V(1.6, 2.4, 9), look: V(0, 1.3, 0) },
  { p: 0.75, pos: V(4.6, 1.9, 6.8), look: V(1.4, 1, 1.2) },
  { p: 0.9, pos: V(-4.2, 2.6, 8), look: V(-0.6, 1.2, 0.4) },
  { p: 1, pos: V(0.2, 4.8, 16.4), look: V(0, 1.2, 0) },
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

    const t = state.clock.elapsedTime;
    posOut.x += Math.sin(t * 0.11) * 0.14;
    posOut.y += Math.sin(t * 0.085 + 1.2) * 0.09;

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
