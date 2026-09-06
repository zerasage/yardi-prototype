"use client";

import Link from "next/link";
import { ORDERS, listing, vendor } from "@/lib/seed";
import { useApp } from "@/lib/store";
import { naira, pluralYards, shortDate } from "@/lib/utils";
import type { EscrowState } from "@/lib/types";

const LABELS: Record<EscrowState, string> = {
  held: "Payment held",
  accepted: "Vendor accepted",
  packed: "Cut and packed",
  transit: "In transit",
  delivered: "Confirm receipt",
  released: "Released",
  disputed: "Disputed",
};

export default function OrdersPage() {
  const { releasedOrders } = useApp();

  return (
    <div className="space-y-2.5 px-4 pb-8 pt-3">
      {ORDERS.map((o) => {
        const l = listing(o.listingId);
        const v = vendor(o.vendorId);
        const state = releasedOrders.includes(o.id) ? "released" : o.escrowState;
        return (
          <Link
            key={o.id}
            href={`/orders/${o.id}`}
            className="block rounded-card bg-cream-100 p-3.5 ring-1 ring-line-200"
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-wide text-ink-500">{o.ref}</p>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                  state === "released"
                    ? "bg-signal-green/15 text-signal-green"
                    : state === "disputed"
                      ? "bg-signal-red/15 text-signal-red"
                      : state === "delivered"
                        ? "bg-brass-100 text-brass-700"
                        : "bg-indigo-100 text-indigo-700"
                }`}
              >
                {LABELS[state]}
              </span>
            </div>
            <p className="mt-1.5 text-[14px] font-bold">{l.title}</p>
            <p className="text-[12px] text-ink-500">
              {pluralYards(o.yards)} · {v.shopName} · {shortDate(o.placedAt)}
            </p>
            <p className="tnum mt-1 text-[14px] font-extrabold">
              {naira(o.pricePerYard * o.yards + o.deliveryFee)}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
