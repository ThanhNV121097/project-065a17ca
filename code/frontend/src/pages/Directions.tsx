/**
 * Direction pages — NOT part of the site.
 *
 * One first screen per direction, rendered outside the app's layout (no
 * header, no nav, no footer) and judged at 1440x790. Deleted the moment the
 * owner has chosen, so the styles are local and inline on purpose.
 *
 * Sample goods: the owner supplied no product list, no photographs and no
 * currency. The four items are samples of a small homeware shop's goods, named
 * for what the photographs actually show, priced in VND as the owner's
 * market's default.
 */

type Item = { name: string; note: string; price: string; img: string };

const ITEMS: Item[] = [
  { name: "Porcelain cup & saucer", note: "Glazed white, 180ml, with spoon", price: "180.000", img: "/images/mug.png" },
  { name: "Rattan storage basket", note: "Hand-woven cane, 34cm across", price: "420.000", img: "/images/basket.png" },
  { name: "Clip-on desk lamp", note: "Matt black, flexible neck, E27", price: "350.000", img: "/images/lamp.png" },
  { name: "Linen tea towel", note: "Washed linen, 50 x 70cm", price: "95.000", img: "/images/towel.png" },
];

const tab = { fontVariantNumeric: "tabular-nums" as const };

function Tag({ children, color }: { children: string; color: string }) {
  return (
    <div
      style={{
        position: "absolute", right: 20, bottom: 16, zIndex: 5,
        font: "500 10px/1 Inter, sans-serif", letterSpacing: "0.16em",
        textTransform: "uppercase", color,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ 1 */
/* The whole shelf — near-black, Archivo, no hero photograph, four goods
   edge to edge with the price set large. Device: the shop name set
   vertically up a hairline rail on the left, the item count at its foot. */

export function DirectionShelf() {
  const ground = "#121110", surface = "#1C1A17", ink = "#F3EFE9";
  const soft = "#A09890", accent = "#FF5A1F", line = "rgba(243,239,233,0.14)";
  return (
    <div style={{ minHeight: "100vh", background: ground, color: ink, position: "relative", display: "flex", fontFamily: "Inter, sans-serif" }}>
      <Tag color={soft}>Direction 1 — The whole shelf</Tag>

      {/* the rail */}
      <aside style={{ width: 64, flex: "0 0 64px", borderRight: `1px solid ${line}`, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", padding: "28px 0 24px" }}>
        <span style={{ writingMode: "vertical-rl", font: "500 12px/1 Archivo, sans-serif", letterSpacing: "0.34em", textTransform: "uppercase", color: ink }}>
          Shopfront
        </span>
        <span style={{ writingMode: "vertical-rl", font: `500 12px/1 Archivo, sans-serif`, letterSpacing: "0.2em", color: accent, ...tab }}>
          04
        </span>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ padding: "52px 0 40px 56px", maxWidth: 1000 }}>
          <p style={{ margin: 0, font: "500 11px/1 Inter, sans-serif", letterSpacing: "0.16em", textTransform: "uppercase", color: accent }}>
            Four items in the shop
          </p>
          <h1 style={{ margin: "18px 0 0", font: "400 44px/1.05 Archivo, sans-serif", letterSpacing: "-0.02em", maxWidth: "18ch" }}>
            Everything we have, with the price on it.
          </h1>
          <p style={{ margin: "16px 0 0", font: "400 16px/1.55 Inter, sans-serif", color: soft, maxWidth: "52ch" }}>
            The shop adds each item itself. No cart, no forms — just the list, as it stands today.
          </p>
        </header>

        {/* goods, flush to the right edge of the window */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: `1px solid ${line}`, marginLeft: 56 }}>
          {ITEMS.map((it, i) => (
            <article key={it.name} style={{ background: surface, borderRight: i < 3 ? `1px solid ${line}` : "none", display: "flex", flexDirection: "column", minHeight: 420 }}>
              <div style={{ flex: 1, padding: 26, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0 }}>
                <img src={it.img} alt={it.name} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }} />
              </div>
              <div style={{ padding: "0 22px 24px" }}>
                <h2 style={{ margin: 0, font: "500 17px/1.2 Archivo, sans-serif", letterSpacing: "-0.01em" }}>{it.name}</h2>
                <p style={{ margin: "6px 0 14px", font: "400 13px/1.45 Inter, sans-serif", color: soft }}>{it.note}</p>
                <p style={{ margin: 0, font: "500 28px/1 Archivo, sans-serif", letterSpacing: "-0.02em", ...tab }}>
                  {it.price}<span style={{ fontSize: 16, color: accent, marginLeft: 4 }}>₫</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2 */
/* The window — warm paper, Fraunces display, a split with one left edge and
   the shelf photograph full-bleed down the right. Device: a white caption
   block crossing the photograph's left edge. */

export function DirectionWindow() {
  const ground = "#F4F1EA", surface = "#FFFFFF", ink = "#15171A";
  const soft = "#5C6166", accent = "#14523C", line = "rgba(21,23,26,0.12)";
  const three = ITEMS.slice(0, 3);
  return (
    <div style={{ minHeight: "100vh", background: ground, color: ink, position: "relative", display: "flex", fontFamily: "Inter, sans-serif" }}>
      <Tag color={soft}>Direction 2 — The window</Tag>

      <div style={{ flex: "0 0 62%", padding: "64px 56px 56px 72px", display: "flex", flexDirection: "column" }}>
        <p style={{ margin: 0, font: "500 11px/1 Inter, sans-serif", letterSpacing: "0.12em", textTransform: "uppercase", color: accent }}>
          Shopfront — the shop's own page
        </p>
        <h1 style={{ margin: "20px 0 0", font: "400 56px/1.05 Fraunces, serif", letterSpacing: "-0.015em", maxWidth: "13ch" }}>
          A small shop, a short list.
        </h1>
        <p style={{ margin: "18px 0 0", font: "400 17px/1.55 Inter, sans-serif", color: soft, maxWidth: "46ch" }}>
          Everything on this page was put here by the shop. It is short on purpose, and it is current.
        </p>

        <div style={{ marginTop: "auto", paddingTop: 44, borderTop: `1px solid ${line}`, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 26 }}>
          {three.map((it) => (
            <article key={it.name}>
              <div style={{ background: surface, aspectRatio: "3 / 4", display: "flex", alignItems: "center", justifyContent: "center", padding: 22, border: `1px solid ${line}` }}>
                <img src={it.img} alt={it.name} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center 55%" }} />
              </div>
              <h2 style={{ margin: "14px 0 0", font: "400 19px/1.2 Fraunces, serif", letterSpacing: "-0.01em" }}>{it.name}</h2>
              <p style={{ margin: "4px 0 8px", font: "400 13px/1.45 Inter, sans-serif", color: soft }}>{it.note}</p>
              <p style={{ margin: 0, font: "500 20px/1 Inter, sans-serif", color: accent, ...tab }}>{it.price} ₫</p>
            </article>
          ))}
        </div>
      </div>

      {/* the photograph, bleeding top to bottom off the right edge */}
      <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
        <img
          src="/images/shelf.jpg"
          alt="The shop's shelves"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "38% 30%" }}
        />
        <div style={{ position: "absolute", left: -64, bottom: 72, background: ground, borderLeft: `2px solid ${accent}`, padding: "16px 22px", maxWidth: 290 }}>
          <p style={{ margin: 0, font: "500 11px/1 Inter, sans-serif", letterSpacing: "0.12em", textTransform: "uppercase", color: accent }}>
            Owner sign-in
          </p>
          <p style={{ margin: "8px 0 0", font: "400 14px/1.5 Inter, sans-serif", color: ink }}>
            One login. New items go to the Telegram group the moment they are added.
          </p>
        </div>
      </div>
    </div>
  );
}
