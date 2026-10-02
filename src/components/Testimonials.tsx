"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, PlayCircle, Quote } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { LINKS } from "@/lib/constants";
import { TESTIMONIALS } from "@/lib/content/stories";
import { cn, pad2, sectionPad, type SectionProps } from "@/lib/utils";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Testimonials({ hideHeading }: SectionProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;
  const t = TESTIMONIALS[index];

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + total) % total), [total]);

  useEffect(() => {
    if (reduce || paused || total < 2) return;
    const id = window.setInterval(() => go(1), 6000);
    return () => window.clearInterval(id);
  }, [reduce, paused, total, go]);

  return (
    <section id="customer-stories" className={cn("scroll-mt-24 border-y border-line bg-surface", sectionPad(hideHeading))} aria-label="Customer stories">
      <div className="container-x">
        {!hideHeading ? (
          <SectionHeading
            eyebrow="Customer stories"
            title="In our customers' words."
            description="Testimonials are shown here with the customer's permission, with their name, role and company."
          />
        ) : null}

        <Reveal className={cn(!hideHeading && "mt-14 lg:mt-20")}>
          <div
            className="relative overflow-hidden rounded-card border border-line bg-white"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
          >
            <div className="grid lg:grid-cols-12">
              <div className="p-7 sm:p-10 lg:col-span-8">
                <div className="flex items-center justify-between">
                  <Quote size={28} className="text-brand" aria-hidden />
                  {t.placeholder ? <Badge tone="neutral">Placeholder · awaiting approval</Badge> : null}
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.figure
                    key={index}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    aria-live="polite"
                  >
                    <blockquote className={cn("mt-6 text-balance text-2xl font-semibold leading-snug tracking-tight sm:text-3xl", t.placeholder ? "text-muted" : "text-ink")}>
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-4">
                      {t.logo ? (
                        <Image src={t.logo} alt={`${t.company} logo`} width={120} height={40} className="h-8 w-auto" />
                      ) : (
                        <span className="flex size-11 items-center justify-center rounded-lg border border-dashed border-line font-mono text-[10px] uppercase text-faint" aria-hidden>
                          Logo
                        </span>
                      )}
                      <div>
                        <div className={cn("text-[15px] font-bold", t.placeholder ? "text-muted" : "text-ink")}>{t.name}</div>
                        <div className="text-[14px] text-muted">
                          {t.title}, {t.company}
                        </div>
                      </div>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>

              <div className="border-t border-line bg-surface p-7 lg:col-span-4 lg:border-l lg:border-t-0">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Video testimonial</div>
                {t.videoUrl ? (
                  <video controls preload="metadata" className="mt-3 aspect-video w-full rounded-lg border border-line bg-black" src={t.videoUrl} />
                ) : (
                  <div className="mt-3 flex aspect-video items-center justify-center rounded-lg border border-dashed border-line bg-white text-faint">
                    <div className="text-center">
                      <PlayCircle size={28} className="mx-auto" aria-hidden />
                      <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em]">Optional · when provided</div>
                    </div>
                  </div>
                )}
                <div className="mt-6 flex items-center justify-between">
                  <div className="font-mono text-[12px] text-muted">
                    {pad2(index + 1)} / {pad2(total)}
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="flex size-10 items-center justify-center rounded-lg border border-line bg-white text-ink transition-colors hover:border-ink">
                      <ChevronLeft size={16} />
                    </button>
                    <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="flex size-10 items-center justify-center rounded-lg border border-line bg-white text-ink transition-colors hover:border-ink">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex gap-1.5" role="tablist" aria-label="Choose testimonial">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Testimonial ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={cn("h-1 flex-1 rounded-full transition-colors", i === index ? "bg-brand" : "bg-line hover:bg-line-strong")}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-[16px] text-body">No testimonials are invented. Stories appear here once a customer has approved their quote, name and company.</p>
          <Button href={LINKS.contact} variant="secondary" icon={<ArrowRight size={15} />}>
            Share your story
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
