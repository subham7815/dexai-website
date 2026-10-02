import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names safely. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format a number as GBP currency, e.g. 1234.5 -> "£1,234.50". */
export function gbp(value: number, options: Intl.NumberFormatOptions = {}): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
}

/** Format a whole number with thousands separators. */
export function num(value: number): string {
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(value);
}

/** Props shared by homepage sections that can also serve as a page body. */
export interface SectionProps {
  /** Hide the section's own heading (the page hero carries it instead). */
  hideHeading?: boolean;
}

/** Vertical padding for a section, tighter when it sits under a page hero. */
export function sectionPad(hideHeading?: boolean): string {
  return hideHeading ? "py-10 lg:py-16" : "py-24 lg:py-32";
}

/** Pad a step index -> "01". */
export function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}
