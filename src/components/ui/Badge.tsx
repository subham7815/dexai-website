import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "brand" | "navy" | "success" | "warn" | "onDark";

const tones: Record<Tone, string> = {
  neutral: "bg-white text-muted border-line",
  brand: "bg-brand-soft text-brand border-brand/20",
  navy: "bg-navy-soft text-navy border-navy/15",
  success: "bg-success-soft text-success border-success/20",
  warn: "bg-warn-soft text-warn border-warn/20",
  onDark: "bg-white/5 text-on-dark border-white/15",
};

export function Badge({ children, tone = "neutral", className, dot }: { children: ReactNode; tone?: Tone; className?: string; dot?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {dot ? <span className="size-1.5 rounded-full bg-current" aria-hidden /> : null}
      {children}
    </span>
  );
}

/** Small "AI" chip shown next to extracted values. */
export function AiChip({ className, label = "AI" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-brand px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white",
        className,
      )}
    >
      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
      </svg>
      {label}
    </span>
  );
}

/** Marks a mockup as sample data. */
export function DemoTag({ className }: { className?: string }) {
  return (
    <Badge tone="neutral" className={cn("bg-white", className)}>
      Sample data
    </Badge>
  );
}
