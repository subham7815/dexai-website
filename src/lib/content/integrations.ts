import type { Step } from "./product";

export type IntegrationSlug = "xero" | "quickbooks" | "freeagent" | "sage" | "hmrc";

export interface IntegrationPage {
  slug: IntegrationSlug;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  metaDescription: string;
  /** What flows from DexAI into the tool. */
  syncs: string[];
  steps: Step[];
  note?: string;
}

const ACCOUNTING_STEPS: Step[] = [
  { title: "Connect", description: "Authorise the connection from DexAI's integration settings." },
  { title: "Process in DexAI", description: "Documents are extracted, categorised and matched as usual." },
  { title: "Sync", description: "Clean records flow into your accounting software." },
];

export const INTEGRATION_PAGES: Record<IntegrationSlug, IntegrationPage> = {
  xero: {
    slug: "xero",
    name: "Xero",
    eyebrow: "Xero integration",
    title: "DexAI and Xero.",
    description: "Process receipts and invoices in DexAI and keep your Xero books up to date with categorised, reconciled records.",
    metaDescription: "Connect DexAI with Xero to sync categorised expenses and source documents.",
    syncs: ["Categorised expenses with their source documents", "Supplier invoice details and references", "VAT amounts captured on each record"],
    steps: ACCOUNTING_STEPS,
  },
  quickbooks: {
    slug: "quickbooks",
    name: "QuickBooks",
    eyebrow: "QuickBooks integration",
    title: "DexAI and QuickBooks.",
    description: "Let DexAI handle capture, extraction and matching, then push processed transactions into QuickBooks.",
    metaDescription: "Connect DexAI with QuickBooks to push processed, categorised transactions.",
    syncs: ["Processed expense transactions", "Supplier and reference details", "VAT amounts captured on each record"],
    steps: ACCOUNTING_STEPS,
  },
  freeagent: {
    slug: "freeagent",
    name: "FreeAgent",
    eyebrow: "FreeAgent integration",
    title: "DexAI and FreeAgent.",
    description: "Keep FreeAgent current with reconciled, categorised data from DexAI's document processing.",
    metaDescription: "Connect DexAI with FreeAgent to keep books current with reconciled data.",
    syncs: ["Categorised expenses and receipts", "Matched bank transactions", "VAT amounts captured on each record"],
    steps: ACCOUNTING_STEPS,
  },
  sage: {
    slug: "sage",
    name: "Sage",
    eyebrow: "Sage integration",
    title: "DexAI and Sage.",
    description: "Export organised financial records from DexAI into Sage so your ledgers reflect every processed document.",
    metaDescription: "Connect DexAI with Sage to export organised financial records.",
    syncs: ["Organised expense records", "Supplier invoice details", "VAT amounts captured on each record"],
    steps: ACCOUNTING_STEPS,
  },
  hmrc: {
    slug: "hmrc",
    name: "HMRC",
    eyebrow: "HMRC · Making Tax Digital",
    title: "Built for Making Tax Digital workflows.",
    description:
      "DexAI keeps VAT records digitally and prepares period figures in the format Making Tax Digital workflows require, so submissions start from accurate data.",
    metaDescription: "DexAI supports Making Tax Digital workflows with digital VAT records and period summaries.",
    syncs: ["Digital records for every VAT-bearing document", "VAT collected, VAT paid and net VAT per period", "Mileage claims calculated at HMRC rates"],
    steps: [
      { title: "Capture VAT", description: "VAT rates and amounts are extracted from each document." },
      { title: "Build the period", description: "Figures roll up into the current reporting period." },
      { title: "Prepare submission", description: "Review the summary and proceed with your MTD submission." },
    ],
    note: "Making Tax Digital is an HMRC programme. DexAI supports MTD workflows; check current HMRC guidance for submission requirements.",
  },
};

export const INTEGRATION_SLUGS = Object.keys(INTEGRATION_PAGES) as IntegrationSlug[];
