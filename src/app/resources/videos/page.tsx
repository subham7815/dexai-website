import type { Metadata } from "next";
import { PlayCircle } from "lucide-react";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { ProductDemo } from "@/components/ProductDemo";
import { Badge } from "@/components/ui/Badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Product Videos",
  description: "Video walkthroughs of DexAI, plus an interactive demo you can explore now.",
  alternates: { canonical: "/resources/videos" },
};

/** Planned walkthroughs; replaced with real videos as they are produced. */
const PLANNED = [
  { title: "Capturing your first receipt", length: "Short walkthrough" },
  { title: "Reviewing AI extraction", length: "Short walkthrough" },
  { title: "Connecting a bank feed", length: "Short walkthrough" },
  { title: "Preparing a VAT period", length: "Short walkthrough" },
  { title: "Managing several companies", length: "Short walkthrough" },
  { title: "Syncing with your accounting software", length: "Short walkthrough" },
];

export default function VideosPage() {
  return (
    <>
      <PageHero
        eyebrow="Product videos"
        title="See the product, step by step."
        description="Video walkthroughs are in production. Until they are published, the interactive demo below covers the same journey from upload to report."
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "Product Videos" }]}
        noActions
      />
      <ProductDemo hideHeading />
      <section className="py-16 lg:py-24" aria-label="Video library">
        <div className="container-x">
          <SectionHeading eyebrow="Video library" title="Walkthroughs on the way." description="Each video is listed here as it is released. No placeholder footage is shown." />
          <Stagger as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PLANNED.map((v) => (
              <StaggerItem as="li" key={v.title}>
                <div className="rounded-card border border-line bg-white p-4">
                  <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-line bg-surface text-faint">
                    <PlayCircle size={28} aria-hidden />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <h3 className="text-[16px] font-bold text-ink">{v.title}</h3>
                    <Badge tone="neutral">Coming soon</Badge>
                  </div>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">{v.length}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-6 text-[14px] text-muted">Add a video by placing the file in public/ and linking it from this page; the player uses the native video element.</Reveal>
        </div>
      </section>
      <CTA />
    </>
  );
}
