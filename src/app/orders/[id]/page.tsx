"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { listing, order as getOrder, vendor } from "@/lib/seed";
import { useApp } from "@/lib/store";
import type { EscrowState } from "@/lib/types";
import { naira, pluralYards, timeOf } from "@/lib/utils";

const SEQUENCE: EscrowState[] = ["held", "accepted", "packed", "transit", "delivered", "released"];

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const o = getOrder(id);
  const l = listing(o.listingId);
  const v = vendor(o.vendorId);
  const { releasedOrders, releaseOrder, advancedOrders, advanceOrder, toast } = useApp();
  const [sliding, setSliding] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewed, setReviewed] = useState(false);

  const extra = advancedOrders[o.id] ?? 0;
  const released = releasedOrders.includes(o.id);
  const idx = Math.min(SEQUENCE.indexOf(o.escrowState) + extra, SEQUENCE.length - 1);
  const current = released ? "released" : SEQUENCE[idx];
  const currentIdx = SEQUENCE.indexOf(current);
  const canConfirm = current === "delivered";
  const total = o.pricePerYard * o.yards + o.deliveryFee;

  return (
    <div className="px-4 pb-8 pt-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-ink-500">{o.ref}</p>
      <h1 className="mt-1 text-xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
        {l.title}
      </h1>
      <p className="text-[13px] text-ink-500">
        {pluralYards(o.yards)} · {v.shopName} · {o.courier}
      </p>
      <p className="tnum mt-1 text-lg font-extrabold">{naira(total)}</p>

      <ol className="mt-6 space-y-0">
        {o.timeline.map((ev, i) => {
          const done = i <= currentIdx || (ev.state === "released" && released);
          const active = ev.state === current;
          return (
            <li key={ev.state} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`mt-0.5 h-3.5 w-3.5 rounded-full ${
                    done ? "bg-signal-green" : active ? "bg-brass-500" : "bg-line-200"
                  }`}
                />
                {i < o.timeline.length - 1 && (
                  <motion.span
                    initial={{ height: 0 }}
                    animate={{ height: 36 }}
                    className={`w-0.5 ${done ? "bg-signal-green" : "bg-line-200"}`}
                  />
                )}
              </div>
              <div className="pb-4">
                <p className={`text-[13px] font-bold ${done ? "text-ink-900" : "text-ink-500"}`}>
                  {released && ev.state === "released"
                    ? `${naira(total)} released to ${v.shopName}`
                    : ev.label}
                </p>
                {ev.at && <p className="text-[11px] text-ink-500">{timeOf(ev.at)}</p>}
                {ev.note && <p className="text-[11px] text-ink-500">{ev.note}</p>}
              </div>
            </li>
          );
        })}
      </ol>

      {canConfirm && !released && (
        <SlideConfirm
          sliding={sliding}
          setSliding={setSliding}
          onDone={() => {
            releaseOrder(o.id);
            toast({
              title: `${naira(total)} released to ${v.shopName}`,
              tone: "green",
            });
          }}
        />
      )}

      {current === "released" && (
        <div className="mt-2 space-y-3 rounded-card bg-indigo-900 p-4 text-cream-50">
          <p className="text-[11px] font-bold uppercase tracking-wide text-brass-500">Done</p>
          <p className="text-lg font-extrabold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            {v.ownerName.split(" ")[0]} has been paid.
          </p>
          <p className="text-[13px] leading-relaxed text-cream-100/75">
            {naira(total)} left escrow. Rate the fabric so the next buyer knows what they are getting.
          </p>

          {reviewed ? (
            <p className="text-[13px] font-semibold text-brass-500">Thank you. Your review is on the listing.</p>
          ) : (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-cream-100/60">Rate this fabric</p>
              <div className="mt-2 flex gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    className={`text-2xl leading-none ${n <= rating ? "text-brass-500" : "text-white/25"}`}
                    aria-label={`${n} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setReviewed(true);
                    toast({ title: `${rating} stars left for ${v.shopName}`, tone: "brass" });
                  }}
                  className="mt-3 w-full rounded-xl bg-brass-500 py-3 text-[13px] font-extrabold text-indigo-900"
                >
                  Submit review
                </button>
              )}
            </div>
          )}

          <Link
            href="/orders"
            className="block w-full rounded-xl bg-white/10 py-3 text-center text-[13px] font-bold text-cream-50 ring-1 ring-white/15"
          >
            Back to orders
          </Link>
        </div>
      )}

      {current !== "released" && o.escrowState !== "disputed" && (
        <button
          type="button"
          onClick={() => advanceOrder(o.id)}
          className="mt-4 w-full rounded-xl bg-cream-100 py-2.5 text-[11px] font-bold uppercase tracking-wide text-ink-500 ring-1 ring-line-200"
        >
          Demo · skip to next escrow step
        </button>
      )}
    </div>
  );
}

function SlideConfirm({
  sliding,
  setSliding,
  onDone,
}: {
  sliding: boolean;
  setSliding: (v: boolean) => void;
  onDone: () => void;
}) {
  return (
    <div className="relative mt-2 h-14 overflow-hidden rounded-full bg-indigo-900">
      <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-[12px] font-bold text-cream-100/70">
        Slide to confirm the fabric is right
      </p>
      <motion.button
        type="button"
        drag="x"
        dragConstraints={{ left: 0, right: 220 }}
        dragElastic={0.05}
        onDragEnd={(_, info) => {
          if (info.offset.x > 180) {
            setSliding(true);
            onDone();
          }
        }}
        className="absolute left-1 top-1 flex h-12 w-12 items-center justify-center rounded-full bg-signal-green text-[11px] font-extrabold text-cream-50"
      >
        {sliding ? "✓" : "→"}
      </motion.button>
    </div>
  );
}
