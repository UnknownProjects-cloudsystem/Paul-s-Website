import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import LegacyTimeline from "@/components/sections/LegacyTimeline";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/util/JsonLd";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "K9 Legacy — Remembering Paul Caissie's Service Dogs",
  description:
    "A tribute to the police, detection and therapy dogs who served alongside Paul Caissie — Iron, Bandit, Baylis, Indiana Joan, Daisy and more.",
  path: "/legacy",
});

export default function LegacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "K9 Legacy", path: "/legacy" },
        ])}
      />
      <section className="relative overflow-hidden pt-32">
        <div className="pointer-events-none absolute inset-0 bg-radial-fade opacity-40" />
        <div className="container-cci relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="label-eyebrow justify-center">
              <span className="h-px w-6 bg-gold" />
              K9 Legacy
            </span>
            <h1 className="heading-xl mt-4">The Dogs Behind the Work</h1>
            <p className="body-lg mt-6">
              Every dog Paul has worked with left a mark — on the job, on the
              community, and on him. This wall honours the police, detection and
              therapy dogs whose service and loyalty made a lasting difference.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <LegacyTimeline />
      </Section>

      <section className="pb-24">
        <div className="container-cci">
          <Reveal className="mx-auto max-w-xl text-center text-sm text-fog">
            <p>
              &ldquo;A good dog asks for so little and gives so much. These ones
              gave everything.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
