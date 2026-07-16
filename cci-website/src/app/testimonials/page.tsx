import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import CTABanner from "@/components/sections/CTABanner";
import JsonLd from "@/components/util/JsonLd";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = pageMeta({
  title: "Dog Training Success Stories in Ontario",
  description:
    "Real results from Caissie Canine Instruction clients across Durham Region and the GTA — calmer dogs, confident owners and stronger relationships.",
  path: "/testimonials",
  robots: { index: false, follow: true },
});

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Success Stories", path: "/testimonials" },
        ])}
      />
      <section className="pt-32">
        <div className="container-cci">
          <SectionHeader
            as="h1"
            eyebrow="Success Stories"
            title="Real Dogs. Real Owners. Real Results."
            intro="Behind every success story is an owner who learned to lead and a dog that learned to trust. Here are a few of the families and handlers we've worked with."
          />
        </div>
      </section>

      <Section className="pt-12">
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.client} delay={(i % 2) * 80}>
              <article className="card-surface flex h-full flex-col overflow-hidden sm:flex-row">
                <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-44">
                  <Image
                    src={t.image}
                    alt={`${t.client} with ${t.dogs}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 176px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="w-fit rounded-full bg-gold/15 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-gold">
                    {t.trainingType}
                  </span>
                  <h2 className="mt-3 font-display text-xl font-semibold uppercase text-soft-white">
                    {t.client}
                  </h2>
                  <p className="text-xs uppercase tracking-wide text-fog">
                    {t.dogs}
                  </p>
                  <blockquote className="mt-3 border-l-2 border-gold pl-4 text-sm italic text-silver">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <dt className="font-semibold uppercase tracking-wide text-fog">
                        Before
                      </dt>
                      <dd className="mt-1 text-silver">{t.before}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold uppercase tracking-wide text-fog">
                        After
                      </dt>
                      <dd className="mt-1 text-silver">{t.after}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Your Dog's Success Story Starts Here"
        subtitle="Book a training assessment and tell us what you're working on. Let's build the next success story together."
      />
    </>
  );
}
