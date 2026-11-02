# Moodboard — Shopfront

The shop gave no name. **Shopfront** is a short working name, editable in the Studio;
the project's listing title ("Tiny product catalogue for one") is not on any screen.

## What this is

One small shop's own catalogue, on a page the shop owns. Three screens: the public
list, the sign-in, and the CMS behind it. The people who arrive already know the
shop — they walked past it, or the link came to them in a message — so the home page
is not persuading a stranger, it is answering *what have you got and what does it
cost*. The owner's job is one screen long: add an item, and the Telegram group hears
about it.

What it is not: a SaaS landing page selling a catalogue tool to other shops. The
three sites PM read (CatalogMint, Quicktalog, Apna Showcase) are all exactly that,
and the thing this shop is buying is the opposite of it.

## The sites I watched

| Site | Built with (look_at) | What I take |
|---|---|---|
| [land-book.com](https://land-book.com/) — gallery | Inter, 2 sticky elements, no motion library | The card that gives its whole area to the picture and sets the metadata small underneath — no framed thumbnail floating in white. |
| [skallstudio.com](https://skallstudio.com/) — featured product site | HalTimezone (proprietary), 21 sticky elements, 2 videos | The hero: one atmospheric photograph running the full height of the window beside a narrow type column, and product rows whose name and price share a baseline under a hairline. Its face is proprietary → **Fraunces** for display. |
| [are.na](https://www.are.na/) | "areal", Next.js, no scroll library | The hairline rule system and small-caps meta labels: rows of records with nothing decorating them. This is the CMS table's manner. |
| [cal.com](https://cal.com/) | Framer Motion, Cal Sans + Inter | How an application screen reads next to a marketing one: dense panels, a left-hand menu, and a short confirmation line after an action rather than a modal. |
| [catalogmint.com](https://www.catalogmint.com/) — the trade | DM Sans, 8961px page, no motion | Only the expectation: photo, name, description, price on every item. Explicitly **not** its 9000px landing page, its pricing table or its centred hero. |
| [quicktalog.app](https://www.quicktalog.app/) — the trade | Inter Tight + Plus Jakarta Sans, 10325px page | Same: the list of items is the product. Its "AI builds your catalogue in minutes" pitch is for shops renting a platform, and this shop is not. |

## Direction

**Warm paper, one green, goods shown properly.** The ground is `#F4F1EA` — the paper a
small shop prints a price card on — with white only where a surface has to lift off
it, near-black ink `#15171A`, and a single deep green `#14523C` carrying every action
and every accent. Display is **Fraunces** (OFL), body **Inter**: this takes the house
style's one unlock, an editorial serif, because the whole bet of this direction is
that the shop sells on taste — *we chose these things* — and a grotesk says nothing
about chosen goods. It is carried through every heading on every screen, the CMS
included. The scale is a catalogue's, not a landing page's: h1 56px, h2 34px, prices
20px tabular, labels 11px small-caps at 0.12em — the first screen has to carry goods
and prices, so the type does not take the 76px ceiling. The grid is asymmetric: a
type column on the left edge of the home page and a photograph of the shelf bleeding
off the right, top of window to bottom, no margin; below it, a cut-out grid where
every product sits on the same paper at the same distance, so twelve things
photographed in twelve rooms read as one shelf. Motion is a short load moment — the
label, headline and supporting line rising 16px over 0.6s, then the three window
frames in sequence — light reveals as sections enter, and a hover that lifts a card's
picture a few pixels. Native scrolling; nothing pinned.

## Tried and rejected

- A category rail across the top of the home page: the owner has not said whether
  there are categories at all. The field is in the schema and empty instead.
- A dark ground for the CMS so it reads as "the back of the shop": two palettes is
  two designs. One paper, both halves.
- An enquiry button under each product: the owner was shown it and left it out.

## COMMITMENTS

- On the home page from 1024px up, the shelf photograph bleeds off the right edge of the viewport, top edge to bottom edge, with no margin and no rounded corner.
- The hero's type column stops short of that photograph on a 1px hairline rule, and every element in it — label, headline, line, the three frames — is on that one left edge.
- Three tall product frames sit inside the hero with their names and prices, so the first screen carries goods, not only a headline.
- Prices are 20px tabular figures, right-aligned in their own column so the digits line up down the whole catalogue and the whole CMS table.
- Every product picture is a cut-out on the card's own paper — one ground, one 1/1 frame, one distance — never a photograph of a room inside a product tile.
- Section headings sit in the left margin beside their text, not above it, from 1024px up.
- Fraunces is the display face on every screen including the CMS — the one house-style rule taken off, carried through the site.
- Adding a product in the CMS writes a confirmation row naming the Telegram group, the product name and its price, in the shop's green.
