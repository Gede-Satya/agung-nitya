"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Home hero 3D storytelling scene (DESIGN.md §7).
 *
 * A clean, generic, unbranded IT device group — rack, commercial monitor, and
 * UPS — shown together with a calm idle motion. Transparent background so it
 * blends into the light editorial canvas. Raw three.js keeps the dependency
 * surface minimal; the component is loaded lazily and never blocks first paint.
 *
 * Behavior:
 * - Pauses off-screen and when the tab is hidden.
 * - Caps device pixel ratio (2 desktop / 1.5 small screens).
 * - With prefers-reduced-motion it renders one static frame, no loop.
 */

const DISPOSABLE_MATERIALS: THREE.Material[] = [];

function makeBody(color: number, roughness = 0.55) {
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness: 0.18,
  });
  DISPOSABLE_MATERIALS.push(mat);
  return mat;
}

export default function HardwareScene({ onReady }: { onReady?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(onReady);

  useEffect(() => {
    readyRef.current = onReady;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, width < 640 ? 1.5 : 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0.4, 1.9, 7.6);
    camera.lookAt(0, 1.0, 0);

    const group = new THREE.Group();
    scene.add(group);

    // ---- Lights -------------------------------------------------------
    const hemi = new THREE.HemisphereLight(0xffffff, 0xdbe3ec, 1.05);
    scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(-3.5, 6, 4.5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xbcd6ee, 0.6);
    rim.position.set(4, 3, -4);
    scene.add(rim);

    const accent = new THREE.PointLight(0x126eae, 12, 12, 2);
    accent.position.set(3.4, 1.4, 2.6);
    scene.add(accent);

    // ---- Materials ----------------------------------------------------
    const bodyMat = makeBody(0xeef2f7, 0.5);
    const bodyDarkMat = makeBody(0xccd6e1, 0.6);
    const metalMat = makeBody(0xb9c4d1, 0.35);
    metalMat.metalness = 0.55;

    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x0e1621,
      roughness: 0.32,
      metalness: 0.1,
      emissive: new THREE.Color(0x126eae),
      emissiveIntensity: 0.32,
    });
    DISPOSABLE_MATERIALS.push(screenMat);

    const floater = new THREE.Group();
    group.add(floater);

    // ---- Monitor ------------------------------------------------------
    const monitor = new THREE.Group();
    const screen = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 1.5, 0.09),
      bodyDarkMat
    );
    screen.position.y = 1.15;
    monitor.add(screen);

    const panel = new THREE.Mesh(
      new THREE.BoxGeometry(2.34, 1.34, 0.04),
      screenMat
    );
    panel.position.set(0, 1.15, 0.06);
    monitor.add(panel);

    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 0.5, 20),
      metalMat
    );
    neck.position.set(0, 0.28, 0);
    monitor.add(neck);

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.52, 0.6, 0.06, 32),
      metalMat
    );
    base.position.set(0, 0.03, 0);
    monitor.add(base);
    monitor.rotation.y = -0.18;
    floater.add(monitor);

    // ---- Server rack --------------------------------------------------
    const rack = new THREE.Group();
    const rackBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.15, 2.25, 1.05),
      bodyMat
    );
    rack.add(rackBody);

    const slotMat = makeBody(0xd7dee7, 0.5);
    for (let i = 0; i < 5; i++) {
      const slot = new THREE.Mesh(
        new THREE.BoxGeometry(0.86, 0.06, 0.02),
        slotMat
      );
      slot.position.set(0, 0.82 - i * 0.42, 0.53);
      rack.add(slot);
      const led = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.05, 0.02),
        new THREE.MeshStandardMaterial({
          color: 0x126eae,
          emissive: new THREE.Color(0x126eae),
          emissiveIntensity: 0.8,
        })
      );
      DISPOSABLE_MATERIALS.push(led.material as THREE.Material);
      led.position.set(0.32, 0.82 - i * 0.42, 0.54);
      rack.add(led);
    }
    rack.position.set(-1.95, 1.12, -0.15);
    floater.add(rack);

    // ---- UPS ----------------------------------------------------------
    const ups = new THREE.Group();
    const upsBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.62, 0.85),
      bodyDarkMat
    );
    ups.add(upsBody);
    const upsFace = new THREE.Mesh(
      new THREE.BoxGeometry(0.62, 0.26, 0.03),
      screenMat
    );
    upsFace.position.set(-0.05, 0.07, 0.44);
    ups.add(upsFace);
    ups.position.set(2.0, 0.34, 0.2);
    ups.rotation.y = 0.22;
    floater.add(ups);

    // ---- Soft ground shadow ------------------------------------------
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0e1621,
      transparent: true,
      opacity: 0.06,
    });
    DISPOSABLE_MATERIALS.push(shadowMat);
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(3.4, 48),
      shadowMat
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.06;
    scene.add(shadow);

    // ---- Resize -------------------------------------------------------
    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // ---- Animation ----------------------------------------------------
    const clock = new THREE.Clock();
    let running = true;
    let raf = 0;

    const renderFrame = (t: number) => {
      group.rotation.y = Math.sin(t * 0.18) * 0.12 + 0.06;
      monitor.position.y = Math.sin(t * 0.7) * 0.045;
      rack.position.y = 1.12 + Math.sin(t * 0.6 + 1.2) * 0.05;
      ups.position.y = 0.34 + Math.sin(t * 0.8 + 0.4) * 0.04;
      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!running) return;
      renderFrame(clock.getElapsedTime());
      raf = requestAnimationFrame(loop);
    };

    // Paint the first frame synchronously so the stage can fade in cleanly.
    renderFrame(0);
    if (!reduceMotion) {
      clock.start();
      raf = requestAnimationFrame(loop);
    }
    readyRef.current?.();

    // Pause off-screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduceMotion) return;
        if (entry.isIntersecting && !running) {
          running = true;
          clock.start();
          raf = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    // Pause when tab hidden.
    const onVisibility = () => {
      if (reduceMotion) return;
      if (document.hidden && running) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!document.hidden && !running) {
        running = true;
        clock.start();
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // ---- Cleanup ------------------------------------------------------
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
        }
      });
      DISPOSABLE_MATERIALS.forEach((m) => m.dispose());
      DISPOSABLE_MATERIALS.length = 0;
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
