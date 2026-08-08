// K9 Knowledge Hub — SEO-focused educational content.
// Add more posts by extending this array; article pages and sitemap entries
// are generated automatically from this data.

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingTime: string;
  date: string;
  image: string;
  relatedService?: {
    label: string;
    href: string;
  };
  body: BlogSection[];
  faqs?: {
    q: string;
    a: string;
  }[];
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
      "Learn why dogs pull on leash and how structured, consistent training can build calmer walks, better engagement and reliable leash manners.",

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
          "A walk should be the best part of your dog's day — and yours. When your dog drags you down the street, it's stressful, it's unsafe, and it quietly erodes the relationship. The good news: leash pulling is one of the most common training problems and can improve substantially with clear, consistent handling.",
        ],
      },

      {
        heading: "Why dogs pull",

        paragraphs: [
          "Dogs pull because it works. Every time the leash goes tight and forward movement continues, the dog can learn that pulling gets them where they want to go. Pulling isn't automatically a sign of dominance — in many cases, it's simply a habit that has been reinforced over time.",
        ],
      },

      {
        heading: "The fix: build engagement with the handler",

        paragraphs: [
          "Reliable loose-leash walking starts with your dog learning that staying engaged with you is valuable. From there, clear and consistent feedback helps the dog understand what happens when the leash becomes tight and what behaviour keeps the walk moving smoothly.",
          "Consistency matters. If pulling succeeds sometimes but not others, the behaviour can be much harder to change.",
        ],
      },

      {
        heading: "Where many owners go wrong",

        paragraphs: [
          "Training only in a quiet backyard and then expecting the same behaviour on a busy street is a major jump in difficulty. Real-world control needs to be developed gradually around the distractions your dog actually encounters.",
        ],
      },
    ],

    faqs: [
      {
        q: "What's the best age to start leash training?",
        a: "As early as possible — but it's never too late. Adult dogs can also learn reliable loose-leash walking through consistent training and clear structure.",
      },

      {
        q: "Do I need special equipment?",
        a: "Appropriate equipment can help, but technique, timing and consistency matter greatly. The right setup depends on the individual dog and training goal.",
      },
    ],
  },

  {
    slug: "puppy-socialization-window",

    title: "Puppy Socialization: Why the First Months Matter",

    category: "Puppy Care",

    excerpt:
      "Learn why early puppy socialization matters and how thoughtful exposure to people, environments, sounds and experiences can build lasting confidence.",

    readingTime: "4 min read",

    date: "2025-08-20",

    image: "/assets/caissie/gallery/24.webp",

    relatedService: {
      label: "Puppy Training",
      href: "/puppy-training",
    },

    body: [
      {
        paragraphs: [
          "During the early months of a puppy's development, the brain is especially receptive to new experiences. What happens during this period can strongly influence the confidence and adaptability the dog carries into adulthood.",
        ],
      },

      {
        heading: "Socialization isn't just meeting dogs",

        paragraphs: [
          "Good socialization means calm, appropriate exposure to a wide range of people, sights, sounds, surfaces and environments — not overwhelming a puppy with constant stimulation. The quality of each experience matters more than simply trying to expose the puppy to as many things as possible.",
        ],
      },

      {
        heading: "Structure helps prevent problems",

        paragraphs: [
          "The habits developed early — settling calmly, paying attention to the handler and navigating unfamiliar environments — create a foundation for later obedience and behaviour work.",
        ],
      },
    ],

    faqs: [
      {
        q: "Is it too late if my puppy is already 5 months old?",
        a: "No. Early development is important, but confidence-building, socialization and training continue well beyond the first few months. Starting now is still worthwhile.",
      },
    ],
  },

  {
    slug: "winter-paw-care",

    title: "Winter Paw Care for Dogs in Ontario",

    category: "Seasonal Pet Care",

    excerpt:
      "Protect your dog's paws from Ontario winter conditions with practical tips for road salt, ice, cold surfaces and post-walk paw care.",

    readingTime: "3 min read",

    date: "2025-12-01",

    image: "/assets/caissie/gallery/13.webp",

    body: [
      {
        paragraphs: [
          "Ontario winters can be hard on dogs' feet. Road salt, ice buildup and prolonged contact with very cold surfaces may cause irritation and discomfort.",
        ],
      },

      {
        heading: "Simple protective habits",

        paragraphs: [
          "Wipe and inspect your dog's paws after winter walks, remove accumulated ice and de-icing residue, and keep excess fur between the paw pads maintained. Depending on the dog and conditions, protective paw products or properly fitted boots may also help.",
          "Watch for repeated paw lifting, licking, redness or discomfort after walks and adjust the duration or conditions of outdoor activity when necessary.",
        ],
      },

      {
        heading: "Keep training going",

        paragraphs: [
          "Cold weather doesn't have to stop training progress. Short indoor sessions can reinforce obedience, engagement and impulse control until outdoor conditions improve.",
        ],
      },
    ],
  },

  {
    slug: "is-e-collar-training-humane",

    title: "Is E-Collar Training Humane? A Straight Answer",

    category: "Dog Training",

    excerpt:
      "Understand how modern e-collar training is approached, why conditioning and handler education matter, and what responsible use should involve.",

    readingTime: "5 min read",

    date: "2025-07-15",

    image: "/assets/caissie/gallery/29.webp",

    relatedService: {
      label: "E-Collar Training",
      href: "/e-collar-training",
    },

    body: [
      {
        paragraphs: [
          "Few dog-training tools generate as much debate as the e-collar. Opinions vary widely, and outcomes depend heavily on the equipment, the individual dog, the trainer's method and how the tool is introduced and used.",
        ],
      },

      {
        heading: "What modern e-collars do",

        paragraphs: [
          "Modern electronic training collars provide adjustable stimulation intended to create a clear remote cue. The dog's response can vary depending on the device, fit, setting, environment and individual sensitivity, which is why careful introduction and observation are important.",
        ],
      },

      {
        heading: "Conditioning and handler education matter",

        paragraphs: [
          "Responsible training should begin conservatively, connect the collar to behaviours the dog already understands, and avoid using the tool in a way that creates fear or distress. Handler education is essential because timing, consistency and understanding the dog's response all affect the outcome.",
        ],
      },
    ],

    faqs: [
      {
        q: "Will my dog be scared of the collar?",
        a: "The goal of responsible conditioning is not to create fear. The dog's behaviour and comfort should be monitored throughout training, and the approach should be adjusted if the dog shows signs of distress.",
      },
    ],
  },

  {
    slug: "reactive-dog-on-walks",

    title: "Reactive Dog on Walks: What to Do",

    category: "Dog Training",

    excerpt:
      "Learn how engagement, distance, structured handling and gradual exposure can help improve barking, lunging and over-arousal during walks.",

    readingTime: "6 min read",

    date: "2025-06-10",

    image: "/assets/caissie/gallery/5.webp",

    relatedService: {
      label: "Behaviour Training",
      href: "/behaviour-training",
    },

    body: [
      {
        paragraphs: [
          "If your dog regularly barks, lunges or becomes difficult to control when another dog appears during a walk, you're dealing with reactive behaviour. Reactivity is one of the most common challenges owners seek professional help for.",
        ],
      },

      {
        heading: "Reactivity can have different causes",

        paragraphs: [
          "Reactive behaviour may involve fear, frustration, over-arousal, learned responses or a combination of factors. Understanding what is driving the behaviour is important because simply reacting to the outburst without addressing the underlying pattern may not create lasting improvement.",
        ],
      },

      {
        heading: "Build focus before reducing distance",

        paragraphs: [
          "The goal is to develop a dog that can remain responsive to the handler instead of becoming completely fixated on a trigger. Training often begins at a distance where the dog can still think and respond, with difficulty increased gradually as control improves.",
          "Behaviour change takes repetition and consistency. Structured professional guidance can help owners determine appropriate distances, timing and progression for the individual dog.",
        ],
      },
    ],
  },

  {
    slug: "what-makes-a-good-working-dog",

    title: "What Makes a Good Working Dog?",

    category: "Working Dogs",

    excerpt:
      "Learn what professionals evaluate when selecting dogs for detection, patrol and other working roles, including drive, stability and trainability.",

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
          "Whether the role involves police, security or detection work, a working dog needs an appropriate combination of temperament, drive, physical capability and trainability. Selecting a poor match can create substantial training and operational challenges later.",
        ],
      },

      {
        heading: "Drive, nerve and trainability",

        paragraphs: [
          "Working dogs need appropriate motivation to engage with the task, enough environmental stability to remain functional under pressure, and the trainability to take direction consistently. Weakness in one area can significantly affect overall suitability for a particular role.",
        ],
      },

      {
        heading: "Selection is a critical first step",

        paragraphs: [
          "Careful evaluation before investing heavily in training can reduce wasted time, cost and operational risk. Independent assessment from someone with practical working-dog experience can provide another perspective when selecting or evaluating a canine team.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
