import { ArrowLeftRight, Eye, Keyboard, PieChart, type LucideIcon } from "lucide-react";
import { cn, pad2, sectionPad, type SectionProps } from "@/lib/utils";
import { Photo, PhotoBadge } from "./ui/Photo";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

const VALUES: Value[] = [
  { icon: Keyboard, title: "Less manual data entry", description: "Automate repetitive financial administration so documents are captured once and never retyped." },
  { icon: Eye, title: "Better financial visibility", description: "Keep expenses, receipts and transactions organised in one place, across every company you manage." },
  { icon: ArrowLeftRight, title: "Faster reconciliation", description: "Match documents and transactions with less manual effort, and review only the exceptions." },
  { icon: PieChart, title: "Smarter reporting", description: "Turn processed financial data into useful expense and VAT reports when you need them." },
];

/** Editorial numbered row with a hairline above. */
function ValueRow({ value, index }: { value: Value; index: number }) {
  const Icon = value.icon;
  return (
    <div className="group grid gap-4 border-t border-line py-7 sm:grid-cols-[72px_1fr_auto] sm:items-start sm:gap-6">
      <span className="font-mono text-[13px] text-brand">{pad2(index + 1)}</span>
      <div>
        <h3 className="text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">{value.title}</h3>
        <p className="mt-2 max-w-xl text-[17px] leading-relaxed text-body">{value.description}</p>
      </div>
      <span className="hidden size-11 items-center justify-center rounded-lg border border-line bg-white text-navy transition-colors duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white sm:inline-flex">
        <Icon size={20} strokeWidth={1.8} />
      </span>
    </div>
  );
}

export function WhyDexAI({ hideHeading }: SectionProps) {
  const list = (
    <ol className="border-b border-line">
      {VALUES.map((v, i) => (
        <Reveal as="li" key={v.title} delay={i * 0.06}>
          <ValueRow value={v} index={i} />
        </Reveal>
      ))}
    </ol>
  );

  if (hideHeading) {
    return (
      <section id="why" className={cn("scroll-mt-24", sectionPad(true))} aria-label="Why DexAI">
        <div className="container-x">{list}</div>
      </section>
    );
  }

  return (
    <section id="why" className={cn("scroll-mt-24", sectionPad(false))} aria-labelledby="why-title">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                id="why-title"
                align="left"
                eyebrow="Why DexAI"
                title="Built for the way modern finance teams actually work."
                description="DexAI replaces the repetitive parts of bookkeeping with a reliable, reviewable automation layer, so the time you spend on finance is spent on decisions."
                size="lg"
              />
              <Reveal delay={0.1} className="mt-10">
                <Photo photo="accountantDesk" aspect="aspect-[4/3]" shade sizes="(min-width: 1024px) 40vw, 100vw">
                  <PhotoBadge className="bottom-4 left-4 sm:bottom-5 sm:left-5">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Review, don&apos;t retype</div>
                    <div className="mt-0.5 text-[15px] font-bold text-ink">Exceptions only · sample data</div>
                  </PhotoBadge>
                </Photo>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7">{list}</div>
        </div>
      </div>
    </section>
  );
}
