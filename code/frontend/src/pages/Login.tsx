import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { T, useContent } from "../editable";
import { Picture } from "../picture";
import Field, { fieldClass } from "../components/Field";
import Icon from "../components/Icon";
import { signIn } from "../lib/session";
import { usePageMeta } from "../seo";

/**
 * The shop's own door. One form, and beside it the same shelf photograph the
 * catalogue opens on — so the sign-in is a screen of this shop rather than a
 * form floating in white. Nobody but the owner and the admins has an account,
 * which the page says instead of offering a sign-up.
 */
export default function Login() {
  usePageMeta("pages.login.title", "pages.login.description");
  const alt = useContent("hero.photo_alt");
  const emailLabel = useContent("pages.login.email");
  const passwordLabel = useContent("pages.login.password");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const invalid = useContent("pages.login.error");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError(invalid);
      return;
    }
    setError("");
    signIn(email.trim(), email.trim().split("@")[0], "owner");
    navigate("/cms");
  }

  return (
    <section className="lg:grid lg:min-h-[calc(100vh-var(--header-h)-6rem)] lg:grid-cols-[minmax(0,1fr)_42vw] lg:items-stretch">
      <div className="px-[var(--gutter)] pb-16 pt-4 lg:border-r lg:border-line">
        <T k="pages.login.label" as="p" className="label text-accent" />
        <T k="pages.login.heading" as="h1" className="mt-4 max-w-[20ch] text-[length:var(--size-h1)]" />
        <T k="pages.login.sub" as="p" className="mt-5 max-w-[44ch] text-ink-soft" />

        <form onSubmit={submit} className="mt-10 flex max-w-[26rem] flex-col gap-5">
          <Field id="email" label={emailLabel}>
            <input id="email" name="email" type="email" autoComplete="username" value={email}
              onChange={(e) => setEmail(e.target.value)} className={fieldClass} />
          </Field>
          <Field id="password" label={passwordLabel}>
            <input id="password" name="password" type="password" autoComplete="current-password" value={password}
              onChange={(e) => setPassword(e.target.value)} className={fieldClass} />
          </Field>
          {error && (
            <p role="alert" data-testid="login-error" className="flex items-center gap-2 text-sm text-ink">
              <Icon name="alert" size={16} />
              <span>{error}</span>
            </p>
          )}
          <button type="submit" data-testid="sign-in"
            className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-accent px-5 py-3 text-accent-ink hover:opacity-90">
            <span className="whitespace-nowrap"><T k="pages.login.submit" /></span>
          </button>
        </form>

        <p className="mt-8 flex items-start gap-2 border-t border-line pt-6 text-sm text-ink-soft">
          <Icon name="lock" size={16} className="mt-0.5" />
          <T k="pages.login.no_signup" as="span" className="max-w-[46ch]" />
        </p>
        <Link to="/" className="mt-4 inline-flex items-center gap-2 text-sm hover:text-accent">
          <Icon name="back" size={16} />
          <T k="pages.login.back" />
        </Link>
      </div>

      <div className="relative mt-10 h-[32vh] lg:mt-0 lg:h-auto">
        <Picture src="/images/shelf.jpg" alt={alt} width={853} height={1280}
          className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </section>
  );
}
