import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { DataMigration } from "@/components/DataMigration";
import { PageHero } from "@/components/PageHero";
import { RelatedPages } from "@/components/RelatedPages";
import { Button } from "@/components/ui/Button";
import { LINKS } from "@/lib/constants";
import { getGroup } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Data Migration",
  description: "Move your financial data into DexAI without disrupting operations: ingestion, mapping, transformation, validation, duplicate detection and final verification.",
  alternates: { canonical: "/product/data-migration" },
};

export default function DataMigrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Data migration"
        title="Move your financial data without disrupting your operations."
        description="The Data Migration Agent brings historical records across in validated batches, with duplicates caught and progress visible, while your day-to-day processing continues."
        crumbs={[{ label: "Product", href: "/product" }, { label: "Data Migration" }]}
        actions={
          <>
            <Button href={LINKS.contact} size="lg" icon={<ArrowRight size={16} />}>
              Plan Your Migration
            </Button>
            <Button href={LINKS.bookDemo} size="lg" variant="secondary">
              Book a Demo
            </Button>
          </>
        }
      />
      <DataMigration hideHeading />
      <RelatedPages eyebrow="More of the product" title="Keep exploring DexAI" links={getGroup("Product").items!.filter((i) => i.href !== "/product/data-migration")} columns={4} className="border-y border-line bg-surface" />
      <CTA />
    </>
  );
}
