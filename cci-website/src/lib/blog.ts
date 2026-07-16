// K9 Knowledge Hub — SEO content. Six starter articles across core categories.
// Add more posts by extending this array; pages render automatically.

export type BlogSection = { heading?: string; paragraphs: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingTime: string;
  date: string;
  image: string;
  relatedService?: { label: string; href: string };
  body: BlogSection[];
  faqs?: { q: string; a: string }[];
};

export const blogCategories = [
  "All",
  "Dog Training",
  "Puppy Care",
  "Safety Tips",
  "Seasonal Pet Care",
  "Health & Wellness",
  "Working Dogs",
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "stop-leash-pulling",
    title: "How to Stop Leash Pulling for Good",
    category: "Dog Training",
    excerpt:
      "Pulling on the leash is the number-one frustration owners bring to us. Here's the structured approach that actually fixes it.",
    readingTime: "5 min read",
    date: "2025-09-12",
    image: "/assets/caissie/gallery/33.webp",
    relatedService: {
      label: "Private Dog Training",
      href: "/private-dog-training",
    },
    body: [
      {
        paragraphs: [
          "A walk should be the best part of your dog's day — and yours. When your dog drags you down the street, it's stressful, it's unsafe, and it quietly erodes the relationship. The good news: leash pulling is one of the most fixable problems we see.",
        ],
      },
      {
        heading: "Why dogs pull",
        paragraphs: [
          "Dogs pull because it works. Every time the leash goes tight and you take a step forward, you've just rewarded the pulling. Pulling isn't dominance — it's a habit you've accidentally reinforced, often hundreds of times.",
        ],
      },
      {
        heading: "The fix: be more interesting than the environment",
        paragraphs: [
          "Real loose-leash walking starts with your dog choosing to check in with you. We build value for staying near you, then add clear, consistent feedback the moment the leash tightens. Used correctly, tools like a properly fitted training collar make this communication crystal clear.",
          "The key is consistency. A dog that's allowed to pull half the time will keep pulling, because the behaviour still pays off sometimes.",
        ],
      },
      {
        heading: "Where most owners go wrong",
        paragraphs: [
          "They train in the quiet backyard, then expect it to hold on a busy street full of squirrels and other dogs. Real-world control has to be trained in the real world — gradually, around the distractions your dog actually struggles with.",
        ],
      },
    ],
    faqs: [
      {
        q: "What's the best age to start leash training?",
        a: "As early as possible — but it's never too late. Adult dogs learn loose-leash walking well with consistent structure.",
      },
      {
        q: "Do I need special equipment?",
        a: "The right equipment helps, but technique and consistency matter far more. We'll recommend what suits your specific dog.",
      },
    ],
  },
  {
    slug: "puppy-socialization-window",
    title: "The Puppy Socialization Window: Why the First Months Matter Most",
    category: "Puppy Care",
    excerpt:
      "There's a critical window early in your puppy's life that shapes their confidence forever. Here's how to use it well.",
    readingTime: "4 min read",
    date: "2025-08-20",
    image: "/assets/caissie/gallery/24.webp",
    relatedService: { label: "Puppy Training", href: "/puppy-training" },
    body: [
      {
        paragraphs: [
          "Between roughly three and sixteen weeks of age, your puppy's brain is uniquely open to new experiences. What happens during this window has an outsized effect on the confident, well-adjusted adult dog they become.",
        ],
      },
      {
        heading: "Socialization isn't just meeting dogs",
        paragraphs: [
          "Good socialization means calm, positive exposure to a wide range of sights, sounds, surfaces and situations — not overwhelming your puppy with chaos. Quality matters far more than quantity.",
        ],
      },
      {
        heading: "Structure prevents problems",
        paragraphs: [
          "The habits you build now — settling calmly, focusing on you, handling new environments — are the foundation everything else is built on. Skipping this stage is the most common reason behaviour problems show up later.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is it too late if my puppy is already 5 months old?",
        a: "No. The early window is ideal, but confidence-building and training continue to work well past it. Start now.",
      },
    ],
  },
  {
    slug: "winter-paw-care",
    title: "Winter Paw Care: Protecting Your Dog in Ontario Cold",
    category: "Seasonal Pet Care",
    excerpt:
      "Salt, ice and freezing temperatures are hard on paws. A few simple habits keep your dog comfortable all winter.",
    readingTime: "3 min read",
    date: "2025-12-01",
    image: "/assets/caissie/gallery/13.webp",
    body: [
      {
        paragraphs: [
          "Ontario winters are tough on dogs' feet. Road salt, ice balls between the toes and frozen pavement can cause real discomfort and cracked pads.",
        ],
      },
      {
        heading: "Simple protective habits",
        paragraphs: [
          "Wipe paws after every walk to remove salt and de-icer, keep the fur between pads trimmed, and consider a paw balm or booties for very cold days. Watch for limping or licking, which can signal irritation.",
        ],
      },
      {
        heading: "Keep training going",
        paragraphs: [
          "Cold weather is no reason to lose progress. Shorter, focused sessions indoors keep your dog's obedience sharp until spring.",
        ],
      },
    ],
  },
  {
    slug: "is-e-collar-training-humane",
    title: "Is E-Collar Training Humane? A Straight Answer",
    category: "Dog Training",
    excerpt:
      "E-collars are widely misunderstood. Here's what modern, professional e-collar training actually involves.",
    readingTime: "5 min read",
    date: "2025-07-15",
    image: "/assets/caissie/gallery/29.webp",
    relatedService: { label: "E-Collar Training", href: "/e-collar-training" },
    body: [
      {
        paragraphs: [
          "Few tools generate as much debate as the e-collar. Much of the controversy comes from outdated devices and improper use — not from how modern e-collars are used by professionals.",
        ],
      },
      {
        heading: "What modern e-collars actually do",
        paragraphs: [
          "Today's quality e-collars deliver low-level stimulation a dog perceives as a light tap or vibration — far below anything painful. Conditioned correctly, the dog learns it as a clear, neutral communication signal, much like a tap on the shoulder.",
        ],
      },
      {
        heading: "The difference is the conditioning",
        paragraphs: [
          "A responsible program introduces the collar at the lowest level the dog can perceive, pairs it with commands the dog already knows, and never uses it to frighten or punish. Owner education is essential — which is why we teach you exactly how and when to use it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will my dog be scared of the collar?",
        a: "Not when it's conditioned properly. Done right, e-collar training builds confidence and off-leash freedom rather than fear.",
      },
    ],
  },
  {
    slug: "reactive-dog-on-walks",
    title: "What to Do With a Reactive Dog on Walks",
    category: "Dog Training",
    excerpt:
      "Lunging and barking at other dogs is exhausting and embarrassing. Here's how to start turning it around.",
    readingTime: "6 min read",
    date: "2025-06-10",
    image: "/assets/caissie/gallery/5.webp",
    relatedService: { label: "Behaviour Training", href: "/behaviour-training" },
    body: [
      {
        paragraphs: [
          "If your dog barks, lunges or spins at the end of the leash when they see another dog, you have a reactive dog — and you are not alone. Reactivity is one of the most common issues we help owners resolve.",
        ],
      },
      {
        heading: "Reactivity is usually rooted in stress",
        paragraphs: [
          "Most reactive dogs aren't 'aggressive' — they're over-aroused, frustrated or fearful, and they've learned that big displays make the scary thing go away. Punishing the outburst without addressing the underlying state rarely works.",
        ],
      },
      {
        heading: "Build focus before you build distance",
        paragraphs: [
          "The goal is a dog that looks to you for direction instead of fixating on the trigger. That starts with rock-solid engagement at a distance where your dog can still think, then gradually closing the gap as control improves.",
          "This is patient, structured work — and it's exactly the kind of real-world behaviour change a professional can accelerate.",
        ],
      },
    ],
  },
  {
    slug: "what-makes-a-good-working-dog",
    title: "What Makes a Good Working Dog?",
    category: "Working Dogs",
    excerpt:
      "Not every dog is cut out for detection, patrol or protection work. Here's what professionals look for.",
    readingTime: "5 min read",
    date: "2025-05-22",
    image: "/assets/caissie/gallery/2.webp",
    relatedService: {
      label: "Corporate K9 Services",
      href: "/corporate-k9-services",
    },
    body: [
      {
        paragraphs: [
          "Whether for police, security or detection, a true working dog needs a specific blend of traits. Selecting the wrong dog is one of the most expensive mistakes an organization can make.",
        ],
      },
      {
        heading: "Drive, nerve and trainability",
        paragraphs: [
          "Working dogs need strong, appropriate drive to engage with the task, the nerve strength to stay clear-headed under pressure, and the trainability to take direction reliably. A weakness in any one of these can compromise the whole team.",
        ],
      },
      {
        heading: "Selection is half the battle",
        paragraphs: [
          "Honest evaluation before you invest in training saves time, money and risk. An independent assessment from someone with real operational experience is invaluable — which is exactly what corporate K9 consultation provides.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
