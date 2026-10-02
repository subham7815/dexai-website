import { cn, sectionPad, type SectionProps } from "@/lib/utils";
import { NodeFlow } from "./ui/NodeFlow";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Architecture({ hideHeading }: SectionProps) {
  return (
    <section id="architecture" className={cn("scroll-mt-24 border-y border-line bg-surface", sectionPad(hideHeading))} aria-label="Technology architecture">
      <div className="container-x">
        {!hideHeading ? (
          <SectionHeading
            eyebrow="Architecture"
            title="From document to business system, stage by stage."
            description="Every document follows the same path. Select a stage to see what happens there."
          />
        ) : null}
        <Reveal className={cn(!hideHeading && "mt-16 lg:mt-20")}>
          <NodeFlow source="architecture" ariaLabel="Technology architecture" interval={1900} />
        </Reveal>
      </div>
    </section>
  );
}
