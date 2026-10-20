export interface SceneDefinition {
  id: string;
  index: string;
  name: string;
  label: string;
  from: number;
  to: number;
}

export const HERO_SCENES: SceneDefinition[] = [
  {
    id: "scene-1",
    index: "01",
    name: "01 / 05 // EKSTERIOR GEDUNG",
    label: "Eksterior Gedung",
    from: 0.0,
    to: 0.2,
  },
  {
    id: "scene-2",
    index: "02",
    name: "02 / 05 // RUANG KERJA KANTOR",
    label: "Ruang Kantor",
    from: 0.2,
    to: 0.4,
  },
  {
    id: "scene-3",
    index: "03",
    name: "03 / 05 // SERVER ROOM",
    label: "Server Room",
    from: 0.4,
    to: 0.6,
  },
  {
    id: "scene-4",
    index: "04",
    name: "04 / 05 // RUANG PEMELIHARAAN",
    label: "Ruang Pemeliharaan",
    from: 0.6,
    to: 0.8,
  },
  {
    id: "scene-5",
    index: "05",
    name: "05 / 05 // KONSULTASI & KEMITRAAN",
    label: "Ruang Penutup",
    from: 0.8,
    to: 1.0,
  },
];

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
