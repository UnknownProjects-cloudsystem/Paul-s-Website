// Central site configuration: brand, contact, navigation, service area.

export const site = {
  name: "Caissie Canine Instruction",
  shortName: "CCI",
  tagline: "Train for the Real World",
  domain: "caissiecanineinstruction.ca",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://caissiecanineinstruction.ca",
  description:
    "Real-world canine training built on decades of police K9 experience. Led by retired Sergeant Paul Caissie, serving Durham Region, Toronto and the GTA.",
  founder: "Paul Caissie",
  founderTitle: "Retired Sergeant & Former Police Canine Instructor",
  email: "Caissiecanineinstruction@gmail.com",
  phone: "905 427 4142",
  phoneHref: "+19054274142",
  logo: "/assets/caissie/logo/cci-logo.avif",
  ogImage: "/assets/caissie/paul/paul-3.webp",
} as const;

export const serviceArea = {
  region: "Ontario",
  primary: "Durham Region, Toronto & the Greater Toronto Area",
  cities: [
    "Ajax",
    "Oshawa",
    "Whitby",
    "Pickering",
    "Uxbridge",
    "Markham",
    "Mississauga",
    "Toronto",
    "Scarborough",
    "Clarington",
  ],
  blurb:
    "Ontario-wide, including Durham Region, Toronto, the GTA, Markham, Mississauga and surrounding communities.",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Private Training",
    href: "/private-dog-training",
    children: [
      {
        label: "Private Dog Training",
        href: "/private-dog-training",
        description: "Programs for families & individual owners",
      },
      {
        label: "Puppy Training",
        href: "/puppy-training",
        description: "Foundations for a confident puppy",
      },
      {
        label: "Behaviour Training",
        href: "/behaviour-training",
        description: "Reactivity, recall & problem solving",
      },
      {
        label: "E-Collar Training",
        href: "/e-collar-training",
        description: "Modern, humane off-leash control",
      },
      {
        label: "Service & Therapy Dogs",
        href: "/service-therapy-dog-training",
        description: "Task & temperament training",
      },
    ],
  },
  { label: "Corporate K9", href: "/corporate-k9-services" },
  { label: "Partners", href: "/partners" },
  { label: "Knowledge Hub", href: "/k9-knowledge-hub" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  services: [
    { label: "Private Dog Training", href: "/private-dog-training" },
    { label: "Puppy Training", href: "/puppy-training" },
    { label: "Behaviour Training", href: "/behaviour-training" },
    { label: "E-Collar Training", href: "/e-collar-training" },
    { label: "Service & Therapy Dogs", href: "/service-therapy-dog-training" },
    { label: "Corporate K9 Services", href: "/corporate-k9-services" },
  ],
  company: [
    { label: "About Paul Caissie", href: "/about" },
    { label: "Success Stories", href: "/testimonials" },
    { label: "Partner Network", href: "/partners" },
    { label: "K9 Knowledge Hub", href: "/k9-knowledge-hub" },
    { label: "K9 Legacy", href: "/legacy" },
    { label: "Contact", href: "/contact" },
  ],
};

// Authority stats reused across the site
export type Stat = {
  value: number;
  suffix: string;
  label: string;
  raw?: boolean;
};

export const stats: Stat[] = [
  { value: 32, suffix: "+", label: "Years in Law Enforcement" },
  { value: 6, suffix: "", label: "Police Canines Handled" },
  { value: 1993, suffix: "", label: "Police K9 Service Since", raw: true },
  { value: 1000, suffix: "+", label: "Private Clients Trained" },
];
