export interface LinesOverlay {
  canvas: HTMLCanvasElement;
  resize: () => void;
  render: (progress: number) => void;
}

export function createLinesOverlay(canvas: HTMLCanvasElement): LinesOverlay {
  const ctx = canvas.getContext("2d");

  function resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const width = Math.floor(window.innerWidth * dpr);
    const height = Math.floor(window.innerHeight * dpr);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  resize();

  function drawCrosshair(x: number, y: number, size = 6) {
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.lineTo(x + size, y);
    ctx.moveTo(x, y - size);
    ctx.lineTo(x, y + size);
    ctx.stroke();
  }

  return {
    canvas,
    resize,
    render(progress: number) {
      if (!ctx) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Fine architectural styling
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(29, 29, 31, 0.12)"; // #1D1D1F at 12% opacity
      ctx.fillStyle = "rgba(29, 29, 31, 0.45)";
      ctx.font = `${Math.round(10 * dpr)}px ui-monospace, SFMono-Regular, Menlo, monospace`;

      const padX = Math.round(w * 0.05);
      const padY = Math.round(h * 0.06);

      // Top and bottom horizontal boundary rules
      const topY = Math.round(h * 0.12);
      const botY = Math.round(h * 0.88);

      ctx.beginPath();
      ctx.moveTo(padX, topY);
      ctx.lineTo(w - padX, topY);
      ctx.moveTo(padX, botY);
      ctx.lineTo(w - padX, botY);
      ctx.stroke();

      // Left vertical rail guideline
      const railX = Math.round(w > 900 * dpr ? w * 0.14 : padX + 24 * dpr);
      ctx.beginPath();
      ctx.moveTo(railX, padY);
      ctx.lineTo(railX, h - padY);
      ctx.stroke();

      // Right vertical guideline (desktop only)
      if (w > 900 * dpr) {
        const rightRailX = Math.round(w * 0.86);
        ctx.beginPath();
        ctx.moveTo(rightRailX, padY);
        ctx.lineTo(rightRailX, h - padY);
        ctx.stroke();

        drawCrosshair(rightRailX, topY, 5 * dpr);
        drawCrosshair(rightRailX, botY, 5 * dpr);
      }

      // Crosshair ticks at key intersections
      drawCrosshair(railX, topY, 5 * dpr);
      drawCrosshair(railX, botY, 5 * dpr);
    },
  };
}
