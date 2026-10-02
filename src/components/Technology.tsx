import { Check } from "lucide-react";
import { TECH_CARDS } from "@/lib/content/technology";
import { cn, pad2, sectionPad, type SectionProps } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";

/** Proprietary OCR + VLM + Document Intelligence. */
export function Technology({ hideHeading }: SectionProps) {
  return (
    <section id="ocr-vlm" className={cn("scroll-mt-24", sectionPad(hideHeading))} aria-label="DexAI technology">
      <div className="container-x">
        {!hideHeading ? (
          <SectionHeading
            eyebrow="Technology"
            title="Built on DexAI's own AI technology."
            description="Reading financial paperwork well takes more than text recognition. DexAI pairs its own OCR with a vision-language model and a document intelligence layer that turns reading into finished bookkeeping."
          />
        ) : null}
        <Stagger as="ul" className={cn("grid gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-3", !hideHeading && "mt-14 lg:mt-20")}>
          {TECH_CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <StaggerItem as="li" key={c.key} className="bg-white">
                <div className="group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-surface">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex size-12 items-center justify-center rounded-lg bg-navy-ink text-white">
                      <Icon size={22} strokeWidth={1.7} />
                    </span>
                    <span className="font-mono text-[11px] text-faint">{pad2(i + 1)}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink">{c.title}</h3>
                  <p className="mt-2 text-[17px] leading-relaxed text-body">{c.summary}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[15px] text-ink">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand">
                          <Check size={12} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
