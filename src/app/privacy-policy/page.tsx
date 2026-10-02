import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How this website handles personal data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How this website handles your personal data."
      crumb="Privacy Policy"
      updated="2 October 2026"
      notice="This page summarises how this marketing website handles data. DexAI will publish its full privacy policy here once it is finalised."
      sections={[
        {
          title: "What you tell us",
          body: (
            <p>
              The contact form on this website does not send your details to a server. When you submit it, it opens your own email app with your details filled in, addressed to DexAI. The message then reaches us as an ordinary email, and we use it only to reply to your request.
            </p>
          ),
        },
        {
          title: "Cookies and local storage",
          body: <p>This website stores your cookie choice in your browser. See the Cookie Policy for details.</p>,
        },
        {
          title: "Analytics and tracking",
          body: <p>This website does not currently load analytics or advertising trackers.</p>,
        },
        {
          title: "Hosting",
          body: <p>Like any website, the server that delivers these pages may keep standard technical logs, such as IP addresses and request times, for security and reliability.</p>,
        },
        {
          title: "Your rights",
          body: <p>You can ask us what personal information we hold about you, and ask us to correct or delete it, by writing to the address below.</p>,
        },
      ]}
    />
  );
}
