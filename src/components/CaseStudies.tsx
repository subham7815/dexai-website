import { ArrowRight, Quote } from "lucide-react";
import Link from "next/link";
import { LINKS } from "@/lib/constants";
import { CASE_STUDIES, CASE_STUDY_STRUCTURE } from "@/lib/content/stories";
import { cn, pad2, sectionPad, type SectionProps } from "@/lib/utils";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

function Field({ label, children, muted }: { label: string; children: React.ReactNode; muted?: boolean }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{label}</div>
      <div className={cn("mt-1 text-[15px] leading-relaxed", muted ? "italic text-muted" : "text-body")}>{children}</div>
    </div>
  );
}

export function CaseStudies({ hideHeading }: SectionProps) {
  return (
    <section id="case-studies" className={cn("scroll-mt-24", sectionPad(hideHeading))} aria-label="Case studies">
      <div className="container-x">
        {!hideHeading ? (
          <SectionHeading
            eyebrow="Case studies"
            title="How teams put DexAI to work."
            description="Every case study follows the same structure, and every figure is verified by the customer before it is published."
          />
        ) : null}

        {/* Structure */}
        <Reveal className={cn(!hideHeading && "mt-14 lg:mt-20")}>
          <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-brand">What each case study covers</div>
          <ol className="mt-5 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {CASE_STUDY_STRUCTURE.map((s, i) => (
              <li key={s.title} className="bg-white p-5">
                <div className="font-mono text-[11px] text-faint">{pad2(i + 1)}</div>
                <div className="mt-2 text-[16px] font-bold text-ink">{s.title}</div>
                <p className="mt-1 text-[14px] leading-relaxed text-muted">{s.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Stories */}
        <Stagger as="ul" className="mt-14 grid gap-5 lg:grid-cols-3">
          {CASE_STUDIES.map((c) => (
            <StaggerItem as="li" key={c.slug} className="min-w-0">
              <article className="flex h-full min-w-0 flex-col rounded-card border border-line bg-white">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-6 py-4">
                  <Badge tone="navy">{c.segment}</Badge>
                  {c.placeholder ? <Badge tone="neutral">Publication pending</Badge> : null}
                </div>
                <div className="flex flex-1 flex-col gap-5 p-6">
                  <h3 className="text-xl font-bold tracking-tight text-ink">{c.title}</h3>
                  <Field label="Customer overview" muted={c.placeholder}>{c.overview}</Field>
                  <Field label="Business challenge">{c.challenge}</Field>
                  <Field label="DexAI solution">{c.solution}</Field>
                  <Field label="Implementation approach">{c.implementation}</Field>
                  <div className="grid grid-cols-2 gap-3 rounded-lg border border-line bg-surface p-3">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Before</div>
                      <ul className="mt-1.5 space-y-1 text-[13px] text-muted">
                        {c.before.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-success">After</div>
                      <ul className="mt-1.5 space-y-1 text-[13px] font-medium text-ink">
                        {c.after.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Quantifiable results</div>
                    {c.results.length ? (
                      <dl className="mt-2 grid grid-cols-2 gap-2">
                        {c.results.map((r) => (
                          <div key={r.label} className="rounded-lg border border-line p-3">
                            <dd className="text-2xl font-bold tabular text-ink">{r.value}</dd>
                            <dt className="text-[12px] text-muted">{r.label}</dt>
                          </div>
                        ))}
                      </dl>
                    ) : (
                      <div className="mt-2 grid grid-cols-2 gap-2" aria-label="Results to be published">
                        {[0, 1].map((k) => (
                          <div key={k} className="rounded-lg border border-dashed border-line p-3">
                            <div className="h-6 w-16 rounded bg-line-soft" aria-hidden />
                            <div className="mt-1.5 text-[11px] text-faint">Verified on publication</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="rounded-lg border border-line p-4">
                    <Quote size={16} className="text-brand" aria-hidden />
                    {c.quote ? (
                      <>
                        <p className="mt-2 text-[15px] leading-relaxed text-ink">&ldquo;{c.quote.text}&rdquo;</p>
                        <div className="mt-2 text-[13px] text-muted">
                          {c.quote.name}, {c.quote.title}, {c.quote.company}
                        </div>
                      </>
                    ) : (
                      <p className="mt-2 text-[14px] italic text-muted">Customer quote appears here once approved.</p>
                    )}
                  </div>
                </div>
                <div className="border-t border-line p-4">
                  {c.href && !c.placeholder ? (
                    <Link href={c.href} className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink hover:text-brand">
                      Read Case Study <ArrowRight size={15} />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-faint" aria-disabled="true">
                      Read Case Study <ArrowRight size={15} />
                    </span>
                  )}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 flex flex-col items-start gap-4 rounded-card border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-[16px] text-body">
            Customer names, logos, figures and quotes are published only with the customer&apos;s approval. Want a reference call or to share your own story?
          </p>
          <Button href={LINKS.contact} variant="secondary" icon={<ArrowRight size={15} />}>
            Talk to us
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
