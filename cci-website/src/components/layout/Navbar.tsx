"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/site";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Portal target only exists on the client.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "border-b border-white/10 bg-charcoal/90 backdrop-blur-md"
          : "bg-gradient-to-b from-black/60 to-transparent"
      )}
    >
      <nav className="container-cci flex h-[76px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label={site.name}>
          <Image
            src={site.logo}
            alt={`${site.name} logo`}
            width={46}
            height={46}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="hidden font-display text-lg font-bold uppercase leading-none tracking-wide text-soft-white sm:block">
            Caissie
            <span className="block text-[0.62rem] font-medium tracking-label text-gold">
              Canine Instruction
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active =
              pathname === item.href ||
              (item.children?.some((c) => c.href === pathname) ?? false);
            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenGroup(item.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-gold"
                      : "text-silver hover:text-soft-white"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 opacity-70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </Link>
                {item.children && openGroup === item.label && (
                  <div className="absolute left-0 top-full w-72 pt-3">
                    <ul className="overflow-hidden rounded-xl border border-white/10 bg-charcoal/95 p-2 shadow-card backdrop-blur-xl">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.06]"
                          >
                            <span className="block text-sm font-medium text-soft-white">
                              {c.label}
                            </span>
                            {c.description && (
                              <span className="block text-xs text-fog">
                                {c.description}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phoneHref}`}
            className="text-sm font-medium text-silver transition-colors hover:text-gold"
          >
            {site.phone}
          </a>
          <Link href="/contact" className="btn-gold !px-5 !py-2.5 text-xs">
            Book Assessment
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-black/40 text-soft-white backdrop-blur-sm lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span
              className={cn(
                "block h-0.5 w-5 bg-current transition-transform",
                menuOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-current transition-opacity",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-current transition-transform",
                menuOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu — portaled to <body> so no ancestor can clip or out-stack it */}
      {mounted && menuOpen && createPortal(
        <div className="fixed left-0 right-0 top-[76px] bottom-0 z-[120] overflow-y-auto bg-charcoal lg:hidden">
          <ul className="container-cci flex flex-col gap-1 py-6">
            {mainNav.map((item) => (
              <li key={item.label} className="border-b border-white/5 py-1">
                <Link
                  href={item.href}
                  className="block py-3 font-display text-xl font-semibold uppercase text-soft-white"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-2 ml-1 space-y-1 border-l border-white/10 pl-4">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="block py-2 text-sm text-silver"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="mt-4 flex flex-col gap-3">
              <a href={`tel:${site.phoneHref}`} className="btn-outline">
                Call {site.phone}
              </a>
              <Link href="/contact" className="btn-gold">
                Book a Training Assessment
              </Link>
            </li>
          </ul>
        </div>,
        document.body
      )}
    </header>
  );
}
