import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import FAQAccordion from "@/components/ui/FAQAccordion";
import JsonLd from "@/components/util/JsonLd";
import {
  pageMeta,
  articleSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import { blogPosts, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/k9-knowledge-hub/${post.slug}`,
    image: post.image,
  });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.excerpt,
            path: `/k9-knowledge-hub/${post.slug}`,
            image: post.image,
            date: post.date,
          }),
          ...(post.faqs ? [faqSchema(post.faqs)] : []),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "K9 Knowledge Hub", path: "/k9-knowledge-hub" },
            { name: post.title, path: `/k9-knowledge-hub/${post.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <article>
        <section className="relative flex min-h-[52svh] items-end overflow-hidden pt-24">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
          <div className="container-cci relative z-10 pb-12">
            <Link
              href="/k9-knowledge-hub"
              className="text-xs font-semibold uppercase tracking-wide text-gold hover:text-gold-bright"
            >
              ← K9 Knowledge Hub
            </Link>
            <p className="mt-4 text-xs font-semibold uppercase tracking-label text-gold">
              {post.category} · {post.readingTime}
            </p>
            <h1 className="heading-lg mt-2 max-w-3xl">{post.title}</h1>
          </div>
        </section>

        <Section>
          <div className="mx-auto max-w-2xl">
            <p className="body-lg font-medium text-soft-white">{post.excerpt}</p>
            <div className="mt-8 space-y-8">
              {post.body.map((sec, i) => (
                <Reveal key={i}>
                  {sec.heading && (
                    <h2 className="heading-md mb-3">{sec.heading}</h2>
                  )}
                  {sec.paragraphs.map((p, j) => (
                    <p key={j} className="mb-4 leading-relaxed text-silver">
                      {p}
                    </p>
                  ))}
                </Reveal>
              ))}
            </div>

            {/* Related service CTA */}
            {post.relatedService && (
              <div className="mt-12 rounded-2xl border border-gold/20 bg-gunmetal/60 p-6 text-center">
                <p className="text-sm text-silver">
                  Ready to put this into practice with professional help?
                </p>
                <div className="mt-4">
                  <Button href={post.relatedService.href}>
                    Explore {post.relatedService.label}
                  </Button>
                </div>
              </div>
            )}

            {/* FAQ */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="heading-md mb-5">Frequently Asked</h2>
                <FAQAccordion faqs={post.faqs} />
              </div>
            )}
          </div>
        </Section>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <Section className="bg-ink">
          <h2 className="heading-md mb-8">More on {post.category}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/k9-knowledge-hub/${r.slug}`}
                className="card-surface group overflow-hidden transition-all hover:-translate-y-1 hover:border-gold/40"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-semibold uppercase text-soft-white">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-wide text-fog">
                    {r.readingTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
