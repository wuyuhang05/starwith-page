import { useEffect } from "react";
import Home from "@/app/page";
import JoinPage from "@/app/join/page";
import ResearchPage from "@/app/research/page";
import TeamPage from "@/app/team/page";
import { LocaleProvider, useLocale } from "@/components/LocaleProvider";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getSitePathname } from "@/lib/site-routing";

const routes = {
  "/": Home,
  "/research": ResearchPage,
  "/team": TeamPage,
  "/join": JoinPage,
} as const;

type KnownRoute = keyof typeof routes;

const pageMetadata = {
  "/": {
    zh: "星曜同谐 · StarWith | Physical Interaction Model",
    en: "StarWith | Physical Interaction Model",
  },
  "/research": {
    zh: "研究 · Research | 星曜同谐 · StarWith",
    en: "Research | StarWith",
  },
  "/team": {
    zh: "团队 · Team | 星曜同谐 · StarWith",
    en: "Team | StarWith",
  },
  "/join": {
    zh: "加入我们 · Join | 星曜同谐 · StarWith",
    en: "Join | StarWith",
  },
} as const;

function NotFoundPage() {
  const { lang, href } = useLocale();

  return (
    <main className="subpage">
      <section className="subpage-hero page-shell">
        <p className="eyebrow">404 / NOT FOUND</p>
        <div className="subpage-title-grid">
          <h1>{lang === "zh" ? "页面未找到" : "Page not found"}</h1>
          <p>
            {lang === "zh" ? "这个地址暂时不存在。" : "The page at this address does not exist."}{" "}
            <a className="text-link" href={href("/")}>
              {lang === "zh" ? "返回首页" : "Return home"} <span aria-hidden="true">→</span>
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

function StaticSite() {
  const { lang } = useLocale();
  const pathname = getSitePathname();
  const isKnownRoute = pathname in routes;
  const Route = isKnownRoute ? routes[pathname as KnownRoute] : NotFoundPage;

  useEffect(() => {
    const title = isKnownRoute
      ? pageMetadata[pathname as KnownRoute][lang]
      : lang === "zh" ? "页面未找到 | 星曜同谐 · StarWith" : "Page not found | StarWith";
    const description = lang === "zh"
      ? "星曜同谐致力于构建 Physical Interaction Model，让机器在持续交互中理解人的语言、动作、状态与反馈。"
      : "StarWith builds Physical Interaction Models that help machines understand people through continuous, multimodal interaction.";
    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');

    document.title = title;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    descriptionMeta?.setAttribute("content", description);
  }, [isKnownRoute, lang, pathname]);

  return (
    <>
      <SiteHeader />
      <Route />
      <SiteFooter />
    </>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <StaticSite />
    </LocaleProvider>
  );
}
