import type { Metadata } from "next";
import { site, serviceArea } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

const baseUrl = site.url.replace(/\/+$/, "");

const businessId = `${baseUrl}/#business`;
const personId = `${baseUrl}/about#paul-caissie`;

/**
 * Converts relative or absolute paths into a safe absolute URL.
 *
 * Examples:
 * "/about"
 * "about"
 * "https://example.com/about"
 */
function absoluteUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${baseUrl}${value.startsWith("/") ? value : `/${value}`}`;
}

/**
 * Geographic service coverage used throughout structured data.
 */
function areaServedSchema() {
  return [
    {
      "@type": "AdministrativeArea",
      name: "Ontario, Canada",
    },

    ...serviceArea.cities.map((city) => ({
      "@type": "City",
      name: city,
    })),
  ];
}

/**
 * Per-page SEO metadata helper.
 *
 * Handles:
 * - title
 * - meta description
 * - canonical URL
 * - Open Graph
 * - Twitter/X metadata
 */
export function pageMeta({
  title,
  description,
  path,
  image,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image || site.ogImage);

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

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
          alt: `${title} | ${site.name}`,
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

// ---------------------------------------------------------------------------
// JSON-LD structured data
// ---------------------------------------------------------------------------

/**
 * Main Caissie Canine Instruction business entity.
 *
 * Rendered globally from the root layout.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,

    name: site.name,
    description: site.description,

    url: baseUrl,

    telephone: site.phone,
    email: site.email,

    image: absoluteUrl(site.ogImage),
    logo: absoluteUrl(site.logo),

    priceRange: "$$",

    sameAs: site.sameAs,

    areaServed: areaServedSchema(),

    address: {
      "@type": "PostalAddress",
      addressRegion: "ON",
      addressCountry: "CA",
    },

    founder: {
      "@type": "Person",
      "@id": personId,
      name: site.founder,
      jobTitle: site.founderTitle,
      url: `${baseUrl}/about`,
    },
  };
}

/**
 * Paul Caissie structured entity.
 *
 * Uses the same @id referenced by the LocalBusiness founder field.
 */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,

    name: site.founder,
    jobTitle: site.founderTitle,

    description:
      "Retired Sergeant and former police canine Chief Instructor with over 32 years of law-enforcement experience, providing private and corporate K9 training across Ontario.",

    url: `${baseUrl}/about`,

    image: `${baseUrl}/assets/caissie/paul/paul-3.webp`,

    worksFor: {
      "@type": "LocalBusiness",
      "@id": businessId,
      name: site.name,
      url: baseUrl,
    },
  };
}

/**
 * Structured data for individual service pages.
 */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
}) {
  const url = absoluteUrl(opts.path);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,

    name: opts.name,
    description: opts.description,
    serviceType: opts.name,

    url,

    provider: {
      "@type": "LocalBusiness",
      "@id": businessId,
      name: site.name,
      url: baseUrl,
    },

    areaServed: areaServedSchema(),
  };
}

/**
 * FAQ structured data.
 *
 * Questions and answers should match the visible FAQ content
 * on the corresponding page.
 */
export function faqSchema(
  faqs: {
    q: string;
    a: string;
  }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,

      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/**
 * Breadcrumb structured data.
 */
export function breadcrumbSchema(
  items: {
    name: string;
    path: string;
  }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Knowledge Hub article structured data.
 */
export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  image: string;
  date: string;
}) {
  const url = absoluteUrl(opts.path);
  const image = absoluteUrl(opts.image);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,

    headline: opts.title,
    description: opts.description,

    image: [image],

    datePublished: opts.date,

    inLanguage: "en-CA",

    url,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },

    author: {
      "@type": "Person",
      "@id": personId,
      name: site.founder,
      url: `${baseUrl}/about`,
    },

    publisher: {
      "@type": "Organization",
      "@id": businessId,
      name: site.name,
      url: baseUrl,

      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(site.logo),
      },
    },
  };
}
