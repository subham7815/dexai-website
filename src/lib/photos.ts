/**
 * Photography used across the site.
 *
 * All images are free-licence photos served from Unsplash's CDN
 * (https://unsplash.com/license). Replace any entry with your own
 * photography by pointing `src` at a file in /public.
 */

export interface Photo {
  src: string;
  alt: string;
  /** Intrinsic aspect ratio hint used for layout (w / h). */
  ratio?: number;
}

function unsplash(id: string, w = 1600): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const PHOTOS = {
  financeDesk: {
    src: unsplash("1753955900083-b62ee8d97805"),
    alt: "Bills, a calculator and a laptop on a desk while financial admin is underway",
  },
  receipts: {
    src: unsplash("1763958470434-bf7f5065cc3b"),
    alt: "A pile of paper receipts waiting to be processed",
  },
  receiptOnTable: {
    src: unsplash("1731686602391-7484df33a03c"),
    alt: "A printed receipt lying on a wooden table",
  },
  cafeOwners: {
    src: unsplash("1753351052617-62818ffc9173"),
    alt: "Two café owners standing together in their shop",
  },
  shopCounter: {
    src: unsplash("1687293233211-6b0cc3beba70"),
    alt: "A small business owner standing behind her shop counter",
  },
  accountantDesk: {
    src: unsplash("1735825764485-93a381fd5779"),
    alt: "An accountant working at a desk with a laptop and paperwork",
  },
  boardMeeting: {
    src: unsplash("1622675363311-3e1904dc1885"),
    alt: "A finance team on laptops listening to a colleague in a board meeting",
  },
  freelancerCoffee: {
    src: unsplash("1545184180-25d471fe75eb"),
    alt: "A freelancer working on a laptop over coffee",
  },
  team: {
    src: unsplash("1521737604893-d14cc237f11d"),
    alt: "A team working together around a table",
  },
  building: {
    src: unsplash("1621831337128-35676ca30868"),
    alt: "Glass-walled modern office building",
  },
  typing: {
    src: unsplash("1735825764460-c5dec05d6253"),
    alt: "A person typing on a laptop at a desk",
  },
  conferenceRoom: {
    src: unsplash("1703355685722-2996b01483be"),
    alt: "A quiet conference room with a view of the street",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;
