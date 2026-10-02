import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { PhotoCollage } from "@/components/PhotoCollage";
import { RelatedPages } from "@/components/RelatedPages";
import { WhyDexAI } from "@/components/WhyDexAI";
import { getGroup } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Solutions",
  description: "DexAI for small businesses, accountants and bookkeepers, multi-company groups, and freelancers and contractors.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Built for the way you run finance."
        description="The same automation, applied to the shape of your business. Choose the fit that matches how you work."
        crumbs={[{ label: "Solutions" }]}
      >
        <PhotoCollage
          items={[
            { photo: "cafeOwners", label: "Small businesses" },
            { photo: "accountantDesk", label: "Accountants" },
            { photo: "freelancerCoffee", label: "Freelancers" },
          ]}
        />
      </PageHero>
      <RelatedPages eyebrow="Who it's for" title="Pick your starting point" links={getGroup("Solutions").items!} columns={4} className="pt-4 lg:pt-8" />
      <WhyDexAI />
      <CTA />
    </>
  );
}
