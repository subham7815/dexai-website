import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BenefitGrid } from "@/components/BenefitGrid";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { PhotoFeature } from "@/components/PhotoFeature";
import { RelatedPages } from "@/components/RelatedPages";
import { StepsList } from "@/components/StepsList";
import { FeatureVisual } from "@/components/visuals/FeatureVisual";
import { FEATURE_PAGES, FEATURE_SLUGS, type FeatureSlug } from "@/lib/content/features";
import { getGroup } from "@/lib/navigation";
import type { PhotoKey } from "@/lib/photos";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return FEATURE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = FEATURE_PAGES[slug as FeatureSlug];
  if (!page) return {};
  return { title: page.navLabel, description: page.metaDescription, alternates: { canonical: `/features/${slug}` } };
}

/** Editorial photo section for each feature page (stock photography, no customer implied). */
const PHOTO: Record<FeatureSlug, { photo: PhotoKey; eyebrow: string; title: string; description: string }> = {
  "invoice-processing": { photo: "financeDesk", eyebrow: "In practice", title: "Invoices in, records out.", description: "Supplier invoices go in as files and come out as structured records, so nobody retypes line items." },
  "transaction-matching": { photo: "accountantDesk", eyebrow: "In practice", title: "Every bank line, matched to its document.", description: "Transactions are tied to the receipts and invoices behind them, so reconciliation starts from evidence." },
  "mileage-tracking": { photo: "freelancerCoffee", eyebrow: "In practice", title: "Log the trip, not the paperwork.", description: "Journeys are recorded with start, end and distance, and claims are calculated at HMRC rates." },
  "multi-company": { photo: "boardMeeting", eyebrow: "In practice", title: "One login, separate books.", description: "Run several entities from one place while each keeps its own documents, expenses and reports." },
  "financial-analytics": { photo: "cafeOwners", eyebrow: "In practice", title: "See where the money goes.", description: "Spending by category and period, built from the documents you have already processed." },
};

export default async function FeatureDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = FEATURE_PAGES[slug as FeatureSlug];
  if (!page) notFound();

  const others = getGroup("Features").items!.filter((i) => i.href !== `/features/${page.slug}`);

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        crumbs={[{ label: "Features", href: "/features" }, { label: page.navLabel }]}
      >
        <FeatureVisual kind={page.visual} />
      </PageHero>
      <BenefitGrid benefits={page.benefits} tone="surface" eyebrow="Why it matters" title="What you get" />
      <PhotoFeature photo={PHOTO[page.slug].photo} eyebrow={PHOTO[page.slug].eyebrow} title={PHOTO[page.slug].title} description={PHOTO[page.slug].description} reverse />
      <StepsList steps={page.steps} tone="surface" />
      <RelatedPages eyebrow="More features" title="Keep exploring" links={others} columns={4} />
      <CTA />
    </>
  );
}
