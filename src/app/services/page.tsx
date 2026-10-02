import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { RelatedPages } from "@/components/RelatedPages";
import { Button } from "@/components/ui/Button";
import { LINKS } from "@/lib/constants";
import { getGroup } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Services",
  description: "Everything DexAI does: receipt scanning, document processing, expenses, bank reconciliation, VAT reporting, automation, data migration and integrations.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const product = getGroup("Product").items!.filter((i) => i.href !== "/demo");
  const features = getGroup("Features").items!;
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need to manage business finances."
        description="From receipt capture to tax-ready reports, DexAI covers the repetitive parts of bookkeeping so people can focus on the work that needs judgement."
        crumbs={[{ label: "Services" }]}
        actions={
          <>
            <Button href={LINKS.bookDemo} size="lg" icon={<ArrowRight size={16} />}>
              Book a Demo
            </Button>
            <Button href="/demo" size="lg" variant="secondary">
              See the demo
            </Button>
          </>
        }
      />
      <RelatedPages eyebrow="The platform" title="Core capabilities" links={product} columns={4} />
      <RelatedPages eyebrow="More tools" title="Built for how finance teams work" links={features} columns={4} className="border-y border-line bg-surface" />
      <CTA />
    </>
  );
}
