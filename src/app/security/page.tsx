import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Security } from "@/components/Security";
import { Photo, PhotoBadge } from "@/components/ui/Photo";

export const metadata: Metadata = {
  title: "Security & Trust",
  description: "How DexAI handles financial records: secure workflows, controlled access, audit-friendly records and reliable document processing.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security & trust"
        title="Your financial records, handled with care."
        description="Financial documents deserve careful handling. DexAI is built so that data stays controlled, traceable and reviewable."
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "Security & Trust" }]}
      >
        <Photo photo="conferenceRoom" aspect="aspect-[5/4]" shade priority>
          <PhotoBadge className="bottom-4 left-4 sm:bottom-6 sm:left-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Controlled access</div>
            <div className="mt-0.5 text-[15px] font-bold text-ink">Per user, per company</div>
          </PhotoBadge>
        </Photo>
      </PageHero>
      <Security hideHeading />
      <CTA />
    </>
  );
}
