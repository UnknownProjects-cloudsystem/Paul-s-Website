"use client";

import { useEffect, useRef, useState } from "react";
import { trainingVideos, type TrainingVideo } from "@/lib/gallery";

// How many seconds of the clip to loop as the "clickbait" preview.
const PREVIEW_SECONDS = 2.5;

function VideoCard({ video }: { video: TrainingVideo }) {
  const [playing, setPlaying] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);

  // Lazy autoplay: only loop the preview while the card is on screen, and never
  // while the full video is playing. Skips entirely for reduced-motion users.
  useEffect(() => {
    if (playing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const v = previewRef.current;
        if (!v) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            v.muted = true;
            v.play?.().catch(() => {});
          } else {
            v.pause?.();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [playing]);

  return (
    <div
      ref={wrapRef}
      className="card-surface group relative aspect-video overflow-hidden"
    >
      {playing ? (
        <video
          src={video.src}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="h-full w-full bg-black object-contain"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="relative block h-full w-full"
          aria-label={`Play ${video.title}`}
        >
          {/* Looping ~2.5s muted preview — the clickbait */}
          <video
            ref={previewRef}
            src={video.src}
            poster={video.poster}
            muted
            loop
            playsInline
            preload="metadata"
            onTimeUpdate={(e) => {
              const el = e.currentTarget;
              if (el.currentTime > PREVIEW_SECONDS) el.currentTime = 0;
            }}
            className="absolute inset-0 h-full w-full object-cover brightness-[0.55] transition duration-500 group-hover:scale-105 group-hover:brightness-90"
          />

          {/* Faded black/gray veil that lifts on hover */}
          <span className="absolute inset-0 bg-charcoal/40 transition-colors duration-500 group-hover:bg-charcoal/15" />

          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-charcoal shadow-gold transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>

          <span className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="font-display text-sm font-semibold uppercase text-soft-white drop-shadow">
              {video.title}
            </span>
            <span className="rounded-full bg-black/50 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-gold">
              {video.category}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export default function VideoSection({
  filter,
  limit,
}: {
  filter?: "Private" | "Corporate";
  limit?: number;
}) {
  let vids = filter
    ? trainingVideos.filter((v) => v.category === filter)
    : trainingVideos;
  if (limit) vids = vids.slice(0, limit);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {vids.map((v) => (
        <VideoCard key={v.title} video={v} />
      ))}
    </div>
  );
}
