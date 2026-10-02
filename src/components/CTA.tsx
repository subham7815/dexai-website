import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { LINKS } from "@/lib/constants";
import { PHOTOS } from "@/lib/photos";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-brand text-white" aria-labelledby="cta-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image src={PHOTOS.building.src} alt="" fill sizes="100vw" className="object-cover opacity-[0.14] mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/95 to-brand-dark/90" />
        <div className="absolute inset-0 hatch-light" />
      </div>
      <div className="container-x relative py-24 lg:py-32">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="rule-brand inline-flex items-center font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-white/80 before:!bg-white">
              Get started
            </span>
            <h2 id="cta-title" className="mt-5 text-balance text-[2.6rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[4.2rem]">
              Ready to automate your finances?
            </h2>
            <p className="mt-6 max-w-2xl text-balance text-xl text-white/85 sm:text-2xl">
              Spend less time processing documents and more time running your business.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
            <Button href={LINKS.getStarted} size="lg" variant="onDark" icon={<ArrowRight size={16} />}>
              Get Started
            </Button>
            <Button href={LINKS.bookDemo} size="lg" variant="onDarkGhost">
              Book a Demo
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
