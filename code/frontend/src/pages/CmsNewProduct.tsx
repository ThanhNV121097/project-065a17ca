import { useState } from "react";
import { Link } from "react-router-dom";
import CmsShell from "../components/CmsShell";
import Field, { fieldClass } from "../components/Field";
import Icon from "../components/Icon";
import ProductImage from "../components/ProductImage";
import { useContent } from "../editable";
import { useCollection } from "../data";
import { formatPrice } from "../lib/format";
import { add } from "../lib/mock/products";
import { announce, type Alert } from "../lib/mock/telegram";
import { usePageMeta } from "../seo";

interface AlertTarget {
  id: string;
  channel: string;
  target?: string;
  note?: string;
}

/**
 * Adding a product: the four things the owner asked for — photo, name, short
 * description, price — and the one consequence, which is that the Telegram
 * group is told. The group is named on the form before the owner presses the
 * button, and the message that went out is shown afterwards, word for word.
 */
export default function CmsNewProduct() {
  usePageMeta("pages.cmsnew.title", "pages.cmsnew.description");
  const title = useContent("cms.add.title");
  const nameLabel = useContent("cms.add.name");
  const descriptionLabel = useContent("cms.add.description");
  const priceLabel = useContent("cms.add.price");
  const priceHint = useContent("cms.add.price_hint");
  const photoLabel = useContent("cms.add.photo");
  const photoHint = useContent("cms.add.photo_hint");
  const required = useContent("cms.add.required");
  const sentLead = useContent("cms.add.sent");
  const previewLabel = useContent("cms.add.preview");
  const alertsHeading = useContent("cms.add.alerts_heading");
  const noTarget = useContent("cms.add.no_target");
  const submitLabel = useContent("cms.add.submit");
  const backLabel = useContent("cms.add.back");

  const { items: targets } = useCollection<AlertTarget>("alerts", { pageSize: 5 });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState<Alert | null>(null);

  const amount = Number(price.replace(/[^\d]/g, ""));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !Number.isFinite(amount) || amount <= 0) {
      setError(required);
      return;
    }
    setError("");
    const record = add({ name: name.trim(), description: description.trim(), price: amount, image: photo });
    setSent(await announce(record.name, record.price));
    setName("");
    setDescription("");
    setPrice("");
    setPhoto("");
  }

  return (
    <CmsShell title={title}>
      {sent && (
        <p role="status" data-testid="telegram-sent"
          className="flex items-start gap-2 rounded-[var(--radius-sm)] border border-accent bg-surface px-3 py-2.5 text-sm text-accent">
          <Icon name="notify" size={16} className="mt-0.5" />
          <span>{sentLead} <span className="tabular">{sent.text}</span></span>
        </p>
      )}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
        <form onSubmit={submit} className="flex flex-col gap-5">
          <Field id="name" label={nameLabel}>
            <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className={fieldClass} />
          </Field>
          <Field id="description" label={descriptionLabel}>
            <textarea id="description" name="description" rows={3} value={description}
              onChange={(e) => setDescription(e.target.value)} className={fieldClass} />
          </Field>
          <Field id="price" label={priceLabel} hint={priceHint}>
            <input id="price" name="price" inputMode="numeric" value={price}
              onChange={(e) => setPrice(e.target.value)} className={`${fieldClass} tabular text-right`} />
          </Field>
          <Field id="photo" label={photoLabel} hint={photoHint}>
            <input id="photo" name="photo" value={photo} onChange={(e) => setPhoto(e.target.value)}
              placeholder="/images/products/…" className={fieldClass} />
          </Field>

          {error && (
            <p role="alert" data-testid="add-error" className="flex items-center gap-2 text-sm text-ink">
              <Icon name="alert" size={16} />
              <span>{error}</span>
            </p>
          )}

          <button type="submit" data-testid="add-product"
            className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-accent px-5 py-3 text-accent-ink hover:opacity-90">
            <Icon name="plus" size={18} />
            <span className="whitespace-nowrap">{submitLabel}</span>
          </button>

          <Link to="/cms" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-accent">
            <Icon name="back" size={16} />
            <span>{backLabel}</span>
          </Link>
        </form>

        <div className="flex flex-col gap-8">
          <div>
            <p className="label text-ink-soft">{previewLabel}</p>
            <div className="mt-4 max-w-[18rem]">
              <ProductImage src={photo} alt={name || photoLabel} aspect="1/1"
                slot="/images/products/new.png" caption={photoHint} />
              <h2 className="mt-4 text-xl">{name || nameLabel}</h2>
              <p className="mt-1 text-[0.9375rem] text-ink-soft">{description || descriptionLabel}</p>
              <p className="tabular mt-3 border-t border-line pt-3 text-right text-[length:var(--size-price)]">
                {amount > 0 ? formatPrice(amount) : formatPrice(0)}
              </p>
            </div>
          </div>

          <div className="border-t border-line pt-6">
            <p className="label text-ink-soft">{alertsHeading}</p>
            <ul className="mt-3 flex flex-col gap-3 text-sm">
              {targets.map((a) => (
                <li key={a.id} data-record={`alerts:${a.id}`} className="flex items-start gap-2">
                  <Icon name="notify" size={16} className="mt-0.5 text-accent" />
                  <span>
                    <span className="text-ink">{a.channel}</span>
                    {" — "}
                    <span className={a.target ? "text-ink" : "text-ink-soft"}>{a.target || noTarget}</span>
                    {a.note && <span className="block text-ink-soft">{a.note}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </CmsShell>
  );
}
