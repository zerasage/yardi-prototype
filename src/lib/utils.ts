import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Group thousands with a comma. Avoid toLocaleString — Node vs iOS disagree. */
function group(n: number, decimals = 0) {
  const [int, dec] = Math.abs(n).toFixed(decimals).split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const sign = n < 0 ? "-" : "";
  return dec ? `${sign}${grouped}.${dec}` : `${sign}${grouped}`;
}

/** Money is held in kobo everywhere (PRD §11 invariants). */
export function naira(kobo: number, opts?: { decimals?: boolean }) {
  return `₦${group(kobo / 100, opts?.decimals ? 2 : 0)}`;
}

export function groupInt(n: number) {
  return group(n);
}

/** Compact naira for stat bands: ₦2.1bn, ₦340m, ₦18k */
export function nairaCompact(kobo: number) {
  const v = kobo / 100;
  if (v >= 1_000_000_000) return `₦${(v / 1_000_000_000).toFixed(1)}bn`;
  if (v >= 1_000_000) return `₦${Math.round(v / 1_000_000)}m`;
  if (v >= 1_000) return `₦${Math.round(v / 1_000)}k`;
  return `₦${v}`;
}

/** Yards are numeric(8,2) — half yards are legal. Never render "6.00". */
export function yards(n: number) {
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}

export function pluralYards(n: number) {
  return `${yards(n)} ${n === 1 ? "yard" : "yards"}`;
}

/** Deterministic hash so seeded content renders identically on every reload. */
export function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function pick<T>(arr: readonly T[], seed: string): T {
  return arr[hash(seed) % arr.length];
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function dateParts(iso: string) {
  const d = new Date(iso);
  return {
    day: d.getDate(),
    month: MONTHS[d.getMonth()],
    hours: String(d.getHours()).padStart(2, "0"),
    minutes: String(d.getMinutes()).padStart(2, "0"),
  };
}

export function relativeTime(iso: string) {
  return shortDate(iso);
}

export function shortDate(iso: string) {
  const p = dateParts(iso);
  return `${p.day} ${p.month}`;
}

export function timeOf(iso: string) {
  const p = dateParts(iso);
  return `${p.hours}:${p.minutes}`;
}
