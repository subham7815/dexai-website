"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  BarChart3,
  Building2,
  Check,
  CloudUpload,
  FileText,
  Landmark,
  LayoutDashboard,
  Receipt,
  Search,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import { DEMO_EXPENSES, DEMO_RECEIPT_FIELDS, DEMO_VAT_MONTHS } from "@/lib/constants";
import { cn, gbp } from "@/lib/utils";
import { AiChip, Badge } from "../ui/Badge";

export type DemoScreenKey = "dashboard" | "upload" | "extraction" | "categorise" | "matching" | "reporting";

export const DEMO_SCREENS: { key: DemoScreenKey; label: string; caption: string }[] = [
  { key: "dashboard", label: "Dashboard", caption: "One view of expenses, VAT and what needs attention." },
  { key: "upload", label: "Receipt upload", caption: "Drag in a file, snap a photo or forward an email." },
  { key: "extraction", label: "AI extraction", caption: "Supplier, date, VAT and totals read automatically." },
  { key: "categorise", label: "Categorisation", caption: "Each expense lands in the right category." },
  { key: "matching", label: "Bank matching", caption: "Documents paired with bank transactions." },
  { key: "reporting", label: "Reporting", caption: "Expense and VAT reports, always up to date." },
];

const NAV: { icon: typeof LayoutDashboard; label: string; screens: DemoScreenKey[] }[] = [
  { icon: LayoutDashboard, label: "Dashboard", screens: ["dashboard"] },
  { icon: Receipt, label: "Receipts", screens: ["upload", "extraction", "categorise"] },
  { icon: FileText, label: "Invoices", screens: [] },
  { icon: Landmark, label: "Bank feeds", screens: ["matching"] },
  { icon: BarChart3, label: "Reports", screens: ["reporting"] },
  { icon: Building2, label: "Companies", screens: [] },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Shell({ screen, title, children }: { screen: DemoScreenKey; title: string; children: ReactNode }) {
  return (
    <div className="grid h-full grid-cols-[56px_1fr] sm:grid-cols-[200px_1fr]">
      <aside className="flex flex-col gap-1 border-r border-line-soft bg-white p-2 sm:p-3" aria-hidden>
        <div className="mb-2 hidden items-center gap-2 px-2 pt-1 sm:flex">
          <span className="flex size-6 items-center justify-center rounded-md bg-navy text-[10px] font-bold text-white">AC</span>
          <span className="truncate text-[12px] font-semibold text-ink">Acme Studio Ltd</span>
        </div>
        {NAV.map(({ icon: Icon, label, screens }) => {
          const active = screens.includes(screen);
          return (
            <div
              key={label}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2 py-2 text-[12px] font-medium transition-colors",
                active ? "bg-brand-soft text-brand" : "text-muted",
              )}
            >
              <Icon size={15} className="shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </div>
          );
        })}
      </aside>
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center justify-between border-b border-line-soft bg-white px-4 py-2.5">
          <span className="text-[13px] font-bold text-ink">{title}</span>
          <div className="hidden h-7 w-44 items-center gap-2 rounded-md border border-line-soft bg-surface px-2 text-[11px] text-faint sm:flex" aria-hidden>
            <Search size={12} /> Search
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain bg-surface p-3 sm:p-4">{children}</div>
      </div>
    </div>
  );
}

function Tile({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className={cn("rounded-xl border p-3", accent ? "border-navy bg-navy text-white" : "border-line-soft bg-white")}>
      <div className={cn("text-[10px] font-semibold uppercase tracking-wider", accent ? "text-white/70" : "text-faint")}>{label}</div>
      <div className={cn("mt-1 text-lg font-bold tabular", accent ? "text-white" : "text-ink")}>{value}</div>
      {sub ? <div className={cn("text-[11px]", accent ? "text-white/70" : "text-muted")}>{sub}</div> : null}
    </div>
  );
}

function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */

export function DashboardScreen() {
  return (
    <Shell screen="dashboard" title="Dashboard">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Rise><Tile label="Total expenses" value="£1,031.49" sub="Last 30 days" accent /></Rise>
        <Rise delay={0.05}><Tile label="VAT" value="£153.61" sub="This quarter" /></Rise>
        <Rise delay={0.1}><Tile label="Pending" value="2" sub="Awaiting match" /></Rise>
        <Rise delay={0.15}><Tile label="Review" value="1" sub="Low confidence" /></Rise>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-5">
        <Rise delay={0.2} className="rounded-xl border border-line-soft bg-white p-3 sm:col-span-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Recent activity</div>
          <ul className="mt-2 space-y-1.5">
            {DEMO_EXPENSES.slice(0, 4).map((r) => (
              <li key={r.id} className="flex items-center justify-between text-[12px]">
                <span className="flex items-center gap-2">
                  <span className={cn("size-1.5 rounded-full", r.status === "Matched" ? "bg-success" : r.status === "Pending" ? "bg-warn" : "bg-brand")} />
                  <span className="font-medium text-ink">{r.supplier}</span>
                  <span className="hidden text-faint sm:inline">{r.category}</span>
                </span>
                <span className="font-semibold tabular text-ink">{gbp(r.amount)}</span>
              </li>
            ))}
          </ul>
        </Rise>
        <Rise delay={0.25} className="rounded-xl border border-line-soft bg-white p-3 sm:col-span-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Spend by category</div>
          <div className="mt-2 space-y-1.5">
            {[["Rent", 52], ["Equipment", 12], ["Software", 11], ["Travel", 10]].map(([k, v], i) => (
              <div key={k as string}>
                <div className="flex justify-between text-[11px]"><span className="text-muted">{k}</span><span className="tabular text-ink">{v}%</span></div>
                <div className="mt-0.5 h-1.5 rounded-full bg-line-soft">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease }} className={cn("h-full rounded-full", i === 0 ? "bg-brand" : "bg-navy/80")} />
                </div>
              </div>
            ))}
          </div>
        </Rise>
      </div>
    </Shell>
  );
}

export function UploadScreen() {
  const reduce = useReducedMotion();
  return (
    <Shell screen="upload" title="Receipts · Upload">
      <div className="grid h-full gap-3 sm:grid-cols-2">
        <Rise className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-navy/30 bg-white text-center">
          <motion.div
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex size-12 items-center justify-center rounded-full bg-navy-soft text-navy"
          >
            <CloudUpload size={22} />
          </motion.div>
          <div className="mt-3 text-[13px] font-semibold text-ink">Drop receipts or invoices</div>
          <div className="mt-1 text-[11px] text-muted">PDF, JPG, PNG · or forward to receipts@…</div>
        </Rise>
        <div className="space-y-2">
          {[
            ["tesco-receipt.jpg", 100, "Uploaded"],
            ["amazon-business-inv.pdf", 100, "Uploaded"],
            ["trainline-ticket.pdf", 64, "Uploading…"],
          ].map(([name, pct, status], i) => (
            <Rise key={name as string} delay={0.1 + i * 0.1} className="rounded-xl border border-line-soft bg-white p-3">
              <div className="flex items-center justify-between text-[12px]">
                <span className="flex items-center gap-2 font-medium text-ink"><FileText size={13} className="text-muted" /> {name}</span>
                <span className={cn("text-[11px] font-semibold", pct === 100 ? "text-success" : "text-muted")}>{status}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-line-soft">
                <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.2 + i * 0.15, ease }} className={cn("h-full rounded-full", pct === 100 ? "bg-success" : "bg-navy")} />
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export function ExtractionScreen() {
  return (
    <Shell screen="extraction" title="Receipts · tesco-receipt.jpg">
      <div className="grid h-full gap-3 sm:grid-cols-[1fr_1.2fr]">
        <Rise className="flex items-center justify-center rounded-xl border border-line-soft bg-white p-4">
          <div className="w-36 rounded-sm bg-[#fffdf7] p-3 font-mono text-[9px] leading-relaxed text-ink shadow-card" aria-hidden>
            <div className="text-center text-[11px] font-extrabold tracking-widest">TESCO</div>
            <div className="text-center text-faint">02/10/2026 14:32</div>
            <div className="my-1 border-t border-dashed border-line" />
            {[["A4 Paper", "18.50"], ["Pens x20", "6.80"], ["Toner", "14.20"], ["Notes", "3.00"]].map(([a, b]) => (
              <div key={a} className="flex justify-between"><span>{a}</span><span>{b}</span></div>
            ))}
            <div className="my-1 border-t border-dashed border-line" />
            <div className="flex justify-between font-bold"><span>VAT</span><span>8.50</span></div>
            <div className="flex justify-between font-bold"><span>TOTAL</span><span>51.00</span></div>
          </div>
        </Rise>
        <div className="rounded-xl border border-line-soft bg-white p-3">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand"><Sparkles size={12} /> AI extraction</div>
          <dl className="mt-2 divide-y divide-line-soft">
            {DEMO_RECEIPT_FIELDS.slice(0, 6).map((f, i) => (
              <Rise key={f.key} delay={0.15 + i * 0.12} className="flex items-center justify-between py-1.5 text-[12px]">
                <dt className="text-muted">{f.label}</dt>
                <dd className="flex items-center gap-1.5 font-semibold tabular text-ink">
                  {f.value}
                  {i < 2 ? <AiChip /> : <Badge tone="success" className="px-1.5 py-0"><Check size={9} /> {Math.round(f.confidence * 100)}%</Badge>}
                </dd>
              </Rise>
            ))}
          </dl>
        </div>
      </div>
    </Shell>
  );
}

export function CategoriseScreen() {
  const rows = DEMO_EXPENSES.slice(0, 5);
  return (
    <Shell screen="categorise" title="Receipts · Categorisation">
      <div className="rounded-xl border border-line-soft bg-white">
        <div className="grid grid-cols-[1fr_auto] gap-2 border-b border-line-soft px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint sm:grid-cols-[1.2fr_1fr_auto]">
          <span>Supplier</span>
          <span className="hidden sm:block">Category</span>
          <span className="text-right">Amount</span>
        </div>
        {rows.map((r, i) => (
          <Rise key={r.id} delay={0.1 + i * 0.12} className="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-line-soft px-3 py-2 text-[12px] last:border-0 sm:grid-cols-[1.2fr_1fr_auto]">
            <div>
              <div className="font-medium text-ink">{r.supplier}</div>
              <div className="text-[10px] text-faint">{r.date}</div>
              <div className="mt-1 sm:hidden"><Badge tone="navy">{r.category}</Badge></div>
            </div>
            <div className="hidden items-center gap-1.5 sm:flex">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.12, duration: 0.3 }}
              >
                <Badge tone="navy">{r.category}</Badge>
              </motion.span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.12 }}>
                <AiChip label="auto" />
              </motion.span>
            </div>
            <div className="text-right font-semibold tabular text-ink">{gbp(r.amount)}</div>
          </Rise>
        ))}
      </div>
    </Shell>
  );
}

export function MatchingScreen() {
  const pairs = [
    ["AMAZON BUSINESS", "-£125.40", "Amazon Business · INV-204-88213", true],
    ["GOOGLE WORKSPACE", "-£118.80", "Google Cloud EMEA · GW-9931", true],
    ["TESCO STORES 2041", "-£51.00", "Tesco · TSC-48213-09", true],
    ["TRAINLINE", "-£86.20", "No document yet", false],
  ] as const;
  return (
    <Shell screen="matching" title="Bank feeds · Business current">
      <div className="space-y-2">
        {pairs.map(([bank, amt, doc, ok], i) => (
          <Rise key={bank} delay={0.1 + i * 0.12} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-xl border border-line-soft bg-white p-3 text-[12px]">
            <div>
              <div className="flex items-center gap-1.5 font-medium text-ink"><Landmark size={12} className="text-muted" /> {bank}</div>
              <div className="tabular text-muted">{amt}</div>
            </div>
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.45 + i * 0.12, type: "spring", stiffness: 300, damping: 20 }}
              className={cn("flex size-7 items-center justify-center rounded-full", ok ? "bg-success text-white" : "border border-dashed border-line text-faint")}
            >
              {ok ? <Check size={14} /> : <span className="text-[10px]">?</span>}
            </motion.div>
            <div className="text-right">
              <div className={cn("font-medium", ok ? "text-ink" : "text-faint")}>{doc}</div>
              <div className={cn("text-[11px] font-semibold", ok ? "text-success" : "text-warn")}>{ok ? "Matched" : "Pending"}</div>
            </div>
          </Rise>
        ))}
      </div>
    </Shell>
  );
}

export function ReportingScreen() {
  const max = Math.max(...DEMO_VAT_MONTHS.map((m) => m.collected));
  return (
    <Shell screen="reporting" title="Reports · VAT summary">
      <div className="grid grid-cols-3 gap-2">
        <Rise><Tile label="VAT collected" value="£14,040" /></Rise>
        <Rise delay={0.05}><Tile label="VAT paid" value="£8,550" /></Rise>
        <Rise delay={0.1}><Tile label="Net VAT" value="£5,490" accent /></Rise>
      </div>
      <Rise delay={0.15} className="mt-3 rounded-xl border border-line-soft bg-white p-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Jul – Sep 2026</span>
          <span className="flex gap-3 text-[10px] text-muted">
            <span className="flex items-center gap-1"><span className="size-2 rounded-[2px] bg-[#2F46A6]" /> Collected</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-[2px] bg-brand" /> Paid</span>
          </span>
        </div>
        <div className="mt-3 flex h-24 items-end justify-around gap-4" aria-hidden>
          {DEMO_VAT_MONTHS.map((m, i) => (
            <div key={m.month} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              <div className="flex h-full w-full items-end justify-center gap-0.5">
                <motion.div initial={{ height: 0 }} animate={{ height: `${(m.collected / max) * 100}%` }} transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease }} className="w-5 rounded-t-[3px] bg-[#2F46A6]" />
                <motion.div initial={{ height: 0 }} animate={{ height: `${(m.paid / max) * 100}%` }} transition={{ duration: 0.8, delay: 0.35 + i * 0.1, ease }} className="w-5 rounded-t-[3px] bg-brand" />
              </div>
              <span className="text-[10px] font-medium text-muted">{m.month}</span>
            </div>
          ))}
        </div>
      </Rise>
    </Shell>
  );
}

export const SCREEN_COMPONENTS: Record<DemoScreenKey, () => ReactNode> = {
  dashboard: DashboardScreen,
  upload: UploadScreen,
  extraction: ExtractionScreen,
  categorise: CategoriseScreen,
  matching: MatchingScreen,
  reporting: ReportingScreen,
};
