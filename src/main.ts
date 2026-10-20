import { createGlRenderer, GlRenderer } from "./gl";
import { createLinesOverlay, LinesOverlay } from "./lines";
import { makeSequence, Sequence } from "./sequence";
import { TIMELINE, smoothstep, lerp } from "./stage";

// Parse runtime transition override from query param: ?t=breathe|slice|halftone|displace|static|ring|walk
const urlParams = new URLSearchParams(window.location.search);
const transitionMap: Record<string, number> = {
  crossfade: 0,
  breathe: 1,
  slice: 2,
  halftone: 3,
  displace: 4,
  static: 5,
  ring: 6,
  walk: 7,
};
const overrideTransitionStr = urlParams.get("t");
const overrideTransition = overrideTransitionStr ? transitionMap[overrideTransitionStr.toLowerCase()] : undefined;

// DOM Elements
const glCanvas = document.getElementById("gl-canvas") as HTMLCanvasElement;
const linesCanvas = document.getElementById("lines-canvas") as HTMLCanvasElement;
const bootPoster = document.getElementById("boot-poster") as HTMLImageElement;
const heroVideo = document.getElementById("hero-loop") as HTMLVideoElement;
const footerVideo = document.getElementById("footer-loop") as HTMLVideoElement;

const layerHero = document.getElementById("layer-hero");
const layerPilar = document.getElementById("layer-pilar");
const layerProduk = document.getElementById("layer-produk");
const layerCara = document.getElementById("layer-cara");
const layerFaq = document.getElementById("layer-faq");
const layerFooter = document.getElementById("layer-footer");

const chapterRail = document.getElementById("chapter-rail");
const railItems = document.querySelectorAll<HTMLElement>(".rail-item");
const navCta = document.getElementById("nav-cta");

// Initialize Renderers
const glRenderer = createGlRenderer(glCanvas);
const linesOverlay = createLinesOverlay(linesCanvas);

// Initialize Frame Sequences
const sequences: Record<string, Sequence> = {
  t12: makeSequence("/films/t12", 121, 2, 0.04, 0.24),
  t23: makeSequence("/films/t23", 121, 2, 0.24, 0.52),
  t34: makeSequence("/films/t34", 121, 2, 0.52, 0.74),
  t45: makeSequence("/films/t45", 121, 2, 0.74, 0.92),
};

// Setup Video Loops
heroVideo.muted = true;
footerVideo.muted = true;

function playVideo(v: HTMLVideoElement) {
  const p = v.play();
  if (p && "catch" in p) {
    p.catch(() => {});
  }
}

// User gesture unlock for iOS/Safari
const unlockMedia = () => {
  playVideo(heroVideo);
  window.removeEventListener("pointerdown", unlockMedia);
  window.removeEventListener("touchstart", unlockMedia);
};
window.addEventListener("pointerdown", unlockMedia, { once: true });
window.addEventListener("touchstart", unlockMedia, { once: true });

// Chapter Rail Navigation Click Handlers
railItems.forEach((item) => {
  item.addEventListener("click", () => {
    const targetProgress = parseFloat(item.dataset.progress || "0");
    const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetProgress * totalScrollable,
      behavior: "smooth",
    });
  });
});

if (navCta) {
  navCta.addEventListener("click", (e) => {
    e.preventDefault();
    const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: totalScrollable * 0.96,
      behavior: "smooth",
    });
  });
}

// Resize Listener
function onResize() {
  glRenderer.resize();
  linesOverlay.resize();
}
window.addEventListener("resize", onResize, { passive: true });

// Global Animation State
let targetProgress = 0;
let progress = 0;
let isBooted = false;
let footerVideoStarted = false;

// Single RequestAnimationFrame Loop
function tick(timestamp: number) {
  const time = timestamp * 0.001;

  // Read scrollY once per frame
  const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
  targetProgress = totalScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / totalScroll)) : 0;

  // Lerp progress with inertia (~0.12)
  progress = lerp(progress, targetProgress, 0.12);

  // Update sequences range loading scheduler
  for (const key in sequences) {
    sequences[key].update(progress);
  }

  // Fade out boot poster once t12 is ready
  if (!isBooted && sequences.t12.isReady) {
    isBooted = true;
    bootPoster.classList.add("hidden");
  }

  // Determine current active timeline beat
  let activeBeat = TIMELINE[0];
  for (let i = 0; i < TIMELINE.length; i++) {
    if (progress >= TIMELINE[i].from && progress <= TIMELINE[i].to) {
      activeBeat = TIMELINE[i];
      break;
    }
  }

  // Manage Video loops
  if (progress < 0.06) {
    heroVideo.style.opacity = `${(1.0 - smoothstep(0.02, 0.06, progress)) * 0.95}`;
    playVideo(heroVideo);
  } else {
    heroVideo.style.opacity = "0";
  }

  if (progress > 0.5 && !footerVideoStarted) {
    footerVideoStarted = true;
    footerVideo.preload = "auto";
  }

  if (progress > 0.90) {
    footerVideo.style.opacity = `${smoothstep(0.90, 0.96, progress) * 0.9}`;
    playVideo(footerVideo);
  } else {
    footerVideo.style.opacity = "0";
  }

  // WebGL Frame Selection & Blending
  let imgA: HTMLImageElement | HTMLVideoElement | null = null;
  let imgB: HTMLImageElement | HTMLVideoElement | null = null;
  let mixVal = 0;
  let transitionType = overrideTransition !== undefined ? overrideTransition : activeBeat.transitionType ?? 0;
  let veilVal = activeBeat.veil;
  let zoomVal = 0.0;
  let panX = 0.0;
  let panY = 0.0;

  if (progress <= 0.04) {
    // Hero: ambient loop of photo 1 (perusahaan)
    imgA = heroVideo.readyState >= 2 ? heroVideo : bootPoster;
    imgB = sequences.t12.nearest(0);
    mixVal = smoothstep(0.02, 0.04, progress);
    zoomVal = (progress / 0.04) * 0.04;
  } else if (progress > 0.04 && progress <= 0.14) {
    // Walk t12: Company entrance -> Office
    const norm = (progress - 0.04) / (0.14 - 0.04);
    const frameIndex = norm * (sequences.t12.count - 1);
    sequences.t12.setWant(frameIndex);
    imgA = sequences.t12.nearest(Math.floor(frameIndex));
    imgB = sequences.t12.nearest(Math.ceil(frameIndex));
    mixVal = frameIndex - Math.floor(frameIndex);
    transitionType = overrideTransition !== undefined ? overrideTransition : 0;
  } else if (progress > 0.14 && progress <= 0.24) {
    // Held office frame (Empat Pilar)
    const heldFrame = sequences.t12.nearest(sequences.t12.count - 1);
    imgA = heldFrame;
    imgB = sequences.t23.nearest(0);
    // Crossfade at the end into next sequence
    mixVal = smoothstep(0.23, 0.24, progress);
    zoomVal = ((progress - 0.14) / 0.1) * 0.03;
    veilVal = 0.48;
  } else if (progress > 0.24 && progress <= 0.38) {
    // Walk t23: Office -> Server Room
    const norm = (progress - 0.24) / (0.38 - 0.24);
    const frameIndex = norm * (sequences.t23.count - 1);
    sequences.t23.setWant(frameIndex);
    imgA = sequences.t23.nearest(Math.floor(frameIndex));
    imgB = sequences.t23.nearest(Math.ceil(frameIndex));
    mixVal = frameIndex - Math.floor(frameIndex);
    transitionType = overrideTransition !== undefined ? overrideTransition : 0;
  } else if (progress > 0.38 && progress <= 0.52) {
    // Held server room frame (Produk & Layanan)
    const heldFrame = sequences.t23.nearest(sequences.t23.count - 1);
    imgA = heldFrame;
    imgB = sequences.t34.nearest(0);
    mixVal = smoothstep(0.51, 0.52, progress);
    zoomVal = ((progress - 0.38) / 0.14) * 0.03;
    veilVal = 0.48;
  } else if (progress > 0.52 && progress <= 0.64) {
    // Walk t34: Server Room -> Maintenance Room
    const norm = (progress - 0.52) / (0.64 - 0.52);
    const frameIndex = norm * (sequences.t34.count - 1);
    sequences.t34.setWant(frameIndex);
    imgA = sequences.t34.nearest(Math.floor(frameIndex));
    imgB = sequences.t34.nearest(Math.ceil(frameIndex));
    mixVal = frameIndex - Math.floor(frameIndex);
    transitionType = overrideTransition !== undefined ? overrideTransition : 0;
  } else if (progress > 0.64 && progress <= 0.74) {
    // Held maintenance room frame (Cara Pengadaan)
    const heldFrame = sequences.t34.nearest(sequences.t34.count - 1);
    imgA = heldFrame;
    imgB = sequences.t45.nearest(0);
    mixVal = smoothstep(0.73, 0.74, progress);
    zoomVal = ((progress - 0.64) / 0.1) * 0.03;
    veilVal = 0.48;
  } else if (progress > 0.74 && progress <= 0.84) {
    // Walk t45: Maintenance Room -> Closing Room
    const norm = (progress - 0.74) / (0.84 - 0.74);
    const frameIndex = norm * (sequences.t45.count - 1);
    sequences.t45.setWant(frameIndex);
    imgA = sequences.t45.nearest(Math.floor(frameIndex));
    imgB = sequences.t45.nearest(Math.ceil(frameIndex));
    mixVal = frameIndex - Math.floor(frameIndex);
    transitionType = overrideTransition !== undefined ? overrideTransition : 0;
  } else if (progress > 0.84 && progress <= 0.92) {
    // Held closing shot (FAQ Accordion)
    const heldFrame = sequences.t45.nearest(sequences.t45.count - 1);
    imgA = heldFrame;
    imgB = footerVideo.readyState >= 2 ? footerVideo : heldFrame;
    mixVal = smoothstep(0.91, 0.92, progress);
    zoomVal = ((progress - 0.84) / 0.08) * 0.03;
    veilVal = 0.52;
  } else {
    // Hubungi Kami / Footer (ambient loop of photo 5)
    imgA = sequences.t45.nearest(sequences.t45.count - 1);
    imgB = footerVideo.readyState >= 2 ? footerVideo : imgA;
    mixVal = smoothstep(0.92, 0.96, progress);
    veilVal = 0.42;
  }

  // Render WebGL
  glRenderer.render(
    imgA,
    imgB,
    mixVal,
    transitionType,
    veilVal,
    zoomVal,
    panX,
    panY,
    activeBeat.focal[0],
    activeBeat.focal[1],
    time
  );

  // Render 2D Lines overlay
  linesOverlay.render(progress);

  // Update HTML Text Layers (opacity and translateY via smoothstep)
  updateLayer(layerHero, progress, -0.05, 0.0, 0.035, 0.05);
  updateLayer(layerPilar, progress, 0.13, 0.15, 0.23, 0.25);
  updateLayer(layerProduk, progress, 0.37, 0.39, 0.51, 0.53);
  updateLayer(layerCara, progress, 0.63, 0.65, 0.73, 0.75);
  updateLayer(layerFaq, progress, 0.83, 0.85, 0.91, 0.93);
  updateLayer(layerFooter, progress, 0.93, 0.95, 1.0, 1.05);

  // Update Chapter Rail Active Highlight
  updateRail(progress);

  requestAnimationFrame(tick);
}

function updateLayer(
  el: HTMLElement | null,
  p: number,
  fadeInStart: number,
  fadeInEnd: number,
  fadeOutStart: number,
  fadeOutEnd: number
) {
  if (!el) return;
  let opacity = 0;
  let y = 30;

  if (p >= fadeInStart && p <= fadeOutEnd) {
    if (p < fadeInEnd) {
      const t = smoothstep(fadeInStart, fadeInEnd, p);
      opacity = t;
      y = lerp(30, 0, t);
    } else if (p > fadeOutStart) {
      const t = smoothstep(fadeOutStart, fadeOutEnd, p);
      opacity = 1.0 - t;
      y = lerp(0, -30, t);
    } else {
      opacity = 1.0;
      y = 0;
    }
  }

  el.style.opacity = opacity.toFixed(3);
  el.style.transform = `translateY(${y.toFixed(2)}px)`;
  el.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
}

function updateRail(p: number) {
  let activeIndex = 0;
  if (p < 0.1) activeIndex = 0;
  else if (p < 0.3) activeIndex = 1;
  else if (p < 0.58) activeIndex = 2;
  else if (p < 0.78) activeIndex = 3;
  else if (p < 0.92) activeIndex = 4;
  else activeIndex = 5;

  railItems.forEach((item, idx) => {
    if (idx === activeIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Start Loop
requestAnimationFrame(tick);
