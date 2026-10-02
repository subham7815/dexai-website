"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { LINKS } from "@/lib/constants";
import { NAV_GROUPS, type NavGroup, type NavLink } from "@/lib/navigation";
import { cn, pad2 } from "@/lib/utils";
import { Button } from "./ui/Button";
import { Logo } from "./ui/Logo";

const ease = [0.22, 1, 0.36, 1] as const;

/** Routes whose top-of-page hero is dark; the bar renders in its inverted scheme there until scrolled. */
const DARK_HERO_ROUTES = new Set(["/"]);

function isGroupActive(group: NavGroup, pathname: string) {
  if (group.external) return false;
  if (pathname === group.href || pathname.startsWith(group.href + "/")) return true;
  return group.items?.some((i) => !i.external && pathname === i.href) ?? false;
}

function NavAnchor({ item, className, onClick, children }: { item: NavLink; className?: string; onClick?: () => void; children: React.ReactNode }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */

function DropdownPanel({ group, onNavigate, anchor }: { group: NavGroup; onNavigate: () => void; anchor: "left" | "right" }) {
  const items = group.items ?? [];
  const twoCols = items.length > 4;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.18, ease }}
      className={cn("absolute top-full z-50 pt-2", anchor === "left" ? "left-0" : "right-0")}
      role="presentation"
    >
      <div className={cn("overflow-hidden rounded-xl border border-line-strong bg-white shadow-float-lg", twoCols ? "w-[600px] xl:w-[660px]" : "w-[360px]")}>
        <ul className={cn("grid p-2", twoCols && "grid-cols-2")} role="menu" aria-label={group.label}>
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={item.href} role="none">
                <NavAnchor
                  item={item}
                  onClick={onNavigate}
                  className="group/item flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-surface focus-visible:bg-surface"
                >
                  <span className="mt-1 w-6 shrink-0 font-mono text-[11px] text-faint group-hover/item:text-brand">{pad2(i + 1)}</span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-[15px] font-semibold text-ink">
                      {Icon ? <Icon size={15} className="text-navy" strokeWidth={1.8} /> : null}
                      {item.label}
                      {item.external ? <ArrowUpRight size={12} className="text-faint" aria-hidden /> : null}
                    </span>
                    {item.description ? <span className="mt-0.5 block text-[13.5px] leading-snug text-muted">{item.description}</span> : null}
                  </span>
                </NavAnchor>
              </li>
            );
          })}
        </ul>
        {group.overview ? (
          <div className="border-t border-line bg-surface px-3 py-2">
            <Link
              href={group.overview.href}
              onClick={onNavigate}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-[13px] font-semibold text-ink transition-colors hover:bg-white"
            >
              <span>
                {group.overview.label}
                {group.overview.description ? <span className="ml-2 font-normal text-muted">{group.overview.description}</span> : null}
              </span>
              <ArrowRight size={14} className="text-brand" aria-hidden />
            </Link>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 140);
  }, []);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);

  // Close menus on route change (state adjusted during render, per React guidance).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenGroup(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const solid = scrolled || mobileOpen || openGroup !== null;
  const dark = DARK_HERO_ROUTES.has(pathname) && !solid;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-[background-color,border-color,height] duration-300",
          solid ? "glass border-line" : dark ? "border-white/10 bg-transparent" : "border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn("container-x flex items-center justify-between transition-[height] duration-300", scrolled ? "h-14" : "h-[72px]")}
        >
          <Logo height={scrolled ? 24 : 28} priority inverted={dark} />

          {/* Desktop */}
          <ul className="hidden h-full items-stretch lg:flex" onMouseLeave={scheduleClose}>
            {NAV_GROUPS.map((group, index) => {
              const active = isGroupActive(group, pathname);
              const hasMenu = !!group.items?.length;
              const open = openGroup === group.label;
              const anchor = index < NAV_GROUPS.length / 2 ? "left" : "right";
              const linkCls = cn(
                "relative flex h-full items-center gap-1 whitespace-nowrap px-3 text-[15px] font-medium transition-colors xl:px-3.5",
                dark ? "text-white/85 hover:text-white" : "text-ink/75 hover:text-ink",
                (active || open) && (dark ? "text-white" : "text-ink"),
                // active rule
                "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-brand after:opacity-0 after:transition-opacity xl:after:inset-x-3.5",
                active && "after:opacity-100",
              );
              if (!hasMenu) {
                return (
                  <li key={group.label} className="flex">
                    {group.external ? (
                      <a href={group.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                        {group.label}
                      </a>
                    ) : (
                      <Link href={group.href} className={linkCls} aria-current={active ? "page" : undefined}>
                        {group.label}
                      </Link>
                    )}
                  </li>
                );
              }
              return (
                <li
                  key={group.label}
                  className="relative flex"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenGroup(group.label);
                  }}
                >
                  <button
                    type="button"
                    className={linkCls}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    onClick={() => setOpenGroup(open ? null : group.label)}
                    onFocus={() => {
                      cancelClose();
                      setOpenGroup(group.label);
                    }}
                  >
                    {group.label}
                    <ChevronDown size={14} className={cn("transition-transform duration-200", open && "rotate-180")} aria-hidden />
                  </button>
                  <AnimatePresence>
                    {open ? (
                      <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
                        <DropdownPanel group={group} anchor={anchor} onNavigate={() => setOpenGroup(null)} />
                      </div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <Button href={LINKS.bookDemo} size="sm" icon={<ArrowRight size={14} />}>
              Book a Demo
            </Button>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button href={LINKS.bookDemo} size="sm" className="hidden sm:inline-flex">
              Book a Demo
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className={cn("inline-flex size-10 items-center justify-center rounded-lg transition-colors", dark ? "text-white hover:bg-white/10" : "text-ink hover:bg-ink/5")}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 top-14 overflow-y-auto bg-white lg:hidden"
          >
            <div className="container-x pb-10 pt-2">
              <ul className="divide-y divide-line">
                {NAV_GROUPS.map((group) => {
                  const hasMenu = !!group.items?.length;
                  const expanded = mobileGroup === group.label;
                  const active = isGroupActive(group, pathname);
                  if (!hasMenu) {
                    return (
                      <li key={group.label}>
                        <NavAnchor
                          item={{ label: group.label, href: group.href, external: group.external }}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between py-4 text-lg font-semibold text-ink"
                        >
                          {group.label}
                          <ArrowUpRight size={18} className="text-faint" aria-hidden />
                        </NavAnchor>
                      </li>
                    );
                  }
                  return (
                    <li key={group.label}>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => setMobileGroup(expanded ? null : group.label)}
                        className={cn("flex w-full items-center justify-between py-4 text-lg font-semibold", active ? "text-brand" : "text-ink")}
                      >
                        {group.label}
                        <ChevronDown size={18} className={cn("text-faint transition-transform duration-200", expanded && "rotate-180")} aria-hidden />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded ? (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease }}
                            className="overflow-hidden"
                          >
                            {group.overview ? (
                              <li>
                                <Link
                                  href={group.overview.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-2 py-2.5 text-[15px] font-semibold text-brand"
                                >
                                  {group.overview.label}
                                  <ArrowRight size={14} aria-hidden />
                                </Link>
                              </li>
                            ) : null}
                            {group.items!.map((item, i) => (
                              <li key={item.href}>
                                <NavAnchor item={item} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-2.5 text-[15px] font-medium text-ink">
                                  <span className="w-6 font-mono text-[11px] text-faint">{pad2(i + 1)}</span>
                                  {item.label}
                                </NavAnchor>
                              </li>
                            ))}
                            <li className="h-3" aria-hidden />
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex flex-col gap-2">
                <Button href={LINKS.bookDemo} fullWidth icon={<ArrowRight size={16} />}>
                  Book a Demo
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
