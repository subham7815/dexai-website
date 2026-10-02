/**
 * Case studies and testimonials.
 *
 * DexAI does not publish customer names, logos, statistics or quotes until a
 * customer has approved them. Until then these arrays hold clearly labelled
 * placeholders so the page layouts are complete. Replace or extend the
 * entries with approved content; set `placeholder: false` to show them as
 * real stories.
 */

export interface CaseStudy {
  slug: string;
  placeholder: boolean;
  /** Industry or segment label; never a customer name unless approved. */
  segment: string;
  title: string;
  overview: string;
  challenge: string;
  solution: string;
  implementation: string;
  before: string[];
  after: string[];
  /** Verified results only. Left empty for placeholders. */
  results: { label: string; value: string }[];
  quote?: { text: string; name: string; title: string; company: string };
  href?: string;
}

const PENDING = "Published with customer approval.";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "retail",
    placeholder: true,
    segment: "Retail",
    title: "Receipts and supplier invoices for a multi-site retailer",
    overview: PENDING,
    challenge: "High receipt volume across sites, with paper arriving late and bank reconciliation done in batches.",
    solution: "Store teams forward receipts as they are issued; the Receipt and Reconciliation Agents handle extraction and matching.",
    implementation: "Bank feeds connected first, then email forwarding per site, then accounting sync.",
    before: ["Receipts posted weekly from each site", "Reconciliation in a monthly batch"],
    after: ["Receipts captured the day they are issued", "Transactions matched as they arrive"],
    results: [],
  },
  {
    slug: "professional-services",
    placeholder: true,
    segment: "Professional services",
    title: "Invoice processing and VAT for a services firm",
    overview: PENDING,
    challenge: "Supplier invoices keyed by hand, with VAT figures assembled at the deadline.",
    solution: "The Invoice Agent captures line items and VAT; period figures are kept current for Making Tax Digital workflows.",
    implementation: "Invoice inbox forwarding, category mapping, then Xero sync.",
    before: ["Manual invoice entry", "VAT totals built at quarter end"],
    after: ["Invoices read line by line on arrival", "VAT summary available at any time"],
    results: [],
  },
  {
    slug: "multi-entity",
    placeholder: true,
    segment: "Multi-entity group",
    title: "One finance process across several companies",
    overview: PENDING,
    challenge: "Different bookkeeping routines per entity and documents filed to the wrong company.",
    solution: "Multi-company management with the same capture-to-report pipeline for every entity.",
    implementation: "Entities created, routing rules set, historical records migrated by the Data Migration Agent.",
    before: ["A separate process per company", "Consolidation by hand"],
    after: ["One pipeline, separate books", "Per-company summaries side by side"],
    results: [],
  },
];

export interface Testimonial {
  placeholder: boolean;
  quote: string;
  name: string;
  title: string;
  company: string;
  /** Path to an approved logo in /public, if the customer has authorised it. */
  logo?: string;
  /** Optional video URL (MP4 or embed) if the customer has provided one. */
  videoUrl?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    placeholder: true,
    quote: "Customer quote appears here once approved.",
    name: "Customer name",
    title: "Job title",
    company: "Company",
  },
  {
    placeholder: true,
    quote: "A second approved customer story will appear here.",
    name: "Customer name",
    title: "Job title",
    company: "Company",
  },
  {
    placeholder: true,
    quote: "A third approved customer story will appear here.",
    name: "Customer name",
    title: "Job title",
    company: "Company",
  },
];

export const CASE_STUDY_STRUCTURE = [
  { title: "Customer overview", description: "Who the customer is, their size and the finance work they handle." },
  { title: "Business challenge", description: "The manual process, delay or risk that prompted the change." },
  { title: "DexAI solution", description: "Which capabilities and agents were used, and how they fit together." },
  { title: "Implementation approach", description: "The order things were connected and how long each step took." },
  { title: "Before vs after", description: "The old routine next to the new one, step by step." },
  { title: "Quantifiable results", description: "Measured outcomes, published only after the customer has verified them." },
  { title: "Customer quote", description: "In the customer's own words, with their name and role." },
  { title: "Read the case study", description: "Each story links to its full write-up." },
];
