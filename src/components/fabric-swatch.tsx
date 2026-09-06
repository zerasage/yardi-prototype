"use client";

import { useId } from "react";
import type { FabricTypeId } from "@/lib/types";
import { cn, hash } from "@/lib/utils";

/**
 * Procedural fabric rendering.
 *
 * The prototype ships no photography, so every swatch is drawn as an SVG
 * pattern derived from the real textile it represents: wax-print concentrics,
 * lace net and floret, aso-oke warp stripes, adire resist rings, shadda damask.
 * Deterministic per listing, so the same cloth looks the same on every reload.
 *
 * When real photography arrives, drop files at /public/fabrics/<listingId>.jpg
 * and pass `photo` — this component is the single swap point.
 */

interface Props {
  seed: string;
  fabricType: FabricTypeId;
  base: string;
  accent: string;
  className?: string;
  /** Adds the woven-cloth lighting pass. Off for tiny swatch chips. */
  cloth?: boolean;
  rounded?: boolean;
}

function Motif({
  id,
  fabricType,
  base,
  accent,
  variant,
}: {
  id: string;
  fabricType: FabricTypeId;
  base: string;
  accent: string;
  variant: number;
}) {
  const common = { patternUnits: "userSpaceOnUse" as const };

  switch (fabricType) {
    case "ankara":
      return (
        <pattern id={id} width="84" height="84" {...common}>
          <rect width="84" height="84" fill={base} />
          <circle cx="42" cy="42" r="27" fill="none" stroke={accent} strokeWidth="3" />
          <circle cx="42" cy="42" r="19" fill="none" stroke={accent} strokeWidth="1.4" opacity="0.75" />
          <circle cx="42" cy="42" r="10" fill={accent} />
          <circle cx="42" cy="42" r="4" fill={base} />
          {[
            [0, 0],
            [84, 0],
            [0, 84],
            [84, 84],
          ].map(([cx, cy], i) => (
            <g key={i} transform={`translate(${cx} ${cy})`}>
              <path d="M0 -13 Q7 0 0 13 Q-7 0 0 -13Z" fill={accent} opacity="0.9" />
              <path d="M-13 0 Q0 7 13 0 Q0 -7 -13 0Z" fill={accent} opacity="0.9" />
            </g>
          ))}
          <circle cx="42" cy="0" r="4.5" fill={accent} opacity="0.6" />
          <circle cx="0" cy="42" r="4.5" fill={accent} opacity="0.6" />
          <circle cx="84" cy="42" r="4.5" fill={accent} opacity="0.6" />
          <circle cx="42" cy="84" r="4.5" fill={accent} opacity="0.6" />
        </pattern>
      );

    case "lace":
      return (
        <pattern id={id} width="64" height="64" {...common}>
          <rect width="64" height="64" fill={base} />
          <g stroke={accent} strokeWidth="0.6" opacity="0.35">
            <path d="M0 16 L64 16 M0 32 L64 32 M0 48 L64 48" />
            <path d="M16 0 L16 64 M32 0 L32 64 M48 0 L48 64" />
          </g>
          <g fill="none" stroke={accent} strokeWidth="1.6" opacity="0.95">
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <ellipse
                key={deg}
                cx="32"
                cy="32"
                rx="5"
                ry="13"
                transform={`rotate(${deg} 32 32)`}
              />
            ))}
          </g>
          <circle cx="32" cy="32" r="3.4" fill={accent} />
          <g fill={accent} opacity="0.55">
            <circle cx="0" cy="0" r="2.6" />
            <circle cx="64" cy="0" r="2.6" />
            <circle cx="0" cy="64" r="2.6" />
            <circle cx="64" cy="64" r="2.6" />
          </g>
        </pattern>
      );

    case "aso-oke":
      return (
        <pattern id={id} width="48" height="24" {...common}>
          <rect width="48" height="24" fill={base} />
          <rect x="0" y="0" width="7" height="24" fill={accent} opacity="0.85" />
          <rect x="11" y="0" width="2" height="24" fill={accent} opacity="0.55" />
          <rect x="17" y="0" width="4" height="24" fill={accent} opacity="0.3" />
          <rect x="30" y="0" width="2" height="24" fill={accent} opacity="0.55" />
          <g fill={accent} opacity="0.45">
            <rect x="0" y="5" width="48" height="1" />
            <rect x="0" y="13" width="48" height="1" />
            <rect x="0" y="20" width="48" height="1" />
          </g>
          <g fill={accent} opacity="0.8">
            <rect x="37" y="3" width="3" height="3" />
            <rect x="42" y="11" width="3" height="3" />
            <rect x="37" y="18" width="3" height="3" />
          </g>
        </pattern>
      );

    case "adire":
      return (
        <pattern id={id} width="90" height="90" {...common}>
          <rect width="90" height="90" fill={base} />
          {[
            [24, 24, 15],
            [66, 30, 11],
            [30, 68, 12],
            [70, 72, 9],
          ].map(([cx, cy, r], i) => (
            <g key={i} fill="none" stroke={accent} opacity="0.85">
              <circle cx={cx} cy={cy} r={r} strokeWidth="2.2" />
              <circle cx={cx} cy={cy} r={r * 0.62} strokeWidth="1.4" />
              <circle cx={cx} cy={cy} r={r * 0.24} strokeWidth="3" />
            </g>
          ))}
          <g stroke={accent} strokeWidth="1" opacity="0.35">
            <path d="M0 45 Q22 38 45 45 T90 45" fill="none" />
            <path d="M45 0 Q52 22 45 45 T45 90" fill="none" />
          </g>
        </pattern>
      );

    case "shadda":
    case "brocade":
      return (
        <pattern id={id} width="52" height="52" {...common}>
          <rect width="52" height="52" fill={base} />
          <g stroke={accent} strokeWidth="1.2" fill="none" opacity="0.7">
            <path d="M26 4 L48 26 L26 48 L4 26 Z" />
            <path d="M26 14 L38 26 L26 38 L14 26 Z" />
          </g>
          <circle cx="26" cy="26" r="3.2" fill={accent} opacity="0.9" />
          <g stroke={accent} strokeWidth="0.5" opacity="0.3">
            <path d="M0 0 L52 52 M52 0 L0 52" />
          </g>
          <g fill={accent} opacity="0.6">
            <circle cx="0" cy="26" r="2" />
            <circle cx="52" cy="26" r="2" />
            <circle cx="26" cy="0" r="2" />
            <circle cx="26" cy="52" r="2" />
          </g>
        </pattern>
      );

    case "george":
      return (
        <pattern id={id} width="70" height="56" {...common}>
          <rect width="70" height="56" fill={base} />
          <rect x="0" y="0" width="70" height="9" fill={accent} opacity="0.85" />
          <rect x="0" y="47" width="70" height="9" fill={accent} opacity="0.85" />
          <g fill={accent}>
            {[8, 24, 40, 56].map((x) => (
              <g key={x}>
                <circle cx={x} cy="4.5" r="2.4" opacity="0.95" />
                <circle cx={x} cy="51.5" r="2.4" opacity="0.95" />
              </g>
            ))}
          </g>
          <g stroke={accent} strokeWidth="1.3" fill="none" opacity="0.75">
            <path d="M12 28 L24 18 L36 28 L24 38 Z" />
            <path d="M46 28 L58 18 L70 28 L58 38 Z" />
            <path d="M-12 28 L0 18 L12 28 L0 38 Z" />
          </g>
          <g fill={accent} opacity="0.5">
            <circle cx="24" cy="28" r="1.8" />
            <circle cx="58" cy="28" r="1.8" />
          </g>
        </pattern>
      );

    case "senator":
      return (
        <pattern id={id} width="18" height="18" {...common}>
          <rect width="18" height="18" fill={base} />
          <g stroke={accent} strokeWidth="1.5" opacity="0.16">
            <path d="M-4 4 L4 -4 M2 10 L10 2 M8 16 L16 8 M14 22 L22 14" />
          </g>
          <g fill={accent} opacity="0.1">
            <circle cx="9" cy="9" r="1" />
          </g>
        </pattern>
      );

    case "chiffon":
      return (
        <pattern id={id} width="40" height="40" {...common}>
          <rect width="40" height="40" fill={base} />
          <g fill={accent} opacity="0.22">
            <circle cx="8" cy="10" r="1.3" />
            <circle cx="26" cy="6" r="1" />
            <circle cx="34" cy="22" r="1.4" />
            <circle cx="16" cy="30" r="1.1" />
            <circle cx="4" cy="34" r="0.9" />
          </g>
          <g stroke={accent} strokeWidth="0.4" opacity="0.14">
            <path d="M0 20 Q10 14 20 20 T40 20" fill="none" />
            <path d="M0 0 Q10 -6 20 0 T40 0" fill="none" />
            <path d="M0 40 Q10 34 20 40 T40 40" fill="none" />
          </g>
        </pattern>
      );

    case "veil":
      return (
        <pattern id={id} width="46" height="46" {...common}>
          <rect width="46" height="46" fill={base} />
          <g fill="none" stroke={accent} strokeWidth="1.1" opacity="0.6">
            {[0, 90, 180, 270].map((deg) => (
              <path
                key={deg}
                d="M23 23 q6 -5 0 -11 q-6 6 0 11"
                transform={`rotate(${deg} 23 23)`}
              />
            ))}
          </g>
          <circle cx="23" cy="23" r="1.8" fill={accent} opacity="0.7" />
          <g fill={accent} opacity="0.28">
            <circle cx="0" cy="0" r="1.6" />
            <circle cx="46" cy="0" r="1.6" />
            <circle cx="0" cy="46" r="1.6" />
            <circle cx="46" cy="46" r="1.6" />
          </g>
        </pattern>
      );

    default:
      return (
        <pattern id={id} width="24" height="24" {...common}>
          <rect width="24" height="24" fill={base} />
          <circle cx="12" cy="12" r="3" fill={accent} opacity={0.4 + (variant % 3) * 0.15} />
        </pattern>
      );
  }
}

export function FabricSwatch({
  seed,
  fabricType,
  base,
  accent,
  className,
  cloth = true,
  rounded = false,
}: Props) {
  const uid = useId().replace(/[:]/g, "");
  const patternId = `fab-${uid}`;
  const clothId = `cloth-${uid}`;
  const variant = hash(seed);
  const rotate = (variant % 4) * 90;

  return (
    <div className={cn("relative overflow-hidden bg-cream-200", rounded && "rounded-card", className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <Motif
            id={patternId}
            fabricType={fabricType}
            base={base}
            accent={accent}
            variant={variant}
          />
          {cloth && (
            <linearGradient id={clothId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.26" />
              <stop offset="34%" stopColor="#ffffff" stopOpacity="0.04" />
              <stop offset="58%" stopColor="#000000" stopOpacity="0.16" />
              <stop offset="78%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.24" />
            </linearGradient>
          )}
        </defs>
        <g transform={`rotate(${rotate} 400 400)`}>
          <rect x="-400" y="-400" width="1600" height="1600" fill={`url(#${patternId})`} />
        </g>
        {cloth && <rect width="100%" height="100%" fill={`url(#${clothId})`} />}
      </svg>
    </div>
  );
}

/** Small circular colour chip for colourway pickers. */
export function ColourChip({
  hex,
  accent,
  selected,
  onClick,
  label,
}: {
  hex: string;
  accent: string;
  selected?: boolean;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={selected}
      className={cn(
        "relative h-9 w-9 shrink-0 rounded-full transition-transform active:scale-90",
        selected
          ? "ring-2 ring-indigo-700 ring-offset-2 ring-offset-cream-50"
          : "ring-1 ring-line-200",
      )}
      style={{ background: hex }}
    >
      <span
        className="absolute inset-1.5 rounded-full opacity-70"
        style={{ background: `radial-gradient(circle at 30% 30%, ${accent}, transparent 70%)` }}
      />
    </button>
  );
}
