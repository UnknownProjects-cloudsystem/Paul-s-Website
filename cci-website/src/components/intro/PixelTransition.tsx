"use client";

import { useEffect, useRef } from "react";

// Full-screen pixel-dissolve. Covers the viewport with a blocky ("pixelated")
// mosaic sampled from `source` (the hero video's final frame), fades that mosaic
// in so the sharp frame appears to pixelate, then dissolves the blocks from the
// centre outward to reveal the live site beneath. Calls onComplete when done.
export default function PixelTransition({
  source,
  onComplete,
  onCovered,
  cell = 30,
  dissolveMs = 1200,
}: {
  source: HTMLVideoElement | null;
  onComplete: () => void;
  onCovered?: () => void;
  cell?: number;
  dissolveMs?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const doneRef = useRef(false);
  const coveredRef = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onComplete();
    };
    const fireCovered = () => {
      if (coveredRef.current) return;
      coveredRef.current = true;
      onCovered?.();
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      fireCovered();
      finish();
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      finish();
      return;
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    const cols = Math.ceil(w / cell);
    const rows = Math.ceil(h / cell);

    // --- sample the source frame into per-cell colours ---
    const colors: string[] = new Array(cols * rows);
    let sampled = false;
    try {
      if (source && source.readyState >= 2) {
        const off = document.createElement("canvas");
        off.width = cols;
        off.height = rows;
        const octx = off.getContext("2d");
        if (octx) {
          octx.drawImage(source, 0, 0, cols, rows);
          const data = octx.getImageData(0, 0, cols, rows).data;
          for (let i = 0; i < cols * rows; i++) {
            const r = data[i * 4];
            const g = data[i * 4 + 1];
            const b = data[i * 4 + 2];
            colors[i] = `rgb(${r},${g},${b})`;
          }
          sampled = true;
        }
      }
    } catch {
      sampled = false;
    }
    if (!sampled) {
      // Fallback mosaic in brand charcoal with subtle variation.
      for (let i = 0; i < cols * rows; i++) {
        const v = 14 + Math.floor(Math.random() * 16);
        colors[i] = `rgb(${v},${v + 1},${v + 4})`;
      }
    }

    // --- per-cell reveal timing: centre first, outward ---
    const cx = (cols - 1) / 2;
    const cy = (rows - 1) / 2;
    const maxD = Math.hypot(cx, cy) || 1;
    const cellFade = 240;
    const jitter = dissolveMs * 0.12;
    const start = new Array(cols * rows);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const d = Math.hypot(x - cx, y - cy) / maxD;
        start[y * cols + x] = d * (dissolveMs - cellFade) + Math.random() * jitter;
      }
    }

    const FADE_IN = 260; // mosaic fades in (sharp -> pixelated)
    const total = FADE_IN + dissolveMs + cellFade + jitter + 60;
    let raf = 0;
    const t0 = performance.now();

    const draw = (now: number) => {
      const elapsed = now - t0;
      ctx.clearRect(0, 0, w, h);

      // Phase 1: mosaic fades in over the still-sharp frame behind it.
      const coverAlpha = Math.min(1, elapsed / FADE_IN);
      const dissolveT = elapsed - FADE_IN;
      if (elapsed >= FADE_IN) fireCovered();

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          let a = coverAlpha;
          if (dissolveT > 0) {
            const local = dissolveT - start[i];
            if (local >= cellFade) continue; // revealed
            if (local > 0) a = Math.min(a, 1 - local / cellFade);
          }
          if (a <= 0) continue;
          ctx.globalAlpha = a;
          ctx.fillStyle = colors[i];
          ctx.fillRect(x * cell, y * cell, cell + 1, cell + 1);
        }
      }
      ctx.globalAlpha = 1;

      if (elapsed >= total) {
        finish();
        return;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    // Hard safety cap.
    const cap = window.setTimeout(finish, total + 800);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(cap);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[170] h-full w-full"
      aria-hidden="true"
    />
  );
}
