import fragSource from "./shaders/frag.glsl?raw";

const VERT_SHADER = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export interface GlRenderer {
  canvas: HTMLCanvasElement;
  resize: () => void;
  render: (
    imgA: HTMLImageElement | HTMLVideoElement | null,
    imgB: HTMLImageElement | HTMLVideoElement | null,
    mixVal: number,
    transitionType: number,
    veil: number,
    zoom: number,
    panX: number,
    panY: number,
    focalX: number,
    focalY: number,
    time: number
  ) => void;
  isLost: boolean;
}

export function createGlRenderer(canvas: HTMLCanvasElement): GlRenderer {
  let gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: "high-performance",
  });

  let isLost = false;
  let program: WebGLProgram | null = null;
  let texA: WebGLTexture | null = null;
  let texB: WebGLTexture | null = null;

  // Uniform locations
  let locUa: WebGLUniformLocation | null = null;
  let locUb: WebGLUniformLocation | null = null;
  let locMix: WebGLUniformLocation | null = null;
  let locTransition: WebGLUniformLocation | null = null;
  let locRes: WebGLUniformLocation | null = null;
  let locTime: WebGLUniformLocation | null = null;
  let locVeil: WebGLUniformLocation | null = null;
  let locZoom: WebGLUniformLocation | null = null;
  let locPan: WebGLUniformLocation | null = null;
  let locFocal: WebGLUniformLocation | null = null;

  function compileShader(type: number, src: string): WebGLShader {
    if (!gl) throw new Error("No WebGL context");
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const err = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Shader compile error: ${err}`);
    }
    return shader;
  }

  function initGL() {
    if (!gl) return;
    const isMobile = window.matchMedia("(max-width: 820px)").matches;
    const fullFrag = isMobile ? `#define PHONE 1\n${fragSource}` : fragSource;

    const vs = compileShader(gl.VERTEX_SHADER, VERT_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, fullFrag);

    program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`Program link error: ${gl.getProgramInfoLog(program)}`);
    }

    gl.useProgram(program);

    // Fullscreen quad buffer
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    const verts = new Float32Array([-1, -1, 3, -1, -1, 3]); // single big triangle
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Create 2 reused textures
    texA = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texA);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    texB = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texB);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Cache uniform locations
    locUa = gl.getUniformLocation(program, "uA");
    locUb = gl.getUniformLocation(program, "uB");
    locMix = gl.getUniformLocation(program, "uMix");
    locTransition = gl.getUniformLocation(program, "uTransition");
    locRes = gl.getUniformLocation(program, "uResolution");
    locTime = gl.getUniformLocation(program, "uTime");
    locVeil = gl.getUniformLocation(program, "uVeil");
    locZoom = gl.getUniformLocation(program, "uZoom");
    locPan = gl.getUniformLocation(program, "uPan");
    locFocal = gl.getUniformLocation(program, "uFocal");

    gl.uniform1i(locUa, 0);
    gl.uniform1i(locUb, 1);
  }

  try {
    initGL();
  } catch (e) {
    console.warn("WebGL initialization fallback to 2D:", e);
    isLost = true;
  }

  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    isLost = true;
  });

  canvas.addEventListener("webglcontextrestored", () => {
    isLost = false;
    initGL();
  });

  function resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const clientW = canvas.clientWidth || window.innerWidth;
    const clientH = canvas.clientHeight || window.innerHeight;
    const width = Math.floor(clientW * dpr);
    const height = Math.floor(clientH * dpr);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      if (gl && !isLost) {
        gl.viewport(0, 0, width, height);
      }
    }
  }

  resize();

  return {
    canvas,
    resize,
    get isLost() {
      return isLost;
    },
    render(imgA, imgB, mixVal, transitionType, veil, zoom, panX, panY, focalX, focalY, time) {
      if (!gl || isLost || !program) {
        // 2D Canvas Fallback
        const ctx2d = canvas.getContext("2d");
        if (ctx2d) {
          ctx2d.clearRect(0, 0, canvas.width, canvas.height);
          if (imgA && "width" in imgA && imgA.width > 0) {
            ctx2d.globalAlpha = 1.0 - mixVal;
            ctx2d.drawImage(imgA, 0, 0, canvas.width, canvas.height);
          }
          if (imgB && "width" in imgB && imgB.width > 0) {
            ctx2d.globalAlpha = mixVal;
            ctx2d.drawImage(imgB, 0, 0, canvas.width, canvas.height);
          }
          if (veil > 0) {
            ctx2d.fillStyle = `rgba(255,255,255,${veil})`;
            ctx2d.fillRect(0, 0, canvas.width, canvas.height);
          }
        }
        return;
      }

      gl.useProgram(program);

      // Upload Texture A (Texture Unit 0)
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texA);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      if (imgA && (("naturalWidth" in imgA && imgA.naturalWidth > 0) || ("videoWidth" in imgA && imgA.videoWidth > 0))) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgA);
      }

      // Upload Texture B (Texture Unit 1)
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, texB);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      if (imgB && (("naturalWidth" in imgB && imgB.naturalWidth > 0) || ("videoWidth" in imgB && imgB.videoWidth > 0))) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgB);
      }

      // Pass Uniforms
      gl.uniform1f(locMix, mixVal);
      gl.uniform1i(locTransition, transitionType);
      gl.uniform2f(locRes, canvas.width, canvas.height);
      gl.uniform1f(locTime, time);
      gl.uniform1f(locVeil, veil);
      gl.uniform1f(locZoom, zoom);
      gl.uniform2f(locPan, panX, panY);
      gl.uniform2f(locFocal, focalX, focalY);

      // Render fullscreen triangle
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}
