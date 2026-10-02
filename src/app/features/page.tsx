import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { FeatureGrid } from "@/components/FeatureGrid";
import { PageHero } from "@/components/PageHero";
import { RelatedPages } from "@/components/RelatedPages";
import { Photo, PhotoBadge } from "@/components/ui/Photo";
import { getGroup } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Features",
  description: "Every DexAI capability: AI receipt capture, invoice processing, expense management, bank feeds, matching, VAT reporting, mileage, multi-company and analytics.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything your finance workflow needs."
        description="From the first photo of a receipt to the final VAT return, each capability is designed to remove a manual step. Open any card to go deeper."
        crumbs={[{ label: "Features" }]}
      >
        <Photo photo="typing" aspect="aspect-[5/4]" shade priority>
          <PhotoBadge className="bottom-4 left-4 sm:bottom-6 sm:left-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Nine capabilities</div>
            <div className="mt-0.5 text-[15px] font-bold text-ink">Capture → extract → categorise → match → report</div>
          </PhotoBadge>
        </Photo>
      </PageHero>
      <FeatureGrid hideHeading />
      <RelatedPages eyebrow="Deep dives" title="Feature guides" links={getGroup("Features").items!} className="border-y border-line bg-surface" />
      <CTA />
    </>
  );
}
