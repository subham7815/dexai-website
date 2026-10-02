import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import type { PhotoKey } from "@/lib/photos";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { Photo, PhotoBadge } from "./ui/Photo";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

interface PhotoFeatureProps {
  photo: PhotoKey;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  bullets?: string[];
  cta?: { label: string; href: string };
  /** Floating card content over the photo. */
  badge?: ReactNode;
  badgePosition?: "bottom-left" | "top-right" | "bottom-right";
  /** Put the photo on the right instead of the left. */
  reverse?: boolean;
  tone?: "light" | "surface";
  className?: string;
}

/** Editorial split section: photograph on one side, copy on the other. */
export function PhotoFeature({
  photo,
  eyebrow,
  title,
  description,
  bullets,
  cta,
  badge,
  badgePosition = "bottom-left",
  reverse,
  tone = "light",
  className,
}: PhotoFeatureProps) {
  const badgePos =
    badgePosition === "top-right"
      ? "right-4 top-4 sm:right-6 sm:top-6"
      : badgePosition === "bottom-right"
        ? "bottom-4 right-4 sm:bottom-6 sm:right-6"
        : "bottom-4 left-4 sm:bottom-6 sm:left-6";

  return (
    <section className={cn("py-20 lg:py-28", tone === "surface" && "border-y border-line bg-surface", className)}>
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className={cn("lg:col-span-6", reverse && "lg:order-2")}>
            <Photo photo={photo} aspect="aspect-[5/4]" shade={!!badge}>
              {badge ? <PhotoBadge className={badgePos}>{badge}</PhotoBadge> : null}
            </Photo>
          </Reveal>
          <div className={cn("lg:col-span-6", reverse && "lg:order-1")}>
            <SectionHeading align="left" eyebrow={eyebrow} title={title} description={description} />
            {bullets?.length ? (
              <Reveal delay={0.1}>
                <ul className="mt-8 space-y-3.5 text-[17px] text-body">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                        <Check size={13} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
            {cta ? (
              <Reveal delay={0.15} className="mt-9">
                <Button href={cta.href} variant="secondary" size="lg" icon={<ArrowRight size={16} />}>
                  {cta.label}
                </Button>
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
