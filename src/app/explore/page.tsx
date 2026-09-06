"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { ListingCard } from "@/components/ui/listing-card";
import { Sheet } from "@/components/ui/sheet";
import { FABRIC_TYPES, LISTINGS } from "@/lib/seed";
import { useApp } from "@/lib/store";
import type { City, FabricTypeId, GradeLetter } from "@/lib/types";
import { naira } from "@/lib/utils";

const COLOURS = [
  { name: "Wine", hex: "#6E1B2E" },
  { name: "Royal blue", hex: "#1B3A8C" },
  { name: "Indigo", hex: "#1B2A6B" },
  { name: "Emerald", hex: "#0F5C43" },
  { name: "Gold", hex: "#B8862B" },
  { name: "Coral", hex: "#C4462D" },
  { name: "Cream", hex: "#E8DCC3" },
  { name: "Fuchsia", hex: "#8E2A62" },
];

const CITIES: City[] = ["Kano", "Lagos", "Abuja", "Onitsha", "Aba"];
const GRADES: GradeLetter[] = ["A", "B", "C", "D"];

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-ink-500">Searching the line…</div>}>
      <ExploreInner />
    </Suspense>
  );
}

function ExploreInner() {
  const params = useSearchParams();
  const { isAdvanced, city: userCity } = useApp();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [type, setType] = useState<FabricTypeId | "">(
    (params.get("type") as FabricTypeId) ?? "",
  );
  const [colour, setColour] = useState("");
  const [maxPrice, setMaxPrice] = useState(400000);
  const [city, setCity] = useState<City | "">((params.get("city") as City) ?? "");
  const [grade, setGrade] = useState<GradeLetter | "">("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const parsed = useMemo(() => parseQuery(q), [q]);

  const results = useMemo(() => {
    const typeFilter = type || parsed.type;
    const colourFilter = colour || parsed.colour;
    const cityFilter = city || parsed.city;
    const priceFilter = parsed.maxPrice ? Math.min(maxPrice, parsed.maxPrice) : maxPrice;

    return LISTINGS.filter((l) => {
      if (typeFilter && l.fabricType !== typeFilter) return false;
      if (colourFilter && !l.colourways.some((c) => c.name.toLowerCase().includes(colourFilter)))
        return false;
      if (cityFilter && l.city !== cityFilter) return false;
      if (l.pricePerYard > priceFilter * 100) return false;
      if (isAdvanced && grade && l.grade?.letter !== grade) return false;
      if (q && !parsed.type && !parsed.colour && !parsed.city) {
        const hay = `${l.title} ${l.subType} ${l.description}`.toLowerCase();
        if (!q.toLowerCase().split(" ").every((w) => hay.includes(w) || w.length < 3)) return false;
      }
      return true;
    });
  }, [type, colour, city, maxPrice, grade, q, parsed, isAdvanced]);

  const activeCount = [type, colour, city, grade, maxPrice < 400000 ? 1 : 0].filter(Boolean).length;

  return (
    <div className="px-4 pb-8 pt-3">
      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="red French lace under ₦20,000 in Abuja"
          className="h-11 flex-1 rounded-full bg-cream-100 px-4 text-[13px] outline-none ring-1 ring-line-200 placeholder:text-ink-300 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-indigo-700 text-cream-50"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {activeCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay-500 text-[9px] font-bold">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {q && (
        <p className="mt-2 text-[12px] text-ink-500">
          {results.length} result{results.length === 1 ? "" : "s"}
          {parsed.colour || parsed.type || parsed.city || parsed.maxPrice
            ? ` · understood: ${[parsed.colour, parsed.type, parsed.city, parsed.maxPrice ? `under ${naira(parsed.maxPrice * 100)}` : ""]
                .filter(Boolean)
                .join(", ")}`
            : null}
        </p>
      )}

      <div className="no-bar mt-3 flex gap-1.5 overflow-x-auto pb-1">
        <Chip active={!type} onClick={() => setType("")}>
          All
        </Chip>
        {FABRIC_TYPES.map((f) => (
          <Chip key={f.id} active={type === f.id} onClick={() => setType(f.id)}>
            {f.name}
          </Chip>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {results.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="mt-10 px-4 text-center">
          <p className="text-[15px] font-bold text-ink-900">
            Nothing matching that yet.
          </p>
          <p className="mt-1 text-[13px] text-ink-500">
            Try {userCity}, or post it as a bulk request and let vendors bid.
          </p>
        </div>
      )}

      <Sheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filters"
        footer={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setType("");
                setColour("");
                setCity("");
                setGrade("");
                setMaxPrice(400000);
              }}
              className="flex-1 rounded-xl bg-cream-100 py-3 text-sm font-bold"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="flex-1 rounded-xl bg-indigo-700 py-3 text-sm font-bold text-cream-50"
            >
              Show {results.length}
            </button>
          </div>
        }
      >
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-ink-500">Colour</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {COLOURS.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setColour(colour === c.name.toLowerCase() ? "" : c.name.toLowerCase())}
              className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-[12px] font-semibold ring-1 ${
                colour === c.name.toLowerCase()
                  ? "bg-indigo-100 ring-indigo-500"
                  : "bg-cream-100 ring-line-200"
              }`}
            >
              <span className="h-3.5 w-3.5 rounded-full" style={{ background: c.hex }} />
              {c.name}
            </button>
          ))}
        </div>

        <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-ink-500">
          Max price / yard · {naira(maxPrice * 100)}
        </p>
        <input
          type="range"
          min={5000}
          max={400000}
          step={1000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
          className="mb-4 w-full accent-clay-500"
        />

        <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-ink-500">City</p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {CITIES.map((c) => (
            <Chip key={c} active={city === c} onClick={() => setCity(city === c ? "" : c)}>
              {c}
            </Chip>
          ))}
        </div>

        {isAdvanced && (
          <>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-brass-700">
              True Yard Grade
            </p>
            <div className="mb-4 flex gap-1.5">
              {GRADES.map((g) => (
                <Chip key={g} active={grade === g} onClick={() => setGrade(grade === g ? "" : g)}>
                  Grade {g}
                </Chip>
              ))}
            </div>
          </>
        )}
      </Sheet>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold ${
        active ? "bg-indigo-700 text-cream-50" : "bg-cream-100 text-ink-700 ring-1 ring-line-200"
      }`}
    >
      {children}
    </button>
  );
}

function parseQuery(raw: string) {
  const q = raw.toLowerCase();
  const colour = COLOURS.find((c) => q.includes(c.name.toLowerCase()))?.name.toLowerCase();
  const type = FABRIC_TYPES.find(
    (f) => q.includes(f.name.toLowerCase()) || q.includes(f.nameHa.toLowerCase()),
  )?.id;
  const city = CITIES.find((c) => q.includes(c.toLowerCase()));
  const priceMatch = q.match(/under\s*₦?\s*([\d,]+)/) ?? q.match(/₦\s*([\d,]+)/);
  const maxPrice = priceMatch ? Number(priceMatch[1].replace(/,/g, "")) : undefined;
  return { colour, type, city, maxPrice };
}
