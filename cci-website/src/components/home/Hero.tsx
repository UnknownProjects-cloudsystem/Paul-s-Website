"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { gsap } from "gsap";
import { site } from "@/lib/site";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

const floatingTags = [
  "Obedience",
  "Behaviour",
  "E-Collar",
  "Corporate K9",
  "Service Dog",
  "Puppy Training",
];

export default function Hero() {
  const root = useRef<HTMLDivElement | null>(null);
  const videoLayer = useRef<HTMLDivElement | null>(null);
  const contentLayer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        gsap.from(".hero-anim", {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.15,
        });
        gsap.from(".hero-tag", {
          y: 14,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.06,
          delay: 0.9,
        });
      }
    }, root);

    // Parallax on scroll (transform only — cheap & smooth)
    let raf = 0;
    const onScroll = () => {
      if (prefersReduced) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (videoLayer.current)
          videoLayer.current.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(1.05)`;
        if (contentLayer.current)
          contentLayer.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal"
    >
      {/* Video background layer */}
      <div ref={videoLayer} className="absolute inset-0 will-change-transform">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/caissie/gallery/24.webp"
        >
          <source src="/assets/caissie/video/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/55 to-charcoal" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-transparent to-transparent" />

      {/* 3D particle depth layer */}
      <div className="absolute inset-0 opacity-70">
        <HeroCanvas />
      </div>

      {/* Content */}
      <div
        ref={contentLayer}
        className="container-cci relative z-10 pb-24 pt-32 will-change-transform"
      >
        <div className="max-w-3xl">
          <div className="hero-anim flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-gold" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-label text-gold">
              {site.name} · {site.tagline}
            </span>
          </div>

          <h1 className="hero-anim heading-xl mt-6">
            Real-World Canine Training{" "}
            <span className="gold-text">Built on Police K9 Experience</span>
          </h1>

          <p className="hero-anim body-lg mt-6 max-w-2xl text-balance">
            Train with retired Sergeant {site.founder}, a former police chief
            canine instructor with decades of real-world K9 experience. From family
            obedience to corporate working-dog consultation, Caissie Canine
            Instruction helps owners, handlers and organizations build control,
            confidence and dependable canine behaviour.
          </p>

          <div className="hero-anim mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-gold">
              Book a Training Assessment
            </Link>
            <Link href="/private-dog-training" className="btn-outline">
              View Private Training
            </Link>
            <Link href="/corporate-k9-services" className="btn-ghost">
              Explore Corporate K9 →
            </Link>
          </div>

          {/* Floating service tags */}
          <div className="mt-12 flex flex-wrap gap-2.5">
            {floatingTags.map((t) => (
              <span
                key={t}
                className="hero-tag glass rounded-full px-3.5 py-1.5 text-xs font-medium text-silver"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="text-[0.6rem] uppercase tracking-label text-fog">
          Scroll
        </span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/25 pt-1.5">
          <span className="h-2 w-1 animate-scroll-cue rounded-full bg-gold" />
        </span>
      </div>
    </section>
  );
}
