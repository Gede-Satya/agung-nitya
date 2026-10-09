"use client";

import { useSyncExternalStore } from "react";

let cachedCapability: boolean | null = null;

function checkWebGL(): boolean {
  if (typeof window === "undefined") return true;
  if (cachedCapability !== null) return cachedCapability;

  try {
    const nav = navigator as unknown as { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) {
      cachedCapability = false;
      return false;
    }

    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    cachedCapability = !!gl;
    return cachedCapability;
  } catch {
    cachedCapability = false;
    return false;
  }
}

function subscribe() {
  return () => {};
}

function getSnapshot(): boolean {
  return checkWebGL();
}

function getServerSnapshot(): boolean {
  return true;
}

/**
 * useWebGLCapability — DESIGN.md §10
 * Detects WebGL capability using useSyncExternalStore.
 */
export function useWebGLCapability(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
