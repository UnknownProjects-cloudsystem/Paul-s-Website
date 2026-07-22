// Service catalogue: card data + full content for dedicated service pages.

export type ServiceItem = {
  title: string;
  slug: string; // anchor or route
  short: string;
  icon: IconKey;
};

export type IconKey =
  | "paw"
  | "puppy"
  | "obedience"
  | "advanced"
  | "behaviour"
  | "ecollar"
  | "service"
  | "therapy"
  | "scent"
  | "sar"
  | "protection"
  | "consult"
  | "detector"
  | "patrol"
  | "shield"
  | "badge";

// The 10 private offerings (used as cards on the Private Training page)
export const privateServices: ServiceItem[] = [
  {
    title: "Puppy Training",
    slug: "/puppy-training",
    short:
      "Early foundations: socialization, focus, house manners and the habits that prevent problems later.",
    icon: "puppy",
  },
  {
    title: "Basic Obedience",
    slug: "/private-dog-training#basic-obedience",
    short:
      "Reliable sit, down, stay, place and loose-leash walking for everyday control.",
    icon: "obedience",
  },
  {
    title: "Advanced Obedience",
    slug: "/private-dog-training#advanced-obedience",
    short:
      "Off-leash reliability, distance commands and control around heavy distractions.",
    icon: "advanced",
  },
  {
    title: "Behaviour Problem Solving",
    slug: "/behaviour-training",
    short:
      "Reactivity, leash aggression, fear, jumping and recall failures resolved with structure.",
    icon: "behaviour",
  },
  {
    title: "E-Collar Training & Awareness",
    slug: "/e-collar-training",
    short:
      "Modern, humane low-level e-collar conditioning for dependable off-leash freedom.",
    icon: "ecollar",
  },
  {
    title: "Service Dog Training",
    slug: "/service-therapy-dog-training#service",
    short:
      "Task-focused training and public-access manners for service dog candidates.",
    icon: "service",
  },
  {
    title: "Therapy Dog Training",
    slug: "/service-therapy-dog-training#therapy",
    short:
      "Calm, confident temperament work for therapy and visitation roles.",
    icon: "therapy",
  },
  {
    title: "Scent / Odour Detection",
    slug: "/private-dog-training#detection",
    short:
      "Channel natural drive into focused nose work and odour-detection foundations.",
    icon: "scent",
  },
  {
    title: "Search & Rescue Introduction",
    slug: "/private-dog-training#sar",
    short:
      "An introduction to tracking and search fundamentals for working-prospect dogs.",
    icon: "sar",
  },
  {
    title: "Personal Protection",
    slug: "/private-dog-training#protection",
    short:
      "Structured personal-protection canine training built on a stable obedience base.",
    icon: "protection",
  },
];

export const corporateServices: ServiceItem[] = [
  {
    title: "Corporate Canine Consultation",
    slug: "#consultation",
    short:
      "Expert guidance on building, improving or auditing a working-dog program.",
    icon: "consult",
  },
  {
    title: "Working-Canine Needs Assessment",
    slug: "#assessment",
    short:
      "Define the right dog, handler and training plan for your operational needs.",
    icon: "shield",
  },
  {
    title: "Detector Dog Evaluation",
    slug: "#detector",
    short:
      "Independent evaluation of detection dogs for reliability and readiness.",
    icon: "detector",
  },
  {
    title: "Patrol Dog Evaluation",
    slug: "#patrol",
    short:
      "Assessment of patrol and protection canines against real-world standards.",
    icon: "patrol",
  },
  {
    title: "Certification Support",
    slug: "#certification",
    short:
      "Preparation and support toward recognized working-canine certification.",
    icon: "badge",
  },
  {
    title: "Handler & K9 Training Support",
    slug: "#handler",
    short:
      "Coaching for handlers and teams to sharpen control, communication and results.",
    icon: "obedience",
  },
];

// ---------------------------------------------------------------------------
// Full content for dedicated service pages
// ---------------------------------------------------------------------------

export type FAQ = { q: string; a: string };

export type ServicePage = {
  slug: string;
  eyebrow: string;
  title: string;
  h1: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  hero: string; // image path
  highlights: { title: string; body: string }[];
  faqs: FAQ[];
};

export const servicePages: Record<string, ServicePage> = {
  "private-dog-training": {
    slug: "private-dog-training",
    eyebrow: "Private Training",
    title: "Private Dog Training",
    h1: "Private Training for Real-World Control",
    intro:
      "Programs built around your dog and your life. We don't just train the dog — we teach you to communicate, guide and maintain real-world behaviour long after the lesson ends.",
    seoTitle:
      "Private Dog Training in Durham Region & the GTA | Caissie Canine Instruction",
    seoDescription:
      "Professional private dog training across Durham Region, Toronto and the GTA. Puppy foundations to advanced obedience and behaviour work from a retired police K9 instructor.",
    hero: "/assets/caissie/gallery/4.webp",
    highlights: [
      {
        title: "Train the Dog. Teach the Owner.",
        body: "Real progress sticks when the owner becomes a confident handler. Every program builds your skills alongside your dog's.",
      },
      {
        title: "Built Around Your Dog's Needs",
        body: "From timid puppies to driven working breeds, programs are tailored to temperament, age and your specific goals.",
      },
      {
        title: "Real-World, Not Just Commands",
        body: "We train for control where it counts — busy streets, the front door, the park — not only in a quiet living room.",
      },
    ],
    faqs: [
      {
        q: "What ages and breeds do you work with?",
        a: "All of them. From eight-week-old puppies to adult dogs of any breed or mix, training is matched to the individual dog's temperament and stage of development.",
      },
      {
        q: "Do you come to my home?",
        a: "Training is delivered across Durham Region, Toronto, the GTA and surrounding communities. We'll confirm the right setting for your program during your assessment.",
      },
      {
        q: "How long until I see results?",
        a: "Most owners see meaningful change quickly because the focus is on building your handling skills. Lasting reliability comes from consistent practice using the structure we set up together.",
      },
      {
        q: "Do you guarantee results?",
        a: "We don't make exaggerated promises. We commit to proven, structured methods and to teaching you how to maintain your dog's behaviour for the long term.",
      },
    ],
  },
  "puppy-training": {
    slug: "puppy-training",
    eyebrow: "Private Training",
    title: "Puppy Training",
    h1: "Puppy Foundations That Prevent Problems",
    intro:
      "The first months shape everything. We build confidence, focus and good habits early — so the behaviours you want become second nature and the problems you fear never take root.",
    seoTitle: "Puppy Training in Durham Region & Ontario | Caissie Canine Instruction",
    seoDescription:
      "Professional puppy training in Durham Region, Toronto and the GTA. Socialization, focus, house manners and confident foundations from a retired police K9 instructor.",
    hero: "/assets/caissie/gallery/16.webp",
    highlights: [
      {
        title: "Confident Socialization",
        body: "Structured, positive exposure to the world so your puppy grows up steady instead of fearful or over-excited.",
      },
      {
        title: "House & Crate Manners",
        body: "Clear routines for house-training, settling and calm behaviour at home from day one.",
      },
      {
        title: "Focus & First Commands",
        body: "Attention, name response and the building blocks of obedience taught the right way, early.",
      },
    ],
    faqs: [
      {
        q: "What's the best age to start?",
        a: "As early as possible. Good habits and confident socialization in the first months are far easier than correcting problems later.",
      },
      {
        q: "My puppy bites and jumps — can you help?",
        a: "Yes. Nipping, jumping and over-arousal are normal puppy behaviours we redirect into calm, appropriate habits through clear structure.",
      },
      {
        q: "Will you teach me too?",
        a: "Absolutely. Puppy training is as much about coaching you as your puppy, so the right habits continue every day at home.",
      },
    ],
  },
  "behaviour-training": {
    slug: "behaviour-training",
    eyebrow: "Private Training",
    title: "Behaviour Training",
    h1: "Behaviour Correction for Real-World Confidence",
    intro:
      "Reactivity, leash aggression, poor recall, fear, jumping and anxiety don't fix themselves. We diagnose the root cause and rebuild behaviour with the structure and consistency dogs depend on.",
    seoTitle:
      "Dog Behaviour Correction in Ontario | Reactive & Aggressive Dogs | CCI",
    seoDescription:
      "Behaviour training for reactive, aggressive, fearful or unruly dogs across Durham Region and the GTA. Root-cause correction from a retired police K9 instructor.",
    hero: "/assets/caissie/gallery/24.webp",
    highlights: [
      {
        title: "Reactivity & Leash Aggression",
        body: "Replace lunging and barking with calm focus on you — even around other dogs and people.",
      },
      {
        title: "Recall & Impulse Control",
        body: "Build a dog that listens the first time and chooses control over chaos.",
      },
      {
        title: "Fear & Anxiety",
        body: "Patient, structured work that rebuilds confidence in nervous or reactive dogs.",
      },
    ],
    faqs: [
      {
        q: "My dog is reactive or aggressive — is there hope?",
        a: "Most reactivity and aggression can be significantly improved with the right structure and consistent handling. We'll assess your dog honestly and build a plan around what's actually driving the behaviour.",
      },
      {
        q: "Do you use punishment-based methods?",
        a: "We use balanced, structured methods focused on clear communication and fair, consistent boundaries — never intimidation. The goal is a confident, well-adjusted dog.",
      },
      {
        q: "Is my dog too old to change?",
        a: "Older dogs absolutely can learn new patterns. Age is rarely the barrier — consistency is what matters most.",
      },
    ],
  },
  "e-collar-training": {
    slug: "e-collar-training",
    eyebrow: "Private Training",
    title: "E-Collar Training",
    h1: "Modern, Humane E-Collar Training",
    intro:
      "A properly conditioned e-collar is a gentle, precise communication tool — not a shortcut or a punishment. Used correctly, it unlocks dependable off-leash freedom and safety.",
    seoTitle:
      "Professional E-Collar Dog Training in Ontario | Caissie Canine Instruction",
    seoDescription:
      "Humane, professional e-collar training in Durham Region and the GTA. Low-level conditioning for reliable off-leash control from a retired police K9 instructor.",
    hero: "/assets/caissie/gallery/29.webp",
    highlights: [
      {
        title: "Low-Level Conditioning",
        body: "Dogs are introduced at the lowest perceptible level — communication, not correction or fear.",
      },
      {
        title: "Reliable Off-Leash Freedom",
        body: "Safe, dependable recall and control at a distance, even with real-world distractions.",
      },
      {
        title: "Owner Education First",
        body: "You'll learn exactly how and when to use the tool so it's always fair, clear and effective.",
      },
    ],
    faqs: [
      {
        q: "Is e-collar training cruel?",
        a: "Not when it's done properly. Modern e-collars use low-level stimulation a dog feels as a tap or vibration. Conditioned correctly, it's a clear, humane communication tool — and owner education is a core part of the process.",
      },
      {
        q: "Will my dog be afraid of the collar?",
        a: "No. Proper conditioning introduces the collar at the lowest perceptible level and pairs it with things the dog already understands, so it builds confidence rather than fear.",
      },
      {
        q: "Is every dog a candidate?",
        a: "Most dogs benefit, but we always assess the individual first and make sure foundational obedience is in place before introducing the tool.",
      },
    ],
  },
  "service-therapy-dog-training": {
    slug: "service-therapy-dog-training",
    eyebrow: "Specialized Training",
    title: "Service & Therapy Dog Training",
    h1: "Service & Therapy Dog Training",
    intro:
      "Dogs that work in public and around vulnerable people need rock-solid temperament, manners and focus. We train candidates for the calm reliability these roles demand.",
    seoTitle:
      "Service Dog & Therapy Dog Training in Ontario | Caissie Canine Instruction",
    seoDescription:
      "Service dog and therapy dog training across Durham Region and the GTA. Task training, public-access manners and temperament work from a retired police K9 instructor.",
    hero: "/assets/caissie/gallery/12.webp",
    highlights: [
      {
        title: "Public-Access Manners",
        body: "Calm, neutral behaviour in stores, clinics, transit and crowds — the foundation of any working role.",
      },
      {
        title: "Task & Focus Training",
        body: "Targeted skills and unwavering focus on the handler, even in busy environments.",
      },
      {
        title: "Temperament First",
        body: "Honest evaluation of whether a dog has the stability these demanding roles require.",
      },
    ],
    faqs: [
      {
        q: "Can my own dog become a service or therapy dog?",
        a: "Sometimes. It depends heavily on temperament. We start with an honest evaluation of whether your dog has the stability and drive these roles require before committing to a program.",
      },
      {
        q: "What's the difference between a service dog and a therapy dog?",
        a: "A service dog performs specific tasks for one handler with a disability and has public-access rights; a therapy dog provides comfort to many people in settings like hospitals and schools. The training focus differs accordingly.",
      },
      {
        q: "Do you certify service dogs?",
        a: "We provide the training foundation and guidance toward recognized standards. We'll explain exactly what's involved during your assessment.",
      },
    ],
  },
};
