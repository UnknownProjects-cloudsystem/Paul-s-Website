import type { Metadata } from "next";
import ServicePageView from "@/components/templates/ServicePageView";
import { pageMeta } from "@/lib/seo";
import { servicePages } from "@/lib/services";

const page = servicePages["e-collar-training"];

export const metadata: Metadata = pageMeta({
  title: "E-Collar Dog Training Ontario",
  description:
    "Professional e-collar dog training focused on clear communication, reliable recall, off-leash control and responsible owner education.",
  path: "/e-collar-training",
  image: page.hero,
});

export default function ECollarTrainingPage() {
  return (
    <ServicePageView
      page={page}
      ctaLabel="Ask About E-Collar Training"
    />
  );
}
