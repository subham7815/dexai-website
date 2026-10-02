import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Rendered height in px; width scales from the 752×261 source. */
  height?: number;
  priority?: boolean;
  asLink?: boolean;
  /** Render the wordmark in white for dark surfaces. */
  inverted?: boolean;
}

/** Official DexAI wordmark (red "Dex" + navy circuit "AI"). */
export function Logo({ className, height = 32, priority = false, asLink = true, inverted = false }: LogoProps) {
  const width = Math.round((752 / 261) * height);
  const img = (
    <Image
      src="/brand/dexai-logo.png"
      alt="DexAI"
      width={width}
      height={height}
      priority={priority}
      className={cn("select-none transition-[filter] duration-300", inverted && "brightness-0 invert", className)}
      style={{ height: `${height}px`, width: `${width}px` }}
    />
  );
  if (!asLink) return img;
  return (
    <Link href="/" aria-label="DexAI home" className="inline-flex shrink-0 items-center">
      {img}
    </Link>
  );
}
