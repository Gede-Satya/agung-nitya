import * as THREE from "three";

export const CRYSTAL_GROWTH_VERTEX_SHADER = `
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vHeight;
varying vec3 vViewPosition;

uniform float uGrowthProgress;
uniform float uTime;
uniform vec4 uNoiseScale;
uniform float uAsymmetry;

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

float fbm(vec2 p, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 6; i++) {
    if (i >= octaves) break;
    value += amplitude * noise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

float crystalGrowth(vec3 pos, float progress, float time) {
  float heightNorm = (pos.y + 1.0) / 2.0;
  float baseGrowth = smoothstep(0.0, 1.0, progress - heightNorm * 0.3);

  float noiseVal = fbm(pos.xz * uNoiseScale.xy + time * 0.1, 4);
  float asymmetryNoise = fbm(pos.xz * uNoiseScale.zw + time * 0.07, 3) * uAsymmetry;

  float facetNoise = abs(sin(pos.x * 12.0 + time * 0.5)) * abs(cos(pos.z * 12.0 - time * 0.5));
  float growth = baseGrowth + noiseVal * 0.15 * (1.0 - baseGrowth) + asymmetryNoise * 0.1 + facetNoise * 0.05;

  return clamp(growth, 0.0, 1.0);
}

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  vHeight = (vWorldPosition.y + 1.0) / 2.0;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;

  float growth = crystalGrowth(position, uGrowthProgress, uTime);

  vec3 displacedPosition = position;
  displacedPosition *= growth;
  displacedPosition.y = mix(-1.0, position.y, growth);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
}
`;

export const CRYSTAL_GROWTH_FRAGMENT_SHADER = `
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vHeight;
varying vec3 vViewPosition;

uniform float uGrowthProgress;
uniform float uTime;
uniform vec3 uAttenuationColor;
uniform float uDispersion;
uniform float uThickness;
uniform float uClearcoat;
uniform vec3 uRimColor;
uniform float uRimIntensity;
uniform float uCausticsIntensity;

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

float fbm(vec2 p, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 6; i++) {
    if (i >= octaves) break;
    value += amplitude * noise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

vec3 fresnel(vec3 viewDir, vec3 normal, float ior) {
  float cosTheta = dot(normalize(viewDir), normal);
  float r0 = pow((1.0 - ior) / (1.0 + ior), 2.0);
  return vec3(r0 + (1.0 - r0) * pow(1.0 - cosTheta, 5.0));
}

vec3 dispersionColor(vec3 viewDir, vec3 normal, float dispersion, float thickness) {
  float cosTheta = dot(normalize(viewDir), normal);
  float eta = 1.0 + dispersion * (1.0 - cosTheta) * thickness * 0.5;
  return vec3(eta * 0.9, eta * 0.95, eta);
}

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);

  float growthAlpha = smoothstep(0.1, 0.3, uGrowthProgress);
  if (growthAlpha < 0.05) discard;

  float heightAlpha = smoothstep(0.0, 1.0, vHeight);
  float edgeFactor = 1.0 - abs(normal.y);

  vec3 baseColor = mix(vec3(1.0), uAttenuationColor, heightAlpha * 0.3);

  vec3 F = fresnel(viewDir, normal, 1.45);
  vec3 dispersion = dispersionColor(viewDir, normal, uDispersion, uThickness);

  float caustics = fbm(vWorldPosition.xz * 3.0 + uTime * 0.3, 4);
  caustics = smoothstep(0.5, 1.0, caustics) * edgeFactor * uCausticsIntensity * growthAlpha;

  vec3 rim = uRimColor * pow(edgeFactor, 2.0) * uRimIntensity * growthAlpha;

  float clearcoat = uClearcoat * smoothstep(0.3, 1.0, growthAlpha) * (1.0 + caustics * 0.5);

  float transmission = smoothstep(0.2, 1.0, growthAlpha) * (1.0 - edgeFactor * 0.3);

  vec3 color = baseColor * (1.0 - F * 0.7) * transmission;
  color += F * dispersion * 0.5;
  color += rim;
  color += vec3(caustics) * 0.3;

  float alpha = growthAlpha * transmission * 0.95 + (1.0 - transmission) * 0.1;

  gl_FragColor = vec4(color, alpha);
}
`;

export const CRYSTAL_MATERIAL_UNIFORMS = {
  uGrowthProgress: { value: 0 },
  uTime: { value: 0 },
  uNoiseScale: { value: [2.0, 2.0, 4.0, 4.0] },
  uAsymmetry: { value: 0.05 },
  uAttenuationColor: { value: [1.0, 1.0, 1.0] },
  uDispersion: { value: 0.1 },
  uThickness: { value: 1.25 },
  uClearcoat: { value: 0.3 },
  uRimColor: { value: [0.35, 0.48, 1.0] },
  uRimIntensity: { value: 1.8 },
  uCausticsIntensity: { value: 0.6 },
};

export function createCrystalGrowthMaterial(config: {
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
  rimColor: THREE.Color;
  rimIntensity: number;
  causticsIntensity: number;
  asymmetry: number;
}): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: CRYSTAL_GROWTH_VERTEX_SHADER,
    fragmentShader: CRYSTAL_GROWTH_FRAGMENT_SHADER,
    uniforms: {
      uGrowthProgress: { value: 0 },
      uTime: { value: 0 },
      uNoiseScale: { value: new THREE.Vector4(2.0, 2.0, 4.0, 4.0) },
      uAsymmetry: { value: config.asymmetry },
      uAttenuationColor: { value: config.attenuationColor },
      uDispersion: { value: config.dispersion },
      uThickness: { value: config.thickness },
      uClearcoat: { value: config.clearcoat },
      uRimColor: { value: config.rimColor },
      uRimIntensity: { value: config.rimIntensity },
      uCausticsIntensity: { value: config.causticsIntensity },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}