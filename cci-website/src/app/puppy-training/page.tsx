import type { Metadata } from "next";
import ServicePageView from "@/components/templates/ServicePageView";
import { pageMeta } from "@/lib/seo";
import { servicePages } from "@/lib/services";

const page = servicePages["puppy-training"];

export const metadata: Metadata = pageMeta({
  title: "Puppy Training Durham Region & Ontario",
  description:
    "Professional puppy training for socialization, obedience, manners and confidence in Durham Region and across Ontario.",
  path: "/puppy-training",
  image: page.hero,
});

export default function PuppyTrainingPage() {
  return (
    <ServicePageView
      page={page}
      ctaLabel="Start Your Puppy's Training"
    />
  );
}
