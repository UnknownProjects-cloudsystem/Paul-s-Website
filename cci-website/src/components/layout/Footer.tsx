import Link from "next/link";
import Image from "next/image";
import { site, footerNav, serviceArea } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink pb-28 pt-16 lg:pb-16">
      <div className="container-cci">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={site.logo}
                alt={`${site.name} logo`}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <span className="font-display text-lg font-bold uppercase leading-none text-soft-white">
                Caissie
                <span className="block text-[0.62rem] font-medium tracking-label text-gold">
                  Canine Instruction
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fog">
              Real-world canine training built on decades of police K9
              experience. Train for the real world.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-label text-gold">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerNav.services.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-silver transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-label text-gold">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerNav.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-silver transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-label text-gold">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="text-silver transition-colors hover:text-gold"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-silver transition-colors hover:text-gold"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-fog">{serviceArea.blurb}</li>
            </ul>
            <Link href="/contact" className="btn-gold mt-5 !px-5 !py-2.5 text-xs">
              Book a Training Assessment
            </Link>
          </div>
        </div>

        <div className="mt-14 hairline" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-fog sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/legacy" className="hover:text-silver">
              K9 Legacy
            </Link>
            <Link href="/testimonials" className="hover:text-silver">
              Success Stories
            </Link>
            <Link href="/contact" className="hover:text-silver">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
