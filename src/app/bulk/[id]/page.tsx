"use client";

import { use } from "react";
import Link from "next/link";
import { GradeChip } from "@/components/ui/grade-badge";
import { AdvancedOnly } from "@/components/mode-switch";
import { bulkRequest, fabricType, vendor } from "@/lib/seed";
import { useApp } from "@/lib/store";
import { naira, pluralYards, shortDate } from "@/lib/utils";

export default function BulkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const b = bulkRequest(id);
  const ft = fabricType(b.fabricType);
  const { isAdvanced, addToCart, toast } = useApp();
  const best = b.offers.find((o) => o.id === "bo-1");

  return (
    <div className="px-4 pb-8 pt-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-ink-500">{b.ref}</p>
      <h1 className="mt-1 text-xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
        {ft.name}, {b.colour}
      </h1>
      <p className="text-[13px] text-ink-500">
        {b.peopleCount} people · {pluralYards(b.yards)} · {b.city} · {shortDate(b.eventDate)}
      </p>
      <p className="mt-1 text-[13px] font-semibold">
        Budget {naira(b.budgetPerYard)}/yd
        {b.sampleRequired ? " · swatch required" : ""}
      </p>

      <AdvancedOnly index={0} bare>
        <p className="mt-3 rounded-card bg-brass-100 px-3 py-2 text-[12px] font-semibold text-brass-700">
          Grade column is on. The cheapest offer is Grade C. Best value is Grade A.
        </p>
      </AdvancedOnly>

      <h2 className="mb-2 mt-5 text-[14px] font-bold">{b.offers.length} offers</h2>
      <div className="space-y-2.5">
        {b.offers.map((o) => {
          const v = vendor(o.vendorId);
          const isBest = o.id === best?.id;
          return (
            <div
              key={o.id}
              className={`rounded-card p-3.5 ring-1 ${
                isBest ? "bg-brass-100/60 ring-brass-500/40" : "bg-cream-100 ring-line-200"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[14px] font-bold">{v.shopName}</p>
                  <p className="text-[11px] text-ink-500">
                    {v.rating} ★ · {v.ordersCompleted} orders
                  </p>
                </div>
                <div className="text-right">
                  <p className="tnum text-[15px] font-extrabold">{naira(o.pricePerYard)}/yd</p>
                  <p className="tnum text-[11px] text-ink-500">{naira(o.pricePerYard * b.yards)} total</p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {isBest && (
                  <span className="rounded-full bg-brass-500 px-2 py-0.5 text-[10px] font-extrabold text-indigo-900">
                    Best value
                  </span>
                )}
                {isAdvanced && <GradeChip letter={o.gradeLetter} />}
                {o.sampleOffered && (
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                    Swatch offered
                  </span>
                )}
                <span className="text-[11px] text-ink-500">Delivers {shortDate(o.deliveryDate)}</span>
              </div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-700">{o.note}</p>
              <button
                type="button"
                onClick={() => {
                  addToCart({
                    listingId: o.vendorId === "v-adaeze" ? "l-001" : "l-013",
                    colourway: "Wine",
                    yards: 6,
                    cutType: "continuous",
                  });
                  toast({ title: "Offer accepted", detail: `${v.shopName} · converting to escrow`, tone: "green" });
                }}
                className="mt-3 w-full rounded-xl bg-indigo-700 py-2.5 text-[13px] font-bold text-cream-50"
              >
                Accept offer
              </button>
            </div>
          );
        })}
      </div>

      {isAdvanced && (
        <Link
          href="/bulk/b-1"
          className="mt-4 block rounded-card bg-indigo-900 p-3.5 text-cream-50"
        >
          <p className="text-[10px] font-bold uppercase tracking-wide text-brass-500">Group pay</p>
          <p className="mt-1 text-[14px] font-bold">Share yardi.ng/pay/ASO-8842</p>
          <p className="text-[12px] text-cream-100/70">
            12 of 38 guests have paid their share. Order places when the rest join.
          </p>
        </Link>
      )}
    </div>
  );
}
