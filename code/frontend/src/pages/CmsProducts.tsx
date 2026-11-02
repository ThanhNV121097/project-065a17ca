import { Link } from "react-router-dom";
import CmsShell from "../components/CmsShell";
import DataTable from "../components/DataTable";
import TableFilters, { SearchBox, FilterSelect, Badge } from "../components/TableFilters";
import Icon from "../components/Icon";
import { useContent } from "../editable";
import { useCollection } from "../data";
import { useTableQuery } from "../lib/table";
import { formatDate, formatPrice } from "../lib/format";
import { useAdded } from "../lib/mock/products";
import { announced } from "../lib/mock/telegram";
import { usePageMeta } from "../seo";

interface Row {
  id: string;
  name: string;
  description?: string;
  price: number;
  sold_out?: boolean;
  added?: string;
}

/**
 * The shop's products, as the owner reads them: one row each, sorted by what
 * they ask of it — newest first by default, by price when they want to check
 * the shelf against itself. The list is the first of the CMS's two things.
 */
export default function CmsProducts() {
  usePageMeta("pages.cms.title", "pages.cms.description");
  const t = useTableQuery({ size: 20, sort: "-added" });
  const added = useAdded();
  const title = useContent("cms.products.title");
  const search = useContent("cms.products.search");
  const stock = useContent("cms.products.stock");
  const onSale = useContent("cms.products.on_sale");
  const soldOut = useContent("catalogue.sold_out");
  const addLabel = useContent("cms.nav.add");
  const empty = useContent("cms.products.empty");
  const caption = useContent("cms.products.caption");
  const sentLabel = useContent("cms.products.last_sent");
  const colName = useContent("cms.products.col_name");
  const colDescription = useContent("cms.products.col_description");
  const colPrice = useContent("cms.products.col_price");
  const colStatus = useContent("cms.products.col_status");
  const colAdded = useContent("cms.products.col_added");

  const { items, total, pages, loading } = useCollection<Row>("products", {
    page: t.page,
    pageSize: t.size,
    sort: t.sort,
    q: t.q,
    search: ["name", "description"],
    where: { sold_out: t.get("stock") === "sold" ? true : t.get("stock") === "selling" ? false : undefined },
  });

  // What was added in this browser this session stands at the top of page 1.
  const own = t.page === 1 && !t.filtering ? (added as unknown as Row[]) : [];
  const rows = [...own, ...items];
  const alerts = announced();

  return (
    <CmsShell
      title={title}
      actions={
        <Link to="/cms/new" data-testid="go-add"
          className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-accent px-3 py-1.5 text-sm text-accent-ink hover:opacity-90">
          <Icon name="plus" size={16} />
          <span className="whitespace-nowrap">{addLabel}</span>
        </Link>
      }
    >
      {alerts.length > 0 && (
        <p data-testid="cms-last-alert" className="flex items-center gap-2 rounded-[var(--radius-sm)] border border-accent px-3 py-2 text-sm text-accent">
          <Icon name="notify" size={16} />
          <span>{sentLabel} {alerts[0].text}</span>
        </p>
      )}

      <TableFilters onClear={t.clear}>
        <SearchBox value={t.q} onChange={t.setQ} placeholder={search} />
        <FilterSelect label={stock} value={t.get("stock")} onChange={(v) => t.set("stock", v)}
          options={[["selling", onSale], ["sold", soldOut]]} />
      </TableFilters>

      <div data-testid="cms-total" className="sr-only">{`1–${rows.length} of ${total + own.length}`}</div>

      <DataTable<Row>
        caption={caption}
        exportName="products"
        columns={[
          { key: "name", label: colName, sortable: true },
          { key: "description", label: colDescription, secondary: true },
          {
            key: "price",
            label: colPrice,
            sortable: true,
            align: "right",
            render: (r) => <span className="tabular">{formatPrice(r.price)}</span>,
          },
          {
            key: "sold_out",
            label: colStatus,
            render: (r) => (
              <Badge tone={r.sold_out ? "warn" : "good"}>
                <span className="inline-flex items-center gap-1">
                  <Icon name={r.sold_out ? "alert" : "check"} size={14} />
                  {r.sold_out ? soldOut : onSale}
                </span>
              </Badge>
            ),
          },
          {
            key: "added",
            label: colAdded,
            sortable: true,
            align: "right",
            secondary: true,
            render: (r) => <span className="tabular">{formatDate(r.added)}</span>,
          },
        ]}
        rows={rows}
        rowKey={(r) => r.id}
        total={total + own.length}
        page={t.page}
        pages={pages}
        size={t.size}
        sort={t.sort}
        onSort={t.toggleSort}
        onPage={t.setPage}
        onSize={t.setSize}
        loading={loading}
        empty={<span>{empty}</span>}
      />
    </CmsShell>
  );
}
