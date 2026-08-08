// Central site configuration:
// brand, contact information, navigation, social profiles and service area.

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://www.caissiecanineinstruction.ca";

export const site = {
  name: "Caissie Canine Instruction",
  shortName: "CCI",

  tagline: "Train for the Real World",

  domain: "caissiecanineinstruction.ca",
  url: siteUrl,

  description:
    "Professional dog training across Ontario built on decades of real-world police K9 experience, led by retired Sergeant Paul Caissie.",

  founder: "Paul Caissie",

  founderTitle:
    "Retired Sergeant & Former Police Canine Chief Instructor",

  email: "Caissiecanineinstruction@gmail.com",

  phone: "905 427 4142",
  phoneHref: "+19054274142",

  logo: "/assets/caissie/logo/cci-logo.avif",

  ogImage: "/assets/caissie/paul/paul-3.webp",

  socials: {
    instagram:
      "https://www.instagram.com/caissiecanineinstruction/",

    facebook:
      "https://www.facebook.com/CaissieCanineInstruction/",
  },

  sameAs: [
    "https://www.instagram.com/caissiecanineinstruction/",
    "https://www.facebook.com/CaissieCanineInstruction/",
  ],
} as const;

export const serviceArea = {
  region: "Ontario",

  country: "Canada",

  primary:
    "Durham Region, Toronto & the Greater Toronto Area",

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
    "Ontario-wide dog training with focused service throughout Durham Region, Toronto, the GTA and surrounding communities, plus Canada-wide virtual coaching.",
} as const;

export type NavItem = {
  label: string;
  href: string;

  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
};

export const mainNav: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "About",
    href: "/about",
  },

  {
    label: "Private Training",
    href: "/private-dog-training",

    children: [
      {
        label: "Private Dog Training",
        href: "/private-dog-training",
        description:
          "Programs for families & individual owners",
      },

      {
        label: "Puppy Training",
        href: "/puppy-training",
        description:
          "Foundations for a confident puppy",
      },

      {
        label: "Behaviour Training",
        href: "/behaviour-training",
        description:
          "Reactivity, recall & problem solving",
      },

      {
        label: "E-Collar Training",
        href: "/e-collar-training",
        description:
          "Modern, responsible off-leash control",
      },

      {
        label: "Service & Therapy Dogs",
        href: "/service-therapy-dog-training",
        description:
          "Task & temperament training",
      },
    ],
  },

  {
    label: "Corporate K9",
    href: "/corporate-k9-services",
  },

  {
    label: "Partners",
    href: "/partners",
  },

  {
    label: "Knowledge Hub",
    href: "/k9-knowledge-hub",
  },

  {
    label: "Contact",
    href: "/contact",
  },
];

export const footerNav = {
  services: [
    {
      label: "Private Dog Training",
      href: "/private-dog-training",
    },

    {
      label: "Puppy Training",
      href: "/puppy-training",
    },

    {
      label: "Behaviour Training",
      href: "/behaviour-training",
    },

    {
      label: "E-Collar Training",
      href: "/e-collar-training",
    },

    {
      label: "Service & Therapy Dogs",
      href: "/service-therapy-dog-training",
    },

    {
      label: "Corporate K9 Services",
      href: "/corporate-k9-services",
    },
  ],

  company: [
    {
      label: "About Paul Caissie",
      href: "/about",
    },

    {
      label: "Service Areas",
      href: "/service-areas",
    },

    {
      label: "Success Stories",
      href: "/testimonials",
    },

    {
      label: "Partner Network",
      href: "/partners",
    },

    {
      label: "K9 Knowledge Hub",
      href: "/k9-knowledge-hub",
    },

    {
      label: "K9 Legacy",
      href: "/legacy",
    },

    {
      label: "Contact",
      href: "/contact",
    },
  ],
};

// ---------------------------------------------------------------------------
// Authority stats reused across the site
// ---------------------------------------------------------------------------

export type Stat = {
  value: number;
  suffix: string;
  label: string;
  raw?: boolean;
};

export const stats: Stat[] = [
  {
    value: 32,
    suffix: "+",
    label: "Years in Law Enforcement",
  },

  {
    value: 6,
    suffix: "",
    label: "Police Canines Handled",
  },

  {
    value: 1993,
    suffix: "",
    label: "Police K9 Service Since",
    raw: true,
  },

  {
    value: 1000,
    suffix: "+",
    label: "Private Clients Trained",
  },
];
