import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import PartnerGrid from "@/components/sections/PartnerGrid";
import CTABanner from "@/components/sections/CTABanner";
import JsonLd from "@/components/util/JsonLd";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "K9 & Pet Partner Network Ontario",
  description:
    "Explore the Caissie Canine Instruction partner network, featuring trusted businesses in pet care, nutrition, grooming, security and working-dog support.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Partners", path: "/partners" },
        ])}
      />

      <section className="pt-32">
        <div className="container-cci">
          <SectionHeader
            eyebrow="Partner Network"
            title="The CCI Partner Network"
            intro="We're proud to work alongside trusted businesses across nutrition, grooming, wellness, security, boarding and working-dog support. Filter by category to explore the network."
          />
        </div>
      </section>

      <Section className="pt-12">
        <PartnerGrid />
      </Section>

      <CTABanner
        title="Want to Join the Network?"
        subtitle="If you run a business that shares our standards for dogs and the people who love them, we'd love to hear from you."
        primary={{
          label: "Get in Touch",
          href: "/contact",
        }}
      />
    </>
  );
}
