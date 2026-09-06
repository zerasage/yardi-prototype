"use client";

import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * THE MODE SWITCH — PRD §3.
 *
 * Sits where a light/dark toggle normally sits. Flips the whole app between the
 * ₦9m Basic scope and the ₦28m Full scope. Advanced is strictly additive
 * (MS-5): nothing in Basic is ever removed, moved or renamed.
 */
export function ModeSwitch({ compact = false }: { compact?: boolean }) {
  const { mode, setMode, isAdvanced } = useApp();

  return (
    <div
      role="radiogroup"
      aria-label="Feature set"
      className={cn(
        "relative flex shrink-0 items-center rounded-full p-[3px] transition-colors duration-500",
        isAdvanced ? "bg-indigo-900" : "bg-indigo-700/85",
        compact ? "h-8" : "h-9",
      )}
    >
      {(["basic", "advanced"] as const).map((m) => {
        const active = mode === m;
        return (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setMode(m)}
            className={cn(
              "relative z-10 flex h-full items-center gap-1 rounded-full font-semibold transition-colors duration-300",
              compact ? "px-2.5 text-[10px]" : "px-3 text-[11px]",
              active
                ? m === "advanced"
                  ? "text-indigo-900"
                  : "text-indigo-900"
                : "text-cream-100/70 hover:text-cream-50",
            )}
          >
            {active && (
              <motion.span
                layoutId="mode-thumb"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className={cn(
                  "absolute inset-0 -z-10 rounded-full",
                  m === "advanced"
                    ? "bg-gradient-to-r from-brass-500 to-brass-700 shadow-[0_0_14px_rgba(217,164,65,0.55)]"
                    : "bg-cream-100",
                )}
              />
            )}
            {m === "advanced" && active && (
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
              >
                <Sparkles className="h-3 w-3" strokeWidth={2.6} />
              </motion.span>
            )}
            {m === "basic" ? "Basic" : "Advanced"}
          </button>
        );
      })}
    </div>
  );
}

/**
 * M1 — Brass wipe. 420ms sweep on entering Advanced, 280ms on leaving.
 * Rendered once at the app shell level and keyed off `wipeKey`.
 */
export function BrassWipe() {
  const { wipeKey, isAdvanced } = useApp();

  return (
    <AnimatePresence>
      <motion.div
        key={wipeKey}
        className="pointer-events-none absolute inset-0 z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.05, delay: isAdvanced ? 0.42 : 0.28 }}
      >
        {wipeKey > 0 && (
          <motion.div
            className="absolute inset-y-0 w-[55%]"
            style={{
              background: isAdvanced
                ? "linear-gradient(90deg, transparent, rgba(217,164,65,0.15) 30%, rgba(217,164,65,0.85) 65%, rgba(251,248,242,0.95))"
                : "linear-gradient(90deg, rgba(251,248,242,0.9), rgba(27,42,107,0.55) 45%, transparent)",
            }}
            initial={{ x: "-60%" }}
            animate={{ x: "190%" }}
            transition={{
              duration: isAdvanced ? 0.42 : 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Wrapper for anything that only exists in Advanced. Handles the fade+rise with
 * stagger on reveal, and the brass hairline that marks what the extra ₦19m
 * bought (MS-6, switchable off in Settings).
 */
export function AdvancedOnly({
  children,
  index = 0,
  label,
  className,
  bare = false,
}: {
  children: React.ReactNode;
  index?: number;
  label?: string;
  className?: string;
  bare?: boolean;
}) {
  const { isAdvanced, highlightAdvanced, wipeKey } = useApp();

  return (
    <AnimatePresence mode="wait">
      {isAdvanced && (
        <motion.div
          key={`adv-${wipeKey}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4, transition: { duration: 0.14 } }}
          transition={{
            duration: 0.34,
            delay: 0.18 + index * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={cn(
            "relative",
            !bare && highlightAdvanced && "rounded-card",
            className,
          )}
        >
          {!bare && highlightAdvanced && label && (
            <span className="absolute -top-2 left-3 z-10 rounded-full bg-brass-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-indigo-900">
              {label}
            </span>
          )}
          {!bare && highlightAdvanced && (
            <span className="pointer-events-none absolute inset-0 rounded-card ring-1 ring-brass-500/45" />
          )}
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
