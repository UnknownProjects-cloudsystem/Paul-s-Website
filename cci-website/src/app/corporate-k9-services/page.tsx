import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import VideoSection from "@/components/sections/VideoSection";
import FAQAccordion from "@/components/ui/FAQAccordion";
import JsonLd from "@/components/util/JsonLd";
import Icon from "@/components/ui/Icon";
import {
  pageMeta,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import { corporateServices } from "@/lib/services";

export const metadata: Metadata = pageMeta({
  title: "Corporate K9 Services — Consultation, Evaluation & Certification | CCI",
  description:
    "Independent corporate K9 consultation, detector and patrol dog evaluation, and certification support from a retired police canine Chief Instructor serving Ontario.",
  path: "/corporate-k9-services",
  image: "/assets/caissie/gallery/39.webp",
});

const authorityPoints = [
  "Police canine experience since 1993",
  "Handled six police canines over his career",
  "Former police canine Chief Instructor",
  "Oversaw working canines and their handlers",
  "Police dog judging experience",
  "Expert opinion witness experience",
  "Criminal trial testimony experience",
  "Extensive private-client training history",
];

const flow = [
  { step: "01", title: "Assessment", body: "Define operational needs and evaluate dogs, handlers and gaps." },
  { step: "02", title: "Training Plan", body: "A structured plan matched to your mission and standards." },
  { step: "03", title: "Handler Support", body: "Coaching to sharpen control, communication and consistency." },
  { step: "04", title: "Evaluation", body: "Objective testing against real-world performance benchmarks." },
  { step: "05", title: "Certification Support", body: "Preparation and guidance toward recognized certification." },
];

const corporateFaqs = [
  {
    q: "Who do you work with?",
    a: "Private security companies, working-dog handlers, and organizations that depend on detector or patrol canines — anyone who needs credible, independent K9 expertise.",
  },
  {
    q: "Do you provide independent evaluations?",
    a: "Yes. Objective, third-party evaluation of detection and patrol dogs is one of the most valuable services we offer — it protects your investment and your operation.",
  },
  {
    q: "Can you help us build a K9 program from scratch?",
    a: "Absolutely. From selecting the right dogs and handlers to building training and certification pathways, consultation can cover the entire lifecycle of a working-dog program.",
  },
];

export default function CorporateK9Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Corporate K9 Services",
            description:
              "Corporate K9 consultation, assessment, detector and patrol dog evaluation, and certification support.",
            path: "/corporate-k9-services",
          }),
          faqSchema(corporateFaqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Corporate K9 Services", path: "/corporate-k9-services" },
          ]),
        ]}
      />

      {/* Tactical hero */}
      <section className="relative flex min-h-[72svh] items-center overflow-hidden bg-navy pt-24">
        <div className="absolute inset-0 bg-grid-tactical [background-size:48px_48px] opacity-30" />
        <Image
          src="/assets/caissie/gallery/39.webp"
          alt="Working German Shepherd K9 in a training harness"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/50" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 animate-scan bg-gradient-to-b from-gold/15 to-transparent" />
        <div className="container-cci relative z-10">
          <Reveal className="max-w-3xl">
            <span className="label-eyebrow">
              <span className="h-px w-6 bg-gold" />
              Corporate K9 Services
            </span>
            <h1 className="heading-xl mt-4">
              Corporate K9 Services Backed by{" "}
              <span className="gold-text">Real Police Canine Experience</span>
            </h1>
            <p className="body-lg mt-6 max-w-2xl">
              Independent consultation, assessment, evaluation and certification
              support for organizations that depend on working dogs. Led by a
              retired police canine Chief Instructor with authority earned in the
              field — and in the courtroom.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Request a Corporate K9 Consultation</Button>
              <a href="#authority" className="btn-outline">
                The Credentials
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <Section>
        <SectionHeader
          eyebrow="Capabilities"
          title="Working-Canine Services"
          intro="Practical, credible support across the full lifecycle of a working-dog program."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {corporateServices.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 60} className="glass rounded-2xl p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                <Icon name={s.icon} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold uppercase text-soft-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-silver">{s.short}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process flow */}
      <section className="border-y border-white/10 bg-ink py-20 sm:py-28">
        <div className="container-cci">
          <SectionHeader
            eyebrow="The Process"
            title="From Assessment to Certification"
            align="center"
          />
          <div className="mt-14 grid gap-4 md:grid-cols-5">
            {flow.map((f, i) => (
              <Reveal key={f.step} delay={i * 70} className="relative">
                <div className="card-surface h-full p-6">
                  <span className="font-display text-3xl font-bold text-gold/30">
                    {f.step}
                  </span>
                  <h3 className="mt-2 font-display text-base font-semibold uppercase text-soft-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-silver">
                    {f.body}
                  </p>
                </div>
                {i < flow.length - 1 && (
                  <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-gold md:block">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Authority */}
      <Section id="authority">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeader
            eyebrow="Authority"
            title="Credentials That Stand Up — In the Field and in Court"
            intro="When your operation depends on working dogs, experience matters. This is the background behind every CCI corporate engagement."
          />
          <Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {authorityPoints.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-gunmetal/40 p-4 text-sm text-silver"
                >
                  <span className="mt-0.5 text-gold">
                    <Icon name="badge" className="h-5 w-5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Video */}
      <Section className="bg-ink">
        <SectionHeader
          eyebrow="Watch"
          title="Corporate K9 Training Session"
          intro="A look at working-dog training in action."
        />
        <div className="mt-10">
          <VideoSection filter="Corporate" />
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="FAQ" title="Corporate Questions" />
          <Reveal>
            <FAQAccordion faqs={corporateFaqs} />
          </Reveal>
        </div>
      </Section>

      <section className="py-20 sm:py-24">
        <div className="container-cci">
          <Reveal className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-navy to-gunmetal px-6 py-14 text-center sm:px-12">
            <div className="absolute inset-0 bg-grid-tactical [background-size:40px_40px] opacity-20" />
            <div className="relative">
              <h2 className="heading-lg mx-auto max-w-2xl">
                Let&apos;s Talk About Your K9 Program
              </h2>
              <p className="body-lg mx-auto mt-5 max-w-xl">
                Request a corporate K9 consultation and we&apos;ll help you build,
                evaluate or certify a program you can depend on.
              </p>
              <div className="mt-8">
                <Button href="/contact">Request a Corporate K9 Consultation</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
