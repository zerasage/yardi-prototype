"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { FabricSwatch } from "@/components/fabric-swatch";
import { GradeBadge } from "@/components/ui/grade-badge";
import { marketOf, vendor } from "@/lib/seed";
import { useApp } from "@/lib/store";
import type { Listing } from "@/lib/types";
import { naira } from "@/lib/utils";

export function ListingCard({ listing, featured = false }: { listing: Listing; featured?: boolean }) {
  const { isAdvanced } = useApp();
  const v = vendor(listing.vendorId);
  const m = marketOf(v.market);
  const colour = listing.colourways[0];

  return (
    <Link
      href={`/listing/${listing.id}`}
      className="group block overflow-hidden rounded-card bg-cream-100 shadow-[0_1px_2px_rgba(26,23,19,0.06)] ring-1 ring-line-200/80"
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-[4/5]" : "aspect-[4/5]"}`}>
        <FabricSwatch
          seed={listing.id}
          fabricType={listing.fabricType}
          base={colour.hex}
          accent={colour.accent}
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        />
        {listing.hasDrapeVideo && (
          <span className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-900/70 text-brass-500 ring-1 ring-brass-500/60">
            <Play className="h-3 w-3 fill-brass-500" />
          </span>
        )}
        {isAdvanced && (
          <span className="absolute right-2 top-2">
            <GradeBadge letter={listing.grade?.letter} status={listing.grade?.status ?? "pending"} size="sm" />
          </span>
        )}
        {listing.stockYards < 10 && (
          <span className="absolute bottom-2 left-2 rounded-full bg-signal-amber px-2 py-0.5 text-[9px] font-bold uppercase text-ink-900">
            {listing.stockYards} yards left
          </span>
        )}
      </div>
      <div className="space-y-1 p-2.5">
        <p className="tnum text-[15px] font-extrabold leading-none text-ink-900">
          {naira(listing.pricePerYard)} <span className="text-[11px] font-semibold text-ink-500">/yd</span>
        </p>
        <p className="line-clamp-2 text-[12px] font-semibold leading-snug text-ink-900">{listing.title}</p>
        <p className="truncate text-[10.5px] text-ink-500">
          {v.shopName} · {m.name}
        </p>
      </div>
    </Link>
  );
}
