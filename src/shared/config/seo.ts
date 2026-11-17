import type { Metadata } from "next";
import { site } from "./site";

function configuredOrigin(value: string | undefined) {
  if (!value?.trim()) return undefined;
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.hostname === "localhost" ||
    /^[\d.]+$/.test(url.hostname)
  ) {
    throw new Error(
      "SITE_URL must be the public HTTPS origin without a path, credentials, or query.",
    );
  }
  return url.origin;
}
export const siteOrigin = configuredOrigin(process.env.SITE_URL);
export const searchEnabled =
  Boolean(siteOrigin) &&
  process.env.SEARCH_INDEXING_ENABLED === "true" &&
  process.env.VERCEL_ENV !== "preview";
export function absoluteUrl(path: string) {
  return siteOrigin ? new URL(path, siteOrigin).href : undefined;
}
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  indexable = true,
): Metadata {
  const url = absoluteUrl(path);
  const isHome = path === "/";
  const image = absoluteUrl(
    isHome ? "/images/brand/siwon-kakao-share.png" : "/images/clinic/reception.webp",
  );
  const imageMetadata = isHome
    ? {
        alt: "시원척척의원 AK진료 · 관절은 가볍게, 척추는 시원하게",
        width: 1200,
        height: 630,
        type: "image/png",
      }
    : { alt: "시원척척의원 접수 공간" };
  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    robots: { index: searchEnabled && indexable, follow: searchEnabled },
    openGraph: {
      title,
      description,
      siteName: site.name,
      locale: "ko_KR",
      type: "website",
      ...(url ? { url } : {}),
      ...(image ? { images: [{ url: image, ...imageMetadata }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
