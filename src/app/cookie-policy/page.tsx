import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "What this website stores in your browser and how to change your cookie choices.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      description="What this website stores in your browser, and how to change your choices."
      crumb="Cookie Policy"
      updated="2 October 2026"
      sections={[
        {
          title: "What this website stores",
          body: (
            <>
              <p>
                This website stores one item in your browser&apos;s local storage, named <strong>dexai-cookie-consent</strong>. It records the cookie choices you made and the date you made them, so we do not ask you again on every visit.
              </p>
              <p>It is necessary for the cookie banner to work and it never leaves your browser.</p>
            </>
          ),
        },
        {
          title: "Analytics, functional and marketing cookies",
          body: (
            <p>
              You can switch these categories on or off in the preferences panel. At the time of writing, this website does not load any analytics, functional or marketing scripts, so those switches record your preference but do not turn anything on. If that changes, this policy will be updated first.
            </p>
          ),
        },
        {
          title: "Third-party content",
          body: <p>Photographs on this website are loaded from the Unsplash image service. As with any web request, that service receives your IP address when the images load.</p>,
        },
        {
          title: "Change your choice",
          body: (
            <p>
              Open the preferences panel at any time from the <strong>Cookie settings</strong> link in the footer.
            </p>
          ),
        },
      ]}
    />
  );
}
