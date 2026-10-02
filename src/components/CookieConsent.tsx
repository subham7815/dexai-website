"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Cookie, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

const STORAGE_KEY = "dexai-cookie-consent";
const VERSION = 1;
export const OPEN_PREFERENCES_EVENT = "dexai:open-cookie-preferences";

type Category = "necessary" | "analytics" | "functional" | "marketing";

interface Consent {
  version: number;
  decidedAt: string;
  categories: Record<Category, boolean>;
}

const CATEGORIES: { key: Category; label: string; description: string; locked?: boolean }[] = [
  { key: "necessary", label: "Necessary cookies", description: "Required for the site to work: security, load balancing and remembering your cookie choices. Always on.", locked: true },
  { key: "analytics", label: "Analytics cookies", description: "Help us understand how the site is used so we can improve it. Data is aggregated." },
  { key: "functional", label: "Functional cookies", description: "Remember choices you make, such as preferences, to give you a more personalised experience." },
  { key: "marketing", label: "Marketing cookies", description: "Used to measure campaigns and show relevant content on other sites." },
];

const DEFAULTS: Record<Category, boolean> = { necessary: true, analytics: false, functional: false, marketing: false };

function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    return parsed.version === VERSION ? parsed : null;
  } catch {
    return null;
  }
}

function writeConsent(categories: Record<Category, boolean>) {
  const consent: Consent = { version: VERSION, decidedAt: new Date().toISOString(), categories: { ...categories, necessary: true } };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    /* storage unavailable: consent applies for this page view only */
  }
  window.dispatchEvent(new CustomEvent("dexai:cookie-consent", { detail: consent }));
}

/** Opens the preferences modal from anywhere (e.g. a footer link). */
export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}

export function CookieConsent() {
  const reduce = useReducedMotion();
  const [banner, setBanner] = useState(false);
  const [modal, setModal] = useState(false);
  const [prefs, setPrefs] = useState<Record<Category, boolean>>(DEFAULTS);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  // Show the banner only when no decision has been stored.
  useEffect(() => {
    const existing = readConsent();
    const id = window.setTimeout(() => {
      if (existing) setPrefs(existing.categories);
      else setBanner(true);
    }, 400);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const onOpen = () => {
      lastFocus.current = document.activeElement as HTMLElement | null;
      const existing = readConsent();
      if (existing) setPrefs(existing.categories);
      setModal(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, onOpen);
  }, []);

  // Focus management + escape for the modal.
  useEffect(() => {
    if (!modal) return;
    const el = dialogRef.current;
    const first = el?.querySelector<HTMLElement>("button, [href], input, [tabindex]:not([tabindex='-1'])");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(false);
      if (e.key === "Tab" && el) {
        const nodes = el.querySelectorAll<HTMLElement>("button, [href], input, [tabindex]:not([tabindex='-1'])");
        if (!nodes.length) return;
        const firstEl = nodes[0];
        const lastEl = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    };
  }, [modal]);

  const decide = useCallback((categories: Record<Category, boolean>) => {
    writeConsent(categories);
    setPrefs({ ...categories, necessary: true });
    setBanner(false);
    setModal(false);
  }, []);

  const acceptAll = () => decide({ necessary: true, analytics: true, functional: true, marketing: true });
  const rejectNonEssential = () => decide({ ...DEFAULTS });

  return (
    <>
      <AnimatePresence>
        {banner && !modal ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="region"
            aria-label="Cookie consent"
            className="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-xl"
          >
            <div className="rounded-card border border-line-strong bg-white p-5 shadow-float-lg sm:p-6">
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy-ink text-white">
                  <Cookie size={18} />
                </span>
                <div className="min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">Cookies</div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-body">
                    We use cookies to improve your experience, analyze website usage, and support essential website functionality.{" "}
                    <a href={LINKS.cookies} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline-offset-4 hover:underline">
                      Cookie Policy
                    </a>
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Button onClick={acceptAll} size="sm">
                  Accept All
                </Button>
                <Button onClick={rejectNonEssential} size="sm" variant="secondary">
                  Reject Non-Essential
                </Button>
                <Button
                  onClick={() => {
                    lastFocus.current = document.activeElement as HTMLElement | null;
                    setModal(true);
                  }}
                  size="sm"
                  variant="ghost"
                >
                  Manage Preferences
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {modal ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/50 p-3 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={(e) => e.target === e.currentTarget && setModal(false)}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-prefs-title"
              initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-xl rounded-card border border-line-strong bg-white shadow-float-lg"
            >
              <div className="flex items-start justify-between gap-4 border-b border-line p-6">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">Cookie preferences</div>
                  <h2 id="cookie-prefs-title" className="mt-1 text-2xl font-bold tracking-tight text-ink">
                    Choose what we can use
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">Necessary cookies are always on. You can change the rest at any time from the footer.</p>
                </div>
                <button type="button" onClick={() => setModal(false)} aria-label="Close" className="flex size-10 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ink">
                  <X size={18} />
                </button>
              </div>

              <ul className="divide-y divide-line">
                {CATEGORIES.map((c) => {
                  const on = c.locked ? true : prefs[c.key];
                  return (
                    <li key={c.key} className="flex items-start justify-between gap-6 px-6 py-4">
                      <div>
                        <label htmlFor={`cookie-${c.key}`} className="text-[16px] font-bold text-ink">
                          {c.label}
                        </label>
                        <p className="mt-1 text-[14px] leading-relaxed text-body">{c.description}</p>
                      </div>
                      <button
                        id={`cookie-${c.key}`}
                        type="button"
                        role="switch"
                        aria-checked={on}
                        disabled={c.locked}
                        onClick={() => setPrefs((p) => ({ ...p, [c.key]: !p[c.key] }))}
                        className={cn(
                          "relative mt-1 h-7 w-12 shrink-0 rounded-full border transition-colors",
                          on ? "border-brand bg-brand" : "border-line-strong bg-line",
                          c.locked && "cursor-not-allowed opacity-70",
                        )}
                      >
                        <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform", on ? "left-[calc(100%-1.375rem)]" : "left-0.5")} aria-hidden />
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-col gap-2 border-t border-line p-6 sm:flex-row sm:justify-end">
                <Button onClick={rejectNonEssential} size="sm" variant="secondary">
                  Reject Non-Essential
                </Button>
                <Button onClick={() => decide(prefs)} size="sm" variant="secondary">
                  Save Preferences
                </Button>
                <Button onClick={acceptAll} size="sm">
                  Accept All
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
