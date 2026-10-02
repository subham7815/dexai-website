import { Check } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { RelatedPages } from "@/components/RelatedPages";
import { StepsList } from "@/components/StepsList";
import { IntegrationBadge } from "@/components/ui/IntegrationBadge";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { INTEGRATIONS } from "@/lib/constants";
import { INTEGRATION_PAGES, INTEGRATION_SLUGS, type IntegrationSlug } from "@/lib/content/integrations";
import { getGroup } from "@/lib/navigation";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return INTEGRATION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = INTEGRATION_PAGES[slug as IntegrationSlug];
  if (!page) return {};
  return { title: `${page.name} integration`, description: page.metaDescription, alternates: { canonical: `/integrations/${slug}` } };
}

function ConnectionVisual({ slug }: { slug: IntegrationSlug }) {
  const integration = INTEGRATIONS.find((i) => i.id === slug)!;
  const page = INTEGRATION_PAGES[slug];
  return (
    <div className="relative overflow-hidden rounded-card-lg border border-line bg-surface p-6 shadow-card sm:p-8">
      <div className="absolute inset-0 grid-bg opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" aria-hidden />
      <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-5 py-3 shadow-float">
          <Logo height={26} asLink={false} />
        </div>
        <div className="flex items-center gap-1 sm:flex-1 sm:px-4" aria-hidden>
          <span className="hidden h-px flex-1 bg-line sm:block" />
          <svg width="80" height="12" viewBox="0 0 80 12" className="shrink-0">
            <line x1="0" y1="6" x2="72" y2="6" stroke="#C7102C" strokeWidth="2" strokeDasharray="6 8" strokeLinecap="round" className="animate-dash" />
            <circle r="4" fill="#C7102C">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M0 6 L72 6" />
            </circle>
          </svg>
          <span className="hidden h-px flex-1 bg-line sm:block" />
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-5 py-3 shadow-float">
          <IntegrationBadge integration={integration} size="md" />
        </div>
      </div>
      <ul className="relative mt-6 space-y-2">
        {page.syncs.map((s) => (
          <li key={s} className="flex items-center gap-3 rounded-xl border border-line-soft bg-white px-4 py-3 text-[14px] text-ink">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
              <Check size={12} />
            </span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function IntegrationDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = INTEGRATION_PAGES[slug as IntegrationSlug];
  if (!page) notFound();

  const others = getGroup("Integrations").items!.filter((i) => i.href !== `/integrations/${page.slug}`);

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        crumbs={[{ label: "Integrations", href: "/integrations" }, { label: page.name }]}
      >
        <ConnectionVisual slug={page.slug} />
      </PageHero>
      <StepsList steps={page.steps} eyebrow="Getting connected" title={`How DexAI works with ${page.name}`} />
      {page.note ? (
        <section className="py-4">
          <div className="container-x">
            <Reveal>
              <p className="mx-auto max-w-3xl rounded-xl border border-line bg-white px-5 py-4 text-center text-[13px] leading-relaxed text-muted">{page.note}</p>
            </Reveal>
          </div>
        </section>
      ) : null}
      <RelatedPages eyebrow="Other integrations" title="Also works with" links={others} columns={4} />
      <CTA />
    </>
  );
}
