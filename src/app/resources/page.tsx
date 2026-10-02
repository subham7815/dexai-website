import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { RelatedPages } from "@/components/RelatedPages";
import { Badge } from "@/components/ui/Badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INSIGHTS } from "@/lib/content/resources";
import { getGroup } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Resources",
  description: "Case studies, customer stories, product videos, documentation, AI insights and FAQs for DexAI.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Stories, guides and straight answers."
        description="Learn how DexAI works, how teams use it and how the AI underneath is built."
        crumbs={[{ label: "Resources" }]}
        noActions
      />
      <RelatedPages eyebrow="Browse" title="Everything in one place" links={getGroup("Resources").items!} columns={4} className="pt-4 lg:pt-8" />

      <section className="border-y border-line bg-surface py-16 lg:py-24" aria-label="AI insights">
        <div className="container-x">
          <SectionHeading eyebrow="AI insights" title="How the AI actually works." description="Short explainers on OCR and vision-language models, agents, confidence scores and matching." />
          <Stagger as="ul" className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {INSIGHTS.map((i) => (
              <StaggerItem as="li" key={i.title} className="bg-white">
                <Link href={i.href} className="group flex h-full flex-col p-6 transition-colors hover:bg-surface">
                  <div className="flex items-center justify-between">
                    <Badge tone="navy">{i.tag}</Badge>
                    <ArrowUpRight size={14} className="text-faint transition-colors group-hover:text-brand" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-[18px] font-bold tracking-tight text-ink">{i.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">{i.summary}</p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-6">
            <Link href="/resources/ai-insights" className="text-[15px] font-semibold text-ink underline-offset-4 hover:text-brand hover:underline">
              All AI insights
            </Link>
          </Reveal>
        </div>
      </section>
      <CTA />
    </>
  );
}
