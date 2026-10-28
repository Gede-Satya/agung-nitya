import { initCatalog3DSlider } from "./slider3d";

// ─────────────────────────────────────────────────────────────
// HEADER SCROLL TRANSITION
// Transparent at hero top, blurred solid backdrop once scrolled
// ─────────────────────────────────────────────────────────────
const siteHeader = document.getElementById("site-header");

function onScroll() {
  if (siteHeader) {
    if (window.scrollY > 40) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  }
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ─────────────────────────────────────────────────────────────
// DYNAMIC DUAL-CHANNEL HERO VIDEO PLAYLIST CONTROLLER
// Seamless crossfade alternating between 5 high-end scenes
// ─────────────────────────────────────────────────────────────
interface HeroScene {
  index: string;
  tag: string;
  label: string;
  video: string;
  poster: string;
}

const HERO_SCENES: HeroScene[] = [
  {
    index: "01",
    tag: "01 // EKSTERIOR GEDUNG & FASILITAS",
    label: "Gedung & Lobi",
    video: "/films/perusahaan-loop.mp4",
    poster: "/films/perusahaan-loop-poster.jpg",
  },
  {
    index: "02",
    tag: "02 // PERENCANAAN & KOLABORASI TIM",
    label: "Ruang Kantor",
    video: "/films/kantor-loop.mp4",
    poster: "/films/kantor-loop-poster.jpg",
  },
  {
    index: "03",
    tag: "03 // PUSAT DATA & RAK SERVER",
    label: "Server Room",
    video: "/films/server-loop.mp4",
    poster: "/films/server-loop-poster.jpg",
  },
  {
    index: "04",
    tag: "04 // PEMELIHARAAN & DIAGNOSTIK HARDWARE",
    label: "Pemeliharaan",
    video: "/films/pemeliharaan-loop.mp4",
    poster: "/films/pemeliharaan-loop-poster.jpg",
  },
  {
    index: "05",
    tag: "05 // SOLUSI KONSULTASI & WORKSTATION",
    label: "Konsultasi",
    video: "/films/penutup-loop.mp4",
    poster: "/films/penutup-loop-poster.jpg",
  },
];

const videoA = document.getElementById("hero-video-a") as HTMLVideoElement | null;
const videoB = document.getElementById("hero-video-b") as HTMLVideoElement | null;
const heroBadgeText = document.getElementById("hero-badge-text");
const sceneTabs = document.querySelectorAll<HTMLButtonElement>(".hero-scene-tab");

let currentSceneIndex = 0;
let activeChannel: "A" | "B" = "A";
let isTransitioning = false;
let sceneStartTime = performance.now();
const SCENE_DURATION_MS = 6500; // 6.5s per scene before transitioning to the next

function playSafe(video: HTMLVideoElement) {
  video.muted = true;
  const p = video.play();
  if (p !== undefined) {
    p.catch(() => {});
  }
}

// User interaction unlock for autoplay on mobile/Safari
function unlockAllMedia() {
  if (videoA) playSafe(videoA);
  if (videoB) playSafe(videoB);
  window.removeEventListener("pointerdown", unlockAllMedia);
  window.removeEventListener("touchstart", unlockAllMedia);
}
window.addEventListener("pointerdown", unlockAllMedia, { once: true });
window.addEventListener("touchstart", unlockAllMedia, { once: true });

function switchScene(targetIndex: number) {
  if (!videoA || !videoB) return;
  if (targetIndex === currentSceneIndex && !isTransitioning) {
    sceneStartTime = performance.now();
    return;
  }
  if (isTransitioning) return;

  isTransitioning = true;
  currentSceneIndex = targetIndex;
  const targetScene = HERO_SCENES[targetIndex];

  // Determine incoming vs outgoing video channel
  const incoming = activeChannel === "A" ? videoB : videoA;
  const outgoing = activeChannel === "A" ? videoA : videoB;

  // Prepare incoming video
  incoming.poster = targetScene.poster;
  incoming.src = targetScene.video;
  incoming.currentTime = 0;
  playSafe(incoming);

  // Crossfade via CSS opacity classes
  incoming.classList.add("active");
  outgoing.classList.remove("active");
  activeChannel = activeChannel === "A" ? "B" : "A";

  // Update tabs UI
  sceneTabs.forEach((tab, idx) => {
    const isAct = idx === targetIndex;
    tab.classList.toggle("active", isAct);
    tab.setAttribute("aria-selected", isAct ? "true" : "false");
    const bar = tab.querySelector<HTMLElement>(".tab-progress-bar");
    if (bar && !isAct) {
      bar.style.width = "0%";
    }
  });

  // Update badge text with subtle fade
  if (heroBadgeText) {
    heroBadgeText.style.transition = "opacity 0.25s ease";
    heroBadgeText.style.opacity = "0";
    setTimeout(() => {
      heroBadgeText.textContent = targetScene.tag;
      heroBadgeText.style.opacity = "1";
    }, 250);
  }

  sceneStartTime = performance.now();

  // After 1.2s crossfade, pause outgoing video to preserve CPU/GPU
  setTimeout(() => {
    outgoing.pause();
    isTransitioning = false;

    // Background pre-cache next poster
    const nextIdx = (targetIndex + 1) % HERO_SCENES.length;
    const preloader = new Image();
    preloader.src = HERO_SCENES[nextIdx].poster;
  }, 1200);
}

// Click on scene tab to immediately jump
sceneTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const idx = parseInt(tab.dataset.index || "0", 10);
    switchScene(idx);
  });
});

// Animation loop to drive progress bar and trigger automatic scene rotation
function tickVideoRotation(now: number) {
  const elapsed = now - sceneStartTime;
  const progressPct = Math.min(100, Math.max(0, (elapsed / SCENE_DURATION_MS) * 100));

  const activeTab = sceneTabs[currentSceneIndex];
  if (activeTab) {
    const bar = activeTab.querySelector<HTMLElement>(".tab-progress-bar");
    if (bar) {
      bar.style.width = `${progressPct.toFixed(1)}%`;
    }
  }

  if (elapsed >= SCENE_DURATION_MS && !isTransitioning) {
    const nextIndex = (currentSceneIndex + 1) % HERO_SCENES.length;
    switchScene(nextIndex);
  }

  requestAnimationFrame(tickVideoRotation);
}

// Start initial video playback
if (videoA) {
  playSafe(videoA);
  requestAnimationFrame(tickVideoRotation);
}

// ─────────────────────────────────────────────────────────────
// SMOOTH SCROLL ANCHORS
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// INTERACTIVE FAQ ACCORDION
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// 3D PERSPECTIVE CATALOG SLIDER INITIALIZATION
// ─────────────────────────────────────────────────────────────
initCatalog3DSlider();
