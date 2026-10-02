import { ArrowLeftRight, ArrowUpRight, BarChart3, Building2, Camera, FileText, Landmark, Percent, Route, Wallet, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn, pad2, sectionPad, type SectionProps } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export const FEATURES: Feature[] = [
  { icon: Camera, title: "AI Receipt Capture", description: "Photograph, upload or forward receipts and let AI extract the details.", href: "/product/receipt-scanning" },
  { icon: FileText, title: "Invoice Processing", description: "Supplier invoices are read, validated and recorded with their references.", href: "/features/invoice-processing" },
  { icon: Wallet, title: "Expense Management", description: "Categorised, VAT-aware expenses with search, filters and status tracking.", href: "/product/expense-management" },
  { icon: Landmark, title: "Bank Feeds", description: "Connect business accounts and keep transactions flowing in automatically.", href: "/product/bank-reconciliation" },
  { icon: ArrowLeftRight, title: "Transaction Matching", description: "Pair documents with bank transactions on amount, supplier and date.", href: "/features/transaction-matching" },
  { icon: Percent, title: "VAT Reporting", description: "Track VAT collected and paid, with reports built for Making Tax Digital workflows.", href: "/product/vat-reporting" },
  { icon: Route, title: "Mileage Tracking", description: "Log business journeys and apply the appropriate HMRC mileage rates.", href: "/features/mileage-tracking" },
  { icon: Building2, title: "Multi-Company Management", description: "Manage several entities from one login with separate books for each.", href: "/features/multi-company" },
  { icon: BarChart3, title: "Financial Analytics", description: "Spending by category, supplier and period, ready to export.", href: "/features/financial-analytics" },
];

export function FeatureGrid({ hideHeading }: SectionProps) {
  return (
    <section id="features" className={cn("scroll-mt-24", sectionPad(hideHeading))} aria-label="Features">
      <div className="container-x">
        {!hideHeading ? (
          <SectionHeading
            id="features-title"
            eyebrow="Features"
            title="Everything your finance workflow needs."
            description="From the first photo of a receipt to the final VAT return, each capability is designed to remove a manual step."
          />
        ) : null}
        {/* Hairline grid: cards share borders instead of floating */}
        <Stagger as="ul" className={cn("grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3", !hideHeading && "mt-14 lg:mt-20")}>
          {FEATURES.map(({ icon: Icon, title, description, href }, i) => (
            <StaggerItem as="li" key={title} className="bg-white">
              <Link href={href} className="group relative flex h-full flex-col p-7 transition-colors duration-300 hover:bg-surface">
                <div className="flex items-start justify-between">
                  <span className="inline-flex size-11 items-center justify-center rounded-lg border border-line bg-surface text-navy transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[11px] text-faint">
                    {pad2(i + 1)}
                    <ArrowUpRight size={14} className="transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" aria-hidden />
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-ink">{title}</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-body">{description}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
