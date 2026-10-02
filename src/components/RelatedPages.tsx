import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { NavLink } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";

interface RelatedPagesProps {
  title?: string;
  eyebrow?: string;
  links: NavLink[];
  className?: string;
  columns?: 3 | 4;
}

/** Grid of cards linking to sibling pages. */
export function RelatedPages({ title = "Explore more", eyebrow = "Keep exploring", links, className, columns = 3 }: RelatedPagesProps) {
  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <Stagger as="ul" className={cn("mt-12 grid gap-4 sm:grid-cols-2", columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
          {links.map(({ label, href, description, icon: Icon, external }) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  {Icon ? (
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-navy-soft text-navy transition-colors duration-300 group-hover:bg-brand-soft group-hover:text-brand">
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                  ) : null}
                  <ArrowUpRight size={16} className="mt-1 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" aria-hidden />
                </div>
                <h3 className="mt-4 text-[18px] font-bold tracking-tight text-ink">{label}</h3>
                {description ? <p className="mt-1.5 text-[16px] leading-relaxed text-body">{description}</p> : null}
              </>
            );
            const cls =
              "group block h-full rounded-card border border-line bg-white p-5 transition-all duration-500 hover:border-ink/40";
            return (
              <StaggerItem as="li" key={href}>
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {inner}
                  </a>
                ) : (
                  <Link href={href} className={cls}>
                    {inner}
                  </Link>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
