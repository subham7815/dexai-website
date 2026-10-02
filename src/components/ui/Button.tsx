import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkGhost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

type AnchorProps = BaseProps & { href: string; external?: boolean } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href" | "className" | "children"
  >;
type NativeButtonProps = BaseProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export type ButtonProps = AnchorProps | NativeButtonProps;

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 ease-out select-none disabled:opacity-60 disabled:pointer-events-none active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-[0_10px_24px_-10px_rgba(199,16,44,0.65)] hover:bg-brand-dark",
  secondary: "border border-line-strong bg-white text-ink shadow-sm hover:border-ink",
  ghost: "bg-transparent text-ink hover:bg-surface",
  onDark: "bg-white text-navy-ink hover:bg-brand-soft",
  onDarkGhost: "border border-white/35 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[14px]",
  md: "h-12 px-5 text-[15px]",
  lg: "h-14 px-7 text-base",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, icon, fullWidth } = props;
  const classes = cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);

  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5" aria-hidden>
          {icon}
        </span>
      ) : null}
    </>
  );

  if (props.href !== undefined) {
    const { href, external, variant: _v, size: _s, icon: _i, fullWidth: _f, className: _c, children: _ch, ...rest } = props;
    void _v; void _s; void _i; void _f; void _c; void _ch;
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const { variant: _v, size: _s, icon: _i, fullWidth: _f, className: _c, children: _ch, href: _h, ...rest } = props;
  void _v; void _s; void _i; void _f; void _c; void _ch; void _h;
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
