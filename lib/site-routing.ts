import type { Language } from "./content";

export const GITHUB_PAGES_BASE_PATH = "/starwith-page";

export function getDeploymentBasePath(pathname?: string) {
  const currentPath = pathname ?? (typeof window === "undefined" ? "/" : window.location.pathname);

  return currentPath === GITHUB_PAGES_BASE_PATH || currentPath.startsWith(`${GITHUB_PAGES_BASE_PATH}/`)
    ? GITHUB_PAGES_BASE_PATH
    : "";
}

export function getSitePathname(pathname?: string) {
  const currentPath = pathname ?? (typeof window === "undefined" ? "/" : window.location.pathname);
  const basePath = getDeploymentBasePath(currentPath);
  const unprefixedPath = basePath ? currentPath.slice(basePath.length) : currentPath;
  const withLeadingSlash = unprefixedPath.startsWith("/") ? unprefixedPath : `/${unprefixedPath}`;
  const withoutTrailingSlash = withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, "") : withLeadingSlash;

  return withoutTrailingSlash || "/";
}

export function createSiteHref(path: string, lang: Language) {
  const basePath = getDeploymentBasePath();
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;

  return `${basePath}${normalizedPath}?lang=${lang}`;
}
