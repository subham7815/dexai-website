"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { BarChart3, Database, Eye, FileText, GitMerge, ShieldCheck, Tags, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn, sectionPad, type SectionProps } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

interface Node {
  label: string;
  caption: string;
  icon: LucideIcon;
}

const NODES: Node[] = [
  { label: "Document", caption: "Receipt, invoice or statement arrives", icon: FileText },
  { label: "AI Vision", caption: "Reads the image or PDF", icon: Eye },
  { label: "Data Extraction", caption: "Supplier, date, VAT, totals", icon: Database },
  { label: "Validation", caption: "Checks totals and formats", icon: ShieldCheck },
  { label: "Categorisation", caption: "Assigns the expense category", icon: Tags },
  { label: "Reconciliation", caption: "Pairs with bank transactions", icon: GitMerge },
  { label: "Reporting", caption: "Updates expense and VAT reports", icon: BarChart3 },
];

export function AutomationPipeline({ hideHeading }: SectionProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const [active, setActive] = useState(reduce ? NODES.length - 1 : -1);

  useEffect(() => {
    if (reduce || !inView) return;
    const start = window.setTimeout(() => setActive(0), 0);
    const id = window.setInterval(() => setActive((a) => (a + 1) % (NODES.length + 1)), 1100);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(id);
    };
  }, [inView, reduce]);

  return (
    <section
      id="automation"
      className={cn("relative scroll-mt-24 overflow-hidden bg-navy-ink text-white", sectionPad(hideHeading))}
      aria-label="Automation pipeline"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 grid-bg-dark [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(27,42,107,0.9),transparent)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[520px] translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(199,16,44,0.35),transparent)] blur-3xl" />
      </div>

      <div className="container-x relative">
        {!hideHeading ? (
          <SectionHeading
            id="automation-title"
            tone="dark"
            eyebrow="Automation"
            title="Your financial workflow, on autopilot."
            description="Each document moves through the same reliable pipeline, with every step logged and reviewable."
            size="lg"
          />
        ) : null}

        <Reveal className={cn("mx-auto max-w-md lg:max-w-none", !hideHeading && "mt-16 lg:mt-20")}>
          <ol
            ref={ref}
            className="grid gap-y-6 lg:grid-cols-7 lg:gap-y-0"
            aria-label="Automation pipeline"
          >
            {NODES.map((n, i) => {
              const Icon = n.icon;
              const isActive = active === i;
              const isDone = active > i;
              return (
                <li key={n.label} className="relative flex lg:flex-col lg:items-center">
                  {/* Connector to next node */}
                  {i < NODES.length - 1 ? (
                    <div
                      className="absolute left-[23px] top-12 h-[calc(100%-24px)] w-px bg-white/10 lg:left-1/2 lg:top-6 lg:h-px lg:w-full"
                      aria-hidden
                    >
                      <motion.div
                        initial={false}
                        animate={{ scaleX: isDone ? 1 : 0, scaleY: isDone ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-full w-full origin-top bg-gradient-to-b from-brand-on-dark to-brand shadow-[0_0_12px_rgba(255,138,156,0.7)] lg:origin-left lg:bg-gradient-to-r"
                      />
                    </div>
                  ) : null}

                  <motion.div
                    animate={
                      isActive
                        ? { boxShadow: "0 0 0 8px rgba(199,16,44,0.18), 0 0 36px rgba(255,138,156,0.5)", scale: 1.06 }
                        : { boxShadow: "0 0 0 0px rgba(199,16,44,0)", scale: 1 }
                    }
                    transition={{ duration: 0.45 }}
                    className={cn(
                      "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
                      isActive && "border-brand bg-brand text-white",
                      isDone && "border-brand-on-dark/60 bg-navy text-brand-on-dark",
                      !isActive && !isDone && "border-white/15 bg-white/5 text-on-dark",
                    )}
                  >
                    <Icon size={18} />
                  </motion.div>

                  <div className="ml-4 lg:ml-0 lg:mt-4 lg:px-2 lg:text-center">
                    <div
                      className={cn(
                        "text-[13px] font-bold uppercase tracking-[0.14em] transition-colors duration-300",
                        isActive ? "text-white" : isDone ? "text-brand-on-dark" : "text-on-dark",
                      )}
                    >
                      {n.label}
                    </div>
                    <p className="mt-1 text-[13px] leading-snug text-on-dark/80">{n.caption}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
          {[
            ["Every step logged", "Each action in the pipeline is recorded against the document."],
            ["Human review built in", "Low-confidence results are flagged instead of silently posted."],
            ["Runs in the background", "Forward a document and the rest happens without you."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <div className="font-semibold text-white">{t}</div>
              <p className="mt-1.5 text-[16px] leading-relaxed text-on-dark">{d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
