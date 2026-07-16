"use client";

import Link from "next/link";
import { site } from "@/lib/site";

// Sticky bottom action bar on mobile: Call / Text / Inquiry.
export default function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-charcoal/95 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <a
          href={`tel:${site.phoneHref}`}
          className="flex flex-col items-center gap-1 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wide text-silver active:bg-white/5"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
          Call
        </a>
        <a
          href={`sms:${site.phoneHref}`}
          className="flex flex-col items-center gap-1 py-2.5 text-[0.7rem] font-semibold uppercase tracking-wide text-silver active:bg-white/5"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
          </svg>
          Text
        </a>
        <Link
          href="/contact"
          className="flex flex-col items-center gap-1 bg-gold py-2.5 text-[0.7rem] font-bold uppercase tracking-wide text-charcoal active:bg-gold-bright"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6M9 13h6M9 17h4" />
          </svg>
          Inquiry
        </Link>
      </div>
    </div>
  );
}
