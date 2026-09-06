"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { FabricSwatch } from "@/components/fabric-swatch";
import { YardStepper } from "@/components/ui/yard-stepper";
import { listing, marketOf, tierPrice, vendor } from "@/lib/seed";
import { useApp } from "@/lib/store";
import type { CartLine } from "@/lib/types";
import { naira } from "@/lib/utils";

export default function CartPage() {
  const { cart, updateCartYards, removeFromCart, cartSubtotal } = useApp();
  const groups = groupByVendor(cart);

  if (cart.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="text-lg font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
          Nothing in the cart yet
        </p>
        <p className="mt-1 text-[13px] text-ink-500">Find a fabric. Add the yards you need.</p>
        <Link href="/explore" className="mt-5 inline-block rounded-xl bg-indigo-700 px-5 py-3 text-sm font-bold text-cream-50">
          Explore fabrics
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 pb-28 pt-3">
      {Object.entries(groups).map(([vendorId, lines]) => {
        const v = vendor(vendorId);
        const m = marketOf(v.market);
        const sub = lines.reduce((s, line) => {
          const l = listing(line.listingId);
          return s + tierPrice(l, line.yards) * line.yards;
        }, 0);
        return (
          <section key={vendorId} className="mb-4 overflow-hidden rounded-card bg-cream-100 ring-1 ring-line-200">
            <div className="flex items-center justify-between px-3 py-2.5">
              <div>
                <p className="text-[13px] font-bold">{v.shopName}</p>
                <p className="text-[11px] text-ink-500">{m.name} · escrowed separately</p>
              </div>
              <p className="tnum text-[13px] font-extrabold">{naira(sub)}</p>
            </div>
            {lines.map((line) => {
              const l = listing(line.listingId);
              const c = l.colourways.find((x) => x.name === line.colourway) ?? l.colourways[0];
              return (
                <div key={line.listingId} className="flex gap-3 border-t border-line-200 px-3 py-3">
                  <FabricSwatch
                    seed={l.id}
                    fabricType={l.fabricType}
                    base={c.hex}
                    accent={c.accent}
                    className="h-16 w-16 shrink-0 rounded-xl"
                    rounded
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-bold">{l.title}</p>
                    <p className="text-[11px] text-ink-500">
                      {line.colourway} · {line.cutType} cut
                    </p>
                    <div className="mt-2">
                      <YardStepper
                        listing={l}
                        value={line.yards}
                        onChange={(n) => updateCartYards(l.id, n)}
                        compact
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove"
                    onClick={() => removeFromCart(l.id)}
                    className="self-start text-ink-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </section>
        );
      })}

      <div className="fixed inset-x-0 bottom-20 z-30 mx-auto max-w-[398px] border-t border-line-200 bg-cream-50/95 px-4 py-3 backdrop-blur-md sm:left-auto sm:right-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-ink-500">Held in escrow</p>
            <p className="tnum text-xl font-extrabold">{naira(cartSubtotal)}</p>
          </div>
          <Link href="/checkout" className="rounded-xl bg-clay-500 px-5 py-3 text-sm font-bold text-cream-50">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

function groupByVendor(cart: CartLine[]) {
  return cart.reduce<Record<string, CartLine[]>>((acc, line) => {
    const v = listing(line.listingId).vendorId;
    (acc[v] ??= []).push(line);
    return acc;
  }, {});
}
