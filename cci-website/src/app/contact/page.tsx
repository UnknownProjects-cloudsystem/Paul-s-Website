import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import AssessmentForm from "@/components/forms/AssessmentForm";
import JsonLd from "@/components/util/JsonLd";
import Icon from "@/components/ui/Icon";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";
import { site, serviceArea } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Book a Dog Training Assessment in Ajax",
  description:
    "Book a dog training assessment with Caissie Canine Instruction in Ajax, Ontario. Serving Durham Region, Toronto, the GTA and clients across Ontario.",
  path: "/contact",
});

const googleMapsUrl =
  "https://maps.app.goo.gl/9PdQrb4FVvr43odB9";

const googleMapsEmbedUrl =
  "https://www.google.com/maps?q=Caissie%20Canine%20Instruction%2C%2077%20Mullen%20Dr%2C%20Ajax%2C%20ON%20L1T%202B2&output=embed";

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      {/* Hero */}
      <section className="pt-32">
        <div className="container-cci">
          <Reveal className="max-w-3xl">
            <span className="label-eyebrow">
              <span className="h-px w-6 bg-gold" />
              Contact · Training Assessment
            </span>

            <h1 className="heading-xl mt-4">
              Tell Us About Your Dog
            </h1>

            <p className="body-lg mt-5">
              The more we know, the better we can help. Complete the assessment
              and Paul will be in touch — or call/text anytime for a faster
              reply.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact + Assessment */}
      <Section className="pt-12">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact information */}
          <div className="space-y-5">
            {/* Phone */}
            <a
              href={`tel:${site.phoneHref}`}
              className="card-surface flex items-center gap-4 p-5 transition-colors hover:border-gold/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                <Icon name="patrol" />
              </span>

              <span>
                <span className="block text-xs uppercase tracking-wide text-fog">
                  Call
                </span>

                <span className="font-display text-lg font-semibold text-soft-white">
                  {site.phone}
                </span>
              </span>
            </a>

            {/* Call / Text */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${site.phoneHref}`}
                className="btn-gold"
              >
                Call Now
              </a>

              <a
                href={`sms:${site.phoneHref}`}
                className="btn-outline"
              >
                Text Us
              </a>
            </div>

            {/* Email */}
            <a
              href={`mailto:${site.email}`}
              className="card-surface flex items-center gap-4 p-5 transition-colors hover:border-gold/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                <Icon name="consult" />
              </span>

              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-wide text-fog">
                  Email
                </span>

                <span className="block break-all font-medium text-soft-white">
                  {site.email}
                </span>
              </span>
            </a>

            {/* Service Area */}
            <section className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gunmetal/90 to-charcoal shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
              <div className="p-5 sm:p-6">
                <span className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-label text-gold">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-gold/25 bg-gold/10">
                    <Icon
                      name="shield"
                      className="h-4 w-4"
                    />
                  </span>

                  Service Area
                </span>

                <h2 className="mt-4 font-display text-xl font-semibold uppercase leading-tight text-soft-white sm:text-2xl">
                  Training Across Ontario &amp; Canada
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-silver">
                  In-person support throughout Ontario, with professional
                  virtual training available nationwide.
                </p>
              </div>

              {/* Coverage Types */}
              <div className="grid grid-cols-3 border-y border-white/10 bg-black/20">
                {[
                  {
                    label: "In Person",
                    title: "Ontario-Wide",
                    body: "Flexible training locations across the province",
                  },
                  {
                    label: "Core Region",
                    title: "Durham & GTA",
                    body: "Local service throughout surrounding communities",
                  },
                  {
                    label: "Virtual",
                    title: "Canada-Wide",
                    body: "Remote coaching available nationwide",
                  },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className={`min-w-0 px-3 py-4 sm:px-4 ${
                      index > 0
                        ? "border-l border-white/10"
                        : ""
                    }`}
                  >
                    <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-gold">
                      {item.label}
                    </span>

                    <strong className="mt-1.5 block font-display text-xs font-semibold uppercase leading-tight text-soft-white sm:text-sm">
                      {item.title}
                    </strong>

                    <span className="mt-1.5 block text-[0.62rem] leading-relaxed text-fog sm:text-[0.68rem]">
                      {item.body}
                    </span>
                  </div>
                ))}
              </div>

              {/* Communities */}
              <div className="p-5 sm:p-6">
                <h3 className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-fog">
                  Popular In-Person Communities
                </h3>

                <ul className="mt-4 grid grid-cols-3 gap-x-3 gap-y-2.5">
                  {serviceArea.cities.map((city) => (
                    <li
                      key={city}
                      className="flex min-w-0 items-center gap-2 text-[0.68rem] text-silver sm:text-xs"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/80" />

                      <span className="truncate">
                        {city}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-center gap-2 text-[0.68rem] text-fog sm:text-xs">
                    <Icon
                      name="consult"
                      className="h-3.5 w-3.5 shrink-0 text-gold"
                    />

                    Ask about virtual training anywhere in Canada.
                  </span>

                  <Link
                    href="/service-areas"
                    className="shrink-0 text-[0.62rem] font-semibold uppercase tracking-wide text-gold transition-colors hover:text-gold-bright"
                  >
                    Full coverage →
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* Assessment Form */}
          <Reveal>
            <AssessmentForm />
          </Reveal>
        </div>
      </Section>

      {/* ================================================= */}
      {/* AJAX LOCATION + GOOGLE MAP */}
      {/* ================================================= */}

      <Section className="pt-4 pb-20">
        <Reveal>
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gunmetal/90 to-charcoal shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

              {/* Location Information */}
              <div className="p-6 sm:p-8 lg:p-10">

                {/* Eyebrow */}
                <span className="flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-label text-gold">
                  <span className="h-px w-6 bg-gold" />
                  Ajax · Durham Region
                </span>

                {/* Local SEO Heading */}
                <h2 className="mt-4 font-display text-3xl font-semibold uppercase leading-tight text-soft-white sm:text-4xl">
                  Dog Training in Ajax, Ontario
                </h2>

                {/* Description */}
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-silver sm:text-base">
                  Caissie Canine Instruction is based in Ajax, Ontario and
                  provides professional dog training throughout Ajax, Whitby,
                  Pickering, Oshawa, Durham Region and surrounding communities.
                </p>

                {/* Business Details */}
                <div className="mt-8 space-y-5">

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                      <Icon name="patrol" />
                    </span>

                    <div>
                      <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-fog">
                        Ajax Location
                      </span>

                     <p className="mt-1 font-medium leading-relaxed text-soft-white">
                      {site.address.street}
                      <br />
                      {site.address.city}, {site.address.provinceCode} {site.address.postalCode}
                    </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                      <Icon name="consult" />
                    </span>

                    <div>
                      <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-fog">
                        Contact
                      </span>

                      <a
                        href={`tel:${site.phoneHref}`}
                        className="mt-1 inline-block font-medium text-soft-white transition-colors hover:text-gold"
                      >
                        {site.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                  {/* Exact CCI Google Maps Listing */}
                  <a
                  href={site.maps.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  >
                    Get Directions
                  </a>

                  <Link
                    href="/service-areas"
                    className="btn-outline"
                  >
                    View Service Areas
                  </Link>
                </div>

                {/* Supporting Location Copy */}
                <p className="mt-6 max-w-lg text-xs leading-relaxed text-fog">
                  Professional dog training serving Ajax, Whitby, Pickering,
                  Oshawa, Durham Region, Toronto, the GTA and communities
                  throughout Ontario.
                </p>
              </div>

              {/* Google Map */}
              <div className="relative min-h-[380px] border-t border-white/10 bg-black/20 lg:min-h-[520px] lg:border-l lg:border-t-0">
                <iframe
                  title="Caissie Canine Instruction - Dog Training in Ajax Ontario"
                   src={site.maps.embed}
                    width="100%"
                    height="100%"
                    className="absolute inset-0 h-full min-h-[380px] w-full lg:min-h-[520px]"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>
        </Reveal>
      </Section>
    </>
  );
}
