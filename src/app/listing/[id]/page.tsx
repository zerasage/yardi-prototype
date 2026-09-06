"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircle, Play, ShieldCheck, Star } from "lucide-react";
import { AdvancedOnly } from "@/components/mode-switch";
import { FabricSwatch, ColourChip } from "@/components/fabric-swatch";
import { GradeBadge } from "@/components/ui/grade-badge";
import { ListingCard } from "@/components/ui/listing-card";
import { SpecSheet } from "@/components/ui/spec-sheet";
import { YardStepper } from "@/components/ui/yard-stepper";
import { fabricType, listing as getListing, LISTINGS, marketOf, reviewsFor, tierPrice, vendor } from "@/lib/seed";
import { useApp } from "@/lib/store";
import { naira, pluralYards } from "@/lib/utils";

export default function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const l = getListing(id);
  const v = vendor(l.vendorId);
  const m = marketOf(v.market);
  const ft = fabricType(l.fabricType);
  const reviews = reviewsFor(l.id);
  const { addToCart, toast, isAdvanced } = useApp();
  const router = useRouter();

  const [colourIdx, setColourIdx] = useState(0);
  const [yardsQty, setYards] = useState(Math.max(l.minOrderYards, 6));
  const [cut, setCut] = useState<"continuous" | "separate">(l.cutOptions[0]);
  const [specOpen, setSpecOpen] = useState(false);
  const colour = l.colourways[colourIdx] ?? l.colourways[0];
  const price = tierPrice(l, yardsQty);
  const similar = LISTINGS.filter((x) => x.fabricType === l.fabricType && x.id !== l.id).slice(0, 4);

  const add = () => {
    addToCart({ listingId: l.id, colourway: colour.name, yards: yardsQty, cutType: cut });
    toast({
      title: `Added ${pluralYards(yardsQty)}`,
      detail: `${l.title} · ${naira(price * yardsQty)}`,
      tone: "clay",
    });
  };

  return (
    <div className="pb-28">
      <div className="relative aspect-[4/5] bg-cream-200">
        <FabricSwatch
          seed={`${l.id}-${colour.name}`}
          fabricType={l.fabricType}
          base={colour.hex}
          accent={colour.accent}
          className="absolute inset-0"
        />
        {l.hasDrapeVideo && (
          <AdvancedOnly index={0} bare>
            <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-indigo-900/80 px-2.5 py-1.5 text-[11px] font-bold text-brass-500">
              <Play className="h-3 w-3 fill-brass-500" />
              Drape video
            </span>
          </AdvancedOnly>
        )}
      </div>

      <div className="space-y-4 px-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wide text-clay-500">
              {ft.name} · {l.subType}
            </p>
            <h1 className="mt-0.5 text-[22px] font-extrabold leading-tight text-ink-900" style={{ fontFamily: "var(--font-display)" }}>
              {l.title}
            </h1>
          </div>
          {isAdvanced && (
            <GradeBadge
              letter={l.grade?.letter}
              status={l.grade?.status ?? "pending"}
              size="lg"
              onClick={() => setSpecOpen(true)}
            />
          )}
        </div>

        <p className="tnum text-[26px] font-extrabold leading-none text-ink-900">
          {naira(price)}
          <span className="ml-1 text-[13px] font-semibold text-ink-500">/yd</span>
        </p>

        <div className="overflow-hidden rounded-card bg-cream-100 ring-1 ring-line-200">
          <table className="w-full text-[12px]">
            <thead className="text-[10px] uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-3 py-2 text-left font-semibold">Yards</th>
                <th className="px-3 py-2 text-right font-semibold">Price /yd</th>
                <th className="px-3 py-2 text-right font-semibold">You save</th>
              </tr>
            </thead>
            <tbody>
              {l.tiers.map((t) => {
                const active = yardsQty >= t.minYards && (t.maxYards === null || yardsQty <= t.maxYards);
                const save = l.pricePerYard - t.pricePerYard;
                return (
                  <tr key={t.minYards} className={active ? "bg-brass-100/70 font-bold" : ""}>
                    <td className="px-3 py-1.5">
                      {t.minYards}
                      {t.maxYards ? `–${t.maxYards}` : "+"}
                    </td>
                    <td className="tnum px-3 py-1.5 text-right">{naira(t.pricePerYard)}</td>
                    <td className="tnum px-3 py-1.5 text-right text-signal-green">
                      {save > 0 ? naira(save) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <YardStepper listing={l} value={yardsQty} onChange={setYards} />

        <AdvancedOnly index={1} bare>
          <Link
            href="/advisor"
            className="block rounded-card bg-indigo-100 px-3 py-2.5 text-[13px] font-semibold text-indigo-700"
          >
            How many yards do I need?
          </Link>
        </AdvancedOnly>

        <div>
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-500">Colourway</p>
          <div className="flex gap-2">
            {l.colourways.map((c, i) => (
              <ColourChip
                key={c.name}
                hex={c.hex}
                accent={c.accent}
                label={c.name}
                selected={i === colourIdx}
                onClick={() => setColourIdx(i)}
              />
            ))}
            <span className="self-center text-[12px] font-semibold text-ink-700">{colour.name}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {l.cutOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setCut(opt)}
              className={`flex-1 rounded-xl py-2.5 text-[12px] font-bold capitalize ${
                cut === opt ? "bg-indigo-700 text-cream-50" : "bg-cream-100 text-ink-700 ring-1 ring-line-200"
              }`}
            >
              {opt} cut
            </button>
          ))}
        </div>

        <p className="text-[12px] text-ink-500">
          {l.stockYards} yards available · {l.widthIn}" wide · min {pluralYards(l.minOrderYards)}
        </p>

        <p className="text-[13.5px] leading-relaxed text-ink-700">{l.description}</p>

        <Link
          href={`/vendor/${v.id}`}
          className="flex items-center gap-3 rounded-card bg-cream-100 p-3 ring-1 ring-line-200"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-700 text-sm font-bold text-cream-50">
            {v.ownerName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1 text-[13px] font-bold">
              {v.shopName}
              <ShieldCheck className="h-3.5 w-3.5 text-signal-green" />
            </p>
            <p className="text-[11px] text-ink-500">
              {m.name}, {v.stallNo} · {v.rating} ★ · replies in {v.responseMins} min
            </p>
          </div>
        </Link>

        <div className="rounded-card bg-indigo-900 p-3.5 text-cream-50">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-brass-500">
            <ShieldCheck className="h-3.5 w-3.5" />
            Escrow
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-cream-100/85">
            Your {naira(price * yardsQty)} is held by Yardi. {v.ownerName.split(" ")[0]} is paid only
            after you confirm the fabric arrived as described.
          </p>
        </div>

        {reviews.length > 0 && (
          <section>
            <p className="mb-2 flex items-center gap-1 text-[14px] font-bold">
              <Star className="h-4 w-4 fill-brass-500 text-brass-500" />
              {v.rating} · {reviews.length} reviews
            </p>
            <div className="space-y-2">
              {reviews.slice(0, 2).map((r) => (
                <div key={r.id} className="rounded-card bg-cream-100 p-3 ring-1 ring-line-200">
                  <p className="text-[12px] font-bold">
                    {r.buyer} · {pluralYards(r.yardsBought)}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-700">{r.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {similar.length > 0 && (
          <section>
            <p className="mb-2 text-[14px] font-bold">Similar fabrics</p>
            <div className="grid grid-cols-2 gap-2.5">
              {similar.map((s) => (
                <ListingCard key={s.id} listing={s} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="sticky bottom-0 z-30 border-t border-line-200 bg-cream-50/95 px-3 py-2.5 backdrop-blur-md">
        <div className="flex gap-2">
          <Link
            href={`/chat/${v.id}`}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream-100 text-indigo-700 ring-1 ring-line-200"
          >
            <MessageCircle className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={add}
            className="flex-1 rounded-xl bg-cream-100 text-[13px] font-bold text-ink-900 ring-1 ring-line-200"
          >
            Add {yardsQty} yards
          </button>
          <button
            type="button"
            onClick={() => {
              add();
              router.push("/checkout");
            }}
            className="flex-1 rounded-xl bg-clay-500 text-[13px] font-bold text-cream-50"
          >
            Buy now
          </button>
        </div>
        <button
          type="button"
          onClick={() =>
            toast({
              title: "Swatch requested",
              detail: "₦1,500 · credited back if you buy within 30 days",
              tone: "brass",
            })
          }
          className="mt-2 w-full text-center text-[11px] font-semibold text-indigo-700"
        >
          Request a 6-inch swatch · ₦1,500, credited on purchase
        </button>
      </div>

      <SpecSheet
        open={specOpen}
        onClose={() => setSpecOpen(false)}
        grade={l.grade}
        quality={l.quality}
        onHow={() => {
          setSpecOpen(false);
          router.push("/grading");
        }}
      />
    </div>
  );
}
