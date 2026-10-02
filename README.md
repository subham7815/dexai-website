# DexAI website

Marketing website for [DexAI](https://dexai.app), the AI-powered financial automation platform.
Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and Motion.

## Getting started

```bash
npm install
npm run dev

```

Open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build (also runs TypeScript checks)
npm run start   # serve the production build
npm run lint    # ESLint
```

## Site map

Every navigation dropdown entry is its own page:

| Menu          | Pages                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| Product       | `/product`, `/product/receipt-scanning`, `document-processing`, `expense-management`, `bank-reconciliation`, `vat-reporting`, `automation`, `agentic-ai`, `data-migration` |
| Solutions     | `/solutions`, `/solutions/small-business`, `accountants`, `multi-company`, `freelancers`                |
| Features      | `/features`, `/features/invoice-processing`, `transaction-matching`, `mileage-tracking`, `multi-company`, `financial-analytics` |
| Integrations  | `/integrations`, `/integrations/xero`, `quickbooks`, `freeagent`, `sage`, `hmrc`                        |
| Technology    | `/technology` (OCR & VLM, AI training, infrastructure, architecture), `/product/agentic-ai`              |
| Resources     | `/resources`, `/case-studies`, `/customer-stories`, `/resources/documentation`, `/resources/ai-insights`, `/resources/faqs`, `/demo`, `/why-dexai`, `/security`, plus Blog on dexai.app |

Navigation and footer columns are defined once in `src/lib/navigation.ts`.
Page copy lives in `src/lib/content/*.ts`; dynamic routes read from those maps
and are statically generated. `sitemap.xml` and `robots.txt` are generated.

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata, navbar + footer, skip link
    page.tsx          # homepage (overview)
    product/          # /product and /product/[slug]
    solutions/        # /solutions and /solutions/[slug]
    features/         # /features and /features/[slug]
    integrations/     # /integrations and /integrations/[slug]
    demo/ security/ why-dexai/ resources/
    sitemap.ts robots.ts not-found.tsx
    globals.css       # brand tokens + Tailwind theme
    icon.png          # favicon (DexAI mark)
  components/
    PageHero.tsx      # inner-page header with breadcrumbs
    BenefitGrid.tsx StepsList.tsx RelatedPages.tsx ShiftList.tsx
    visuals/FeatureVisual.tsx
    Navbar.tsx        # sticky, dropdown menus, mobile accordion
    Hero.tsx          # headline + animated dashboard (hero/HeroDashboard.tsx)
    TrustBar.tsx
    ProductWorkflow.tsx
    ReceiptScanner.tsx
    DocumentProcessing.tsx
    ExpenseDashboard.tsx
    BankMatching.tsx
    VatReporting.tsx
    Integrations.tsx
    AutomationPipeline.tsx
    FeatureGrid.tsx
    ProductDemo.tsx   # animated walkthrough (demo/DemoScreens.tsx)
    WhyDexAI.tsx
    Security.tsx
    CTA.tsx
    Footer.tsx
    ui/               # Button, Badge, BrowserFrame, Reveal, SectionHeading, …
  lib/
    navigation.ts     # dropdown groups + footer columns
    content/          # product, solutions, features, integrations copy
    constants.ts      # links, integrations, demo data
    hooks.ts
    utils.ts
public/
  brand/              # official DexAI logo + mark
```

## Brand and design language

Colours and type follow dexai.app: red `#C7102C`, navy `#1B2A6B`, ink `#0E1024`,
Plus Jakarta Sans. Tokens live in `src/app/globals.css`.

The visual system is an editorial "ledger" style: dark navy hero and footer,
a flat full-width navbar with a red active-link rule, hairline-bordered cards
with 12–16px radii, monospace (Geist Mono) labels and numerals, split section
headers (title left, description right) and a full-bleed red CTA. Primitives:
`ui/SectionHeading` (with `Eyebrow`), `ui/Button`, `ui/Badge`, `ui/BrowserFrame`,
`ui/Photo`.

## Customer content and cookies

- Case studies and testimonials read from `src/lib/content/stories.ts`. The
  entries shipped are labelled placeholders (`placeholder: true`); no customer
  names, logos, figures or quotes are invented. Add approved content there and
  set `placeholder: false`.
- Technology copy in `src/lib/content/technology.ts` avoids numeric claims.
  Add training-scale figures only once verified.
- The cookie banner and preferences modal (`src/components/CookieConsent.tsx`)
  store the choice in localStorage under `dexai-cookie-consent` and dispatch a
  `dexai:cookie-consent` event. No analytics or marketing scripts are loaded by
  this site; wire them to that event if you add any. "Cookie settings" in the
  footer reopens the modal.

## Photography

Photos are free-licence images served from Unsplash's CDN and registered in
`src/lib/photos.ts` (the Unsplash licence does not require attribution). To use
your own photography, drop files into `public/` and point each entry's `src`
at them; the `Photo` component and `next/image` handle the rest. The remote
host is allowed in `next.config.ts`.

## Demo data

All financial figures in the UI mockups are sample data defined in
`src/lib/constants.ts` and are labelled "Sample data" in the interface.
