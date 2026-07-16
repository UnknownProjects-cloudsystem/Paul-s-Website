"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// Animated count-up triggered when the element enters the viewport.
// `raw` renders the number without grouping (e.g. a year like 1993).
export default function StatCounter({
  value,
  suffix = "",
  label,
  raw = false,
}: {
  value: number;
  suffix?: string;
  label: string;
  raw?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const format = (n: number) =>
      raw ? String(Math.round(n)) : Math.round(n).toLocaleString("en-CA");

    if (prefersReduced) {
      setDisplay(format(value));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(el);
          const obj = { n: 0 };
          gsap.to(obj, {
            n: value,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => setDisplay(format(obj.n)),
          });
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, raw]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-bold leading-none text-soft-white sm:text-5xl">
        <span className="gold-text">{display}</span>
        <span className="gold-text">{suffix}</span>
      </div>
      <div className="mt-3 text-xs uppercase tracking-label text-fog sm:text-sm">
        {label}
      </div>
    </div>
  );
}
