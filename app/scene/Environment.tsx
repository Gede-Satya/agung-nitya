"use client";

import { MeshReflectorMaterial } from "@react-three/drei";

const COLUMNS = [15, 75, 135, 195, 255, 315];
const COLUMN_RADIUS = 15.5;

/**
 * Lingkungan arsitektural gelap: lantai fisik (bukan wireframe grid) yang
 * memudar ke kabut, plus tiang penyangga jauh sebagai penanda ruang.
 * Sengaja minim — ruang negatif besar adalah bagian dari komposisi (DESIGN §6.5).
 */
export default function Environment({
  quality,
}: {
  quality: "high" | "low";
}) {
  return (
    <group>
      {/* Lantai studio — refleksi lembut pada kualitas tinggi, matte pada
          perangkat ringan. Fog menutup tepinya sehingga tidak ada garis grid
          dan tidak ada kesan geometri tak berujung. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[160, 160]} />
        {quality === "high" ? (
          <MeshReflectorMaterial
            resolution={512}
            blur={[200, 60]}
            mixBlur={0.9}
            mixStrength={0.28}
            mirror={0.28}
            depthScale={0.6}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.2}
            color="#101013"
            roughness={0.85}
            metalness={0.2}
          />
        ) : (
          <meshStandardMaterial color="#0e0e11" roughness={0.85} />
        )}
      </mesh>

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
