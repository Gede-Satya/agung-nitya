import * as THREE from "three";
import { ArtifactType } from "./ModuleArtifacts";

export interface ModuleCrystalConfig {
  index: number;
  id: string;
  name: string;
  domain: "klinis" | "penunjang" | "administrasi";

  geometry: {
    facetCount: number;
    asymmetry: number;
    height: number;
    width: number;
    depth: number;
    bevel: number;
    chamfer: number;
  };

  material: {
    attenuationColor: THREE.Color;
    dispersion: number;
    transmission: number;
    roughness: number;
    metalness: number;
    ior: number;
    thickness: number;
    clearcoat: number;
    clearcoatRoughness: number;
    reflectivity: number;
    attenuationDistance: number;
  };

  artifact: {
    type: ArtifactType;
    scale: number;
    position: THREE.Vector3;
    rotation: THREE.Euler;
  };

  lighting: {
    rimColor: THREE.Color;
    rimIntensity: number;
    causticsIntensity: number;
  };

  particle: {
    accentColor: THREE.Color;
    particleCount: number;
    glyphComplexity: number;
  };

  audio?: {
    enterFreq: number;
    exitFreq: number;
    ambientFreq: number;
  };
}

export const MODULE_CRYSTAL_CONFIGS: ModuleCrystalConfig[] = [
  {
    index: 0,
    id: "pendaftaran",
    name: "Pendaftaran & Admisi",
    domain: "administrasi",
    geometry: {
      facetCount: 8,
      asymmetry: 0.04,
      height: 2.15,
      width: 1.65,
      depth: 1.05,
      bevel: 0.08,
      chamfer: 0.18,
    },
    material: {
      attenuationColor: new THREE.Color(0xf0f4fa),
      dispersion: 0.10,
      transmission: 0.92,
      roughness: 0.22,
      metalness: 0.02,
      ior: 1.45,
      thickness: 1.25,
      clearcoat: 0.30,
      clearcoatRoughness: 0.08,
      reflectivity: 0.5,
      attenuationDistance: 2.8,
    },
    artifact: {
      type: "patient-card",
      scale: 1.0,
      position: new THREE.Vector3(0, 0.1, 0),
      rotation: new THREE.Euler(0, 0, 0),
    },
    lighting: {
      rimColor: new THREE.Color(0x5b7cff),
      rimIntensity: 1.8,
      causticsIntensity: 0.6,
    },
    particle: {
      accentColor: new THREE.Color(0x5b7cff),
      particleCount: 800,
      glyphComplexity: 1,
    },
    audio: { enterFreq: 523.25, exitFreq: 493.88, ambientFreq: 220 },
  },
  {
    index: 1,
    id: "rawat-jalan",
    name: "Rawat Jalan & Poliklinik",
    domain: "klinis",
    geometry: {
      facetCount: 7,
      asymmetry: 0.08,
      height: 2.05,
      width: 1.55,
      depth: 1.0,
      bevel: 0.09,
      chamfer: 0.2,
    },
    material: {
      attenuationColor: new THREE.Color(0xf0faf0),
      dispersion: 0.11,
      transmission: 0.90,
      roughness: 0.24,
      metalness: 0.03,
      ior: 1.44,
      thickness: 1.2,
      clearcoat: 0.35,
      clearcoatRoughness: 0.09,
      reflectivity: 0.48,
      attenuationDistance: 2.6,
    },
    artifact: {
      type: "soap-note",
      scale: 1.0,
      position: new THREE.Vector3(0, 0.15, 0),
      rotation: new THREE.Euler(0, 0, 0),
    },
    lighting: {
      rimColor: new THREE.Color(0x4ecdc4),
      rimIntensity: 1.6,
      causticsIntensity: 0.55,
    },
    particle: {
      accentColor: new THREE.Color(0x4ecdc4),
      particleCount: 750,
      glyphComplexity: 2,
    },
    audio: { enterFreq: 587.33, exitFreq: 554.37, ambientFreq: 246.94 },
  },
  {
    index: 2,
    id: "rawat-inap",
    name: "Rawat Inap & Bangsal",
    domain: "klinis",
    geometry: {
      facetCount: 9,
      asymmetry: 0.06,
      height: 2.2,
      width: 1.7,
      depth: 1.1,
      bevel: 0.07,
      chamfer: 0.16,
    },
    material: {
      attenuationColor: new THREE.Color(0xf5f0fa),
      dispersion: 0.12,
      transmission: 0.91,
      roughness: 0.21,
      metalness: 0.02,
      ior: 1.46,
      thickness: 1.3,
      clearcoat: 0.32,
      clearcoatRoughness: 0.07,
      reflectivity: 0.52,
      attenuationDistance: 2.9,
    },
    artifact: {
      type: "bed-grid",
      scale: 1.0,
      position: new THREE.Vector3(0, 0.1, 0),
      rotation: new THREE.Euler(0, 0, 0),
    },
    lighting: {
      rimColor: new THREE.Color(0xc44dff),
      rimIntensity: 1.7,
      causticsIntensity: 0.58,
    },
    particle: {
      accentColor: new THREE.Color(0xc44dff),
      particleCount: 850,
      glyphComplexity: 2,
    },
    audio: { enterFreq: 659.25, exitFreq: 622.25, ambientFreq: 277.18 },
  },
  {
    index: 3,
    id: "farmasi",
    name: "Farmasi & Depo Obat",
    domain: "penunjang",
    geometry: {
      facetCount: 10,
      asymmetry: 0.09,
      height: 2.0,
      width: 1.6,
      depth: 1.0,
      bevel: 0.1,
      chamfer: 0.22,
    },
    material: {
      attenuationColor: new THREE.Color(0xf0fff0),
      dispersion: 0.13,
      transmission: 0.93,
      roughness: 0.2,
      metalness: 0.01,
      ior: 1.47,
      thickness: 1.15,
      clearcoat: 0.38,
      clearcoatRoughness: 0.06,
      reflectivity: 0.55,
      attenuationDistance: 2.5,
    },
    artifact: {
      type: "pill-blister",
      scale: 1.0,
      position: new THREE.Vector3(0, 0.12, 0),
      rotation: new THREE.Euler(0, 0, 0),
    },
    lighting: {
      rimColor: new THREE.Color(0x4ecdc4),
      rimIntensity: 1.9,
      causticsIntensity: 0.65,
    },
    particle: {
      accentColor: new THREE.Color(0x4ecdc4),
      particleCount: 900,
      glyphComplexity: 3,
    },
    audio: { enterFreq: 698.46, exitFreq: 659.25, ambientFreq: 293.66 },
  },
  {
    index: 4,
    id: "laboratorium",
    name: "Laboratorium (LIS)",
    domain: "penunjang",
    geometry: {
      facetCount: 6,
      asymmetry: 0.1,
      height: 1.95,
      width: 1.5,
      depth: 0.95,
      bevel: 0.11,
      chamfer: 0.24,
    },
    material: {
      attenuationColor: new THREE.Color(0xf5f5ff),
      dispersion: 0.14,
      transmission: 0.94,
      roughness: 0.19,
      metalness: 0.01,
      ior: 1.48,
      thickness: 1.1,
      clearcoat: 0.4,
      clearcoatRoughness: 0.05,
      reflectivity: 0.58,
      attenuationDistance: 2.4,
    },
    artifact: {
      type: "test-tube-rack",
      scale: 1.0,
      position: new THREE.Vector3(0, 0.15, 0),
      rotation: new THREE.Euler(0, 0, 0),
    },
    lighting: {
      rimColor: new THREE.Color(0x5b7cff),
      rimIntensity: 2.0,
      causticsIntensity: 0.7,
    },
    particle: {
      accentColor: new THREE.Color(0x5b7cff),
      particleCount: 950,
      glyphComplexity: 3,
    },
    audio: { enterFreq: 783.99, exitFreq: 739.99, ambientFreq: 329.63 },
  },
  {
    index: 5,
    id: "radiologi",
    name: "Radiologi & PACS",
    domain: "penunjang",
    geometry: {
      facetCount: 11,
      asymmetry: 0.05,
      height: 2.1,
      width: 1.65,
      depth: 1.05,
      bevel: 0.08,
      chamfer: 0.17,
    },
    material: {
      attenuationColor: new THREE.Color(0xf0f5ff),
      dispersion: 0.15,
      transmission: 0.95,
      roughness: 0.18,
      metalness: 0.01,
      ior: 1.49,
      thickness: 1.2,
      clearcoat: 0.42,
      clearcoatRoughness: 0.04,
      reflectivity: 0.6,
      attenuationDistance: 2.3,
    },
    artifact: {
      type: "dicom-viewer",
      scale: 1.0,
      position: new THREE.Vector3(0, 0.15, 0),
      rotation: new THREE.Euler(0, 0, 0),
    },
    lighting: {
      rimColor: new THREE.Color(0x00d4ff),
      rimIntensity: 2.1,
      causticsIntensity: 0.75,
    },
    particle: {
      accentColor: new THREE.Color(0x00d4ff),
      particleCount: 1000,
      glyphComplexity: 3,
    },
    audio: { enterFreq: 880, exitFreq: 830.61, ambientFreq: 369.99 },
  },
  {
    index: 6,
    id: "rme",
    name: "Rekam Medis Elektronik (RME)",
    domain: "klinis",
    geometry: {
      facetCount: 12,
      asymmetry: 0.03,
      height: 2.25,
      width: 1.7,
      depth: 1.1,
      bevel: 0.07,
      chamfer: 0.15,
    },
    material: {
      attenuationColor: new THREE.Color(0xfaf0f5),
      dispersion: 0.12,
      transmission: 0.93,
      roughness: 0.2,
      metalness: 0.02,
      ior: 1.46,
      thickness: 1.25,
      clearcoat: 0.36,
      clearcoatRoughness: 0.07,
      reflectivity: 0.54,
      attenuationDistance: 2.7,
    },
    artifact: {
      type: "signature-block",
      scale: 1.0,
      position: new THREE.Vector3(0, 0.12, 0),
      rotation: new THREE.Euler(0, 0, 0),
    },
    lighting: {
      rimColor: new THREE.Color(0xff6b9d),
      rimIntensity: 1.8,
      causticsIntensity: 0.62,
    },
    particle: {
      accentColor: new THREE.Color(0xff6b9d),
      particleCount: 880,
      glyphComplexity: 2,
    },
    audio: { enterFreq: 987.77, exitFreq: 932.33, ambientFreq: 415.3 },
  },
  {
    index: 7,
    id: "billing",
    name: "Kasir & Billing BPJS",
    domain: "administrasi",
    geometry: {
      facetCount: 8,
      asymmetry: 0.07,
      height: 2.05,
      width: 1.55,
      depth: 1.0,
      bevel: 0.09,
      chamfer: 0.19,
    },
    material: {
      attenuationColor: new THREE.Color(0xfffaf0),
      dispersion: 0.11,
      transmission: 0.91,
      roughness: 0.23,
      metalness: 0.02,
      ior: 1.44,
      thickness: 1.15,
      clearcoat: 0.33,
      clearcoatRoughness: 0.08,
      reflectivity: 0.5,
      attenuationDistance: 2.6,
    },
    artifact: {
      type: "claim-stack",
      scale: 1.0,
      position: new THREE.Vector3(0, 0.1, 0),
      rotation: new THREE.Euler(0, 0, 0),
    },
    lighting: {
      rimColor: new THREE.Color(0xffd700),
      rimIntensity: 1.7,
      causticsIntensity: 0.58,
    },
    particle: {
      accentColor: new THREE.Color(0xffd700),
      particleCount: 820,
      glyphComplexity: 2,
    },
    audio: { enterFreq: 1046.5, exitFreq: 987.77, ambientFreq: 440 },
  },
  {
    index: 8,
    id: "aset-logistik",
    name: "Aset & Logistik Medis",
    domain: "administrasi",
    geometry: {
      facetCount: 9,
      asymmetry: 0.12,
      height: 2.3,
      width: 1.8,
      depth: 1.2,
      bevel: 0.1,
      chamfer: 0.18,
    },
    material: {
      attenuationColor: new THREE.Color(0xfaf5f0),
      dispersion: 0.16,
      transmission: 0.96,
      roughness: 0.17,
      metalness: 0.01,
      ior: 1.5,
      thickness: 1.35,
      clearcoat: 0.45,
      clearcoatRoughness: 0.03,
      reflectivity: 0.65,
      attenuationDistance: 2.2,
    },
    artifact: {
      type: "sterilized-tray",
      scale: 1.15,
      position: new THREE.Vector3(0, 0.18, 0),
      rotation: new THREE.Euler(0, 0, 0),
    },
    lighting: {
      rimColor: new THREE.Color(0xff8c42),
      rimIntensity: 2.2,
      causticsIntensity: 0.8,
    },
    particle: {
      accentColor: new THREE.Color(0xff8c42),
      particleCount: 1100,
      glyphComplexity: 4,
    },
    audio: { enterFreq: 1174.66, exitFreq: 1108.73, ambientFreq: 493.88 },
  },
];

export function getCrystalConfig(index: number): ModuleCrystalConfig {
  return MODULE_CRYSTAL_CONFIGS[Math.max(0, Math.min(8, index))];
}

export function createFacetedCrystalGeometry(config: ModuleCrystalConfig): THREE.BufferGeometry {
  const { width, height, depth, bevel, chamfer, facetCount } = config.geometry;

  const shape = new THREE.Shape();
  const hw = (width - bevel * 2) / 2;
  const hd = (depth - bevel * 2) / 2;

  const angleStep = (Math.PI * 2) / facetCount;
  const radiusX = hw;
  const radiusY = hd;

  shape.moveTo(radiusX * Math.cos(-angleStep / 2) - chamfer, radiusY * Math.sin(-angleStep / 2));
  for (let i = 0; i < facetCount; i++) {
    const angle = -angleStep / 2 + i * angleStep;
    const nextAngle = angle + angleStep;
    const x1 = radiusX * Math.cos(angle);
    const y1 = radiusY * Math.sin(angle);
    const x2 = radiusX * Math.cos(nextAngle);
    const y2 = radiusY * Math.sin(nextAngle);
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = -dy / len * chamfer;
    const ny = dx / len * chamfer;
    shape.lineTo(x1 - nx, y1 - ny);
    shape.lineTo(cx + nx, cy + ny);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    steps: 1,
    depth: height - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 3,
  });
  geo.center();
  geo.rotateX(Math.PI / 2);
  geo.computeVertexNormals();

  const positions = geo.attributes.position;
  const asymmetry = config.geometry.asymmetry;
  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);
    const normalizedY = (y + height / 2) / height;
    const noise = Math.sin(positions.getX(i) * 12.3 + positions.getZ(i) * 12.7) * 0.5 +
      Math.cos(positions.getX(i) * 7.1 + positions.getZ(i) * 9.3) * 0.5;
    positions.setY(i, y + noise * asymmetry * 0.05 * (1 - Math.abs(normalizedY - 0.5) * 2));
  }
  geo.attributes.position.needsUpdate = true;
  geo.computeVertexNormals();

  return geo;
}