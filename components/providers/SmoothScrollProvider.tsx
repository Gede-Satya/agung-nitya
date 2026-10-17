"use client";

import React from "react";
import { MotionConfig } from "framer-motion";

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Global provider for user-level motion preferences (DESIGN.md §8 & §11.1).
 * Smooth-scroll libraries (Lenis, etc.) are strictly prohibited by DESIGN.md §8 & §11.1
 * to preserve native, predictable, and accessible browser scrolling.
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
