import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { blogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${site.url}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/about`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/private-dog-training`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/corporate-k9-services`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/puppy-training`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/behaviour-training`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/e-collar-training`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/service-therapy-dog-training`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/service-areas`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/testimonials`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/k9-knowledge-hub`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${site.url}/partners`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${site.url}/legacy`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${site.url}/contact`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${site.url}/k9-knowledge-hub/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
