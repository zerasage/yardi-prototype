"use client";

import Link from "next/link";
import { THREADS, vendor } from "@/lib/seed";
import { relativeTime } from "@/lib/utils";

export default function ChatListPage() {
  return (
    <div className="px-4 pb-8 pt-2">
      {THREADS.map((th) => {
        const v = vendor(th.vendorId);
        const last = th.messages[th.messages.length - 1];
        return (
          <Link
            key={th.id}
            href={`/chat/${v.id}`}
            className="flex items-center gap-3 border-b border-line-200 py-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-700 text-xs font-bold text-cream-50">
              {v.ownerName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between">
                <p className="truncate text-[14px] font-bold">{v.shopName}</p>
                <p className="text-[10px] text-ink-500">{relativeTime(last.at)}</p>
              </div>
              <p className="truncate text-[12px] text-ink-500">
                {last.type === "offer" ? "Offer: 6 yards at ₦17,200 /yd" : last.body}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
