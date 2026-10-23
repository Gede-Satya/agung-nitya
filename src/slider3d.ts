/**
 * Circular 3D Cylinder Carousel for PT Agung Wijaya Nitya Catalog Showcase
 * Features:
 * - True circular cylindrical arrangement in 3D space (360° ring)
 * - Turntable rotation with real-time drag & inertia
 * - Perspective origin with slight downward angle to accentuate 3D cylinder depth
 * - Direct card click to rotate cylinder into focus
 * - 3D orbital platform disk with concentric rings and lighting
 * - Accessible controls, ARIA states, and reduced-motion fallback
 */

export interface CatalogProduct3D {
  id: string;
  tag: string;
  category: string;
  title: string;
  specs: string[];
  image: string;
  url: string;
  badge: string;
}

export const CATALOG_PRODUCTS_3D: CatalogProduct3D[] = [
  {
    id: "dell-r760xs",
    tag: "01 // PUSAT DATA & SERVER",
    category: "Pusat Data & Server",
    title: "DELL PowerEdge R760xs Rack Server",
    specs: ["Dual Intel Xeon Gold", "64GB ECC DDR5", "Redundant PSU 800W", "Railkit 2U"],
    image: "/products/server-dell-r760xs.png",
    url: "https://katalog.inaproc.id/agung-wijaya-nitya/dell-power-edge-r760xs",
    badge: "LKPP AKTIF",
  },
  {
    id: "lenovo-p7",
    tag: "02 // KOMPUTASI MEJA & WORKSTATION",
    category: "Komputasi Meja & Workstation",
    title: "Lenovo ThinkStation P7 Workstation",
    specs: ["Intel Xeon W-Series", "NVIDIA RTX Ada", "ECC RAM 64GB", "ISV Certified"],
    image: "/products/workstation-lenovo-p7.jpeg",
    url: "https://katalog.inaproc.id/agung-wijaya-nitya/lenovo-thinkstation-p7",
    badge: "LKPP AKTIF",
  },
  {
    id: "apc-smc3000i",
    tag: "03 // BACKUP POWER (UPS)",
    category: "Backup Power (UPS)",
    title: "APC Smart-UPS SMC3000I-C 3000VA LCD",
    specs: ["3000VA / 2100W", "Pure Sine Wave", "SmartConnect Cloud", "Tegangan 230V"],
    image: "/products/ups-apc-smc3000i.jpeg",
    url: "https://katalog.inaproc.id/agung-wijaya-nitya/apc-smart-ups-smc3000i-c-3000va-lcd-230v",
    badge: "LKPP AKTIF",
  },
  {
    id: "lg-32hl512d",
    tag: "04 // DISPLAY & MONITOR KOMERSIAL",
    category: "Display & Monitor Komersial",
    title: "LG 8MP Diagnostic Monitor 32HL512D",
    specs: ["31.5\" IPS 8MP (3840×2160)", "DICOM Part 14", "Front Sensor Auto-Cal", "USB-C Multi"],
    image: "/products/monitor-lg-32hl512d.jpeg",
    url: "https://katalog.inaproc.id/agung-wijaya-nitya/lg-8mp-diagnostic-monitor-32hl512d",
    badge: "LKPP AKTIF",
  },
  {
    id: "sony-pxw-z200",
    tag: "05 // AUDIO VISUAL & DOKUMENTASI",
    category: "Audio Visual & Dokumentasi",
    title: "Sony PXW-Z200 4K HDR XDCAM Camcorder",
    specs: ["1.0\" Exmor RS CMOS", "4K 120fps HDR", "20x Optical Zoom", "AI Auto Framing"],
    image: "/products/sony-pxw-z200.png",
    url: "https://katalog.inaproc.id/agung-wijaya-nitya/sony-pxw-z200-4k-hdr-xdcam-professional-camcorder",
    badge: "LKPP AKTIF",
  },
  {
    id: "rak-stainless",
    tag: "06 // PENYIMPANAN & RAK STAINLESS",
    category: "Penyimpanan & Rak Stainless",
    title: "Rak Stainless Steel 4 Susun Standar RS & Lab",
    specs: ["SUS 304 Medis / Food-Grade", "Beban 150kg/rak", "Anti Korosi", "Sistem Knock-Down"],
    image: "/products/rak-stainless-steel.png",
    url: "https://katalog.inaproc.id/agung-wijaya-nitya/rak-stainless-steel",
    badge: "LKPP AKTIF",
  },
  {
    id: "lemari-b3",
    tag: "07 // KESELAMATAN & PENYIMPANAN B3",
    category: "Lemari Khusus Bahan Berbahaya",
    title: "Lemari Penyimpanan B3 Kuning Standar OSHA",
    specs: ["Double Wall Steel 18-Ga", "Dual Lock System", "Ventilasi Anti-Flammable", "Kapasitas 45 Galon"],
    image: "/products/lemari-penyimpanan-b3.png",
    url: "https://katalog.inaproc.id/agung-wijaya-nitya/lemari-penyimpanan-b3",
    badge: "LKPP AKTIF",
  },
  {
    id: "krisbow-pedal-240l",
    tag: "08 // FASILITAS KEBERSIHAN INSTITUSI",
    category: "Perlengkapan Institusi",
    title: "Krisbow Tempat Sampah Pedal Roda 240 Liter",
    specs: ["HDPE Tahan UV & Benturan", "Pedal Kaki Metal Kokoh", "Roda Karet Solid 200mm", "Kapasitas 240L"],
    image: "/products/krisbow-pedal-240l.png",
    url: "https://katalog.inaproc.id/agung-wijaya-nitya/krisbow-tempat-sampah-pedal-plastik-dengan-roda-240-liter",
    badge: "LKPP AKTIF",
  },
];

export function initCatalog3DSlider(): void {
  const stage = document.getElementById("catalog-3d-stage");
  if (!stage) return;

  const cardsContainer = document.getElementById("catalog-3d-cards");
  const prevBtn = document.getElementById("catalog-3d-prev") as HTMLButtonElement | null;
  const nextBtn = document.getElementById("catalog-3d-next") as HTMLButtonElement | null;
  const dotsContainer = document.getElementById("catalog-3d-dots");
  const counterCurrent = document.getElementById("catalog-3d-counter-current");
  const counterTotal = document.getElementById("catalog-3d-counter-total");
  const activeTitle = document.getElementById("catalog-3d-active-title");
  const activeCategory = document.getElementById("catalog-3d-active-category");

  if (!cardsContainer) return;

  const totalItems = CATALOG_PRODUCTS_3D.length;
  const stepAngle = 360 / totalItems; // 45 degrees per item

  let currentAngle = 0; // Current cylinder rotation in degrees
  let targetAngle = 0; // Target snapped angle
  let activeIndex = 0;
  let isDragging = false;
  let startX = 0;
  let dragStartAngle = 0;
  let autoplayTimer: number | null = null;
  let rafId: number | null = null;

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Compute radius based on viewport width
  function getRadius(): number {
    const width = window.innerWidth;
    if (width < 640) return 290;
    if (width < 1024) return 400;
    return 480;
  }

  // Render cards HTML
  cardsContainer.innerHTML = CATALOG_PRODUCTS_3D.map((item, index) => {
    const specsHtml = item.specs
      .map((spec) => `<span class="c3d-spec-pill">${escapeHtml(spec)}</span>`)
      .join("");

    return `
      <article
        class="c3d-card"
        data-index="${index}"
        id="c3d-card-${index}"
        tabindex="0"
        aria-label="${escapeHtml(item.title)}"
      >
        <div class="c3d-card-inner">
          <!-- Glass Accent Glow -->
          <div class="c3d-glow-orb" aria-hidden="true"></div>

          <!-- Top Meta Row -->
          <div class="c3d-card-top">
            <span class="c3d-tag">${escapeHtml(item.tag)}</span>
            <span class="c3d-badge">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" class="c3d-badge-icon">
                <path d="M13.333 4L6 11.333 2.667 8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              ${escapeHtml(item.badge)}
            </span>
          </div>

          <!-- Visual Pedestal & Product Media -->
          <div class="c3d-media-pedestal">
            <div class="c3d-pedestal-light" aria-hidden="true"></div>
            <img
              src="${item.image}"
              alt="${escapeHtml(item.title)}"
              class="c3d-product-img"
              loading="lazy"
              draggable="false"
            />
            <div class="c3d-pedestal-plate" aria-hidden="true"></div>
          </div>

          <!-- Product Details -->
          <div class="c3d-card-body">
            <span class="c3d-category-sub">${escapeHtml(item.category)}</span>
            <h3 class="c3d-card-title">${escapeHtml(item.title)}</h3>

            <!-- Specification Badges -->
            <div class="c3d-specs-wrap">
              ${specsHtml}
            </div>

            <!-- Action Buttons -->
            <div class="c3d-card-actions">
              <a
                href="${item.url}"
                target="_blank"
                rel="noopener noreferrer"
                class="c3d-btn-inaproc"
                aria-label="Lihat ${escapeHtml(item.title)} di e-Katalog INAPROC LKPP (tab baru)"
              >
                <span>Lihat di INAPROC</span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
              <a
                href="#kontak"
                class="c3d-btn-quote"
                aria-label="Minta penawaran untuk ${escapeHtml(item.title)}"
              >
                Penawaran
              </a>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // Render navigation dots
  if (dotsContainer) {
    dotsContainer.innerHTML = CATALOG_PRODUCTS_3D.map(
      (_, index) => `
        <button
          type="button"
          class="c3d-dot ${index === 0 ? "active" : ""}"
          data-target="${index}"
          aria-label="Pindah ke slide ${index + 1}"
        ></button>
      `
    ).join("");

    dotsContainer.querySelectorAll<HTMLButtonElement>(".c3d-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        const target = parseInt(dot.dataset.target || "0", 10);
        rotateToIndex(target);
      });
    });
  }

  if (counterTotal) {
    counterTotal.textContent = String(totalItems).padStart(2, "0");
  }

  const cardElements = cardsContainer.querySelectorAll<HTMLElement>(".c3d-card");

  // Position cards in a true circular cylinder ring
  function setupCylinderGeometry(): void {
    const radius = getRadius();
    cardElements.forEach((card, index) => {
      const cardAngle = index * stepAngle;
      // Fixed circular placement on cylinder
      card.dataset.angle = String(cardAngle);
      card.style.transform = `rotateY(${cardAngle}deg) translateZ(${radius}px)`;
    });
  }

  // Update turntable and cards facing status
  function renderCylinder(): void {
    const radius = getRadius();
    const isMobile = window.innerWidth < 640;

    // Apply rotation to the cylinder container
    cardsContainer.style.transform = `translateZ(-${radius}px) rotateY(${currentAngle}deg)`;

    // Calculate facing angles for each card to adjust depth opacity and active class
    let bestIndex = 0;
    let minFacingDiff = 999;

    cardElements.forEach((card, index) => {
      const baseAngle = index * stepAngle;
      // Normalize angle relative to viewer: 0° is facing camera
      let facingAngle = (baseAngle + currentAngle) % 360;
      if (facingAngle > 180) facingAngle -= 360;
      if (facingAngle < -180) facingAngle += 360;

      const absFacing = Math.abs(facingAngle);

      if (absFacing < minFacingDiff) {
        minFacingDiff = absFacing;
        bestIndex = index;
      }

      card.classList.remove("active", "front", "flank", "side", "rear");

      if (absFacing < 22) {
        // Front & center active card
        card.classList.add("active", "front");
        card.style.opacity = "1";
        card.style.filter = "none";
        card.style.zIndex = "30";
        card.style.pointerEvents = "auto";
      } else if (absFacing < 65) {
        // Flanking cards on front hemisphere (±45°)
        card.classList.add("flank");
        card.style.opacity = isMobile ? "0.75" : "0.85";
        card.style.filter = "brightness(0.9)";
        card.style.zIndex = "20";
        card.style.pointerEvents = "auto";
      } else if (absFacing < 115) {
        // Side cards on cylinder curve (±90°)
        card.classList.add("side");
        card.style.opacity = isMobile ? "0.2" : "0.55";
        card.style.filter = "brightness(0.75)";
        card.style.zIndex = "10";
        card.style.pointerEvents = isMobile ? "none" : "auto";
      } else {
        // Rear cards in the back hemisphere of the cylinder ring
        card.classList.add("rear");
        card.style.opacity = isMobile ? "0" : "0.22";
        card.style.filter = "brightness(0.6)";
        card.style.zIndex = "5";
        card.style.pointerEvents = "none";
      }
    });

    if (bestIndex !== activeIndex) {
      activeIndex = bestIndex;
      updateMetadata(activeIndex);
    }
  }

  function updateMetadata(idx: number): void {
    if (counterCurrent) {
      counterCurrent.textContent = String(idx + 1).padStart(2, "0");
    }
    const currentItem = CATALOG_PRODUCTS_3D[idx];
    if (activeTitle && currentItem) {
      activeTitle.textContent = currentItem.title;
    }
    if (activeCategory && currentItem) {
      activeCategory.textContent = currentItem.category;
    }

    if (dotsContainer) {
      dotsContainer.querySelectorAll(".c3d-dot").forEach((dot, i) => {
        if (i === idx) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }
  }

  // Smooth spring loop for cylinder rotation
  function animate(): void {
    if (!isDragging) {
      const diff = targetAngle - currentAngle;
      if (Math.abs(diff) > 0.05) {
        // Spring easing towards targetAngle
        currentAngle += diff * 0.12;
      } else {
        currentAngle = targetAngle;
      }
    }
    renderCylinder();
    rafId = requestAnimationFrame(animate);
  }

  // Rotate to specific slide index
  function rotateToIndex(index: number): void {
    const normalizedIndex = (index + totalItems) % totalItems;
    // Find shortest rotational path from currentAngle
    const targetBase = -normalizedIndex * stepAngle;
    // Calculate nearest multiple of 360 to keep rotation continuous
    const k = Math.round((currentAngle - targetBase) / 360);
    targetAngle = targetBase + k * 360;
    resetAutoplay();
  }

  function nextSlide(): void {
    targetAngle -= stepAngle;
    resetAutoplay();
  }

  function prevSlide(): void {
    targetAngle += stepAngle;
    resetAutoplay();
  }

  // Button listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", () => prevSlide());
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => nextSlide());
  }

  // Click any card to revolve it directly to front
  cardElements.forEach((card, index) => {
    card.addEventListener("click", (e) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a") || target?.closest("button")) return;

      if (index !== activeIndex) {
        rotateToIndex(index);
      }
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        if (index !== activeIndex) {
          e.preventDefault();
          rotateToIndex(index);
        }
      }
    });
  });

  // Pointer drag on carousel ring
  stage.addEventListener("pointerdown", (e: PointerEvent) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest("a") || target?.closest("button")) return;

    isDragging = true;
    startX = e.clientX;
    dragStartAngle = currentAngle;
    stage.setPointerCapture(e.pointerId);
    stage.classList.add("is-dragging");
    pauseAutoplay();
  });

  stage.addEventListener("pointermove", (e: PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    // Sensitivity: ~0.25 degrees per pixel
    currentAngle = dragStartAngle + deltaX * 0.28;
  });

  const onPointerUp = (e: PointerEvent) => {
    if (!isDragging) return;
    isDragging = false;
    stage.classList.remove("is-dragging");
    try {
      stage.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    // Snap to nearest 45 degree angle on circular ring
    targetAngle = Math.round(currentAngle / stepAngle) * stepAngle;
    resetAutoplay();
  };

  stage.addEventListener("pointerup", onPointerUp);
  stage.addEventListener("pointercancel", onPointerUp);

  // Keyboard navigation
  stage.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  });

  // Autoplay
  function startAutoplay(): void {
    if (isReducedMotion) return;
    stopAutoplay();
    autoplayTimer = window.setInterval(() => {
      nextSlide();
    }, 5500);
  }

  function stopAutoplay(): void {
    if (autoplayTimer !== null) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function pauseAutoplay(): void {
    stopAutoplay();
  }

  function resetAutoplay(): void {
    stopAutoplay();
    startAutoplay();
  }

  stage.addEventListener("mouseenter", () => pauseAutoplay());
  stage.addEventListener("mouseleave", () => resetAutoplay());

  // Window resize handler: update geometry radius
  window.addEventListener("resize", () => {
    setupCylinderGeometry();
  }, { passive: true });

  // Init
  setupCylinderGeometry();
  updateMetadata(0);
  animate();
  startAutoplay();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
