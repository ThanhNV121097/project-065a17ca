import { motion, useReducedMotion } from "framer-motion";
import { T, useContent } from "../editable";
import { useCollection } from "../data";
import { Picture } from "../picture";
import ProductCard, { type Product } from "../components/ProductCard";
import ProductImage from "../components/ProductImage";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { formatPrice } from "../lib/format";
import { useAdded } from "../lib/mock/products";

/**
 * The catalogue. The whole public site: what the shop has, and what it costs.
 *
 * The first screen is the window — a type column on the left edge with three
 * tall product frames under it, and one photograph of the shelf bleeding off
 * the right of the viewport, top edge to bottom edge. Below it the rest of
 * the goods, a page at a time.
 */
export default function Home() {
  const still = useReducedMotion();
  const shelfAlt = useContent("hero.photo_alt");
  const added = useAdded();
  const { items, total, hasMore, loading, loadMore } = useCollection<Product & { description?: string }>(
    "products",
    { pageSize: 8 },
  );

  // Products the owner added in the CMS this session stand ahead of the
  // catalogue's own records, so adding one is visible on the public page.
  const all = [...(added as unknown as Product[]), ...items];
  const window3 = all.slice(0, 3);
  const rest = all.slice(3);
  const count = total + added.length;

  const rise = (delay: number) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: Math.min(delay, 0.24), ease: [0.2, 0.7, 0.2, 1] as const },
        };

  return (
    <>
      {/* The window. The photograph is a child of the viewport's right half
          and takes its full height; the type column stops on a hairline. */}
      <section className="lg:grid lg:grid-cols-[minmax(0,1fr)_42vw] lg:items-stretch">
        <div className="px-[var(--gutter)] pb-14 pt-4 lg:border-r lg:border-line lg:pb-20">
          <motion.p {...rise(0)} className="label text-accent">
            <T k="hero.eyebrow" />
          </motion.p>
          <motion.h1 {...rise(0.08)} className="mt-4 max-w-[18ch] text-[length:var(--size-h1)]">
            <T k="hero.headline" />
          </motion.h1>
          <motion.p {...rise(0.16)} className="mt-5 max-w-[46ch] text-ink-soft">
            <T k="hero.sub" />
          </motion.p>

          <motion.ul {...rise(0.24)} className="mt-10 grid grid-cols-3 gap-4 lg:gap-6">
            {window3.map((p, i) => (
              <li key={p.id} data-record={`products:${p.id}`} className="flex flex-col">
                <ProductImage src={p.image} alt={p.name} aspect="4/5" eager={i === 0}
                  slot={`/images/products/${p.id}.png`} />
                <h2 className="mt-3 text-[0.9375rem] font-body leading-snug">{p.name}</h2>
                <span className="tabular mt-1 text-[length:var(--size-price)]">{formatPrice(p.price)}</span>
              </li>
            ))}
          </motion.ul>

          <motion.p {...rise(0.32)} data-testid="catalogue-count"
            className="mt-10 flex items-center gap-2 text-sm text-ink-soft">
            <Icon name="store" size={16} />
            <span>{count} <T k="catalogue.count_suffix" /></span>
          </motion.p>
        </div>

        <div className="relative mt-10 h-[46vh] lg:mt-0 lg:h-auto">
          <Picture src="/images/shelf.jpg" alt={shelfAlt} loading="eager"
            width={853} height={1280}
            className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>

      {/* The rest of the shelf. The heading sits in the left margin beside
          its text from 1024px up. */}
      <section className="mt-20 px-[var(--gutter)] lg:mt-28">
        <Reveal as="header" className="border-t border-line pt-6 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10">
          <T k="catalogue.label" as="p" className="label text-ink-soft" />
          <div>
            <T k="catalogue.heading" as="h2" className="max-w-[24ch] text-[length:var(--size-h2)]" />
            <T k="catalogue.sub" as="p" className="mt-3 max-w-[52ch] text-ink-soft" />
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {rest.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 4) * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>

        {loading && <p className="mt-10 text-sm text-ink-soft"><T k="catalogue.loading" /></p>}
        {hasMore && !loading && (
          <button type="button" data-testid="show-more" onClick={loadMore}
            className="mt-12 inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-ink px-5 py-2.5 text-sm hover:bg-ink hover:text-ground">
            <T k="catalogue.more" />
            <Icon name="expand" size={16} />
          </button>
        )}
      </section>
    </>
  );
}
