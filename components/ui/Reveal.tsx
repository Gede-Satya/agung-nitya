"use client";

import React from "react";
import { motion } from "framer-motion";

/** Easing curve: power3.out — tanpa bounce/elastic. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealProps {
  children: React.ReactNode;
  /** Jeda sebelum animasi mulai (detik). Untuk stagger: idx * 0.08. */
  delay?: number;
  /** Jarak geser vertikal awal (px). Hanya transform + opacity (GPU). */
  y?: number;
  className?: string;
}

/**
 * Reveal-on-scroll sekali-main untuk grup visual.
 * Prefers-reduced-motion ditangani global oleh `MotionConfig reducedMotion="user"`
 * (lihat SmoothScrollProvider), sehingga markup SSR identik di semua kondisi dan
 * tidak memicu hydration mismatch.
 */
export default function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
