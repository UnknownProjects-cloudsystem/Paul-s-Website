import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { blogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.9 },
    { path: "/private-dog-training", priority: 0.9 },
    { path: "/corporate-k9-services", priority: 0.9 },
    { path: "/puppy-training", priority: 0.8 },
    { path: "/behaviour-training", priority: 0.8 },
    { path: "/e-collar-training", priority: 0.8 },
    { path: "/service-therapy-dog-training", priority: 0.8 },
    { path: "/partners", priority: 0.6 },
    { path: "/testimonials", priority: 0.7 },
    { path: "/k9-knowledge-hub", priority: 0.7 },
    { path: "/legacy", priority: 0.5 },
    { path: "/contact", priority: 0.9 },
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r.priority,
  }));

  const posts: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${site.url}/k9-knowledge-hub/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...routes, ...posts];
}
