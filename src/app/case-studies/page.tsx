import type { Metadata } from "next";
import { CaseStudies } from "@/components/CaseStudies";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Testimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "How teams put DexAI to work: customer overview, challenge, solution, implementation, before and after, verified results and customer quotes.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="How teams put DexAI to work."
        description="Every case study follows the same structure, and every figure is verified by the customer before it is published."
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "Case Studies" }]}
      />
      <CaseStudies hideHeading />
      <Testimonials />
      <CTA />
    </>
  );
}
