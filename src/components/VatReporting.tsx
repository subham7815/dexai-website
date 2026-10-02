"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { CalendarDays, FileCheck2 } from "lucide-react";
import { useRef, useState } from "react";
import { DEMO_VAT_MONTHS, DEMO_VAT_SUMMARY, INTEGRATIONS } from "@/lib/constants";
import { useMediaQuery } from "@/lib/hooks";
import { cn, gbp, sectionPad, type SectionProps } from "@/lib/utils";
import { AnimatedNumber } from "./ui/AnimatedNumber";
import { DemoTag } from "./ui/Badge";
import { IntegrationBadge } from "./ui/IntegrationBadge";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

/* Validated 2-series categorical pair (navy / brand red) for light surfaces. */
const SERIES = [
  { key: "collected", label: "VAT collected", color: "#2F46A6" },
  { key: "paid", label: "VAT paid", color: "#C7102C" },
] as const;

const CHART_WIDE = { w: 560, h: 240, padL: 48, padR: 12, padT: 16, padB: 32 };
const CHART_NARROW = { w: 340, h: 240, padL: 44, padR: 8, padT: 16, padB: 32 };

function VatChart() {
  const reduce = useReducedMotion();
  const narrow = useMediaQuery("(max-width: 639px)");
  const CHART = narrow ? CHART_NARROW : CHART_WIDE;
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [hover, setHover] = useState<{ m: number; s: number } | null>(null);

  const max = Math.max(...DEMO_VAT_MONTHS.flatMap((m) => [m.collected, m.paid]));
  const niceMax = Math.ceil(max / 1000) * 1000;
  const innerW = CHART.w - CHART.padL - CHART.padR;
  const innerH = CHART.h - CHART.padT - CHART.padB;
  const groupW = innerW / DEMO_VAT_MONTHS.length;
  const barW = Math.min(narrow ? 26 : 36, groupW * 0.28);
  const gap = 2;
  const yFor = (v: number) => CHART.padT + innerH - (v / niceMax) * innerH;
  const ticks = [0, niceMax / 2, niceMax];

  return (
    <div className="relative">
      <svg
        ref={ref}
        viewBox={`0 0 ${CHART.w} ${CHART.h}`}
        className="h-auto w-full"
        role="img"
        aria-label="VAT collected versus VAT paid for July, August and September 2026"
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={CHART.padL} x2={CHART.w - CHART.padR} y1={yFor(t)} y2={yFor(t)} stroke="#ECECF2" strokeWidth="1" />
            <text x={CHART.padL - 8} y={yFor(t) + 4} textAnchor="end" fontSize="11" fill="#9A9EB0" className="tabular">
              {t === 0 ? "0" : `£${t / 1000}k`}
            </text>
          </g>
        ))}
        {DEMO_VAT_MONTHS.map((m, mi) => {
          const cx = CHART.padL + groupW * mi + groupW / 2;
          return (
            <g key={m.month}>
              <text x={cx} y={CHART.h - 10} textAnchor="middle" fontSize="12" fill="#5A5F74" fontWeight={600}>
                {m.month} 2026
              </text>
              {SERIES.map((s, si) => {
                const v = m[s.key];
                const x = cx - barW - gap / 2 + si * (barW + gap);
                const y = yFor(v);
                const h = CHART.padT + innerH - y;
                const isHover = hover?.m === mi && hover?.s === si;
                const dim = hover && !isHover;
                return (
                  <g key={s.key}>
                    <motion.rect
                      x={x}
                      width={barW}
                      rx={4}
                      fill={s.color}
                      initial={reduce ? { y, height: h } : { y: CHART.padT + innerH, height: 0 }}
                      animate={inView ? { y, height: h, opacity: dim ? 0.45 : 1 } : undefined}
                      transition={{ duration: 0.8, delay: mi * 0.12 + si * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {/* generous hit target */}
                    <rect
                      x={x - 4}
                      y={CHART.padT}
                      width={barW + 8}
                      height={innerH}
                      fill="transparent"
                      onMouseEnter={() => setHover({ m: mi, s: si })}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover({ m: mi, s: si })}
                      onBlur={() => setHover(null)}
                      tabIndex={0}
                      aria-label={`${s.label}, ${m.month} 2026: ${gbp(v)}`}
                    />
                    {isHover ? (
                      <g>
                        <rect x={x + barW / 2 - 46} y={y - 34} width={92} height={24} rx={6} fill="#0E1024" />
                        <text x={x + barW / 2} y={y - 18} textAnchor="middle" fontSize="11" fill="#fff" fontWeight={600}>
                          {s.label.replace("VAT ", "")} · {gbp(v)}
                        </text>
                      </g>
                    ) : null}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>

      <ul className="mt-2 flex flex-wrap items-center justify-end gap-4 text-[12px] font-medium text-muted" aria-label="Legend">
        {SERIES.map((s) => (
          <li key={s.key} className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-[3px]" style={{ background: s.color }} aria-hidden />
            {s.label}
          </li>
        ))}
      </ul>

      <table className="sr-only">
        <caption>VAT collected and paid by month</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">VAT collected</th>
            <th scope="col">VAT paid</th>
          </tr>
        </thead>
        <tbody>
          {DEMO_VAT_MONTHS.map((m) => (
            <tr key={m.month}>
              <td>{m.month} 2026</td>
              <td>{gbp(m.collected)}</td>
              <td>{gbp(m.paid)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function VatReporting({ hideHeading }: SectionProps) {
  const net = DEMO_VAT_SUMMARY.collected - DEMO_VAT_SUMMARY.paid;
  const hmrc = INTEGRATIONS.find((i) => i.id === "hmrc")!;

  return (
    <section id="vat" className={cn("scroll-mt-24", sectionPad(hideHeading))} aria-label="VAT and tax reporting">
      <div className="container-x">
        {!hideHeading ? (
          <SectionHeading
            id="vat-title"
            eyebrow="VAT & tax reporting"
            title="Stay ready for VAT reporting."
            description="VAT is captured on every document as it's processed, so your reporting period figures are always current."
          />
        ) : null}

        <Reveal className={cn(!hideHeading && "mt-14 lg:mt-20")}>
          <div className="relative overflow-hidden rounded-card-lg border border-line bg-white shadow-float-lg">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft px-5 py-4 sm:px-7">
              <div>
                <div className="text-sm font-bold text-ink">VAT summary</div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[12px] text-muted">
                  <CalendarDays size={13} /> Reporting period · {DEMO_VAT_SUMMARY.period}
                </div>
              </div>
              <DemoTag />
            </div>

            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-5 lg:gap-8">
              <div className="grid grid-cols-2 gap-3 lg:col-span-2 lg:grid-cols-1">
                {[
                  { label: "VAT collected", value: DEMO_VAT_SUMMARY.collected, color: SERIES[0].color },
                  { label: "VAT paid", value: DEMO_VAT_SUMMARY.paid, color: SERIES[1].color },
                  { label: "Net VAT", value: net, accent: true },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={cn(
                      "rounded-xl border p-4",
                      s.accent ? "col-span-2 border-navy bg-navy text-white lg:col-span-1" : "border-line-soft bg-surface",
                    )}
                  >
                    <div className={cn("flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider", s.accent ? "text-white/70" : "text-faint")}>
                      {s.color ? <span className="size-2 rounded-[2px]" style={{ background: s.color }} aria-hidden /> : null}
                      {s.label}
                    </div>
                    <div className={cn("mt-1.5 text-2xl font-bold tabular sm:text-[1.75rem]", s.accent ? "text-white" : "text-ink")}>
                      <AnimatedNumber value={s.value} delay={i * 0.08} format={(n) => gbp(n, { maximumFractionDigits: 0, minimumFractionDigits: 0 })} />
                    </div>
                    {s.accent ? <div className="mt-1 text-[12px] text-white/70">Due {DEMO_VAT_SUMMARY.due}</div> : null}
                  </div>
                ))}
              </div>

              <div className="lg:col-span-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">VAT by month</div>
                <div className="mt-3">
                  <VatChart />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-line-soft bg-surface/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div className="flex items-center gap-3">
                <IntegrationBadge integration={hmrc} showName={false} size="sm" />
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                    <FileCheck2 size={14} className="text-brand" /> Built for Making Tax Digital workflows.
                  </div>
                  <div className="text-[12px] text-muted">Digital records and VAT figures prepared in the format MTD submissions require.</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
