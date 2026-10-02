"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Check, FileText, Landmark, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LINKS } from "@/lib/constants";
import { cn, sectionPad, type SectionProps } from "@/lib/utils";
import { Button } from "./ui/Button";
import { DemoTag } from "./ui/Badge";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

interface Pair {
  bank: { name: string; amount: string; date: string; account: string };
  doc: { name: string; amount: string; ref: string; type: string };
}

const PAIRS: Pair[] = [
  {
    bank: { name: "Amazon", amount: "£125.40", date: "01 Oct 2026", account: "Business current" },
    doc: { name: "Amazon Business", amount: "£125.40", ref: "INV-204-88213", type: "Invoice" },
  },
  {
    bank: { name: "Google Workspace", amount: "£118.80", date: "29 Sep 2026", account: "Business current" },
    doc: { name: "Google Cloud EMEA", amount: "£118.80", ref: "GW-9931-2026", type: "Invoice" },
  },
  {
    bank: { name: "Tesco Stores 2041", amount: "£51.00", date: "02 Oct 2026", account: "Business current" },
    doc: { name: "Tesco", amount: "£51.00", ref: "TSC-48213-09", type: "Receipt" },
  },
];

type Phase = "idle" | "matching" | "matched";

export function BankMatching({ hideHeading }: SectionProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>(reduce ? "matched" : "idle");

  useEffect(() => {
    if (reduce || !inView) return;
    let t: number;
    const run = () => {
      setPhase("idle");
      t = window.setTimeout(() => {
        setPhase("matching");
        t = window.setTimeout(() => {
          setPhase("matched");
          t = window.setTimeout(() => {
            setIndex((i) => (i + 1) % PAIRS.length);
            run();
          }, 2600);
        }, 1500);
      }, 900);
    };
    run();
    return () => window.clearTimeout(t);
  }, [inView, reduce]);

  const pair = PAIRS[index];

  return (
    <section id="reconciliation" className={cn("scroll-mt-24", sectionPad(hideHeading))} aria-label="Bank feeds and reconciliation">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            {!hideHeading ? (
              <SectionHeading
                id="match-title"
                align="left"
                eyebrow="Bank feeds & reconciliation"
                title="Connect your bank. Let DexAI do the matching."
                description="Bank transactions and your receipts or invoices are paired automatically on amount, supplier and date, so reconciliation becomes a review rather than a chore."
              />
            ) : (
              <h2 className="text-2xl font-bold tracking-tight text-ink">How matching works</h2>
            )}
            <Reveal delay={0.1} className={cn(hideHeading ? "mt-5" : "mt-8")}>
              <ul className="space-y-3 text-[17px] text-body">
                {[
                  "Live bank feed integration",
                  "Amount, supplier and date matching",
                  "Exceptions surfaced for a quick review",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center rounded-full bg-success-soft text-success">
                      <Check size={12} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href={LINKS.bookDemo} variant="secondary" icon={<ArrowRight size={14} />}>
                  See reconciliation in a demo
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div ref={ref} className="relative overflow-hidden rounded-card-lg border border-line bg-surface p-5 shadow-card sm:p-8">
              <div className="absolute inset-0 grid-bg opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" aria-hidden />
              <DemoTag className="absolute right-4 top-4 z-10" />

              <div className="relative grid gap-4 pt-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:pt-0">
                {/* Bank transaction */}
                <div
                  className={cn(
                    "rounded-xl border border-line bg-white p-4 shadow-card transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    !reduce && phase !== "idle" && "sm:translate-x-2",
                  )}
                >
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    <Landmark size={13} /> Bank transaction
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`b-${index}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mt-3 text-2xl font-bold tabular text-ink">{pair.bank.amount}</div>
                      <div className="mt-0.5 font-semibold text-ink">{pair.bank.name}</div>
                      <div className="mt-1 text-[12px] text-muted">
                        {pair.bank.account} · {pair.bank.date}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* AI node */}
                <div className="flex items-center justify-center sm:flex-col" aria-hidden>
                  <Connector active={phase !== "idle"} done={phase === "matched"} />
                  <motion.div
                    animate={
                      phase === "matching"
                        ? { boxShadow: "0 0 0 10px rgba(199,16,44,0.10), 0 0 30px rgba(199,16,44,0.35)" }
                        : { boxShadow: "0 0 0 0px rgba(199,16,44,0)" }
                    }
                    transition={{ duration: 0.6 }}
                    className={cn(
                      "flex size-12 items-center justify-center rounded-full border transition-colors duration-500",
                      phase === "matched" ? "border-success bg-success text-white" : "border-brand bg-brand text-white",
                    )}
                  >
                    {phase === "matched" ? <Check size={18} /> : <Sparkles size={18} className={phase === "matching" ? "animate-pulse" : ""} />}
                  </motion.div>
                  <Connector active={phase !== "idle"} done={phase === "matched"} />
                </div>

                {/* Document */}
                <div
                  className={cn(
                    "rounded-xl border border-line bg-white p-4 shadow-card transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    !reduce && phase !== "idle" && "sm:-translate-x-2",
                  )}
                >
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    <FileText size={13} /> Matched document
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`d-${index}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mt-3 text-2xl font-bold tabular text-ink">{pair.doc.amount}</div>
                      <div className="mt-0.5 font-semibold text-ink">{pair.doc.name}</div>
                      <div className="mt-1 text-[12px] text-muted">
                        {pair.doc.type} · {pair.doc.ref}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Status */}
              <div className="relative mt-5 flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Status</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phase}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-3 py-1 font-mono text-[12px] font-semibold uppercase tracking-[0.1em]",
                      phase === "matched" && "bg-success-soft text-success",
                      phase === "matching" && "bg-brand-soft text-brand",
                      phase === "idle" && "bg-surface text-muted",
                    )}
                    role="status"
                  >
                    {phase === "matched" ? (
                      <>
                        Matched <Check size={14} />
                      </>
                    ) : phase === "matching" ? (
                      "AI matching…"
                    ) : (
                      "Unreconciled"
                    )}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Connector({ active, done }: { active: boolean; done: boolean }) {
  return (
    <div className="relative h-px w-8 bg-line sm:h-8 sm:w-px">
      <motion.div
        initial={false}
        animate={{ scaleX: active ? 1 : 0, scaleY: active ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={cn("absolute inset-0 origin-left sm:origin-top", done ? "bg-success" : "bg-brand")}
      />
    </div>
  );
}
