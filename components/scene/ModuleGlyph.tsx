"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { HospitalModule } from "@/data/modules";

interface ModuleGlyphProps {
  type: HospitalModule["glyph"];
}

/**
 * ModuleGlyph — DESIGN.md §6.1
 * Debossed, architectural glyph built from simple geometric primitives.
 * Subdued dark graphite finish recessed slightly into the module slab.
 */
export default function ModuleGlyph({ type }: ModuleGlyphProps) {
  const glyphMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0C0C0F"),
      roughness: 0.55,
      metalness: 0.5,
    });
  }, []);

  const subtleAccentMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#40485C"),
      roughness: 0.4,
      metalness: 0.6,
    });
  }, []);

  return (
    <group position={[0, 0, 0.125]}>
      {/* Recessed bezel bedding */}
      <mesh material={glyphMaterial} position={[0, 0, -0.005]}>
        <cylinderGeometry args={[0.32, 0.32, 0.01, 32]} />
      </mesh>

      {/* Distinct geometric icon based on module type */}
      {type === "registration" && (
        // Document / card with horizontal lines
        <group position={[0, 0, 0.005]}>
          <mesh material={subtleAccentMaterial}>
            <boxGeometry args={[0.32, 0.42, 0.01]} />
          </mesh>
          <mesh material={glyphMaterial} position={[0, 0.08, 0.006]}>
            <boxGeometry args={[0.2, 0.03, 0.005]} />
          </mesh>
          <mesh material={glyphMaterial} position={[0, 0.0, 0.006]}>
            <boxGeometry args={[0.2, 0.03, 0.005]} />
          </mesh>
          <mesh material={glyphMaterial} position={[-0.04, -0.08, 0.006]}>
            <boxGeometry args={[0.12, 0.03, 0.005]} />
          </mesh>
        </group>
      )}

      {type === "outpatient" && (
        // Balanced clinical plus symbol with subtle center dot
        <group position={[0, 0, 0.005]}>
          <mesh material={subtleAccentMaterial}>
            <boxGeometry args={[0.1, 0.36, 0.01]} />
          </mesh>
          <mesh material={subtleAccentMaterial}>
            <boxGeometry args={[0.36, 0.1, 0.01]} />
          </mesh>
          <mesh material={glyphMaterial} position={[0, 0, 0.006]}>
            <cylinderGeometry args={[0.035, 0.035, 0.006, 16]} />
          </mesh>
        </group>
      )}

      {type === "inpatient" && (
        // Clean bed / shelter geometric silhouette
        <group position={[0, 0, 0.005]}>
          <mesh material={subtleAccentMaterial} position={[0, -0.08, 0]}>
            <boxGeometry args={[0.38, 0.06, 0.01]} />
          </mesh>
          <mesh material={subtleAccentMaterial} position={[-0.14, 0.02, 0]}>
            <boxGeometry args={[0.08, 0.14, 0.01]} />
          </mesh>
          <mesh material={subtleAccentMaterial} position={[0.06, -0.01, 0]}>
            <boxGeometry args={[0.24, 0.06, 0.01]} />
          </mesh>
          <mesh material={subtleAccentMaterial} position={[-0.06, 0.06, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.01, 16]} />
          </mesh>
        </group>
      )}

      {type === "emr" && (
        // Digital data sheet with corner fold
        <group position={[0, 0, 0.005]}>
          <mesh material={subtleAccentMaterial}>
            <boxGeometry args={[0.34, 0.42, 0.01]} />
          </mesh>
          <mesh material={glyphMaterial} position={[0, 0.06, 0.006]}>
            <boxGeometry args={[0.22, 0.025, 0.005]} />
          </mesh>
          <mesh material={glyphMaterial} position={[0, -0.01, 0.006]}>
            <boxGeometry args={[0.22, 0.025, 0.005]} />
          </mesh>
          <mesh material={glyphMaterial} position={[0, -0.08, 0.006]}>
            <boxGeometry args={[0.22, 0.025, 0.005]} />
          </mesh>
        </group>
      )}

      {type === "pharmacy" && (
        // Precision medical capsule angled at 45 degrees
        <group position={[0, 0, 0.005]} rotation={[0, 0, Math.PI / 4]}>
          <mesh material={subtleAccentMaterial} position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.16, 20]} />
          </mesh>
          <mesh material={glyphMaterial} position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.16, 20]} />
          </mesh>
          <mesh material={subtleAccentMaterial} position={[0, 0, 0.002]}>
            <torusGeometry args={[0.072, 0.01, 12, 24]} />
          </mesh>
        </group>
      )}

      {type === "laboratory" && (
        // Laboratory flask silhouette
        <group position={[0, -0.02, 0.005]}>
          <mesh material={subtleAccentMaterial} position={[0, 0.12, 0]}>
            <boxGeometry args={[0.07, 0.16, 0.01]} />
          </mesh>
          <mesh material={subtleAccentMaterial} position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.18, 0.07, 0.22, 3]} />
          </mesh>
          <mesh material={glyphMaterial} position={[0, -0.08, 0.006]}>
            <cylinderGeometry args={[0.1, 0.04, 0.08, 3]} />
          </mesh>
        </group>
      )}

      {type === "radiology" && (
        // Concentric radiologic scan rings
        <group position={[0, 0, 0.005]}>
          <mesh material={subtleAccentMaterial}>
            <ringGeometry args={[0.05, 0.08, 32]} />
          </mesh>
          <mesh material={subtleAccentMaterial}>
            <ringGeometry args={[0.13, 0.16, 32]} />
          </mesh>
          <mesh material={subtleAccentMaterial}>
            <ringGeometry args={[0.21, 0.24, 32]} />
          </mesh>
        </group>
      )}

      {type === "billing" && (
        // Balanced ledger shield / check matrix
        <group position={[0, 0, 0.005]}>
          <mesh material={subtleAccentMaterial} position={[0, 0, 0]}>
            <boxGeometry args={[0.34, 0.38, 0.01]} />
          </mesh>
          <mesh material={glyphMaterial} position={[-0.07, 0.06, 0.006]}>
            <boxGeometry args={[0.08, 0.08, 0.005]} />
          </mesh>
          <mesh material={glyphMaterial} position={[0.07, 0.06, 0.006]}>
            <boxGeometry args={[0.08, 0.08, 0.005]} />
          </mesh>
          <mesh material={glyphMaterial} position={[0, -0.06, 0.006]}>
            <boxGeometry args={[0.22, 0.04, 0.005]} />
          </mesh>
        </group>
      )}

      {type === "logistics" && (
        // Modular isometric logistics cube / crate
        <group position={[0, 0, 0.005]} rotation={[0, 0, Math.PI / 4]}>
          <mesh material={subtleAccentMaterial}>
            <boxGeometry args={[0.24, 0.24, 0.01]} />
          </mesh>
          <mesh material={glyphMaterial} position={[0, 0, 0.006]}>
            <boxGeometry args={[0.14, 0.14, 0.005]} />
          </mesh>
        </group>
      )}
    </group>
  );
}
