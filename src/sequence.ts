export interface FramePair {
  imgA: HTMLImageElement;
  imgB: HTMLImageElement;
  mixVal: number;
}

export interface Sequence {
  base: string;
  count: number;
  from: number;
  to: number;
  readyAt: number;
  isReady: boolean;
  setWant: (index: number) => void;
  getFrame: (index: number) => HTMLImageElement | null;
  nearest: (index: number) => HTMLImageElement | null;
  getPair: (frameFloat: number) => FramePair | null;
  update: (currentProgress: number) => void;
}

// Global in-flight loader queue scheduler (max 6 parallel requests)
const MAX_CONCURRENT = 6;
let activeRequests = 0;
const pendingQueue: (() => void)[] = [];

function scheduleRequest(task: () => void) {
  if (activeRequests < MAX_CONCURRENT) {
    activeRequests++;
    task();
  } else {
    pendingQueue.push(task);
  }
}

function releaseRequest() {
  activeRequests = Math.max(0, activeRequests - 1);
  if (pendingQueue.length > 0) {
    const next = pendingQueue.shift();
    if (next) {
      activeRequests++;
      next();
    }
  }
}

export function makeSequence(
  base: string,
  count: number,
  readyAt = 2,
  from = 0,
  to = 1
): Sequence {
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 820px)").matches;
  const folder = isMobile ? `${base}/768` : base;

  // Build halving-stride progressive order
  const order: number[] = [];
  const seen = new Set<number>();
  for (let s = 32; s >= 1; s >>= 1) {
    for (let i = 0; i < count; i += s) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }

  const frames: (HTMLImageElement | null)[] = new Array(count).fill(null);
  const status: ("idle" | "loading" | "decoded" | "error")[] = new Array(count).fill("idle");
  const retries: number[] = new Array(count).fill(0);

  let loadedCount = 0;
  let isReady = false;
  let want = 0;

  function pad(n: number) {
    return (n + 1).toString().padStart(3, "0");
  }

  function fetchFrame(i: number) {
    if (i < 0 || i >= count || status[i] !== "idle") return;

    status[i] = "loading";
    scheduleRequest(() => {
      const img = new Image();
      img.decoding = "async";

      const url = `${folder}/f_${pad(i)}.webp?r=1`;

      img.onload = () => {
        if ("decode" in img) {
          img
            .decode()
            .then(() => {
              frames[i] = img;
              status[i] = "decoded";
              loadedCount++;
              if (!isReady && loadedCount >= readyAt) {
                isReady = true;
              }
              releaseRequest();
            })
            .catch(() => {
              // Fallback if decode promise rejected
              frames[i] = img;
              status[i] = "decoded";
              loadedCount++;
              releaseRequest();
            });
        } else {
          frames[i] = img;
          status[i] = "decoded";
          loadedCount++;
          releaseRequest();
        }
      };

      img.onerror = () => {
        releaseRequest();
        retries[i]++;
        if (retries[i] <= 3) {
          status[i] = "idle";
        } else {
          status[i] = "error";
        }
      };

      img.src = url;
    });
  }

  function preDecodeNeighbors(center: number) {
    for (let delta = -2; delta <= 3; delta++) {
      if (delta === 0) continue;
      const idx = center + delta;
      if (idx >= 0 && idx < count && frames[idx] && "decode" in frames[idx]!) {
        frames[idx]!.decode().catch(() => {});
      }
    }
  }

  function tickLoader(): boolean {
    // 1. Scan outward ±24 frames from want (forward biased)
    for (let d = 0; d <= 24; d++) {
      const right = want + d;
      if (right < count && status[right] === "idle") {
        fetchFrame(right);
        return true;
      }
      const left = want - d;
      if (left >= 0 && status[left] === "idle") {
        fetchFrame(left);
        return true;
      }
    }

    // 2. Fall back to progressive halving order
    for (let idx of order) {
      if (status[idx] === "idle") {
        fetchFrame(idx);
        return true;
      }
    }

    return false;
  }

  function pumpLoader() {
    while (activeRequests < MAX_CONCURRENT) {
      const scheduled = tickLoader();
      if (!scheduled) break;
    }
  }

  function nearest(i: number): HTMLImageElement | null {
    const clamped = Math.max(0, Math.min(count - 1, Math.round(i)));
    if (frames[clamped] && frames[clamped]!.naturalWidth > 0) {
      return frames[clamped];
    }
    for (let d = 1; d < count; d++) {
      const r = clamped + d;
      if (r < count && frames[r] && frames[r]!.naturalWidth > 0) {
        return frames[r];
      }
      const l = clamped - d;
      if (l >= 0 && frames[l] && frames[l]!.naturalWidth > 0) {
        return frames[l];
      }
    }
    return null;
  }

  function getPair(frameFloat: number): FramePair | null {
    const clamped = Math.max(0, Math.min(count - 1, frameFloat));
    const floorIndex = Math.floor(clamped);
    const ceilIndex = Math.min(count - 1, floorIndex + 1);
    const fraction = clamped - floorIndex;

    const frameA = frames[floorIndex];
    const frameB = frames[ceilIndex];

    const isReadyA = frameA !== null && frameA.naturalWidth > 0;
    const isReadyB = frameB !== null && frameB.naturalWidth > 0;

    // Ideal: both adjacent consecutive frames are ready -> smooth sub-frame interpolation
    if (isReadyA && isReadyB) {
      if (floorIndex === ceilIndex) {
        return { imgA: frameA!, imgB: frameA!, mixVal: 0.0 };
      }
      return { imgA: frameA!, imgB: frameB!, mixVal: fraction };
    }

    // Stable zero-flicker fallback: if one is ready, hold it for both slots with mixVal = 0.0
    if (isReadyA) {
      return { imgA: frameA!, imgB: frameA!, mixVal: 0.0 };
    }
    if (isReadyB) {
      return { imgA: frameB!, imgB: frameB!, mixVal: 0.0 };
    }

    // Neither is ready: use nearest available frame for both slots
    const near = nearest(floorIndex);
    if (near && near.naturalWidth > 0) {
      return { imgA: near, imgB: near, mixVal: 0.0 };
    }

    return null;
  }

  function update(currentProgress: number) {
    const lead = 0.10;
    const inRange = currentProgress >= from - lead && currentProgress <= to + lead;

    if (!inRange) {
      // Memory capping: if > 0.35 away from scroll range, prune non-boundary frames
      const dist = Math.min(Math.abs(currentProgress - from), Math.abs(currentProgress - to));
      if (dist > 0.35) {
        for (let i = 0; i < count; i++) {
          if (frames[i] && i !== 0 && i !== count - 1) {
            frames[i]!.src = "";
            frames[i] = null;
            status[i] = "idle";
          }
        }
      }
      return;
    }

    // While in range, keep the pipeline saturated
    pumpLoader();
  }

  function setWant(index: number) {
    const nextWant = Math.max(0, Math.min(count - 1, Math.round(index)));
    if (nextWant !== want) {
      want = nextWant;
      preDecodeNeighbors(want);
    }
    pumpLoader();
  }

  // Pre-seed first and last frames immediately
  fetchFrame(0);
  fetchFrame(count - 1);

  return {
    base,
    count,
    from,
    to,
    readyAt,
    get isReady() {
      return isReady || (frames[0] !== null && frames[0]!.naturalWidth > 0);
    },
    setWant,
    getFrame: (i: number) => frames[Math.max(0, Math.min(count - 1, Math.round(i)))],
    nearest,
    getPair,
    update,
  };
}
