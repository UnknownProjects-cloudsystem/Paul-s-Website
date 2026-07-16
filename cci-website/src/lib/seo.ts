import type { Metadata } from "next";
import { site, serviceArea } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  robots?: Metadata["robots"];
};

const structuredServiceAreas = () => [
  { "@type": "AdministrativeArea", name: "Ontario" },
  ...serviceArea.cities.map((city) => ({ "@type": "City", name: city })),
  { "@type": "Country", name: "Canada", description: "Virtual training" },
];

export function pageMeta({
  title,
  description,
  path,
  image,
  robots,
}: PageMetaInput): Metadata {
  const url = `${site.url}${path}`;
  const ogImage = image || site.ogImage;
  return {
    title,
    description,
    robots,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_CA",
      images: [
        {
          url: ogImage,
          alt: `${title} — ${site.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}${site.ogImage}`,
    logo: `${site.url}${site.logo}`,
    areaServed: structuredServiceAreas(),
    founder: {
      "@type": "Person",
      name: site.founder,
      jobTitle: site.founderTitle,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: "en-CA",
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.founder,
    jobTitle: site.founderTitle,
    worksFor: { "@id": `${site.url}/#organization` },
    description:
      "Retired police sergeant and former chief canine instructor for the largest municipal K9 agency in Canada, providing private and corporate K9 training across Ontario.",
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
    provider: { "@id": `${site.url}/#organization` },
    areaServed: structuredServiceAreas(),
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
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
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
    dateModified: opts.date,
    author: {
      "@type": "Person",
      name: site.founder,
      url: `${site.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}${site.logo}` },
    },
    mainEntityOfPage: `${site.url}${opts.path}`,
  };
}
