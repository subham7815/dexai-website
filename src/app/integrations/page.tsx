import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { Integrations } from "@/components/Integrations";
import { PageHero } from "@/components/PageHero";
import { RelatedPages } from "@/components/RelatedPages";
import { getGroup } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Integrations",
  description: "DexAI connects with Xero, QuickBooks, FreeAgent and Sage, and supports HMRC Making Tax Digital workflows.",
  alternates: { canonical: "/integrations" },
};

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="Works with the tools you already use."
        description="Processed, categorised and reconciled data flows from DexAI into your accounting software and HMRC workflows."
        crumbs={[{ label: "Integrations" }]}
      />
      <Integrations hideHeading />
      <RelatedPages eyebrow="By tool" title="Integration guides" links={getGroup("Integrations").items!} />
      <CTA />
    </>
  );
}
