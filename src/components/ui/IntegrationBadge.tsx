import type { Integration } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  integration: Integration;
  size?: "sm" | "md" | "lg";
  className?: string;
  showName?: boolean;
}

/**
 * Icon badge for third-party tools. Official partner logos are not bundled,
 * so a neutral icon tile is used to indicate compatibility.
 */
export function IntegrationBadge({ integration, size = "md", className, showName = true }: Props) {
  const tile = size === "lg" ? "size-14 rounded-xl" : size === "sm" ? "size-8 rounded-md" : "size-11 rounded-lg";
  const iconSize = size === "lg" ? 26 : size === "sm" ? 16 : 20;
  const Icon = integration.icon;
  const tone =
    integration.tone === "red"
      ? "bg-brand-soft text-brand border-brand/15"
      : integration.tone === "ink"
        ? "bg-ink text-white border-ink"
        : "bg-navy-soft text-navy border-navy/15";
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn("inline-flex shrink-0 items-center justify-center border", tile, tone)}
        aria-hidden
      >
        <Icon size={iconSize} strokeWidth={1.8} />
      </span>
      {showName ? <span className="text-sm font-semibold text-ink sm:text-base">{integration.name}</span> : null}
    </span>
  );
}
