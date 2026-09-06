"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Home, Layers, Play, ReceiptText, Search, User } from "lucide-react";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

const BASE_TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Search },
  { href: "/bulk", label: "Bulk", icon: Layers },
  { href: "/orders", label: "Orders", icon: ReceiptText },
  { href: "/account", label: "Account", icon: User },
];

export function TabBar() {
  const pathname = usePathname();
  const { isAdvanced } = useApp();

  // Reels is the true centre. In Advanced, Account leaves the bar (PRD §6.1)
  // so the split is 2 + Reels + 2 instead of 2 + Reels + 3.
  const left = BASE_TABS.slice(0, 2);
  const right = isAdvanced ? BASE_TABS.slice(2, 4) : BASE_TABS.slice(2);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const onReels = pathname.startsWith("/reels");

  return (
    <nav
      className={cn(
        "relative z-40 shrink-0 backdrop-blur-md",
        onReels ? "bg-ink-900" : "bg-cream-50",
      )}
    >
      {!onReels && <div className="woven-rule" />}
      <div className="flex items-stretch px-1 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {left.map((t) => (
          <Tab key={t.href} {...t} active={isActive(t.href)} inverted={onReels} />
        ))}

        <AnimatePresence>
          {isAdvanced && (
            <motion.div
              initial={{ scale: 0, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: 12, opacity: 0 }}
              transition={{ type: "spring", stiffness: 460, damping: 22 }}
              className="relative -mt-2 flex flex-1 justify-center sm:-mt-4"
            >
              <Link
                href="/reels"
                aria-label="Fabric Reels"
                className={cn(
                  "flex h-14 w-14 flex-col items-center justify-center gap-0.5 rounded-full bg-gradient-to-br from-brass-500 to-brass-700 text-indigo-900 shadow-[0_6px_20px_rgba(217,164,65,0.5)] transition-transform active:scale-92",
                  isActive("/reels") && "ring-2 ring-cream-50 ring-offset-2 ring-offset-ink-900",
                )}
              >
                <Play className="h-5 w-5 fill-indigo-900" strokeWidth={0} />
                <span className="text-[9px] font-bold leading-none">Reels</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {right.map((t) => (
          <Tab key={t.href} {...t} active={isActive(t.href)} inverted={onReels} />
        ))}
      </div>
    </nav>
  );
}

function Tab({
  href,
  label,
  icon: Icon,
  active,
  inverted = false,
}: {
  href: string;
  label: string;
  icon: typeof Home;
  active: boolean;
  inverted?: boolean;
}) {
  return (
    <Link
      href={href}
      className="relative flex flex-1 flex-col items-center gap-1 py-1"
      aria-current={active ? "page" : undefined}
    >
      <Icon
        className={cn(
          "h-[19px] w-[19px] transition-colors",
          active ? (inverted ? "text-brass-500" : "text-indigo-700") : inverted ? "text-cream-100/65" : "text-ink-300",
        )}
        strokeWidth={active ? 2.5 : 2}
      />
      <span
        className={cn(
          "text-[9.5px] font-semibold transition-colors",
          active ? (inverted ? "text-brass-500" : "text-indigo-700") : inverted ? "text-cream-100/65" : "text-ink-300",
        )}
      >
        {label}
      </span>
      {active && (
        <motion.span
          layoutId="tab-dot"
          transition={{ type: "spring", stiffness: 480, damping: 34 }}
          className="absolute -top-0.5 h-1 w-1 rounded-full bg-clay-500"
        />
      )}
    </Link>
  );
}
