#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform sampler2D uA;
uniform sampler2D uB;
uniform float uMix;
uniform int uTransition; // 0: plain crossfade, 1: breathe, 2: slice, 3: halftone, 4: displace, 5: static, 6: ring, 7: walk
uniform vec2 uResolution;
uniform float uTime;
uniform float uVeil;
uniform float uZoom;
uniform vec2 uPan;
uniform vec2 uFocal;

varying vec2 vUv;

// Hash and noise functions
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// Ordered 4x4 Bayer dither
float bayer4(vec2 p) {
  vec2 b = floor(mod(p, 4.0));
  float d = 0.0;
  if (b.y == 0.0) {
    if (b.x == 0.0) d = 0.0; else if (b.x == 1.0) d = 8.0; else if (b.x == 2.0) d = 2.0; else d = 10.0;
  } else if (b.y == 1.0) {
    if (b.x == 0.0) d = 12.0; else if (b.x == 1.0) d = 4.0; else if (b.x == 2.0) d = 14.0; else d = 6.0;
  } else if (b.y == 2.0) {
    if (b.x == 0.0) d = 3.0; else if (b.x == 1.0) d = 11.0; else if (b.x == 2.0) d = 1.0; else d = 9.0;
  } else {
    if (b.x == 0.0) d = 15.0; else if (b.x == 1.0) d = 7.0; else if (b.x == 2.0) d = 13.0; else d = 5.0;
  }
  return (d + 0.5) / 16.0;
}

vec2 applyZoomPan(vec2 uv, float zoom, vec2 pan) {
  vec2 centered = uv - 0.5;
  centered -= pan;
  centered /= (1.0 + zoom);
  return centered + 0.5;
}

void main() {
  vec2 uv = vUv;
  vec2 pUv = applyZoomPan(uv, uZoom, uPan);

  vec4 colA = vec4(0.0);
  vec4 colB = vec4(0.0);
  vec4 outCol = vec4(0.0);

  // TRANSITION BRANCHING
  if (uTransition == 0) {
    // 0: Plain crossfade
    colA = texture2D(uA, pUv);
    colB = texture2D(uB, pUv);
    outCol = mix(colA, colB, uMix);

  } else if (uTransition == 1) {
    // 1: Breathe — slow scale/luminance pulse with low-freq noise drift
    float pulse = sin(uTime * 1.5) * 0.015;
    vec2 breatheUv = applyZoomPan(uv, uZoom + pulse, uPan + vec2(pulse * 0.5, 0.0));
    colA = texture2D(uA, breatheUv);
    colB = texture2D(uB, breatheUv);
    outCol = mix(colA, colB, uMix);

  } else if (uTransition == 2) {
    // 2: Slice — horizontal band displacement wipe
    float band = floor(uv.y * 32.0);
    float offset = hash(vec2(band, 1.23)) * 0.12 * (1.0 - abs(uMix - 0.5) * 2.0);
    vec2 sliceUv = pUv + vec2(offset, 0.0);
    float wipe = step(uMix, uv.x + offset * 0.5);
    colA = texture2D(uA, sliceUv);
    colB = texture2D(uB, sliceUv);
    outCol = mix(colB, colA, wipe);

  } else if (uTransition == 3) {
    // 3: Halftone — dot-matrix dissolve; dot radius driven by luminance and uMix
    colA = texture2D(uA, pUv);
    colB = texture2D(uB, pUv);
    float lumA = dot(colA.rgb, vec3(0.299, 0.587, 0.114));
    vec2 grid = fract(uv * uResolution / 8.0) - 0.5;
    float dist = length(grid);
    float threshold = mix(lumA * 0.5, 1.0 - lumA * 0.5, uMix);
    float edge = 0.05;
    float ht = smoothstep(threshold - edge, threshold + edge, dist);
    outCol = mix(colA, colB, ht);

  } else if (uTransition == 4) {
    // 4: Displace — noise-warped UV push between A and B
    float n = noise(uv * 12.0 + uTime * 0.5) - 0.5;
    vec2 dispUvA = pUv + vec2(n, n) * uMix * 0.15;
    vec2 dispUvB = pUv - vec2(n, n) * (1.0 - uMix) * 0.15;
    colA = texture2D(uA, dispUvA);
    colB = texture2D(uB, dispUvB);
    outCol = mix(colA, colB, uMix);

  } else if (uTransition == 5) {
    // 5: Static — thresholded hash noise dissolve
    colA = texture2D(uA, pUv);
    colB = texture2D(uB, pUv);
    float rnd = hash(uv * uResolution + uTime);
    float st = step(rnd, uMix);
    outCol = mix(colA, colB, st);

  } else if (uTransition == 6) {
    // 6: Ring — radial reveal with soft antialiased edge
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    float dist = length((uv - uFocal) * aspect);
    float maxDist = length(vec2(max(uFocal.x, 1.0 - uFocal.x) * aspect.x, max(uFocal.y, 1.0 - uFocal.y)));
    float radius = uMix * maxDist * 1.2;
    float edge = 0.08;
    float ringAlpha = smoothstep(radius - edge, radius + edge, dist);
    colA = texture2D(uA, pUv);
    colB = texture2D(uB, pUv);
    outCol = mix(colB, colA, ringAlpha);

  } else if (uTransition == 7) {
    // 7: Walk — forward walk-through fallback for a doorway or opening
    // ease-in-out curve
    float t = smoothstep(0.0, 1.0, uMix);
    float scaleA = 1.0 + 1.4 * t;
    vec2 uvA = (pUv - uFocal) / scaleA + uFocal;

    float scaleB = 0.5 + 0.5 * t;
    vec2 uvB = (pUv - uFocal) / scaleB + uFocal;

    // Radial blur towards focal point for A
    #if defined(PHONE)
    const int TAPS = 2;
    #else
    const int TAPS = 6;
    #endif

    vec4 accumA = vec4(0.0);
    vec2 dir = (uFocal - uvA) * 0.03 * t;
    for (int i = 0; i < TAPS; i++) {
      accumA += texture2D(uA, uvA + dir * float(i));
    }
    colA = accumA / float(TAPS);
    colB = texture2D(uB, uvB);

    float fade = smoothstep(0.4, 0.8, uMix);
    outCol = mix(colA, colB, fade);

  } else {
    colA = texture2D(uA, pUv);
    colB = texture2D(uB, pUv);
    outCol = mix(colA, colB, uMix);
  }

  // POST PROCESS:
  // 1. Color grade with faint brand-blue tint in shadows (rgb(11,107,174)) while keeping whites clean
  vec3 brandBlue = vec3(11.0 / 255.0, 107.0 / 255.0, 174.0 / 255.0);
  float lum = dot(outCol.rgb, vec3(0.299, 0.587, 0.114));
  float shadowWeight = (1.0 - lum) * 0.08;
  outCol.rgb += brandBlue * shadowWeight;

  #if !defined(PHONE)
  // 2. Film grain (~0.17)
  float gr = (hash(uv * uResolution + fract(uTime)) - 0.5) * 0.08;
  outCol.rgb += gr;

  // 3. Ordered dither (~0.01)
  float dither = (bayer4(gl_FragCoord.xy) - 0.5) * 0.012;
  outCol.rgb += dither;

  // 4. Value noise (~0.06)
  float vn = (noise(uv * 400.0) - 0.5) * 0.04;
  outCol.rgb += vn;

  // 5. Very slight chromatic aberration on edges
  float distCenter = length(uv - 0.5);
  float chromOffset = distCenter * 0.0018;
  outCol.r = texture2D(uA, pUv + vec2(chromOffset, 0.0)).r * (1.0 - uMix) + texture2D(uB, pUv + vec2(chromOffset, 0.0)).r * uMix;
  #endif

  // 6. Soft white veil (uVeil: 0.0 to 0.55)
  // Blends clean white over the photograph to ensure 100% legibility of dark text (#1D1D1F)
  vec3 white = vec3(1.0, 1.0, 1.0);
  outCol.rgb = mix(outCol.rgb, white, clamp(uVeil, 0.0, 0.75));

  gl_FragColor = vec4(outCol.rgb, 1.0);
}
