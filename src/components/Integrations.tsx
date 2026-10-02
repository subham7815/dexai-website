import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { INTEGRATIONS } from "@/lib/constants";
import { cn, sectionPad, type SectionProps } from "@/lib/utils";
import { IntegrationBadge } from "./ui/IntegrationBadge";
import { Logo } from "./ui/Logo";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

/**
 * Hub-and-spoke diagram. The SVG draws curved paths from the DexAI hub to
 * six endpoints aligned with a 6-column card grid below. CSS animates the
 * dash offset and SVG animateMotion moves a dot along each path.
 */
const W = 1000;
const H = 240;
const HUB = { x: W / 2, y: 30 };
const N = INTEGRATIONS.length;

function endpointX(i: number) {
  return (W / N) * (i + 0.5);
}

function pathFor(i: number) {
  const x = endpointX(i);
  return `M ${HUB.x} ${HUB.y} C ${HUB.x} ${HUB.y + 110}, ${x} ${H - 90}, ${x} ${H}`;
}

export function Integrations({ hideHeading }: SectionProps) {
  return (
    <section id="integrations" className={cn("scroll-mt-24 border-y border-line bg-surface", sectionPad(hideHeading))} aria-label="Integrations">
      <div className="container-x">
        {!hideHeading ? (
          <SectionHeading
            id="integrations-title"
            eyebrow="Integrations"
            title="Works with the tools you already use."
            description="Processed, categorised and reconciled data flows into your accounting software and HMRC workflows."
          />
        ) : null}

        {/* Desktop diagram */}
        <Reveal className={cn("hidden lg:block", !hideHeading && "mt-14 lg:mt-20")}>
          <div className="relative mx-auto max-w-6xl pt-8">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden>
              {INTEGRATIONS.map((it, i) => (
                <g key={it.id}>
                  <path d={pathFor(i)} fill="none" stroke="#D2D2DD" strokeWidth="1.5" />
                  <path
                    d={pathFor(i)}
                    fill="none"
                    stroke="#C7102C"
                    strokeWidth="1.5"
                    strokeDasharray="4 10"
                    strokeLinecap="round"
                    className="animate-dash"
                    style={{ animationDelay: `${i * 0.3}s` }}
                    opacity="0.9"
                  />
                  <circle r="4" fill="#C7102C">
                    <animateMotion dur={`${3.2 + i * 0.35}s`} repeatCount="indefinite" path={pathFor(i)} begin={`${i * 0.5}s`} />
                  </circle>
                </g>
              ))}
            </svg>

            {/* Hub */}
            <div className="absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-3 rounded-lg border border-line-strong bg-white px-5 py-3 shadow-float">
                <Logo height={26} asLink={false} priority />
                <span className="h-5 w-px bg-line" aria-hidden />
                <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Processed data</span>
              </div>
            </div>

            {/* Endpoints, aligned with the SVG path ends */}
            <ul className="-mt-px grid grid-cols-6 gap-3">
              {INTEGRATIONS.map((it) => (
                <li key={it.id}>
                  <Link href={`/integrations/${it.id}`} className="group flex h-full flex-col rounded-card border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/40 hover:shadow-float">
                    <div className="flex items-start justify-between">
                      <IntegrationBadge integration={it} showName={false} size="lg" />
                      <ArrowUpRight size={14} className="text-faint transition-colors group-hover:text-brand" aria-hidden />
                    </div>
                    <div className="mt-5 text-lg font-bold text-ink">{it.name}</div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">{it.category}</div>
                    <p className="mt-3 text-[13px] leading-snug text-muted">{it.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Mobile / tablet list */}
        <Stagger as="ul" className={cn("grid gap-3 sm:grid-cols-2 lg:hidden", !hideHeading && "mt-12")}>
          {INTEGRATIONS.map((it) => (
            <StaggerItem as="li" key={it.id}>
              <Link href={`/integrations/${it.id}`} className="flex items-start gap-4 rounded-card border border-line bg-white p-4 transition-colors hover:border-ink/40">
                <IntegrationBadge integration={it} showName={false} size="md" />
                <div>
                  <div className="font-bold text-ink">{it.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">{it.category}</div>
                  <p className="mt-0.5 text-[14px] leading-snug text-muted">{it.description}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">Product names belong to their respective owners and are shown to indicate compatibility.</p>
      </div>
    </section>
  );
}
