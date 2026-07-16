import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import ServiceCard from "@/components/ui/ServiceCard";
import ServicePageView from "@/components/templates/ServicePageView";
import VideoSection from "@/components/sections/VideoSection";
import { pageMeta } from "@/lib/seo";
import { servicePages, privateServices } from "@/lib/services";

const page = servicePages["private-dog-training"];

export const metadata: Metadata = pageMeta({
  title: page.seoTitle,
  description: page.seoDescription,
  path: "/private-dog-training",
  image: page.hero,
});

export default function PrivateDogTrainingPage() {
  return (
    <ServicePageView
      page={page}
      extra={
        <>
          <Section className="bg-ink">
            <SectionHeader
              eyebrow="Programs"
              title="Programs Built Around Your Dog's Needs"
              intro="From puppy foundations to advanced obedience and specialized work — every program is tailored to your dog's temperament, age and your goals."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {privateServices.map((s, i) => (
                <Reveal key={s.title} delay={(i % 3) * 60}>
                  <ServiceCard service={s} />
                </Reveal>
              ))}
            </div>
          </Section>

          <Section>
            <SectionHeader
              eyebrow="Watch"
              title="Private Training in Action"
              intro="Real sessions, real dogs, real-world control."
            />
            <div className="mt-10">
              <VideoSection filter="Private" limit={4} />
            </div>
          </Section>
        </>
      }
    />
  );
}
