"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { content, type Language } from "@/lib/content";
import { createSiteHref } from "@/lib/site-routing";

type LocaleContextValue = {
  lang: Language;
  copy: (typeof content)[Language];
  setLanguage: (lang: Language) => void;
  href: (path: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const languageChangeEvent = "starwith-language-change";

function getPreferredLanguage(): Language {
  if (typeof window === "undefined") return "zh";

  const urlLanguage = new URLSearchParams(window.location.search).get("lang");
  const storedLanguage = window.localStorage.getItem("starwith-language");

  if (urlLanguage === "en" || urlLanguage === "zh") return urlLanguage;
  if (storedLanguage === "en" || storedLanguage === "zh") return storedLanguage;
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function subscribeToLanguage(callback: () => void) {
  window.addEventListener(languageChangeEvent, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(languageChangeEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribeToLanguage, getPreferredLanguage, () => "zh");

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const setLanguage = (nextLanguage: Language) => {
    window.localStorage.setItem("starwith-language", nextLanguage);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage);
    window.history.replaceState({}, "", url);
    document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";
    window.dispatchEvent(new Event(languageChangeEvent));
  };

  const value = useMemo(
    () => ({
      lang,
      copy: content[lang],
      setLanguage,
      href: (path: string) => createSiteHref(path, lang),
    }),
    [lang],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
