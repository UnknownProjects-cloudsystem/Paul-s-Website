"use client";

import { useEffect, useRef, useState } from "react";
import PixelTransition from "./PixelTransition";

const VIDEO = "/assets/caissie/video/hero-main.mp4";
const POSTER = "/assets/caissie/video/hero-main-poster.jpg";

// Single cinematic loading screen. Plays the intro video once, then the site
// pixelates in from the centre across the screen. Once per browser session,
// reduced-motion safe, and never blocks SEO content (the page renders beneath).
export default function IntroOverlay() {
  const [mounted, setMounted] = useState(true);
  const [phase, setPhase] = useState<"playing" | "pixelating">("playing");
  const [covered, setCovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("cci_intro_seen") === "1";
    } catch {
      /* private mode */
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const html = document.documentElement;

    if (seen || reduced) {
      html.classList.remove("intro-active");
      html.classList.add("intro-done");
      setMounted(false);
      return;
    }

    html.classList.add("intro-active");

    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play?.().catch(() => {
        /* autoplay blocked — skip button + timeout still work */
      });
    }

    // Safety net: never trap the user if the video stalls.
    const fallback = window.setTimeout(() => toPixelate(), 11000);
    return () => {
      window.clearTimeout(fallback);
      html.classList.remove("intro-active");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toPixelate() {
    if (doneRef.current) return;
    setPhase("pixelating");
  }

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      sessionStorage.setItem("cci_intro_seen", "1");
    } catch {
      /* ignore */
    }
    const html = document.documentElement;
    html.classList.remove("intro-active");
    html.classList.add("intro-done");
    setMounted(false);
  }

  if (!mounted) return null;

  const pixelating = phase === "pixelating";

  return (
    <div
      id="cci-intro"
      className={`fixed inset-0 z-[200] ${covered ? "bg-transparent" : "bg-black"}`}
      role="dialog"
      aria-label="Intro"
    >
      <video
        ref={videoRef}
        className={`h-full w-full object-contain transition-opacity duration-200 sm:object-cover ${
          covered ? "opacity-0" : "opacity-100"
        }`}
        src={VIDEO}
        poster={POSTER}
        autoPlay
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

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55))]" />

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
        <PixelTransition
          source={videoRef.current}
          onCovered={() => setCovered(true)}
          onComplete={finish}
        />
      )}
    </div>
  );
}
