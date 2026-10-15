"use client";

import React from "react";

/**
 * StaticDiagram — DESIGN.md §7
 * High-fidelity 2D SVG fallback of the Generic IT Device when WebGL is unavailable
 * or prefers-reduced-motion is active.
 * Depicts the mini PC hardware architecture with status LED and topology anchors.
 */
export default function StaticDiagram() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center p-6"
    >
      <svg
        viewBox="0 0 640 480"
        className="max-h-[75vh] max-w-[85vw] w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft background grid lines */}
        <line x1="80" y1="240" x2="560" y2="240" stroke="#34312D" strokeDasharray="4 8" opacity="0.4" />
        <line x1="320" y1="80" x2="320" y2="400" stroke="#34312D" strokeDasharray="4 8" opacity="0.4" />

        {/* Contact shadow ellipse */}
        <ellipse cx="320" cy="360" rx="190" ry="24" fill="#000000" opacity="0.55" />

        {/* Generic Mini PC Body (Isometric / 3D feel in SVG) */}
        {/* Lower chassis */}
        <path
          d="M170 230 L320 180 L470 230 L320 280 Z"
          fill="#151518"
          stroke="#34312D"
          strokeWidth="1.5"
        />
        {/* Chassis Front / Side Extrusion */}
        <path
          d="M170 230 L320 280 L320 320 L170 270 Z"
          fill="#111114"
          stroke="#34312D"
          strokeWidth="1.5"
        />
        <path
          d="M470 230 L320 280 L320 320 L470 270 Z"
          fill="#18181C"
          stroke="#34312D"
          strokeWidth="1.5"
        />

        {/* Front Ports & Accent LED */}
        <circle cx="215" cy="258" r="3.5" fill="#5B7CFF" />
        <rect x="235" y="258" width="16" height="6" rx="2" fill="#3A3A42" />
        <rect x="260" y="258" width="16" height="6" rx="2" fill="#3A3A42" />

        {/* Top Lid Surface */}
        <path
          d="M174 226 L320 176 L466 226 L320 274 Z"
          fill="#1D1D21"
          stroke="#5B7CFF"
          strokeWidth="1"
          opacity="0.85"
        />

        {/* Floating Interface Panel Representation */}
        <path
          d="M190 170 L320 130 L450 170 L320 210 Z"
          fill="#151518"
          stroke="#5B7CFF"
          strokeWidth="1.5"
          opacity="0.95"
        />
        <circle cx="220" cy="168" r="3" fill="#5B7CFF" />
        <circle cx="230" cy="165" r="3" fill="#9B9892" />
        <line x1="250" y1="162" x2="390" y2="162" stroke="#9B9892" strokeWidth="2" opacity="0.6" />

        {/* Institutional Topology Nodes */}
        <g opacity="0.85">
          <circle cx="130" cy="140" r="5" fill="#5B7CFF" />
          <line x1="130" y1="140" x2="200" y2="180" stroke="#5B7CFF" strokeWidth="1" strokeDasharray="3 3" />
          <text x="130" y="125" textAnchor="middle" fill="#9B9892" fontSize="10" fontFamily="sans-serif">INSTANSI</text>

          <circle cx="510" cy="140" r="5" fill="#5B7CFF" />
          <line x1="510" y1="140" x2="440" y2="180" stroke="#5B7CFF" strokeWidth="1" strokeDasharray="3 3" />
          <text x="510" y="125" textAnchor="middle" fill="#9B9892" fontSize="10" fontFamily="sans-serif">LAYANAN TI</text>
        </g>
      </svg>
    </div>
  );
}
