import type { Benefit } from "@/lib/content/product";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";

interface BenefitGridProps {
  benefits: Benefit[];
  title?: string;
  eyebrow?: string;
  description?: string;
  className?: string;
  tone?: "light" | "surface";
}

export function BenefitGrid({ benefits, title, eyebrow, description, className, tone = "light" }: BenefitGridProps) {
  return (
    <section className={cn("py-16 lg:py-24", tone === "surface" && "border-y border-line bg-surface", className)}>
      <div className="container-x">
        {title ? <SectionHeading eyebrow={eyebrow} title={title} description={description} /> : null}
        <Stagger as="ul" className={cn("grid gap-4 md:grid-cols-3", title && "mt-12 lg:mt-16")}>
          {benefits.map(({ icon: Icon, title: t, description: d }) => (
            <StaggerItem as="li" key={t}>
              <div className="group h-full rounded-card border border-line bg-white p-6 transition-all duration-500 hover:border-ink/40">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-navy-soft text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-white">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">{t}</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-body">{d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
