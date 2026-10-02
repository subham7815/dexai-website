import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { ProductDemo } from "@/components/ProductDemo";
import { RelatedPages } from "@/components/RelatedPages";
import { getGroup } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Product Demo",
  description: "Interactive walkthrough of DexAI: dashboard, receipt upload, AI extraction, categorisation, bank matching and reporting.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Product demo"
        title="See DexAI in action."
        description="Walk through the product from first upload to final report. Play the demo or explore each step yourself."
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "Product Demo" }]}
        align="center"
        noActions
      />
      <ProductDemo hideHeading />
      <RelatedPages eyebrow="Go deeper" title="Explore each capability" links={getGroup("Product").items!} />
      <CTA />
    </>
  );
}
