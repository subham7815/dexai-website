import type { Metadata } from "next";
import { PlayCircle } from "lucide-react";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { ProductDemo } from "@/components/ProductDemo";
import { RelatedPages } from "@/components/RelatedPages";
import { Badge } from "@/components/ui/Badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGroup } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Product Demo & Videos",
  description: "Interactive walkthrough of DexAI from upload to report, plus a library of video walkthroughs.",
  alternates: { canonical: "/demo" },
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

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Product demo & videos"
        title="See DexAI in action."
        description="Walk through the product from first upload to final report. Play the interactive demo or explore each step yourself, then watch the video walkthroughs as they are released."
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "Product Demo & Videos" }]}
        align="center"
        noActions
      />
      <ProductDemo hideHeading />

      <section id="videos" className="scroll-mt-24 border-t border-line bg-surface py-16 lg:py-24" aria-label="Video library">
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

      <RelatedPages eyebrow="Go deeper" title="Explore each capability" links={getGroup("Product").items!} />
      <CTA />
    </>
  );
}
