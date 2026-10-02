"use client";

import { motion, useReducedMotion } from "motion/react";
import { Cpu, FileText, Server, Boxes } from "lucide-react";
import { useState } from "react";
import { INFRA_POINTS } from "@/lib/content/technology";
import { cn, pad2, sectionPad, type SectionProps } from "@/lib/utils";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

type Mode = "cpu" | "gpu";

/** Hardware path diagram with a CPU / GPU switch. Qualitative only; no performance figures. */
function HardwarePanel() {
  const [mode, setMode] = useState<Mode>("cpu");
  const reduce = useReducedMotion();
  return (
    <div className="rounded-card border border-line bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Inference target</div>
        <div role="group" aria-label="Hardware" className="inline-flex rounded-lg border border-line bg-surface p-1">
          {(["cpu", "gpu"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={cn("rounded-md px-3 py-1.5 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors", mode === m ? "bg-ink text-white" : "text-muted hover:text-ink")}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:gap-3">
        <Node icon={FileText} label="Documents" sub="Receipts, invoices" />
        <Link active />
        <div className="relative">
          <motion.div
            key={mode}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg border border-brand bg-brand p-3 text-center text-white"
          >
            {mode === "cpu" ? <Cpu size={20} className="mx-auto" /> : <Server size={20} className="mx-auto" />}
            <div className="mt-2 text-[13px] font-bold">DexAI models</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/80">{mode === "cpu" ? "CPU-only" : "GPU-accelerated"}</div>
          </motion.div>
        </div>
        <Link active />
        <Node icon={Boxes} label="Records" sub="Fields + confidence" />
      </div>

      <dl className="mt-6 grid gap-3 border-t border-line pt-5 sm:grid-cols-2">
        {[
          ["Model build", "Same models, optimised for either path"],
          ["Scaling", "Add capacity as document volume grows"],
          ["Latency", "Designed for low per-document latency"],
          ["Portability", "Deployment driven by your requirements"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-line-soft bg-surface px-3 py-2.5">
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{k}</dt>
            <dd className="mt-0.5 text-[14px] font-medium text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Node({ icon: Icon, label, sub }: { icon: typeof FileText; label: string; sub: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-3 text-center">
      <Icon size={20} className="mx-auto text-navy" />
      <div className="mt-2 text-[13px] font-bold text-ink">{label}</div>
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">{sub}</div>
    </div>
  );
}

function Link({ active }: { active: boolean }) {
  return (
    <svg width="28" height="12" viewBox="0 0 28 12" aria-hidden className="hidden shrink-0 sm:block">
      <line x1="0" y1="6" x2="26" y2="6" stroke={active ? "#C7102C" : "#D2D2DD"} strokeWidth="1.5" strokeDasharray="3 6" strokeLinecap="round" className="animate-dash" />
    </svg>
  );
}

export function Infrastructure({ hideHeading }: SectionProps) {
  return (
    <section id="infrastructure" className={cn("scroll-mt-24", sectionPad(hideHeading))} aria-label="Flexible AI infrastructure">
      <div className="container-x">
        {!hideHeading ? (
          <SectionHeading
            eyebrow="Infrastructure"
            title="Flexible AI infrastructure for real-world deployment."
            description="DexAI's models are built to run where you need them, on CPU-only hardware or GPU-accelerated systems, without changing how the product behaves."
          />
        ) : null}
        <div className={cn("grid gap-10 lg:grid-cols-12 lg:gap-16", !hideHeading && "mt-14 lg:mt-20")}>
          <Reveal className="lg:col-span-6">
            <HardwarePanel />
          </Reveal>
          <Stagger as="ul" className="grid gap-px overflow-hidden rounded-card border border-line bg-line lg:col-span-6">
            {INFRA_POINTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <StaggerItem as="li" key={p.title} className="bg-white">
                  <div className="flex items-start gap-4 p-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-navy">
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="text-[17px] font-bold text-ink">{p.title}</h3>
                        <span className="font-mono text-[10px] text-faint">{pad2(i + 1)}</span>
                      </div>
                      <p className="mt-1 text-[15px] leading-relaxed text-body">{p.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
