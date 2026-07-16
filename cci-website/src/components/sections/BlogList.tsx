"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts, blogCategories } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { imageBlurDataURL } from "@/lib/images";

export default function BlogList() {
  const [cat, setCat] = useState<string>("All");

  const shown = useMemo(
    () => (cat === "All" ? blogPosts : blogPosts.filter((p) => p.category === cat)),
    [cat]
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {blogCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
              cat === c
                ? "border-gold bg-gold text-charcoal"
                : "border-white/15 text-silver hover:border-gold/50 hover:text-soft-white"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((post) => (
          <Link
            key={post.slug}
            href={`/k9-knowledge-hub/${post.slug}`}
            className="card-surface group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold/40"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={imageBlurDataURL}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-charcoal/80 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-gold">
                {post.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-display text-lg font-semibold uppercase leading-tight text-soft-white">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-silver">
                {post.excerpt}
              </p>
              <span className="mt-auto pt-4 text-xs uppercase tracking-wide text-fog">
                {post.readingTime}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
