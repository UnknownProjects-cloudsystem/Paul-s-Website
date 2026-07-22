import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import AssessmentForm from "@/components/forms/AssessmentForm";
import JsonLd from "@/components/util/JsonLd";
import Icon from "@/components/ui/Icon";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";
import { site, serviceArea } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact & Training Assessment — Dog Training in Ontario",
  description:
    "Book a dog training assessment with Caissie Canine Instruction. Serving Durham Region, Toronto and the GTA. Call or text 905 427 4142.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="pt-32">
        <div className="container-cci">
          <Reveal className="max-w-3xl">
            <span className="label-eyebrow">
              <span className="h-px w-6 bg-gold" />
              Contact · Training Assessment
            </span>
            <h1 className="heading-xl mt-4">Tell Us About Your Dog</h1>
            <p className="body-lg mt-5">
              The more we know, the better we can help. Complete the assessment
              and Paul will be in touch — or call/text anytime for a faster reply.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-12">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact info */}
          <div className="space-y-5">
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

            <div className="grid grid-cols-2 gap-3">
              <a href={`tel:${site.phoneHref}`} className="btn-gold">
                Call Now
              </a>
              <a href={`sms:${site.phoneHref}`} className="btn-outline">
                Text Us
              </a>
            </div>

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

            <div className="card-surface p-5">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-label text-gold">
                <Icon name="shield" className="h-4 w-4" />
                Service Area
              </span>
              <p className="mt-3 text-sm text-silver">{serviceArea.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {serviceArea.cities.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-white/10 bg-charcoal/50 px-3 py-1 text-xs text-fog"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <Reveal>
            <AssessmentForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
