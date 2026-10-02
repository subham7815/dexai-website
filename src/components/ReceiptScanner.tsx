"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DEMO_RECEIPT_FIELDS } from "@/lib/constants";
import { cn, sectionPad, type SectionProps } from "@/lib/utils";
import { AiChip, Badge, DemoTag } from "./ui/Badge";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

/** Receipt line -> which extracted field it corresponds to. */
const RECEIPT_LINES: { text: string; right?: string; field?: string; style?: string }[] = [
  { text: "TESCO", field: "supplier", style: "text-center text-base font-extrabold tracking-[0.2em]" },
  { text: "Tesco Stores Ltd · Store 2041", style: "text-center text-[10px] text-faint" },
  { text: "02/10/2026  14:32", field: "date", style: "text-center text-[10px]" },
  { text: "Receipt TSC-48213-09", field: "ref", style: "text-center text-[10px]" },
  { text: "──────────────────────────", style: "text-center text-faint" },
  { text: "A4 Paper 5 reams", right: "18.50" },
  { text: "Ballpoint pens x20", right: "6.80" },
  { text: "Printer toner", right: "14.20" },
  { text: "Sticky notes", right: "3.00" },
  { text: "──────────────────────────", style: "text-center text-faint" },
  { text: "SUBTOTAL", right: "42.50", field: "subtotal", style: "font-semibold" },
  { text: "VAT 20%", right: "8.50", field: "vat", style: "font-semibold" },
  { text: "TOTAL GBP", right: "51.00", field: "total", style: "text-sm font-extrabold" },
  { text: "──────────────────────────", style: "text-center text-faint" },
  { text: "Currency: GBP", field: "currency", style: "text-[10px] text-faint" },
  { text: "Thank you for shopping", style: "text-center text-[10px] text-faint" },
];

export function ReceiptScanner({ hideHeading }: SectionProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const [count, setCount] = useState(reduce ? DEMO_RECEIPT_FIELDS.length : 0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    let i = 0;
    const step = () => {
      i += 1;
      setCount(i);
      if (i < DEMO_RECEIPT_FIELDS.length) {
        t = window.setTimeout(step, 520);
      } else {
        t = window.setTimeout(() => {
          setCycle((c) => c + 1);
        }, 5200);
      }
    };
    let t = window.setTimeout(() => {
      setCount(0);
      t = window.setTimeout(step, 700);
    }, 0);
    return () => window.clearTimeout(t);
  }, [inView, reduce, cycle]);

  const activeKey = count > 0 && count <= DEMO_RECEIPT_FIELDS.length ? DEMO_RECEIPT_FIELDS[count - 1].key : null;
  const extractedKeys = new Set(DEMO_RECEIPT_FIELDS.slice(0, count).map((f) => f.key));
  const scanning = inView && !reduce && count < DEMO_RECEIPT_FIELDS.length;

  return (
    <section id="receipt-scanning" className={cn("scroll-mt-24 border-y border-line bg-surface", sectionPad(hideHeading))} aria-label="AI receipt scanning">
      <div className="container-x">
        {!hideHeading ? (
          <SectionHeading
            id="scan-title"
            eyebrow="AI receipt scanning"
            title="Turn every receipt into structured data."
            description="Snap, upload or forward a receipt. DexAI reads it and returns clean, validated fields you can trust."
          />
        ) : null}

        <div ref={ref} className={cn("grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10", !hideHeading && "mt-14 lg:mt-20")}>
          {/* Receipt */}
          <Reveal className="flex items-center justify-center rounded-card-lg border border-line bg-white p-6 shadow-card sm:p-10">
            <div className="relative w-full max-w-[320px]">
              <div
                className="relative rounded-sm bg-[#fffdf7] px-5 py-6 font-mono text-[11px] leading-[1.9] text-ink shadow-[0_24px_50px_-20px_rgba(14,16,36,0.35)]"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% calc(100% - 6px), 96% 100%, 92% calc(100% - 6px), 88% 100%, 84% calc(100% - 6px), 80% 100%, 76% calc(100% - 6px), 72% 100%, 68% calc(100% - 6px), 64% 100%, 60% calc(100% - 6px), 56% 100%, 52% calc(100% - 6px), 48% 100%, 44% calc(100% - 6px), 40% 100%, 36% calc(100% - 6px), 32% 100%, 28% calc(100% - 6px), 24% 100%, 20% calc(100% - 6px), 16% 100%, 12% calc(100% - 6px), 8% 100%, 4% calc(100% - 6px), 0 100%)",
                }}
              >
                {RECEIPT_LINES.map((l, i) => {
                  const isActive = l.field && l.field === activeKey;
                  const isDone = l.field && extractedKeys.has(l.field) && !isActive;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "relative -mx-1.5 flex justify-between gap-3 rounded px-1.5 transition-colors duration-300",
                        l.style,
                        isActive && "bg-brand/15 ring-1 ring-brand/60",
                        isDone && "bg-navy/8",
                      )}
                    >
                      <span className={cn(l.right ? "" : "w-full")}>{l.text}</span>
                      {l.right ? <span className="tabular">{l.right}</span> : null}
                    </div>
                  );
                })}

                {/* Scan beam */}
                <AnimatePresence>
                  {scanning ? (
                    <motion.div
                      key={`beam-${cycle}`}
                      initial={{ top: 0, opacity: 0 }}
                      animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                      className="pointer-events-none absolute inset-x-0 h-px bg-brand shadow-[0_0_18px_3px_rgba(199,16,44,0.45)]"
                      aria-hidden
                    />
                  ) : null}
                </AnimatePresence>
              </div>
              {/* corner markers */}
              <div className="pointer-events-none absolute -inset-3" aria-hidden>
                {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c) => (
                  <span key={c} className={cn("absolute size-5 rounded-[3px] border-brand/70", c)} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Extraction panel */}
          <Reveal delay={0.1} className="relative rounded-card-lg border border-line bg-white p-5 shadow-card sm:p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <Sparkles size={15} />
                </span>
                <div>
                  <div className="text-sm font-bold text-ink">AI extraction</div>
                  <div className="text-[11px] text-muted">{scanning ? "Reading document…" : "Complete"}</div>
                </div>
              </div>
              <DemoTag />
            </div>

            <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-line-soft" aria-hidden>
              <motion.div
                className="h-full bg-gradient-to-r from-navy to-brand"
                animate={{ width: `${(count / DEMO_RECEIPT_FIELDS.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <dl className="mt-5 divide-y divide-line-soft">
              {DEMO_RECEIPT_FIELDS.map((f, i) => {
                const shown = i < count;
                const active = f.key === activeKey;
                return (
                  <div key={f.key} className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-sm text-muted">{f.label}</dt>
                    <dd className="flex items-center gap-2">
                      <AnimatePresence mode="wait" initial={false}>
                        {shown ? (
                          <motion.span
                            key="v"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            className={cn(
                              "rounded-md px-2 py-0.5 text-sm font-semibold tabular text-ink transition-colors",
                              active ? "bg-brand-soft ring-1 ring-brand/40" : "bg-surface",
                            )}
                          >
                            {f.value}
                          </motion.span>
                        ) : (
                          <motion.span key="s" exit={{ opacity: 0 }} className="shimmer-line animate-shimmer inline-block h-4 w-24 rounded" />
                        )}
                      </AnimatePresence>
                      {shown ? (
                        active ? (
                          <AiChip />
                        ) : (
                          <Badge tone="success" className="gap-1 px-1.5">
                            <Check size={10} /> {Math.round(f.confidence * 100)}%
                          </Badge>
                        )
                      ) : (
                        <span className="w-[42px]" />
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>

            <p className="mt-4 text-[12px] leading-relaxed text-faint">
              Values shown are sample data. Confidence scores indicate how certain the extraction is for each field.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
