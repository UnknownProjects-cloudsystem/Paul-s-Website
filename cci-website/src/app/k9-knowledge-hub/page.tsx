import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import BlogList from "@/components/sections/BlogList";
import CTABanner from "@/components/sections/CTABanner";
import JsonLd from "@/components/util/JsonLd";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Ontario Dog Training & K9 Knowledge Hub",
  description:
    "Practical dog training tips, puppy care, safety advice and working-dog insight from retired police K9 instructor Paul Caissie.",
  path: "/k9-knowledge-hub",
});

export default function KnowledgeHubPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "K9 Knowledge Hub", path: "/k9-knowledge-hub" },
        ])}
      />
      <section className="pt-32">
        <div className="container-cci">
          <SectionHeader
            as="h1"
            eyebrow="K9 Knowledge Hub"
            title="Training Tips & Canine Know-How"
            intro="Practical, no-nonsense advice on training, puppy care, safety and working dogs — straight from decades of real-world experience."
          />
        </div>
      </section>
      <Section className="pt-12">
        <BlogList />
      </Section>
      <CTABanner />
    </>
  );
}
