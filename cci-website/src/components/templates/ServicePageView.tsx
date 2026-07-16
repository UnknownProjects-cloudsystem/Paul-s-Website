import Image from "next/image";
import { type ReactNode } from "react";
import { Section, SectionHeader } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import FAQAccordion from "@/components/ui/FAQAccordion";
import CTABanner from "@/components/sections/CTABanner";
import JsonLd from "@/components/util/JsonLd";
import Icon from "@/components/ui/Icon";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import type { ServicePage } from "@/lib/services";

export default function ServicePageView({
  page,
  ctaLabel = "Request a Private Training Assessment",
  extra,
}: {
  page: ServicePage;
  ctaLabel?: string;
  extra?: ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: page.title,
            description: page.seoDescription,
            path: `/${page.slug}`,
          }),
          faqSchema(page.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: page.title, path: `/${page.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative flex min-h-[64svh] items-end overflow-hidden pt-24">
        <Image
          src={page.hero}
          alt={`${page.title} — Caissie Canine Instruction`}
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.6] saturate-[0.7]"
        />
        {/* Faded black/gray wash for a calm, premium hero */}
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/35 to-charcoal/55" />
        <div className="container-cci relative z-10 pb-16">
          <Reveal>
            <span className="label-eyebrow">
              <span className="h-px w-6 bg-gold" />
              {page.eyebrow}
            </span>
            <h1 className="heading-xl mt-4 max-w-3xl">{page.h1}</h1>
            <p className="body-lg mt-5 max-w-2xl">{page.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">{ctaLabel}</Button>
              <Button href="/about" variant="outline">
                Why Paul Caissie
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {page.highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 70} className="card-surface p-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                <Icon name="paw" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold uppercase text-soft-white">
                {h.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-silver">{h.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {extra}

      {/* FAQ */}
      <Section className="bg-ink">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="FAQ"
            title="Common Questions"
            intro="Answers to what owners ask us most. Have another question? Reach out anytime."
          />
          <Reveal>
            <FAQAccordion faqs={page.faqs} />
          </Reveal>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
