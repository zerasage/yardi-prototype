"use client";

import { DagiTick } from "@/components/dagi";
import { MARKETS } from "@/lib/seed";

export function MarketMarquee() {
  const names = [...MARKETS, ...MARKETS];
  return (
    <div className="marquee overflow-hidden bg-indigo-700 py-2.5">
      <div className="marquee-track flex w-max items-center gap-4">
        {names.map((m, i) => (
          <span key={`${m.id}-${i}`} className="flex items-center gap-4">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-cream-50">
              {m.name}
            </span>
            <DagiTick className="text-brass-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
