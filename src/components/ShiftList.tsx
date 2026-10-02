import { ArrowRight, Check, X } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";

interface ShiftListProps {
  shifts: { before: string; after: string }[];
  title?: string;
  eyebrow?: string;
}

/** Before / after comparison used on solution pages. */
export function ShiftList({ shifts, title = "What changes with DexAI", eyebrow = "Before and after" }: ShiftListProps) {
  return (
    <section className="border-y border-line bg-surface py-16 lg:py-24">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <Stagger as="ul" className="mx-auto mt-12 max-w-4xl space-y-3">
          {shifts.map((s) => (
            <StaggerItem as="li" key={s.after}>
              <div className="grid items-center gap-3 rounded-card border border-line bg-white p-4 sm:grid-cols-[1fr_auto_1fr] sm:p-5">
                <div className="flex items-start gap-3 text-[16px] text-muted">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-surface text-faint">
                    <X size={12} />
                  </span>
                  <span className="line-through decoration-line/80">{s.before}</span>
                </div>
                <ArrowRight size={16} className="hidden text-brand sm:block" aria-hidden />
                <div className="flex items-start gap-3 text-[16px] font-semibold text-ink">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                    <Check size={12} />
                  </span>
                  {s.after}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
