import Image from "next/image";
import { memorials } from "@/lib/memorials";
import Reveal from "@/components/motion/Reveal";

// Respectful, low-motion legacy wall.
export default function LegacyTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-gold/40 via-white/10 to-transparent sm:block" />
      <div className="space-y-10">
        {memorials.map((m, i) => (
          <Reveal key={m.name} delay={i * 60}>
            <div className="relative flex flex-col gap-6 sm:flex-row sm:pl-16">
              <span className="absolute left-2.5 top-6 hidden h-3 w-3 rounded-full bg-gold ring-4 ring-gold/20 sm:block" />
              <div className="relative h-64 w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(5,7,10,0.96)_72%)] shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:h-72 sm:w-64">
                <Image
                  src={m.image}
                  alt={`${m.name}, ${m.role}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 256px"
                  className="object-contain p-1.5"
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
              </div>
              <div className="sm:pt-2">
                <p className="text-xs font-semibold uppercase tracking-label text-gold">
                  {m.role}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase text-soft-white">
                  {m.name}
                </h3>
                <p className="mt-3 max-w-xl leading-relaxed text-silver">
                  {m.tribute}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
