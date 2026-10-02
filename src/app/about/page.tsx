import { Lock, ShieldCheck, Sparkles, Cpu } from "lucide-react";
import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { PhotoFeature } from "@/components/PhotoFeature";
import { ProductWorkflow } from "@/components/ProductWorkflow";
import { RelatedPages } from "@/components/RelatedPages";
import type { NavLink } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "About",
  description: "DexAI turns receipts, invoices and financial documents into organised, actionable financial data, automatically.",
  alternates: { canonical: "/about" },
};

const LEARN_MORE: NavLink[] = [
  { label: "Agentic AI", href: "/product/agentic-ai", description: "Specialist agents for every step.", icon: Sparkles },
  { label: "Technology", href: "/technology", description: "The OCR and VLM models behind DexAI.", icon: Cpu },
  { label: "Security & Trust", href: "/security", description: "How financial records are handled.", icon: Lock },
  { label: "Why DexAI", href: "/why-dexai", description: "What changes when you automate.", icon: ShieldCheck },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About DexAI"
        title="Financial automation, powered by AI."
        description="DexAI transforms receipts, invoices and financial documents into organised, actionable financial data, so finance work starts from clean records instead of paperwork."
        crumbs={[{ label: "About" }]}
      />
      <PhotoFeature
        photo="team"
        eyebrow="What we do"
        title="Less retyping. More time on the business."
        description="Every document goes through the same path: capture, AI extraction, categorisation, bank matching and reporting. People step in only where confidence is low."
        bullets={["AI receipt scanning and document processing", "Bank reconciliation and VAT reporting", "Multi-company management and accounting integrations"]}
        cta={{ label: "Explore the product", href: "/product" }}
      />
      <ProductWorkflow />
      <RelatedPages eyebrow="Learn more" title="Go deeper into DexAI" links={LEARN_MORE} columns={4} className="border-y border-line bg-surface" />
      <CTA />
    </>
  );
}
