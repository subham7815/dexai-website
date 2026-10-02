import type { PhotoKey } from "@/lib/photos";
import { cn } from "@/lib/utils";
import { Photo, PhotoBadge } from "./ui/Photo";

interface CollageItem {
  photo: PhotoKey;
  label: string;
}

/** Three overlapping photos with captions, used in page heroes. */
export function PhotoCollage({ items, className }: { items: [CollageItem, CollageItem, CollageItem]; className?: string }) {
  const [a, b, c] = items;
  return (
    <div className={cn("relative mx-auto w-full max-w-xl", className)}>
      <div
        className="grid h-[340px] gap-3 sm:h-[440px] lg:h-[480px]"
        style={{ gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gridTemplateRows: "repeat(6, minmax(0, 1fr))" }}
      >
        <Photo photo={a.photo} aspect="" className="min-h-0" style={{ gridColumn: "1 / 5", gridRow: "1 / 5" }} sizes="(min-width: 1024px) 30vw, 70vw" shade priority>
          <PhotoBadge className="bottom-3 left-3 px-3 py-2 text-[13px] font-semibold text-ink">{a.label}</PhotoBadge>
        </Photo>
        <Photo
          photo={b.photo}
          aspect=""
          className="min-h-0"
          style={{ gridColumn: "5 / 7", gridRow: "1 / 4" }}
          sizes="(min-width: 1024px) 15vw, 30vw"
          rounded="rounded-xl"
          priority
        />
        <Photo photo={c.photo} aspect="" className="min-h-0" style={{ gridColumn: "4 / 7", gridRow: "4 / 7" }} sizes="(min-width: 1024px) 22vw, 50vw" shade priority>
          <PhotoBadge className="bottom-3 left-3 px-3 py-2 text-[13px] font-semibold text-ink">{c.label}</PhotoBadge>
        </Photo>
      </div>
      <div className="absolute bottom-0 left-0 w-[48%] rounded-xl border border-line bg-white p-4 shadow-float">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{b.label}</div>
        <div className="mt-1 text-[15px] font-bold leading-snug text-ink">Same automation, every shape of business.</div>
      </div>
    </div>
  );
}
