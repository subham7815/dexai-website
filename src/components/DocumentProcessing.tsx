import { FileText, Landmark, Percent, Receipt, Wallet, type LucideIcon } from "lucide-react";
import { cn, pad2, sectionPad, type SectionProps } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";

interface DocCard {
  icon: LucideIcon;
  title: string;
  description: string;
  visual: "receipt" | "invoice" | "bank" | "expense" | "vat";
  span: string;
}

const CARDS: DocCard[] = [
  { icon: Receipt, title: "Receipt Processing", description: "Photos, scans and emailed receipts become supplier, date, amount and VAT fields.", visual: "receipt", span: "lg:col-span-2" },
  { icon: FileText, title: "Invoice Processing", description: "Supplier invoices are read line by line, with totals and references captured.", visual: "invoice", span: "lg:col-span-2" },
  { icon: Landmark, title: "Bank Statements", description: "Transactions are organised and prepared for matching against your documents.", visual: "bank", span: "lg:col-span-2" },
  { icon: Wallet, title: "Expense Documents", description: "Travel, mileage and out-of-pocket claims flow into the right expense categories.", visual: "expense", span: "lg:col-span-3" },
  { icon: Percent, title: "VAT Documents", description: "VAT amounts and rates are extracted so reporting periods stay accurate.", visual: "vat", span: "lg:col-span-3" },
];

function Visual({ kind }: { kind: DocCard["visual"] }) {
  const wrap = "mt-6 h-[108px] overflow-hidden rounded-lg border border-line bg-surface p-3 transition-transform duration-500 ease-out group-hover:-translate-y-1";
  switch (kind) {
    case "receipt":
      return (
        <div className={wrap} aria-hidden>
          <div className="mx-auto w-28 rounded-sm border border-line-soft bg-white p-2">
            <div className="mx-auto mb-1.5 h-1.5 w-10 rounded bg-ink/60" />
            {[9, 7, 8, 6].map((w, i) => (
              <div key={i} className="mb-1 flex justify-between">
                <div className="h-1 rounded bg-ink/15" style={{ width: `${w * 5}px` }} />
                <div className="h-1 w-4 rounded bg-ink/25" />
              </div>
            ))}
            <div className="mt-1.5 flex justify-between">
              <div className="h-1.5 w-8 rounded bg-brand/70" />
              <div className="h-1.5 w-5 rounded bg-brand/70" />
            </div>
          </div>
        </div>
      );
    case "invoice":
      return (
        <div className={wrap} aria-hidden>
          <div className="rounded-md border border-line-soft bg-white p-2.5">
            <div className="mb-2 flex items-center justify-between">
              <div className="h-1.5 w-12 rounded bg-navy/70" />
              <div className="rounded bg-navy-soft px-1.5 py-0.5 font-mono text-[9px] font-semibold text-navy">INV-2041</div>
            </div>
            {[["Design services", "£1,200.00"], ["Hosting (Sep)", "£96.00"], ["VAT 20%", "£259.20"]].map(([a, b]) => (
              <div key={a} className="flex justify-between py-0.5 text-[10px]">
                <span className="text-muted">{a}</span>
                <span className="font-semibold tabular text-ink">{b}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case "bank":
      return (
        <div className={wrap} aria-hidden>
          <div className="space-y-1.5">
            {[["AMAZON BUSINESS", "-£125.40", true], ["TRAINLINE", "-£86.20", false], ["GOOGLE WORKSPACE", "-£118.80", true]].map(([n, v, m]) => (
              <div key={n as string} className="flex items-center justify-between rounded-md border border-line-soft bg-white px-2.5 py-1.5 font-mono text-[10px]">
                <span className="flex items-center gap-2 text-ink">
                  <span className={cn("size-1.5 rounded-sm", m ? "bg-success" : "bg-warn")} />
                  {n}
                </span>
                <span className="font-semibold tabular text-ink">{v}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case "expense":
      return (
        <div className={wrap} aria-hidden>
          <div className="flex flex-wrap gap-1.5">
            {[["Travel", true], ["Mileage · 42 mi", true], ["Subsistence", false], ["Accommodation", false], ["Parking", false]].map(([c, on]) => (
              <span key={c as string} className={cn("rounded-md border px-2.5 py-1 text-[10px] font-semibold", on ? "border-navy bg-navy text-white" : "border-line bg-white text-muted")}>
                {c}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-md border border-line-soft bg-white px-2.5 py-1.5 text-[10px]">
            <span className="font-mono uppercase tracking-wider text-muted">Claim total</span>
            <span className="font-semibold tabular text-ink">£214.90</span>
          </div>
        </div>
      );
    default:
      return (
        <div className={wrap} aria-hidden>
          <div className="grid grid-cols-3 gap-2">
            {[["Net", "£42.50"], ["VAT 20%", "£8.50"], ["Gross", "£51.00"]].map(([k, v], i) => (
              <div key={k} className={cn("rounded-md border p-2", i === 1 ? "border-brand bg-brand text-white" : "border-line-soft bg-white")}>
                <div className={cn("font-mono text-[9px] uppercase tracking-wider", i === 1 ? "text-white/80" : "text-faint")}>{k}</div>
                <div className="text-[12px] font-bold tabular">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted">Rate detected · Standard 20%</div>
        </div>
      );
  }
}

export function DocumentProcessing({ hideHeading }: SectionProps) {
  return (
    <section id="document-processing" className={cn("scroll-mt-24 border-y border-line bg-surface", sectionPad(hideHeading))} aria-label="Document processing">
      <div className="container-x">
        {!hideHeading ? (
          <SectionHeading
            id="docs-title"
            eyebrow="Document processing"
            title="AI that understands your financial documents."
            description="Whatever lands in your inbox or camera roll, DexAI recognises the document type and extracts what matters."
          />
        ) : null}
        <Stagger as="ul" className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-6", !hideHeading && "mt-14 lg:mt-20")}>
          {CARDS.map(({ icon: Icon, title, description, visual, span }, i) => (
            <StaggerItem as="li" key={title} className={cn("md:col-span-1", span)}>
              <article className="group h-full rounded-card border border-line bg-white p-6 transition-colors duration-300 hover:border-ink/40">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-navy transition-colors duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span className="font-mono text-[11px] text-faint">{pad2(i + 1)}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">{title}</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-body">{description}</p>
                <Visual kind={visual} />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
