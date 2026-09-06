"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ChevronDown, MapPin, Search, Sparkles } from "lucide-react";
import { AdvancedOnly } from "@/components/mode-switch";
import { FabricSwatch } from "@/components/fabric-swatch";
import { ListingCard } from "@/components/ui/listing-card";
import { MarketMarquee } from "@/components/ui/market-marquee";
import { Sheet } from "@/components/ui/sheet";
import { FABRIC_TYPES, LISTINGS, MARKETS, PLATFORM_STATS, REELS } from "@/lib/seed";
import { useApp } from "@/lib/store";
import type { City, FabricTypeId } from "@/lib/types";
import { groupInt, nairaCompact } from "@/lib/utils";

const CITIES: City[] = ["Kano", "Lagos", "Abuja", "Onitsha", "Aba"];

export default function HomePage() {
  const { city, setCity, isAdvanced } = useApp();
  const [cityOpen, setCityOpen] = useState(false);
  const [openType, setOpenType] = useState<FabricTypeId | null>(null);
  const router = useRouter();

  const near = LISTINGS.filter((l) => l.city === city);
  const deals = [...LISTINGS].sort((a, b) => a.pricePerYard - b.pricePerYard).slice(0, 6);
  const gradeA = LISTINGS.filter((l) => l.grade?.letter === "A");
  const wedding = LISTINGS.filter((l) =>
    ["lace", "aso-oke", "george", "shadda"].includes(l.fabricType),
  );

  const heroListing = near[0] ?? LISTINGS[1];
  const heroColour = heroListing.colourways[0];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 overflow-hidden">
        <div className="dye-bloom -left-10 -top-16 h-64 w-64" />
        <div className="dye-bloom dye-bloom-2 -right-16 top-10 h-56 w-56" />
      </div>

      <div className="relative space-y-5 px-4 pb-6 pt-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCityOpen(true)}
            className="flex items-center gap-1 rounded-full bg-cream-100 px-2.5 py-1.5 text-[12px] font-semibold text-ink-900 ring-1 ring-line-200"
          >
            <MapPin className="h-3.5 w-3.5 text-clay-500" />
            {city}
            <ChevronDown className="h-3 w-3 text-ink-500" />
          </button>
          <button
            type="button"
            onClick={() => router.push("/explore")}
            className="flex flex-1 items-center gap-2 rounded-full bg-cream-100 px-3 py-2 text-left text-[13px] text-ink-500 ring-1 ring-line-200"
          >
            <Search className="h-4 w-4" />
            Search fabric, colour, city…
          </button>
        </div>

        <AdvancedOnly index={0} bare>
          <Link
            href="/advisor"
            className="flex items-center gap-3 rounded-card bg-indigo-900 px-3.5 py-3 text-cream-50 shadow-[0_8px_24px_rgba(16,27,71,0.18)]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brass-500 text-indigo-900">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-bold uppercase tracking-wide text-brass-500">
                Ask Yardi
              </span>
              <span className="block truncate text-[13px] text-cream-100/80">
                Wedding in Owerri, 12 people, ₦80,000…
              </span>
            </span>
          </Link>
        </AdvancedOnly>

        <section className="relative overflow-hidden rounded-card bg-indigo-900">
          <FabricSwatch
            seed={heroListing.id}
            fabricType={heroListing.fabricType}
            base={heroColour.hex}
            accent={heroColour.accent}
            className="absolute inset-0 opacity-40"
          />
          <div className="relative space-y-1 px-5 py-8">
            {["EVERY", "YARD", "VERIFIED"].map((word, i) => (
              <motion.p
                key={word}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.09 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[34px] font-extrabold leading-[0.92] tracking-tight text-cream-50"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {word}
              </motion.p>
            ))}
            <p className="pt-3 text-[13px] leading-relaxed text-cream-100/75">
              From Kantin Kwari to your tailor. Buy by the yard, pay into escrow.
            </p>
          </div>
        </section>

        <TrustBand />

        <section>
          <SectionHead title="The cloth" ha="Yadi" />
          <ol className="mt-2 overflow-hidden rounded-card bg-cream-100 ring-1 ring-line-200">
            {FABRIC_TYPES.map((f) => {
              const open = openType === f.id;
              const sample = LISTINGS.find((l) => l.fabricType === f.id) ?? LISTINGS[0];
              const c = sample.colourways[0];
              return (
                <li key={f.id} className="relative border-b border-line-200 last:border-0">
                  {open && (
                    <FabricSwatch
                      seed={sample.id}
                      fabricType={f.id}
                      base={c.hex}
                      accent={c.accent}
                      className="absolute inset-0 opacity-25"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setOpenType(open ? null : f.id)}
                    className="relative flex w-full items-center gap-3 px-3.5 py-3.5 text-left"
                  >
                    <span className="tnum w-7 text-[11px] font-bold text-ink-300">{f.index}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-bold text-ink-900">{f.name}</span>
                      <span className="block text-[11px] text-ink-500">{f.blurb}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-clay-500">{f.nameHa}</span>
                  </button>
                  {open && (
                    <div className="relative flex flex-wrap gap-1.5 px-3.5 pb-3.5">
                      {f.subTypes.map((s) => (
                        <Link
                          key={s}
                          href={`/explore?type=${f.id}&sub=${encodeURIComponent(s)}`}
                          className="rounded-full bg-cream-50/90 px-2.5 py-1 text-[11px] font-semibold text-ink-900 ring-1 ring-line-200"
                        >
                          {s}
                        </Link>
                      ))}
                      <Link
                        href={`/explore?type=${f.id}`}
                        className="rounded-full bg-indigo-700 px-2.5 py-1 text-[11px] font-bold text-cream-50"
                      >
                        See all {f.name}
                      </Link>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      </div>

      <MarketMarquee />

      <div className="space-y-6 px-4 py-6">
        <Link
          href="/bulk"
          className="block overflow-hidden rounded-card bg-clay-500 px-4 py-4 text-cream-50"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cream-50/70">
            Asoebi · bulk
          </p>
          <p className="mt-1 text-lg font-extrabold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            Buying for a crowd?
          </p>
          <p className="mt-1 text-[13px] text-cream-50/85">
            Post it once. Let vendors bid. Your money stays in escrow until the fabric arrives.
          </p>
        </Link>

        <AdvancedOnly index={1} bare>
          <SectionHead title="Moving cloth" ha="Reels" href="/reels" />
          <div className="no-bar mt-2 flex gap-2.5 overflow-x-auto pb-1">
            {REELS.slice(0, 6).map((r) => {
              const l = LISTINGS.find((x) => x.id === r.listingId)!;
              const c = l.colourways[0];
              return (
                <Link
                  key={r.id}
                  href="/reels"
                  className="relative h-44 w-32 shrink-0 overflow-hidden rounded-card"
                >
                  <FabricSwatch
                    seed={r.id}
                    fabricType={l.fabricType}
                    base={c.hex}
                    accent={c.accent}
                    className="absolute inset-0"
                  />
                  {r.isLive && (
                    <span className="absolute left-2 top-2 rounded-full bg-signal-red px-1.5 py-0.5 text-[9px] font-bold uppercase text-cream-50">
                      Live {r.viewers}
                    </span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/80 to-transparent p-2 text-[10.5px] font-semibold leading-snug text-cream-50">
                    {r.hook}
                  </span>
                </Link>
              );
            })}
          </div>
        </AdvancedOnly>

        <Rail
          title={city === "Kano" ? "From Kwari today" : `Near you in ${city}`}
          ha="Kasuwa"
          items={near.length ? near : LISTINGS.slice(0, 6)}
        />

        <section>
          <SectionHead title="Shop by market" ha="Kasuwa" />
          <div className="no-bar mt-2 flex gap-2.5 overflow-x-auto pb-1">
            {MARKETS.map((m) => (
              <Link
                key={m.id}
                href={`/explore?city=${m.city}`}
                className="w-40 shrink-0 rounded-card bg-cream-100 p-3 ring-1 ring-line-200"
              >
                <p className="text-[10px] font-bold uppercase tracking-wide text-clay-500">{m.city}</p>
                <p className="mt-0.5 text-[14px] font-bold text-ink-900">{m.name}</p>
                <p className="mt-1 text-[11px] leading-snug text-ink-500">{m.blurb}</p>
                <p className="mt-2 text-[11px] font-semibold text-indigo-700">{m.vendorCount} vendors</p>
              </Link>
            ))}
          </div>
        </section>

        <Rail title="Under ₦20,000 a yard" ha="Araha" items={deals} />
        <Rail title="Wedding season" ha="Aure" items={wedding} />

        <AdvancedOnly index={2} bare>
          <Rail title="True Yard Grade A" ha="Kwalita" items={gradeA} />
        </AdvancedOnly>

        {isAdvanced && (
          <Link
            href="/studio"
            className="block rounded-card bg-indigo-900 p-4 text-cream-50"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brass-500">
              Designer Studio
            </p>
            <p className="mt-1 text-lg font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
              A print that exists nowhere else
            </p>
            <p className="mt-1 text-[13px] text-cream-100/75">
              Commission a family asoebi, a church anniversary cloth, a brand uniform.
            </p>
          </Link>
        )}
      </div>

      <Sheet open={cityOpen} onClose={() => setCityOpen(false)} title="Where should we look?">
        <ul className="space-y-1.5 pb-4">
          {CITIES.map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => {
                  setCity(c);
                  setCityOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-card px-3 py-3 text-left ring-1 ${
                  city === c ? "bg-indigo-100 ring-indigo-500/30" : "bg-cream-100 ring-line-200"
                }`}
              >
                <span className="font-semibold">{c}</span>
                {city === c && <span className="text-[11px] font-bold text-indigo-700">Looking here</span>}
              </button>
            </li>
          ))}
        </ul>
      </Sheet>
    </div>
  );
}

function SectionHead({ title, ha, href }: { title: string; ha?: string; href?: string }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        {ha && <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-clay-500">{ha}</p>}
        <h2 className="text-[18px] font-extrabold text-ink-900" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </h2>
      </div>
      {href && (
        <Link href={href} className="text-[12px] font-bold text-indigo-700">
          See all
        </Link>
      )}
    </div>
  );
}

function Rail({ title, ha, items }: { title: string; ha?: string; items: typeof LISTINGS }) {
  return (
    <section>
      <SectionHead title={title} ha={ha} href="/explore" />
      <div className="no-bar mt-2 flex gap-2.5 overflow-x-auto pb-1">
        {items.slice(0, 8).map((l) => (
          <div key={l.id} className="w-[148px] shrink-0">
            <ListingCard listing={l} />
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustBand() {
  const stats = useMemo(
    () => [
      { label: "traded", value: nairaCompact(PLATFORM_STATS.tradedKobo) },
      { label: "orders", value: groupInt(PLATFORM_STATS.orders) },
      { label: "vendors", value: String(PLATFORM_STATS.vendors) },
    ],
    [],
  );
  return (
    <div className="grid grid-cols-3 overflow-hidden rounded-card bg-cream-100 ring-1 ring-line-200">
      {stats.map((s) => (
        <div key={s.label} className="px-2 py-3 text-center">
          <p className="tnum text-[15px] font-extrabold text-indigo-700">{s.value}</p>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-500">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
