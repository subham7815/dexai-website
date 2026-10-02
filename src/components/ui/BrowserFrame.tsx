import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  children: ReactNode;
  url?: string;
  className?: string;
  bodyClassName?: string;
  tone?: "light" | "dark";
  /** Rendered at the right of the chrome bar (e.g. a "Sample data" tag). */
  aside?: ReactNode;
}

/** Application window chrome used for product mockups. */
export function BrowserFrame({ children, url = "app.dexai.app", className, bodyClassName, tone = "light", aside }: BrowserFrameProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card-lg border",
        dark ? "border-white/10 bg-navy-ink" : "border-line-strong bg-white shadow-float",
        className,
      )}
    >
      <div className={cn("flex h-11 items-center gap-3 border-b px-4", dark ? "border-white/10 bg-white/[0.03]" : "border-line bg-surface")}>
        <div className="flex gap-1.5" aria-hidden>
          <span className={cn("size-2 rounded-full", dark ? "bg-white/20" : "bg-line-strong")} />
          <span className={cn("size-2 rounded-full", dark ? "bg-white/20" : "bg-line-strong")} />
          <span className={cn("size-2 rounded-full", dark ? "bg-white/20" : "bg-line-strong")} />
        </div>
        <div
          className={cn(
            "mx-auto flex h-7 w-full max-w-xs items-center justify-center gap-2 rounded-md border font-mono text-[11px]",
            dark ? "border-white/10 bg-white/5 text-on-dark" : "border-line bg-white text-muted",
          )}
        >
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden>
            <rect x="1" y="5" width="8" height="6.5" rx="1" stroke="currentColor" />
            <path d="M3 5V3.5a2 2 0 1 1 4 0V5" stroke="currentColor" />
          </svg>
          {url}
        </div>
        <div className="flex min-w-10 justify-end">{aside}</div>
      </div>
      <div className={cn("relative", bodyClassName)}>{children}</div>
    </div>
  );
}
