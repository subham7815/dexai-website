import type { Integration } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  integration: Integration;
  size?: "sm" | "md" | "lg";
  className?: string;
  showName?: boolean;
}

/**
 * Text-based badge for third-party tools. Official partner logos are not
 * bundled, so a neutral monogram tile is used instead.
 */
export function IntegrationBadge({ integration, size = "md", className, showName = true }: Props) {
  const tile =
    size === "lg" ? "size-12 text-base rounded-lg" : size === "sm" ? "size-8 text-[11px] rounded-md" : "size-10 text-sm rounded-lg";
  const tone =
    integration.tone === "red"
      ? "bg-brand-soft text-brand border-brand/15"
      : integration.tone === "ink"
        ? "bg-ink text-white border-ink"
        : "bg-navy-soft text-navy border-navy/15";
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn("inline-flex shrink-0 items-center justify-center border font-extrabold tracking-tight", tile, tone)}
        aria-hidden
      >
        {integration.short}
      </span>
      {showName ? <span className="text-sm font-semibold text-ink sm:text-base">{integration.name}</span> : null}
    </span>
  );
}
