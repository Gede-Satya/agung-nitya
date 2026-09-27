"use client";

import { Component, type ReactNode } from "react";

/**
 * Penangkap kegagalan scene WebGL/React di bawahnya. React Three Fiber melempar
 * error kanvas keluar dari <Canvas>, jadi tanpa boundary ini satu kegagalan
 * context creation menjatuhkan seluruh route. Fallback-nya bisa berupa UI
 * statis, dan `onError` dipakai induk untuk menurunkan varian (mis. hero 3D →
 * hero statis).
 */
export default class CanvasGuard extends Component<{
  children: ReactNode;
  fallback?: ReactNode;
  onError?: () => void;
}> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.warn("[CanvasGuard] scene gagal dimuat:", error.message);
    this.props.onError?.();
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
