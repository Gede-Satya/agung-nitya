<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

export interface CategoryItem {
  id: number;
  slug: string;
  order_label: string;
  short_title: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  theme: string;
  cover_image: string | null;
  icon_svg: string | null;
  sub_types_summary: string[] | null;
  order_num: number;
  products?: any[];
}

const props = defineProps<{
  categories: CategoryItem[];
}>();

const emit = defineEmits<{
  (e: 'select-category', category: CategoryItem): void;
}>();

const stageRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const activeIndex = ref(0);

const N = computed(() => props.categories.length);
const angleStep = computed(() => 360 / (N.value || 16));

let currentAngle = 0;
let targetAngle = 0;
let velocity = 0;
let isDragging = false;
let startX = 0;
let lastX = 0;
let dragMovedPx = 0;
let autoRotateTimer: number | null = null;
let animFrameId: number | null = null;
let cardPressX = 0;
let cardPressY = 0;
let cardPressTime = 0;
let lastOpenTime = 0;

function getRadius(): number {
  if (typeof window === 'undefined') return 600;
  const w = window.innerWidth;
  if (w <= 480) return 430;
  if (w <= 768) return 560;
  if (w <= 1024) return 680;
  return 760;
}

function getCameraOffsetZ(): number {
  return -getRadius() * 0.46;
}

function normalizeAngle(a: number): number {
  let val = a % 360;
  if (val < 0) val += 360;
  return val;
}

function renderCylinder() {
  if (!trackRef.value) return;
  const offsetZ = getCameraOffsetZ();
  trackRef.value.style.transform = `translateZ(${offsetZ}px) rotateY(${currentAngle}deg)`;

  const cards = trackRef.value.children;
  const radius = getRadius();
  const step = angleStep.value;

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i] as HTMLElement;
    const cardAngle = i * step;
    card.style.transform = `rotateY(${-cardAngle}deg) translateZ(${-radius}px)`;

    const rawFacing = (currentAngle - cardAngle) % 360;
    const facing = (rawFacing + 540) % 360 - 180;
    const absFacing = Math.abs(facing);

    if (absFacing > 82) {
      card.style.opacity = '0';
      card.style.pointerEvents = 'none';
      card.style.visibility = 'hidden';
      card.setAttribute('aria-hidden', 'true');
    } else {
      card.style.visibility = 'visible';
      card.removeAttribute('aria-hidden');
      card.style.pointerEvents = 'auto';

      if (absFacing < step * 0.5) {
        card.style.opacity = '1';
        card.style.zIndex = '50';
      } else if (absFacing < step * 1.5) {
        card.style.opacity = '0.9';
        card.style.zIndex = '35';
      } else {
        card.style.opacity = '0.7';
        card.style.zIndex = '20';
      }
    }
  }

  // Update active index
  const norm = normalizeAngle(-currentAngle);
  const rawIdx = Math.round(norm / step) % N.value;
  activeIndex.value = (rawIdx + N.value) % N.value;
}

function animate() {
  if (!isDragging) {
    const diff = targetAngle - currentAngle;
    if (Math.abs(diff) > 0.02) {
      currentAngle += diff * 0.12;
    } else {
      currentAngle = targetAngle;
    }
  } else {
    currentAngle += velocity;
    velocity *= 0.88;
    targetAngle = currentAngle;
  }

  renderCylinder();
  animFrameId = requestAnimationFrame(animate);
}

function rotateToIndex(index: number) {
  const step = angleStep.value;
  const desired = -index * step;
  const diff = ((desired - targetAngle) % 360 + 540) % 360 - 180;
  targetAngle += diff;
}

function startAutoplay() {
  stopAutoplay();
  autoRotateTimer = window.setInterval(() => {
    if (!isDragging) {
      targetAngle -= angleStep.value;
    }
  }, 2800);
}

function stopAutoplay() {
  if (autoRotateTimer) {
    clearInterval(autoRotateTimer);
    autoRotateTimer = null;
  }
}

// Drag & Pointer Handlers
function onPointerDown(e: PointerEvent) {
  isDragging = true;
  startX = e.clientX;
  lastX = e.clientX;
  dragMovedPx = 0;
  velocity = 0;
  stopAutoplay();
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging) return;
  const deltaX = e.clientX - lastX;
  lastX = e.clientX;
  dragMovedPx += Math.abs(deltaX);

  const factor = 360 / (getRadius() * 2 * Math.PI);
  currentAngle += deltaX * factor * 1.25;
  velocity = deltaX * factor * 0.5;
  targetAngle = currentAngle;
}

function onPointerUp() {
  if (!isDragging) return;
  isDragging = false;
  // Snap to nearest card
  const step = angleStep.value;
  const nearestIndex = Math.round(-targetAngle / step);
  targetAngle = -nearestIndex * step;
  startAutoplay();
}

function onCardPointerDown(e: PointerEvent) {
  cardPressX = e.clientX;
  cardPressY = e.clientY;
  cardPressTime = window.performance.now();
}

function handleCardTap(index: number, cat: CategoryItem, e: PointerEvent) {
  const moved = Math.hypot(e.clientX - cardPressX, e.clientY - cardPressY);
  const duration = window.performance.now() - cardPressTime;

  if (moved < 18 && duration < 700) {
    const now = window.performance.now();
    if (now - lastOpenTime < 400) return;
    lastOpenTime = now;
    rotateToIndex(index);
    emit('select-category', cat);
  }
}

onMounted(() => {
  renderCylinder();
  animate();
  startAutoplay();
  window.addEventListener('resize', renderCylinder);
});

onBeforeUnmount(() => {
  stopAutoplay();
  if (animFrameId) cancelAnimationFrame(animFrameId);
  window.removeEventListener('resize', renderCylinder);
});
</script>

<template>
  <div class="relative w-full overflow-hidden select-none py-10">
    <!-- Stage Wrap with 3D Perspective -->
    <div 
      ref="stageRef"
      class="c3d-stage relative mx-auto h-[480px] sm:h-[530px] md:h-[570px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      style="perspective: 1400px; transform-style: preserve-3d;"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
    >
      <!-- Cards Track Container -->
      <div 
        ref="trackRef"
        class="c3d-cards-track relative w-full h-full flex items-center justify-center pointer-events-none"
        style="transform-style: preserve-3d;"
      >
        <div 
          v-for="(cat, idx) in categories" 
          :key="cat.id"
          class="c3d-card absolute w-[260px] sm:w-[290px] md:w-[320px] h-[380px] sm:h-[410px] md:h-[430px] rounded-2xl bg-white border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden pointer-events-auto transition-opacity duration-300 cursor-pointer group"
          :data-index="idx"
          @pointerdown="onCardPointerDown"
          @pointerup="(e) => handleCardTap(idx, cat, e)"
        >
          <!-- Card Header & Badge -->
          <div class="p-4 pb-2 flex items-center justify-between border-b border-slate-100/80 bg-slate-50/60">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-mono font-bold text-xs">
              {{ cat.order_label }}
            </span>
            <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              LKPP INAPROC
            </span>
          </div>

          <!-- Card Image & Icon -->
          <div class="relative flex-1 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4 overflow-hidden">
            <img 
              v-if="cat.cover_image" 
              :src="cat.cover_image" 
              :alt="cat.short_title"
              class="max-h-36 sm:max-h-44 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <div v-else class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <span v-html="cat.icon_svg" class="w-8 h-8"></span>
            </div>
          </div>

          <!-- Card Body Details -->
          <div class="p-4 pt-2 bg-white flex flex-col justify-between border-t border-slate-100">
            <div>
              <div class="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                {{ cat.short_title }}
              </div>
              <h3 class="font-bold text-slate-900 text-sm leading-snug line-clamp-1 mt-0.5 group-hover:text-blue-600 transition-colors">
                {{ cat.title }}
              </h3>
              <p class="text-xs text-slate-500 line-clamp-2 mt-1">
                {{ cat.subtitle || cat.description }}
              </p>
            </div>

            <!-- Tags summary -->
            <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <div class="text-[11px] text-slate-500 font-medium">
                {{ (cat.sub_types_summary || []).length }} Jenis Spesifikasi
              </div>
              <span class="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Buka &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Indicator Bar & Quick Navigation Pills -->
    <div class="max-w-4xl mx-auto px-4 mt-6 text-center">
      <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Kategori Terpilih: <strong class="text-slate-800">{{ categories[activeIndex]?.short_title }}</strong>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <button 
          v-for="(cat, idx) in categories" 
          :key="cat.id"
          @click="rotateToIndex(idx)"
          :class="[
            'px-2.5 py-1 rounded-full text-xs font-semibold transition-all',
            activeIndex === idx 
              ? 'bg-slate-900 text-white shadow-sm scale-105' 
              : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'
          ]"
        >
          {{ cat.order_label }} {{ cat.short_title }}
        </button>
      </div>
    </div>
  </div>
</template>
