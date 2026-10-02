import { BookOpen, Camera, FileText, Landmark, Percent, Building2, LayoutGrid, ShieldCheck, type LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------
   Documentation topics
------------------------------------------------------------------- */
export interface DocTopic {
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
}

export const DOC_TOPICS: DocTopic[] = [
  { title: "Getting started", description: "Create your company, connect a bank feed and capture your first document.", icon: BookOpen, items: ["Creating a company", "Inviting users", "Your first receipt"] },
  { title: "Capturing documents", description: "Camera capture, file upload and email forwarding, and what happens next.", icon: Camera, items: ["Photo capture", "Uploads and PDFs", "Email forwarding"] },
  { title: "Expenses and categories", description: "How expenses are categorised, reviewed and corrected.", icon: FileText, items: ["Automatic categories", "Reviewing flagged items", "Search and filters"] },
  { title: "Bank feeds and matching", description: "Connecting accounts and working with suggested matches.", icon: Landmark, items: ["Connecting a bank", "Confirming matches", "Handling exceptions"] },
  { title: "VAT reporting", description: "Period summaries and Making Tax Digital workflows.", icon: Percent, items: ["VAT on documents", "Reporting periods", "MTD workflows"] },
  { title: "Multi-company", description: "Managing several entities from one login.", icon: Building2, items: ["Adding companies", "Routing documents", "Access per company"] },
  { title: "Integrations", description: "Syncing with Xero, QuickBooks, FreeAgent and Sage.", icon: LayoutGrid, items: ["Connecting an integration", "What syncs", "Troubleshooting sync"] },
  { title: "Security and access", description: "How records are protected and who can see what.", icon: ShieldCheck, items: ["User roles", "Audit history", "Data handling"] },
];

/* ------------------------------------------------------------------
   AI insights (explainers, not news)
------------------------------------------------------------------- */
export interface Insight {
  title: string;
  summary: string;
  href: string;
  tag: string;
}

export const INSIGHTS: Insight[] = [
  { title: "Why OCR alone isn't enough for financial documents", summary: "Reading text is the easy part. Knowing which number is the total, which line is VAT and which block is the supplier takes layout understanding.", href: "/technology#ocr-vlm", tag: "OCR / VLM" },
  { title: "What an agent does in DexAI", summary: "Each agent owns one job, from classification to reconciliation, and hands off to the next. Here is how the chain fits together.", href: "/product/agentic-ai", tag: "Agentic AI" },
  { title: "Confidence scores and human review", summary: "Every extracted field carries a confidence score. Low scores are flagged for a person, not silently posted.", href: "/product/receipt-scanning", tag: "Validation" },
  { title: "How bank matching finds the right document", summary: "Amount, supplier and date are weighed together; exceptions are listed rather than guessed.", href: "/features/transaction-matching", tag: "Reconciliation" },
  { title: "Training models on financial paperwork", summary: "Specialising on receipts, invoices and statements, and measuring every release before it ships.", href: "/technology#training", tag: "Training" },
  { title: "Running document AI on CPU or GPU", summary: "Why DexAI's models are optimised to run on either, and what that means for deployment.", href: "/technology#infrastructure", tag: "Infrastructure" },
];

/* ------------------------------------------------------------------
   FAQs
------------------------------------------------------------------- */
export interface Faq {
  q: string;
  a: string;
}

export const FAQ_GROUPS: { title: string; items: Faq[] }[] = [
  {
    title: "Product",
    items: [
      { q: "What does DexAI do?", a: "DexAI is an AI-powered financial document and automation platform. It captures receipts, invoices and other financial documents, extracts the data, categorises expenses, matches them to bank transactions and keeps expense and VAT reporting current." },
      { q: "How do I get documents into DexAI?", a: "Take a photo in the app, upload a file or forward an email. Each document keeps its original file attached to the extracted record." },
      { q: "What happens when the AI isn't sure about a value?", a: "Every extracted field carries a confidence score. Low-confidence fields are flagged for review rather than posted automatically." },
      { q: "Can I manage more than one company?", a: "Yes. Multi-company management keeps separate books for each entity under one login, with access controlled per user." },
    ],
  },
  {
    title: "Bank feeds and VAT",
    items: [
      { q: "How does bank matching work?", a: "Connected bank feed transactions are compared with processed documents on amount, supplier and date. Suggested matches are confirmed in a tap; exceptions are listed separately." },
      { q: "Does DexAI support Making Tax Digital?", a: "DexAI keeps VAT records digitally and prepares period figures in the format Making Tax Digital workflows require. Check current HMRC guidance for submission requirements." },
      { q: "Does DexAI track mileage?", a: "Yes. Journeys can be logged manually or from a calendar, and the appropriate HMRC mileage rate is applied automatically." },
    ],
  },
  {
    title: "Integrations and technology",
    items: [
      { q: "Which accounting tools does DexAI connect with?", a: "Xero, QuickBooks, FreeAgent and Sage, plus HMRC Making Tax Digital workflows." },
      { q: "Is DexAI just OCR?", a: "No. OCR reads the text; DexAI's vision-language model understands layout, and a set of specialist agents classifies, extracts, validates, reconciles and reports." },
      { q: "Does DexAI need a GPU?", a: "DexAI's models are optimised to run on CPU-only hardware as well as GPU-accelerated systems." },
    ],
  },
  {
    title: "Getting started",
    items: [
      { q: "How do I start?", a: "Create an account from Get Started, add your company, connect a bank feed and capture a first document. Book a demo if you would like a guided walkthrough." },
      { q: "Can you help migrate historical data?", a: "Yes. The Data Migration Agent ingests, maps, transforms and validates historical records with duplicate detection, and reports progress until final verification. Contact us to plan a migration." },
      { q: "Where can I read about data handling?", a: "See the Security & Trust page, the privacy policy and the GDPR page on dexai.app." },
    ],
  },
];
