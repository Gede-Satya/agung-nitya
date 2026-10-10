import * as THREE from "three";

export interface GlyphPath {
  paths: THREE.Path[];
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  center: THREE.Vector2;
}

export interface GlyphParticleData {
  positions: Float32Array;
  targets: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  velocities: Float32Array;
  moduleIndex: number;
}

const GLYPH_SVG_PATHS: string[] = [
  // 01 Pendaftaran - ID Card + Person
  `M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z`,

  // 02 Rawat Jalan - Stethoscope
  `M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H10v-2h2.55c1.3 0 2.46.95 2.78 2.19l1.96 2.69c.14.19.23.42.23.66v.75h1.18c.36.7.55 1.46.55 2.26 0 2.28-1.88 4.04-4.16 4.04-.92 0-1.79-.31-2.5-.84v1.39c0 .55-.45 1-1 1h-2.5V21h3c3.59 0 6.5-2.91 6.5-6.5S15.59 8 12 8c-1.99 0-3.76.83-4.99 2.15L12 19.93z`,

  // 03 Rawat Inap - Bed
  `M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15H4v-2h6v2zm8 0h-6v-2h6v2zm-8-4H4v-2h6v2zm8 0h-6v-2h6v2zm0-4H4V7h10v2zm0-10H4V5h10v2z`,

  // 04 Farmasi - Pill
  `M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 9H14v1.5h1.5v1.5h-1.5V15H11v-1.5H9.5v-1.5H11V9.5h1.5V8h-1.5V6.5H11V5h3v3h1.5v1.5z`,

  // 05 Laboratorium - Flask
  `M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H10v-2h2.55c1.3 0 2.46.95 2.78 2.19l1.96 2.69c.14.19.23.42.23.66v.75h1.18c.36.7.55 1.46.55 2.26 0 2.28-1.88 4.04-4.16 4.04-.92 0-1.79-.31-2.5-.84v1.39c0 .55-.45 1-1 1h-2.5V21h3c3.59 0 6.5-2.91 6.5-6.5S15.59 8 12 8c-1.99 0-3.76.83-4.99 2.15L12 19.93z`,

  // 06 Radiologi - X-ray
  `M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H10v-2h2.55c1.3 0 2.46.95 2.78 2.19l1.96 2.69c.14.19.23.42.23.66v.75h1.18c.36.7.55 1.46.55 2.26 0 2.28-1.88 4.04-4.16 4.04-.92 0-1.79-.31-2.5-.84v1.39c0 .55-.45 1-1 1h-2.5V21h3c3.59 0 6.5-2.91 6.5-6.5S15.59 8 12 8c-1.99 0-3.76.83-4.99 2.15L12 19.93z`,

  // 07 RME - Document + Shield
  `M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15H4v-2h6v2zm8 0h-6v-2h6v2zm-8-4H4v-2h6v2zm8 0h-6v-2h6v2zm0-4H4V7h10v2zm0-10H4V5h10v2z`,

  // 08 Billing - Credit Card
  `M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15H4v-2h6v2zm8 0h-6v-2h6v2zm-8-4H4v-2h6v2zm8 0h-6v-2h6v2zm0-4H4V7h10v2zm0-10H4V5h10v2z`,

  // 09 Aset-Logistik - Tool/Box
  `M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H10v-2h2.55c1.3 0 2.46.95 2.78 2.19l1.96 2.69c.14.19.23.42.23.66v.75h1.18c.36.7.55 1.46.55 2.26 0 2.28-1.88 4.04-4.16 4.04-.92 0-1.79-.31-2.5-.84v1.39c0 .55-.45 1-1 1h-2.5V21h3c3.59 0 6.5-2.91 6.5-6.5S15.59 8 12 8c-1.99 0-3.76.83-4.99 2.15L12 19.93z`,
];

function parseSVGPath(svgPath: string): THREE.Path {
  const path = new THREE.Path();
  const commands = svgPath.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi) || [];
  let currentX = 0;
  let currentY = 0;
  let startX = 0;
  let startY = 0;
  let lastQCPX = 0;
  let lastQCPY = 0;

  for (const cmd of commands) {
    const type = cmd[0].toUpperCase();
    const args = cmd.slice(1).trim().split(/[\s,]+/).filter(Boolean).map(Number);
    const isRelative = cmd[0] === cmd[0].toLowerCase();

    switch (type) {
      case 'M':
        currentX = isRelative ? currentX + args[0] : args[0];
        currentY = isRelative ? currentY + args[1] : args[1];
        path.moveTo(currentX, currentY);
        startX = currentX;
        startY = currentY;
        break;
      case 'L':
        currentX = isRelative ? currentX + args[0] : args[0];
        currentY = isRelative ? currentY + args[1] : args[1];
        path.lineTo(currentX, currentY);
        break;
      case 'H':
        currentX = isRelative ? currentX + args[0] : args[0];
        path.lineTo(currentX, currentY);
        break;
      case 'V':
        currentY = isRelative ? currentY + args[0] : args[0];
        path.lineTo(currentX, currentY);
        break;
      case 'C':
        const cp1x = isRelative ? currentX + args[0] : args[0];
        const cp1y = isRelative ? currentY + args[1] : args[1];
        const cp2x = isRelative ? currentX + args[2] : args[2];
        const cp2y = isRelative ? currentY + args[3] : args[3];
        currentX = isRelative ? currentX + args[4] : args[4];
        currentY = isRelative ? currentY + args[5] : args[5];
        path.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, currentX, currentY);
        break;
      case 'S':
        const cpx = isRelative ? currentX + args[0] : args[0];
        const cpy = isRelative ? currentY + args[1] : args[1];
        currentX = isRelative ? currentX + args[2] : args[2];
        currentY = isRelative ? currentY + args[3] : args[3];
        path.bezierCurveTo(
          2 * currentX - cpx, 2 * currentY - cpy,
          cpx, cpy,
          currentX, currentY
        );
        break;
      case 'Q':
        lastQCPX = isRelative ? currentX + args[0] : args[0];
        lastQCPY = isRelative ? currentY + args[1] : args[1];
        currentX = isRelative ? currentX + args[2] : args[2];
        currentY = isRelative ? currentY + args[3] : args[3];
        path.quadraticCurveTo(lastQCPX, lastQCPY, currentX, currentY);
        break;
      case 'T':
        currentX = isRelative ? currentX + args[0] : args[0];
        currentY = isRelative ? currentY + args[1] : args[1];
        path.quadraticCurveTo(
          2 * currentX - lastQCPX, 2 * currentY - lastQCPY,
          currentX, currentY
        );
        break;
      case 'A':
        const rx = args[0];
        currentX = isRelative ? currentX + args[5] : args[5];
        currentY = isRelative ? currentY + args[6] : args[6];
        path.absarc(
          (currentX + currentX) / 2, (currentY + currentY) / 2,
          rx, 0, Math.PI * 2, false
        );
        break;
      case 'Z':
        path.closePath();
        currentX = startX;
        currentY = startY;
        break;
    }
  }
  return path;
}

function computeBounds(paths: THREE.Path[]): { minX: number; maxX: number; minY: number; maxY: number } {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const path of paths) {
    const points = path.getPoints(50);
    for (const p of points) {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    }
  }
  return { minX, maxX, minY, maxY };
}

function generateParticlePositions(paths: THREE.Path[], count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const allPoints: THREE.Vector2[] = [];

  for (const path of paths) {
    const points = path.getPoints(Math.max(10, Math.floor(count / paths.length)));
    allPoints.push(...points);
  }

  const totalPoints = allPoints.length;
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const idx = t * (totalPoints - 1);
    const i0 = Math.floor(idx);
    const i1 = Math.min(i0 + 1, totalPoints - 1);
    const lerp = idx - i0;
    const p0 = allPoints[i0];
    const p1 = allPoints[i1];
    const x = THREE.MathUtils.lerp(p0.x, p1.x, lerp);
    const y = THREE.MathUtils.lerp(p0.y, p1.y, lerp);
    positions[i * 3] = (x - 12) * 0.025;
    positions[i * 3 + 1] = (12 - y) * 0.025;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
  }
  return positions;
}

export const MODULE_GLYPHS: GlyphPath[] = GLYPH_SVG_PATHS.map((svgPath) => {
  const paths = [parseSVGPath(svgPath)];
  const bounds = computeBounds(paths);
  const center = new THREE.Vector2(
    (bounds.minX + bounds.maxX) / 2,
    (bounds.minY + bounds.maxY) / 2
  );
  return { paths, bounds, center };
});

export function generateGlyphParticleData(moduleIndex: number, count: number): GlyphParticleData {
  const glyph = MODULE_GLYPHS[moduleIndex];
  const positions = generateParticlePositions(glyph.paths, count);
  const targets = new Float32Array(positions);

  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    colors[i * 3] = 0.3 + Math.random() * 0.4;
    colors[i * 3 + 1] = 0.4 + Math.random() * 0.4;
    colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
    sizes[i] = 0.5 + Math.random() * 1.0;
    velocities[i * 3] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
  }

  return { positions, targets, colors, sizes, velocities, moduleIndex };
}

export function getGlyphForModule(index: number): GlyphPath {
  return MODULE_GLYPHS[Math.max(0, Math.min(8, index))];
}

export const GLYPH_PARTICLE_COUNTS = [800, 750, 850, 900, 950, 1000, 880, 820, 1100];