import type { Metadata } from "next";
import { headers } from "next/headers";
import { LocaleProvider } from "@/components/LocaleProvider";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const description = "星曜同谐致力于构建 Physical Interaction Model，让机器在持续交互中理解人的语言、动作、状态与反馈。";

  return {
    metadataBase: new URL(origin),
    title: {
      default: "星曜同谐 · StarWith | Physical Interaction Model",
      template: "%s | 星曜同谐 · StarWith",
    },
    description,
    openGraph: {
      type: "website",
      title: "星曜同谐 · StarWith | Physical Interaction Model",
      description,
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "StarWith Physical Interaction Model" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "星曜同谐 · StarWith | Physical Interaction Model",
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <LocaleProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
