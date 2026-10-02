"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { useRef } from "react";
import { LINKS } from "@/lib/constants";
import { Button } from "./ui/Button";
import { HeroDashboard } from "./hero/HeroDashboard";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 50]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-line bg-surface pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-24" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 grid-bg opacity-60 [mask-image:linear-gradient(to_bottom,black_30%,transparent)]" />
        <div className="absolute -right-32 -top-32 h-[560px] w-[680px] rounded-full bg-[radial-gradient(closest-side,rgba(199,16,44,0.08),transparent)] blur-2xl" />
      </div>

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <motion.div initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2 text-[13px] font-medium text-body shadow-sm">
                <span className="size-1.5 rounded-full bg-brand" aria-hidden />
                Capture receipts. Automate expenses. Simplify bookkeeping.
              </span>
            </motion.div>

            <motion.h1
              id="hero-title"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.05 }}
              className="mt-6 text-balance text-[2.9rem] font-extrabold leading-[1.03] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.2rem]"
            >
              Financial automation, <span className="text-brand">powered by AI.</span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.12 }}
              className="mt-7 max-w-xl text-balance text-xl leading-relaxed text-body"
            >
              DexAI transforms receipts, invoices and financial documents into organised, actionable financial data — automatically.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href={LINKS.bookDemo} size="lg" icon={<ArrowRight size={16} />} className="sm:min-w-40">
                Book a Demo
              </Button>
              <Button href="/product" size="lg" variant="secondary">
                Explore the product
              </Button>
            </motion.div>

            <motion.ul
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[15px] text-body"
              aria-label="Highlights"
            >
              {["AI receipt scanning", "Bank reconciliation", "VAT reporting", "Multi-company"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check size={16} className="text-success" strokeWidth={2.4} aria-hidden />
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
