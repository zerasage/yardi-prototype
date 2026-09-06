"use client";

import { GradeBadge } from "@/components/ui/grade-badge";

export default function GradingPage() {
  return (
    <div className="space-y-4 px-4 pb-8 pt-3">
      <h1 className="text-2xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
        How we grade
      </h1>
      <p className="text-[14px] leading-relaxed text-ink-700">
        Laboratory-grade thread counting from a phone camera is not realistic, and we will not
        pretend otherwise. The letter is a translation of the trade&apos;s own language.
      </p>

      <div className="grid grid-cols-2 gap-2">
        {(
          [
            ["A", "85+", "What the market calls first grade. Measured, declared, and confirmed."],
            ["B", "70–84", "Honest cloth. Small gaps between claim and measurement."],
            ["C", "55–69", "Usable, priced as such. Fancy print lives here."],
            ["D", "< 55", "Misdeclared, or too many disputes. The badge is a warning."],
          ] as const
        ).map(([letter, band, line]) => (
          <div key={letter} className="rounded-card bg-cream-100 p-3 ring-1 ring-line-200">
            <GradeBadge letter={letter} size="sm" shimmer={false} />
            <p className="mt-2 text-[13px] font-bold">
              Grade {letter} · {band}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-500">{line}</p>
          </div>
        ))}
      </div>

      <section className="rounded-card bg-indigo-900 p-4 text-cream-50">
        <p className="text-[11px] font-bold uppercase tracking-wide text-brass-500">What goes in</p>
        <ul className="mt-2 space-y-1.5 text-[13px] text-cream-100/85">
          <li>35% measured fibre / GSM / weave vs declared</li>
          <li>20% market-tier authentication (selvedge, both faces, crackle)</li>
          <li>25% buyer confirmations after delivery</li>
          <li>15% vendor track record</li>
          <li>5% Yardi spot checks</li>
        </ul>
      </section>
    </div>
  );
}
