import type { Metadata } from "next";
import { AutomationPipeline } from "@/components/AutomationPipeline";
import { CTA } from "@/components/CTA";
import { DocumentProcessing } from "@/components/DocumentProcessing";
import { PageHero } from "@/components/PageHero";
import { PhotoFeature } from "@/components/PhotoFeature";
import { ProductScreenshot } from "@/components/ProductScreenshot";
import { ProductWorkflow } from "@/components/ProductWorkflow";
import { RelatedPages } from "@/components/RelatedPages";
import { getGroup } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Product",
  description: "How DexAI works end to end: capture, AI extraction, categorisation, bank reconciliation and VAT reporting in one platform.",
  alternates: { canonical: "/product" },
};

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="One platform from receipt to records."
        description="DexAI takes every receipt, invoice and financial document through the same pipeline: capture, AI extraction, categorisation, bank matching and reporting."
        crumbs={[{ label: "Product" }]}
      />
      <ProductWorkflow hideHeading />
      <PhotoFeature
        photo="receipts"
        reverse
        tone="surface"
        eyebrow="Start with the paper"
        title="Every receipt becomes a record the moment it's captured."
        description="Snap it, upload it or forward the email. DexAI reads the supplier, date, VAT and total, files the original, and moves the expense through categorisation and matching without retyping."
        bullets={["Supplier, date, reference, VAT and totals extracted", "Original image kept with the record", "Flagged for review only when confidence is low"]}
        cta={{ label: "AI receipt scanning", href: "/product/receipt-scanning" }}
        badge={
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Extracted</div>
            <div className="mt-0.5 text-xl font-bold text-ink">
              Tesco · <span className="tabular">£51.00</span>
            </div>
            <div className="text-[13px] font-medium text-success">VAT £8.50 · 99% confidence · sample</div>
          </div>
        }
      />
      <DocumentProcessing />
      <ProductScreenshot />
      <AutomationPipeline />
      <RelatedPages eyebrow="Go deeper" title="Explore the product" links={getGroup("Product").items!} />
      <CTA />
    </>
  );
}
