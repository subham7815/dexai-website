import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { LEGAL_LINKS, SITE } from "@/lib/constants";
import { FOOTER_COLUMNS } from "@/lib/navigation";
import { CookieSettingsButton } from "./ui/CookieSettingsButton";
import { Logo } from "./ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-ink text-white" aria-labelledby="footer-title">
      <div className="pointer-events-none absolute inset-0 grid-bg-dark [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" aria-hidden />
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>
      <div className="container-x relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo height={28} inverted />
            <p className="mt-5 max-w-xs text-[16px] leading-relaxed text-on-dark">
              Smart financial automation powered by AI. Capture receipts, track expenses and simplify your bookkeeping in one place.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-6 lg:grid-cols-4" aria-label="Footer">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-brand-on-dark">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={`${col.title}-${l.label}`}>
                      {l.external ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[15px] text-white/75 transition-colors hover:text-white">
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="text-[15px] text-white/75 transition-colors hover:text-white">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-brand-on-dark">Contact</h3>
            <address className="mt-4 space-y-3 text-[15px] not-italic text-white/75">
              <p className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-on-dark" aria-hidden />
                <span>{SITE.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-on-dark" aria-hidden />
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">
                  {SITE.email}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-on-dark" aria-hidden />
                <a href={`tel:${SITE.phone.replace(/\s+/g, "")}`} className="transition-colors hover:text-white">
                  {SITE.phone}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-[12px] text-on-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <li key={l.label}>
                {l.external ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                    {l.label}
                  </a>
                ) : (
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <CookieSettingsButton className="transition-colors hover:text-white" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
