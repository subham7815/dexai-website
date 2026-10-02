import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { INSIGHTS } from "@/lib/content/resources";
import { pad2 } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on how DexAI turns receipts, invoices and statements into organised financial data.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes on financial automation."
        description="Explainers from the DexAI team on how receipts, invoices and bank lines become reconciled records."
        crumbs={[{ label: "Blog" }]}
        noActions
      />
      <section className="py-16 lg:py-24" aria-label="Articles">
        <div className="container-x">
          <Stagger as="ol" className="border-b border-line">
            {INSIGHTS.map((i, idx) => (
              <StaggerItem as="li" key={i.title}>
                <Link href={i.href} className="group grid gap-3 border-t border-line py-6 sm:grid-cols-[56px_1fr_auto] sm:items-start sm:gap-6">
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
          <Reveal className="mt-8 rounded-card border border-line bg-surface p-5 text-[15px] leading-relaxed text-body">
            Product news and longer articles will be published here as they are written.
          </Reveal>
        </div>
      </section>
      <CTA />
    </>
  );
}
