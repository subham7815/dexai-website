"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AGENT_CHAIN, ARCHITECTURE, type FlowNode } from "@/lib/content/technology";

const SOURCES: Record<FlowSource, FlowNode[]> = { agents: AGENT_CHAIN, architecture: ARCHITECTURE };
export type FlowSource = "agents" | "architecture";
import { cn, pad2 } from "@/lib/utils";

interface NodeFlowProps {
  /** Which node set to render; data stays on the client so icons never cross the server boundary. */
  source: FlowSource;
  tone?: "light" | "dark";
  /** Auto-advance interval in ms. */
  interval?: number;
  className?: string;
  ariaLabel: string;
}

/**
 * Interactive, auto-advancing flow diagram. Horizontal on large screens,
 * vertical below. Clicking a node selects it and pauses auto-advance briefly.
 */
export function NodeFlow({ source, tone = "light", interval = 1700, className, ariaLabel }: NodeFlowProps) {
  const nodes = SOURCES[source];
  const dark = tone === "dark";
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const [active, setActive] = useState(reduce ? nodes.length - 1 : 0);
  /** Number of auto-advance ticks to skip after a manual selection. */
  const skipTicks = useRef(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => {
      if (skipTicks.current > 0) {
        skipTicks.current -= 1;
        return;
      }
      setActive((a) => (a + 1) % nodes.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [inView, reduce, interval, nodes.length]);

  const select = (i: number) => {
    skipTicks.current = Math.ceil(8000 / interval);
    setActive(i);
  };

  const current = nodes[active];
  const CurrentIcon = current.icon;

  return (
    <div ref={ref} className={className}>
      <ol
        className="grid gap-y-5 lg:gap-y-0 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
        style={{ "--cols": nodes.length } as React.CSSProperties}
        aria-label={ariaLabel}
        role="tablist"
        aria-orientation="horizontal"
      >
        {nodes.map((n, i) => {
          const Icon = n.icon;
          const isActive = active === i;
          const isDone = active > i;
          return (
            <li key={n.key} className="relative flex lg:flex-col lg:items-center" role="presentation">
              {i < nodes.length - 1 ? (
                <div
                  className={cn("absolute left-[27px] top-14 h-[calc(100%-28px)] w-px lg:left-1/2 lg:top-7 lg:h-px lg:w-full", dark ? "bg-white/12" : "bg-line-strong")}
                  aria-hidden
                >
                  <motion.div
                    initial={false}
                    animate={{ scaleX: isDone ? 1 : 0, scaleY: isDone ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full w-full origin-top bg-brand lg:origin-left"
                  />
                </div>
              ) : null}

              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => select(i)}
                className={cn(
                  "relative z-10 flex size-14 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300",
                  isActive && "border-brand bg-brand text-white",
                  isDone && (dark ? "border-brand-on-dark/50 bg-navy-deep text-brand-on-dark" : "border-navy bg-navy-soft text-navy"),
                  !isActive && !isDone && (dark ? "border-white/15 bg-white/5 text-on-dark hover:border-white/40" : "border-line bg-white text-muted hover:border-ink/40"),
                )}
              >
                {isActive && !reduce ? (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-lg border-2 border-brand"
                    initial={{ opacity: 0.8, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.45 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                  />
                ) : null}
                <Icon size={20} strokeWidth={1.8} />
              </button>

              <div className="ml-4 min-w-0 lg:ml-0 lg:mt-4 lg:px-2 lg:text-center">
                <div className={cn("font-mono text-[11px] uppercase tracking-[0.14em]", isActive ? "text-brand" : dark ? "text-on-dark/70" : "text-faint")}>{pad2(i + 1)}</div>
                <div className={cn("mt-0.5 text-[14px] font-bold leading-snug", dark ? (isActive ? "text-white" : "text-white/85") : isActive ? "text-ink" : "text-ink/80")}>{n.label}</div>
                <p className={cn("mt-0.5 text-[12.5px] leading-snug", dark ? "text-on-dark/80" : "text-muted")}>{n.caption}</p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Detail panel */}
      <div className={cn("mt-10 rounded-card border p-6 sm:p-7", dark ? "border-white/12 bg-white/[0.04]" : "border-line bg-white")} role="tabpanel">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.key}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-6"
          >
            <span className={cn("flex size-11 items-center justify-center rounded-lg", dark ? "bg-brand text-white" : "bg-brand-soft text-brand")}>
              <CurrentIcon size={20} strokeWidth={1.8} />
            </span>
            <div>
              <div className={cn("font-mono text-[11px] uppercase tracking-[0.14em]", dark ? "text-brand-on-dark" : "text-brand")}>
                Stage {pad2(active + 1)} of {pad2(nodes.length)}
              </div>
              <h3 className={cn("mt-1 text-xl font-bold tracking-tight", dark ? "text-white" : "text-ink")}>{current.label}</h3>
              <p className={cn("mt-2 max-w-3xl text-[16px] leading-relaxed", dark ? "text-on-dark" : "text-body")}>{current.detail}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
