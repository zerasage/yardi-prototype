"use client";

import { AnimatePresence, motion } from "motion/react";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Toasts() {
  const { toasts } = useApp();

  return (
    <div className="pointer-events-none absolute inset-x-3 top-16 z-[70] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            className={cn(
              "rounded-card px-3.5 py-2.5 shadow-[0_8px_24px_rgba(16,27,71,0.18)] ring-1",
              t.tone === "brass" && "bg-brass-500 text-indigo-900 ring-brass-700/20",
              t.tone === "green" && "bg-signal-green text-cream-50 ring-white/10",
              t.tone === "clay" && "bg-clay-500 text-cream-50 ring-white/10",
            )}
          >
            <p className="text-[13px] font-bold leading-tight">{t.title}</p>
            {t.detail && <p className="mt-0.5 text-[11px] opacity-80">{t.detail}</p>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
