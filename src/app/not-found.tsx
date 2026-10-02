import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-surface px-6 pt-44 pb-32 text-center">
      <Logo height={30} />
      <p className="mt-10 font-mono text-[12px] uppercase tracking-[0.18em] text-brand">Error 404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-lg text-body">The page you were looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="mt-8 inline-flex h-12 items-center rounded-lg bg-brand px-5 text-[15px] font-semibold text-white hover:bg-brand-dark">
        Back to home
      </Link>
    </div>
  );
}
