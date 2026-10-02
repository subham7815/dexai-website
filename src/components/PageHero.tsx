import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { Eyebrow } from "./ui/SectionHeading";

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  noActions?: boolean;
  actions?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
}

/** Top-of-page header used by every inner page. */
export function PageHero({ eyebrow, title, description, crumbs, noActions, actions, align = "left", children, className }: PageHeroProps) {
  const center = align === "center" && !children;
  return (
    <section className={cn("relative border-b border-line bg-surface pt-28 pb-14 sm:pt-32 lg:pt-40 lg:pb-20", className)}>
      <div className="pointer-events-none absolute inset-0 grid-bg [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />

      <div className="container-x relative">
        {crumbs && crumbs.length > 0 ? (
          <Reveal>
            <nav aria-label="Breadcrumb" className={cn("mb-8 font-mono text-[12px] uppercase tracking-[0.12em] text-muted", center && "flex justify-center")}>
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Home
                  </Link>
                </li>
                {crumbs.map((c, i) => (
                  <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
                    <ChevronRight size={12} className="text-faint" aria-hidden />
                    {c.href ? (
                      <Link href={c.href} className="hover:text-ink">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-ink" aria-current="page">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        ) : null}

        <div className={cn("grid gap-12", children ? "lg:grid-cols-12 lg:items-center lg:gap-16" : "", center && "text-center")}>
          <Reveal className={cn(children ? "lg:col-span-6" : "max-w-4xl", center && "mx-auto")}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="mt-5 text-balance text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[3.4rem] lg:text-[4.2rem]">
              {title}
            </h1>
            {description ? <p className={cn("mt-6 max-w-2xl text-balance text-xl leading-relaxed text-body", center && "mx-auto")}>{description}</p> : null}
            {!noActions ? (
              <div className={cn("mt-9 flex flex-col gap-3 sm:flex-row", center && "sm:justify-center")}>
                {actions ?? (
                  <>
                    <Button href={LINKS.getStarted} size="lg" icon={<ArrowRight size={16} />}>
                      Get Started
                    </Button>
                    <Button href={LINKS.bookDemo} size="lg" variant="secondary">
                      Book a Demo
                    </Button>
                  </>
                )}
              </div>
            ) : null}
          </Reveal>
          {children ? (
            <Reveal delay={0.1} className="lg:col-span-6">
              {children}
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
