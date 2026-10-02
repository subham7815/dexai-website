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
import { Photo, PhotoBadge } from "@/components/ui/Photo";
import { StepsList } from "@/components/StepsList";
import { VatReporting } from "@/components/VatReporting";
import { PRODUCT_PAGES, PRODUCT_SLUGS, type ProductSlug } from "@/lib/content/product";
import { getGroup } from "@/lib/navigation";
import type { PhotoKey } from "@/lib/photos";

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

/** Hero photograph and caption for each product page (stock photography). */
const HERO_PHOTO: Record<ProductSlug, { photo: PhotoKey; badge: string; sub: string }> = {
  "receipt-scanning": { photo: "receiptOnTable", badge: "Receipt captured", sub: "Original image kept with the record" },
  "document-processing": { photo: "receipts", badge: "Documents in, data out", sub: "Receipts, invoices and statements" },
  "expense-management": { photo: "shopCounter", badge: "Expenses, organised", sub: "Categorised as they arrive" },
  "bank-reconciliation": { photo: "typing", badge: "Bank lines matched", sub: "Each transaction tied to its document" },
  "vat-reporting": { photo: "conferenceRoom", badge: "VAT, period by period", sub: "Figures stay current as documents are processed" },
  automation: { photo: "team", badge: "Less retyping", sub: "Routine steps run on their own" },
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
      >
        <Photo photo={HERO_PHOTO[page.slug].photo} aspect="aspect-[5/4]" shade priority>
          <PhotoBadge className="bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
            <div className="text-[15px] font-bold text-ink">{HERO_PHOTO[page.slug].badge}</div>
            <div className="mt-0.5 text-[13px] text-muted">{HERO_PHOTO[page.slug].sub}</div>
          </PhotoBadge>
        </Photo>
      </PageHero>
      <Body hideHeading />
      <BenefitGrid benefits={page.benefits} tone={benefitsTone} eyebrow="Why it matters" title="What you get" />
      <StepsList steps={page.steps} tone={stepsTone} />
      <RelatedPages eyebrow="More of the product" title="Keep exploring DexAI" links={related} />
      <CTA />
    </>
  );
}
