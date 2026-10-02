import type { Metadata } from "next";
import { AgenticAI } from "@/components/AgenticAI";
import { Architecture } from "@/components/Architecture";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { RelatedPages } from "@/components/RelatedPages";
import { Technology } from "@/components/Technology";
import { getGroup } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Agentic AI",
  description: "DexAI's specialist AI agents: classification, extraction, validation, reconciliation, reporting and data migration, working as one connected workflow.",
  alternates: { canonical: "/product/agentic-ai" },
};

export default function AgenticAIPage() {
  return (
    <>
      <PageHero
        eyebrow="Agentic AI"
        title="Not one model. A team of specialist agents."
        description="DexAI is not simply OCR or an accounting add-on. Each document is handled by a chain of focused AI agents, from classification to reconciliation, with a person brought in only where confidence is low."
        crumbs={[{ label: "Product", href: "/product" }, { label: "Agentic AI" }]}
      />
      <AgenticAI hideHeading />
      <Technology />
      <Architecture />
      <RelatedPages eyebrow="More of the product" title="Keep exploring DexAI" links={getGroup("Product").items!.filter((i) => i.href !== "/product/agentic-ai")} columns={4} />
      <CTA />
    </>
  );
}
