import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BenefitGrid } from "@/components/BenefitGrid";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { RelatedPages } from "@/components/RelatedPages";
import { StepsList } from "@/components/StepsList";
import { FeatureVisual } from "@/components/visuals/FeatureVisual";
import { FEATURE_PAGES, FEATURE_SLUGS, type FeatureSlug } from "@/lib/content/features";
import { getGroup } from "@/lib/navigation";

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
      <StepsList steps={page.steps} tone="light" />
      <RelatedPages eyebrow="More features" title="Keep exploring" links={others} className="border-y border-line bg-surface" columns={4} />
      <CTA />
    </>
  );
}
