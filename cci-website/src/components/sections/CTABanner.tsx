import Link from "next/link";
import { site } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";

export default function CTABanner({
  title = "Ready to Train for the Real World?",
  subtitle = "Book a training assessment and tell us about your dog. We'll help you build control, confidence and a stronger relationship.",
  primary = { label: "Book a Training Assessment", href: "/contact" },
}: {
  title?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
}) {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-cci">
        <Reveal className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-gunmetal to-navy px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute inset-0 bg-radial-fade opacity-70" />
          <div className="relative">
            <h2 className="heading-lg mx-auto max-w-2xl">{title}</h2>
            <p className="body-lg mx-auto mt-5 max-w-xl">{subtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={primary.href} className="btn-gold">
                {primary.label}
              </Link>
              <a href={`tel:${site.phoneHref}`} className="btn-outline">
                Call {site.phone}
              </a>
              <a href={`sms:${site.phoneHref}`} className="btn-outline">
                Text Us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
