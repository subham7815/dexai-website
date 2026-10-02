"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { SITE } from "@/lib/constants";
import { Button } from "./ui/Button";

const TOPICS = ["Book a product demo", "Plan a data migration", "Integrations", "Something else"] as const;

const field =
  "mt-2 block w-full rounded-lg border border-line-strong bg-white px-4 py-3 text-[16px] text-ink placeholder:text-faint focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/15";
const label = "block font-mono text-[11px] uppercase tracking-[0.14em] text-muted";

/**
 * Demo-request form. The site has no backend, so submitting opens the
 * visitor's email app with the details filled in and addressed to DexAI.
 */
export function ContactForm({ defaultTopic = TOPICS[0] }: { defaultTopic?: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const subject = `${get("topic")} - ${get("company") || get("name")}`;
    const body = [
      `Name: ${get("name")}`,
      `Work email: ${get("email")}`,
      `Company: ${get("company")}`,
      "",
      get("message"),
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card-lg border border-line bg-white p-6 shadow-card sm:p-8" aria-label="Book a demo">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className={label}>Your name</label>
          <input id="c-name" name="name" required autoComplete="name" className={field} placeholder="Full name" />
        </div>
        <div>
          <label htmlFor="c-email" className={label}>Work email</label>
          <input id="c-email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="c-company" className={label}>Company</label>
          <input id="c-company" name="company" autoComplete="organization" className={field} placeholder="Company name" />
        </div>
        <div>
          <label htmlFor="c-topic" className={label}>I would like to</label>
          <select id="c-topic" name="topic" defaultValue={defaultTopic} className={field}>
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="c-message" className={label}>What would you like to see?</label>
        <textarea id="c-message" name="message" rows={5} className={field} placeholder="Tell us about your documents, volumes and the tools you use." />
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" icon={<ArrowRight size={16} />}>
          Send demo request
        </Button>
        <p className="max-w-sm text-[13px] leading-relaxed text-muted">
          This opens your email app with your details filled in, addressed to {SITE.email}. Nothing is stored on this site.
        </p>
      </div>
      {sent ? (
        <p role="status" className="mt-5 rounded-lg border border-line bg-surface px-4 py-3 text-[14px] text-body">
          If your email app did not open, write to{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-ink underline underline-offset-4">
            {SITE.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
