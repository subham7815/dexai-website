import Image from "next/image";
import type { ReactNode } from "react";
import { PHOTOS, type PhotoKey } from "@/lib/photos";
import { cn } from "@/lib/utils";

interface PhotoProps {
  photo: PhotoKey;
  className?: string;
  /** Tailwind aspect class, e.g. "aspect-[4/3]". */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** Content layered over the photo (badges, captions). */
  children?: ReactNode;
  /** Soft gradient at the bottom so overlaid text stays readable. */
  shade?: boolean;
  rounded?: string;
  style?: React.CSSProperties;
}

/** Responsive, optimised photograph with optional overlay content. */
export function Photo({
  photo,
  className,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  children,
  shade,
  rounded = "rounded-card-lg",
  style,
}: PhotoProps) {
  const p = PHOTOS[photo];
  return (
    <figure className={cn("group relative overflow-hidden bg-surface shadow-float", rounded, aspect, className)} style={style}>
      <Image
        src={p.src}
        alt={p.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
      />
      {shade ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-ink/70 via-navy-ink/10 to-transparent" aria-hidden />
      ) : null}
      {children}
    </figure>
  );
}

/** Small white card floated over a photo. */
export function PhotoBadge({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("absolute rounded-lg border border-white/60 bg-white/92 p-4 shadow-float backdrop-blur", className)}>
      {children}
    </div>
  );
}
