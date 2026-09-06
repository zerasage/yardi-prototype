"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Bell, ChevronLeft, ShoppingBag } from "lucide-react";
import { ModeSwitch } from "@/components/mode-switch";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

const TAB_ROOTS = new Set(["/", "/explore", "/reels", "/bulk", "/orders", "/account"]);

const TITLES: Record<string, string> = {
  "/explore": "Explore",
  "/reels": "Fabric Reels",
  "/bulk": "Bulk & Asoebi",
  "/orders": "Orders",
  "/account": "Account",
  "/cart": "Your cart",
  "/checkout": "Checkout",
  "/advisor": "Ask Yardi",
  "/studio": "Designer Studio",
  "/chat": "Messages",
  "/sell": "Your shop",
  "/sell/new": "New listing",
  "/sell/quality": "Grade this fabric",
  "/grading": "How we grade",
  "/bulk/new": "New request",
};

function titleFor(pathname: string) {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith("/listing/")) return "Fabric";
  if (pathname.startsWith("/vendor/")) return "Vendor";
  if (pathname.startsWith("/orders/")) return "Order";
  if (pathname.startsWith("/bulk/")) return "Request";
  if (pathname.startsWith("/chat/")) return "Chat";
  return "Yardi";
}

export function TopBar({ scrolled }: { scrolled: boolean }) {
  const { isAdvanced, cartCount, markAdvancedSheetSeen, seenAdvancedSheet } = useApp();
  const pathname = usePathname();
  const router = useRouter();

  const isRoot = pathname === "/";
  const title = titleFor(pathname);
  const showBack = !TAB_ROOTS.has(pathname);
  const onDark = scrolled || pathname === "/reels";

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <header
      className={cn(
        "absolute inset-x-0 top-0 z-40 transition-colors duration-300",
        onDark ? "bg-indigo-700/95 backdrop-blur-md" : "bg-cream-50",
      )}
    >
      <div className="flex h-14 items-center gap-2 px-3 pt-1">
        {showBack ? (
          <button
            type="button"
            onClick={goBack}
            aria-label="Back"
            className={cn(
              "-ml-1 flex h-9 w-9 items-center justify-center rounded-full transition-colors",
              onDark ? "text-cream-50 hover:bg-white/10" : "text-ink-900 hover:bg-cream-200",
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        ) : null}

        {isRoot ? (
          <Link href="/" className="flex items-baseline gap-0.5">
            <motion.span
              animate={{ fontSize: scrolled ? "18px" : "22px" }}
              transition={{ duration: 0.25 }}
              className={cn(
                "font-extrabold leading-none tracking-tight",
                onDark ? "text-cream-50" : "text-indigo-700",
              )}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Yardi
            </motion.span>
            {isAdvanced && (
              <motion.button
                type="button"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                onClick={(e) => {
                  e.preventDefault();
                  markAdvancedSheetSeen();
                  window.dispatchEvent(new CustomEvent("yardi:open-advanced-sheet"));
                }}
                aria-label="What Advanced adds"
                className={cn(
                  "text-sm font-extrabold leading-none",
                  onDark ? "text-brass-500" : "text-brass-700",
                  !seenAdvancedSheet && "animate-pulse",
                )}
              >
                +
              </motion.button>
            )}
          </Link>
        ) : (
          <h1
            className={cn(
              "truncate text-base font-bold",
              onDark ? "text-cream-50" : "text-ink-900",
            )}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title ?? "Yardi"}
          </h1>
        )}

        <div className="ml-auto flex items-center gap-1.5">
          <ModeSwitch />
          <Link
            href="/cart"
            aria-label={`Cart, ${cartCount} items`}
            className={cn(
              "relative flex h-9 w-9 items-center justify-center rounded-full transition-colors",
              onDark ? "text-cream-50 hover:bg-white/10" : "text-ink-700 hover:bg-cream-200",
            )}
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 600, damping: 18 }}
                className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay-500 px-1 text-[10px] font-bold text-cream-50"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>
          <button
            type="button"
            aria-label="Notifications"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
              onDark ? "text-cream-50 hover:bg-white/10" : "text-ink-700 hover:bg-cream-200",
            )}
          >
            <Bell className="h-[18px] w-[18px]" />
          </button>
          {isAdvanced && (
            <Link
              href="/account"
              aria-label="Account"
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-extrabold",
                pathname === "/account"
                  ? "bg-brass-500 text-indigo-900"
                  : onDark
                    ? "bg-cream-50 text-indigo-700"
                    : "bg-indigo-700 text-cream-50",
              )}
            >
              AB
            </Link>
          )}
        </div>
      </div>
      <div className={cn("woven-rule transition-opacity", onDark ? "opacity-0" : "opacity-100")} />
    </header>
  );
}
