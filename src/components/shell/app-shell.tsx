"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { BrassWipe } from "@/components/mode-switch";
import { DagiWatermark } from "@/components/dagi";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import { TopBar } from "./top-bar";
import { TabBar } from "./tab-bar";
import { AdvancedSheet } from "./advanced-sheet";
import { Toasts } from "./toasts";

const FULL_BLEED = ["/reels"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAdvanced } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fullBleed = FULL_BLEED.includes(pathname);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setScrolled(false);
  }, [pathname]);

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-ink-900 p-0 sm:p-8">
      {/* Desktop backdrop — indigo dye bloom drifting behind the device */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="dye-bloom left-[12%] top-[8%] h-[520px] w-[520px] opacity-[0.22]" />
        <div className="dye-bloom dye-bloom-2 right-[8%] bottom-[6%] h-[460px] w-[460px] opacity-[0.18]" />
      </div>

      <PresenterChrome />

      <div
        className={cn(
          "relative z-10 flex h-dvh w-full flex-col overflow-hidden bg-cream-50",
          "sm:h-[820px] sm:w-[390px] sm:rounded-[28px] sm:border sm:border-white/10 sm:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.75)]",
        )}
      >
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          {isAdvanced && !fullBleed && <DagiWatermark />}
          <BrassWipe />

          {!fullBleed && <TopBar scrolled={scrolled} />}

          <div
            ref={scrollRef}
            onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 64)}
            className={cn(
              "no-bar relative min-h-0 flex-1 overflow-y-auto overscroll-contain",
              !fullBleed && "pt-14",
            )}
          >
            <AnimatePresence mode="wait">
              {/* M2 — Cloth unroll. Content reveals like fabric off a bolt. */}
              <motion.div
                key={pathname}
                className={fullBleed ? "h-full" : undefined}
                initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.4 }}
                animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>

          <TabBar />
          <AdvancedSheet />
          <Toasts />
        </div>
      </div>
    </div>
  );
}

/** Desktop-only framing so the prototype reads as a deliberate artefact. */
function PresenterChrome() {
  const { isAdvanced } = useApp();
  return (
    <>
      <div className="pointer-events-none absolute left-10 top-10 hidden max-w-[240px] lg:block">
        <p
          className="text-2xl font-extrabold leading-none text-cream-50"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Yardi
          {isAdvanced && <span className="text-brass-500">⁺</span>}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-cream-100/45">
          A fabric marketplace for Nigeria. Interactive prototype.
        </p>
        <div className="mt-4 h-px w-16 bg-brass-500/50" />
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream-100/35">
          ZeraSage Technologies
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-10 left-10 hidden max-w-[240px] lg:block">
        <p className="text-[11px] leading-relaxed text-cream-100/35">
          Flip the switch at the top of the app to move between the Basic build and the
          full version.
        </p>
      </div>
    </>
  );
}
