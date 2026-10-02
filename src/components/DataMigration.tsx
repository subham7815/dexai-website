"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Copy, Database, GitBranch, ListChecks, Loader2, ShieldCheck, Upload, History } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LINKS } from "@/lib/constants";
import { cn, pad2, sectionPad, type SectionProps } from "@/lib/utils";
import { Button } from "./ui/Button";
import { DemoTag } from "./ui/Badge";
import { BrowserFrame } from "./ui/BrowserFrame";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const STAGES = [
  { key: "ingest", label: "Data ingestion", description: "Exports, spreadsheets and documents are loaded from your current system.", icon: Upload },
  { key: "map", label: "Data mapping", description: "Fields and categories are mapped to DexAI's structure and your chart of accounts.", icon: GitBranch },
  { key: "transform", label: "Transformation", description: "Dates, currencies and references are normalised into one consistent format.", icon: Database },
  { key: "validate", label: "Validation", description: "Totals and VAT are checked and inconsistent records are flagged.", icon: ShieldCheck },
  { key: "dupes", label: "Duplicate detection", description: "Repeated receipts and invoices are identified before they reach your books.", icon: Copy },
  { key: "history", label: "Historical migration", description: "Prior periods are brought across with their original documents attached.", icon: History },
  { key: "progress", label: "Migration progress", description: "Each batch reports what has moved, what is pending and what needs attention.", icon: Loader2 },
  { key: "verify", label: "Final verification", description: "Record counts and totals are reconciled against the source before sign-off.", icon: ListChecks },
] as const;

/** Sample migration dashboard; figures are illustrative only. */
function MigrationDashboard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [step, setStep] = useState(reduce ? STAGES.length : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setStep((s) => (s >= STAGES.length ? s : s + 1)), 700);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const pct = Math.round((Math.min(step, STAGES.length) / STAGES.length) * 100);

  return (
    <div ref={ref}>
      <BrowserFrame url="app.dexai.app/migration" bodyClassName="bg-surface p-4 sm:p-5" aside={<DemoTag />}>
        <div className="grid grid-cols-3 gap-3">
          {[
            ["Overall", `${pct}%`],
            ["Batches", `${Math.min(step, STAGES.length)} / ${STAGES.length}`],
            ["Flagged", step >= 4 ? "3 to review" : "—"],
          ].map(([k, v], i) => (
            <div key={k} className={cn("rounded-lg border p-3", i === 0 ? "border-navy bg-navy text-white" : "border-line bg-white")}>
              <div className={cn("font-mono text-[10px] uppercase tracking-[0.14em]", i === 0 ? "text-white/70" : "text-faint")}>{k}</div>
              <div className={cn("mt-1 text-xl font-bold tabular", i === 0 ? "text-white" : "text-ink")}>{v}</div>
            </div>
          ))}
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden>
          <motion.div className="h-full bg-brand" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
        </div>

        <ol className="mt-3 divide-y divide-line rounded-lg border border-line bg-white">
          {STAGES.map((s, i) => {
            const Icon = s.icon;
            const state = i < step ? "done" : i === step ? "active" : "queued";
            return (
              <li key={s.key} className="flex items-center gap-3 px-3 py-2.5 text-[13px]">
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-md border",
                    state === "done" && "border-success bg-success text-white",
                    state === "active" && "border-brand bg-brand text-white",
                    state === "queued" && "border-line bg-surface text-faint",
                  )}
                >
                  {state === "done" ? <Check size={13} /> : <Icon size={13} className={state === "active" && s.key === "progress" ? "animate-spin" : ""} />}
                </span>
                <span className="w-6 font-mono text-[10px] text-faint">{pad2(i + 1)}</span>
                <span className={cn("flex-1 font-medium", state === "queued" ? "text-muted" : "text-ink")}>{s.label}</span>
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.12em]",
                    state === "done" && "text-success",
                    state === "active" && "text-brand",
                    state === "queued" && "text-faint",
                  )}
                >
                  {state === "done" ? "Complete" : state === "active" ? "Running" : "Queued"}
                </span>
              </li>
            );
          })}
        </ol>
      </BrowserFrame>
    </div>
  );
}

export function DataMigration({ hideHeading }: SectionProps) {
  return (
    <section id="data-migration" className={cn("scroll-mt-24", sectionPad(hideHeading))} aria-label="Data migration">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            {!hideHeading ? (
              <SectionHeading
                align="left"
                eyebrow="Data migration"
                title="Move your financial data without disrupting your operations."
                description="The Data Migration Agent brings historical records across in validated batches, with duplicates caught and progress visible, while your day-to-day processing continues."
              />
            ) : null}
            <ol className={cn("border-b border-line", !hideHeading && "mt-10")}>
              {STAGES.map((s, i) => (
                <Reveal as="li" key={s.key} delay={i * 0.04}>
                  <div className="grid grid-cols-[40px_1fr] gap-3 border-t border-line py-3.5">
                    <span className="font-mono text-[12px] text-brand">{pad2(i + 1)}</span>
                    <div>
                      <div className="text-[16px] font-bold text-ink">{s.label}</div>
                      <p className="mt-0.5 text-[15px] leading-relaxed text-body">{s.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.1} className="mt-8">
              <Button href={LINKS.contact} size="lg" icon={<ArrowRight size={16} />}>
                Plan Your Migration
              </Button>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7 lg:self-start lg:sticky lg:top-28">
            <MigrationDashboard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
