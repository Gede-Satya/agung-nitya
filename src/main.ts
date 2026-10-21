import { createGlRenderer } from "./gl";
import { createLinesOverlay } from "./lines";
import { makeSequence, Sequence } from "./sequence";
import { HERO_SCENES, smoothstep, lerp } from "./stage";

// DOM Elements
const heroWrapper = (document.getElementById("hero-wrapper") || document.getElementById("hero-stage")) as HTMLElement;
const heroStage = (document.getElementById("hero-stage") || document.getElementById("hero-pin")) as HTMLElement;
const glCanvas = document.getElementById("gl-canvas") as HTMLCanvasElement;
const linesCanvas = document.getElementById("lines-canvas") as HTMLCanvasElement;
const bootPoster = document.getElementById("boot-poster") as HTMLImageElement;
const heroVideo = document.getElementById("hero-loop") as HTMLVideoElement;
const footerVideo = document.getElementById("footer-loop") as HTMLVideoElement;

const sceneTitle = document.getElementById("scene-title");
const scenePills = document.querySelectorAll<HTMLElement>(".scene-pill");
const sceneNumBtns = document.querySelectorAll<HTMLElement>(".scene-num-btn");
const scrubIndicator = document.getElementById("scrub-indicator");
const siteHeader = document.getElementById("site-header");
const heroBottomBar = document.getElementById("hero-bottom-bar");

// Check reduced motion preference
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Header scroll listener: keeps navbar completely transparent throughout the 500vh hero
function onScroll() {
  if (siteHeader && heroWrapper) {
    const totalScrollDistance = heroWrapper.offsetHeight - window.innerHeight;
    if (window.scrollY > totalScrollDistance) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  }
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Initialize Renderers
const glRenderer = createGlRenderer(glCanvas);
const linesOverlay = createLinesOverlay(linesCanvas);

// Initialize Frame Sequences with targeted active ranges
const sequences: Record<string, Sequence> = {
  t12: makeSequence("/films/t12", 121, 2, 0.0, 0.25),
  t23: makeSequence("/films/t23", 121, 2, 0.15, 0.45),
  t34: makeSequence("/films/t34", 121, 2, 0.35, 0.65),
  t45: makeSequence("/films/t45", 121, 2, 0.55, 0.85),
};

// Video playback helper
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

// Jump helper for scene buttons
function jumpToScene(targetP: number) {
  if (!heroWrapper) return;
  const totalScrollDistance = heroWrapper.offsetHeight - window.innerHeight;
  const holdDistance = totalScrollDistance * 0.05;
  const activeScrubDistance = Math.max(1, totalScrollDistance - holdDistance);
  const targetY = heroWrapper.offsetTop + targetP * activeScrubDistance;
  window.scrollTo({
    top: targetY,
    behavior: "smooth",
  });
}

// Interactive Scene Pills & Numbers: click to jump to scene progress
scenePills.forEach((pill) => {
  pill.addEventListener("click", () => {
    jumpToScene(parseFloat(pill.dataset.progress || "0"));
  });
});
sceneNumBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    jumpToScene(parseFloat(btn.dataset.progress || "0"));
  });
});

// Setup Smooth Scroll for Navigation Anchors
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;
    const targetEl = document.querySelector(href);
    if (targetEl) {
      e.preventDefault();
      const headerOffset = 70;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Interactive FAQ Accordion
document.querySelectorAll<HTMLElement>(".faq-item").forEach((item) => {
  const qEl = item.querySelector(".faq-q");
  if (qEl) {
    qEl.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("open"));
      if (!isOpen) {
        item.classList.add("open");
      }
    });
  }
});

// Resize Listener
function onResize() {
  glRenderer.resize();
  linesOverlay.resize();
}
window.addEventListener("resize", onResize, { passive: true });

// Animation State
let targetProgress = 0;
let progress = 0;
let lastTimestamp = 0;
let isBooted = false;
let currentSceneIndex = 0;

function tick(timestamp: number) {
  const time = timestamp * 0.001;

  // Calculate local progress strictly from the hero wrapper's own scroll range
  if (heroWrapper) {
    const totalScrollDistance = heroWrapper.offsetHeight - window.innerHeight;
    const heroRect = heroWrapper.getBoundingClientRect();
    const heroScrolled = Math.max(0, -heroRect.top);

    // Wrapper progress strictly represents 0% to 100% of the outer hero wrapper
    const wrapperProgress = totalScrollDistance > 0 ? (heroScrolled / totalScrollDistance) : 0;

    // Active scrub completes over 95% of scroll; 95% to 100% holds scene 05 at 100% full-screen
    const holdDistance = totalScrollDistance * 0.05;
    const activeScrubDistance = Math.max(1, totalScrollDistance - holdDistance);

    targetProgress = totalScrollDistance > 0 ? Math.min(1, Math.max(0, heroScrolled / activeScrubDistance)) : 0;

    // When the hero wrapper has passed and sticky has naturally released, hide HUD / bottom bar
    const heroSceneHud = document.getElementById("hero-scene-hud");
    if (heroSceneHud) {
      if (heroScrolled > totalScrollDistance) {
        heroSceneHud.style.opacity = "0";
        heroSceneHud.style.pointerEvents = "none";
      } else {
        heroSceneHud.style.opacity = "1";
        heroSceneHud.style.pointerEvents = "auto";
      }
    }
    if (heroBottomBar) {
      if (heroScrolled > totalScrollDistance) {
        heroBottomBar.style.opacity = "0";
        heroBottomBar.style.pointerEvents = "none";
      } else {
        heroBottomBar.style.opacity = "1";
        heroBottomBar.style.pointerEvents = "auto";
      }
    }
    if (siteHeader) {
      if (heroScrolled > totalScrollDistance) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }
  }

  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
  }
  const dt = Math.min(0.1, Math.max(0.001, (timestamp - lastTimestamp) * 0.001));
  lastTimestamp = timestamp;

  // Frame-rate independent exponential smoothing (lambda = 25.0)
  // Delivers instant direct feel (~28ms half-life) identical across 60Hz, 120Hz, and 144Hz
  const alpha = 1.0 - Math.exp(-25.0 * dt);
  if (Math.abs(targetProgress - progress) < 0.00005) {
    progress = targetProgress;
  } else {
    progress += (targetProgress - progress) * alpha;
  }

  // Update sequences
  for (const key in sequences) {
    sequences[key].update(progress);
  }

  // Hide boot poster once first sequence is ready
  if (!isBooted && sequences.t12.isReady) {
    isBooted = true;
    bootPoster.classList.add("hidden");
  }

  // Determine Active Scene (0-20%, 20-40%, 40-60%, 60-80%, 80-100%)
  const newSceneIndex = Math.min(4, Math.floor(progress / 0.2));
  if (newSceneIndex !== currentSceneIndex) {
    currentSceneIndex = newSceneIndex;
    if (sceneTitle) {
      sceneTitle.textContent = HERO_SCENES[currentSceneIndex].name;
    }
    scenePills.forEach((pill, idx) => {
      if (idx === currentSceneIndex) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });
    sceneNumBtns.forEach((btn, idx) => {
      if (idx === currentSceneIndex) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // Update scrub percent text
  if (scrubIndicator) {
    scrubIndicator.textContent = `SCRUB // ${Math.round(progress * 100).toString().padStart(2, "0")}%`;
  }

  // Frame selection across the 5 scenes with sub-frame blending and boundary lookahead
  let imgA: HTMLImageElement | HTMLVideoElement | null = null;
  let imgB: HTMLImageElement | HTMLVideoElement | null = null;
  let mixVal = 0.0;
  const transitionType = 0;
  const veilVal = 0.0;
  const zoomVal = 0.0;
  const panX = 0.0;
  const panY = 0.0;

  if (progress < 0.20) {
    // SCENE 1: Company Exterior (0.00 - 0.20)
    const norm = Math.min(1, Math.max(0, progress / 0.20));
    const frameFloat = norm * (sequences.t12.count - 1);
    sequences.t12.setWant(frameFloat);
    if (progress > 0.14) {
      sequences.t23.setWant(0);
    }
    const pair = sequences.t12.getPair(frameFloat);
    if (pair) {
      imgA = pair.imgA;
      imgB = pair.imgB;
      mixVal = pair.mixVal;
    }
  } else if (progress < 0.40) {
    // SCENE 2: Office (0.20 - 0.40)
    const norm = Math.min(1, Math.max(0, (progress - 0.20) / 0.20));
    const frameFloat = norm * (sequences.t23.count - 1);
    sequences.t23.setWant(frameFloat);
    if (progress < 0.24) {
      sequences.t12.setWant(sequences.t12.count - 1);
    } else if (progress > 0.34) {
      sequences.t34.setWant(0);
    }
    const pair = sequences.t23.getPair(frameFloat);
    if (pair) {
      imgA = pair.imgA;
      imgB = pair.imgB;
      mixVal = pair.mixVal;
    }
  } else if (progress < 0.60) {
    // SCENE 3: Server Room (0.40 - 0.60)
    const norm = Math.min(1, Math.max(0, (progress - 0.40) / 0.20));
    const frameFloat = norm * (sequences.t34.count - 1);
    sequences.t34.setWant(frameFloat);
    if (progress < 0.44) {
      sequences.t23.setWant(sequences.t23.count - 1);
    } else if (progress > 0.54) {
      sequences.t45.setWant(0);
    }
    const pair = sequences.t34.getPair(frameFloat);
    if (pair) {
      imgA = pair.imgA;
      imgB = pair.imgB;
      mixVal = pair.mixVal;
    }
  } else if (progress < 0.80) {
    // SCENE 4: Hardware Maintenance (0.60 - 0.80)
    const norm = Math.min(1, Math.max(0, (progress - 0.60) / 0.20));
    const frameFloat = norm * (sequences.t45.count - 1);
    sequences.t45.setWant(frameFloat);
    if (progress < 0.64) {
      sequences.t34.setWant(sequences.t34.count - 1);
    } else if (progress > 0.74) {
      sequences.t45.setWant(sequences.t45.count - 1);
    }
    const pair = sequences.t45.getPair(frameFloat);
    if (pair) {
      imgA = pair.imgA;
      imgB = pair.imgB;
      mixVal = pair.mixVal;
    }
  } else {
    // SCENE 5: Closing Consultation Desk (0.80 - 1.00)
    sequences.t45.setWant(sequences.t45.count - 1);
    const endFrame = sequences.t45.count - 1;
    const pair = sequences.t45.getPair(endFrame);
    if (pair) {
      imgA = pair.imgA;
      imgB = pair.imgB;
      mixVal = 0.0;
    } else {
      const held = sequences.t45.nearest(endFrame);
      imgA = held;
      imgB = held;
      mixVal = 0.0;
    }
  }

  // Fallback to boot poster if textures are not ready yet
  if (!imgA) imgA = bootPoster;
  if (!imgB) imgB = bootPoster;

  // Render WebGL frame
  glRenderer.render(
    imgA,
    imgB,
    mixVal,
    transitionType,
    veilVal,
    zoomVal,
    panX,
    panY,
    0.5,
    0.5,
    time
  );

  // Render 2D architectural lines
  linesOverlay.render(progress, time);

  // Continue RAF
  requestAnimationFrame(tick);
}

// Start loop if motion is allowed, else render static frame
if (prefersReducedMotion) {
  // Render static first frame
  glRenderer.render(bootPoster, bootPoster, 0, 0, 0, 0, 0, 0, 0.5, 0.5, 0);
  linesOverlay.render(0, 0);
  if (sceneTitle) sceneTitle.textContent = HERO_SCENES[0].name;
  if (scrubIndicator) scrubIndicator.textContent = "STATIC MODE";
} else {
  requestAnimationFrame(tick);
}
