"use client";

import { cn } from "@/lib/utils";
import type { GradeLetter, GradeStatus } from "@/lib/types";

const FILL: Record<GradeLetter, string> = {
  A: "bg-grade-a",
  B: "bg-grade-b",
  C: "bg-grade-c",
  D: "bg-grade-d",
};

export function GradeBadge({
  letter,
  status = "verified",
  size = "md",
  onClick,
  shimmer = true,
}: {
  letter?: GradeLetter;
  status?: GradeStatus | "pending";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  shimmer?: boolean;
}) {
  const pending = !letter || status === "pending" || status === "withdrawn";
  const dim = size === "sm" ? "h-7 w-7 text-[11px]" : size === "lg" ? "h-12 w-12 text-lg" : "h-9 w-9 text-sm";

  const inner = (
    <span
      className={cn(
        "grade-shimmer relative inline-flex items-center justify-center overflow-hidden font-extrabold text-cream-50",
        dim,
        pending ? "bg-grade-pending" : FILL[letter],
        !shimmer && "[&::after]:hidden",
      )}
      style={{
        clipPath: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)",
      }}
    >
      <span
        className="absolute inset-0"
        style={{
          clipPath: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)",
          boxShadow: "inset 0 0 0 1.5px #d9a441",
        }}
      />
      {pending ? (status === "withdrawn" ? "–" : "·") : letter}
    </span>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={pending ? "Grade pending" : `True Yard Grade ${letter}`}>
        {inner}
      </button>
    );
  }
  return inner;
}

export function GradeChip({
  letter,
  onClick,
}: {
  letter?: GradeLetter;
  onClick?: () => void;
}) {
  if (!letter) {
    return (
      <span className="rounded-full bg-ink-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-500">
        Grade pending
      </span>
    );
  }
  const colours: Record<GradeLetter, string> = {
    A: "bg-grade-a/15 text-grade-a",
    B: "bg-grade-b/15 text-grade-b",
    C: "bg-grade-c/15 text-grade-c",
    D: "bg-grade-d/15 text-grade-d",
  };
  const Tag = onClick ? "button" : "span";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide", colours[letter])}
    >
      Grade {letter}
    </Tag>
  );
}
