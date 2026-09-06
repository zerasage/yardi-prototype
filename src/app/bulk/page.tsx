"use client";

import Link from "next/link";
import { BULK_REQUESTS, fabricType } from "@/lib/seed";
import { naira, pluralYards, shortDate } from "@/lib/utils";

export default function BulkPage() {
  return (
    <div className="px-4 pb-8 pt-3">
      <div className="rounded-card bg-indigo-900 p-4 text-cream-50">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brass-500">Asoebi</p>
        <h1 className="mt-1 text-xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
          Post it once. Let vendors bid.
        </h1>
        <p className="mt-1 text-[13px] text-cream-100/75">
          Fabric, yards, budget, date. Matching vendors send offers. You pick one. Escrow holds the money.
        </p>
        <Link
          href="/bulk/new"
          className="mt-3 inline-block rounded-xl bg-brass-500 px-4 py-2.5 text-[13px] font-extrabold text-indigo-900"
        >
          New bulk request
        </Link>
      </div>

      <h2 className="mb-2 mt-6 text-[14px] font-bold">Your requests</h2>
      <div className="space-y-2.5">
        {BULK_REQUESTS.map((b) => {
          const ft = fabricType(b.fabricType);
          return (
            <Link
              key={b.id}
              href={`/bulk/${b.id}`}
              className="block rounded-card bg-cream-100 p-3.5 ring-1 ring-line-200"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-wide text-ink-500">{b.ref}</p>
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold uppercase text-indigo-700">
                  {b.state === "offers" ? `${b.offers.length} offers` : b.state}
                </span>
              </div>
              <p className="mt-1 text-[15px] font-bold">
                {ft.name} · {b.colour}
              </p>
              <p className="text-[12px] text-ink-500">
                {b.peopleCount} people · {pluralYards(b.yards)} · max {naira(b.budgetPerYard)}/yd
              </p>
              <p className="mt-1 text-[11px] text-ink-500">
                {b.city} · {shortDate(b.eventDate)}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
