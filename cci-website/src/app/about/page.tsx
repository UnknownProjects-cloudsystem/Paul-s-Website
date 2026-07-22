import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import StatCounter from "@/components/ui/StatCounter";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/sections/CTABanner";
import JsonLd from "@/components/util/JsonLd";
import Icon from "@/components/ui/Icon";
import { pageMeta, personSchema, breadcrumbSchema } from "@/lib/seo";
import { stats, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About Paul Caissie — Retired Police K9 Instructor in Ontario",
  description:
    "Meet retired Sergeant Paul Caissie: 32+ years in law enforcement and a former police canine Chief Instructor, now training private and corporate clients across Ontario.",
  path: "/about",
  image: "/assets/caissie/paul/paul-3.webp",
});

const credentials = [
  {
    icon: "badge",
    title: "Retired Sergeant",
    body: "Over 32 years of law-enforcement service.",
  },
  {
    icon: "shield",
    title: "Police Canine Background",
    body: "Extensive frontline police K9 experience since 1993.",
  },
  {
    icon: "obedience",
    title: "Former Chief Instructor",
    body: "Oversaw police working canines and their handlers.",
  },
  {
    icon: "patrol",
    title: "Six Police Canines Handled",
    body: "A career working and leading multiple police service dogs.",
  },
  {
    icon: "consult",
    title: "Expert Witness Experience",
    body: "Expert opinion and criminal-trial testimony on canine matters.",
  },
  {
    icon: "advanced",
    title: "Across North America",
    body: "Worked with K9 agencies and trained in Canada and the U.S.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative flex min-h-[70svh] items-center overflow-hidden pt-24">
        <Image
          src="/assets/caissie/paul/paul-1.jpg"
          alt="Paul Caissie training a canine in the field"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/40" />
        <div className="container-cci relative z-10">
          <Reveal className="max-w-3xl">
            <span className="label-eyebrow">
              <span className="h-px w-6 bg-gold" />
              About {site.founder}
            </span>
            <h1 className="heading-xl mt-4">
              Built on Decades of{" "}
              <span className="gold-text">Police K9 Experience</span>
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              Paul Caissie brings decades of real-world law-enforcement and
              canine-training experience to every client. As a retired Sergeant
              and former police chief instructor, Paul has worked with handlers,
              agencies, families and organizations to build dependable K9 control
              through practical, structured, real-world training.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-ink py-14">
        <div className="container-cci grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCounter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              raw={"raw" in s ? Boolean(s.raw) : false}
            />
          ))}
        </div>
      </section>

      {/* Credentials grid */}
      <Section>
        <SectionHeader
          eyebrow="Credentials"
          title="A Career Earned in the Field"
          intro="Authority that comes from real operational experience — not a weekend certificate."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {credentials.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 60} className="card-surface p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                <Icon name={c.icon as never} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold uppercase text-soft-white">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-silver">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Story + certification */}
      <Section className="bg-ink">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="/assets/caissie/certification/certification.jpg"
                alt="Paul Caissie professional canine training certification"
                width={900}
                height={650}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeader
              eyebrow="The Approach"
              title="Train the Dog. Teach the Owner."
              intro="CCI doesn't only train the dog. Paul trains the owner to understand, guide and maintain the dog's behaviour in real-world environments — the difference between a dog that performs in a lesson and one that's reliable for life."
            />
            <ul className="mt-6 space-y-3">
              {[
                "Structured, real-world methods over gimmicks",
                "Honest assessment of every dog and goal",
                "Programs for families, handlers and organizations",
                "Authority trusted in court and in the field",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-silver">
                  <span className="mt-1 text-gold">
                    <Icon name="advanced" className="h-4 w-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Book a Training Assessment</Button>
              <Button href="/corporate-k9-services" variant="outline">
                Corporate K9 Services
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
