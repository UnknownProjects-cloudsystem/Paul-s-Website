import type { Metadata, Viewport } from "next";
import "./globals.css";

import { site } from "@/lib/site";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileStickyCTA from "@/components/layout/MobileStickyCTA";

import SmoothScroll from "@/components/motion/SmoothScroll";

import Analytics from "@/components/util/Analytics";
import JsonLd from "@/components/util/JsonLd";

import IntroOverlay from "@/components/intro/IntroOverlay";

import { localBusinessSchema } from "@/lib/seo";

// Runs before first paint:
// Hide the intro instantly for return visits / reduced motion
// to prevent a flash. Otherwise, lock scroll while the splash plays.
const introGuard = `
  try {
    var seen =
      sessionStorage.getItem("cci_intro_seen") === "1";

    var reducedMotion =
      matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.documentElement.classList.add(
      seen || reducedMotion ? "intro-done" : "intro-active"
    );
  } catch (e) {}
`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),

  title: {
    default: `${site.name} | Dog Training Ontario`,
    template: `%s | ${site.name}`,
  },

  description:
    "Professional dog training across Ontario backed by decades of real-world police K9 training experience.",

  applicationName: site.name,

  keywords: [
    "dog training Ontario",
    "dog trainer Durham Region",
    "dog trainer Toronto",
    "private dog training GTA",
    "puppy training Durham Region",
    "dog behaviour training Ontario",
    "reactive dog training Ontario",
    "e-collar dog training Ontario",
    "service dog training Ontario",
    "therapy dog training Ontario",
    "corporate K9 services Ontario",
    "corporate K9 consultation",
    "police K9 trainer Ontario",
    "Caissie Canine Instruction",
    "Paul Caissie dog trainer",
  ],

  authors: [
    {
      name: site.founder,
    },
  ],

  creator: site.name,
  publisher: site.name,

  icons: {
    icon: site.logo,
    apple: site.logo,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Dog Training Ontario`,
    description:
      "Professional dog training across Ontario backed by decades of real-world police K9 training experience.",
  },

  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Dog Training Ontario`,
    description:
      "Professional dog training across Ontario backed by decades of real-world police K9 training experience.",
  },

  category: "Dog Training",
};

export const viewport: Viewport = {
  themeColor: "#0E0F12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: introGuard,
          }}
        />

        <noscript>
          <style>{`
            #cci-intro {
              display: none !important;
            }
          `}</style>
        </noscript>
      </head>

      <body>
        <IntroOverlay />

        <SmoothScroll />

        <JsonLd data={localBusinessSchema} />

        <Navbar />

        <main>{children}</main>

        <Footer />

        <MobileStickyCTA />

        <Analytics />
      </body>
    </html>
  );
}
