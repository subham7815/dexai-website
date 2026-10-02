import { ArrowLeftRight, BarChart3, Building2, FileText, Route, type LucideIcon } from "lucide-react";
import type { Benefit, Step } from "./product";
import { Check, Layers, Sparkles, ShieldCheck, Timer, Workflow } from "lucide-react";

export type FeatureSlug = "invoice-processing" | "transaction-matching" | "mileage-tracking" | "multi-company" | "financial-analytics";

export interface FeaturePage {
  slug: FeatureSlug;
  navLabel: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  metaDescription: string;
  benefits: Benefit[];
  steps: Step[];
  visual: "invoice" | "matching" | "mileage" | "companies" | "analytics";
}

export const FEATURE_PAGES: Record<FeatureSlug, FeaturePage> = {
  "invoice-processing": {
    slug: "invoice-processing",
    navLabel: "Invoice Processing",
    icon: FileText,
    eyebrow: "Invoice processing",
    title: "Supplier invoices, read line by line.",
    description:
      "Upload or forward supplier invoices and DexAI captures the supplier, invoice number, line items, VAT and totals, then records them with the original attached.",
    metaDescription: "AI invoice processing from DexAI: supplier, invoice number, line items, VAT and totals extracted automatically.",
    benefits: [
      { icon: Layers, title: "Line items captured", description: "Each line, quantity and amount is extracted, not just the total." },
      { icon: ShieldCheck, title: "Totals validated", description: "Net, VAT and gross are checked against each other before posting." },
      { icon: Sparkles, title: "References kept", description: "Invoice numbers and supplier details are stored for matching and search." },
    ],
    steps: [
      { title: "Receive", description: "Invoices arrive by email forwarding or upload." },
      { title: "Extract", description: "Header fields, line items and VAT are read by AI." },
      { title: "Record", description: "The invoice is categorised and ready for matching and export." },
    ],
    visual: "invoice",
  },
  "transaction-matching": {
    slug: "transaction-matching",
    navLabel: "Transaction Matching",
    icon: ArrowLeftRight,
    eyebrow: "Transaction matching",
    title: "Documents paired with bank transactions.",
    description:
      "DexAI compares each bank transaction with your processed receipts and invoices and proposes the match, using amount, supplier and date.",
    metaDescription: "Automatic transaction matching in DexAI pairs receipts and invoices with bank feed transactions.",
    benefits: [
      { icon: Sparkles, title: "Smart pairing", description: "Amount, supplier name and date are weighed together to find the right document." },
      { icon: Check, title: "One-tap confirmation", description: "Suggested matches are confirmed in a tap; exceptions are listed separately." },
      { icon: Timer, title: "Continuous", description: "Matching runs as transactions arrive, not in a monthly batch." },
    ],
    steps: [
      { title: "Transaction arrives", description: "A new line lands from your connected bank feed." },
      { title: "Candidates found", description: "DexAI looks for a processed document that fits." },
      { title: "Matched", description: "The pair is reconciled and the status updates everywhere." },
    ],
    visual: "matching",
  },
  "mileage-tracking": {
    slug: "mileage-tracking",
    navLabel: "Mileage Tracking",
    icon: Route,
    eyebrow: "Mileage & travel tracking",
    title: "Business journeys, logged at HMRC rates.",
    description:
      "Record trips manually or from your calendar, and DexAI applies the appropriate HMRC mileage rate so travel claims are accurate and ready for your books.",
    metaDescription: "Mileage and travel tracking in DexAI with automatic HMRC rate calculations.",
    benefits: [
      { icon: Route, title: "Log in seconds", description: "Add a journey with start, end and distance, or sync from your calendar." },
      { icon: Sparkles, title: "Rates applied", description: "HMRC approved mileage rates are calculated automatically." },
      { icon: Layers, title: "Part of expenses", description: "Mileage claims sit alongside receipts in the same categorised expense list." },
    ],
    steps: [
      { title: "Record the trip", description: "Enter the journey or pick it from a synced calendar event." },
      { title: "Rate calculated", description: "The claim amount is worked out using the current HMRC rate." },
      { title: "Claim recorded", description: "It appears in expenses and reports like any other cost." },
    ],
    visual: "mileage",
  },
  "multi-company": {
    slug: "multi-company",
    navLabel: "Multi-Company Management",
    icon: Building2,
    eyebrow: "Multi-company management",
    title: "Separate books. One dashboard.",
    description:
      "Manage several companies from a single login. Each entity keeps its own documents, expenses, bank feeds and reports, with access controlled per user.",
    metaDescription: "Multi-company management in DexAI: run several entities from one login with separate books for each.",
    benefits: [
      { icon: Building2, title: "Clear separation", description: "Documents and transactions belong to one company and never mix." },
      { icon: Workflow, title: "Same automation everywhere", description: "The capture-to-report pipeline runs identically for every entity." },
      { icon: ShieldCheck, title: "Controlled access", description: "Decide who can see and work on each company's books." },
    ],
    steps: [
      { title: "Add companies", description: "Create an entity for each business you manage." },
      { title: "Route documents", description: "Documents are assigned to the right company on arrival." },
      { title: "Switch and review", description: "Move between companies from one dashboard." },
    ],
    visual: "companies",
  },
  "financial-analytics": {
    slug: "financial-analytics",
    navLabel: "Financial Analytics",
    icon: BarChart3,
    eyebrow: "Financial analytics",
    title: "See where the money goes.",
    description:
      "Processed data becomes reporting you can actually use: spend by category, supplier and period, VAT summaries and exports for your accountant.",
    metaDescription: "Financial reporting and analytics in DexAI: spend by category, supplier and period, with VAT summaries.",
    benefits: [
      { icon: BarChart3, title: "Spend breakdowns", description: "Category, supplier and monthly views built from processed documents." },
      { icon: Layers, title: "VAT in context", description: "VAT collected and paid shown alongside the expenses that produced them." },
      { icon: Check, title: "Export ready", description: "Reports can be exported or synced to your accounting software." },
    ],
    steps: [
      { title: "Documents processed", description: "Every receipt and invoice adds to the underlying data." },
      { title: "Reports update", description: "Figures refresh as soon as records are categorised and matched." },
      { title: "Review and share", description: "Filter by period or company and export what you need." },
    ],
    visual: "analytics",
  },
};

export const FEATURE_SLUGS = Object.keys(FEATURE_PAGES) as FeatureSlug[];
