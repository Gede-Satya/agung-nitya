"use client";

import { Grid } from "@react-three/drei";

const COLUMNS = [15, 75, 135, 195, 255, 315];
const COLUMN_RADIUS = 15.5;

/**
 * Lingkungan arsitektural gelap: lantai grid yang memudar ke kabut dan
 * tiang penyangga jauh sebagai penanda ruang. Sengaja minim — ruang negatif
 * besar adalah bagian dari komposisi (DESIGN §6.5).
 */
export default function Environment() {
  return (
    <group>
      <Grid
        position={[0, 0, 0]}
        cellSize={0.9}
        cellThickness={0.5}
        cellColor="#1b1b1f"
        sectionSize={4.5}
        sectionThickness={1}
        sectionColor="#35322c"
        fadeDistance={46}
        fadeStrength={1.5}
        infiniteGrid
      />
      {COLUMNS.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <mesh
            key={angle}
            position={[
              Math.cos(rad) * COLUMN_RADIUS,
              4.5,
              Math.sin(rad) * COLUMN_RADIUS,
            ]}
          >
            <boxGeometry args={[0.34, 9, 0.34]} />
            <meshStandardMaterial
              color="#2b2b31"
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}
