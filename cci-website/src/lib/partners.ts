// Partner network. Categories are best-effort from the supplied logos —
// verify names, categories and links with the business owner before launch.

export type Partner = {
  name: string;
  category: string;
  logo: string;
  href: string; // replace "#" with the partner's real URL
  blurb: string;
};

export const partnerCategories = [
  "All",
  "Pet Products",
  "Grooming",
  "Wellness",
  "Security",
  "Boarding & Camp",
  "K9 Training",
  "Photography & Media",
] as const;

export const partners: Partner[] = [
  {
    name: "Nova's Naturals",
    category: "Pet Products",
    logo: "/assets/caissie/partners/novas-naturals.avif",
    href: "#",
    blurb: "Natural treats and products for healthy, happy dogs.",
  },
  {
    name: "Bentley & Co.",
    category: "Pet Products",
    logo: "/assets/caissie/partners/bentley-and-co.avif",
    href: "#",
    blurb: "Quality goods for dogs and the people who love them.",
  },
  {
    name: "Pooch Parlour",
    category: "Grooming",
    logo: "/assets/caissie/partners/pooch-parlour.avif",
    href: "#",
    blurb: "Professional grooming to keep your dog looking and feeling great.",
  },
  {
    name: "Precious Pet's Grooming",
    category: "Grooming",
    logo: "/assets/caissie/partners/precious-pets-grooming.png",
    href: "#",
    blurb: "Caring, detail-focused grooming for every breed.",
  },
  {
    name: "The Dog & Horse Physio",
    category: "Wellness",
    logo: "/assets/caissie/partners/dog-and-horse-physio.png",
    href: "#",
    blurb: "Rehabilitation and physiotherapy for active and recovering animals.",
  },
  {
    name: "CDN Protection",
    category: "Security",
    logo: "/assets/caissie/partners/cdn-protection.avif",
    href: "#",
    blurb: "Professional protection and security services.",
  },
  {
    name: "Frontline",
    category: "Security",
    logo: "/assets/caissie/partners/frontline.avif",
    href: "#",
    blurb: "Security solutions for businesses and organizations.",
  },
  {
    name: "Bravic",
    category: "Security",
    logo: "/assets/caissie/partners/bravic.avif",
    href: "#",
    blurb: "Trusted security and protective services.",
  },
  {
    name: "Dogs at Camp",
    category: "Boarding & Camp",
    logo: "/assets/caissie/partners/dogs-at-camp.avif",
    href: "#",
    blurb: "Safe, active boarding and day camp for your dog.",
  },
  {
    name: "K9 Dynamics",
    category: "K9 Training",
    logo: "/assets/caissie/partners/k9-dynamics.avif",
    href: "#",
    blurb: "Working-dog training and canine performance specialists.",
  },
  {
    name: "K9ine Crest",
    category: "K9 Training",
    logo: "/assets/caissie/partners/k9ine-crest.avif",
    href: "#",
    blurb: "Equipment and support for serious canine handlers.",
  },
  {
    name: "DBPP",
    category: "Photography & Media",
    logo: "/assets/caissie/partners/dbpp.avif",
    href: "#",
    blurb: "Pet photography and media to capture your dog's character.",
  },
];
