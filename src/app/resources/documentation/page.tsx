import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { LINKS } from "@/lib/constants";
import { DOC_TOPICS } from "@/lib/content/resources";
import { pad2 } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Guides to every part of DexAI: getting started, capturing documents, expenses, bank feeds, VAT, multi-company, integrations and security.",
  alternates: { canonical: "/resources/documentation" },
};

export default function DocumentationPage() {
  return (
    <>
      <PageHero
        eyebrow="Documentation"
        title="Guides to every part of DexAI."
        description="Start with the basics, then go deeper into capture, expenses, bank feeds, VAT and integrations. Detailed step-by-step guides are available inside the product and from our team."
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "Documentation" }]}
        noActions
      />
      <section className="py-16 lg:py-24" aria-label="Documentation topics">
        <div className="container-x">
          <Stagger as="ul" className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {DOC_TOPICS.map((t, i) => {
              const Icon = t.icon;
              return (
                <StaggerItem as="li" key={t.title} className="bg-white">
                  <div className="flex h-full flex-col p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-navy">
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <span className="font-mono text-[11px] text-faint">{pad2(i + 1)}</span>
                    </div>
                    <h2 className="mt-5 text-[18px] font-bold tracking-tight text-ink">{t.title}</h2>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-body">{t.description}</p>
                    <ul className="mt-4 space-y-1.5 border-t border-line pt-4 text-[14px] text-muted">
                      {t.items.map((it) => (
                        <li key={it} className="flex items-center gap-2">
                          <span className="size-1 rounded-sm bg-brand" aria-hidden />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          <Reveal className="mt-10 flex flex-col items-start gap-4 rounded-card border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-[16px] text-body">Need a specific guide or help with setup? Our team can walk you through it.</p>
            <Button href={LINKS.contact} variant="secondary" icon={<ArrowRight size={15} />}>
              Contact support
            </Button>
          </Reveal>
        </div>
      </section>
      <CTA />
    </>
  );
}
