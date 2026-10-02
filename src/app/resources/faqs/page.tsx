import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about DexAI: the product, bank feeds and VAT, integrations and technology, and getting started.",
  alternates: { canonical: "/resources/faqs" },
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Questions, answered."
        description="Short answers about the product, bank feeds, VAT, integrations and getting started."
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "FAQs" }]}
        noActions
      />
      <FAQ hideHeading />
      <CTA />
    </>
  );
}
