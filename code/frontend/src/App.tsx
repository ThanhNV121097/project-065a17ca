import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { T, useContent } from "./editable";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CmsProducts from "./pages/CmsProducts";
import CmsNewProduct from "./pages/CmsNewProduct";
import Logo from "./components/Logo";
import MenuToggle from "./components/MenuToggle";
import MobileMenu from "./components/MobileMenu";
import PhotoCredits from "./components/PhotoCredits";
import Icon from "./components/Icon";
import { PageViews } from "./site";
import { useSession } from "./lib/session";

/**
 * Shopfront. Three screens the owner asked for: the public catalogue, the
 * sign-in, and the CMS behind it — the CMS in its own application shell, with
 * no marketing header and no footer.
 */
export default function App() {
  return (
    <>
      <PageViews />
      <Routes>
        <Route path="/cms" element={<CmsProducts />} />
        <Route path="/cms/new" element={<CmsNewProduct />} />
        <Route path="*" element={<Shell />} />
      </Routes>
    </>
  );
}

function Shell() {
  const name = useContent("site.name");
  const session = useSession();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const to = session ? "/cms" : "/login";
  return (
    <div className="flex min-h-screen flex-col bg-ground text-ink font-body">
      <header className="relative z-50 flex items-center justify-between px-[var(--gutter)] py-5">
        <Link to="/" aria-label={name}><Logo /></Link>
        <nav className="hidden items-center gap-6 text-sm lg:flex">
          <Link to="/" className="hover:text-accent"><T k="nav.links.0.label" /></Link>
          <Link to={to} data-testid="header-cms"
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-ink px-4 py-2 hover:bg-ink hover:text-ground">
            <Icon name="lock" size={16} />
            <span className="whitespace-nowrap"><T k={session ? "nav.cms.label" : "nav.cta.label"} /></span>
          </Link>
        </nav>
        <div className="flex items-center gap-1 lg:hidden">
          <MenuToggle open={open} onToggle={() => setOpen((o) => !o)} />
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)}>
        <Link to="/" className="text-2xl font-display"><T k="nav.links.0.label" /></Link>
        <Link to={to} className="inline-flex items-center gap-2 text-2xl font-display">
          <Icon name="lock" size={20} />
          <T k={session ? "nav.cms.label" : "nav.cta.label"} />
        </Link>
      </MobileMenu>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="mt-24 border-t border-line px-[var(--gutter)] py-10 text-sm text-ink-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2">
            <Logo />
            <T k="footer.line" as="p" className="max-w-[42ch]" />
          </div>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <Icon name="mail" size={16} />
              <T k="contact.email" as="a" href={`mailto:${useContent("contact.email")}`} className="hover:text-accent" />
            </li>
            <li className="flex items-center gap-2">
              <Icon name="lock" size={16} />
              <Link to={to} className="hover:text-accent"><T k={session ? "nav.cms.label" : "nav.cta.label"} /></Link>
            </li>
          </ul>
        </div>
        <PhotoCredits className="mt-8" />
      </footer>
    </div>
  );
}
