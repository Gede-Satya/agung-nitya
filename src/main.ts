import { initCatalog3DSlider, closeCoreItemPage } from "./slider3d";

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
interface HeroHardwareItem {
  id: string;
  category: string;
  title: string;
  spec: string;
  image: string;
  video: string;
  poster: string;
  badge: string;
  nextName: string;
}

const HERO_HARDWARE: HeroHardwareItem[] = [
  {
    id: "01",
    category: "Pusat Data & Server",
    title: "DELL PowerEdge R760xs",
    spec: "2U Rack Server · Dual Intel Xeon Silver · 64GB DDR5 · Redundant PSU",
    image: "/products/server-dell-r760xs.png",
    video: "/films/server-loop.mp4",
    poster: "/films/server-loop-poster.jpg",
    badge: "01 · PUSAT DATA & RAK SERVER",
    nextName: "ThinkStation P7",
  },
  {
    id: "02",
    category: "Komputasi & Workstation",
    title: "Lenovo ThinkStation P7",
    spec: "Intel Xeon W-Series · NVIDIA RTX Ada · ISV Certified · Desain & AI",
    image: "/products/workstation-lenovo-p7.jpeg",
    video: "/films/kantor-loop.mp4",
    poster: "/films/kantor-loop-poster.jpg",
    badge: "02 · PERENCANAAN & WORKSTATION",
    nextName: "APC Smart-UPS",
  },
  {
    id: "03",
    category: "Power Backup & Lab",
    title: "APC Smart-UPS SMC3000I-2U",
    spec: "3000VA / 2100W · LCD Interface · Pure Sine Wave · Perlindungan Server",
    image: "/products/ups-apc-smc3000i.jpeg",
    video: "/films/pemeliharaan-loop.mp4",
    poster: "/films/pemeliharaan-loop-poster.jpg",
    badge: "03 · PEMELIHARAAN & DAYA CADANGAN",
    nextName: "LG Medical Display",
  },
  {
    id: "04",
    category: "Display & Fasilitas Institusi",
    title: "LG Commercial Medical Display 31.5\"",
    spec: "8MP IPS · DICOM Part 14 · Kalibrasi Klinis & Manajemen Fasilitas",
    image: "/products/monitor-lg-32hl512d.jpeg",
    video: "/films/perusahaan-loop.mp4",
    poster: "/films/perusahaan-loop-poster.jpg",
    badge: "04 · EKSTERIOR & FASILITAS INSTITUSI",
    nextName: "PowerEdge R760xs",
  },
];

// Dual-channel background video elements
const videoA = document.getElementById("hero-video-a") as HTMLVideoElement | null;
const videoB = document.getElementById("hero-video-b") as HTMLVideoElement | null;
const heroBadgeText = document.getElementById("hero-badge-text");

// Concept 2 Card elements
const heroCarouselCard = document.getElementById("hero-carousel-card");
const hccCategory = document.getElementById("hcc-category");
const hccCurrNum = document.getElementById("hcc-curr-num");
const hccTotalNum = document.getElementById("hcc-total-num");
const hccProductImg = document.getElementById("hcc-product-img") as HTMLImageElement | null;
const hccProductTitle = document.getElementById("hcc-product-title");
const hccProductSpec = document.getElementById("hcc-product-spec");
const hccNextThumb = document.getElementById("hcc-next-thumb") as HTMLImageElement | null;
const hccNextName = document.getElementById("hcc-next-name");
const hccNextSneakBtn = document.getElementById("hcc-next-sneak-btn");
const hccPrevBtn = document.getElementById("hcc-prev-btn");
const hccNextBtn = document.getElementById("hcc-next-btn");
const hccDots = document.querySelectorAll<HTMLButtonElement>(".hcc-dot");
const hccProgressBar = document.getElementById("hcc-progress-bar");

let currentHardwareIndex = 0;
let activeChannel: "A" | "B" = "A";
let isTransitioning = false;
let isPaused = false;
let sceneStartTime = performance.now();
let pausedAtElapsed = 0;
const ITEM_DURATION_MS = 6200; // 6.2s per hardware showcase

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

function switchHardware(targetIndex: number) {
  if (targetIndex === currentHardwareIndex && !isTransitioning) {
    sceneStartTime = performance.now();
    pausedAtElapsed = 0;
    return;
  }
  if (isTransitioning) return;

  isTransitioning = true;
  currentHardwareIndex = targetIndex;
  const targetItem = HERO_HARDWARE[targetIndex];
  const nextItem = HERO_HARDWARE[(targetIndex + 1) % HERO_HARDWARE.length];

  // 1. Dual-channel background video crossfade
  if (videoA && videoB) {
    const incoming = activeChannel === "A" ? videoB : videoA;
    const outgoing = activeChannel === "A" ? videoA : videoA === outgoing ? videoA : videoB;

    incoming.poster = targetItem.poster;
    incoming.src = targetItem.video;
    incoming.currentTime = 0;
    playSafe(incoming);

    incoming.classList.add("active");
    outgoing.classList.remove("active");
    activeChannel = activeChannel === "A" ? "B" : "A";

    setTimeout(() => {
      outgoing.pause();
      isTransitioning = false;

      // Pre-cache next poster
      const preloader = new Image();
      preloader.src = nextItem.poster;
    }, 1200);
  } else {
    isTransitioning = false;
  }

  // 2. Card Content Updates with smooth fade
  if (hccCategory) hccCategory.textContent = targetItem.category;
  if (hccCurrNum) hccCurrNum.textContent = targetItem.id;
  if (hccTotalNum) hccTotalNum.textContent = `0${HERO_HARDWARE.length}`;

  if (hccProductImg) {
    hccProductImg.style.opacity = "0.2";
    hccProductImg.style.transform = "scale(0.92)";
    setTimeout(() => {
      if (hccProductImg) {
        hccProductImg.src = targetItem.image;
        hccProductImg.alt = targetItem.title;
        hccProductImg.style.opacity = "1";
        hccProductImg.style.transform = "scale(1)";
      }
    }, 180);
  }

  if (hccProductTitle) {
    hccProductTitle.style.opacity = "0.2";
    setTimeout(() => {
      if (hccProductTitle) {
        hccProductTitle.textContent = targetItem.title;
        hccProductTitle.style.opacity = "1";
      }
    }, 180);
  }

  if (hccProductSpec) {
    hccProductSpec.style.opacity = "0.2";
    setTimeout(() => {
      if (hccProductSpec) {
        hccProductSpec.textContent = targetItem.spec;
        hccProductSpec.style.opacity = "1";
      }
    }, 180);
  }

  // 3. Next Sneak-peek Update
  if (hccNextThumb) {
    hccNextThumb.src = nextItem.image;
    hccNextThumb.alt = nextItem.title;
  }
  if (hccNextName) {
    hccNextName.textContent = nextItem.nextName;
  }

  // 4. Dot Navigation Update
  hccDots.forEach((dot, idx) => {
    const isAct = idx === targetIndex;
    dot.classList.toggle("active", isAct);
    dot.setAttribute("aria-selected", isAct ? "true" : "false");
  });

  // 5. Hero Badge Update
  if (heroBadgeText) {
    heroBadgeText.style.transition = "opacity 0.25s ease";
    heroBadgeText.style.opacity = "0";
    setTimeout(() => {
      heroBadgeText.textContent = targetItem.badge;
      heroBadgeText.style.opacity = "1";
    }, 250);
  }

  // 6. Reset timer
  sceneStartTime = performance.now();
  pausedAtElapsed = 0;
  if (hccProgressBar) {
    hccProgressBar.style.width = "0%";
  }
}

// Controls: Next & Prev
function goNext() {
  const nextIdx = (currentHardwareIndex + 1) % HERO_HARDWARE.length;
  switchHardware(nextIdx);
}

function goPrev() {
  const prevIdx = (currentHardwareIndex - 1 + HERO_HARDWARE.length) % HERO_HARDWARE.length;
  switchHardware(prevIdx);
}

if (hccNextBtn) hccNextBtn.addEventListener("click", goNext);
if (hccPrevBtn) hccPrevBtn.addEventListener("click", goPrev);
if (hccNextSneakBtn) hccNextSneakBtn.addEventListener("click", goNext);

// Dots Navigation
hccDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const idx = parseInt(dot.dataset.index || "0", 10);
    switchHardware(idx);
  });
});

// Pause timer on card hover or focus
if (heroCarouselCard) {
  heroCarouselCard.addEventListener("mouseenter", () => {
    isPaused = true;
    pausedAtElapsed = performance.now() - sceneStartTime;
  });

  heroCarouselCard.addEventListener("mouseleave", () => {
    isPaused = false;
    sceneStartTime = performance.now() - pausedAtElapsed;
  });

  heroCarouselCard.addEventListener("focusin", () => {
    isPaused = true;
    pausedAtElapsed = performance.now() - sceneStartTime;
  });

  heroCarouselCard.addEventListener("focusout", () => {
    isPaused = false;
    sceneStartTime = performance.now() - pausedAtElapsed;
  });

  // Keyboard navigation within the card
  heroCarouselCard.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
  });
}

// Animation loop to drive progress bar and auto-rotate
function tickHardwareRotation(now: number) {
  if (!isPaused) {
    const elapsed = now - sceneStartTime;
    const progressPct = Math.min(100, Math.max(0, (elapsed / ITEM_DURATION_MS) * 100));

    if (hccProgressBar) {
      hccProgressBar.style.width = `${progressPct.toFixed(1)}%`;
    }

    if (elapsed >= ITEM_DURATION_MS && !isTransitioning) {
      goNext();
    }
  }

  requestAnimationFrame(tickHardwareRotation);
}

// Start initial video playback (if video elements exist) & hardware rotation loop
if (videoA) {
  playSafe(videoA);
}
requestAnimationFrame(tickHardwareRotation);

// ─────────────────────────────────────────────────────────────
// SMOOTH SCROLL ANCHORS
// ─────────────────────────────────────────────────────────────
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (!href) return;

    // If a dedicated core item page is open, close it first before scrolling to homepage sections
    if (document.body.classList.contains("item-page-open") && href !== "#kontak") {
      closeCoreItemPage(true);
    }

    if (href === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

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
