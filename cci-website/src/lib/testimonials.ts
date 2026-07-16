// Success stories.
// IMPORTANT: The quotes below are placeholders structured from each client's
// name/dogs. Replace `quote`, `before` and `after` with the clients' real
// testimonial text from the existing site before launch. Names and photos are
// taken from the supplied asset folder.

export type Testimonial = {
  client: string;
  dogs: string;
  trainingType: string;
  before: string;
  after: string;
  quote: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    client: "Barb & Kenny Weinberg",
    dogs: "Family dog",
    trainingType: "Private Obedience",
    before: "Struggled with focus and control on walks.",
    after: "A calm, responsive dog that listens at home and out in the world.",
    quote:
      "Paul didn't just train our dog — he taught us how to be better owners. The difference is night and day.",
    image: "/assets/caissie/testimonials/barb-and-kenny-weinberg.avif",
  },
  {
    client: "Bryan",
    dogs: "Max",
    trainingType: "Behaviour Training",
    before: "Pulling, over-excitement and inconsistent recall.",
    after: "Reliable focus and a much stronger relationship between owner and dog.",
    quote:
      "Max is a completely different dog. Paul's experience shows in everything he does.",
    image: "/assets/caissie/testimonials/bryan-and-max.avif",
  },
  {
    client: "Neil Cornwall",
    dogs: "Family dog",
    trainingType: "Private Training",
    before: "Needed structure and dependable obedience.",
    after: "Confident control and clear communication in everyday situations.",
    quote:
      "Professional, patient and genuinely knowledgeable. I'd recommend Paul to anyone.",
    image: "/assets/caissie/testimonials/neil-cornwall.avif",
  },
  {
    client: "Peter & Lynn Renzetti",
    dogs: "Finn, Sammy & Stella",
    trainingType: "Multi-Dog Obedience",
    before: "Managing a busy multi-dog household.",
    after: "A calmer home with three dogs that respond and settle on cue.",
    quote:
      "With three dogs we needed real structure. Paul gave us the tools and the confidence to use them.",
    image: "/assets/caissie/testimonials/peter-and-lynn-renzetti.avif",
  },
  {
    client: "Sandy Gagnon",
    dogs: "Family dog",
    trainingType: "Private Obedience",
    before: "Looking for dependable, real-world control.",
    after: "A well-mannered dog and an owner who knows how to maintain it.",
    quote:
      "The training stuck because Paul made sure I understood the 'why' behind every step.",
    image: "/assets/caissie/testimonials/sandy-gagnon.avif",
  },
  {
    client: "Steve Zinger",
    dogs: "Misa & Vandal",
    trainingType: "Working-Line Obedience",
    before: "High-drive dogs that needed focused control.",
    after: "Sharp, reliable obedience built on a strong foundation.",
    quote:
      "Paul understands working dogs at a level most trainers simply don't. Outstanding results.",
    image: "/assets/caissie/testimonials/steve-zinger.avif",
  },
];
