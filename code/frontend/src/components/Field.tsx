import type { ReactNode } from "react";

/**
 * A labelled field, in the site's own controls — the theme's border, ink and
 * radius, never the operating system's. Used by the sign-in and by the CMS
 * form, so both screens take the same manner.
 */
export default function Field({ id, label, hint, children }: {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label text-ink-soft">{label}</label>
      {children}
      {hint && <p className="text-sm text-ink-soft">{hint}</p>}
    </div>
  );
}

/** The one set of input classes every field on the site uses. */
export const fieldClass =
  "w-full appearance-none rounded-[var(--radius-sm)] border border-field bg-surface px-3 py-2.5 text-ink outline-none placeholder:text-ink-soft focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30";
