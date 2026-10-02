import { Building2, FileText, Landmark, Percent, Receipt, Tags, type LucideIcon } from "lucide-react";
import { cn, pad2, sectionPad, type SectionProps } from "@/lib/utils";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const DATA: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Receipt, title: "Receipts and invoices", description: "Captured and extracted by DexAI, ready to pass on." },
  { icon: Tags, title: "Categories", description: "Expenses categorised before they reach your books." },
  { icon: Building2, title: "Supplier details", description: "Supplier names, references and invoice details." },
  { icon: Landmark, title: "Bank matches", description: "Transactions matched to the documents behind them." },
  { icon: Percent, title: "VAT amounts", description: "VAT rates and amounts captured on each record." },
  { icon: FileText, title: "Source documents", description: "The original document stays attached to the record." },
];

/** Icon grid showing what DexAI hands over to a connected tool. */
export function IntegrationData({ hideHeading }: SectionProps) {
  return (
    <section className={cn("scroll-mt-24", sectionPad(hideHeading))} aria-label="What DexAI sends to your tools">
      <div className="container-x">
        {!hideHeading ? (
          <SectionHeading
            eyebrow="What flows through"
            title="Clean data in, whichever tool you use."
            description="Whichever integration you choose, DexAI passes on the same organised records."
          />
        ) : null}
        <Reveal className={cn(!hideHeading && "mt-14 lg:mt-20")}>
          <Stagger as="ul" className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {DATA.map((d, i) => {
              const Icon = d.icon;
              return (
                <StaggerItem as="li" key={d.title} className="bg-white">
                  <div className="group flex h-full items-start gap-5 p-6 transition-colors duration-300 hover:bg-surface lg:p-8">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-navy/15 bg-navy-soft text-navy transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <Icon size={26} strokeWidth={1.7} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold tracking-tight text-ink">{d.title}</h3>
                        <span className="font-mono text-[10px] text-faint">{pad2(i + 1)}</span>
                      </div>
                      <p className="mt-1.5 text-[16px] leading-relaxed text-body">{d.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
}
