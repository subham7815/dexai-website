import type { LucideIcon } from "lucide-react";
import { Check, FileSearch, Inbox, Layers, ScanLine, ShieldCheck, Sparkles, Timer, Workflow } from "lucide-react";

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Step {
  title: string;
  description: string;
}

export type ProductSlug =
  | "receipt-scanning"
  | "document-processing"
  | "expense-management"
  | "bank-reconciliation"
  | "vat-reporting"
  | "automation";

export interface ProductPage {
  slug: ProductSlug;
  navLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  metaDescription: string;
  benefits: Benefit[];
  steps: Step[];
}

export const PRODUCT_PAGES: Record<ProductSlug, ProductPage> = {
  "receipt-scanning": {
    slug: "receipt-scanning",
    navLabel: "AI Receipt Scanning",
    eyebrow: "AI receipt scanning",
    title: "Turn every receipt into structured data.",
    description:
      "Snap a photo, upload a file or forward an email. DexAI reads the receipt and returns supplier, date, amounts and VAT as clean fields ready for your books.",
    metaDescription: "AI receipt scanning from DexAI: photograph or forward receipts and extract supplier, date, VAT and totals automatically.",
    benefits: [
      { icon: ScanLine, title: "Reads any receipt", description: "Paper receipts, PDFs and emailed confirmations are handled the same way." },
      { icon: Sparkles, title: "Fields, not text", description: "Supplier, date, reference, subtotal, VAT, total and currency are returned as separate values." },
      { icon: ShieldCheck, title: "Confidence you can see", description: "Each field carries a confidence score so low-certainty values are easy to review." },
    ],
    steps: [
      { title: "Capture", description: "Use the camera, drag a file into DexAI or forward the receipt by email." },
      { title: "Extract", description: "AI identifies the supplier, date, reference, amounts and VAT rate." },
      { title: "Review", description: "Check anything flagged, then the expense is ready to categorise and match." },
    ],
  },
  "document-processing": {
    slug: "document-processing",
    navLabel: "Document Processing",
    eyebrow: "Document processing",
    title: "AI that understands your financial documents.",
    description:
      "Receipts, supplier invoices, bank statements, expense claims and VAT documents all arrive in different shapes. DexAI recognises each type and extracts what matters.",
    metaDescription: "DexAI processes receipts, invoices, bank statements, expense documents and VAT documents with AI extraction.",
    benefits: [
      { icon: Layers, title: "Every document type", description: "One inbox for receipts, invoices, statements and claims instead of separate tools." },
      { icon: FileSearch, title: "Line-level detail", description: "Invoices are read line by line, with totals, references and VAT captured." },
      { icon: Inbox, title: "Source file kept", description: "The original document stays attached to the extracted record for audit." },
    ],
    steps: [
      { title: "Receive", description: "Documents arrive by upload, camera or email forwarding." },
      { title: "Classify", description: "DexAI identifies whether it is a receipt, invoice, statement or claim." },
      { title: "Extract and route", description: "The right fields are extracted and the record moves to categorisation." },
    ],
  },
  "expense-management": {
    slug: "expense-management",
    navLabel: "Expense Management",
    eyebrow: "Expense management",
    title: "Expenses, organised automatically.",
    description:
      "Every processed document becomes a categorised, VAT-aware expense you can search, filter and export. Nothing gets retyped.",
    metaDescription: "Automated expense management with DexAI: categorised, VAT-aware expenses with search, filters and status tracking.",
    benefits: [
      { icon: Sparkles, title: "Automatic categories", description: "Expenses are classified into HMRC-aligned categories as they are processed." },
      { icon: Check, title: "Status at a glance", description: "See what is matched, pending or needs review without opening each record." },
      { icon: Timer, title: "Always current", description: "Totals, VAT and monthly figures update the moment a document is processed." },
    ],
    steps: [
      { title: "Process", description: "Receipts and invoices are extracted and categorised." },
      { title: "Review", description: "Filter by category, supplier or status and fix anything flagged." },
      { title: "Export", description: "Send clean expenses to your accounting software or reports." },
    ],
  },
  "bank-reconciliation": {
    slug: "bank-reconciliation",
    navLabel: "Bank Reconciliation",
    eyebrow: "Bank feeds & reconciliation",
    title: "Connect your bank. Let DexAI do the matching.",
    description:
      "Bank transactions and your receipts or invoices are paired automatically on amount, supplier and date, so reconciliation becomes a review rather than a chore.",
    metaDescription: "Bank feed integration and automatic transaction matching with DexAI.",
    benefits: [
      { icon: Workflow, title: "Live bank feeds", description: "Business account transactions flow into DexAI as they happen." },
      { icon: Sparkles, title: "AI matching", description: "Documents are paired with transactions using amount, supplier and date." },
      { icon: ShieldCheck, title: "Exceptions only", description: "Unmatched items are surfaced for a quick decision instead of a full manual pass." },
    ],
    steps: [
      { title: "Connect", description: "Link your business bank accounts to DexAI." },
      { title: "Match", description: "New transactions are compared with processed documents automatically." },
      { title: "Confirm", description: "Review suggested matches and resolve the few that need attention." },
    ],
  },
  "vat-reporting": {
    slug: "vat-reporting",
    navLabel: "VAT Reporting",
    eyebrow: "VAT & tax reporting",
    title: "Stay ready for VAT reporting.",
    description:
      "VAT is captured on every document as it is processed, so your reporting period figures are always current and built for Making Tax Digital workflows.",
    metaDescription: "VAT extraction and reporting with DexAI, built for Making Tax Digital workflows.",
    benefits: [
      { icon: Sparkles, title: "VAT on every document", description: "Rates and amounts are extracted at the point of processing." },
      { icon: Layers, title: "Period summaries", description: "VAT collected, VAT paid and net VAT for the reporting period, at any time." },
      { icon: ShieldCheck, title: "Digital records", description: "Records are kept in the digital format MTD workflows require." },
    ],
    steps: [
      { title: "Capture", description: "VAT amounts and rates are read from receipts and invoices." },
      { title: "Summarise", description: "Figures roll up into the current reporting period automatically." },
      { title: "Report", description: "Review the period summary and prepare your submission." },
    ],
  },
  automation: {
    slug: "automation",
    navLabel: "Automation",
    eyebrow: "Automation",
    title: "Your financial workflow, on autopilot.",
    description:
      "Each document moves through the same reliable pipeline, from AI vision to reporting, with every step logged and reviewable.",
    metaDescription: "DexAI automation pipeline: document capture, AI extraction, validation, categorisation, reconciliation and reporting.",
    benefits: [
      { icon: Workflow, title: "One pipeline", description: "Every document follows the same steps so results are consistent." },
      { icon: ShieldCheck, title: "Human review built in", description: "Low-confidence results are flagged rather than silently posted." },
      { icon: Timer, title: "Runs in the background", description: "Forward a document and the rest happens without you." },
    ],
    steps: [
      { title: "Document in", description: "A receipt, invoice or statement arrives." },
      { title: "Extract, validate, categorise", description: "AI reads it, checks the totals and assigns a category." },
      { title: "Reconcile and report", description: "It is matched to the bank and reflected in your reports." },
    ],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCT_PAGES) as ProductSlug[];
