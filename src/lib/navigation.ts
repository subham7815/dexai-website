import {
  ArrowLeftRight,
  BarChart3,
  BookOpen,
  BookText,
  Briefcase,
  Building2,
  Calculator,
  Camera,
  Cloud,
  Cpu,
  Database,
  Eye,
  FileCheck2,
  FileText,
  HelpCircle,
  Landmark,
  Library,
  Lightbulb,
  MessageSquareQuote,
  Network,
  Newspaper,
  Percent,
  PlayCircle,
  Route,
  ShieldCheck,
  Sparkles,
  Store,
  UserRound,
  Wallet,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { LINKS } from "./constants";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  /** Base path used for active-state matching and the mobile "overview" link. */
  href: string;
  external?: boolean;
  items?: NavLink[];
  /** Optional footer link rendered at the bottom of the dropdown. */
  overview?: NavLink;
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Product",
    href: "/product",
    overview: { label: "Product overview", href: "/product", description: "How DexAI works end to end." },
    items: [
      { label: "AI Receipt Scanning", href: "/product/receipt-scanning", description: "Turn receipts into structured data.", icon: Camera },
      { label: "Document Processing", href: "/product/document-processing", description: "Receipts, invoices, statements and more.", icon: FileText },
      { label: "Expense Management", href: "/product/expense-management", description: "Categorised, VAT-aware expenses.", icon: Wallet },
      { label: "Bank Reconciliation", href: "/product/bank-reconciliation", description: "Bank feeds and automatic matching.", icon: Landmark },
      { label: "VAT Reporting", href: "/product/vat-reporting", description: "Stay ready for Making Tax Digital.", icon: Percent },
      { label: "Automation", href: "/product/automation", description: "Your workflow on autopilot.", icon: Workflow },
      { label: "Agentic AI", href: "/product/agentic-ai", description: "Specialist agents for every step.", icon: Sparkles },
      { label: "Data Migration", href: "/product/data-migration", description: "Move historical data safely.", icon: Database },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    overview: { label: "All solutions", href: "/solutions", description: "Find the fit for your business." },
    items: [
      { label: "Small Businesses", href: "/solutions/small-business", description: "Bookkeeping without the admin.", icon: Store },
      { label: "Accountants & Bookkeepers", href: "/solutions/accountants", description: "Clean client records at scale.", icon: Calculator },
      { label: "Multi-Company Groups", href: "/solutions/multi-company", description: "Several entities, one login.", icon: Building2 },
      { label: "Freelancers & Contractors", href: "/solutions/freelancers", description: "Receipts, mileage and VAT sorted.", icon: UserRound },
    ],
  },
  {
    label: "Features",
    href: "/features",
    overview: { label: "All features", href: "/features", description: "Every capability in one place." },
    items: [
      { label: "Invoice Processing", href: "/features/invoice-processing", description: "Supplier invoices read line by line.", icon: FileText },
      { label: "Transaction Matching", href: "/features/transaction-matching", description: "Documents paired with bank lines.", icon: ArrowLeftRight },
      { label: "Mileage Tracking", href: "/features/mileage-tracking", description: "Journeys logged at HMRC rates.", icon: Route },
      { label: "Multi-Company Management", href: "/features/multi-company", description: "Separate books, one dashboard.", icon: Building2 },
      { label: "Financial Analytics", href: "/features/financial-analytics", description: "Spend by category, supplier, period.", icon: BarChart3 },
    ],
  },
  {
    label: "Technology",
    href: "/technology",
    overview: { label: "Technology overview", href: "/technology", description: "The AI behind DexAI." },
    items: [
      { label: "Proprietary OCR & VLM", href: "/technology#ocr-vlm", description: "DexAI's own document models.", icon: Eye },
      { label: "Agentic AI", href: "/product/agentic-ai", description: "A team of specialist agents.", icon: Sparkles },
      { label: "Large-Scale AI Training", href: "/technology#training", description: "Built for document intelligence.", icon: Database },
      { label: "Flexible Infrastructure", href: "/technology#infrastructure", description: "Runs on CPU or GPU.", icon: Cpu },
      { label: "Architecture", href: "/technology#architecture", description: "Document to business system.", icon: Network },
    ],
  },
  {
    label: "Integrations",
    href: "/integrations",
    overview: { label: "All integrations", href: "/integrations", description: "Accounting and tax connections." },
    items: [
      { label: "Xero", href: "/integrations/xero", description: "Sync categorised expenses to Xero.", icon: Cloud },
      { label: "QuickBooks", href: "/integrations/quickbooks", description: "Push transactions into QuickBooks.", icon: Calculator },
      { label: "FreeAgent", href: "/integrations/freeagent", description: "Keep FreeAgent books current.", icon: Briefcase },
      { label: "Sage", href: "/integrations/sage", description: "Export records to Sage.", icon: Library },
      { label: "Capium", href: "/integrations/capium", description: "Keep Capium records current.", icon: FileCheck2 },
      { label: "HMRC (Making Tax Digital)", href: "/integrations/hmrc", description: "Digital VAT records and workflows.", icon: Landmark },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    overview: { label: "All resources", href: "/resources", description: "Stories, guides and answers." },
    items: [
      { label: "Case Studies", href: "/case-studies", description: "How teams put DexAI to work.", icon: BookOpen },
      { label: "Customer Stories", href: "/customer-stories", description: "In our customers' words.", icon: MessageSquareQuote },
      { label: "Product Videos", href: "/resources/videos", description: "Walkthroughs of the product.", icon: PlayCircle },
      { label: "Documentation", href: "/resources/documentation", description: "Guides to every part of DexAI.", icon: BookText },
      { label: "AI Insights", href: "/resources/ai-insights", description: "How the AI actually works.", icon: Lightbulb },
      { label: "FAQs", href: "/resources/faqs", description: "Short answers to common questions.", icon: HelpCircle },
      { label: "Blog", href: LINKS.blog, description: "News and guides from the team.", icon: Newspaper, external: true },
      { label: "Product Demo", href: "/demo", description: "Interactive walkthrough of DexAI.", icon: PlayCircle },
      { label: "Why DexAI", href: "/why-dexai", description: "What changes when you automate.", icon: Sparkles },
      { label: "Security & Trust", href: "/security", description: "How financial records are handled.", icon: ShieldCheck },
    ],
  },
];

/** Look up a navigation group by its label. */
export function getGroup(label: "Product" | "Solutions" | "Features" | "Technology" | "Integrations" | "Resources"): NavGroup {
  const g = NAV_GROUPS.find((x) => x.label === label);
  if (!g) throw new Error(`Unknown nav group: ${label}`);
  return g;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

const strip = ({ label, href, external }: NavLink): NavLink => ({ label: label.replace(" (Making Tax Digital)", ""), href, external });

export const FOOTER_COLUMNS: FooterColumn[] = [
  { title: "Product", links: [{ label: "Overview", href: "/product" }, ...getGroup("Product").items!.map(strip)] },
  { title: "Solutions", links: getGroup("Solutions").items!.map(strip) },
  { title: "Features", links: [{ label: "All features", href: "/features" }, ...getGroup("Features").items!.map(strip)] },
  { title: "Technology", links: [{ label: "Overview", href: "/technology" }, ...getGroup("Technology").items!.map(strip)] },
  { title: "Integrations", links: [{ label: "All integrations", href: "/integrations" }, ...getGroup("Integrations").items!.map(strip)] },
  { title: "Resources", links: getGroup("Resources").items!.map(strip) },
  {
    title: "Company",
    links: [
      { label: "About", href: LINKS.about, external: true },
      { label: "Team", href: LINKS.team, external: true },
      { label: "Services", href: LINKS.services, external: true },
      { label: "Contact", href: LINKS.contact, external: true },
    ],
  },
];


