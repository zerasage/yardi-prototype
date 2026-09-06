"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { motion } from "motion/react";
import type { Listing } from "@/lib/types";
import { nextTier, tierPrice } from "@/lib/seed";
import { cn, naira, yards } from "@/lib/utils";

export function YardStepper({
  listing,
  value,
  onChange,
  compact = false,
}: {
  listing: Listing;
  value: number;
  onChange: (n: number) => void;
  compact?: boolean;
}) {
  const min = listing.minOrderYards;
  const max = listing.stockYards;
  const price = tierPrice(listing, value);
  const upcoming = nextTier(listing, value);
  const [flash, setFlash] = useState(false);
  const prevTier = useRef(price);

  useEffect(() => {
    if (prevTier.current !== price) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 900);
      prevTier.current = price;
      return () => clearTimeout(t);
    }
  }, [price]);

  const bump = (delta: number) => {
    const next = Math.min(max, Math.max(min, +(value + delta).toFixed(1)));
    onChange(next);
  };

  return (
    <div className={cn("space-y-2", compact && "space-y-1")}>
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full bg-cream-100 ring-1 ring-line-200">
          <button
            type="button"
            aria-label="Fewer yards"
            onClick={() => bump(-1)}
            disabled={value <= min}
            className="flex h-11 w-11 items-center justify-center text-ink-900 transition-transform active:scale-94 disabled:text-ink-300"
          >
            <Minus className="h-4 w-4" />
          </button>
          <div className="min-w-14 text-center">
            <p className="tnum text-lg font-extrabold leading-none text-ink-900">{yards(value)}</p>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-ink-500">yards</p>
          </div>
          <button
            type="button"
            aria-label="More yards"
            onClick={() => bump(1)}
            disabled={value >= max}
            className="flex h-11 w-11 items-center justify-center text-ink-900 transition-transform active:scale-94 disabled:text-ink-300"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="min-w-0">
          <motion.p
            key={price}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={cn(
              "tnum text-lg font-extrabold leading-none",
              flash ? "text-brass-700" : "text-ink-900",
            )}
          >
            {naira(price * value)}
          </motion.p>
          <p className="mt-0.5 text-[11px] text-ink-500">
            <span className="tnum">{naira(price)}</span> /yd
          </p>
        </div>
      </div>
      {upcoming && !compact && (
        <p className="text-[11px] text-clay-500">
          Add {upcoming.minYards - value} more {upcoming.minYards - value === 1 ? "yard" : "yards"} to
          save {naira(price - upcoming.pricePerYard)}/yd
        </p>
      )}
    </div>
  );
}
