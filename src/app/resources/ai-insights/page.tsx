import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Technology } from "@/components/Technology";
import { Badge } from "@/components/ui/Badge";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { INSIGHTS } from "@/lib/content/resources";
import { pad2 } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI Insights",
  description: "Explainers on how DexAI's AI works: OCR and vision-language models, specialist agents, confidence scores, matching, training and infrastructure.",
  alternates: { canonical: "/resources/ai-insights" },
};

export default function AiInsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI insights"
        title="How the AI actually works."
        description="Plain explanations of what happens between a photo of a receipt and a reconciled record, with links to the relevant part of the product."
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "AI Insights" }]}
        noActions
      />
      <section className="py-16 lg:py-24" aria-label="Insights">
        <div className="container-x">
          <Stagger as="ol" className="border-b border-line">
            {INSIGHTS.map((i, idx) => (
              <StaggerItem as="li" key={i.title}>
                <Link href={i.href} className="group grid gap-3 border-t border-line py-6 transition-colors sm:grid-cols-[56px_1fr_auto] sm:items-start sm:gap-6">
                  <span className="font-mono text-[12px] text-brand">{pad2(idx + 1)}</span>
                  <div>
                    <Badge tone="navy">{i.tag}</Badge>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink group-hover:text-brand">{i.title}</h2>
                    <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-body">{i.summary}</p>
                  </div>
                  <ArrowUpRight size={18} className="hidden text-faint transition-colors group-hover:text-brand sm:block" aria-hidden />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <Technology />
      <CTA />
    </>
  );
}
