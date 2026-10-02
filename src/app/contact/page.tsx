import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Book a DexAI demo or get in touch with the team about migration, integrations and your document workflow.",
  alternates: { canonical: "/contact" },
};

const DETAILS = [
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Address", value: SITE.address },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a demo"
        title="Talk to the DexAI team."
        description="Tell us about your documents and the tools you use, and we will show you how DexAI fits."
        crumbs={[{ label: "Contact" }]}
        noActions
      />
      <section className="py-16 lg:py-24" aria-label="Contact">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand">Or reach us directly</div>
            <ul className="mt-6 divide-y divide-line rounded-card border border-line bg-white">
              {DETAILS.map((d) => {
                const Icon = d.icon;
                const inner = (
                  <div className="flex items-start gap-4 p-5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-navy">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{d.label}</div>
                      <div className="mt-0.5 break-words text-[17px] font-semibold text-ink">{d.value}</div>
                    </div>
                  </div>
                );
                return (
                  <li key={d.label}>
                    {"href" in d ? (
                      <a href={d.href} className="block transition-colors hover:bg-surface">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
