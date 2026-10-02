import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Monospace label with a short red rule, used above every heading. */
export function Eyebrow({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={cn(
        "rule-brand inline-flex items-center font-mono text-[12px] font-medium uppercase tracking-[0.18em]",
        tone === "dark" ? "text-brand-on-dark" : "text-brand",
        className,
      )}
    >
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /**
   * split  — title left, description right on large screens (default)
   * left   — stacked, left aligned
   * center — stacked, centred
   */
  align?: "split" | "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  size?: "md" | "lg";
}

export function SectionHeading({ id, eyebrow, title, description, align = "split", tone = "light", className, size = "md" }: SectionHeadingProps) {
  const dark = tone === "dark";
  const titleCls = cn(
    "text-balance font-bold tracking-[-0.025em]",
    size === "lg" ? "text-[2.6rem] leading-[1.02] sm:text-5xl lg:text-[4rem]" : "text-4xl leading-[1.06] sm:text-[2.75rem] lg:text-[3.25rem]",
    dark ? "text-white" : "text-ink",
  );
  const descCls = cn("text-balance text-lg leading-relaxed sm:text-xl", dark ? "text-on-dark" : "text-body");

  if (align === "split") {
    return (
      <Reveal className={cn("grid gap-6 border-t pt-8 lg:grid-cols-12 lg:gap-12", dark ? "border-white/15" : "border-ink/15", className)}>
        <div className="lg:col-span-7">
          {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
          <h2 id={id} className={cn("mt-4", titleCls)}>
            {title}
          </h2>
        </div>
        {description ? (
          <div className="flex items-end lg:col-span-5">
            <p className={descCls}>{description}</p>
          </div>
        ) : null}
      </Reveal>
    );
  }

  return (
    <Reveal className={cn("flex flex-col gap-4", align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-2xl items-start text-left", className)}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2 id={id} className={titleCls}>
        {title}
      </h2>
      {description ? <p className={descCls}>{description}</p> : null}
    </Reveal>
  );
}
