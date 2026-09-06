"use client";

import Link from "next/link";
import { listingsByVendor, ORDERS } from "@/lib/seed";
import { naira } from "@/lib/utils";
import { useApp } from "@/lib/store";

export default function VendorDashPage() {
  const { isAdvanced } = useApp();
  const listings = listingsByVendor("v-sani");
  const escrow = 17200 * 6 * 100;

  return (
    <div className="px-4 pb-8 pt-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-clay-500">Kantin Kwari · Shop B-114</p>
      <h1 className="text-xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
        Alhaji Sani Textiles
      </h1>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          [naira(84000000), "Today"],
          [naira(escrow), "In escrow"],
          ["3", "Pending orders"],
          ["247", "Completed"],
        ].map(([n, l]) => (
          <div key={l} className="rounded-card bg-cream-100 p-3 ring-1 ring-line-200">
            <p className="tnum text-[16px] font-extrabold text-indigo-700">{n}</p>
            <p className="text-[11px] text-ink-500">{l}</p>
          </div>
        ))}
      </div>

      <p className="mt-3 rounded-card bg-clay-100 px-3 py-2.5 text-[12.5px] font-semibold text-clay-700">
        3 buyers saved the wax hollandais — reply faster to convert.
      </p>

      <div className="mt-4 flex gap-2">
        <Link href="/sell/new" className="flex-1 rounded-xl bg-indigo-700 py-3 text-center text-[13px] font-bold text-cream-50">
          New listing
        </Link>
        {isAdvanced && (
          <Link href="/sell/quality" className="flex-1 rounded-xl bg-brass-500 py-3 text-center text-[13px] font-extrabold text-indigo-900">
            Grade a fabric
          </Link>
        )}
      </div>

      <h2 className="mb-2 mt-6 text-[14px] font-bold">Recent orders</h2>
      {ORDERS.filter((o) => o.vendorId === "v-sani" || o.vendorId === "v-adaeze").map((o) => (
        <Link
          key={o.id}
          href={`/orders/${o.id}`}
          className="mb-2 block rounded-card bg-cream-100 px-3 py-3 ring-1 ring-line-200"
        >
          <p className="text-[13px] font-bold">{o.ref}</p>
          <p className="text-[12px] text-ink-500">{o.escrowState} · {naira(o.pricePerYard * o.yards)}</p>
        </Link>
      ))}

      <h2 className="mb-2 mt-5 text-[14px] font-bold">Your listings</h2>
      {listings.map((l) => (
        <Link
          key={l.id}
          href={`/listing/${l.id}`}
          className="mb-2 flex items-center justify-between rounded-card bg-cream-100 px-3 py-3 ring-1 ring-line-200"
        >
          <span>
            <span className="block text-[13px] font-bold">{l.title}</span>
            <span className="text-[11px] text-ink-500">{l.stockYards} yards · {l.views} views</span>
          </span>
          <span className="tnum text-[13px] font-extrabold">{naira(l.pricePerYard)}</span>
        </Link>
      ))}

      <div className="mt-4 rounded-card bg-indigo-900 p-3.5 text-cream-50">
        <p className="text-[11px] font-bold uppercase tracking-wide text-brass-500">Payouts</p>
        <p className="tnum mt-1 text-xl font-extrabold">{naira(184000000)}</p>
        <p className="text-[12px] text-cream-100/70">Next payout Friday · Yardi 7% already deducted</p>
      </div>
    </div>
  );
}
