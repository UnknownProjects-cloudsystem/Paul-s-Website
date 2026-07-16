"use client";

import { useEffect, useRef, useState } from "react";
import PixelTransition from "./PixelTransition";

const VIDEO = "/assets/caissie/video/hero-main.mp4";
const POSTER = "/assets/caissie/video/hero-main-poster.jpg";

// Homepage "enter" sequence. After the opening splash finishes, this plays the
// hero video once full-bleed, then pixel-dissolves from the centre into the
// live site. Once per session; reduced-motion users skip straight through.
export default function HeroIntro() {
  const [mounted, setMounted] = useState(true);
  const [phase, setPhase] = useState<"wait" | "playing" | "pixelating">("wait");
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);
  const doneRef = useRef(false);

  useEffect(() => {
    let entered = false;
    try {
      entered = sessionStorage.getItem("cci_hero_entered") === "1";
    } catch {
      /* private mode */
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (entered || reduced) {
      setMounted(false);
      return;
    }

    document.documentElement.classList.add("hero-intro-active");

    const begin = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      setPhase("playing");
      const v = videoRef.current;
      if (v) {
        v.muted = true;
        v.play?.().catch(() => {
          /* autoplay blocked — skip button + timeout still work */
        });
      }
    };

    // Wait for the opening splash to finish before playing.
    const w = window as unknown as { __cciIntroDone?: boolean };
    let waitTimer = 0;
    if (w.__cciIntroDone) {
      waitTimer = window.setTimeout(begin, 200);
    } else {
      window.addEventListener("cci:intro-done", begin, { once: true });
      waitTimer = window.setTimeout(begin, 12000); // fallback
    }

    // Global safety net so the entrance can never trap the user.
    const safety = window.setTimeout(() => finish(), 32000);

    return () => {
      window.removeEventListener("cci:intro-done", begin);
      window.clearTimeout(waitTimer);
      window.clearTimeout(safety);
      document.documentElement.classList.remove("hero-intro-active");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toPixelate() {
    if (doneRef.current) return;
    if (phase === "pixelating") return;
    setPhase("pixelating");
  }

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      sessionStorage.setItem("cci_hero_entered", "1");
    } catch {
      /* ignore */
    }
    document.documentElement.classList.remove("hero-intro-active");
    setMounted(false);
  }

  if (!mounted) return null;

  const pixelating = phase === "pixelating";

  return (
    <div
      id="cci-hero-intro"
      className={`fixed inset-0 z-[160] ${pixelating ? "bg-transparent" : "bg-black"}`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          pixelating ? "opacity-0" : "opacity-100"
        }`}
        src={VIDEO}
        poster={POSTER}
        muted
        playsInline
        preload="auto"
        onEnded={toPixelate}
        onError={toPixelate}
        onTimeUpdate={(e) => {
          const el = e.currentTarget;
          if (el.duration) setProgress((el.currentTime / el.duration) * 100);
        }}
      />

      {phase === "playing" && (
        <>
          <button
            type="button"
            onClick={toPixelate}
            className="absolute bottom-6 right-6 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/90 backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
          >
            Enter site
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
            <div
              className="h-full bg-gold transition-[width] duration-150 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}

      {pixelating && (
        <PixelTransition source={videoRef.current} onComplete={finish} />
      )}
    </div>
  );
}
