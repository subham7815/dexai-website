import Image from "next/image";
import { cn, sectionPad, type SectionProps } from "@/lib/utils";
import { BrowserFrame } from "./ui/BrowserFrame";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

/** Real screenshot of the DexAI web app (public/product/landing.png). */
export function ProductScreenshot({ hideHeading }: SectionProps) {
  return (
    <section className={cn("scroll-mt-24", sectionPad(hideHeading))} aria-label="DexAI web app">
      <div className="container-x">
        {!hideHeading ? (
          <SectionHeading
            eyebrow="The web app"
            title="Document processing, in your browser."
            description="Extract data from bank statements, receipts and invoices in the DexAI web app."
          />
        ) : null}
        <Reveal className={cn("mx-auto max-w-5xl", !hideHeading && "mt-14 lg:mt-20")}>
          <BrowserFrame url="app.dexaitech.com">
            <Image
              src="/product/landing.png"
              alt="The DexAI web app: AI-powered financial document processing for bank statements, receipts and invoices."
              width={1250}
              height={620}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="h-auto w-full"
            />
          </BrowserFrame>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">Screenshot of the DexAI web app.</p>
        </Reveal>
      </div>
    </section>
  );
}
