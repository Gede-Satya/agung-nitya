"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { MAINTENANCE_CONFIG } from "@/src/config/maintenanceConfig";

export default function PemeliharaanHardwareSection() {
  const shouldReduceMotion = useReducedMotion();
  const config = MAINTENANCE_CONFIG;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // Store preloaded images in a ref to avoid re-renders
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Helper to format frame path e.g. /frames/laptop/0001.webp
  const getFrameUrl = useCallback(
    (index: number) => {
      const paddedIndex = String(index + 1).padStart(4, "0");
      return `${config.frameFolder}/${paddedIndex}.${config.fileExtension}`;
    },
    [config.frameFolder, config.fileExtension]
  );

  // Preloading frames: first frame immediately, rest in background
  useEffect(() => {
    if (shouldReduceMotion) return;

    imagesRef.current = new Array(config.frameCount).fill(null);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const step = isMobile ? 2 : 1;

    // 1. Load First Frame immediately
    const firstImg = new window.Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      setIsFirstFrameLoaded(true);

      // 2. Background preload of remaining frames
      for (let i = 1; i < config.frameCount; i += step) {
        const img = new window.Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          imagesRef.current[i] = img;
        };
      }
    };

    return () => {
      imagesRef.current = [];
    };
  }, [config.frameCount, getFrameUrl, shouldReduceMotion]);

  // Track section visibility to pause rAF loop when out of view
  useEffect(() => {
    if (shouldReduceMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  // Draw current frame to canvas centered using object-contain
  const renderCanvasFrame = useCallback(
    (frameIdx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Find best available frame (exact or nearest loaded fallback)
      let img = imagesRef.current[frameIdx];
      if (!img || !img.complete) {
        for (let offset = 1; offset < 15; offset++) {
          if (frameIdx - offset >= 0 && imagesRef.current[frameIdx - offset]?.complete) {
            img = imagesRef.current[frameIdx - offset];
            break;
          }
          if (frameIdx + offset < config.frameCount && imagesRef.current[frameIdx + offset]?.complete) {
            img = imagesRef.current[frameIdx + offset];
            break;
          }
        }
      }

      if (!img || !img.complete) {
        img = imagesRef.current[0];
      }

      if (!img || !img.complete) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // object-contain math: perfectly centered
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;
      let rw = width;
      let rh = height;
      let rx = 0;
      let ry = 0;

      if (canvasRatio > imgRatio) {
        rh = height;
        rw = height * imgRatio;
        rx = (width - rw) / 2;
      } else {
        rw = width;
        rh = width / imgRatio;
        ry = (height - rh) / 2;
      }

      ctx.drawImage(img, rx, ry, rw, rh);
      ctx.restore();
    },
    [config.frameCount]
  );

  // Passive scroll listener with requestAnimationFrame
  useEffect(() => {
    if (shouldReduceMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            const totalScrollable = container.offsetHeight - window.innerHeight;
            if (totalScrollable > 0) {
              const currentScroll = -rect.top;
              const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

              targetFrameRef.current = Math.min(
                config.frameCount - 1,
                Math.floor(progress * (config.frameCount - 1))
              );
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [config.frameCount, shouldReduceMotion]);

  // Handle window resize for canvas redraw
  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleResize = () => {
      renderCanvasFrame(Math.round(currentFrameRef.current));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderCanvasFrame, shouldReduceMotion]);

  // Smooth easing animation loop inside requestAnimationFrame
  useEffect(() => {
    if (shouldReduceMotion || !isSectionVisible) return;

    const animateLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.1) {
        currentFrameRef.current += diff * 0.18;
        renderCanvasFrame(Math.round(currentFrameRef.current));
      } else if (Math.round(current) !== target) {
        currentFrameRef.current = target;
        renderCanvasFrame(target);
      }

      animFrameIdRef.current = requestAnimationFrame(animateLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(animateLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isSectionVisible, renderCanvasFrame, shouldReduceMotion]);

  // Initial draw once first frame loads
  useEffect(() => {
    if (isFirstFrameLoaded && !shouldReduceMotion) {
      renderCanvasFrame(0);
    }
  }, [isFirstFrameLoaded, renderCanvasFrame, shouldReduceMotion]);

  // Reduced motion mode fallback: centered laptop visual
  if (shouldReduceMotion) {
    const finalFrameUrl = getFrameUrl(config.frameCount - 1);
    return (
      <section
        id="pemeliharaan-hardware"
        className="w-full py-16 sm:py-24 bg-[#F5F5F7] flex items-center justify-center scroll-mt-0"
      >
        <div id="pemeliharaan" className="sr-only" aria-hidden="true" />
        <div className="w-full max-w-4xl px-6 flex items-center justify-center">
          <Image
            src={finalFrameUrl}
            alt="Laptop yang sedang menjalani servis berkala"
            width={1600}
            height={900}
            unoptimized
            className="w-full h-auto object-contain"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="pemeliharaan-hardware"
      ref={containerRef}
      className="relative w-full bg-[#F5F5F7] scroll-mt-0"
      style={{ height: "350svh" }}
      aria-label="Animasi laptop scroll interaktif"
    >
      {/* Anchor alias */}
      <div id="pemeliharaan" className="sr-only scroll-mt-0" aria-hidden="true" />

      {/* Sticky Full-Viewport Container with pure centered laptop canvas */}
      <div className="sticky top-0 h-svh w-full flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          aria-label="Laptop yang sedang menjalani servis berkala"
          role="img"
        />

        {/* Loading state indicator */}
        {!isFirstFrameLoaded && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#F5F5F7]">
            <span className="text-sm font-medium text-slate-500">Memuat...</span>
          </div>
        )}
      </div>
    </section>
  );
}
