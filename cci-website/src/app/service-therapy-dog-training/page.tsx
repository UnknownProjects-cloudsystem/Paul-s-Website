import type { Metadata } from "next";
import ServicePageView from "@/components/templates/ServicePageView";
import { pageMeta } from "@/lib/seo";
import { servicePages } from "@/lib/services";

const page = servicePages["service-therapy-dog-training"];

export const metadata: Metadata = pageMeta({
  title: page.seoTitle,
  description: page.seoDescription,
  path: "/service-therapy-dog-training",
  image: page.hero,
});

export default function ServiceTherapyDogTrainingPage() {
  return (
    <ServicePageView page={page} ctaLabel="Request a Temperament Evaluation" />
  );
}
