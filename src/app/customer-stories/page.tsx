import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { RelatedPages } from "@/components/RelatedPages";
import { Testimonials } from "@/components/Testimonials";
import { getGroup } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Customer Stories",
  description: "Customer testimonials about DexAI, published with each customer's permission.",
  alternates: { canonical: "/customer-stories" },
};

export default function CustomerStoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Customer stories"
        title="In our customers' words."
        description="Testimonials are shown here with the customer's permission, with their name, role and company. Nothing is invented."
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "Customer Stories" }]}
      />
      <Testimonials hideHeading />
      <RelatedPages eyebrow="More resources" title="Keep reading" links={getGroup("Resources").items!.filter((i) => i.href !== "/customer-stories").slice(0, 6)} />
      <CTA />
    </>
  );
}
