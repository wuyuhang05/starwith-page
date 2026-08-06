"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "./LocaleProvider";

export function SiteHeader() {
  const { lang, copy, setLanguage, href } = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  const navigation = [
    ["/research", copy.nav.research],
    ["/team", copy.nav.team],
    ["/join", copy.nav.join],
  ] as const;

  return (
    <header className="site-header">
      <Link className="brand" href={href("/")} aria-label={copy.common.home}>
        <span className="brand-cn">星曜同谐</span>
        <span className="brand-en">STARWITH</span>
      </Link>
      <button
        className="menu-button"
        aria-label={copy.nav.menu}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
      <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label={copy.nav.primary}>
        {navigation.map(([path, label]) => (
          <Link className={pathname === path ? "active" : ""} href={href(path)} key={path}>
            {label}
          </Link>
        ))}
        <div className="language-switch" aria-label={copy.nav.language}>
          <button className={lang === "zh" ? "selected" : ""} onClick={() => setLanguage("zh")}>中</button>
          <span>/</span>
          <button className={lang === "en" ? "selected" : ""} onClick={() => setLanguage("en")}>EN</button>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const { copy, href } = useLocale();
  return (
    <footer className="site-footer page-shell">
      <div className="footer-brand">
        <span>星曜同谐</span>
        <strong>STARWITH</strong>
      </div>
      <div className="footer-links">
        <Link href={href("/research")}>{copy.nav.research}</Link>
        <Link href={href("/team")}>{copy.nav.team}</Link>
        <Link href={href("/join")}>{copy.nav.join}</Link>
      </div>
      <p>{copy.footer.line}</p>
      <p>© 2026 StarWith</p>
    </footer>
  );
}
