"use client";

import { DESIGNS } from "@/lib/seed";
import { groupInt, naira } from "@/lib/utils";

export default function StudioPage() {
  return (
    <div className="px-4 pb-8 pt-3">
      <div className="rounded-card bg-indigo-900 p-4 text-cream-50">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brass-500">
          Designer Studio
        </p>
        <h1 className="mt-1 text-xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
          A print that exists nowhere else
        </h1>
        <p className="mt-1 text-[13px] text-cream-100/75">
          Commission a family asoebi, a church anniversary cloth, a brand uniform. Designers earn a royalty on every yard.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {DESIGNS.map((d) => (
          <article key={d.id} className="overflow-hidden rounded-card bg-cream-100 ring-1 ring-line-200">
            <div className="flex h-28">
              {d.palette.map((hex) => (
                <span key={hex} className="flex-1" style={{ background: hex }} />
              ))}
            </div>
            <div className="p-2.5">
              <p className="text-[13px] font-bold">{d.title}</p>
              <p className="text-[11px] text-ink-500">
                {d.designer} · {d.designerCity}
              </p>
              <p className="tnum mt-1 text-[11px] font-semibold text-indigo-700">
                {naira(d.royaltyPerYard)} royalty /yd · {groupInt(d.yardsPrinted)} printed
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {d.motifTags.map((t) => (
                  <span key={t} className="rounded-full bg-indigo-100 px-1.5 py-0.5 text-[9px] font-bold text-indigo-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
