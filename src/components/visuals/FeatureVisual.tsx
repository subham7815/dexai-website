import { Building2, Check, FileText, Landmark, Route } from "lucide-react";
import type { FeaturePage } from "@/lib/content/features";
import { cn, gbp } from "@/lib/utils";
import { AiChip, Badge, DemoTag } from "../ui/Badge";
import { BrowserFrame } from "../ui/BrowserFrame";

/** Static product-style visuals for feature pages. All values are sample data. */
export function FeatureVisual({ kind }: { kind: FeaturePage["visual"] }) {
  return (
    <BrowserFrame url={`app.dexai.app/${kind}`} bodyClassName="bg-surface p-4 sm:p-5" aside={<DemoTag />}>
      {kind === "invoice" ? <InvoiceVisual /> : null}
      {kind === "matching" ? <MatchingVisual /> : null}
      {kind === "mileage" ? <MileageVisual /> : null}
      {kind === "companies" ? <CompaniesVisual /> : null}
      {kind === "analytics" ? <AnalyticsVisual /> : null}
    </BrowserFrame>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-xl border border-line-soft bg-white p-4", className)}>{children}</div>;
}

function InvoiceVisual() {
  const lines = [
    ["Design services · Sep", 1, 1200],
    ["Hosting (Sep)", 1, 96],
    ["Domain renewal", 2, 12],
  ] as const;
  const net = lines.reduce((s, l) => s + l[1] * l[2], 0);
  const vat = net * 0.2;
  return (
    <div className="grid gap-3 sm:grid-cols-5">
      <Card className="sm:col-span-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-ink">
            <FileText size={15} className="text-muted" /> INV-2041
          </div>
          <Badge tone="navy">Northwind Studio Ltd</Badge>
        </div>
        <table className="mt-3 w-full text-[13px]">
          <thead className="text-[10px] uppercase tracking-wider text-faint">
            <tr>
              <th className="pb-1 text-left font-semibold">Item</th>
              <th className="pb-1 text-right font-semibold">Qty</th>
              <th className="pb-1 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {lines.map(([n, q, a]) => (
              <tr key={n}>
                <td className="py-1.5 text-ink">{n}</td>
                <td className="py-1.5 text-right tabular text-muted">{q}</td>
                <td className="py-1.5 text-right font-semibold tabular text-ink">{gbp(q * a)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="sm:col-span-2">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Extracted</div>
        <dl className="mt-2 space-y-2 text-[13px]">
          {[
            ["Net", gbp(net)],
            ["VAT 20%", gbp(vat)],
            ["Gross", gbp(net + vat)],
            ["Due", "30 Oct 2026"],
          ].map(([k, v], i) => (
            <div key={k} className="flex items-center justify-between">
              <dt className="text-muted">{k}</dt>
              <dd className="flex items-center gap-1.5 font-semibold tabular text-ink">
                {v} {i === 2 ? <AiChip /> : null}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-success">
          <Check size={12} /> Totals validated
        </div>
      </Card>
    </div>
  );
}

function MatchingVisual() {
  const rows = [
    ["AMAZON BUSINESS", "-£125.40", "Amazon Business · INV-204-88213", true],
    ["GOOGLE WORKSPACE", "-£118.80", "Google Cloud EMEA · GW-9931", true],
    ["TESCO STORES 2041", "-£51.00", "Tesco · TSC-48213-09", true],
    ["TRAINLINE", "-£86.20", "No document yet", false],
  ] as const;
  return (
    <div className="space-y-2">
      {rows.map(([bank, amt, doc, ok]) => (
        <Card key={bank} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-[13px]">
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-ink">
              <Landmark size={13} className="text-muted" /> {bank}
            </div>
            <div className="tabular text-muted">{amt}</div>
          </div>
          <span className={cn("flex size-7 items-center justify-center rounded-full", ok ? "bg-success text-white" : "border border-dashed border-line text-faint")}>
            {ok ? <Check size={14} /> : "?"}
          </span>
          <div className="text-right">
            <div className={cn("font-medium", ok ? "text-ink" : "text-faint")}>{doc}</div>
            <div className={cn("text-[12px] font-semibold", ok ? "text-success" : "text-warn")}>{ok ? "Matched" : "Pending"}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function MileageVisual() {
  const trips = [
    ["Client visit · Manchester", "02 Oct 2026", 84],
    ["Site survey · Leeds", "29 Sep 2026", 46],
    ["Supplier meeting · Sheffield", "25 Sep 2026", 38],
  ] as const;
  const rate = 0.45;
  const total = trips.reduce((s, t) => s + t[2], 0);
  return (
    <div className="grid gap-3 sm:grid-cols-5">
      <Card className="sm:col-span-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Journeys this month</div>
        <ul className="mt-2 divide-y divide-line-soft">
          {trips.map(([n, d, mi]) => (
            <li key={n} className="flex items-center justify-between py-2 text-[13px]">
              <div className="flex items-center gap-2">
                <Route size={14} className="text-navy" />
                <div>
                  <div className="font-semibold text-ink">{n}</div>
                  <div className="text-[11px] text-muted">{d}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold tabular text-ink">{mi} mi</div>
                <div className="text-[11px] tabular text-muted">{gbp(mi * rate)}</div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <div className="grid gap-3 sm:col-span-2">
        <Card>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Total miles</div>
          <div className="mt-1 text-2xl font-bold tabular text-ink">{total}</div>
        </Card>
        <Card className="border-navy bg-navy text-white">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">Claim at HMRC rate</div>
          <div className="mt-1 text-2xl font-bold tabular">{gbp(total * rate)}</div>
          <div className="text-[11px] text-white/70">45p per mile applied</div>
        </Card>
      </div>
    </div>
  );
}

function CompaniesVisual() {
  const cos = [
    ["Acme Studio Ltd", "£1,031.49", "£153.61", 1, true],
    ["Acme Retail Ltd", "£4,280.10", "£712.40", 3, false],
    ["Acme Holdings Ltd", "£640.00", "£106.67", 0, false],
  ] as const;
  return (
    <div className="space-y-2">
      {cos.map(([n, exp, vat, pend, active]) => (
        <Card key={n} className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-3", active && "border-navy/30 ring-1 ring-navy/20")}>
          <span className={cn("flex size-9 items-center justify-center rounded-lg", active ? "bg-navy text-white" : "bg-navy-soft text-navy")}>
            <Building2 size={16} />
          </span>
          <div>
            <div className="text-[14px] font-bold text-ink">{n}</div>
            <div className="text-[12px] text-muted">
              Expenses <span className="tabular text-ink">{exp}</span> · VAT <span className="tabular text-ink">{vat}</span>
            </div>
          </div>
          {pend > 0 ? <Badge tone="warn">{pend} pending</Badge> : <Badge tone="success">Up to date</Badge>}
        </Card>
      ))}
    </div>
  );
}

function AnalyticsVisual() {
  const cats = [
    ["Rent", 540],
    ["Equipment", 125.4],
    ["Software", 118.8],
    ["Travel", 109.8],
    ["Fuel", 72.14],
    ["Office supplies", 51],
  ] as const;
  const max = cats[0][1];
  return (
    <div className="grid gap-3 sm:grid-cols-5">
      <Card className="sm:col-span-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Spend by category · Sep 2026</div>
        <ul className="mt-3 space-y-2.5">
          {cats.map(([n, v], i) => (
            <li key={n}>
              <div className="flex justify-between text-[12px]">
                <span className="text-muted">{n}</span>
                <span className="font-semibold tabular text-ink">{gbp(v)}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-line-soft">
                <div className={cn("h-full rounded-full", i === 0 ? "bg-brand" : "bg-navy/80")} style={{ width: `${(v / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <div className="grid gap-3 sm:col-span-2">
        {[
          ["Total spend", "£1,017.14"],
          ["VAT reclaimable", "£153.61"],
          ["Top supplier", "WeWork"],
        ].map(([k, v], i) => (
          <Card key={k} className={cn(i === 0 && "border-navy bg-navy text-white")}>
            <div className={cn("text-[11px] font-semibold uppercase tracking-wider", i === 0 ? "text-white/70" : "text-faint")}>{k}</div>
            <div className={cn("mt-1 text-xl font-bold tabular", i === 0 ? "text-white" : "text-ink")}>{v}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
