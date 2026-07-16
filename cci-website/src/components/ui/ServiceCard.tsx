import Link from "next/link";
import TiltCard from "./TiltCard";
import Icon from "./Icon";
import type { ServiceItem } from "@/lib/services";

export default function ServiceCard({ service }: { service: ServiceItem }) {
  const isInternal = service.slug.startsWith("/");
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    isInternal ? (
      <Link href={service.slug} className="block h-full">
        {children}
      </Link>
    ) : (
      <a href={service.slug} className="block h-full">
        {children}
      </a>
    );

  return (
    <TiltCard className="h-full rounded-2xl">
      <Wrapper>
        <div className="card-surface flex h-full flex-col gap-4 p-6 transition-colors duration-300 group-hover:border-gold/40">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
            <Icon name={service.icon} />
          </span>
          <h3 className="font-display text-xl font-semibold uppercase text-soft-white">
            {service.title}
          </h3>
          <p className="text-sm leading-relaxed text-silver">{service.short}</p>
          <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Learn more
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </Wrapper>
    </TiltCard>
  );
}
