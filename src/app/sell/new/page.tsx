"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FABRIC_TYPES } from "@/lib/seed";
import { useApp } from "@/lib/store";

export default function NewListingPage() {
  const router = useRouter();
  const { isAdvanced, toast } = useApp();
  const [title, setTitle] = useState("Wax hollandais, six-yard bundle");

  return (
    <div className="space-y-3 px-4 pb-8 pt-3">
      <label className="block text-[11px] font-bold uppercase tracking-wide text-ink-500">
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 h-11 w-full rounded-xl bg-cream-100 px-3 text-[14px] font-semibold ring-1 ring-line-200"
        />
      </label>
      <label className="block text-[11px] font-bold uppercase tracking-wide text-ink-500">
        Fabric type
        <select className="mt-1 h-11 w-full rounded-xl bg-cream-100 px-3 text-[14px] font-semibold ring-1 ring-line-200">
          {FABRIC_TYPES.map((f) => (
            <option key={f.id}>{f.name}</option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-2">
        <Field label="₦ / yard" defaultValue="18500" />
        <Field label="Stock (yards)" defaultValue="48" />
        <Field label="6+ yards" defaultValue="17200" />
        <Field label="12+ yards" defaultValue="15900" />
      </div>
      <p className="rounded-card bg-clay-100 px-3 py-2 text-[12px] text-clay-700">
        Add a scale shot — fabric against a hand or a ruler. Listings without one stay in draft.
      </p>
      <button
        type="button"
        onClick={() => {
          if (isAdvanced) {
            router.push("/sell/quality");
            return;
          }
          toast({ title: "Listing submitted", detail: "Live after moderation", tone: "green" });
          router.push("/sell");
        }}
        className="w-full rounded-xl bg-indigo-700 py-3.5 text-sm font-bold text-cream-50"
      >
        {isAdvanced ? "Get this fabric graded" : "Submit listing"}
      </button>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="text-[11px] font-bold uppercase tracking-wide text-ink-500">
      {label}
      <input
        defaultValue={defaultValue}
        className="mt-1 h-11 w-full rounded-xl bg-cream-100 px-3 text-[14px] font-semibold ring-1 ring-line-200"
      />
    </label>
  );
}
