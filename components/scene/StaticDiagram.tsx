"use client";

import React from "react";
import { HOSPITAL_MODULES } from "@/data/modules";

/**
 * StaticDiagram — DESIGN.md §10
 * High-fidelity 2D SVG system fallback when WebGL is unavailable or device capability is limited.
 * Shows the Data Core at the center with the 9 modules connected in a balanced radial architecture.
 */
export default function StaticDiagram() {
  const radius = 240;
  const centerX = 360;
  const centerY = 360;

  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center p-6"
    >
      <svg
        viewBox="0 0 720 720"
        className="max-h-[85vh] max-w-[85vw] w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft background radial glow */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius + 40}
          stroke="#34312D"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.4"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke="#34312D"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Radial Connection Lines */}
        {HOSPITAL_MODULES.map((mod, i) => {
          const angle = (i * 2 * Math.PI) / HOSPITAL_MODULES.length - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          return (
            <g key={`conn-${mod.id}`}>
              <line
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="#34312D"
                strokeWidth="1.5"
              />
              <circle
                cx={(centerX + x) / 2}
                cy={(centerY + y) / 2}
                r="3"
                fill="#5B7CFF"
                opacity="0.75"
              />
            </g>
          );
        })}

        {/* Central Data Core representation */}
        <g>
          <circle
            cx={centerX}
            cy={centerY}
            r="82"
            fill="#151518"
            stroke="#34312D"
            strokeWidth="1.5"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r="68"
            fill="#1D1D21"
            stroke="#5B7CFF"
            strokeWidth="2"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r="54"
            fill="#151518"
            stroke="#34312D"
            strokeWidth="1"
          />
          <text
            x={centerX}
            y={centerY - 8}
            textAnchor="middle"
            fill="#F1EEE8"
            fontSize="12"
            fontWeight="500"
            letterSpacing="0.08em"
          >
            DATA CORE
          </text>
          <text
            x={centerX}
            y={centerY + 12}
            textAnchor="middle"
            fill="#9B9892"
            fontSize="10"
            letterSpacing="0.04em"
          >
            SINGLE SOURCE OF TRUTH
          </text>
        </g>

        {/* 9 Module Nodes */}
        {HOSPITAL_MODULES.map((mod, i) => {
          const angle = (i * 2 * Math.PI) / HOSPITAL_MODULES.length - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          return (
            <g key={`node-${mod.id}`}>
              <rect
                x={x - 48}
                y={y - 24}
                width="96"
                height="48"
                rx="8"
                fill="#151518"
                stroke="#34312D"
                strokeWidth="1.2"
              />
              <circle cx={x - 34} cy={y} r="3" fill="#5B7CFF" />
              <text
                x={x - 22}
                y={y - 2}
                fill="#F1EEE8"
                fontSize="10"
                fontWeight="500"
              >
                {mod.nameEn}
              </text>
              <text x={x - 22} y={y + 11} fill="#9B9892" fontSize="8.5">
                {mod.groupLabel}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
