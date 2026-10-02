import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AutomationPipeline } from "@/components/AutomationPipeline";
import { BankMatching } from "@/components/BankMatching";
import { BenefitGrid } from "@/components/BenefitGrid";
import { CTA } from "@/components/CTA";
import { DocumentProcessing } from "@/components/DocumentProcessing";
import { ExpenseDashboard } from "@/components/ExpenseDashboard";
import { PageHero } from "@/components/PageHero";
import { ReceiptScanner } from "@/components/ReceiptScanner";
import { RelatedPages } from "@/components/RelatedPages";
import { StepsList } from "@/components/StepsList";
import { VatReporting } from "@/components/VatReporting";
import { PRODUCT_PAGES, PRODUCT_SLUGS, type ProductSlug } from "@/lib/content/product";
import { getGroup } from "@/lib/navigation";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = PRODUCT_PAGES[slug as ProductSlug];
  if (!page) return {};
  return {
    title: page.navLabel,
    description: page.metaDescription,
    alternates: { canonical: `/product/${slug}` },
  };
}

/** Which live mockup section to render for each product page, and the tone of the sections that follow. */
const BODY: Record<ProductSlug, { Body: React.ComponentType<{ hideHeading?: boolean }>; benefitsTone: "light" | "surface"; stepsTone: "light" | "surface" }> = {
  "receipt-scanning": { Body: ReceiptScanner, benefitsTone: "light", stepsTone: "surface" },
  "document-processing": { Body: DocumentProcessing, benefitsTone: "surface", stepsTone: "light" },
  "expense-management": { Body: ExpenseDashboard, benefitsTone: "light", stepsTone: "surface" },
  "bank-reconciliation": { Body: BankMatching, benefitsTone: "surface", stepsTone: "light" },
  "vat-reporting": { Body: VatReporting, benefitsTone: "surface", stepsTone: "light" },
  automation: { Body: AutomationPipeline, benefitsTone: "light", stepsTone: "surface" },
};

export default async function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = PRODUCT_PAGES[slug as ProductSlug];
  if (!page) notFound();

  const { Body, benefitsTone, stepsTone } = BODY[page.slug];
  const related = getGroup("Product").items!.filter((i) => i.href !== `/product/${page.slug}`);

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        crumbs={[{ label: "Product", href: "/product" }, { label: page.navLabel }]}
      />
      <Body hideHeading />
      <BenefitGrid benefits={page.benefits} tone={benefitsTone} eyebrow="Why it matters" title="What you get" />
      <StepsList steps={page.steps} tone={stepsTone} />
      <RelatedPages eyebrow="More of the product" title="Keep exploring DexAI" links={related} />
      <CTA />
    </>
  );
}
