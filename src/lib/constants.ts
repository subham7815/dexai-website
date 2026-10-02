/**
 * Site-wide constants: links, navigation and demo data.
 *
 * All financial figures in this file are SAMPLE DATA used purely to
 * demonstrate the DexAI interface. They do not represent real accounts.
 */

import { Briefcase, Calculator, Cloud, FileCheck2, Landmark, Library, type LucideIcon } from "lucide-react";

export const SITE = {
  name: "DexAI",
  tagline: "Financial automation, powered by AI.",
  description:
    "DexAI transforms receipts, invoices and financial documents into organised, actionable financial data — automatically. AI receipt scanning, expense tracking, bank reconciliation and VAT reporting in one place.",
  url: "https://dexai.app",
  email: "hello@dexai.app",
  phone: "+44 20 1234 5678",
  address: "3rd Floor, 45 Albemarle Street, Mayfair, London, W1S 4JL",
} as const;

export const LINKS = {
  bookDemo: "/contact",
  blog: "https://dexai.app/blog",
  about: "https://dexai.app/about",
  team: "https://dexai.app/team",
  contact: "/contact",
  services: "https://dexai.app/services",
  privacy: "https://dexai.app/privacy-policy",
  terms: "https://dexai.app/terms-and-conditions",
  cookies: "https://dexai.app/cookie-policy",
  gdpr: "https://dexai.app/gdpr-compliance",
} as const;

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const LEGAL_LINKS: NavItem[] = [
  { label: "Privacy Policy", href: LINKS.privacy, external: true },
  { label: "Cookie Policy", href: LINKS.cookies, external: true },
  { label: "Terms & Conditions", href: LINKS.terms, external: true },
  { label: "Security", href: "/security" },
  { label: "GDPR", href: LINKS.gdpr, external: true },
];

/* ------------------------------------------------------------------
   Integrations (factual list from dexai.app)
------------------------------------------------------------------- */
export interface Integration {
  id: string;
  name: string;
  /** Neutral glyph shown in the badge; partner logos are not bundled. */
  icon: LucideIcon;
  category: "Accounting software" | "Tax & compliance";
  description: string;
  /** Brand-neutral tint used for the badge; not the partner's identity. */
  tone: "navy" | "red" | "ink";
}

export const INTEGRATIONS: Integration[] = [
  { id: "xero", name: "Xero", icon: Cloud, category: "Accounting software", description: "Sync categorised expenses and documents to Xero.", tone: "navy" },
  { id: "quickbooks", name: "QuickBooks", icon: Calculator, category: "Accounting software", description: "Push processed transactions into QuickBooks.", tone: "navy" },
  { id: "freeagent", name: "FreeAgent", icon: Briefcase, category: "Accounting software", description: "Keep FreeAgent books current with reconciled data.", tone: "navy" },
  { id: "sage", name: "Sage", icon: Library, category: "Accounting software", description: "Export organised financial records to Sage.", tone: "navy" },
  { id: "capium", name: "Capium", icon: FileCheck2, category: "Accounting software", description: "Keep Capium records current with organised, categorised data.", tone: "navy" },
  { id: "hmrc", name: "HMRC", icon: Landmark, category: "Tax & compliance", description: "Built for Making Tax Digital workflows.", tone: "red" },
];

/* ------------------------------------------------------------------
   Workflow steps
------------------------------------------------------------------- */
export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  { step: "01", title: "Capture", description: "Upload a receipt, invoice or financial document." },
  { step: "02", title: "AI Extraction", description: "DexAI automatically identifies supplier, date, amount, VAT and other important information." },
  { step: "03", title: "Categorise", description: "Automatically classify transactions into the right expense categories." },
  { step: "04", title: "Reconcile", description: "Match financial documents with bank transactions." },
  { step: "05", title: "Report", description: "Generate accurate financial and VAT reports." },
];

/* ------------------------------------------------------------------
   Demo data (SAMPLE ONLY)
------------------------------------------------------------------- */
export type ExpenseStatus = "Matched" | "Pending" | "Review";

export interface ExpenseRow {
  id: string;
  date: string;
  supplier: string;
  category: string;
  amount: number;
  vat: number;
  status: ExpenseStatus;
}

export const DEMO_EXPENSES: ExpenseRow[] = [
  { id: "e1", date: "02 Oct 2026", supplier: "Tesco", category: "Office supplies", amount: 51.0, vat: 8.5, status: "Matched" },
  { id: "e2", date: "01 Oct 2026", supplier: "Amazon Business", category: "Equipment", amount: 125.4, vat: 20.9, status: "Matched" },
  { id: "e3", date: "30 Sep 2026", supplier: "Trainline", category: "Travel", amount: 86.2, vat: 0, status: "Pending" },
  { id: "e4", date: "29 Sep 2026", supplier: "Google Workspace", category: "Software", amount: 118.8, vat: 19.8, status: "Matched" },
  { id: "e5", date: "28 Sep 2026", supplier: "Pret A Manger", category: "Subsistence", amount: 14.35, vat: 2.39, status: "Review" },
  { id: "e6", date: "26 Sep 2026", supplier: "Shell", category: "Fuel", amount: 72.14, vat: 12.02, status: "Matched" },
  { id: "e7", date: "25 Sep 2026", supplier: "WeWork", category: "Rent", amount: 540.0, vat: 90.0, status: "Matched" },
  { id: "e8", date: "24 Sep 2026", supplier: "Uber", category: "Travel", amount: 23.6, vat: 0, status: "Pending" },
];

export const EXPENSE_CATEGORIES = [
  "All categories",
  "Office supplies",
  "Equipment",
  "Travel",
  "Software",
  "Subsistence",
  "Fuel",
  "Rent",
] as const;

export interface ExtractedField {
  key: string;
  label: string;
  value: string;
  confidence: number;
}

export const DEMO_RECEIPT_FIELDS: ExtractedField[] = [
  { key: "supplier", label: "Supplier", value: "TESCO", confidence: 0.99 },
  { key: "date", label: "Date", value: "02 Oct 2026", confidence: 0.98 },
  { key: "ref", label: "Receipt ID", value: "TSC-48213-09", confidence: 0.96 },
  { key: "subtotal", label: "Subtotal", value: "£42.50", confidence: 0.99 },
  { key: "vat", label: "VAT (20%)", value: "£8.50", confidence: 0.97 },
  { key: "total", label: "Total", value: "£51.00", confidence: 0.99 },
  { key: "currency", label: "Currency", value: "GBP", confidence: 1 },
];

export interface VatMonth {
  month: string;
  collected: number;
  paid: number;
}

export const DEMO_VAT_MONTHS: VatMonth[] = [
  { month: "Jul", collected: 4120, paid: 2480 },
  { month: "Aug", collected: 4680, paid: 2910 },
  { month: "Sep", collected: 5240, paid: 3160 },
];

export const DEMO_VAT_SUMMARY = {
  period: "01 Jul 2026 – 30 Sep 2026",
  collected: 14040,
  paid: 8550,
  due: "07 Nov 2026",
} as const;
