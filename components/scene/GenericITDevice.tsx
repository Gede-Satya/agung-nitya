"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

interface GenericITDeviceProps {
  /** Optional pointer response coordinates */
  pointer?: { x: number; y: number };
}

/**
 * Creates a procedural UI mockup texture for Layer 4 (Panel Antarmuka).
 * Pure client-side Canvas 2D texture, 0 external network requests.
 */
function createProceduralUITexture(): THREE.Texture {
  if (typeof document === "undefined") {
    return new THREE.Texture();
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Window background (Dark graphite UI surface)
    ctx.fillStyle = "#151518";
    ctx.fillRect(0, 0, 1024, 640);

    // Header bar
    ctx.fillStyle = "#1D1D21";
    ctx.fillRect(0, 0, 1024, 70);

    // Subtle header border
    ctx.strokeStyle = "#34312D";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 70);
    ctx.lineTo(1024, 70);
    ctx.stroke();

    // Window controls
    const dots = ["#5B7CFF", "#9B9892", "#34312D"];
    dots.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(36 + i * 24, 35, 7, 0, Math.PI * 2);
      ctx.fill();
    });

    // Window title
    ctx.fillStyle = "#F1EEE8";
    ctx.font = "bold 20px monospace";
    ctx.fillText("SISTEM INFORMASI MANAJEMEN — MODUL INSTANSI", 130, 42);

    // Sidebar
    ctx.fillStyle = "#111114";
    ctx.fillRect(0, 70, 240, 570);

    // Sidebar items
    const navItems = [
      "Ringkasan Sistem",
      "Layanan Manajemen SDM",
      "Perangkat Terkoneksi",
      "Log Infrastruktur",
      "Status Pengadaan",
    ];
    navItems.forEach((text, i) => {
      if (i === 1) {
        ctx.fillStyle = "rgba(91, 124, 255, 0.15)";
        ctx.fillRect(16, 96 + i * 50, 208, 38);
        ctx.fillStyle = "#5B7CFF";
      } else {
        ctx.fillStyle = "#9B9892";
      }
      ctx.font = "16px sans-serif";
      ctx.fillText(text, 36, 120 + i * 50);
    });

    // Main content cards
    // Metric Card 1
    ctx.fillStyle = "#1D1D21";
    ctx.strokeStyle = "#34312D";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(270, 100, 330, 140, [12]);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#9B9892";
    ctx.font = "14px sans-serif";
    ctx.fillText("STATUS SISTEM INFORMASI", 294, 134);
    ctx.fillStyle = "#22C55E";
    ctx.beginPath();
    ctx.arc(298, 170, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#F1EEE8";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("OPERASIONAL AKTIF", 316, 178);
    ctx.fillStyle = "#9B9892";
    ctx.font = "13px monospace";
    ctx.fillText("SIMDINKES · KBLI TERDAFTAR", 294, 212);

    // Metric Card 2
    ctx.fillStyle = "#1D1D21";
    ctx.beginPath();
    ctx.roundRect(630, 100, 360, 140, [12]);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#9B9892";
    ctx.font = "14px sans-serif";
    ctx.fillText("PRODUK TAYANG INAPROC", 654, 134);
    ctx.fillStyle = "#5B7CFF";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("742 PRODUK", 654, 178);
    ctx.fillStyle = "#9B9892";
    ctx.font = "13px sans-serif";
    ctx.fillText("Katalog Elektronik Terverifikasi", 654, 212);

    // Data table / Telemetry rows
    ctx.fillStyle = "#1A1A1E";
    ctx.beginPath();
    ctx.roundRect(270, 270, 720, 330, [14]);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#F1EEE8";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Topologi Integrasi Layanan Instansi", 300, 310);

    for (let r = 0; r < 4; r++) {
      const rowY = 345 + r * 60;
      ctx.fillStyle = r % 2 === 0 ? "rgba(255, 255, 255, 0.02)" : "transparent";
      ctx.fillRect(285, rowY - 18, 690, 48);

      ctx.fillStyle = "#5B7CFF";
      ctx.fillRect(300, rowY + 2, 8, 8);

      ctx.fillStyle = "#F1EEE8";
      ctx.font = "15px sans-serif";
      const rowTitles = [
        "Gateway Integrasi SIMDINKES & Manajemen SDM",
        "Penyedia Perangkat Komputasi & Pemindai Data",
        "Pemeliharaan Terjadwal & Penjaminan Operasional",
        "Protokol Pengadaan Elektronik Terpadu",
      ];
      ctx.fillText(rowTitles[r] || "Modul Solusi", 324, rowY + 11);

      ctx.fillStyle = "#9B9892";
      ctx.font = "13px monospace";
      ctx.fillText("VERIFIKASI RESMI", 850, rowY + 11);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * GenericITDevice — DESIGN.md §5
 * SATU perangkat TI generik tanpa emblem merek:
 * - Mini PC pipih bersudut membulat (RoundedBox)
 * - Struktur 5 lapisan <group> (Layer 1–5) siap terurai saat scroll di Fase 2
 * - Di Fase 1: tampil utuh, presisi, dengan idle float pelan dan satu LED indikator aksen
 */
export default function GenericITDevice({ pointer }: GenericITDeviceProps) {
  const masterGroupRef = useRef<THREE.Group>(null);
  const lowerCasingRef = useRef<THREE.Group>(null);
  const componentBoardRef = useRef<THREE.Group>(null);
  const upperCasingRef = useRef<THREE.Group>(null);
  const interfacePanelRef = useRef<THREE.Group>(null);
  const connectionTopologyRef = useRef<THREE.Group>(null);

  // Reusable procedural texture for the interface panel
  const uiTexture = useMemo(() => createProceduralUITexture(), []);

  // Shared Physical Materials with varying roughness & metalness
  const casingMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#18181C",
        roughness: 0.38,
        metalness: 0.45,
        clearcoat: 0.14,
        clearcoatRoughness: 0.2,
      }),
    []
  );

  const darkAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#101013",
        roughness: 0.5,
        metalness: 0.2,
      }),
    []
  );

  const portMetalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#3A3A42",
        roughness: 0.25,
        metalness: 0.85,
      }),
    []
  );

  const goldPinMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#C8A651",
        roughness: 0.2,
        metalness: 0.9,
      }),
    []
  );

  const ledAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#5B7CFF",
        emissive: "#5B7CFF",
        emissiveIntensity: 2.2,
        roughness: 0.1,
      }),
    []
  );

  // Smooth, slow idle motion (DESIGN.md §5.3)
  useFrame(({ clock }) => {
    const group = masterGroupRef.current;
    if (!group) return;

    const t = clock.getElapsedTime();

    // Idle tilt & subtle floating oscillation (slow, calm, power2.inOut feel)
    const idlePitch = Math.sin(t * 0.45) * 0.025;
    const idleYaw = Math.cos(t * 0.35) * 0.035;
    const idleY = Math.sin(t * 0.7) * 0.04;

    // Pointer parallax response (desktop)
    const targetRotX = 0.32 + idlePitch + (pointer ? -pointer.y * 0.08 : 0);
    const targetRotY = -0.48 + idleYaw + (pointer ? pointer.x * 0.12 : 0);
    const targetY = idleY;

    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotX, 0.04);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, 0.04);
    group.position.y = THREE.MathUtils.lerp(group.position.y, targetY, 0.04);
  });

  return (
    <group ref={masterGroupRef} position={[0, 0, 0]} rotation={[0.32, -0.48, 0]}>
      {/* ────────────────────────────────────────────────────────
          LAPISAN 1: Casing Bawah (Lower Casing)
          Ventilasi, port I/O, satu LED kecil warna aksen #5B7CFF
          ──────────────────────────────────────────────────────── */}
      <group ref={lowerCasingRef} name="layer-1-lower-casing" position={[0, -0.16, 0]}>
        {/* Main Lower Chassis Tray */}
        <RoundedBox
          args={[3.4, 0.38, 2.8]}
          radius={0.16}
          smoothness={8}
          material={casingMaterial}
          castShadow
          receiveShadow
        />

        {/* Front Panel Inset */}
        <mesh position={[0, 0.02, 1.41]}>
          <planeGeometry args={[3.0, 0.22]} />
          <primitive object={darkAccentMaterial} />
        </mesh>

        {/* Port 1: USB-C Front */}
        <group position={[-0.9, 0.02, 1.412]}>
          <RoundedBox
            args={[0.22, 0.08, 0.02]}
            radius={0.03}
            smoothness={4}
            material={portMetalMaterial}
          />
        </group>

        {/* Port 2 & 3: Dual USB-A Front */}
        <group position={[-0.45, 0.02, 1.412]}>
          <RoundedBox
            args={[0.28, 0.11, 0.02]}
            radius={0.02}
            smoothness={4}
            material={portMetalMaterial}
          />
          {/* Blue USB 3.0 insert */}
          <mesh position={[0, 0, 0.005]}>
            <boxGeometry args={[0.22, 0.04, 0.01]} />
            <meshBasicMaterial color="#0A58CA" />
          </mesh>
        </group>

        <group position={[0.0, 0.02, 1.412]}>
          <RoundedBox
            args={[0.28, 0.11, 0.02]}
            radius={0.02}
            smoothness={4}
            material={portMetalMaterial}
          />
          <mesh position={[0, 0, 0.005]}>
            <boxGeometry args={[0.22, 0.04, 0.01]} />
            <meshBasicMaterial color="#0A58CA" />
          </mesh>
        </group>

        {/* Single Micro Status LED (Accent #5B7CFF) */}
        <group position={[1.15, 0.02, 1.415]}>
          {/* Bezel */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.01, 16]} />
            <primitive object={darkAccentMaterial} />
          </mesh>
          {/* Emissive Core */}
          <mesh position={[0, 0, 0.006]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.028, 0.028, 0.015, 16]} />
            <primitive object={ledAccentMaterial} />
          </mesh>
        </group>

        {/* Left Side Ventilation Slots */}
        <group position={[-1.71, 0.02, 0]}>
          {Array.from({ length: 9 }).map((_, i) => (
            <mesh key={`vent-l-${i}`} position={[0, 0, -0.9 + i * 0.22]}>
              <boxGeometry args={[0.02, 0.14, 0.1]} />
              <primitive object={darkAccentMaterial} />
            </mesh>
          ))}
        </group>

        {/* Right Side Ventilation Slots */}
        <group position={[1.71, 0.02, 0]}>
          {Array.from({ length: 9 }).map((_, i) => (
            <mesh key={`vent-r-${i}`} position={[0, 0, -0.9 + i * 0.22]}>
              <boxGeometry args={[0.02, 0.14, 0.1]} />
              <primitive object={darkAccentMaterial} />
            </mesh>
          ))}
        </group>

        {/* Rear I/O Panel (Ethernet RJ45, HDMI, Power) */}
        <group position={[0, 0.02, -1.41]}>
          {/* Ethernet Port */}
          <group position={[-0.9, 0, 0]}>
            <RoundedBox
              args={[0.32, 0.24, 0.04]}
              radius={0.03}
              smoothness={4}
              material={portMetalMaterial}
            />
            {/* RJ45 socket cavity */}
            <mesh position={[0, -0.02, -0.01]}>
              <boxGeometry args={[0.24, 0.18, 0.02]} />
              <primitive object={darkAccentMaterial} />
            </mesh>
            {/* Contact pins */}
            {[-0.06, -0.02, 0.02, 0.06].map((px, idx) => (
              <mesh key={`pin-${idx}`} position={[px, 0.04, -0.005]}>
                <boxGeometry args={[0.015, 0.04, 0.01]} />
                <primitive object={goldPinMaterial} />
              </mesh>
            ))}
          </group>

          {/* HDMI Port */}
          <group position={[-0.3, 0, 0]}>
            <RoundedBox
              args={[0.34, 0.14, 0.03]}
              radius={0.02}
              smoothness={4}
              material={portMetalMaterial}
            />
          </group>

          {/* DC Power Jack */}
          <group position={[0.7, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.11, 0.11, 0.04, 16]} />
              <primitive object={portMetalMaterial} />
            </mesh>
            <mesh position={[0, 0.01, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.05, 16]} />
              <primitive object={darkAccentMaterial} />
            </mesh>
          </group>
        </group>

        {/* 4 Rubber Feet underneath */}
        {[
          [-1.3, -0.21, -1.0],
          [1.3, -0.21, -1.0],
          [-1.3, -0.21, 1.0],
          [1.3, -0.21, 1.0],
        ].map(([fx, fy, fz], idx) => (
          <mesh key={`foot-${idx}`} position={[fx, fy, fz]}>
            <cylinderGeometry args={[0.12, 0.12, 0.04, 16]} />
            <primitive object={darkAccentMaterial} />
          </mesh>
        ))}
      </group>

      {/* ────────────────────────────────────────────────────────
          LAPISAN 2: Papan Komponen (Component Substrate)
          Kotak tipis, sirkuit, heatsink, dan micro chips
          ──────────────────────────────────────────────────────── */}
      <group ref={componentBoardRef} name="layer-2-component-substrate" position={[0, 0.02, 0]}>
        {/* Main PCB Slab */}
        <RoundedBox
          args={[3.15, 0.05, 2.55]}
          radius={0.08}
          smoothness={6}
          material={
            new THREE.MeshStandardMaterial({
              color: "#161D1A",
              roughness: 0.6,
              metalness: 0.1,
            })
          }
        />

        {/* Central SoC / Processor with fine heat spreader */}
        <group position={[-0.3, 0.05, 0]}>
          <RoundedBox
            args={[0.85, 0.05, 0.85]}
            radius={0.04}
            smoothness={4}
            material={
              new THREE.MeshStandardMaterial({
                color: "#2C2D32",
                roughness: 0.28,
                metalness: 0.75,
              })
            }
          />
          {/* SoC core die reflection */}
          <mesh position={[0, 0.03, 0]}>
            <boxGeometry args={[0.55, 0.01, 0.55]} />
            <meshStandardMaterial color="#1E2024" roughness={0.15} metalness={0.9} />
          </mesh>
        </group>

        {/* Aluminum Heatsink Fin Array */}
        <group position={[0.7, 0.07, -0.1]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={`fin-${i}`} position={[-0.45 + i * 0.13, 0, 0]}>
              <boxGeometry args={[0.04, 0.12, 1.1]} />
              <primitive object={portMetalMaterial} />
            </mesh>
          ))}
        </group>

        {/* Memory Modules & Surface Mount Components */}
        <group position={[-0.3, 0.05, 0.8]}>
          <mesh>
            <boxGeometry args={[0.9, 0.03, 0.35]} />
            <primitive object={darkAccentMaterial} />
          </mesh>
          {[-0.3, -0.1, 0.1, 0.3].map((cx, idx) => (
            <mesh key={`bga-${idx}`} position={[cx, 0.02, 0]}>
              <boxGeometry args={[0.14, 0.015, 0.24]} />
              <primitive object={casingMaterial} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ────────────────────────────────────────────────────────
          LAPISAN 3: Casing Atas (Upper Casing / Lid)
          Terpasang rapat dan presisi sebagai perangkat utuh di Fase 1
          ──────────────────────────────────────────────────────── */}
      <group ref={upperCasingRef} name="layer-3-upper-casing" position={[0, 0.19, 0]}>
        {/* Top Lid Shell */}
        <RoundedBox
          args={[3.4, 0.16, 2.8]}
          radius={0.16}
          smoothness={8}
          material={casingMaterial}
          castShadow
          receiveShadow
        />

        {/* Fine precision perimeter chamfer inset */}
        <mesh position={[0, -0.075, 0]}>
          <boxGeometry args={[3.36, 0.015, 2.76]} />
          <primitive object={darkAccentMaterial} />
        </mesh>
      </group>

      {/* ────────────────────────────────────────────────────────
          LAPISAN 4: Panel Antarmuka Melayang (Interface Panel)
          Disimpan di dalam perangkat di Fase 1 (akan melayang di Fase 2)
          ──────────────────────────────────────────────────────── */}
      <group
        ref={interfacePanelRef}
        name="layer-4-interface-panel"
        position={[0, 0.05, 0]}
        rotation={[-Math.PI / 16, 0, 0]}
        scale={[0.95, 0.95, 0.95]}
        visible={false}
      >
        <RoundedBox
          args={[3.2, 0.025, 2.0]}
          radius={0.06}
          smoothness={4}
          material={darkAccentMaterial}
        />
        <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.12, 1.92]} />
          <meshBasicMaterial map={uiTexture} transparent opacity={0.94} />
        </mesh>
      </group>

      {/* ────────────────────────────────────────────────────────
          LAPISAN 5: Garis Penghubung & Simbol Instansi (Institutional Topology)
          Disimpan untuk Fase 2 (tahap layanan)
          ──────────────────────────────────────────────────────── */}
      <group
        ref={connectionTopologyRef}
        name="layer-5-connection-topology"
        position={[0, 0.35, 0]}
        visible={false}
      >
        {[
          { pos: [-2.1, 0.3, -1.2], label: "INSTANSI 1" },
          { pos: [2.1, 0.4, -0.9], label: "INSTANSI 2" },
          { pos: [0.0, 0.6, -1.8], label: "PUSAT DATA" },
        ].map((node, i) => (
          <group key={`node-${i}`} position={node.pos as [number, number, number]}>
            <mesh>
              <sphereGeometry args={[0.06, 16, 16]} />
              <primitive object={ledAccentMaterial} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
