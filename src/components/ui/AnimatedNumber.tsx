"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  /** Formatter applied to the live value. */
  format?: (n: number) => string;
  duration?: number;
  className?: string;
  delay?: number;
}

/** Counts up from 0 to `value` when scrolled into view. */
export function AnimatedNumber({ value, format = (n) => Math.round(n).toLocaleString("en-GB"), duration = 1.4, className, delay = 0 }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(() => format(reduce ? value : 0));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      const raf = window.requestAnimationFrame(() => setDisplay(format(value)));
      return () => window.cancelAnimationFrame(raf);
    }
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(format(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
