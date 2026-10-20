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
  update: (currentProgress: number) => void;
}

// Global in-flight loader queue scheduler (max 6 parallel requests)
const MAX_CONCURRENT = 5;
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
    for (let delta = -3; delta <= 3; delta++) {
      if (delta === 0) continue;
      const idx = center + delta;
      if (idx >= 0 && idx < count && frames[idx] && "decode" in frames[idx]!) {
        frames[idx]!.decode().catch(() => {});
      }
    }
  }

  function tickLoader() {
    // 1. Scan outward ±24 frames from want
    for (let d = 0; d <= 24; d++) {
      const right = want + d;
      if (right < count && status[right] === "idle") {
        fetchFrame(right);
        return;
      }
      const left = want - d;
      if (left >= 0 && status[left] === "idle") {
        fetchFrame(left);
        return;
      }
    }

    // 2. Fall back to progressive halving order
    for (let idx of order) {
      if (status[idx] === "idle") {
        fetchFrame(idx);
        return;
      }
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

  function update(currentProgress: number) {
    const lead = 0.08;
    const inRange = currentProgress >= from - lead && currentProgress <= to + lead;

    if (!inRange) {
      // Memory capping: if > 0.25 away from scroll range, prune frame references
      const dist = Math.min(Math.abs(currentProgress - from), Math.abs(currentProgress - to));
      if (dist > 0.25) {
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

    // While in range, keep the pipe loaded
    if (activeRequests < MAX_CONCURRENT) {
      tickLoader();
    }
  }

  function setWant(index: number) {
    const nextWant = Math.max(0, Math.min(count - 1, Math.round(index)));
    if (nextWant !== want) {
      want = nextWant;
      preDecodeNeighbors(want);
    }
    tickLoader();
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
    update,
  };
}
