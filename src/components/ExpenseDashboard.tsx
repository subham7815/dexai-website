"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Clock, Filter, Search, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { DEMO_EXPENSES, EXPENSE_CATEGORIES, type ExpenseStatus } from "@/lib/constants";
import { cn, gbp, sectionPad, type SectionProps } from "@/lib/utils";
import { AnimatedNumber } from "./ui/AnimatedNumber";
import { Badge, DemoTag } from "./ui/Badge";
import { BrowserFrame } from "./ui/BrowserFrame";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const STATUS_FILTERS: ("All" | ExpenseStatus)[] = ["All", "Matched", "Pending", "Review"];

function StatusBadge({ status }: { status: ExpenseStatus }) {
  if (status === "Matched")
    return (
      <Badge tone="success" className="gap-1">
        <Check size={10} /> Matched
      </Badge>
    );
  if (status === "Pending")
    return (
      <Badge tone="warn" className="gap-1">
        <Clock size={10} /> Pending
      </Badge>
    );
  return (
    <Badge tone="brand" className="gap-1">
      <ShieldAlert size={10} /> Review
    </Badge>
  );
}

export function ExpenseDashboard({ hideHeading }: SectionProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0]);
  const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]>("All");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DEMO_EXPENSES.filter((r) => {
      if (category !== "All categories" && r.category !== category) return false;
      if (status !== "All" && r.status !== status) return false;
      if (q && !`${r.supplier} ${r.category}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, category, status]);

  const totals = useMemo(() => {
    const all = DEMO_EXPENSES;
    const total = all.reduce((s, r) => s + r.amount, 0);
    const vat = all.reduce((s, r) => s + r.vat, 0);
    const thisMonth = all.filter((r) => r.date.includes("Oct")).reduce((s, r) => s + r.amount, 0);
    const pending = all.filter((r) => r.status !== "Matched").length;
    const categorised = all.filter((r) => r.status !== "Review").length;
    return { total, vat, thisMonth, pending, categorised, uncategorised: all.length - categorised };
  }, []);

  const stats = [
    { label: "Total expenses", value: totals.total, money: true, accent: true },
    { label: "This month", value: totals.thisMonth, money: true },
    { label: "VAT", value: totals.vat, money: true },
    { label: "Pending", value: totals.pending },
    { label: "Categorised", value: totals.categorised },
    { label: "Uncategorised", value: totals.uncategorised },
  ];

  return (
    <section id="expenses" className={cn("scroll-mt-24 border-y border-line bg-surface", sectionPad(hideHeading))} aria-label="Expense management">
      <div className="container-x">
        {!hideHeading ? (
          <SectionHeading
            id="expenses-title"
            eyebrow="Expense management"
            title="Expenses, organised automatically."
            description="Every processed document becomes a categorised, VAT-aware expense you can search, filter and export."
          />
        ) : null}

        <Reveal className={cn(!hideHeading && "mt-14 lg:mt-20")}>
          <BrowserFrame url="app.dexai.app/expenses" bodyClassName="bg-surface p-3 sm:p-5" aside={<DemoTag />}>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={cn(
                    "rounded-xl border p-3.5 sm:p-4",
                    s.accent ? "border-navy bg-navy text-white" : "border-line-soft bg-white",
                  )}
                >
                  <div className={cn("text-[11px] font-semibold uppercase tracking-wider", s.accent ? "text-white/70" : "text-faint")}>
                    {s.label}
                  </div>
                  <div className={cn("mt-1.5 text-xl font-bold tabular sm:text-2xl", s.accent ? "text-white" : "text-ink")}>
                    <AnimatedNumber value={s.value} delay={i * 0.06} format={(n) => (s.money ? gbp(n) : Math.round(n).toString())} />
                  </div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="mt-4 flex flex-col gap-3 rounded-xl border border-line-soft bg-white p-3 sm:flex-row sm:items-center">
              <label className="relative flex-1">
                <span className="sr-only">Search expenses</span>
                <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" aria-hidden />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search supplier or category"
                  className="h-10 w-full rounded-lg border border-line bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-faint focus:border-navy focus:bg-white focus:outline-none"
                />
              </label>
              <label className="relative">
                <span className="sr-only">Filter by category</span>
                <Filter size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" aria-hidden />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-10 w-full appearance-none rounded-lg border border-line bg-surface pl-9 pr-8 text-sm font-medium text-ink focus:border-navy focus:bg-white focus:outline-none sm:w-auto"
                >
                  {EXPENSE_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <div className="flex gap-1 overflow-x-auto scrollbar-none" role="group" aria-label="Filter by status">
                {STATUS_FILTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    aria-pressed={status === s}
                    className={cn(
                      "h-10 shrink-0 rounded-lg px-3 text-[13px] font-semibold transition-colors",
                      status === s ? "bg-ink text-white" : "bg-surface text-muted hover:bg-line-soft hover:text-ink",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Table (desktop) */}
            <div className="mt-4 hidden overflow-hidden rounded-xl border border-line-soft bg-white md:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  <tr>
                    <th scope="col" className="px-4 py-3">Date</th>
                    <th scope="col" className="px-4 py-3">Supplier</th>
                    <th scope="col" className="px-4 py-3">Category</th>
                    <th scope="col" className="px-4 py-3 text-right">Amount</th>
                    <th scope="col" className="px-4 py-3 text-right">VAT</th>
                    <th scope="col" className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence initial={false}>
                    {rows.map((r) => (
                      <motion.tr
                        key={r.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-line-soft transition-colors hover:bg-surface/70"
                      >
                        <td className="px-4 py-3 tabular text-muted">{r.date}</td>
                        <td className="px-4 py-3 font-semibold text-ink">{r.supplier}</td>
                        <td className="px-4 py-3">
                          <Badge tone="navy">{r.category}</Badge>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold tabular text-ink">{gbp(r.amount)}</td>
                        <td className="px-4 py-3 text-right tabular text-muted">{gbp(r.vat)}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={r.status} />
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              {rows.length === 0 ? <p className="px-4 py-8 text-center text-sm text-muted">No expenses match these filters.</p> : null}
            </div>

            {/* Cards (mobile) */}
            <ul className="mt-4 space-y-2 md:hidden" aria-label="Expenses">
              {rows.map((r) => (
                <li key={r.id} className="rounded-xl border border-line-soft bg-white p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-ink">{r.supplier}</div>
                      <div className="mt-0.5 text-[12px] tabular text-muted">{r.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold tabular text-ink">{gbp(r.amount)}</div>
                      <div className="text-[12px] tabular text-muted">VAT {gbp(r.vat)}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge tone="navy">{r.category}</Badge>
                    <StatusBadge status={r.status} />
                  </div>
                </li>
              ))}
              {rows.length === 0 ? <li className="py-6 text-center text-sm text-muted">No expenses match these filters.</li> : null}
            </ul>
          </BrowserFrame>
        </Reveal>
      </div>
    </section>
  );
}
