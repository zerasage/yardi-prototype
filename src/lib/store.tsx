"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, City, Mode } from "./types";
import { listing, tierPrice } from "./seed";

/**
 * Global app state. Mode is persisted and survives reload (PRD MS-1).
 * Cart is shared across modes — switching never resets anything (PRD MS-4).
 */

interface Toast {
  id: number;
  title: string;
  detail?: string;
  tone: "brass" | "green" | "clay";
}

interface AppState {
  mode: Mode;
  setMode: (m: Mode) => void;
  toggleMode: () => void;
  isAdvanced: boolean;
  /** Fires once per switch so surfaces can run the brass wipe. */
  wipeKey: number;

  city: City;
  setCity: (c: City) => void;

  highlightAdvanced: boolean;
  setHighlightAdvanced: (v: boolean) => void;

  cart: CartLine[];
  addToCart: (line: CartLine) => void;
  updateCartYards: (listingId: string, yards: number) => void;
  removeFromCart: (listingId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  releasedOrders: string[];
  releaseOrder: (id: string) => void;
  advancedOrders: Record<string, number>;
  advanceOrder: (id: string) => void;

  toasts: Toast[];
  toast: (t: Omit<Toast, "id">) => void;

  seenAdvancedSheet: boolean;
  markAdvancedSheetSeen: () => void;
}

const Ctx = createContext<AppState | null>(null);

const MODE_KEY = "yardi.mode";

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setModeRaw] = useState<Mode>("basic");
  const [wipeKey, setWipeKey] = useState(0);
  const [city, setCity] = useState<City>("Kano");
  const [highlightAdvanced, setHighlightAdvanced] = useState(true);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [releasedOrders, setReleasedOrders] = useState<string[]>([]);
  const [advancedOrders, setAdvancedOrders] = useState<Record<string, number>>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [seenAdvancedSheet, setSeenAdvancedSheet] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(MODE_KEY);
    if (stored === "advanced" || stored === "basic") setModeRaw(stored);
  }, []);

  const setMode = useCallback((m: Mode) => {
    setModeRaw((prev) => {
      if (prev !== m) setWipeKey((k) => k + 1);
      return m;
    });
    window.localStorage.setItem(MODE_KEY, m);
  }, []);

  const toggleMode = useCallback(() => {
    setModeRaw((prev) => {
      const next: Mode = prev === "basic" ? "advanced" : "basic";
      window.localStorage.setItem(MODE_KEY, next);
      setWipeKey((k) => k + 1);
      return next;
    });
  }, []);

  const toast = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3400);
  }, []);

  const addToCart = useCallback((line: CartLine) => {
    setCart((prev) => {
      const existing = prev.find((l) => l.listingId === line.listingId);
      if (existing) {
        return prev.map((l) =>
          l.listingId === line.listingId ? { ...l, yards: l.yards + line.yards } : l,
        );
      }
      return [...prev, line];
    });
  }, []);

  const updateCartYards = useCallback((listingId: string, yardsValue: number) => {
    setCart((prev) =>
      prev.map((l) => (l.listingId === listingId ? { ...l, yards: Math.max(1, yardsValue) } : l)),
    );
  }, []);

  const removeFromCart = useCallback((listingId: string) => {
    setCart((prev) => prev.filter((l) => l.listingId !== listingId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const releaseOrder = useCallback((id: string) => {
    setReleasedOrders((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const advanceOrder = useCallback((id: string) => {
    setAdvancedOrders((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }, []);

  const cartSubtotal = useMemo(
    () =>
      cart.reduce((sum, line) => {
        const l = listing(line.listingId);
        return sum + tierPrice(l, line.yards) * line.yards;
      }, 0),
    [cart],
  );

  const value: AppState = {
    mode,
    setMode,
    toggleMode,
    isAdvanced: mode === "advanced",
    wipeKey,
    city,
    setCity,
    highlightAdvanced,
    setHighlightAdvanced,
    cart,
    addToCart,
    updateCartYards,
    removeFromCart,
    clearCart,
    cartCount: cart.length,
    cartSubtotal,
    releasedOrders,
    releaseOrder,
    advancedOrders,
    advanceOrder,
    toasts,
    toast,
    seenAdvancedSheet,
    markAdvancedSheetSeen: () => setSeenAdvancedSheet(true),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
