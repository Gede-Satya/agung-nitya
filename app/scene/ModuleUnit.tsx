"use client";

import { MODULES, type ModuleVariant } from "./composition";
import { M } from "./materials";

/** Plinth bersama — setiap modul berdiri di alas yang sama. */
function Plinth() {
  return (
    <group>
      <mesh material={M.graphite} position={[0, 0.045, 0]}>
        <boxGeometry args={[1.16, 0.09, 0.9]} />
      </mesh>
      <mesh material={M.accent} position={[0, 0.055, 0.46]}>
        <boxGeometry args={[0.5, 0.035, 0.02]} />
      </mesh>
      <mesh material={M.brushed} position={[0, 0.42, -0.48]}>
        <boxGeometry args={[0.16, 0.16, 0.06]} />
      </mesh>
      <mesh material={M.accent} position={[0, 0.42, -0.515]}>
        <boxGeometry args={[0.06, 0.06, 0.02]} />
      </mesh>
    </group>
  );
}

/**
 * Badan modul — tiap varian punya siluet yang bisa dikenali dan punya alasan
 * semantik (DESIGN §9.4). Semua menghadap +z (keluar dari inti).
 */
function Body({ variant }: { variant: ModuleVariant }) {
  switch (variant) {
    case "registration":
      return (
        <group>
          <mesh material={M.matte} position={[0, 0.36, 0.06]}>
            <boxGeometry args={[1.06, 0.54, 0.52]} />
          </mesh>
          <mesh material={M.matteLight} position={[0, 0.78, -0.14]}>
            <boxGeometry args={[1.06, 0.4, 0.1]} />
          </mesh>
          <mesh material={M.screen} position={[0, 0.78, -0.075]}>
            <boxGeometry args={[0.44, 0.24, 0.03]} />
          </mesh>
          <mesh material={M.brushed} position={[-0.4, 0.7, 0.1]}>
            <boxGeometry args={[0.06, 0.3, 0.06]} />
          </mesh>
        </group>
      );

    case "outpatient":
      return (
        <group>
          {[-0.28, 0.28].map((x) => (
            <mesh key={x} material={M.matte} position={[x, 0.36, 0]}>
              <boxGeometry args={[0.46, 0.54, 0.46]} />
            </mesh>
          ))}
          <mesh material={M.matteLight} position={[0, 0.68, 0]}>
            <boxGeometry args={[1.1, 0.08, 0.6]} />
          </mesh>
          <mesh material={M.brushed} position={[0, 0.42, -0.26]}>
            <boxGeometry args={[0.08, 0.5, 0.06]} />
          </mesh>
        </group>
      );

    case "inpatient":
      return (
        <group>
          {[0.2, 0.44, 0.68].map((y) => (
            <mesh key={y} material={M.matte} position={[0, y, 0]}>
              <boxGeometry args={[0.95, 0.16, 0.62]} />
            </mesh>
          ))}
          {[-0.46, 0.46].map((x) => (
            <mesh key={x} material={M.brushed} position={[x, 0.45, 0]}>
              <boxGeometry args={[0.06, 0.78, 0.62]} />
            </mesh>
          ))}
        </group>
      );

    case "pharmacy":
      return (
        <group>
          <mesh material={M.matte} position={[0, 0.47, 0]}>
            <boxGeometry args={[1, 0.76, 0.5]} />
          </mesh>
          {[-0.33, 0, 0.33].map((x) =>
            [0.3, 0.64].map((y) => (
              <mesh
                key={`${x}:${y}`}
                material={M.matteLight}
                position={[x, y, 0.26]}
              >
                <boxGeometry args={[0.26, 0.26, 0.05]} />
              </mesh>
            )),
          )}
        </group>
      );

    case "laboratory":
      return (
        <group>
          {[-0.47, 0.47].map((x) => (
            <mesh key={x} material={M.brushed} position={[x, 0.49, 0]}>
              <boxGeometry args={[0.07, 0.8, 0.55]} />
            </mesh>
          ))}
          {[0.18, 0.4, 0.62, 0.84].map((y) => (
            <mesh key={y} material={M.matte} position={[0, y, 0]}>
              <boxGeometry args={[0.9, 0.05, 0.5]} />
            </mesh>
          ))}
        </group>
      );

    case "radiology":
      return (
        <group>
          <mesh material={M.matte} position={[0, 0.4, 0]}>
            <boxGeometry args={[0.9, 0.62, 0.5]} />
          </mesh>
          <mesh material={M.matteLight} position={[0, 0.7, 0.24]}>
            <torusGeometry args={[0.3, 0.1, 12, 36]} />
          </mesh>
          <mesh material={M.brushed} position={[0, 0.46, 0.6]}>
            <boxGeometry args={[0.28, 0.09, 0.6]} />
          </mesh>
        </group>
      );

    case "records":
      return (
        <group>
          {[-0.44, -0.22, 0, 0.22, 0.44].map((x) => (
            <mesh key={x} material={M.matte} position={[x, 0.48, 0]}>
              <boxGeometry args={[0.08, 0.78, 0.56]} />
            </mesh>
          ))}
          <mesh material={M.matteLight} position={[0, 0.9, 0]}>
            <boxGeometry args={[1, 0.06, 0.6]} />
          </mesh>
        </group>
      );

    case "billing":
      return (
        <group>
          <mesh material={M.matte} position={[0, 0.26, 0.2]}>
            <boxGeometry args={[1, 0.34, 0.28]} />
          </mesh>
          <mesh material={M.matte} position={[0, 0.36, -0.04]}>
            <boxGeometry args={[1, 0.54, 0.24]} />
          </mesh>
          <mesh material={M.matte} position={[0, 0.46, -0.28]}>
            <boxGeometry args={[1, 0.74, 0.22]} />
          </mesh>
          <mesh
            material={M.screen}
            position={[0, 0.9, -0.26]}
            rotation={[-0.28, 0, 0]}
          >
            <boxGeometry args={[0.5, 0.3, 0.03]} />
          </mesh>
        </group>
      );

    case "asset":
      return (
        <group>
          <mesh material={M.matteLight} position={[0, 0.13, 0]}>
            <boxGeometry args={[1, 0.08, 0.76]} />
          </mesh>
          <mesh material={M.matte} position={[0, 0.45, 0]}>
            <boxGeometry args={[0.86, 0.6, 0.62]} />
          </mesh>
          {[-0.24, 0.24].map((x) => (
            <mesh key={x} material={M.brushed} position={[x, 0.45, 0]}>
              <boxGeometry args={[0.06, 0.63, 0.65]} />
            </mesh>
          ))}
        </group>
      );
  }
}

export default function ModuleUnit({ index }: { index: number }) {
  const def = MODULES[index];
  return (
    <group>
      <Plinth />
      <Body variant={def.variant} />
    </group>
  );
}
