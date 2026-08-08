import type { Metadata } from "next";
import ServicePageView from "@/components/templates/ServicePageView";
import { pageMeta } from "@/lib/seo";
import { servicePages } from "@/lib/services";

const page = servicePages["behaviour-training"];

export const metadata: Metadata = pageMeta({
  title: "Dog Behaviour Training Ontario",
  description:
    "Professional behaviour training for reactive, aggressive, fearful or unruly dogs, focused on control, confidence and reliable real-world behaviour.",
  path: "/behaviour-training",
  image: page.hero,
});

export default function BehaviourTrainingPage() {
  return (
    <ServicePageView
      page={page}
      ctaLabel="Request a Behaviour Assessment"
    />
  );
}
