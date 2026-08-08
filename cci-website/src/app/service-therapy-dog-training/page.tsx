import type { Metadata } from "next";
import ServicePageView from "@/components/templates/ServicePageView";
import { pageMeta } from "@/lib/seo";
import { servicePages } from "@/lib/services";

const page = servicePages["service-therapy-dog-training"];

export const metadata: Metadata = pageMeta({
  title: "Service & Therapy Dog Training Ontario",
  description:
    "Professional service and therapy dog training focused on temperament, public-access manners, handler focus and dependable real-world behaviour.",
  path: "/service-therapy-dog-training",
  image: page.hero,
});

export default function ServiceTherapyDogTrainingPage() {
  return (
    <ServicePageView
      page={page}
      ctaLabel="Request a Temperament Evaluation"
    />
  );
}
