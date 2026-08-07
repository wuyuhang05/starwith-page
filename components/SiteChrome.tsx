"use client";

import { useState, useSyncExternalStore } from "react";
import { getSitePathname } from "@/lib/site-routing";
import { useLocale } from "./LocaleProvider";

export function SiteHeader() {
  const { lang, copy, setLanguage, href } = useLocale();
  const pathname = useSyncExternalStore(() => () => {}, getSitePathname, () => "/");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    ["/research", copy.nav.research],
    ["/team", copy.nav.team],
    ["/join", copy.nav.join],
  ] as const;

  return (
    <header className="site-header">
      <a className="brand" href={href("/")} aria-label={copy.common.home}>
        <span className="brand-cn">星曜同谐</span>
        <span className="brand-en">STARWITH</span>
      </a>
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
          <a className={pathname === path ? "active" : ""} href={href(path)} key={path}>
            {label}
          </a>
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
        <a href={href("/research")}>{copy.nav.research}</a>
        <a href={href("/team")}>{copy.nav.team}</a>
        <a href={href("/join")}>{copy.nav.join}</a>
      </div>
      <p>{copy.footer.line}</p>
      <p>© 2026 StarWith</p>
    </footer>
  );
}
