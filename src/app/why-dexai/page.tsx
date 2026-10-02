import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { PhotoFeature } from "@/components/PhotoFeature";
import { ProductWorkflow } from "@/components/ProductWorkflow";
import { WhyDexAI } from "@/components/WhyDexAI";

export const metadata: Metadata = {
  title: "Why DexAI",
  description: "Less manual data entry, better financial visibility, faster reconciliation and smarter reporting with DexAI.",
  alternates: { canonical: "/why-dexai" },
};

export default function WhyDexAIPage() {
  return (
    <>
      <PageHero
        eyebrow="Why DexAI"
        title="Built for the way modern finance teams actually work."
        description="DexAI replaces the repetitive parts of bookkeeping with a reliable, reviewable automation layer, so the time you spend on finance is spent on decisions."
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "Why DexAI" }]}
      />
      <WhyDexAI hideHeading />
      <PhotoFeature
        photo="team"
        tone="surface"
        eyebrow="The outcome"
        title="Time back for the work that needs a person."
        description="When capture, extraction, categorisation and matching run on their own, finance time goes to review and decisions instead of data entry."
        bullets={["No retyping from receipts or invoices", "Reconciliation becomes a review of exceptions", "VAT figures ready throughout the period"]}
        cta={{ label: "Try the product demo", href: "/demo" }}
        badge={
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">This month</div>
            <div className="mt-0.5 text-2xl font-bold tabular text-ink">0 retyped</div>
            <div className="text-[13px] font-medium text-success">Every document captured once · sample</div>
          </div>
        }
      />
      <ProductWorkflow />
      <CTA />
    </>
  );
}
