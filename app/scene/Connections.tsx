"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { corePort, moduleIndices, modulePort } from "./composition";
import { fractureAt, flowAt, storyStore } from "./story";
import { P } from "./palette";

const SEGMENTS = 16;
const PULSES_PER_LINK = 2;
const PULSE_SPEED = 0.17;

const UP = new THREE.Vector3(0, 1, 0);
const tmpA = new THREE.Vector3();
const tmpB = new THREE.Vector3();
const tmpMid = new THREE.Vector3();
const tmpPerp = new THREE.Vector3();
const tmpP = new THREE.Vector3();
const tmpQ = new THREE.Vector3();
const dummy = new THREE.Object3D();

/**
 * Jalur data antara inti dan tiap modul. Semua link digabung jadi satu
 * LineSegments (satu draw call) dan dipindai ulang tiap frame tanpa alokasi
 * baru; pulsa data memakai InstancedMesh.
 */
export default function Connections({ quality }: { quality: "high" | "low" }) {
  const indices = useMemo(() => moduleIndices(quality), [quality]);
  const perLink = quality === "high" ? PULSES_PER_LINK : 1;

  const links = useMemo(
    () =>
      indices.map(
        () =>
          new THREE.CatmullRomCurve3(
            [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()],
            false,
            "centripetal",
            0.5,
          ),
      ),
    [indices],
  );

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = indices.length * SEGMENTS * 2;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c = new THREE.Color(P.blue);
    for (let i = 0; i < count * 3; i += 3) {
      colors[i] = c.r;
      colors[i + 1] = c.g;
      colors[i + 2] = c.b;
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [indices.length]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const lineRef = useRef<THREE.LineSegments>(null);
  const pulseRef = useRef<THREE.InstancedMesh>(null);
  const pulseCount = indices.length * perLink;

  useFrame((state) => {
    const p = storyStore.progress;
    const fracture = fractureAt(p);
    const flow = flowAt(p);
    const t = state.clock.elapsedTime;
    const positions = geometry.getAttribute("position") as THREE.BufferAttribute;

    for (let li = 0; li < links.length; li++) {
      const curve = links[li];
      corePort(indices[li], tmpA);
      modulePort(indices[li], fracture, tmpB);

      tmpMid.copy(tmpA).lerp(tmpB, 0.5);
      tmpMid.y += 0.3 + fracture * 0.5;
      tmpPerp.subVectors(tmpB, tmpA).cross(UP);
      if (tmpPerp.lengthSq() > 1e-6) {
        tmpPerp.normalize();
        tmpMid.addScaledVector(
          tmpPerp,
          Math.sin(li * 1.7) * fracture * 0.75,
        );
      }

      curve.points[0].copy(tmpA);
      curve.points[1].copy(tmpMid);
      curve.points[2].copy(tmpB);

      let o = li * SEGMENTS * 6;
      curve.getPoint(0, tmpP);
      for (let s = 0; s < SEGMENTS; s++) {
        curve.getPoint((s + 1) / SEGMENTS, tmpQ);
        positions.setXYZ(o / 3, tmpP.x, tmpP.y, tmpP.z);
        positions.setXYZ(o / 3 + 1, tmpQ.x, tmpQ.y, tmpQ.z);
        o += 6;
        tmpP.copy(tmpQ);
      }
    }
    positions.needsUpdate = true;

    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.1 + flow * 0.45 - fracture * 0.06;
    }

    const mesh = pulseRef.current;
    if (mesh) {
      const active = !storyStore.reduced && flow > 0.16 ? 1 : 0;
      let idx = 0;
      for (let li = 0; li < links.length; li++) {
        for (let k = 0; k < perLink; k++) {
          const local =
            (t * PULSE_SPEED + li * 0.11 + k / perLink + li * 0.07) % 1;
          links[li].getPoint(local, tmpP);
          const scale = active * (0.85 + Math.sin((local + t) * 6) * 0.15);
          dummy.position.copy(tmpP);
          dummy.scale.setScalar(scale);
          dummy.updateMatrix();
          mesh.setMatrixAt(idx, dummy.matrix);
          idx++;
        }
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      <lineSegments
        ref={lineRef}
        geometry={geometry}
        frustumCulled={false}
        renderOrder={1}
      >
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </lineSegments>

      <instancedMesh
        ref={pulseRef}
        args={[undefined, undefined, pulseCount]}
        frustumCulled={false}
        renderOrder={2}
      >
        <sphereGeometry args={[0.048, 8, 8]} />
        <meshBasicMaterial
          color={P.blue}
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
}
