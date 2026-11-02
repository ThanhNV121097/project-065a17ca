import type { ReactNode } from "react";
import { Link, Navigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import LogoMark from "./LogoMark";
import Icon from "./Icon";
import { useContent } from "../editable";
import { signOut, useSession } from "../lib/session";
import { useDemo } from "../lib/demo";

/**
 * The CMS's shell: the dashboard layout with this shop's two areas, and the
 * gate in front of it. Nobody who is not signed in reaches either page —
 * hiding the menu link would leave the address typeable, so the gate is here
 * and both pages go through it.
 *
 * While the design is being drawn or walked (useDemo) the pages render, so
 * the owner and the tester see the CMS rather than the sign-in.
 */
export default function CmsShell({ title, actions, children }: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const session = useSession();
  const demo = useDemo();
  const name = useContent("site.name");
  const products = useContent("cms.nav.products");
  const add = useContent("cms.nav.add");
  const heading = useContent("cms.nav.heading");
  const out = useContent("cms.sign_out");
  const view = useContent("cms.view_site");

  if (!session && !demo) return <Navigate to="/login" replace />;

  return (
    <DashboardLayout
      title={title}
      brand={
        <Link to="/" className="inline-flex items-center gap-2 font-display text-base">
          <LogoMark className="h-6 w-6" />
          <span>{name}</span>
        </Link>
      }
      nav={[
        { heading, items: [{ to: "/cms", label: products }, { to: "/cms/new", label: add }] },
      ]}
      actions={
        <div className="flex items-center gap-2">
          {actions}
          <Link to="/" className="hidden items-center gap-2 rounded-[var(--radius-sm)] border border-line px-3 py-1.5 text-sm hover:bg-ground sm:inline-flex">
            <Icon name="web" size={16} />
            <span className="whitespace-nowrap">{view}</span>
          </Link>
          <button type="button" data-testid="sign-out" onClick={signOut}
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-line px-3 py-1.5 text-sm hover:bg-ground">
            <Icon name="logout" size={16} />
            <span className="whitespace-nowrap">{out}</span>
          </button>
        </div>
      }
    >
      {children}
    </DashboardLayout>
  );
}
