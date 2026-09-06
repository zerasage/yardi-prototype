"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sheet({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  tone = "cream",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  tone?: "cream" | "indigo";
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-[60] bg-ink-900/45 backdrop-blur-[2px]"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 110) onClose();
            }}
            className={cn(
              "absolute inset-x-0 bottom-0 z-[61] flex max-h-[86%] flex-col rounded-t-[24px] shadow-[0_-8px_32px_rgba(16,27,71,0.22)]",
              tone === "cream" ? "bg-cream-50" : "bg-indigo-900",
            )}
          >
            <div className="flex shrink-0 justify-center pb-1 pt-2.5">
              <span
                className={cn(
                  "h-1 w-10 rounded-full",
                  tone === "cream" ? "bg-line-200" : "bg-white/25",
                )}
              />
            </div>

            {title && (
              <div className="flex shrink-0 items-start gap-3 px-5 pb-3 pt-1">
                <div className="min-w-0 flex-1">
                  <h2
                    className={cn(
                      "text-lg font-bold leading-tight",
                      tone === "cream" ? "text-ink-900" : "text-cream-50",
                    )}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {title}
                  </h2>
                  {subtitle && (
                    <p
                      className={cn(
                        "mt-0.5 text-xs",
                        tone === "cream" ? "text-ink-500" : "text-cream-100/70",
                      )}
                    >
                      {subtitle}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className={cn(
                    "-mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    tone === "cream"
                      ? "text-ink-500 hover:bg-cream-200"
                      : "text-cream-100 hover:bg-white/10",
                  )}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="no-bar min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4">
              {children}
            </div>

            {footer && (
              <div
                className={cn(
                  "shrink-0 border-t px-5 pb-7 pt-3",
                  tone === "cream" ? "border-line-200" : "border-white/10",
                )}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
