import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import CTABanner from "@/components/sections/CTABanner";
import JsonLd from "@/components/util/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { serviceArea } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Dog Training Service Areas Across Ontario",
  description:
    "Caissie Canine Instruction serves Durham Region, Toronto, the GTA and communities across Ontario, with Canada-wide virtual dog training available.",
  path: "/service-areas",
});

const coverage = [
  {
    title: "Durham Region",
    body: "Private training support across Ajax, Oshawa, Whitby, Pickering, Uxbridge, Clarington and nearby communities.",
  },
  {
    title: "Toronto & the GTA",
    body: "Serving Toronto, Scarborough, Markham, Mississauga and surrounding Greater Toronto Area communities.",
  },
  {
    title: "Ontario-Wide",
    body: "Training and consultation may be arranged throughout Ontario depending on the dog, service and program requirements.",
  },
  {
    title: "Canada-Wide Virtual",
    body: "Virtual coaching is available across Canada for suitable training goals, owner instruction and follow-up support.",
  },
];

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Service Areas", path: "/service-areas" },
        ])}
      />

      <section className="border-b border-white/10 bg-black pb-20 pt-32">
        <div className="container-cci">
          <SectionHeader
            as="h1"
            eyebrow="Service Areas"
            title="Ontario Dog Training With Canada-Wide Virtual Support"
            intro="CCI provides real-world dog training throughout Ontario, with focused coverage in Durham Region, Toronto and the GTA. Virtual coaching is available across Canada when the training goal is suitable for remote instruction."
          />
        </div>
      </section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {coverage.map((item) => (
            <article key={item.title} className="card-surface p-7">
              <h2 className="font-display text-2xl font-semibold uppercase text-soft-white">
                {item.title}
              </h2>
              <p className="mt-3 leading-relaxed text-silver">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-ink">
        <SectionHeader
          eyebrow="Local Coverage"
          title="Communities We Commonly Serve"
          intro="Your location is only one part of choosing the right program. Complete an assessment and CCI will confirm the most appropriate training format for your dog and goals."
        />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {serviceArea.cities.map((city) => (
            <li
              key={city}
              className="rounded-xl border border-white/10 bg-charcoal/60 px-4 py-3 text-center text-sm text-silver"
            >
              {city}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-fog">
          Don&apos;t see your community listed? Contact CCI to discuss Ontario travel or Canada-wide virtual training.
        </p>
        <Link href="/contact" className="btn-gold mt-8">
          Check Training Availability
        </Link>
      </Section>

      <CTABanner />
    </>
  );
}
