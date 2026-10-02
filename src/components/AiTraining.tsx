import { TRAINING_POINTS } from "@/lib/content/technology";
import { cn, pad2, sectionPad, type SectionProps } from "@/lib/utils";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const LOOP = ["Collect", "Train", "Evaluate", "Deploy", "Improve"];

/** Circular training loop drawn in SVG with a travelling marker. */
function TrainingLoop() {
  const cx = 160;
  const cy = 160;
  const r = 118;
  const pts = LOOP.map((_, i) => {
    const a = (-90 + (360 / LOOP.length) * i) * (Math.PI / 180);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });
  const path = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`;
  return (
    <div className="relative mx-auto w-full max-w-[360px]" aria-hidden>
      <svg viewBox="0 0 320 320" className="h-auto w-full">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#D2D2DD" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#C7102C" strokeWidth="1.5" strokeDasharray="4 10" strokeLinecap="round" className="animate-dash" opacity="0.9" />
        <circle r="5" fill="#C7102C">
          <animateMotion dur="9s" repeatCount="indefinite" path={path} />
        </circle>
        {pts.map((p, i) => (
          <g key={LOOP[i]}>
            <rect x={p.x - 42} y={p.y - 16} width="84" height="32" rx="6" fill="#fff" stroke="#E7E7EE" />
            <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="#0E1024">
              {LOOP[i]}
            </text>
          </g>
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fill="#9A9EB0" fontFamily="monospace" letterSpacing="2">
          MODEL
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="11" fill="#9A9EB0" fontFamily="monospace" letterSpacing="2">
          LIFECYCLE
        </text>
      </svg>
    </div>
  );
}

export function AiTraining({ hideHeading }: SectionProps) {
  return (
    <section id="training" className={cn("scroll-mt-24 border-y border-line bg-surface", sectionPad(hideHeading))} aria-label="Large-scale AI training">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {!hideHeading ? (
              <SectionHeading
                align="left"
                eyebrow="AI training"
                title="Built for large-scale document intelligence."
                description="DexAI's models are trained on financial documents specifically, evaluated before every release and improved continuously from review corrections."
              />
            ) : null}
            <ol className={cn("border-b border-line", !hideHeading && "mt-10")}>
              {TRAINING_POINTS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal as="li" key={p.title} delay={i * 0.05}>
                    <div className="grid gap-3 border-t border-line py-5 sm:grid-cols-[56px_1fr_auto] sm:items-start sm:gap-5">
                      <span className="font-mono text-[12px] text-brand">{pad2(i + 1)}</span>
                      <div>
                        <h3 className="text-[19px] font-bold tracking-tight text-ink">{p.title}</h3>
                        <p className="mt-1 text-[16px] leading-relaxed text-body">{p.description}</p>
                      </div>
                      <span className="hidden size-10 items-center justify-center rounded-lg border border-line bg-white text-navy sm:inline-flex">
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </ol>
          </div>
          <Reveal delay={0.1} className="flex items-center lg:col-span-5">
            <div className="w-full rounded-card border border-line bg-white p-6">
              <TrainingLoop />
              <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Training figures are published only once verified.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
