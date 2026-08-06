"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { content, type Language } from "@/lib/content";

type LocaleContextValue = {
  lang: Language;
  copy: (typeof content)[Language];
  setLanguage: (lang: Language) => void;
  href: (path: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("zh");

  useEffect(() => {
    const urlLanguage = new URLSearchParams(window.location.search).get("lang");
    const storedLanguage = window.localStorage.getItem("starwith-language");
    const preferred = urlLanguage === "en" || urlLanguage === "zh"
      ? urlLanguage
      : storedLanguage === "en" || storedLanguage === "zh"
        ? storedLanguage
        : navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
    setLang(preferred);
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLang(nextLanguage);
    window.localStorage.setItem("starwith-language", nextLanguage);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage);
    window.history.replaceState({}, "", url);
    document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";
  };

  const value = useMemo(
    () => ({
      lang,
      copy: content[lang],
      setLanguage,
      href: (path: string) => `${path}?lang=${lang}`,
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
