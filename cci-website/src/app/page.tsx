import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import { Section, SectionHeader } from "@/components/ui/Section";
import StatCounter from "@/components/ui/StatCounter";
import ServiceCard from "@/components/ui/ServiceCard";
import Reveal from "@/components/motion/Reveal";
import Gallery from "@/components/sections/Gallery";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import PartnerGrid from "@/components/sections/PartnerGrid";
import CTABanner from "@/components/sections/CTABanner";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { stats } from "@/lib/site";
import { privateServices, corporateServices } from "@/lib/services";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Authority stats */}
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

      {/* About preview */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="perspective">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-radial-fade opacity-70 blur-xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src="/assets/caissie/paul/paul-3.webp"
                  alt="Retired Sergeant Paul Caissie, founder of Caissie Canine Instruction"
                  width={640}
                  height={760}
                  className="h-full w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeader
              eyebrow="About Paul Caissie"
              title="Built on Decades of Police K9 Experience"
              intro="Paul Caissie brings decades of real-world law-enforcement and canine-training experience to every client. As a retired Sergeant and former police chief instructor, Paul has worked with handlers, agencies, families and organizations to build dependable K9 control through practical, structured, real-world training."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Retired Sergeant, 32+ years in law enforcement",
                "Former police canine Chief Instructor",
                "Worked with K9 agencies across North America",
                "Trains both the dog and the owner",
              ].map((c) => (
                <Reveal
                  key={c}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-gunmetal/40 p-4"
                >
                  <span className="mt-0.5 text-gold">
                    <Icon name="badge" className="h-5 w-5" />
                  </span>
                  <span className="text-sm text-silver">{c}</span>
                </Reveal>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/about" variant="outline">
                Read Paul&apos;s Story
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Private services preview */}
      <Section className="bg-ink">
        <SectionHeader
          eyebrow="Private Training"
          title="Private Training for Real-World Control"
          intro="Programs built around your dog and your life — from puppy foundations to advanced obedience, behaviour work and beyond."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {privateServices.slice(0, 6).map((s) => (
            <Reveal key={s.title}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/private-dog-training">View All Private Services</Button>
        </div>
      </Section>

      {/* Corporate preview — tactical */}
      <section className="relative overflow-hidden border-y border-white/10 bg-navy py-24">
        <div className="absolute inset-0 bg-grid-tactical [background-size:48px_48px] opacity-30" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scan bg-gradient-to-b from-gold/10 to-transparent" />
        <div className="container-cci relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Corporate K9 Services"
                title="Corporate K9 Services Backed by Real Police Canine Experience"
                intro="Independent consultation, assessment, evaluation and certification support for organizations that depend on working dogs. Authority earned in the field — not the classroom."
              />
              <div className="mt-8">
                <Button href="/corporate-k9-services">
                  Request a Corporate K9 Consultation
                </Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {corporateServices.slice(0, 4).map((s) => (
                <Reveal
                  key={s.title}
                  className="glass rounded-2xl p-5"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                    <Icon name={s.icon} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold uppercase text-soft-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-silver">
                    {s.short}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Training philosophy */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="label-eyebrow justify-center">
              <span className="h-px w-6 bg-gold" />
              Our Approach
            </span>
            <h2 className="heading-lg mt-4">
              We Train the Dog — <span className="gold-text">and Teach the Owner</span>
            </h2>
            <p className="body-lg mx-auto mt-6">
              Real progress happens when the owner understands how to communicate,
              correct, guide and maintain the dog&apos;s behaviour. CCI&apos;s
              approach helps clients become confident handlers — not just temporary
              observers of training.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: "obedience",
              title: "Train the Dog",
              body: "Structured, proven methods that build reliable obedience and real-world control.",
            },
            {
              icon: "consult",
              title: "Teach the Owner",
              body: "You learn to read, guide and maintain your dog's behaviour long after lessons end.",
            },
            {
              icon: "behaviour",
              title: "Build the Relationship",
              body: "Clear communication creates trust — and a calmer, more confident dog and owner.",
            },
          ].map((p) => (
            <Reveal
              key={p.title}
              className="card-surface p-7 text-center"
            >
              <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
                <Icon name={p.icon as never} className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold uppercase text-soft-white">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-silver">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Gallery preview */}
      <Section className="bg-ink">
        <SectionHeader
          eyebrow="In the Field"
          title="Real Training. Real Results."
          intro="A look at sessions across obedience, behaviour and working-dog training."
        />
        <div className="mt-10">
          <Gallery limit={8} />
        </div>
        <div className="mt-8">
          <Button href="/testimonials" variant="outline">
            See Success Stories
          </Button>
        </div>
      </Section>

      {/* Testimonials preview */}
      <Section>
        <SectionHeader
          eyebrow="Success Stories"
          title="Trusted by Owners & Handlers"
          intro="Families and working-dog owners who built control, confidence and a stronger relationship with their dogs."
        />
        <div className="mt-10">
          <TestimonialCarousel />
        </div>
      </Section>

      {/* Partners preview */}
      <Section className="bg-ink">
        <SectionHeader
          eyebrow="Partner Network"
          title="The CCI Network"
          intro="Trusted businesses we're proud to work alongside — from nutrition and grooming to security and working-dog support."
          align="center"
        />
        <div className="mt-12">
          <PartnerGrid />
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/partners"
            className="text-sm font-semibold uppercase tracking-wide text-gold hover:text-gold-bright"
          >
            Explore the full partner network →
          </Link>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
