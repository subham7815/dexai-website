"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn, pad2, sectionPad, type SectionProps } from "@/lib/utils";
import { DEMO_SCREENS, SCREEN_COMPONENTS, type DemoScreenKey } from "./demo/DemoScreens";
import { DemoTag } from "./ui/Badge";
import { BrowserFrame } from "./ui/BrowserFrame";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const STEP_MS = 3600;

export function ProductDemo({ hideHeading }: SectionProps) {
  const reduce = useReducedMotion();
  const [screen, setScreen] = useState<DemoScreenKey>("dashboard");
  const [playing, setPlaying] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const index = DEMO_SCREENS.findIndex((s) => s.key === screen);

  const go = useCallback((key: DemoScreenKey) => {
    setScreen(key);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      const next = DEMO_SCREENS[(index + 1) % DEMO_SCREENS.length].key;
      go(next);
    }, STEP_MS);
    return () => window.clearTimeout(id);
  }, [playing, index, go]);

  const Screen = SCREEN_COMPONENTS[screen];

  return (
    <section id="demo" className={cn("scroll-mt-24 border-y border-line bg-surface", sectionPad(hideHeading))} aria-label="Product demo">
      <div className="container-x">
        {!hideHeading ? (
          <SectionHeading
            id="demo-title"
            eyebrow="Product demo"
            title="See DexAI in action."
            description="Walk through the product from first upload to final report. Play the demo or explore each step yourself."
          />
        ) : null}

        <Reveal className={cn("flex flex-col gap-3 sm:flex-row", !hideHeading && "mt-12")}>
          <Button onClick={() => setPlaying((p) => !p)} icon={playing ? <Pause size={15} /> : <Play size={15} />} aria-pressed={playing} className="w-full sm:w-auto">
            {playing ? "Pause Demo" : "Play Demo"}
          </Button>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {/* Underline tabs */}
          <div role="tablist" aria-label="Demo steps" className="-mx-5 flex gap-6 overflow-x-auto border-b border-line px-5 scrollbar-none sm:mx-0 sm:px-0">
            {DEMO_SCREENS.map((s, i) => {
              const active = s.key === screen;
              return (
                <button
                  key={s.key}
                  role="tab"
                  id={`demo-tab-${s.key}`}
                  aria-selected={active}
                  aria-controls="demo-panel"
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    go(s.key);
                  }}
                  className={cn("relative flex shrink-0 items-center gap-2 pb-3 pt-1 text-[15px] font-semibold transition-colors", active ? "text-ink" : "text-muted hover:text-ink")}
                >
                  <span className={cn("font-mono text-[11px]", active ? "text-brand" : "text-faint")}>{pad2(i + 1)}</span>
                  {s.label}
                  <span className={cn("absolute inset-x-0 bottom-0 h-0.5 bg-ink transition-opacity", active ? "opacity-100" : "opacity-0")} aria-hidden />
                  {active && playing && !reduce ? (
                    <motion.span
                      key={progressKey}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand"
                      aria-hidden
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${screen}`} className="relative mt-6">
            <BrowserFrame url={`app.dexai.app/${screen === "dashboard" ? "" : screen}`} bodyClassName="h-[440px] sm:h-[460px]" aside={<DemoTag />}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={screen}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Screen />
                </motion.div>
              </AnimatePresence>
            </BrowserFrame>
            <p className="mt-4 text-[15px] text-muted" aria-live="polite">
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-brand">
                {pad2(index + 1)} · {DEMO_SCREENS[index].label}
              </span>
              <span className="ml-3">{DEMO_SCREENS[index].caption}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
