"use client";

import { motion, useReducedMotion } from "motion/react";
import { FileCheck2, KeyRound, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import { LINKS } from "@/lib/constants";
import { cn, sectionPad, type SectionProps } from "@/lib/utils";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

interface Item {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ITEMS: Item[] = [
  { icon: Workflow, title: "Secure financial workflows", description: "Documents and financial data move through DexAI over encrypted connections." },
  { icon: KeyRound, title: "Controlled access", description: "Each company's books are separated, with access managed per user." },
  { icon: FileCheck2, title: "Audit-friendly records", description: "Every document keeps its source file, extracted values and processing history." },
  { icon: ShieldCheck, title: "Reliable document processing", description: "Low-confidence extractions are flagged for review rather than silently posted." },
];

function ShieldVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[380px] items-center justify-center" aria-hidden>
      {[1, 2, 3].map((r) => (
        <motion.div
          key={r}
          animate={reduce ? undefined : { scale: [1, 1.04, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 4.5, delay: r * 0.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full border border-navy/15"
          style={{ inset: `${(3 - r) * 14 + 4}%` }}
        />
      ))}
      <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(closest-side,rgba(27,42,107,0.14),transparent)]" />
      <div className="relative flex size-28 items-center justify-center rounded-xl border border-line bg-white shadow-float">
        <svg width="52" height="60" viewBox="0 0 52 60" fill="none">
          <path d="M26 2 48 10v18c0 14-9.5 24.5-22 30C13.5 52.5 4 42 4 28V10L26 2z" fill="url(#shield-g)" stroke="#1B2A6B" strokeWidth="1.5" />
          <path d="M17 30l6 6 12-13" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="shield-g" x1="4" y1="2" x2="48" y2="58" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1B2A6B" />
              <stop offset="1" stopColor="#C7102C" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {["top-[14%] left-[16%]", "top-[20%] right-[12%]", "bottom-[16%] left-[12%]", "bottom-[12%] right-[18%]"].map((pos, i) => {
        const Icon = ITEMS[i].icon;
        return (
          <motion.div
            key={pos}
            animate={reduce ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            className={`absolute ${pos} flex size-10 items-center justify-center rounded-xl border border-line bg-white text-navy shadow-card`}
          >
            <Icon size={16} />
          </motion.div>
        );
      })}
    </div>
  );
}

export function Security({ hideHeading }: SectionProps) {
  return (
    <section id="security" className={cn("scroll-mt-24 border-y border-line bg-surface", sectionPad(hideHeading))} aria-label="Security and trust">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="order-2 lg:order-1 lg:col-span-5">
            <ShieldVisual />
          </Reveal>
          <div className="order-1 lg:order-2 lg:col-span-7">
            {!hideHeading ? (
              <SectionHeading
                id="security-title"
                align="left"
                eyebrow="Security & trust"
                title="Your financial records, handled with care."
                description="Financial documents deserve careful handling. DexAI is built so that data stays controlled, traceable and reviewable."
              />
            ) : null}
            <Stagger as="ul" className={cn("grid gap-4 sm:grid-cols-2", !hideHeading && "mt-10")}>
              {ITEMS.map(({ icon: Icon, title, description }) => (
                <StaggerItem as="li" key={title}>
                  <div className="h-full rounded-card border border-line bg-white p-5">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-navy-soft text-navy">
                      <Icon size={16} />
                    </span>
                    <h3 className="mt-4 font-bold text-ink">{title}</h3>
                    <p className="mt-1.5 text-[16px] leading-relaxed text-body">{description}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.15} className="mt-6 text-[13px] text-muted">
              Read how this website handles data in our{" "}
              <a href={LINKS.privacy} className="font-semibold text-navy underline-offset-4 hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href={LINKS.cookies} className="font-semibold text-navy underline-offset-4 hover:underline">
                Cookie Policy
              </a>
              .
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
