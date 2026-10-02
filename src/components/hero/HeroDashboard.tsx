"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  BarChart3,
  Building2,
  Check,
  FileText,
  Landmark,
  LayoutDashboard,
  Receipt,
  ScanLine,
  Sparkles,
  Tags,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AiChip, DemoTag } from "../ui/Badge";
import { BrowserFrame } from "../ui/BrowserFrame";

const STAGES = [
  { key: "capture", label: "Receipt captured", icon: Receipt },
  { key: "extract", label: "AI extraction", icon: ScanLine },
  { key: "categorise", label: "Categorisation", icon: Tags },
  { key: "match", label: "Bank matching", icon: Landmark },
  { key: "report", label: "Reporting", icon: BarChart3 },
] as const;

type Field = { key: string; label: string; value: string; stage: number };

const FIELDS: Field[] = [
  { key: "supplier", label: "Supplier", value: "Tesco", stage: 1 },
  { key: "date", label: "Date", value: "02 Oct 2026", stage: 1 },
  { key: "amount", label: "Amount", value: "£51.00", stage: 1 },
  { key: "vat", label: "VAT", value: "£8.50", stage: 1 },
  { key: "category", label: "Category", value: "Office supplies", stage: 2 },
];

const BARS = [38, 52, 44, 68, 58, 76, 64];

export function HeroDashboard() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(reduce ? 4 : 0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setStage((s) => {
        if (s >= STAGES.length - 1) {
          setTick((t) => t + 1);
          return 0;
        }
        return s + 1;
      });
    }, 1900);
    return () => window.clearInterval(id);
  }, [reduce]);

  const activeField = (f: Field) => stage === f.stage;
  const doneField = (f: Field) => stage > f.stage;

  return (
    <div className="relative">
      <BrowserFrame className="relative" bodyClassName="bg-surface" aside={<DemoTag />}>
        <div className="grid min-h-[420px] grid-cols-[52px_1fr] sm:grid-cols-[180px_1fr]">
          {/* Sidebar */}
          <aside className="flex flex-col gap-1 border-r border-line-soft bg-white p-2 sm:p-3" aria-hidden>
            {[
              { icon: LayoutDashboard, label: "Dashboard", active: true },
              { icon: Receipt, label: "Receipts" },
              { icon: FileText, label: "Invoices" },
              { icon: Landmark, label: "Bank feeds" },
              { icon: BarChart3, label: "Reports" },
              { icon: Building2, label: "Companies" },
            ].map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2 py-2 text-[12px] font-medium",
                  active ? "bg-brand-soft text-brand" : "text-muted",
                )}
              >
                <Icon size={15} className="shrink-0" />
                <span className="hidden sm:inline">{label}</span>
              </div>
            ))}
          </aside>

          {/* Main */}
          <div className="flex flex-col gap-3 p-3 sm:p-4">
            {/* Pipeline rail */}
            <div className="rounded-xl border border-line-soft bg-white p-3">
              <ol className="flex items-center justify-between gap-1" aria-label="Processing pipeline">
                {STAGES.map((s, i) => {
                  const Icon = s.icon;
                  const state = i < stage ? "done" : i === stage ? "active" : "idle";
                  return (
                    <li key={s.key} className="flex min-w-0 flex-1 items-center gap-1 last:flex-none">
                      <div className="flex min-w-0 flex-col items-center gap-1">
                        <motion.div
                          animate={
                            state === "active"
                              ? { scale: 1.08, boxShadow: "0 0 0 6px rgba(199,16,44,0.12)" }
                              : { scale: 1, boxShadow: "0 0 0 0px rgba(199,16,44,0)" }
                          }
                          transition={{ duration: 0.4 }}
                          className={cn(
                            "flex size-7 items-center justify-center rounded-full border transition-colors duration-300 sm:size-8",
                            state === "done" && "border-navy bg-navy text-white",
                            state === "active" && "border-brand bg-brand text-white",
                            state === "idle" && "border-line bg-white text-faint",
                          )}
                        >
                          {state === "done" ? <Check size={13} /> : <Icon size={13} />}
                        </motion.div>
                        <span
                          className={cn(
                            "hidden truncate text-[10px] font-semibold sm:block",
                            state === "active" ? "text-brand" : state === "done" ? "text-navy" : "text-faint",
                          )}
                        >
                          {s.label}
                        </span>
                      </div>
                      {i < STAGES.length - 1 ? (
                        <div className="relative mb-0 h-px flex-1 bg-line sm:mb-4">
                          <motion.div
                            className="absolute inset-y-0 left-0 bg-navy"
                            initial={false}
                            animate={{ width: i < stage ? "100%" : "0%" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="grid gap-3 md:grid-cols-5">
              {/* Receipt + extracted fields */}
              <div className="relative overflow-hidden rounded-xl border border-line-soft bg-white p-3 md:col-span-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Latest receipt</span>
                  <AnimatePresence>
                    {stage >= 1 ? (
                      <motion.span
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1 text-[11px] font-semibold text-brand"
                      >
                        <Sparkles size={11} /> {stage === 1 ? "Extracting…" : "Extracted"}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-[72px_1fr] gap-3">
                  {/* mini receipt */}
                  <div className="relative overflow-hidden rounded-md border border-line-soft bg-surface p-2" aria-hidden>
                    <div className="mx-auto mb-1.5 h-1.5 w-8 rounded bg-ink/60" />
                    {[8, 6, 7, 5, 6].map((w, i) => (
                      <div key={i} className="mb-1 flex justify-between gap-1">
                        <div className="h-1 rounded bg-ink/15" style={{ width: `${w * 4}px` }} />
                        <div className="h-1 w-3 rounded bg-ink/25" />
                      </div>
                    ))}
                    <div className="mt-1.5 h-1 w-full rounded bg-brand/60" />
                    <AnimatePresence>
                      {stage === 1 && !reduce ? (
                        <motion.div
                          key={`scan-${tick}`}
                          initial={{ top: "-10%" }}
                          animate={{ top: "110%" }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
                          className="absolute inset-x-0 h-5 bg-gradient-to-b from-transparent via-brand/25 to-transparent"
                        />
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
                    {FIELDS.map((f) => {
                      const visible = stage >= f.stage;
                      const active = activeField(f);
                      return (
                        <div key={f.key} className={cn(f.key === "category" && "col-span-2")}>
                          <dt className="text-[10px] font-medium uppercase tracking-wider text-faint">{f.label}</dt>
                          <dd className="mt-0.5">
                            <motion.span
                              animate={
                                active
                                  ? { boxShadow: "0 0 0 2px rgba(199,16,44,0.55), 0 0 0 6px rgba(199,16,44,0.12)" }
                                  : { boxShadow: "0 0 0 0px rgba(199,16,44,0)" }
                              }
                              transition={{ duration: 0.45 }}
                              className={cn(
                                "inline-flex min-h-[22px] items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[13px] font-semibold tabular transition-colors",
                                visible ? "bg-surface text-ink" : "bg-line-soft text-transparent",
                                doneField(f) && "bg-navy-soft text-navy",
                              )}
                            >
                              {visible ? (
                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                  {f.value}
                                </motion.span>
                              ) : (
                                <span className="shimmer-line animate-shimmer inline-block h-2.5 w-14 rounded" />
                              )}
                              {active ? <AiChip /> : null}
                            </motion.span>
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </div>

              {/* Bank match */}
              <div className="rounded-xl border border-line-soft bg-white p-3 md:col-span-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Bank match</span>
                <div className="mt-2 rounded-lg border border-line-soft bg-surface p-2.5">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="font-medium text-ink">TESCO STORES 2041</span>
                    <span className="font-semibold tabular text-ink">-£51.00</span>
                  </div>
                  <div className="mt-0.5 text-[10px] text-faint">Business current · 02 Oct</div>
                </div>
                <div className="my-2 flex items-center justify-center" aria-hidden>
                  <motion.div
                    animate={stage >= 3 ? { height: 18, backgroundColor: "#15803D" } : { height: 18, backgroundColor: "#E7E7EE" }}
                    className="w-px"
                  />
                </div>
                <AnimatePresence mode="wait">
                  {stage >= 3 ? (
                    <motion.div
                      key="matched"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-between rounded-lg border border-success/20 bg-success-soft px-2.5 py-2 text-[12px] font-semibold text-success"
                    >
                      <span className="flex items-center gap-1.5">
                        <Check size={13} /> Matched
                      </span>
                      <span className="tabular">£51.00</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="pending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="rounded-lg border border-dashed border-line px-2.5 py-2 text-[12px] font-medium text-faint"
                    >
                      {stage === 2 ? "Finding match…" : "Awaiting document"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Report */}
            <div className="rounded-xl border border-line-soft bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Expenses · last 7 days</span>
                <span className={cn("text-[11px] font-semibold transition-colors", stage >= 4 ? "text-success" : "text-faint")}>
                  {stage >= 4 ? "Report updated" : "—"}
                </span>
              </div>
              <div className="mt-3 flex h-16 items-end gap-1.5" aria-hidden>
                {BARS.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{ height: `${h}%`, opacity: stage >= 4 || i < BARS.length - 1 ? 1 : 0.35 }}
                    transition={{ duration: 0.6, delay: i * 0.04, ease: "easeOut" }}
                    className={cn("flex-1 rounded-t-[3px]", i === BARS.length - 1 ? "bg-brand" : "bg-navy/80")}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>

      {/* Floating accents */}
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-3 bottom-10 hidden rounded-xl border border-line bg-white/90 p-3 shadow-float backdrop-blur sm:block lg:-left-8"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">VAT this quarter</div>
        <div className="mt-0.5 text-lg font-bold tabular text-ink">£5,490</div>
        <div className="text-[11px] font-medium text-success">Ready to review</div>
      </motion.div>
    </div>
  );
}
