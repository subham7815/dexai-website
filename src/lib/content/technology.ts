import {
  ArrowLeftRight,
  BarChart3,
  Boxes,
  Cpu,
  Database,
  Eye,
  FileText,
  GitMerge,
  Layers,
  Receipt,
  RefreshCw,
  ScanLine,
  Server,
  ShieldCheck,
  Sparkles,
  Tags,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------
   Shared node type for the interactive flow diagrams
------------------------------------------------------------------- */
export interface FlowNode {
  key: string;
  label: string;
  caption: string;
  detail: string;
  icon: LucideIcon;
  kind?: "input" | "agent" | "model" | "output" | "stage";
}

/* ------------------------------------------------------------------
   Agentic AI
------------------------------------------------------------------- */
export const AGENT_CHAIN: FlowNode[] = [
  { key: "document", label: "Document", caption: "Receipt, invoice or statement", detail: "A document arrives by camera, upload or email forwarding and enters the pipeline with its original file attached.", icon: FileText, kind: "input" },
  { key: "classification", label: "Classification Agent", caption: "Identifies the document type", detail: "Decides whether the document is a receipt, supplier invoice, bank statement, expense claim or VAT document, and routes it to the right specialist agent.", icon: Tags, kind: "agent" },
  { key: "ocr-vlm", label: "OCR / VLM", caption: "Reads text and layout", detail: "DexAI's own OCR and vision-language models read the text and understand the visual structure of the page: tables, totals blocks, headers and stamps.", icon: Eye, kind: "model" },
  { key: "extraction", label: "Extraction Agent", caption: "Structured fields out", detail: "Supplier, date, reference, line items, VAT rate and amounts, and totals are returned as separate fields with a confidence score each.", icon: ScanLine, kind: "agent" },
  { key: "validation", label: "Validation Agent", caption: "Checks and flags", detail: "Net, VAT and gross are checked against each other, dates and currencies are normalised, and anything uncertain is flagged for a person to review.", icon: ShieldCheck, kind: "agent" },
  { key: "reconciliation", label: "Reconciliation Agent", caption: "Matches to the bank", detail: "The validated record is paired with a bank transaction on amount, supplier and date, with exceptions surfaced rather than guessed.", icon: GitMerge, kind: "agent" },
  { key: "business-system", label: "Business System", caption: "Accounting and reporting", detail: "Clean, categorised records flow into your accounting software and DexAI's expense and VAT reports.", icon: Boxes, kind: "output" },
];

export interface Agent {
  key: string;
  name: string;
  role: string;
  icon: LucideIcon;
}

export const AGENTS: Agent[] = [
  { key: "invoice", name: "Invoice Agent", role: "Reads supplier invoices, capturing header fields, line items, VAT and totals.", icon: FileText },
  { key: "receipt", name: "Receipt Agent", role: "Turns receipt photos, scans and emailed confirmations into structured expense records.", icon: Receipt },
  { key: "classification", name: "Classification Agent", role: "Identifies the document type on arrival and routes it to the right specialist.", icon: Tags },
  { key: "extraction", name: "Extraction Agent", role: "Pulls supplier, date, reference, VAT and totals from the document as separate fields.", icon: ScanLine },
  { key: "validation", name: "Validation Agent", role: "Checks the arithmetic and formats, flagging low-confidence fields for review.", icon: ShieldCheck },
  { key: "reconciliation", name: "Reconciliation Agent", role: "Pairs records with bank transactions on amount, supplier and date.", icon: ArrowLeftRight },
  { key: "reporting", name: "Reporting Agent", role: "Keeps expense and VAT summaries current as records are added or corrected.", icon: BarChart3 },
  { key: "migration", name: "Data Migration Agent", role: "Maps and moves historical records into DexAI with duplicate checks along the way.", icon: Database },
];

/* ------------------------------------------------------------------
   Technology architecture
------------------------------------------------------------------- */
export const ARCHITECTURE: FlowNode[] = [
  { key: "documents", label: "Documents", caption: "Every format in", detail: "Receipts, invoices, statements and claims arrive as photos, PDFs and emails.", icon: FileText, kind: "input" },
  { key: "ocr-vlm", label: "OCR / VLM", caption: "Text and layout", detail: "Proprietary OCR reads the text; the vision-language model understands where things sit on the page and what they mean.", icon: Eye, kind: "model" },
  { key: "classification", label: "Classification", caption: "Document type", detail: "The document is typed and routed, so an invoice and a receipt follow the paths that suit them.", icon: Tags, kind: "stage" },
  { key: "agentic", label: "Agentic AI", caption: "Specialist agents", detail: "A set of focused agents handles the document, each responsible for one job and each able to hand off to the next.", icon: Sparkles, kind: "agent" },
  { key: "extraction", label: "Extraction", caption: "Structured fields", detail: "Supplier, date, reference, line items, VAT and totals are returned as data with confidence scores.", icon: ScanLine, kind: "stage" },
  { key: "validation", label: "Validation", caption: "Checks and review", detail: "Totals are cross-checked, formats normalised and uncertain values flagged for a person.", icon: ShieldCheck, kind: "stage" },
  { key: "reconciliation", label: "Reconciliation", caption: "Bank matching", detail: "Validated records are paired with bank feed transactions; exceptions are listed, not guessed.", icon: GitMerge, kind: "stage" },
  { key: "systems", label: "Business Systems", caption: "Accounting and reports", detail: "Clean records sync to Xero, QuickBooks, FreeAgent or Sage and feed DexAI's VAT and expense reporting.", icon: Boxes, kind: "output" },
];

/* ------------------------------------------------------------------
   Proprietary OCR + VLM
------------------------------------------------------------------- */
export interface TechCard {
  key: string;
  title: string;
  summary: string;
  points: string[];
  icon: LucideIcon;
}

export const TECH_CARDS: TechCard[] = [
  {
    key: "ocr",
    title: "Proprietary OCR",
    summary: "Text extraction built for financial paperwork rather than general documents.",
    points: ["Advanced document text extraction", "Structured data extraction", "Financial document understanding"],
    icon: ScanLine,
  },
  {
    key: "vlm",
    title: "Proprietary VLM",
    summary: "A vision-language model that reads the page the way a person does.",
    points: ["Understands document layout", "Understands visual context", "Handles complex financial documents"],
    icon: Eye,
  },
  {
    key: "intelligence",
    title: "Document Intelligence",
    summary: "The layer that turns reading into finished work.",
    points: ["Classification", "Extraction", "Validation", "Automation"],
    icon: Layers,
  },
];

/* ------------------------------------------------------------------
   Large-scale AI training
------------------------------------------------------------------- */
export interface Point {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const TRAINING_POINTS: Point[] = [
  { title: "Large-scale training", description: "Models are trained on large volumes of financial documents rather than tuned on a handful of templates.", icon: Database },
  { title: "Diverse document datasets", description: "Receipts, invoices, statements and claims in many layouts, languages of numbers and print qualities.", icon: Layers },
  { title: "Financial-document specialisation", description: "Training is focused on the fields that matter in bookkeeping: suppliers, dates, VAT, line items and totals.", icon: FileText },
  { title: "Continuous model improvement", description: "Corrections made during review feed back into evaluation and future training rounds.", icon: RefreshCw },
  { title: "Model evaluation", description: "Releases are measured against held-out document sets before they reach production.", icon: BarChart3 },
];

/* ------------------------------------------------------------------
   Flexible infrastructure
------------------------------------------------------------------- */
export const INFRA_POINTS: Point[] = [
  { title: "GPU flexibility", description: "Inference is not tied to a single accelerator family.", icon: Cpu },
  { title: "CPU / GPU optimisation", description: "Models are optimised to run on CPU-only hardware as well as GPU-accelerated systems.", icon: Server },
  { title: "Efficient inference", description: "Document processing is designed to keep per-document cost and latency low.", icon: Sparkles },
  { title: "Scalable deployment", description: "Capacity grows with document volume without changing how the product works.", icon: Boxes },
  { title: "Hardware flexibility", description: "Deployment choices are driven by your requirements, not by the model's hardware demands.", icon: Layers },
];
