import type { Metadata } from "next";
import ServicePageView from "@/components/templates/ServicePageView";
import { pageMeta } from "@/lib/seo";
import { servicePages } from "@/lib/services";

const page = servicePages["puppy-training"];

export const metadata: Metadata = pageMeta({
  title: page.seoTitle,
  description: page.seoDescription,
  path: "/puppy-training",
  image: page.hero,
});

export default function PuppyTrainingPage() {
  return (
    <ServicePageView page={page} ctaLabel="Start Your Puppy's Training" />
  );
}
