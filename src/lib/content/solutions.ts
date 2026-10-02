import { Building2, Calculator, Store, UserRound, type LucideIcon } from "lucide-react";

export type SolutionSlug = "small-business" | "accountants" | "multi-company" | "freelancers";

export interface SolutionPage {
  slug: SolutionSlug;
  navLabel: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  metaDescription: string;
  /** Before / after pairs. */
  shifts: { before: string; after: string }[];
  /** Product pages most relevant to this audience. */
  related: { label: string; href: string }[];
}

export const SOLUTION_PAGES: Record<SolutionSlug, SolutionPage> = {
  "small-business": {
    slug: "small-business",
    navLabel: "Small Businesses",
    icon: Store,
    eyebrow: "For small businesses",
    title: "Bookkeeping that keeps up with the business.",
    description:
      "Receipts in a drawer, invoices in an inbox and a bank feed nobody reconciles. DexAI captures everything as it happens so month end is a review, not a rebuild.",
    metaDescription: "DexAI for small businesses: automated receipt capture, expense categorisation, bank reconciliation and VAT reporting.",
    shifts: [
      { before: "Receipts photographed, then forgotten", after: "Every receipt captured and categorised the day it is spent" },
      { before: "A reconciliation session each quarter", after: "Bank transactions matched automatically as they arrive" },
      { before: "VAT figures assembled at the deadline", after: "Period VAT totals available at any time" },
      { before: "Spreadsheet exports to the accountant", after: "Clean records synced to Xero, QuickBooks, FreeAgent or Sage" },
    ],
    related: [
      { label: "AI Receipt Scanning", href: "/product/receipt-scanning" },
      { label: "Expense Management", href: "/product/expense-management" },
      { label: "Bank Reconciliation", href: "/product/bank-reconciliation" },
      { label: "VAT Reporting", href: "/product/vat-reporting" },
    ],
  },
  accountants: {
    slug: "accountants",
    navLabel: "Accountants & Bookkeepers",
    icon: Calculator,
    eyebrow: "For accountants & bookkeepers",
    title: "Clean client records, without the chasing.",
    description:
      "Clients forward documents, DexAI does the extraction, categorisation and matching, and you review exceptions instead of keying data.",
    metaDescription: "DexAI for accountants and bookkeepers: AI document processing, categorisation and reconciliation across client companies.",
    shifts: [
      { before: "Chasing clients for missing receipts", after: "Clients snap or forward documents the moment they get them" },
      { before: "Manual data entry per client", after: "AI extraction with confidence scores for review" },
      { before: "Switching between client logins", after: "Multiple companies managed from one dashboard" },
      { before: "Rework when categories are wrong", after: "Consistent categorisation applied the same way every time" },
    ],
    related: [
      { label: "Document Processing", href: "/product/document-processing" },
      { label: "Multi-Company Management", href: "/features/multi-company" },
      { label: "Bank Reconciliation", href: "/product/bank-reconciliation" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  "multi-company": {
    slug: "multi-company",
    navLabel: "Multi-Company Groups",
    icon: Building2,
    eyebrow: "For multi-company groups",
    title: "Several entities. One place to run finance.",
    description:
      "Keep each company's books separate while managing them all from a single login, with the same automation applied across every entity.",
    metaDescription: "DexAI for groups with multiple companies: separate books per entity, one dashboard, consistent automation.",
    shifts: [
      { before: "A different process for each company", after: "The same capture-to-report pipeline across every entity" },
      { before: "Consolidating figures by hand", after: "Per-company expense and VAT summaries side by side" },
      { before: "Documents filed to the wrong entity", after: "Each document assigned to the right company's books" },
      { before: "Access shared by email", after: "Access controlled per user and per company" },
    ],
    related: [
      { label: "Multi-Company Management", href: "/features/multi-company" },
      { label: "Financial Analytics", href: "/features/financial-analytics" },
      { label: "Automation", href: "/product/automation" },
      { label: "Security & Trust", href: "/security" },
    ],
  },
  freelancers: {
    slug: "freelancers",
    navLabel: "Freelancers & Contractors",
    icon: UserRound,
    eyebrow: "For freelancers & contractors",
    title: "Receipts, mileage and VAT, sorted on your phone.",
    description:
      "Capture receipts as you go, log business journeys at HMRC rates and keep VAT figures ready, without spending evenings on admin.",
    metaDescription: "DexAI for freelancers and contractors: receipt capture, mileage tracking and VAT reporting in one app.",
    shifts: [
      { before: "A shoebox of receipts at year end", after: "Receipts captured and categorised as you spend" },
      { before: "Mileage estimated from memory", after: "Journeys logged with the HMRC rate applied" },
      { before: "Guessing VAT owed", after: "VAT collected and paid tracked through the period" },
      { before: "Exporting everything for the accountant", after: "Records synced straight to your accounting software" },
    ],
    related: [
      { label: "AI Receipt Scanning", href: "/product/receipt-scanning" },
      { label: "Mileage Tracking", href: "/features/mileage-tracking" },
      { label: "VAT Reporting", href: "/product/vat-reporting" },
      { label: "Expense Management", href: "/product/expense-management" },
    ],
  },
};

export const SOLUTION_SLUGS = Object.keys(SOLUTION_PAGES) as SolutionSlug[];
