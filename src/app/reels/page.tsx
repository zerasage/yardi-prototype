"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Home, MessageCircle, Plus, Share2 } from "lucide-react";
import { ModeSwitch } from "@/components/mode-switch";
import { FabricSwatch } from "@/components/fabric-swatch";
import { GradeBadge } from "@/components/ui/grade-badge";
import { SpecSheet } from "@/components/ui/spec-sheet";
import { listing, REELS, vendor } from "@/lib/seed";
import { useApp } from "@/lib/store";
import { groupInt, naira, pluralYards } from "@/lib/utils";

export default function ReelsPage() {
  const { addToCart, toast, isAdvanced } = useApp();
  const [specFor, setSpecFor] = useState<string | null>(null);
  const specListing = specFor ? listing(specFor) : null;
  const router = useRouter();

  useEffect(() => {
    if (!isAdvanced) router.replace("/");
  }, [isAdvanced, router]);

  return (
    <div className="relative h-full min-h-full">
      <div className="absolute inset-x-3 top-4 z-20 flex items-center justify-between">
        <ModeSwitch compact />
        <Link
          href="/"
          aria-label="Back to home"
          className="flex h-10 items-center gap-1.5 rounded-full bg-ink-900/70 px-3 text-cream-50 ring-1 ring-white/25 backdrop-blur-md"
        >
          <Home className="h-4 w-4" />
          <span className="text-[12px] font-bold">Home</span>
        </Link>
      </div>
      <div className="snap-reels no-bar h-full overflow-y-auto">
        {REELS.map((r) => {
          const l = listing(r.listingId);
          const v = vendor(r.vendorId);
          const c = l.colourways[0];
          return (
            <article key={r.id} className="snap-reel-item relative h-full w-full">
              <FabricSwatch
                seed={r.id}
                fabricType={l.fabricType}
                base={c.hex}
                accent={c.accent}
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-ink-900/25" />

              {r.isLive && (
                <span className="absolute left-3 top-16 rounded-full bg-signal-red px-2 py-0.5 text-[10px] font-bold uppercase text-cream-50">
                  Live · {r.viewers}
                </span>
              )}

              <div className="absolute bottom-5 left-4 right-16 text-cream-50">
                <p className="text-[13px] font-bold">@{v.shopName}</p>
                <p className="mt-1 text-[15px] font-extrabold leading-snug">{r.hook}</p>
                <p className="mt-1 text-[12px] text-cream-100/80">{r.caption}</p>
                <div className="mt-2 flex items-center gap-2">
                  <p className="tnum text-[18px] font-extrabold">
                    {naira(l.pricePerYard)} <span className="text-[11px] font-semibold">/yd</span>
                  </p>
                  <GradeBadge
                    letter={l.grade?.letter}
                    status={l.grade?.status ?? "pending"}
                    size="sm"
                    onClick={() => setSpecFor(l.id)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addToCart({
                      listingId: l.id,
                      colourway: c.name,
                      yards: Math.max(l.minOrderYards, 6),
                      cutType: "continuous",
                    });
                    toast({
                      title: `Added ${pluralYards(Math.max(l.minOrderYards, 6))}`,
                      detail: l.title,
                      tone: "brass",
                    });
                  }}
                  className="mt-3 rounded-full bg-brass-500 px-4 py-2 text-[12px] font-extrabold text-indigo-900"
                >
                  Add 6 yards
                </button>
              </div>

              <div className="absolute bottom-5 right-3 flex flex-col items-center gap-4 text-cream-50">
                <Action icon={Heart} n={r.likes} />
                <Action icon={MessageCircle} n={Math.round(r.likes / 18)} />
                <Action icon={Share2} n={Math.round(r.likes / 40)} />
                <Action icon={Plus} n="Save" />
              </div>
            </article>
          );
        })}
      </div>

      <SpecSheet
        open={!!specListing}
        onClose={() => setSpecFor(null)}
        grade={specListing?.grade}
        quality={specListing?.quality}
      />
    </div>
  );
}

function Action({ icon: Icon, n }: { icon: typeof Heart; n: number | string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-[10px] font-bold">{typeof n === "number" ? groupInt(n) : n}</span>
    </div>
  );
}
