import { useSyncExternalStore } from "react";

/**
 * Products added in the CMS, before there is a backend.
 *
 * src/data/products.json is the shop's catalogue as it stands; what the owner
 * adds in this browser lives here and is shown on top of it, so the CMS list
 * and the home page both answer straight away. The backend story replaces
 * this file.
 */
export interface NewProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  added: string;
  sold_out: false;
}

const KEY = "shopfront:products";
const listeners = new Set<() => void>();
let cache: NewProduct[] | null = null;

function read(): NewProduct[] {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as NewProduct[]) : [];
  } catch {
    cache = [];
  }
  return cache;
}

/** Adds a product and returns it, with the id the record will keep. */
export function add(p: Omit<NewProduct, "id" | "added" | "sold_out">): NewProduct {
  const record: NewProduct = {
    ...p,
    id: `p-${Date.now()}`,
    added: new Date().toISOString().slice(0, 10),
    sold_out: false,
  };
  cache = [record, ...read()];
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    /* kept in memory for this page */
  }
  listeners.forEach((l) => l());
  return record;
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** The products added in this browser, newest first. */
export function useAdded(): NewProduct[] {
  return useSyncExternalStore(subscribe, read, () => []);
}
