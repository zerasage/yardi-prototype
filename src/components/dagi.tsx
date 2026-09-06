"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * The dagi knot — the Hausa interlace motif from Kano wall reliefs.
 * Used in exactly three places per PRD §12.4: the loader (M3, it draws itself),
 * empty states, and the 4%-opacity Advanced watermark. Never as decoration.
 */

const PATHS = [
  "M50 12 L88 50 L50 88 L12 50 Z",
  "M26 26 L74 26 L74 74 L26 74 Z",
  "M50 30 A20 20 0 1 1 49.9 30 Z",
];

const LOOPS: [number, number][] = [
  [50, 8],
  [92, 50],
  [50, 92],
  [8, 50],
];

export function DagiKnot({
  className,
  strokeWidth = 4,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round">
        {PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
        {LOOPS.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={5} />
        ))}
      </g>
    </svg>
  );
}

/** M3 — Dagi draw. The knot draws itself, then rotates once. */
export function DagiLoader({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <motion.svg
        viewBox="0 0 100 100"
        className={cn("h-12 w-12 text-indigo-700", className)}
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        aria-label={label ?? "Loading"}
        role="img"
      >
        <g stroke="currentColor" strokeWidth={4} strokeLinejoin="round" strokeLinecap="round">
          {PATHS.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0.2, 1, 1, 0.2] }}
              transition={{
                duration: 2.6,
                times: [0, 0.45, 0.8, 1],
                repeat: Infinity,
                delay: i * 0.14,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
      </motion.svg>
      {label && <p className="text-xs font-medium text-ink-500">{label}</p>}
    </div>
  );
}

/** The 4%-opacity Advanced-mode background watermark. */
export function DagiWatermark({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <DagiKnot
        className="absolute -right-16 top-24 h-72 w-72 text-indigo-700 opacity-[0.04]"
        strokeWidth={2}
      />
      <DagiKnot
        className="absolute -left-20 bottom-40 h-64 w-64 text-brass-700 opacity-[0.04]"
        strokeWidth={2}
      />
    </div>
  );
}

/** Small separator used between items in the market marquee. */
export function DagiTick({ className }: { className?: string }) {
  return <DagiKnot className={cn("h-3 w-3", className)} strokeWidth={7} />;
}
