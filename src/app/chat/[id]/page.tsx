"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { listing, THREADS, vendor } from "@/lib/seed";
import { useApp } from "@/lib/store";
import { naira, timeOf } from "@/lib/utils";

export default function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const v = vendor(id);
  const thread = THREADS.find((t) => t.vendorId === v.id) ?? THREADS[0];
  const { addToCart, toast } = useApp();
  const router = useRouter();
  const [text, setText] = useState("");
  const [extra, setExtra] = useState<string[]>([]);

  return (
    <div className="flex min-h-[70vh] flex-col px-4 pb-8 pt-2">
      <p className="mb-3 text-center text-[11px] text-ink-500">
        Paying outside Yardi means no escrow protection.
      </p>
      <div className="flex-1 space-y-2">
        {thread.messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === "buyer" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[78%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
                m.from === "buyer" ? "rounded-br-sm bg-indigo-700 text-cream-50" : "rounded-bl-sm bg-cream-100 text-ink-900"
              }`}
            >
              {m.type === "voice" ? (
                <p className="font-semibold">▶ Voice note · {m.voiceSecs}s</p>
              ) : m.type === "offer" && m.offer ? (
                <OfferCard
                  yards={m.offer.yards}
                  price={m.offer.pricePerYard}
                  listingId={m.offer.listingId}
                  onAccept={() => {
                    addToCart({
                      listingId: m.offer!.listingId,
                      colourway: listing(m.offer!.listingId).colourways[0].name,
                      yards: m.offer!.yards,
                      cutType: "continuous",
                    });
                    toast({ title: "Offer accepted · added to cart", tone: "green" });
                    router.push("/cart");
                  }}
                />
              ) : (
                m.body
              )}
              <p className={`mt-1 text-[9px] ${m.from === "buyer" ? "text-cream-100/50" : "text-ink-300"}`}>
                {timeOf(m.at)}
              </p>
            </div>
          </div>
        ))}
        {extra.map((b, i) => (
          <div key={i} className="flex justify-end">
            <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-indigo-700 px-3 py-2 text-[13px] text-cream-50">
              {b}
            </div>
          </div>
        ))}
      </div>

      <div className="no-bar mt-3 flex gap-1.5 overflow-x-auto">
        {["Is this available?", "Best price for 12 yards?", "Can I get a video?"].map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => setExtra((e) => [...e, q])}
            className="shrink-0 rounded-full bg-cream-100 px-3 py-1.5 text-[11px] font-semibold ring-1 ring-line-200"
          >
            {q}
          </button>
        ))}
      </div>

      <form
        className="mt-2 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          setExtra((x) => [...x, text]);
          setText("");
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message…"
          className="h-11 flex-1 rounded-full bg-cream-100 px-4 text-[13px] outline-none ring-1 ring-line-200"
        />
        <button type="submit" className="rounded-full bg-indigo-700 px-4 text-sm font-bold text-cream-50">
          Send
        </button>
      </form>
    </div>
  );
}

function OfferCard({
  yards,
  price,
  listingId,
  onAccept,
}: {
  yards: number;
  price: number;
  listingId: string;
  onAccept: () => void;
}) {
  const l = listing(listingId);
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wide opacity-70">Offer</p>
      <p className="font-bold">
        {yards} yards · {naira(price)} /yd
      </p>
      <p className="text-[11px] opacity-80">{l.title}</p>
      <button
        type="button"
        onClick={onAccept}
        className="mt-2 w-full rounded-lg bg-brass-500 py-1.5 text-[11px] font-extrabold text-indigo-900"
      >
        Accept & pay
      </button>
    </div>
  );
}
