"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const HardwareScene = dynamic(() => import("./HardwareScene"), {
  ssr: false,
});

/**
 * Layered hero product stage (DESIGN.md §7 & §11):
 * a static, rights-safe poster (existing hardware renders) as the base, with the
 * 3D scene fading in on top once the WebGL bundle has painted its first frame.
 * If WebGL is unavailable or disabled, the poster remains as the fallback.
 */
export default function HardwareSceneStage() {
  const [sceneReady, setSceneReady] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden">
      {/* Poster fallback */}
      <div
        className={`absolute inset-0 flex items-end justify-center transition-opacity duration-700 ${
          sceneReady ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative flex w-full max-w-[520px] items-end justify-center gap-4 pb-6 sm:gap-8">
          <div className="relative aspect-[1/1] w-[26%]">
            <Image
              src="/images/hero-trio-rack-hd.png"
              alt=""
              fill
              sizes="140px"
              className="object-contain object-bottom opacity-90"
            />
          </div>
          <div className="relative aspect-[507/386] w-[46%]">
            <Image
              src="/images/hero-monitor-flawless.png"
              alt=""
              fill
              sizes="240px"
              className="object-contain object-bottom"
            />
          </div>
          <div className="relative aspect-[4/3] w-[24%]">
            <Image
              src="/images/hero-trio-ups-hd.png"
              alt=""
              fill
              sizes="130px"
              className="object-contain object-bottom opacity-90"
            />
          </div>
        </div>
      </div>

      {/* 3D scene */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          sceneReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <HardwareScene onReady={() => setSceneReady(true)} />
      </div>

      {/* Studio floor highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-wash to-transparent"
      />
    </div>
  );
}
