"use client";

import dynamic from "next/dynamic";
import StaticDiagram from "./StaticDiagram";

/**
 * SceneMount — DESIGN.md §9
 * Client-only dynamic mount for the R3F Canvas.
 * Prevents SSR hydration mismatch and displays a clean 2D placeholder while loading.
 */
const SceneCanvas = dynamic(() => import("./SceneCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-canvas">
      <StaticDiagram />
    </div>
  ),
});

interface SceneMountProps {
  onHoverModule?: (id: string | null) => void;
  selectedModuleId?: string | null;
}

export default function SceneMount({
  onHoverModule,
  selectedModuleId,
}: SceneMountProps) {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-auto">
      <SceneCanvas
        onHoverModule={onHoverModule}
        selectedModuleId={selectedModuleId}
      />
    </div>
  );
}
