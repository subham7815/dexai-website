"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FAQ_GROUPS } from "@/lib/content/resources";
import { cn, sectionPad, type SectionProps } from "@/lib/utils";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function FAQ({ hideHeading }: SectionProps) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="faqs" className={cn("scroll-mt-24", sectionPad(hideHeading))} aria-label="Frequently asked questions">
      <div className="container-x">
        {!hideHeading ? <SectionHeading eyebrow="FAQs" title="Questions, answered." description="Short answers about the product, bank feeds, VAT, integrations and getting started." /> : null}
        <div className={cn("grid gap-12 lg:grid-cols-12", !hideHeading && "mt-14 lg:mt-20")}>
          {FAQ_GROUPS.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.05} className="lg:col-span-6">
              <h3 className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand">{g.title}</h3>
              <ul className="mt-4 border-b border-line">
                {g.items.map((item, qi) => {
                  const id = `${g.title}-${item.q}`;
                  const isOpen = open === id;
                  return (
                    <li key={id} className="border-t border-line">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-${gi}-${qi}`}
                        onClick={() => setOpen(isOpen ? null : id)}
                        className="flex w-full items-start justify-between gap-6 py-4 text-left"
                      >
                        <span className={cn("text-[17px] font-semibold transition-colors", isOpen ? "text-brand" : "text-ink")}>{item.q}</span>
                        <Plus size={18} className={cn("mt-1 shrink-0 text-faint transition-transform duration-300", isOpen && "rotate-45 text-brand")} aria-hidden />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            id={`faq-${gi}-${qi}`}
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reduce ? undefined : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pb-5 pr-10 text-[16px] leading-relaxed text-body">{item.a}</p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
