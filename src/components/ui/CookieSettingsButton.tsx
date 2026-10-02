"use client";

import { openCookiePreferences } from "../CookieConsent";

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      Cookie settings
    </button>
  );
}
