import * as THREE from "three";

let cachedTexture: THREE.CanvasTexture | null = null;

/**
 * Generates a subtle procedural micro-roughness texture in-memory.
 * Zero network download, fine grain structure to avoid sterile plastic look.
 */
export function getMicroSurfaceTexture(): THREE.CanvasTexture {
  if (cachedTexture) return cachedTexture;

  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Neutral mid-tone baseline
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, size, size);

    const imgData = ctx.getImageData(0, 0, size, size);
    const data = imgData.data;

    // Subtle fine high-frequency noise + faint horizontal brushed striation
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const grain = (Math.random() - 0.5) * 22;
        const streak = Math.sin(x * 0.4) * 4;
        const val = Math.min(255, Math.max(0, 128 + grain + streak));
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.needsUpdate = true;

  cachedTexture = texture;
  return texture;
}
