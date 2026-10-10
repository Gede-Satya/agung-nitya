import * as THREE from "three";

export const FROST_DISSOLVE_VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const FROST_DISSOLVE_FRAGMENT_SHADER = `
varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform float uProgress;
uniform float uDirection;
uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uNoiseTexture;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

float fbm3D(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 4; i++) {
    vec2 uv = p.xy * frequency + p.z * 0.1;
    value += amplitude * texture2D(uNoiseTexture, fract(uv)).r;
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

vec3 frostCrystal(vec2 uv, float time) {
  vec2 p = uv * 8.0;
  float n = fbm(p + time * 0.2);
  float n2 = fbm(p * 2.0 - time * 0.1);
  float n3 = fbm(p * 4.0 + time * 0.05);
  float crystals = n + n2 * 0.5 + n3 * 0.25;
  crystals = smoothstep(0.4, 0.7, crystals);
  return vec3(crystals) * mix(vec3(0.9, 0.95, 1.0), vec3(0.6, 0.7, 0.9), n);
}

void main() {
  vec4 sceneColor = texture2D(tDiffuse, vUv);

  float progress = clamp(uProgress, 0.0, 1.0);
  float direction = uDirection;

  float dissolveProgress = direction > 0.0 ? progress : 1.0 - progress;

  vec2 noiseUv = vUv * 4.0;
  float noiseVal = fbm(noiseUv + uTime * 0.3);

  float frostEdge = smoothstep(0.3, 0.7, noiseVal);
  float dissolveMask = smoothstep(dissolveProgress - 0.15, dissolveProgress + 0.15, frostEdge + vUv.y * 0.3);

  vec3 frostColor = frostCrystal(vUv, uTime);
  float frostAlpha = (1.0 - dissolveMask) * (1.0 - progress * direction);

  vec3 chromaticAberration = vec3(0.0);
  float caAmount = 0.004 * (1.0 - abs(progress - 0.5) * 2.0);
  vec2 caOffset = (vUv - 0.5) * caAmount;

  chromaticAberration.r = texture2D(tDiffuse, vUv + caOffset).r;
  chromaticAberration.g = texture2D(tDiffuse, vUv).g;
  chromaticAberration.b = texture2D(tDiffuse, vUv - caOffset).b;

  vec3 finalColor = mix(sceneColor.rgb, chromaticAberration, caAmount * 10.0);
  finalColor = mix(finalColor, frostColor, frostAlpha * 0.8);

  float finalAlpha = mix(1.0, frostAlpha, 0.5);

  gl_FragColor = vec4(finalColor, finalAlpha);
}
`;

export const FROST_DISSOLVE_UNIFORMS = {
  tDiffuse: { value: null },
  uProgress: { value: 0 },
  uDirection: { value: 1 },
  uResolution: { value: new THREE.Vector2(1920, 1080) },
  uTime: { value: 0 },
  uNoiseTexture: { value: null },
};

export function createNoiseTexture(size: number = 256): THREE.DataTexture {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = x / size;
      const ny = y / size;
      let value = 0;
      let amplitude = 1.0;
      let frequency = 1.0;
      for (let i = 0; i < 4; i++) {
        const sampleX = nx * frequency * size;
        const sampleY = ny * frequency * size;
        value += amplitude * (Math.sin(sampleX * 12.9898 + sampleY * 78.233) * 0.5 + 0.5);
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      const idx = (y * size + x) * 4;
      const v = Math.floor(value * 255);
      data[idx] = v;
      data[idx + 1] = v;
      data[idx + 2] = v;
      data[idx + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.UnsignedByteType);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}