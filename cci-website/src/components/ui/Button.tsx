import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  gold: "btn-gold",
  outline: "btn-outline",
  ghost: "btn-ghost",
};

export default function Button({
  href,
  children,
  variant = "gold",
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(variants[variant], className);
  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
