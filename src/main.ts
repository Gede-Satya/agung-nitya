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

// Header scroll listener
function onScroll() {
  if (siteHeader) {
    if (window.scrollY > 60) {
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
  }

  // Smooth lerp progress
  progress = lerp(progress, targetProgress, 0.15);

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

  // Frame selection across the 5 scenes (crisp clean transitions, exactly one scene dominant)
  let imgA: HTMLImageElement | HTMLVideoElement | null = null;
  let imgB: HTMLImageElement | HTMLVideoElement | null = null;
  const mixVal = 0.0;
  const transitionType = 0;
  const veilVal = 0.0;
  const zoomVal = 0.0;
  const panX = 0.0;
  const panY = 0.0;

  if (progress < 0.20) {
    // SCENE 1: Company Exterior (0.00 - 0.20)
    const norm = Math.min(1, Math.max(0, progress / 0.20));
    const frameIndex = norm * (sequences.t12.count - 1);
    sequences.t12.setWant(frameIndex);
    imgA = sequences.t12.nearest(Math.round(frameIndex));
    imgB = imgA;
  } else if (progress < 0.40) {
    // SCENE 2: Office (0.20 - 0.40)
    const norm = Math.min(1, Math.max(0, (progress - 0.20) / 0.20));
    const frameIndex = norm * (sequences.t23.count - 1);
    sequences.t23.setWant(frameIndex);
    imgA = sequences.t23.nearest(Math.round(frameIndex));
    imgB = imgA;
  } else if (progress < 0.60) {
    // SCENE 3: Server Room (0.40 - 0.60)
    const norm = Math.min(1, Math.max(0, (progress - 0.40) / 0.20));
    const frameIndex = norm * (sequences.t34.count - 1);
    sequences.t34.setWant(frameIndex);
    imgA = sequences.t34.nearest(Math.round(frameIndex));
    imgB = imgA;
  } else if (progress < 0.80) {
    // SCENE 4: Hardware Maintenance (0.60 - 0.80)
    const norm = Math.min(1, Math.max(0, (progress - 0.60) / 0.20));
    const frameIndex = norm * (sequences.t45.count - 1);
    sequences.t45.setWant(frameIndex);
    imgA = sequences.t45.nearest(Math.round(frameIndex));
    imgB = imgA;
  } else {
    // SCENE 5: Closing Consultation Desk (0.80 - 1.00)
    const held = sequences.t45.nearest(sequences.t45.count - 1);
    imgA = held;
    imgB = held;
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
