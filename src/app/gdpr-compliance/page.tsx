import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "GDPR and Your Data",
  description: "Your data protection rights and how to exercise them with DexAI.",
  alternates: { canonical: "/gdpr-compliance" },
};

const RIGHTS = [
  "Ask what personal data we hold about you",
  "Ask us to correct data that is wrong",
  "Ask us to delete your data",
  "Ask us to limit how we use your data",
  "Ask for a copy of your data in a portable format",
  "Object to how we use your data",
  "Withdraw consent you have given",
];

export default function GdprPage() {
  return (
    <LegalPage
      title="GDPR and Your Data"
      description="Your data protection rights, and how to use them."
      crumb="GDPR"
      updated="2 October 2026"
      notice="This page explains your rights. It is not a statement of certification or audit. Ask us if you need more detail about how DexAI processes data."
      sections={[
        {
          title: "Your rights",
          body: (
            <>
              <p>Under UK data protection law you can:</p>
              <ul className="list-disc space-y-1.5 pl-6">
                {RIGHTS.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </>
          ),
        },
        {
          title: "How to use them",
          body: <p>Write to the address below and say which right you want to use. We will confirm who you are, then reply.</p>,
        },
        {
          title: "This website",
          body: <p>This website does not store the details you type into the contact form, and it loads no analytics or advertising trackers. See the Privacy Policy and Cookie Policy for the detail.</p>,
        },
      ]}
    />
  );
}
