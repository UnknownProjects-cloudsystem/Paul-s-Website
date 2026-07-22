import type { Metadata } from "next";
import { site, serviceArea } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string; // e.g. "/about"
  image?: string;
};

// Per-page metadata helper: unique title, description, canonical & OG.
export function pageMeta({
  title,
  description,
  path,
  image,
}: PageMetaInput): Metadata {
  const url = `${site.url}${path}`;
  const ogImage = image || site.ogImage;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_CA",
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD structured data
// ---------------------------------------------------------------------------

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}${site.ogImage}`,
    logo: `${site.url}${site.logo}`,
    priceRange: "$$",
    areaServed: serviceArea.cities.map((c) => ({
      "@type": "City",
      name: c,
    })),
    address: {
      "@type": "PostalAddress",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    founder: {
      "@type": "Person",
      name: site.founder,
      jobTitle: site.founderTitle,
    },
    sameAs: [] as string[],
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.founder,
    jobTitle: site.founderTitle,
    worksFor: { "@type": "Organization", name: site.name },
    description:
      "Retired Sergeant and former police chief instructor with over 32 years of law-enforcement experience, providing private and corporate K9 training across Ontario.",
    url: `${site.url}/about`,
    image: `${site.url}/assets/caissie/paul/paul-3.webp`,
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.name,
    provider: { "@type": "LocalBusiness", name: site.name, url: site.url },
    areaServed: serviceArea.cities.join(", "),
    url: `${site.url}${opts.path}`,
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  image: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: `${site.url}${opts.image}`,
    datePublished: opts.date,
    author: { "@type": "Person", name: site.founder },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}${site.logo}` },
    },
    mainEntityOfPage: `${site.url}${opts.path}`,
  };
}
