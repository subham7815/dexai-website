import type { ReactNode } from "react";
import type { Step } from "@/lib/content/product";
import { cn, pad2 } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

interface StepsListProps {
  steps: Step[];
  title?: string;
  eyebrow?: string;
  description?: string;
  /** Optional visual rendered beside the steps on large screens. */
  aside?: ReactNode;
  className?: string;
  tone?: "light" | "surface";
}

export function StepsList({ steps, title = "How it works", eyebrow = "Step by step", description, aside, className, tone = "surface" }: StepsListProps) {
  return (
    <section className={cn("py-16 lg:py-24", tone === "surface" && "border-y border-line bg-surface", className)}>
      <div className="container-x">
        <div className={cn("grid gap-12", aside && "lg:grid-cols-12 lg:items-center lg:gap-16")}>
          <div className={cn(aside && "lg:col-span-5")}>
            <SectionHeading align="left" eyebrow={eyebrow} title={title} description={description} />
            <ol className="mt-10 space-y-6">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.06} className="relative flex gap-5">
                  <div className="flex flex-col items-center">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-line bg-white font-mono text-[12px] font-medium text-brand">
                      {pad2(i + 1)}
                    </span>
                    {i < steps.length - 1 ? <span className="mt-2 w-px flex-1 bg-line" aria-hidden /> : null}
                  </div>
                  <div className="pb-2">
                    <h3 className="text-xl font-bold tracking-tight text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-[17px] leading-relaxed text-body">{s.description}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          {aside ? (
            <Reveal delay={0.1} className="lg:col-span-7">
              {aside}
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
