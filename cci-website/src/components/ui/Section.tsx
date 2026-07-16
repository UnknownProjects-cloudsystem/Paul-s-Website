import { cn } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <div className="container-cci">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="label-eyebrow">
          <span className="h-px w-6 bg-gold" />
          {eyebrow}
        </span>
      )}
      <Heading className="heading-lg mt-4">{title}</Heading>
      {intro && <p className="body-lg mt-5">{intro}</p>}
    </Reveal>
  );
}
