import { AgenticAI } from "@/components/AgenticAI";
import { CTA } from "@/components/CTA";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Hero } from "@/components/Hero";
import { Integrations } from "@/components/Integrations";
import { PhotoFeature } from "@/components/PhotoFeature";
import { ProductWorkflow } from "@/components/ProductWorkflow";
import { Technology } from "@/components/Technology";
import { TrustBar } from "@/components/TrustBar";
import { WhyDexAI } from "@/components/WhyDexAI";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProductWorkflow />
      <PhotoFeature
        photo="financeDesk"
        eyebrow="Out of the spreadsheet"
        title="Finance admin that runs itself, while you run the business."
        description="Receipts, invoices and bank lines pile up fast. DexAI captures them as they arrive, so your records are always current and month end is a quick review."
        bullets={[
          "Capture receipts by photo, upload or email forwarding",
          "AI extraction with confidence scores for anything uncertain",
          "Bank transactions matched to documents automatically",
        ]}
        cta={{ label: "See how it works", href: "/product" }}
        badge={
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Processed this week</div>
            <div className="mt-0.5 text-2xl font-bold tabular text-ink">142 documents</div>
            <div className="text-[13px] font-medium text-success">3 awaiting review · sample data</div>
          </div>
        }
        tone="surface"
      />
      <FeatureGrid />
      <AgenticAI showLink />
      <Technology />
      <Integrations />
      <WhyDexAI />
      <PhotoFeature
        photo="team"
        reverse
        eyebrow="Built for teams"
        title="One source of truth for everyone who touches the numbers."
        description="Owners, finance teams and accountants work from the same processed records, with every document, extraction and match kept together."
        bullets={["Separate books per company, one login", "Access controlled per user", "Audit-friendly history on every record"]}
        cta={{ label: "Explore solutions", href: "/solutions" }}
        badgePosition="top-right"
        badge={
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-navy text-[12px] font-bold text-white">AC</span>
            <div>
              <div className="text-[14px] font-bold text-ink">Acme Studio Ltd</div>
              <div className="text-[12px] text-muted">3 companies · sample data</div>
            </div>
          </div>
        }
      />
      <CTA />
    </>
  );
}
