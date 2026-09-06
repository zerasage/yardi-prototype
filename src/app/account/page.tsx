"use client";

import Link from "next/link";
import { ChevronRight, MessageCircle, Palette, ScanLine, Settings2, Store } from "lucide-react";
import { useApp } from "@/lib/store";

export default function AccountPage() {
  const { isAdvanced, highlightAdvanced, setHighlightAdvanced, city } = useApp();

  return (
    <div className="px-4 pb-8 pt-3">
      <div className="flex items-center gap-3 rounded-card bg-indigo-900 p-4 text-cream-50">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brass-500 text-sm font-extrabold text-indigo-900">
          AB
        </div>
        <div>
          <p className="text-lg font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
            Amina Bello
          </p>
          <p className="text-[12px] text-cream-100/70">+234 803 441 2290 · {city}</p>
        </div>
      </div>

      <nav className="mt-4 overflow-hidden rounded-card bg-cream-100 ring-1 ring-line-200">
        {[
          { href: "/orders", label: "Orders & escrow", icon: ChevronRight },
          { href: "/chat", label: "Messages", icon: MessageCircle },
          { href: "/sell", label: "Switch to selling", icon: Store },
          ...(isAdvanced
            ? [
                { href: "/advisor", label: "Ask Yardi", icon: Settings2 },
                { href: "/studio", label: "Designer Studio", icon: Palette },
                { href: "/sell/quality", label: "Grade a listing", icon: ScanLine },
              ]
            : []),
        ].map((row) => (
          <Link
            key={row.href}
            href={row.href}
            className="flex items-center justify-between border-b border-line-200 px-3.5 py-3.5 last:border-0"
          >
            <span className="flex items-center gap-2 text-[14px] font-semibold">
              <row.icon className="h-4 w-4 text-indigo-700" />
              {row.label}
            </span>
            <ChevronRight className="h-4 w-4 text-ink-300" />
          </Link>
        ))}
      </nav>

      {isAdvanced && (
        <label className="mt-4 flex items-center justify-between rounded-card bg-brass-100 px-3.5 py-3 text-[13px] font-semibold text-indigo-900">
          Highlight Advanced features
          <input
            type="checkbox"
            checked={highlightAdvanced}
            onChange={(e) => setHighlightAdvanced(e.target.checked)}
          />
        </label>
      )}

      <p className="mt-6 text-center text-[11px] leading-relaxed text-ink-500">
        Prototype by ZeraSage Technologies. Flip the switch at the top to move between
        the ₦9m Basic build and the full version.
      </p>
    </div>
  );
}
