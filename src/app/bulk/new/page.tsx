"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FABRIC_TYPES } from "@/lib/seed";
import { useApp } from "@/lib/store";
import type { FabricTypeId } from "@/lib/types";
import { naira } from "@/lib/utils";

const OUTFITS = [
  { id: "gown", label: "Long gown", yards: 5 },
  { id: "iro", label: "Iro & buba", yards: 5 },
  { id: "agbada", label: "Agbada / riga", yards: 9 },
  { id: "senator", label: "Senator", yards: 4.5 },
];

export default function NewBulkPage() {
  const router = useRouter();
  const { toast } = useApp();
  const [type, setType] = useState<FabricTypeId>("lace");
  const [colour, setColour] = useState("Wine");
  const [people, setPeople] = useState(38);
  const [outfit, setOutfit] = useState("gown");
  const [gele, setGele] = useState(true);
  const [budget, setBudget] = useState(45000);

  const per = (OUTFITS.find((o) => o.id === outfit)?.yards ?? 5) + (gele ? 2 : 0);
  const yards = useMemo(() => Math.ceil(people * per * 1.15), [people, per]);

  return (
    <div className="space-y-4 px-4 pb-8 pt-3">
      <h1 className="text-xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
        New bulk request
      </h1>

      <label className="block text-[11px] font-bold uppercase tracking-wide text-ink-500">
        Fabric
        <select
          value={type}
          onChange={(e) => setType(e.target.value as FabricTypeId)}
          className="mt-1 h-11 w-full rounded-xl bg-cream-100 px-3 text-[14px] font-semibold ring-1 ring-line-200"
        >
          {FABRIC_TYPES.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-[11px] font-bold uppercase tracking-wide text-ink-500">
        Colour
        <input
          value={colour}
          onChange={(e) => setColour(e.target.value)}
          className="mt-1 h-11 w-full rounded-xl bg-cream-100 px-3 text-[14px] font-semibold ring-1 ring-line-200"
        />
      </label>

      <div className="grid grid-cols-2 gap-2">
        <label className="text-[11px] font-bold uppercase tracking-wide text-ink-500">
          People
          <input
            type="number"
            value={people}
            onChange={(e) => setPeople(+e.target.value)}
            className="mt-1 h-11 w-full rounded-xl bg-cream-100 px-3 text-[14px] font-semibold ring-1 ring-line-200"
          />
        </label>
        <label className="text-[11px] font-bold uppercase tracking-wide text-ink-500">
          Outfit
          <select
            value={outfit}
            onChange={(e) => setOutfit(e.target.value)}
            className="mt-1 h-11 w-full rounded-xl bg-cream-100 px-3 text-[14px] font-semibold ring-1 ring-line-200"
          >
            {OUTFITS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex items-center gap-2 text-[13px] font-semibold">
        <input type="checkbox" checked={gele} onChange={(e) => setGele(e.target.checked)} />
        Include gele (adds 2 yards each)
      </label>

      <div className="rounded-card bg-indigo-900 p-3.5 text-cream-50">
        <p className="text-[11px] font-bold uppercase tracking-wide text-brass-500">Yardage</p>
        <p className="tnum mt-1 text-2xl font-extrabold">{yards} yards</p>
        <p className="mt-1 text-[12px] text-cream-100/70">
          {people} × {per} yards + 15% buffer for the tailor.
        </p>
      </div>

      <label className="block text-[11px] font-bold uppercase tracking-wide text-ink-500">
        Max ₦ / yard · {naira(budget * 100)}
        <input
          type="range"
          min={8000}
          max={200000}
          step={500}
          value={budget}
          onChange={(e) => setBudget(+e.target.value)}
          className="mt-2 w-full accent-clay-500"
        />
      </label>

      <p className="text-[13px] text-ink-700">
        Estimated total{" "}
        <strong className="tnum">{naira(yards * budget * 100)}</strong>
      </p>

      <button
        type="button"
        onClick={() => {
          toast({ title: "Request posted", detail: "Vendors in Lagos lace will see this", tone: "green" });
          router.push("/bulk/b-1");
        }}
        className="w-full rounded-xl bg-clay-500 py-3.5 text-sm font-bold text-cream-50"
      >
        Post request
      </button>
    </div>
  );
}
