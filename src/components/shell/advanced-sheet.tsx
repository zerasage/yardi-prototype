"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Hexagon, MessageSquareText, Palette, PlayCircle, ScanLine } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";
import { useApp } from "@/lib/store";
import { cn, naira } from "@/lib/utils";

/**
 * "What Advanced adds" — PRD §3.4. The sales weapon.
 * Five rows, one per Seed, each deep-linking into the live prototype.
 *
 * Long-press the header to reveal Proposal view, which overlays each row with
 * its phase number and fixed price from the proposal. Demo-only.
 */

const SEEDS = [
  {
    seed: 5,
    phase: "Phase 2",
    price: 5_000_000,
    icon: PlayCircle,
    title: "Fabric Reels",
    line: "Fabric sells on movement. Scroll it, tap it, buy it.",
    href: "/reels",
  },
  {
    seed: 2,
    phase: "Phase 3",
    price: 4_500_000,
    icon: Hexagon,
    title: "True Yard Grade",
    line: "Every listing graded A–D, with the spec behind the letter.",
    href: "/listing/l-010",
  },
  {
    seed: 1,
    phase: "Phase 3",
    price: 0,
    icon: ScanLine,
    title: "Verified measurement",
    line: "GSM, weave, fibre — captured by the vendor, checked by us.",
    href: "/sell/quality",
  },
  {
    seed: 3,
    phase: "Phase 4",
    price: 4_000_000,
    icon: MessageSquareText,
    title: "Ask Yardi",
    line: "\"Wedding in Owerri, 12 people, ₦80,000.\" It builds the basket.",
    href: "/advisor",
  },
  {
    seed: 4,
    phase: "Phase 5",
    price: 3_000_000,
    icon: Palette,
    title: "Designer Studio",
    line: "Commission a print that exists nowhere else.",
    href: "/studio",
  },
];

export function AdvancedSheet() {
  const [open, setOpen] = useState(false);
  const [proposalView, setProposalView] = useState(false);
  const { isAdvanced, seenAdvancedSheet, markAdvancedSheetSeen } = useApp();
  const router = useRouter();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("yardi:open-advanced-sheet", handler);
    return () => window.removeEventListener("yardi:open-advanced-sheet", handler);
  }, []);

  // MS-7: first switch to Advanced in a session shows the coach sheet once.
  useEffect(() => {
    if (isAdvanced && !seenAdvancedSheet) {
      const t = setTimeout(() => {
        setOpen(true);
        markAdvancedSheetSeen();
      }, 750);
      return () => clearTimeout(t);
    }
  }, [isAdvanced, seenAdvancedSheet, markAdvancedSheetSeen]);

  const total = SEEDS.reduce((s, x) => s + x.price, 0);

  return (
    <Sheet
      open={open}
      onClose={() => setOpen(false)}
      tone="indigo"
      title="What Advanced adds"
      subtitle="Everything in Basic stays exactly where it is. These sit on top."
    >
      <div
        className="-mt-1 mb-3 select-none"
        onContextMenu={(e) => {
          e.preventDefault();
          setProposalView((v) => !v);
        }}
        onDoubleClick={() => setProposalView((v) => !v)}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brass-500/60 to-transparent" />
      </div>

      <ul className="space-y-2 pb-2">
        {SEEDS.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06 * i, duration: 0.3 }}
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                router.push(s.href);
              }}
              className="flex w-full items-center gap-3 rounded-card bg-white/5 p-3 text-left ring-1 ring-white/10 transition-colors hover:bg-white/10"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brass-500/15 text-brass-500">
                <s.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="text-sm font-bold text-cream-50">{s.title}</span>
                  <span className="rounded-full bg-white/10 px-1.5 py-px text-[9px] font-bold uppercase tracking-wide text-cream-100/60">
                    Seed {s.seed}
                  </span>
                </span>
                <span className="mt-0.5 block text-[11.5px] leading-snug text-cream-100/70">
                  {s.line}
                </span>
                {proposalView && (
                  <span className="mt-1.5 flex items-center gap-2 text-[10px] font-bold text-brass-500">
                    <span>{s.phase}</span>
                    <span className="tnum">
                      {s.price ? naira(s.price * 100) : "included in Phase 3"}
                    </span>
                  </span>
                )}
              </span>
              <span className="shrink-0 rounded-full border border-brass-500/50 px-2.5 py-1 text-[10px] font-bold text-brass-500">
                See it
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      {proposalView && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 rounded-card border border-brass-500/40 bg-brass-500/10 p-3"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brass-500">
            Proposal view · demo only
          </p>
          <p className="mt-1 text-xs leading-relaxed text-cream-100/80">
            Phases 2–6 total{" "}
            <strong className="tnum text-cream-50">{naira((total + 2_500_000) * 100)}</strong> on top
            of the {naira(9_000_000 * 100)} Basic build. Path C funds all of it for a 10% stake.
          </p>
        </motion.div>
      )}

      <p className={cn("pb-4 text-[10.5px] leading-relaxed text-cream-100/45")}>
        Double-tap the brass rule above to toggle Proposal view.
      </p>
    </Sheet>
  );
}
