import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { ProductWorkflow } from "@/components/ProductWorkflow";
import { RelatedPages } from "@/components/RelatedPages";
import { ShiftList } from "@/components/ShiftList";
import { Photo, PhotoBadge } from "@/components/ui/Photo";
import { SOLUTION_PAGES, SOLUTION_SLUGS, type SolutionSlug } from "@/lib/content/solutions";
import type { PhotoKey } from "@/lib/photos";
import { LayoutGrid } from "lucide-react";
import { getGroup, NAV_GROUPS, type NavLink } from "@/lib/navigation";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SOLUTION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = SOLUTION_PAGES[slug as SolutionSlug];
  if (!page) return {};
  return { title: page.navLabel, description: page.metaDescription, alternates: { canonical: `/solutions/${slug}` } };
}

const HERO_PHOTO: Record<SolutionSlug, { photo: PhotoKey; badge: string; sub: string }> = {
  "small-business": { photo: "cafeOwners", badge: "Receipts captured at the counter", sub: "Photo, upload or email forwarding" },
  accountants: { photo: "accountantDesk", badge: "Client documents, already extracted", sub: "Review exceptions, not data entry" },
  "multi-company": { photo: "boardMeeting", badge: "Every entity in one dashboard", sub: "Separate books, shared automation" },
  freelancers: { photo: "freelancerCoffee", badge: "Admin done between jobs", sub: "Receipts, mileage and VAT on your phone" },
};

/** Look up icon + description for a related link from the navigation data. */
function enrich(link: { label: string; href: string }): NavLink {
  const all = NAV_GROUPS.flatMap((g) => g.items ?? []);
  const found = all.find((i) => i.href === link.href);
  if (found) return found;
  const group = NAV_GROUPS.find((g) => g.href === link.href);
  if (group) return { label: link.label, href: link.href, description: group.overview?.description, icon: LayoutGrid };
  return link;
}

export default async function SolutionDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = SOLUTION_PAGES[slug as SolutionSlug];
  if (!page) notFound();

  const others = getGroup("Solutions").items!.filter((i) => i.href !== `/solutions/${page.slug}`);

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        crumbs={[{ label: "Solutions", href: "/solutions" }, { label: page.navLabel }]}
      >
        <Photo photo={HERO_PHOTO[page.slug].photo} aspect="aspect-[5/4]" shade priority>
          <PhotoBadge className="bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6">
            <div className="text-[15px] font-bold text-ink">{HERO_PHOTO[page.slug].badge}</div>
            <div className="mt-0.5 text-[13px] text-muted">{HERO_PHOTO[page.slug].sub}</div>
          </PhotoBadge>
        </Photo>
      </PageHero>
      <ShiftList shifts={page.shifts} />
      <ProductWorkflow />
      <RelatedPages eyebrow="Relevant capabilities" title={`What ${page.navLabel.toLowerCase()} use most`} links={page.related.map(enrich)} columns={4} />
      <RelatedPages eyebrow="Other solutions" title="Not quite your shape?" links={others} className="border-y border-line bg-surface" />
      <CTA />
    </>
  );
}
