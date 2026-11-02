import ProductImage from "./ProductImage";
import { formatPrice } from "../lib/format";
import { useContent } from "../editable";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  sold_out?: boolean;
}

/**
 * One product on the catalogue: its picture on the shop's own tile, its name,
 * its short description, and the price in tabular figures right-aligned under
 * a hairline, so the digits line up down the whole grid.
 */
export default function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const soldOut = useContent("catalogue.sold_out");
  return (
    <article data-record={`products:${product.id}`} className="group flex h-full flex-col">
      <div className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:-translate-y-1">
        <ProductImage src={product.image} alt={product.name} aspect="1/1" eager={eager}
          slot={`/images/products/${product.id}.png`} />
      </div>
      <h3 className="mt-4 text-xl">{product.name}</h3>
      {product.description && <p className="mt-1 text-[0.9375rem] text-ink-soft">{product.description}</p>}
      <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-line pt-3">
        <span className="label text-ink-soft">{product.sold_out ? soldOut : "\u00a0"}</span>
        <span className="tabular text-[length:var(--size-price)] text-ink">{formatPrice(product.price)}</span>
      </div>
    </article>
  );
}
