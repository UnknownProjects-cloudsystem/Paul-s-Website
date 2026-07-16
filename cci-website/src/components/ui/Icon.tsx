import type { IconKey } from "@/lib/services";

// Minimal, consistent line-icon set. Inherits currentColor.
const paths: Record<IconKey, JSX.Element> = {
  paw: (
    <>
      <circle cx="6" cy="10" r="2" />
      <circle cx="10" cy="6" r="2" />
      <circle cx="14" cy="6" r="2" />
      <circle cx="18" cy="10" r="2" />
      <path d="M12 12c-3 0-5 2.2-5 4.6 0 1.7 1.4 2.4 3 2.4 1 0 1.4-.4 2-.4s1 .4 2 .4c1.6 0 3-.7 3-2.4 0-2.4-2-4.6-5-4.6Z" />
    </>
  ),
  puppy: (
    <>
      <path d="M5 9c0-2 1.5-4 4-4l1 2h4l1-2c2.5 0 4 2 4 4v4a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V9Z" />
      <path d="M9 13h.01M15 13h.01M12 16c-.8 0-1.5.4-1.5 1" />
    </>
  ),
  obedience: (
    <>
      <path d="M12 3v4M12 7c-3 0-6 2-6 6v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-3c0-4-3-6-6-6Z" />
      <path d="M9 13h.01M15 13h.01" />
    </>
  ),
  advanced: (
    <>
      <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  behaviour: (
    <>
      <path d="M12 21s-7-4.3-9.3-9.3C1.3 8.6 3 5 6.4 5c2 0 3.2 1.2 3.6 2 .4-.8 1.6-2 3.6-2 3.4 0 5.1 3.6 3.7 6.7C19 16.7 12 21 12 21Z" />
    </>
  ),
  ecollar: (
    <>
      <path d="M4 12a8 8 0 0 1 16 0" />
      <path d="M8 12a4 4 0 0 1 8 0" />
      <path d="M12 12v6M10 18h4" />
    </>
  ),
  service: (
    <>
      <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" />
      <path d="M12 8v6M9 11h6" />
    </>
  ),
  therapy: (
    <>
      <path d="M12 20s-6-3.7-8-7.5C2.6 9.8 4 7 6.8 7c1.6 0 2.6 1 3.2 1.7.6-.7 1.6-1.7 3.2-1.7C16 7 17.4 9.8 16 12.5 14 16.3 12 20 12 20Z" />
    </>
  ),
  scent: (
    <>
      <circle cx="12" cy="14" r="6" />
      <path d="M12 8V4M9 5l-1-2M15 5l1-2M12 12c-1 0-2 .7-2 2M12 14h.01" />
    </>
  ),
  sar: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.3-4.3" />
    </>
  ),
  protection: (
    <>
      <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" />
      <path d="M12 7l-2.5 4h5L12 17" />
    </>
  ),
  consult: (
    <>
      <path d="M4 5h16v11H8l-4 3V5Z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  detector: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </>
  ),
  patrol: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="10" r="6" />
      <path d="m9 15-1 7 4-2 4 2-1-7" />
      <path d="m12 7 1 2 2 .3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1L9 9.3 11 9l1-2Z" />
    </>
  ),
};

export default function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: IconKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
