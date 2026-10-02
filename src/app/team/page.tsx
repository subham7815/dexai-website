import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { PhotoFeature } from "@/components/PhotoFeature";
import { Button } from "@/components/ui/Button";
import { LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Team",
  description: "The people behind DexAI.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="The people behind DexAI."
        description="DexAI is built by a team working on financial document processing, from capture and OCR to reconciliation and reporting."
        crumbs={[{ label: "Team" }]}
        noActions
      />
      <PhotoFeature
        photo="team"
        eyebrow="Meet the team"
        title="Profiles are published with each person's agreement."
        description="Names, roles and photographs of team members will appear here once each person has approved how they are shown. In the meantime, you can talk to the team directly."
        bullets={["Ask questions about the product or your migration", "Book a walkthrough with someone from the team"]}
      />
      <section className="pb-16 lg:pb-24" aria-label="Talk to the team">
        <div className="container-x">
          <Button href={LINKS.contact} size="lg" icon={<ArrowRight size={16} />}>
            Talk to the team
          </Button>
        </div>
      </section>
      <CTA />
    </>
  );
}
