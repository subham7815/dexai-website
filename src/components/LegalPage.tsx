import type { ReactNode } from "react";
import { SITE } from "@/lib/constants";
import { PageHero } from "./PageHero";
import { Reveal } from "./ui/Reveal";

export interface LegalSection {
  title: string;
  body: ReactNode;
}

interface LegalPageProps {
  title: string;
  description: string;
  crumb: string;
  updated: string;
  /** Short notice shown above the content. */
  notice?: ReactNode;
  sections: LegalSection[];
}

/** Plain, readable layout for policy pages. */
export function LegalPage({ title, description, crumb, updated, notice, sections }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={description} crumbs={[{ label: crumb }]} noActions />
      <section className="py-14 lg:py-20" aria-label={title}>
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Last updated {updated}</p>
            {notice ? <div className="mt-5 rounded-card border border-line bg-surface p-5 text-[15px] leading-relaxed text-body">{notice}</div> : null}
            <div className="mt-8 space-y-10">
              {sections.map((s) => (
                <section key={s.title}>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">{s.title}</h2>
                  <div className="mt-3 space-y-3 text-[17px] leading-relaxed text-body">{s.body}</div>
                </section>
              ))}
              <section>
                <h2 className="text-2xl font-bold tracking-tight text-ink">Questions</h2>
                <p className="mt-3 text-[17px] leading-relaxed text-body">
                  Write to{" "}
                  <a href={`mailto:${SITE.email}`} className="font-semibold text-ink underline underline-offset-4">
                    {SITE.email}
                  </a>{" "}
                  and the DexAI team will reply.
                </p>
              </section>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
