import * as THREE from "three";

export type ArtifactType =
  | "patient-card"
  | "soap-note"
  | "bed-grid"
  | "pill-blister"
  | "test-tube-rack"
  | "dicom-viewer"
  | "signature-block"
  | "claim-stack"
  | "sterilized-tray";

export interface ArtifactDefinition {
  type: ArtifactType;
  build: (materials: ArtifactMaterials) => THREE.Group;
  scale: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  animation?: (group: THREE.Group, time: number, progress: number) => void;
}

export interface ArtifactMaterials {
  ceramic: THREE.MeshPhysicalMaterial;
  blueSeam: THREE.MeshStandardMaterial;
  silver: THREE.MeshStandardMaterial;
  glass: THREE.MeshPhysicalMaterial;
  metal: THREE.MeshStandardMaterial;
  emissive: THREE.MeshStandardMaterial;
}

const createPatientCard = (m: ArtifactMaterials) => {
  const g = new THREE.Group();
  const card = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.44, 0.035), m.ceramic);
  card.rotation.y = 0.22;
  g.add(card);
  const chip = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.15, 0.042), m.silver);
  chip.name = "chip";
  chip.position.set(-0.16, 0.02, 0.008);
  chip.rotation.y = 0.22;
  g.add(chip);
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 12), m.blueSeam);
  dot.position.set(-0.16, 0.02, 0.035);
  g.add(dot);
  return g;
};

const createSOAPNote = (m: ArtifactMaterials) => {
  const g = new THREE.Group();
  const sheet = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.75), m.ceramic);
  sheet.rotation.x = -Math.PI / 2;
  sheet.position.y = 0.02;
  g.add(sheet);
  const lines = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const line = new THREE.Mesh(
      new THREE.PlaneGeometry(0.4, 0.02),
      new THREE.MeshBasicMaterial({ color: 0x5b7cff, transparent: true, opacity: 0.6 })
    );
    line.rotation.x = -Math.PI / 2;
    line.position.set(0, 0.03, -0.25 + i * 0.15);
    lines.add(line);
  }
  g.add(lines);
  const stethoscope = new THREE.Mesh(
    new THREE.TorusGeometry(0.12, 0.012, 8, 16),
    m.metal
  );
  stethoscope.rotation.x = Math.PI / 2;
  stethoscope.position.set(0.3, 0.05, 0.2);
  g.add(stethoscope);
  const tube = new THREE.Mesh(
    new THREE.CylinderGeometry(0.008, 0.008, 0.25, 8),
    m.metal
  );
  tube.position.set(0.3, 0.05, 0.32);
  g.add(tube);
  return g;
};

const createBedGrid = (m: ArtifactMaterials) => {
  const g = new THREE.Group();
  const bedGeo = new THREE.BoxGeometry(0.18, 0.06, 0.32);
  const occupiedMat = new THREE.MeshStandardMaterial({ color: 0x5b7cff, emissive: 0x5b7cff, emissiveIntensity: 0.5, roughness: 0.3, metalness: 0.1 });
  const emptyMat = m.ceramic;
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const bed = new THREE.Mesh(bedGeo, (row + col) % 2 === 0 ? occupiedMat : emptyMat);
      bed.position.set(-0.25 + col * 0.25, 0.04, -0.2 + row * 0.25);
      g.add(bed);
    }
  }
  return g;
};

const createPillBlister = (m: ArtifactMaterials) => {
  const g = new THREE.Group();
  const blister = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.04, 0.35, 10, 1, 6),
    m.ceramic
  );
  blister.position.y = 0.02;
  g.add(blister);
  const pillGeo = new THREE.SphereGeometry(0.035, 10, 10);
  const pillMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.1, clearcoat: 0.5 });
  for (let i = 0; i < 10; i++) {
    const pill = new THREE.Mesh(pillGeo, pillMat);
    pill.position.set(-0.25 + (i % 5) * 0.125, 0.05, -0.1 + Math.floor(i / 5) * 0.15);
    g.add(pill);
  }
  const bottle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.1, 0.25, 16),
    m.glass
  );
  bottle.position.set(0.35, 0.15, 0);
  g.add(bottle);
  return g;
};

const createTestTubeRack = (m: ArtifactMaterials) => {
  const g = new THREE.Group();
  const rack = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.03, 0.18),
    m.metal
  );
  rack.position.y = 0.015;
  g.add(rack);
  const tubeGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.22, 10);
  const liquidColors = [0x5b7cff, 0xff6b6b, 0x4ecdc4, 0xffe66d, 0xc44dff, 0xff8b94];
  for (let i = 0; i < 6; i++) {
    const tube = new THREE.Mesh(tubeGeo, m.glass);
    tube.position.set(-0.22 + i * 0.09, 0.13, 0);
    g.add(tube);
    const liquid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.12, 10),
      new THREE.MeshPhysicalMaterial({ color: liquidColors[i], transmission: 0.9, roughness: 0.1, ior: 1.33 })
    );
    liquid.position.set(-0.22 + i * 0.09, 0.07, 0);
    g.add(liquid);
  }
  return g;
};

const createDICOMViewer = (m: ArtifactMaterials) => {
  const g = new THREE.Group();
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.5, 0.04),
    m.metal
  );
  g.add(frame);
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.64, 0.44),
    new THREE.MeshBasicMaterial({
      color: 0x1a1a2e,
      transparent: true,
      opacity: 0.9
    })
  );
  screen.position.z = 0.021;
  g.add(screen);
  const scan = new THREE.Mesh(
    new THREE.PlaneGeometry(0.4, 0.4),
    new THREE.MeshBasicMaterial({
      color: 0x5b7cff,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    })
  );
  scan.position.z = 0.022;
  scan.rotation.z = 0.1;
  g.add(scan);
  const annotation = new THREE.Mesh(
    new THREE.RingGeometry(0.03, 0.05, 16),
    new THREE.MeshBasicMaterial({ color: 0xff6b6b, side: THREE.DoubleSide })
  );
  annotation.position.set(0.1, -0.05, 0.023);
  g.add(annotation);
  return g;
};

const createSignatureBlock = (m: ArtifactMaterials) => {
  const g = new THREE.Group();
  const block = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.35, 0.05),
    m.ceramic
  );
  g.add(block);
  const sigLine = new THREE.Mesh(
    new THREE.PlaneGeometry(0.35, 0.015),
    new THREE.MeshBasicMaterial({ color: 0x1a1a2e })
  );
  sigLine.position.set(0, -0.05, 0.026);
  g.add(sigLine);
  const seal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.02, 24),
    new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 })
  );
  seal.position.set(-0.15, 0.1, 0.036);
  seal.rotation.x = -Math.PI / 2;
  g.add(seal);
  const glow = new THREE.Mesh(
    new THREE.RingGeometry(0.06, 0.08, 32),
    new THREE.MeshBasicMaterial({ color: 0x5b7cff, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
  );
  glow.position.set(-0.15, 0.1, 0.037);
  glow.rotation.x = -Math.PI / 2;
  g.add(glow);
  return g;
};

const createClaimStack = (m: ArtifactMaterials) => {
  const g = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const sheet = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.012, 0.32),
      i === 0 ? m.ceramic : new THREE.MeshPhysicalMaterial({ color: 0xfafafa, roughness: 0.9, transmission: 0.1, opacity: 0.95, transparent: true })
    );
    sheet.position.set(0, 0.02 + i * 0.025, 0);
    g.add(sheet);
    if (i === 0) {
      const stamp = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.005, 16),
        new THREE.MeshStandardMaterial({ color: 0xff4444, emissive: 0xff4444, emissiveIntensity: 0.3 })
      );
      stamp.position.set(0.15, 0.04, 0.1);
      stamp.rotation.x = -Math.PI / 2;
      g.add(stamp);
    }
  }
  return g;
};

const createSterilizedTray = () => {
  const g = new THREE.Group();
  const tray = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 0.04, 0.35, 20, 2, 10),
    new THREE.MeshPhysicalMaterial({
      color: 0xc0c8d0,
      roughness: 0.25,
      metalness: 0.85,
      clearcoat: 0.3,
      clearcoatRoughness: 0.1
    })
  );
  tray.position.y = 0.02;
  g.add(tray);
  const holesGeo = new THREE.BoxGeometry(0.58, 0.05, 0.28);
  const holesMat = new THREE.MeshBasicMaterial({ color: 0x8a94a0, transparent: true, opacity: 0.3 });
  const holes = new THREE.Mesh(holesGeo, holesMat);
  holes.position.y = 0.02;
  g.add(holes);
  const instruments = [
    { name: "scalpel", geo: new THREE.BoxGeometry(0.008, 0.12, 0.02), pos: [-0.22, 0.08, -0.1], rot: [0, 0.3, 0] },
    { name: "forceps", geo: new THREE.BoxGeometry(0.01, 0.14, 0.015), pos: [-0.1, 0.08, -0.1], rot: [0, -0.2, 0] },
    { name: "scissors", geo: new THREE.BoxGeometry(0.012, 0.1, 0.03), pos: [0.02, 0.08, -0.1], rot: [0, 0.15, 0] },
    { name: "needle-holder", geo: new THREE.BoxGeometry(0.01, 0.13, 0.015), pos: [0.14, 0.08, -0.1], rot: [0, -0.1, 0] },
    { name: "retractor", geo: new THREE.BoxGeometry(0.015, 0.11, 0.04), pos: [0.24, 0.08, -0.1], rot: [0, 0.25, 0] },
    { name: "clamp", geo: new THREE.BoxGeometry(0.01, 0.1, 0.02), pos: [-0.22, 0.08, 0.1], rot: [0, -0.4, 0] },
    { name: "suction", geo: new THREE.CylinderGeometry(0.012, 0.008, 0.12, 8), pos: [-0.1, 0.08, 0.1], rot: [0, 0, 0] },
    { name: "probe", geo: new THREE.CylinderGeometry(0.005, 0.005, 0.15, 8), pos: [0.02, 0.08, 0.1], rot: [0, 0.5, 0] },
  ];
  const instMat = new THREE.MeshPhysicalMaterial({
    color: 0xd8dde3,
    roughness: 0.2,
    metalness: 0.9,
    clearcoat: 0.4,
    clearcoatRoughness: 0.05
  });
  instruments.forEach((inst) => {
    const mesh = new THREE.Mesh(inst.geo, instMat);
    mesh.position.set(inst.pos[0], inst.pos[1], inst.pos[2]);
    mesh.rotation.set(inst.rot[0], inst.rot[1], inst.rot[2]);
    g.add(mesh);
  });
  return g;
};

export const MODULE_ARTIFACTS: Record<ArtifactType, ArtifactDefinition> = {
  "patient-card": {
    type: "patient-card",
    build: createPatientCard,
    scale: 1.0,
    position: new THREE.Vector3(0, 0.1, 0),
    rotation: new THREE.Euler(0, 0, 0),
    animation: (group, time) => {
      group.rotation.y = Math.sin(time * 0.6) * 0.08;
      group.children.forEach((c, i) => {
        if (c.name === "chip") c.rotation.z = Math.sin(time * 1.2 + i) * 0.02;
      });
    },
  },
  "soap-note": {
    type: "soap-note",
    build: createSOAPNote,
    scale: 1.0,
    position: new THREE.Vector3(0, 0.15, 0),
    rotation: new THREE.Euler(0, 0, 0),
    animation: (group, time) => {
      group.rotation.y = Math.sin(time * 0.5) * 0.06;
      group.children[1]?.children.forEach((line, i) => {
        line.scale.x = 0.8 + Math.sin(time * 0.8 + i) * 0.2;
      });
    },
  },
  "bed-grid": {
    type: "bed-grid",
    build: createBedGrid,
    scale: 1.0,
    position: new THREE.Vector3(0, 0.1, 0),
    rotation: new THREE.Euler(0, 0, 0),
    animation: (group, time) => {
      group.rotation.y = Math.sin(time * 0.4) * 0.05;
      group.children.forEach((bed) => {
        const mesh = bed as THREE.Mesh;
        if (mesh.material instanceof THREE.MeshStandardMaterial && mesh.material.emissiveIntensity > 0) {
          mesh.material.emissiveIntensity = 0.3 + Math.sin(time * 1.5) * 0.2;
        }
      });
    },
  },
  "pill-blister": {
    type: "pill-blister",
    build: createPillBlister,
    scale: 1.0,
    position: new THREE.Vector3(0, 0.12, 0),
    rotation: new THREE.Euler(0, 0, 0),
    animation: (group, time) => {
      group.rotation.y = Math.sin(time * 0.55) * 0.07;
      group.children.slice(1, 11).forEach((pill, i) => {
        const mesh = pill as THREE.Mesh;
        mesh.position.y = 0.05 + Math.sin(time * 1.2 + i * 0.8) * 0.008;
      });
    },
  },
  "test-tube-rack": {
    type: "test-tube-rack",
    build: createTestTubeRack,
    scale: 1.0,
    position: new THREE.Vector3(0, 0.15, 0),
    rotation: new THREE.Euler(0, 0, 0),
    animation: (group, time) => {
      group.rotation.y = Math.sin(time * 0.45) * 0.06;
      group.children.slice(1).forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry && mesh.geometry.type === "CylinderGeometry" && mesh.position.y > 0.1) {
          mesh.scale.y = 1 + Math.sin(time * 0.9 + i) * 0.02;
        }
      });
    },
  },
  "dicom-viewer": {
    type: "dicom-viewer",
    build: createDICOMViewer,
    scale: 1.0,
    position: new THREE.Vector3(0, 0.15, 0),
    rotation: new THREE.Euler(0, 0, 0),
    animation: (group, time) => {
      group.rotation.y = Math.sin(time * 0.35) * 0.04;
      const scan = group.children.find(c => (c as THREE.Mesh).geometry?.type === "PlaneGeometry" && c.position.z > 0.02);
      if (scan) {
        const mesh = scan as THREE.Mesh;
        mesh.rotation.z = 0.1 + Math.sin(time * 0.6) * 0.02;
        if (mesh.material && "opacity" in mesh.material) {
          (mesh.material as THREE.Material).opacity = 0.3 + Math.sin(time * 0.8) * 0.1;
        }
      }
    },
  },
  "signature-block": {
    type: "signature-block",
    build: createSignatureBlock,
    scale: 1.0,
    position: new THREE.Vector3(0, 0.12, 0),
    rotation: new THREE.Euler(0, 0, 0),
    animation: (group, time) => {
      group.rotation.y = Math.sin(time * 0.4) * 0.05;
      const glow = group.children.find(c => (c as THREE.Mesh).geometry?.type === "RingGeometry");
      if (glow) {
        const mesh = glow as THREE.Mesh;
        if (mesh.material && "opacity" in mesh.material) {
          (mesh.material as THREE.Material).opacity = 0.3 + Math.sin(time * 1.5) * 0.2;
        }
        mesh.scale.setScalar(1 + Math.sin(time * 1.5) * 0.1);
      }
    },
  },
  "claim-stack": {
    type: "claim-stack",
    build: createClaimStack,
    scale: 1.0,
    position: new THREE.Vector3(0, 0.1, 0),
    rotation: new THREE.Euler(0, 0, 0),
    animation: (group, time) => {
      group.rotation.y = Math.sin(time * 0.3) * 0.03;
      group.children.forEach((sheet, i) => {
        const mesh = sheet as THREE.Mesh;
        mesh.position.z = Math.sin(time * 0.7 + i * 0.5) * 0.005;
      });
    },
  },
  "sterilized-tray": {
    type: "sterilized-tray",
    build: createSterilizedTray,
    scale: 1.15,
    position: new THREE.Vector3(0, 0.18, 0),
    rotation: new THREE.Euler(0, 0, 0),
    animation: (group, time) => {
      group.rotation.y = Math.sin(time * 0.25) * 0.03;
      group.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry && mesh.geometry.type === "BoxGeometry" && mesh.position.y > 0.06) {
          mesh.rotation.z = Math.sin(time * 0.8 + i) * 0.015;
          mesh.position.y = 0.08 + Math.sin(time * 1.1 + i * 0.6) * 0.004;
        }
      });
    },
  },
};

export function getArtifactTypeForModule(index: number): ArtifactType {
  const types: ArtifactType[] = [
    "patient-card",
    "soap-note",
    "bed-grid",
    "pill-blister",
    "test-tube-rack",
    "dicom-viewer",
    "signature-block",
    "claim-stack",
    "sterilized-tray",
  ];
  return types[index] || "patient-card";
}