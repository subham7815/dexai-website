import { ArrowRight } from "lucide-react";
import { AGENTS } from "@/lib/content/technology";
import { cn, pad2, sectionPad, type SectionProps } from "@/lib/utils";
import { Button } from "./ui/Button";
import { NodeFlow } from "./ui/NodeFlow";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

interface AgenticAIProps extends SectionProps {
  /** Show the link to the dedicated page (used on the homepage). */
  showLink?: boolean;
}

export function AgenticAI({ hideHeading, showLink }: AgenticAIProps) {
  return (
    <section id="agentic-ai" className={cn("relative scroll-mt-24 overflow-hidden bg-navy-ink text-white", sectionPad(hideHeading))} aria-label="Agentic AI">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 grid-bg-dark [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
        <div className="absolute -right-32 top-0 h-[520px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(199,16,44,0.28),transparent)] blur-2xl" />
      </div>

      <div className="container-x relative">
        {!hideHeading ? (
          <SectionHeading
            tone="dark"
            eyebrow="Agentic AI"
            title="Not one model. A team of specialist agents."
            description="DexAI is not simply OCR or an accounting add-on. Each document is handled by a chain of focused AI agents, from classification to reconciliation, with a person brought in only where confidence is low."
            size="lg"
          />
        ) : null}

        <Reveal className={cn(!hideHeading && "mt-16 lg:mt-20")}>
          <NodeFlow source="agents" tone="dark" ariaLabel="Agent workflow" />
        </Reveal>

        <div className="mt-16 lg:mt-20">
          <Reveal className="flex items-end justify-between gap-6 border-t border-white/12 pt-6">
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand-on-dark">The agents</div>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Eight agents, one job each.</h3>
            </div>
            {showLink ? (
              <Button href="/product/agentic-ai" variant="onDarkGhost" size="sm" icon={<ArrowRight size={14} />} className="hidden sm:inline-flex">
                How the agents work
              </Button>
            ) : null}
          </Reveal>
          <Stagger as="ul" className="mt-8 grid gap-px overflow-hidden rounded-card border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {AGENTS.map((a, i) => {
              const Icon = a.icon;
              return (
                <StaggerItem as="li" key={a.key} className="bg-navy-ink">
                  <div className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-white/[0.04]">
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-brand-on-dark transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <span className="font-mono text-[11px] text-on-dark/70">{pad2(i + 1)}</span>
                    </div>
                    <h4 className="mt-5 text-[17px] font-bold text-white">{a.name}</h4>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-on-dark">{a.role}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          {showLink ? (
            <div className="mt-6 sm:hidden">
              <Button href="/product/agentic-ai" variant="onDarkGhost" fullWidth icon={<ArrowRight size={14} />}>
                How the agents work
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
