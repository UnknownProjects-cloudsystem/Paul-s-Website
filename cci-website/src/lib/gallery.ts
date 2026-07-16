// Training gallery. Files keep their original numeric names from the asset
// folder (already web-safe). 17 & 35 are .jpg, the rest .webp.

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const dimensions: Record<number, readonly [number, number]> = {
  1: [395, 428], 2: [554, 677], 3: [765, 1020], 4: [765, 1020],
  5: [782, 1020], 6: [691, 1020], 8: [765, 1020], 9: [250, 333],
  10: [765, 1020], 11: [539, 469], 12: [292, 596], 13: [765, 1020],
  14: [841, 1020], 15: [784, 1020], 16: [533, 604], 17: [141, 141],
  18: [809, 1020], 19: [441, 622], 21: [765, 1020], 22: [489, 1020],
  23: [599, 799], 24: [873, 1020], 27: [765, 1020], 28: [490, 640],
  29: [497, 546], 30: [765, 1020], 31: [735, 1020], 32: [765, 1020],
  33: [1020, 1020], 34: [381, 640], 35: [141, 235], 36: [1170, 871],
  37: [620, 640], 38: [765, 1020], 39: [765, 1020],
};

const webp = [
  1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 21, 22, 23, 24,
  27, 28, 29, 30, 31, 32, 33, 34, 36, 37, 38, 39,
];
const jpg = [17, 35];

export const galleryImages: GalleryImage[] = [
  ...webp.map((n) => ({
    src: `/assets/caissie/gallery/${n}.webp`,
    alt: `Caissie Canine Instruction dog training session ${n}`,
    width: dimensions[n][0],
    height: dimensions[n][1],
  })),
  ...jpg.map((n) => ({
    src: `/assets/caissie/gallery/${n}.jpg`,
    alt: `Caissie Canine Instruction dog training session ${n}`,
    width: dimensions[n][0],
    height: dimensions[n][1],
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
