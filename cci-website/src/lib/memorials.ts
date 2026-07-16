// K9 Legacy / Memorial Wall. Respectful tributes to Paul's police, detection
// and therapy dogs. Roles are drawn from the supplied imagery; the owner can
// expand each story with personal detail.

export type Memorial = {
  name: string;
  role: string;
  image: string;
  tribute: string;
};

export const memorials: Memorial[] = [
  {
    name: "Iron",
    role: "Police Service Dog",
    image: "/assets/caissie/memorial/iron.webp",
    tribute:
      "A dedicated police service dog and trusted partner whose work and loyalty set the standard for those that followed.",
  },
  {
    name: "Iron II",
    role: "Police Service Dog",
    image: "/assets/caissie/memorial/iron-2.webp",
    tribute:
      "Carrying a proud name, Iron II served with the courage and drive expected of a frontline police canine.",
  },
  {
    name: "Iron III",
    role: "Police Service Dog",
    image: "/assets/caissie/memorial/iron-3.webp",
    tribute:
      "The legacy continued — a committed working partner devoted to duty and to his handler.",
  },
  {
    name: "Bandit",
    role: "Narcotic Detection Dog",
    image: "/assets/caissie/memorial/bandit.webp",
    tribute:
      "A sharp and focused narcotic detection dog whose nose and drive made a real difference in the field.",
  },
  {
    name: "Baylis",
    role: "Police Service Dog",
    image: "/assets/caissie/memorial/baylis.webp",
    tribute:
      "A steady, dependable police service dog remembered for unwavering loyalty and heart.",
  },
  {
    name: "Indiana Joan",
    role: "Narcotic & Firearm Detection Dog",
    image: "/assets/caissie/memorial/indiana-joan.webp",
    tribute:
      "A specialist detection dog trained on narcotics and firearms — precise, driven and deeply trusted.",
  },
  {
    name: "Daisy",
    role: "CCI Therapy K9",
    image: "/assets/caissie/memorial/daisy.webp",
    tribute:
      "A gentle therapy dog who brought comfort and calm to everyone she met. A different kind of service, and an unforgettable one.",
  },
];
