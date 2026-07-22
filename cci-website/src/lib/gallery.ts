// Training gallery. Files keep their original numeric names from the asset
// folder (already web-safe). 17 & 35 are .jpg, the rest .webp.

export type GalleryImage = { src: string; alt: string };

const webp = [
  1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 21, 22, 23, 24,
  27, 28, 29, 30, 31, 32, 33, 34, 36, 37, 38, 39,
];
const jpg = [17, 35];

export const galleryImages: GalleryImage[] = [
  ...webp.map((n) => ({
    src: `/assets/caissie/gallery/${n}.webp`,
    alt: `Caissie Canine Instruction dog training session ${n}`,
  })),
  ...jpg.map((n) => ({
    src: `/assets/caissie/gallery/${n}.jpg`,
    alt: `Caissie Canine Instruction dog training session ${n}`,
  })),
].sort((a, b) => {
  const na = parseInt(a.src.match(/(\d+)\./)![1], 10);
  const nb = parseInt(b.src.match(/(\d+)\./)![1], 10);
  return na - nb;
});

// Training demonstration videos (web-optimized)
export type TrainingVideo = {
  title: string;
  src: string;
  poster: string;
  category: "Private" | "Corporate";
};

export const trainingVideos: TrainingVideo[] = [
  {
    title: "Private Training Demonstration",
    src: "/assets/caissie/video/private-training.mp4",
    poster: "/assets/caissie/gallery/6.webp",
    category: "Private",
  },
  {
    title: "Corporate K9 Training Session",
    src: "/assets/caissie/video/corporate-training.mp4",
    poster: "/assets/caissie/gallery/24.webp",
    category: "Corporate",
  },
  {
    title: "Private Session — In the Field",
    src: "/assets/caissie/video/private-session.mp4",
    poster: "/assets/caissie/gallery/12.webp",
    category: "Private",
  },
  {
    title: "Obedience Demonstration",
    src: "/assets/caissie/video/session-1.mp4",
    poster: "/assets/caissie/gallery/16.webp",
    category: "Private",
  },
  {
    title: "Control & Focus Work",
    src: "/assets/caissie/video/session-3.mp4",
    poster: "/assets/caissie/gallery/29.webp",
    category: "Private",
  },
  {
    title: "Real-World Training",
    src: "/assets/caissie/video/session-5.mp4",
    poster: "/assets/caissie/gallery/36.webp",
    category: "Private",
  },
];
