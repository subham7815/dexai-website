import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { IntegrationData } from "@/components/IntegrationData";
import { Integrations } from "@/components/Integrations";
import { PageHero } from "@/components/PageHero";
import { RelatedPages } from "@/components/RelatedPages";
import { StepsList } from "@/components/StepsList";
import { getGroup } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Integrations",
  description: "DexAI connects with Xero, QuickBooks, FreeAgent, Sage and Capium, and supports HMRC Making Tax Digital workflows.",
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
      <IntegrationData />
      <StepsList
        eyebrow="Getting connected"
        title="Three steps from document to books."
        steps={[
          { title: "Connect", description: "Authorise the connection from DexAI's integration settings." },
          { title: "Process in DexAI", description: "Documents are extracted, categorised and matched as usual." },
          { title: "Sync", description: "Clean records flow into your accounting software." },
        ]}
      />
      <RelatedPages eyebrow="By tool" title="Integration guides" links={getGroup("Integrations").items!} />
      <CTA />
    </>
  );
}
