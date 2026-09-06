"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { listing as getListing } from "@/lib/seed";
import { useApp } from "@/lib/store";
import { naira } from "@/lib/utils";

type Msg = { from: "user" | "yardi"; body: string; card?: "yards" | "routes" | "basket" };

const SCRIPT: Msg[] = [
  { from: "user", body: "Wedding in Owerri in November, ₦80,000 budget, 12 people." },
  {
    from: "yardi",
    body: "I can plan that. Two things first — what are they wearing, and is gele included?",
  },
  { from: "user", body: "Long gowns. Yes, gele." },
  {
    from: "yardi",
    body: "12 people × 5 yards for a gown + 2 for gele = 7 yards each. Plus a 15% tailor buffer.",
    card: "yards",
  },
  {
    from: "yardi",
    body: "₦80,000 ÷ 69 yards is about ₦1,160 a yard. That is below market — even fancy print sits around ₦6,500. I will not pretend otherwise. Three honest routes:",
    card: "routes",
  },
];

export default function AdvisorPage() {
  const [shown, setShown] = useState(1);
  const [picked, setPicked] = useState<string | null>(null);
  const { addToCart, toast } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (shown >= SCRIPT.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 1 ? 400 : 900);
    return () => clearTimeout(t);
  }, [shown]);

  const visible = SCRIPT.slice(0, shown);

  return (
    <div className="flex min-h-[70vh] flex-col px-4 pb-8 pt-3">
      <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-wide text-brass-700">
        Powered by Yardi Advisor
      </p>

      <div className="flex-1 space-y-2.5">
        {visible.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                m.from === "user"
                  ? "rounded-br-sm bg-indigo-700 text-cream-50"
                  : "rounded-bl-sm bg-cream-100 text-ink-900"
              }`}
            >
              {m.body}
              {m.card === "yards" && (
                <div className="mt-2 rounded-xl bg-indigo-900 p-3 text-cream-50">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-brass-500">Yardage</p>
                  <p className="tnum text-2xl font-extrabold">69 yards</p>
                  <p className="text-[11px] text-cream-100/70">(12 × 7) + 15% buffer</p>
                </div>
              )}
              {m.card === "routes" && !picked && (
                <div className="mt-2 space-y-1.5">
                  {[
                    { id: "raise", title: "Raise the budget", line: "₦480,000 buys honest entry ankara for 12." },
                    { id: "fewer", title: "Fewer people", line: "6 guests fits ₦80,000 at ~₦11,400/yd." },
                    { id: "lighter", title: "Lighter fabric", line: "Atamfa fancy print. Honest cloth at an honest price." },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setPicked(r.id)}
                      className="block w-full rounded-xl bg-cream-50 px-3 py-2 text-left ring-1 ring-line-200"
                    >
                      <span className="block text-[13px] font-bold">{r.title}</span>
                      <span className="block text-[11px] text-ink-500">{r.line}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {picked && (
          <div className="flex justify-start">
            <div className="max-w-[86%] rounded-2xl rounded-bl-sm bg-cream-100 px-3.5 py-2.5 text-[13.5px] leading-relaxed">
              {picked === "lighter"
                ? "Good. Two listings that will actually arrive as described, inside a real budget."
                : picked === "fewer"
                  ? "I can build a 6-person basket in Grade B African wax."
                  : "I can assemble a Grade A wax hollandais basket at ₦480,000."}
              <div className="mt-2 space-y-2">
                {["l-007", "l-015"].map((id) => {
                  const l = getListing(id);
                  return (
                    <div key={id} className="rounded-xl bg-cream-50 p-2.5 ring-1 ring-line-200">
                      <p className="text-[13px] font-bold">{l.title}</p>
                      <p className="tnum text-[12px] text-ink-500">
                        {naira(l.pricePerYard)}/yd · {l.city}
                      </p>
                    </div>
                  );
                })}
                <button
                  type="button"
                  onClick={() => {
                    addToCart({ listingId: "l-007", colourway: "Coral", yards: 36, cutType: "continuous" });
                    addToCart({ listingId: "l-015", colourway: "Emerald", yards: 33, cutType: "continuous" });
                    toast({ title: "Basket added", detail: "69 yards across two vendors", tone: "green" });
                    router.push("/cart");
                  }}
                  className="w-full rounded-xl bg-clay-500 py-2.5 text-[13px] font-bold text-cream-50"
                >
                  Add all to cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="no-bar mt-4 flex gap-1.5 overflow-x-auto">
        {["How many yards for agbada?", "What is Super Wax?", "Post this as a bulk request"].map((p) => (
          <span key={p} className="shrink-0 rounded-full bg-cream-100 px-3 py-1.5 text-[11px] font-semibold ring-1 ring-line-200">
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
