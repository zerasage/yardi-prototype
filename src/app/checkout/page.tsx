"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { listing, tierPrice, vendor } from "@/lib/seed";
import { useApp } from "@/lib/store";
import { naira, pluralYards } from "@/lib/utils";

const COURIERS = [
  { id: "gig", name: "GIG Logistics", fee: 350000, eta: "Thu 12 Sep" },
  { id: "kwik", name: "Kwik", fee: 280000, eta: "Wed 11 Sep" },
  { id: "pickup", name: "Pick up at stall", fee: 0, eta: "Today" },
];

export default function CheckoutPage() {
  const { cart, cartSubtotal, clearCart, toast } = useApp();
  const [step, setStep] = useState<"delivery" | "pay" | "review">("delivery");
  const [courier, setCourier] = useState("gig");
  const [paying, setPaying] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();
  const chosen = COURIERS.find((c) => c.id === courier)!;
  const total = cartSubtotal + chosen.fee;

  if (cart.length === 0 && !done) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="font-bold">Your cart is empty.</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="px-5 py-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-signal-green text-cream-50">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-2xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
          Payment held
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-700">
          YRD-9104 · {naira(total)} is in escrow. The vendor is paid only after you confirm the
          fabric arrived as described.
        </p>
        <button
          type="button"
          onClick={() => router.push("/orders/o-1")}
          className="mt-6 w-full rounded-xl bg-indigo-700 py-3.5 text-sm font-bold text-cream-50"
        >
          Track order
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 pb-8 pt-3">
      <div className="mb-4 flex gap-1">
        {(["delivery", "pay", "review"] as const).map((s) => (
          <span
            key={s}
            className={`h-1 flex-1 rounded-full ${step === s || (step === "review" && s !== "review") || (step === "pay" && s === "delivery") ? "bg-indigo-700" : "bg-line-200"}`}
          />
        ))}
      </div>

      {step === "delivery" && (
        <div className="space-y-3">
          <h2 className="text-lg font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
            Delivery
          </h2>
          <div className="rounded-card bg-cream-100 p-3 ring-1 ring-line-200">
            <p className="text-[11px] font-bold uppercase tracking-wide text-ink-500">Address</p>
            <p className="mt-1 text-[14px] font-bold">Lekki Phase 1, Lagos</p>
            <p className="text-[12px] text-ink-500">Opposite Circle Mall, by the first gate</p>
          </div>
          {COURIERS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCourier(c.id)}
              className={`flex w-full items-center justify-between rounded-card px-3 py-3 text-left ring-1 ${
                courier === c.id ? "bg-indigo-100 ring-indigo-500/40" : "bg-cream-100 ring-line-200"
              }`}
            >
              <span>
                <span className="block text-[13px] font-bold">{c.name}</span>
                <span className="text-[11px] text-ink-500">{c.eta}</span>
              </span>
              <span className="tnum text-[13px] font-extrabold">{c.fee ? naira(c.fee) : "Free"}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setStep("pay")}
            className="w-full rounded-xl bg-indigo-700 py-3.5 text-sm font-bold text-cream-50"
          >
            Continue
          </button>
        </div>
      )}

      {step === "pay" && (
        <div className="space-y-3">
          <h2 className="text-lg font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
            Pay
          </h2>
          {["Card", "Bank transfer", "USSD", "Yardi wallet"].map((m, i) => (
            <button
              key={m}
              type="button"
              onClick={() => setStep("review")}
              className={`flex w-full items-center justify-between rounded-card px-3 py-3 text-left ring-1 ${
                i === 0 ? "bg-indigo-100 ring-indigo-500/40" : "bg-cream-100 ring-line-200"
              }`}
            >
              <span className="text-[13px] font-bold">{m}</span>
              {i === 0 && <span className="text-[11px] font-bold text-indigo-700">Paystack</span>}
            </button>
          ))}
        </div>
      )}

      {step === "review" && (
        <div className="space-y-3">
          <h2 className="text-lg font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
            Review
          </h2>
          {cart.map((line) => {
            const l = listing(line.listingId);
            const v = vendor(l.vendorId);
            return (
              <div key={line.listingId} className="flex justify-between rounded-card bg-cream-100 px-3 py-2.5 ring-1 ring-line-200">
                <div>
                  <p className="text-[13px] font-bold">{l.title}</p>
                  <p className="text-[11px] text-ink-500">
                    {pluralYards(line.yards)} · {v.shopName}
                  </p>
                </div>
                <p className="tnum text-[13px] font-extrabold">
                  {naira(tierPrice(l, line.yards) * line.yards)}
                </p>
              </div>
            );
          })}
          <div className="flex justify-between text-[13px]">
            <span className="text-ink-500">Delivery</span>
            <span className="tnum font-bold">{chosen.fee ? naira(chosen.fee) : "Free"}</span>
          </div>
          <div className="flex justify-between text-[15px] font-extrabold">
            <span>Held in escrow</span>
            <span className="tnum">{naira(total)}</span>
          </div>
          <div className="rounded-card bg-indigo-900 p-3.5 text-[13px] leading-relaxed text-cream-100/85">
            Your {naira(total)} is held by Yardi. The vendor is paid only after you confirm the
            fabric arrived as described. If it doesn&apos;t, you get your money back.
          </div>
          <button
            type="button"
            disabled={paying}
            onClick={() => {
              setPaying(true);
              setTimeout(() => {
                setPaying(false);
                setDone(true);
                clearCart();
                toast({ title: "Payment held in escrow", detail: "YRD-9104", tone: "green" });
              }, 1400);
            }}
            className="w-full rounded-xl bg-clay-500 py-3.5 text-sm font-bold text-cream-50 disabled:opacity-60"
          >
            {paying ? "Talking to Paystack…" : `Hold ${naira(total)} in escrow`}
          </button>
        </div>
      )}
    </div>
  );
}
