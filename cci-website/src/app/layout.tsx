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
import { organizationSchema, websiteSchema } from "@/lib/seo";

// Runs before first paint: hide the intro instantly for return visits / reduced
// motion (prevents any flash), otherwise lock scroll while the splash plays.
const introGuard = `try{var s=sessionStorage.getItem('cci_intro_seen')==='1';var r=matchMedia('(prefers-reduced-motion: reduce)').matches;document.documentElement.classList.add((s||r)?'intro-done':'intro-active');}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Real-World K9 Training in Ontario`,
    template: "%s | CCI",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "dog training Ontario",
    "dog trainer Durham Region",
    "dog trainer Toronto",
    "private dog training GTA",
    "puppy training Durham Region",
    "e-collar dog training Ontario",
    "behaviour dog training",
    "corporate K9 consultation",
    "police K9 trainer Ontario",
  ],
  authors: [{ name: site.founder }],
  creator: site.name,
  icons: { icon: site.logo, apple: site.logo },
  robots: { index: true, follow: true },
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_CA",
    type: "website",
    images: [{ url: site.ogImage, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0F12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA">
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGuard }} />
        <noscript>
          <style>{`#cci-intro{display:none!important}`}</style>
        </noscript>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <IntroOverlay />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SmoothScroll />
        <div id="site-shell">
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileStickyCTA />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
