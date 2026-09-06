"use client";

import { motion } from "motion/react";
import { Sheet } from "@/components/ui/sheet";
import { GradeBadge } from "@/components/ui/grade-badge";
import type { Grade, QualityRecord } from "@/lib/types";
import { shortDate } from "@/lib/utils";

export function SpecSheet({
  open,
  onClose,
  grade,
  quality,
  onHow,
}: {
  open: boolean;
  onClose: () => void;
  grade?: Grade;
  quality?: QualityRecord;
  onHow?: () => void;
}) {
  const rows = quality
    ? [
        ["Fibre", quality.fibre],
        ["Weight", `${quality.gsm} GSM`],
        ["Weave density", `~ ${quality.weaveTpi} threads/inch (${quality.tpiConfidence} confidence)`],
        ["Colourfastness", quality.colourfastness],
        ["Market tier", quality.marketTier],
        ["Selvedge", quality.selvedgeVerified ? "Stamped ✓" : "Not verified"],
        ["Both faces", quality.bothFacesIdentical ? "Identical print ✓" : "Single-face print"],
      ]
    : [];

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="True Yard Grade"
      subtitle={grade ? `Verified ${shortDate(grade.verifiedAt)} · re-check due` : "Grade pending"}
    >
      <div className="flex items-center gap-3 pb-4">
        <GradeBadge letter={grade?.letter} status={grade?.status ?? "pending"} size="lg" />
        <div>
          <p className="text-xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
            {grade ? `Grade ${grade.letter}` : "Grade pending"}
          </p>
          {grade && <p className="tnum text-xs text-ink-500">Score {grade.score} / 100</p>}
        </div>
      </div>

      <ul className="divide-y divide-line-200 overflow-hidden rounded-card bg-cream-100 ring-1 ring-line-200">
        {rows.map(([k, v], i) => (
          <motion.li
            key={k}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 * i }}
            className="flex items-start justify-between gap-3 px-3 py-2.5"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-500">{k}</span>
            <span className="max-w-[60%] text-right text-[12.5px] font-medium leading-snug text-ink-900">{v}</span>
          </motion.li>
        ))}
      </ul>

      {quality && (
        <div className="mt-4 space-y-1.5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-ink-500">How was this checked?</p>
          {[
            "Vendor declaration",
            `Camera measurement (macro + reference)`,
            `Yardi spot check (${quality.spotChecks} of last 12 orders)`,
            `${quality.buyerConfirmations} buyer confirmations after delivery`,
          ].map((line) => (
            <p key={line} className="text-[12.5px] text-ink-700">
              ▸ {line}
            </p>
          ))}
        </div>
      )}

      <p className="mt-4 text-[11.5px] leading-relaxed text-ink-500">
        We do not pretend a phone camera is a laboratory. The letter is estimated from
        measurement, declaration, spot checks and buyer confirmations together.
      </p>

      {onHow && (
        <button
          type="button"
          onClick={onHow}
          className="mt-3 mb-2 w-full rounded-xl bg-indigo-700 py-3 text-sm font-bold text-cream-50"
        >
          What does Grade {grade?.letter ?? "A"} mean?
        </button>
      )}
    </Sheet>
  );
}
