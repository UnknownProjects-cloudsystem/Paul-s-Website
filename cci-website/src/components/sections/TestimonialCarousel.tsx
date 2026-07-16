"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { testimonials, type Testimonial } from "@/lib/testimonials";

function Card({ t, onOpen }: { t: Testimonial; onOpen: () => void }) {
  return (
    <article className="card-surface flex w-[300px] shrink-0 snap-start flex-col overflow-hidden sm:w-[360px]">
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={t.image}
          alt={`${t.client} with ${t.dogs}`}
          fill
          sizes="360px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-gunmetal/20 to-transparent" />
        <span className="absolute bottom-3 left-4 rounded-full bg-gold/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-charcoal">
          {t.trainingType}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold uppercase text-soft-white">
          {t.client}
        </h3>
        <p className="text-xs uppercase tracking-wide text-gold">{t.dogs}</p>
        <p className="mt-3 line-clamp-3 text-sm italic text-silver">
          &ldquo;{t.quote}&rdquo;
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-auto pt-4 text-left text-xs font-semibold uppercase tracking-wide text-gold hover:text-gold-bright"
        >
          Read the story →
        </button>
      </div>
    </article>
  );
}

export default function TestimonialCarousel() {
  const scroller = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<Testimonial | null>(null);

  const scroll = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={scroller}
        className="flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t) => (
          <Card key={t.client} t={t} onOpen={() => setActive(t)} />
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-soft-white transition-colors hover:border-gold hover:text-gold"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-soft-white transition-colors hover:border-gold hover:text-gold"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="card-surface relative w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-52 w-full">
              <Image
                src={active.image}
                alt={`${active.client} with ${active.dogs}`}
                fill
                sizes="512px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gunmetal to-transparent" />
            </div>
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="p-6">
              <h3 className="font-display text-2xl font-bold uppercase text-soft-white">
                {active.client}
              </h3>
              <p className="text-sm uppercase tracking-wide text-gold">
                {active.dogs} · {active.trainingType}
              </p>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-fog">
                    Before
                  </dt>
                  <dd className="mt-1 text-sm text-silver">{active.before}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-fog">
                    After
                  </dt>
                  <dd className="mt-1 text-sm text-silver">{active.after}</dd>
                </div>
              </dl>
              <blockquote className="mt-5 border-l-2 border-gold pl-4 text-silver">
                &ldquo;{active.quote}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
