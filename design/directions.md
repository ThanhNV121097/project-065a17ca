# Directions — the shop's own catalogue

Two readings of this business. The owner picks one; the next turn builds it.

Working name on the page: **Shopfront**. The owner gave no name and the brief names
no business, so this is a short fitting one, editable in the Studio. The project's
listing title ("Tiny product catalogue for one") is a working title and is not on
any screen.

## The reading

This is one small shop that wants its goods on a page it owns, instead of renting a
monthly catalogue platform. Who arrives: people who already know the shop — they
walked past it, or were sent the link in a message — so the page is not persuading a
stranger to care, it is answering "what have you got and what does it cost". They
decide fast and mostly on a phone; they do not browse for inspiration, and there is
no cart, no enquiry form and no search to slow them down, by the owner's choice. The
place sells on trust and on being current: the shop itself adds every item, by hand,
and the Telegram group hears about it the minute it is added — nothing between the
shop and its own list. What it is NOT: a brand campaign, a lookbook, a marketplace,
or a SaaS landing page selling the tool to other shops. The visitor's whole job is
goods, names, prices; the owner's whole job is adding one.

Both directions therefore put real goods and real prices on the first screen. They
disagree about one thing only: whether this shop's edge is **everything visible at
once** or **a few things shown properly**.

## The whole shelf

- **Suits you if:** your customers already know you and just want to see what's in
  today and what it costs — you'd rather show them all of it on one screen than walk
  them through it.
- **Palette (dark):** `--ground #121110` · `--surface #1C1A17` · `--ink #F3EFE9` ·
  `--ink-soft #A09890` · `--accent #FF5A1F` · `--accent-ink #140F0B` ·
  `--line rgba(243,239,233,0.14)` (field edge `rgba(243,239,233,0.42)`).
  `color-scheme: dark`.
- **Faces:** display **Archivo** (free, OFL — a grotesk with square counters and real
  character at small sizes, which is what a price board needs), body **Inter**.
- **Scale at 1440:** h1 44px / leading 1.05 / tracking −0.02em; h2 30px; price 28px
  tabular; labels 11px small-caps, 0.14em tracking. Deliberately short of the 76px
  ceiling: this screen has to carry four goods, four prices and a reason to trust the
  shop, and a 72px headline would push all of it under the fold.
- **First screen:** no hero photograph at all — a wall of goods on near-black, four
  cut-out products edge to edge in their tiles with the price set large under each
  name, the headline and one line of trust stacked on the left above them.
- **The one device:** the shop name set vertically up the left edge against a
  hairline rule, with the item count at the foot of the same rule.

## The window

- **Suits you if:** you'd rather people see the shop than the list — the thing you
  sell on is how the goods look and that you chose them, and a short, well-shown
  handful says more about you than a full shelf.
- **Palette (light):** `--ground #F4F1EA` · `--surface #FFFFFF` · `--ink #15171A` ·
  `--ink-soft #5C6166` · `--accent #14523C` · `--accent-ink #F4F1EA` ·
  `--line rgba(21,23,26,0.12)` (field edge `rgba(21,23,26,0.45)`).
  `color-scheme: light`.
- **Faces:** display **Fraunces**, body **Inter**. *This takes the single house-style
  unlock: an editorial serif for the display face, because this direction's whole bet
  is that the shop sells on taste and a grotesk says nothing about chosen goods. It
  is carried through every heading on every screen of the site, including the CMS.*
- **Scale at 1440:** h1 56px / leading 1.05 / tracking −0.015em; h2 34px; price 20px
  tabular; labels 11px small-caps, 0.12em tracking.
- **First screen:** a split with one main edge on the left — label, headline, one
  supporting line and three tall product frames with names and prices — and a single
  atmospheric photograph of the shelf running full-bleed down the right of the
  window, top edge to bottom edge, no margin.
- **The one device:** the photograph breaks the page's container and bleeds off the
  right edge; the type column stops short of it on a hairline.

## They are not shades of one idea

| | The whole shelf | The window |
|---|---|---|
| Ground | near-black | warm paper |
| Face | Archivo, grotesk | Fraunces, editorial serif |
| Hero | none — goods are the hero | one full-bleed photograph |
| Density | four goods, prices large | three goods, shown large |
| Accent | hot orange | deep green |

## Data on these pages

The owner supplied no product list, no photographs and no currency, so the four items
and their prices are **samples** — a small homeware shop's goods — there so the
catalogue can be judged with something in it. Prices are shown in VND (`180.000 ₫`)
as the owner's market's default; the Studio asks them for the real currency. Product
photographs are stock, cut out on a transparent ground, credited in `credits.json`.
