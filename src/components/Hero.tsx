"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useRef } from "react";
import { LINKS } from "@/lib/constants";
import { Button } from "./ui/Button";
import { Eyebrow } from "./ui/SectionHeading";
import { HeroDashboard } from "./hero/HeroDashboard";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 50]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy-ink pt-32 pb-16 text-white sm:pt-36 lg:pt-44 lg:pb-24" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 grid-bg-dark [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" />
        <div className="absolute -left-40 top-0 h-[600px] w-[700px] rounded-full bg-[radial-gradient(closest-side,rgba(27,42,107,0.75),transparent)] blur-2xl" />
        <div className="absolute -bottom-40 right-[-10%] h-[520px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(199,16,44,0.28),transparent)] blur-2xl" />
      </div>

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <motion.div initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
              <Eyebrow tone="dark">Capture receipts. Automate expenses. Simplify bookkeeping.</Eyebrow>
            </motion.div>

            <motion.h1
              id="hero-title"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.05 }}
              className="mt-6 text-balance text-[2.9rem] font-bold leading-[1.0] tracking-[-0.03em] sm:text-6xl lg:text-[4.6rem]"
            >
              Financial automation, <span className="text-brand-on-dark">powered by AI.</span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.12 }}
              className="mt-7 max-w-xl text-balance text-xl leading-relaxed text-on-dark"
            >
              DexAI transforms receipts, invoices and financial documents into organised, actionable financial data — automatically.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href={LINKS.getStarted} size="lg" icon={<ArrowRight size={16} />} className="sm:min-w-40">
                Get Started
              </Button>
              <Button href={LINKS.bookDemo} size="lg" variant="onDarkGhost" icon={<PlayCircle size={16} />}>
                Book a Demo
              </Button>
            </motion.div>

            <motion.ul
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-6 font-mono text-[12px] uppercase tracking-[0.12em] text-on-dark sm:flex sm:flex-wrap"
              aria-label="Highlights"
            >
              {["AI receipt scanning", "Bank reconciliation", "VAT reporting", "Multi-company"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-sm bg-brand-on-dark" aria-hidden />
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            style={{ y: yVisual }}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="relative lg:col-span-7"
          >
            <HeroDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
