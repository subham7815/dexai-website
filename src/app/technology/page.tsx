import type { Metadata } from "next";
import { AgenticAI } from "@/components/AgenticAI";
import { AiTraining } from "@/components/AiTraining";
import { Architecture } from "@/components/Architecture";
import { CTA } from "@/components/CTA";
import { Infrastructure } from "@/components/Infrastructure";
import { PageHero } from "@/components/PageHero";
import { Technology } from "@/components/Technology";

export const metadata: Metadata = {
  title: "Technology",
  description: "The AI behind DexAI: proprietary OCR and vision-language models, document intelligence, specialist agents, large-scale training and flexible CPU/GPU infrastructure.",
  alternates: { canonical: "/technology" },
};

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="Built on DexAI's own AI technology."
        description="DexAI is an AI-powered financial document and automation platform, not an OCR tool with an accounting skin. Here is what runs underneath."
        crumbs={[{ label: "Technology" }]}
      />
      <Technology hideHeading />
      <AgenticAI showLink />
      <AiTraining />
      <Infrastructure />
      <Architecture />
      <CTA />
    </>
  );
}
