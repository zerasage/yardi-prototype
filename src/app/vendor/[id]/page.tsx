"use client";

import { use } from "react";
import { ShieldCheck } from "lucide-react";
import { ListingCard } from "@/components/ui/listing-card";
import { listingsByVendor, marketOf, vendor as getVendor } from "@/lib/seed";

export default function VendorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const v = getVendor(id);
  const m = marketOf(v.market);
  const listings = listingsByVendor(v.id);

  return (
    <div className="pb-8">
      <div className="bg-indigo-900 px-4 pb-6 pt-4 text-cream-50">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brass-500 text-lg font-extrabold text-indigo-900">
          {v.ownerName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
        </div>
        <h1 className="mt-3 text-2xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
          {v.shopName}
        </h1>
        <p className="mt-1 flex items-center gap-1 text-[13px] text-cream-100/80">
          <ShieldCheck className="h-3.5 w-3.5 text-brass-500" />
          {m.name} · {v.stallNo}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-cream-100/75">{v.bio}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            [String(v.ordersCompleted), "orders"],
            [`${v.rating}`, "rating"],
            [`${v.onTimePct}%`, "on time"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-xl bg-white/10 px-2 py-2 text-center">
              <p className="tnum text-sm font-extrabold">{n}</p>
              <p className="text-[10px] uppercase tracking-wide text-cream-100/60">{l}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {v.verifications.map((b) => (
            <span key={b} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold">
              {b}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 px-4 pt-4">
        {listings.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}
