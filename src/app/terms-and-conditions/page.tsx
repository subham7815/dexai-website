import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of use for the DexAI website.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="Terms of use for the DexAI website."
      crumb="Terms & Conditions"
      updated="2 October 2026"
      notice="The full terms are being finalised and will be published on this page. Until then, please get in touch with any question about using this website or DexAI's services."
      sections={[
        {
          title: "This website",
          body: <p>This website describes DexAI and its features. The content is for general information and does not form a contract. Figures shown in demonstrations are sample data.</p>,
        },
        {
          title: "Product terms",
          body: <p>Terms for using the DexAI product are agreed separately with each customer. Ask us for the current version.</p>,
        },
      ]}
    />
  );
}
