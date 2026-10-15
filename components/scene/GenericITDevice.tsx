"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import ConnectionTopology from "./ConnectionTopology";

interface GenericITDeviceProps {
  /** Optional pointer response coordinates */
  pointer?: { x: number; y: number };
  /** Scroll progress through choreography (0.0 to 1.0) */
  scrollProgress?: number;
}

function smoothstep(min: number, max: number, val: number) {
  const x = Math.max(0, Math.min(1, (val - min) / (max - min)));
  return x * x * (3 - 2 * x);
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
    // Window background (Crisp modern white/light UI per DESIGN.md §6.1)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 1024, 640);

    // Accent top highlight hairline
    ctx.fillStyle = "#0B6BAE";
    ctx.fillRect(0, 0, 1024, 4);

    // Header bar (Wash #F5F5F7)
    ctx.fillStyle = "#F5F5F7";
    ctx.fillRect(0, 4, 1024, 66);

    ctx.strokeStyle = "#D2D2D7";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 70);
    ctx.lineTo(1024, 70);
    ctx.stroke();

    // Window control pills
    const dots = ["#0B6BAE", "#D2D2D7", "#E8E8ED"];
    dots.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(36 + i * 22, 37, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // Window title
    ctx.fillStyle = "#1D1D1F";
    ctx.font = "bold 17px sans-serif";
    ctx.fillText("PT AGUNG WIJAYA NITYA — MODUL SISTEM INFORMASI INSTANSI", 120, 43);

    // Sidebar
    ctx.fillStyle = "#F5F5F7";
    ctx.fillRect(0, 70, 240, 570);

    ctx.strokeStyle = "#D2D2D7";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(240, 70);
    ctx.lineTo(240, 640);
    ctx.stroke();

    const navItems = [
      "Dashboard Terpadu",
      "SIMDINKES SDM",
      "Perangkat Komputasi",
      "Bridging Data Instansi",
      "Log Operasional",
    ];
    navItems.forEach((text, i) => {
      if (i === 1) {
        ctx.fillStyle = "#0B6BAE";
        ctx.fillRect(12, 92 + i * 48, 216, 36);
        ctx.fillStyle = "#FFFFFF";
      } else {
        ctx.fillStyle = "#6E6E73";
      }
      ctx.font = "14px sans-serif";
      ctx.fillText(text, 28, 116 + i * 48);
    });

    // Metric Card 1 (SIMDINKES)
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#D2D2D7";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(265, 95, 345, 140, [12]);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0B6BAE";
    ctx.font = "bold 12px monospace";
    ctx.fillText("PRODUK TAYANG INAPROC", 285, 125);
    ctx.fillStyle = "#1D1D1F";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("SIMDINKES", 285, 158);
    ctx.fillStyle = "#6E6E73";
    ctx.font = "13px sans-serif";
    ctx.fillText("Layanan Manajemen & SDM Kesehatan", 285, 185);
    ctx.fillStyle = "#16A34A";
    ctx.fillText("● Status: Terverifikasi Aktif", 285, 212);

    // Metric Card 2 (Katalog Produk)
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#D2D2D7";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(635, 95, 360, 140, [12]);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#6E6E73";
    ctx.font = "12px monospace";
    ctx.fillText("TOTAL PRODUK KATALOG", 655, 125);
    ctx.fillStyle = "#0B6BAE";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("742 PRODUK", 655, 168);
    ctx.fillStyle = "#6E6E73";
    ctx.font = "13px sans-serif";
    ctx.fillText("Katalog Elektronik (15 Okt 2026)", 655, 205);

    // Data table / Telemetry rows
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#D2D2D7";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(265, 260, 730, 345, [14]);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#1D1D1F";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Pilar & Solusi Terdaftar", 290, 298);

    const rows = [
      { pilar: "Software & Jasa TI", detail: "Pembuatan, Implementasi & Reverse-Engineering", status: "UTAMA" },
      { pilar: "Perangkat TI", detail: "Komputer Kerja, Mini PC & Pemindai Data", status: "TERSEDIA" },
      { pilar: "Peralatan & Perlengkapan", detail: "Rak Server, Lemari & Penunjang Fasilitas", status: "TERSEDIA" },
      { pilar: "Servis & Sewa", detail: "Reparasi Perangkat & Penyewaan Komputasi", status: "TERSEDIA" },
    ];

    rows.forEach((r, idx) => {
      const y = 330 + idx * 64;
      ctx.fillStyle = idx % 2 === 0 ? "#F5F5F7" : "#FFFFFF";
      ctx.fillRect(280, y - 18, 700, 52);

      ctx.fillStyle = "#0B6BAE";
      ctx.beginPath();
      ctx.arc(298, y + 8, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#1D1D1F";
      ctx.font = "bold 15px sans-serif";
      ctx.fillText(r.pilar, 316, y + 6);

      ctx.fillStyle = "#6E6E73";
      ctx.font = "13px sans-serif";
      ctx.fillText(r.detail, 316, y + 25);

      ctx.fillStyle = "#0B6BAE";
      ctx.font = "bold 12px monospace";
      ctx.fillText(r.status, 910, y + 14);
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * GenericITDevice — DESIGN.md §4 & §5
 * SATU perangkat TI generik tanpa emblem merek:
 * - Mini PC pipih bersudut membulat (RoundedBox)
 * - Struktur 5 lapisan <group> (Layer 1–5) yang terurai mengikuti scroll:
 *   1. Hero: perangkat utuh
 *   2. Perangkat keras: casing atas terangkat, komponen internal terlihat
 *   3. Perangkat lunak: panel antarmuka melayang naik
 *   4. Layanan: garis konektivitas tersambung ke titik instansi
 */
export default function GenericITDevice({ pointer, scrollProgress = 0 }: GenericITDeviceProps) {
  const masterGroupRef = useRef<THREE.Group>(null);
  const upperCasingRef = useRef<THREE.Group>(null);
  const interfacePanelRef = useRef<THREE.Group>(null);

  // Procedural UI mockup texture (Light UI per DESIGN.md §6.1)
  const uiTexture = useMemo(() => createProceduralUITexture(), []);

  // Shared Physical Materials (DESIGN.md §6.1: dark graphite satin against white page)
  const casingMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#222328",
        roughness: 0.35,
        metalness: 0.35,
        clearcoat: 0.2,
        clearcoatRoughness: 0.15,
      }),
    []
  );

  const darkAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#18191D",
        roughness: 0.45,
        metalness: 0.2,
      }),
    []
  );

  const portMetalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4A4C56",
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
        color: "#0B6BAE",
        emissive: "#0B6BAE",
        emissiveIntensity: 1.8,
        roughness: 0.1,
      }),
    []
  );

  // Dynamic Scroll Choreography & Idle Float
  useFrame(({ clock }) => {
    const group = masterGroupRef.current;
    const upperCasing = upperCasingRef.current;
    const interfacePanel = interfacePanelRef.current;
    if (!group) return;

    const t = clock.getElapsedTime();
    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);

    // 1. Idle tilt & subtle floating oscillation (reduced as scroll begins)
    const idleFactor = Math.max(0, 1 - p * 3);
    const idlePitch = Math.sin(t * 0.45) * 0.025 * idleFactor;
    const idleYaw = Math.cos(t * 0.35) * 0.035 * idleFactor;
    const idleY = Math.sin(t * 0.7) * 0.04 * idleFactor;

    // 2. Master group orientation across scroll stages
    // Stage 1 (Hero 0-0.2): [0.32, -0.48, 0]
    // Stage 2 (Hardware 0.2-0.45): tilts forward to show board [0.44, -0.38, 0]
    // Stage 3 (Software 0.45-0.7): settles [0.28, -0.32, 0]
    // Stage 4 (Services 0.7-1.0): turns slightly front [0.22, -0.15, 0]
    const stage2 = smoothstep(0.18, 0.4, p);
    const stage3 = smoothstep(0.42, 0.65, p);
    const stage4 = smoothstep(0.68, 0.92, p);

    const baseRotX = 0.32 + stage2 * 0.12 - stage3 * 0.16 - stage4 * 0.06;
    const baseRotY = -0.48 + stage2 * 0.1 + stage3 * 0.08 + stage4 * 0.15;

    const targetRotX = baseRotX + idlePitch + (pointer ? -pointer.y * 0.08 : 0);
    const targetRotY = baseRotY + idleYaw + (pointer ? pointer.x * 0.12 : 0);
    const targetY = idleY - stage2 * 0.15 + stage3 * 0.1;

    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotX, 0.05);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, 0.05);
    group.position.y = THREE.MathUtils.lerp(group.position.y, targetY, 0.05);

    // 3. Layer 3 (Upper Casing / Lid Lifting)
    if (upperCasing) {
      // Lifts up on Stage 2 (Hardware), hovers higher on Stage 3 (Software)
      const liftStage2 = smoothstep(0.18, 0.38, p);
      const liftStage3 = smoothstep(0.42, 0.62, p);

      const targetLidY = 0.19 + liftStage2 * 1.45 + liftStage3 * 0.45;
      const targetLidRotX = -liftStage2 * 0.18;

      upperCasing.position.y = THREE.MathUtils.lerp(upperCasing.position.y, targetLidY, 0.06);
      upperCasing.rotation.x = THREE.MathUtils.lerp(upperCasing.rotation.x, targetLidRotX, 0.06);
    }

    // 4. Layer 4 (Interface Panel Emergence)
    if (interfacePanel) {
      // Emerges on Stage 3 (Software: 0.42 to 0.68)
      const panelStage = smoothstep(0.40, 0.62, p);
      const panelVisible = p > 0.36;
      interfacePanel.visible = panelVisible;

      if (panelVisible) {
        const targetPanelY = 0.1 + panelStage * 1.38;
        const targetPanelRotX = -0.38 + panelStage * 0.16;
        const targetPanelScale = 0.65 + panelStage * 0.35;

        interfacePanel.position.y = THREE.MathUtils.lerp(interfacePanel.position.y, targetPanelY, 0.06);
        interfacePanel.rotation.x = THREE.MathUtils.lerp(interfacePanel.rotation.x, targetPanelRotX, 0.06);
        interfacePanel.scale.setScalar(THREE.MathUtils.lerp(interfacePanel.scale.x, targetPanelScale, 0.06));
      }
    }
  });

  return (
    <group ref={masterGroupRef} position={[0, 0, 0]} rotation={[0.32, -0.48, 0]}>
      {/* ────────────────────────────────────────────────────────
          LAPISAN 1: Casing Bawah (Lower Casing)
          Ventilasi, port I/O, satu LED kecil warna aksen #5B7CFF
          ──────────────────────────────────────────────────────── */}
      <group name="layer-1-lower-casing" position={[0, -0.16, 0]}>
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
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.01, 16]} />
            <primitive object={darkAccentMaterial} />
          </mesh>
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
            <mesh position={[0, -0.02, -0.01]}>
              <boxGeometry args={[0.24, 0.18, 0.02]} />
              <primitive object={darkAccentMaterial} />
            </mesh>
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
      <group name="layer-2-component-substrate" position={[0, 0.02, 0]}>
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
          Terangkat vertikal saat scroll tahap perangkat keras
          ──────────────────────────────────────────────────────── */}
      <group ref={upperCasingRef} name="layer-3-upper-casing" position={[0, 0.19, 0]}>
        <RoundedBox
          args={[3.4, 0.16, 2.8]}
          radius={0.16}
          smoothness={8}
          material={casingMaterial}
          castShadow
          receiveShadow
        />

        <mesh position={[0, -0.075, 0]}>
          <boxGeometry args={[3.36, 0.015, 2.76]} />
          <primitive object={darkAccentMaterial} />
        </mesh>
      </group>

      {/* ────────────────────────────────────────────────────────
          LAPISAN 4: Panel Antarmuka Melayang (Interface Panel)
          Melayang naik saat scroll tahap perangkat lunak
          ──────────────────────────────────────────────────────── */}
      <group
        ref={interfacePanelRef}
        name="layer-4-interface-panel"
        position={[0, 0.1, 0]}
        rotation={[-Math.PI / 16, 0, 0]}
        scale={[0.7, 0.7, 0.7]}
        visible={false}
      >
        <RoundedBox
          args={[3.2, 0.025, 2.0]}
          radius={0.06}
          smoothness={4}
          material={
            new THREE.MeshStandardMaterial({
              color: "#E8E8ED",
              roughness: 0.35,
              metalness: 0.15,
            })
          }
        />
        <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.12, 1.92]} />
          <meshBasicMaterial map={uiTexture} transparent opacity={0.96} />
        </mesh>
      </group>

      {/* ────────────────────────────────────────────────────────
          LAPISAN 5: Garis Penghubung & Simbol Instansi
          Mekar saat scroll tahap layanan
          ──────────────────────────────────────────────────────── */}
      <ConnectionTopology progress={scrollProgress} />
    </group>
  );
}
