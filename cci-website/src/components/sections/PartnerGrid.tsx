"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { partners, partnerCategories } from "@/lib/partners";
import { cn } from "@/lib/utils";

export default function PartnerGrid() {
  const [filter, setFilter] = useState<string>("All");

  const shown = useMemo(
    () =>
      filter === "All"
        ? partners
        : partners.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {partnerCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
              filter === c
                ? "border-gold bg-gold text-charcoal"
                : "border-white/15 text-silver hover:border-gold/50 hover:text-soft-white"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target={p.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="card-surface group flex flex-col items-center gap-4 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/40"
          >
            <div className="flex h-20 w-full items-center justify-center rounded-lg bg-white/90 p-3">
              <Image
                src={p.logo}
                alt={`${p.name} logo`}
                width={140}
                height={70}
                className="max-h-14 w-auto object-contain"
              />
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold uppercase text-soft-white">
                {p.name}
              </h3>
              <p className="mt-1 text-[0.7rem] uppercase tracking-wide text-gold">
                {p.category}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-fog">{p.blurb}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
