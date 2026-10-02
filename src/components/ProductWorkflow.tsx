"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Check, FileUp } from "lucide-react";
import { useRef } from "react";
import { WORKFLOW_STEPS } from "@/lib/constants";
import { cn, sectionPad, type SectionProps } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

/* Small, abstract product visuals for each step (pure CSS/SVG). */
function StepVisual({ index }: { index: number }) {
  const common = "relative min-h-28 w-full overflow-hidden rounded-lg border border-line bg-surface p-3";
  switch (index) {
    case 0:
      return (
        <div className={common} aria-hidden>
          <div className="flex h-[88px] items-center justify-center rounded-md border border-dashed border-navy/30 bg-white">
            <div className="flex flex-col items-center gap-1.5 text-navy">
              <FileUp size={18} />
              <span className="font-mono text-[10px] uppercase tracking-wider">Drop receipt or invoice</span>
            </div>
          </div>
        </div>
      );
    case 1:
      return (
        <div className={common} aria-hidden>
          <div className="space-y-1.5">
            {[
              ["Supplier", "TESCO"],
              ["Date", "02 Oct 2026"],
              ["VAT", "£8.50"],
              ["Total", "£51.00"],
            ].map(([k, v], i) => (
              <div key={k} className="flex items-center justify-between rounded-md border border-line-soft bg-white px-2 py-1 text-[11px]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-faint">{k}</span>
                <span className={cn("font-semibold tabular", i === 1 ? "rounded bg-brand-soft px-1 text-brand" : "text-ink")}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 2:
      return (
        <div className={common} aria-hidden>
          <div className="flex flex-wrap gap-1.5">
            {["Office supplies", "Travel", "Software", "Fuel", "Subsistence", "Rent"].map((c, i) => (
              <span key={c} className={cn("rounded-md border px-2 py-0.5 text-[10px] font-semibold", i === 0 ? "border-navy bg-navy text-white" : "border-line bg-white text-muted")}>
                {c}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-success">
            <Check size={11} /> Classified as Office supplies
          </div>
        </div>
      );
    case 3:
      return (
        <div className={common} aria-hidden>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <div className="rounded-md border border-line-soft bg-white p-2 text-[10px]">
              <div className="font-mono uppercase tracking-wider text-faint">Bank</div>
              <div className="font-semibold tabular text-ink">-£51.00</div>
            </div>
            <div className="flex size-6 items-center justify-center rounded-md bg-success text-white">
              <Check size={12} />
            </div>
            <div className="rounded-md border border-line-soft bg-white p-2 text-[10px]">
              <div className="font-mono uppercase tracking-wider text-faint">Receipt</div>
              <div className="font-semibold tabular text-ink">£51.00</div>
            </div>
          </div>
          <div className="mt-3 text-center font-mono text-[10px] uppercase tracking-wider text-success">Reconciled</div>
        </div>
      );
    default:
      return (
        <div className={common} aria-hidden>
          <div className="flex h-[88px] items-end gap-1.5">
            {[40, 60, 45, 75, 55, 90].map((h, i) => (
              <div key={i} className={cn("flex-1 rounded-t-sm", i === 5 ? "bg-brand" : "bg-navy/75")} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      );
  }
}

export function ProductWorkflow({ hideHeading }: SectionProps) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="product" className={cn("scroll-mt-24", sectionPad(hideHeading))} aria-label="How it works">
      <div className="container-x">
        {!hideHeading ? (
          <SectionHeading
            id="workflow-title"
            eyebrow="How it works"
            title="From receipt to records — automatically."
            description="One pipeline takes every document from capture to reporting, with AI handling the manual steps in between."
            size="lg"
          />
        ) : null}

        <div className={cn("relative", !hideHeading && "mt-16 lg:mt-20")}>
          {/* Progress line: across the top on desktop, down the left on mobile */}
          <div className="absolute left-0 top-0 h-full w-px bg-line lg:h-px lg:w-full" aria-hidden>
            <motion.div style={reduce ? undefined : { scaleY: scale, scaleX: scale }} className="h-full w-full origin-top bg-brand lg:origin-left" />
          </div>

          <ol ref={ref} className="grid lg:grid-cols-5">
            {WORKFLOW_STEPS.map((s, i) => (
              <Reveal
                as="li"
                key={s.step}
                delay={i * 0.08}
                className={cn("relative pb-10 pl-6 last:pb-0 lg:pb-0 lg:pl-0 lg:pr-6 lg:pt-8", i > 0 && "lg:border-l lg:border-line lg:pl-6")}
              >
                <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand">Step {s.step}</div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-body">{s.description}</p>
                <div className="mt-6">
                  <StepVisual index={i} />
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
