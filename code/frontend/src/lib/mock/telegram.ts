import { formatPrice } from "../format";

/**
 * The Telegram alert, in the browser.
 *
 * The real bot is the backend's job. Here the message is composed exactly as
 * it will be sent — the product's name and its price, nothing else — and
 * kept so the CMS can show what went out. No network call.
 */
export interface Alert {
  id: string;
  text: string;
  at: string;
}

const KEY = "shopfront:alerts";

function read(): Alert[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Alert[]) : [];
  } catch {
    return [];
  }
}

function write(alerts: Alert[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(alerts.slice(0, 20)));
  } catch {
    /* storage refused: the alert is still returned to the caller */
  }
}

/** The message the bot posts: the product name and its price. */
export function alertText(name: string, price: number): string {
  return `${name} — ${formatPrice(price)}`;
}

/** Announces a new product. Resolves with what was posted. */
export async function announce(name: string, price: number): Promise<Alert> {
  const alert: Alert = {
    id: `a-${Date.now()}`,
    text: alertText(name, price),
    at: new Date().toISOString(),
  };
  write([alert, ...read()]);
  return alert;
}

/** What has been announced from this browser, newest first. */
export function announced(): Alert[] {
  return read();
}
