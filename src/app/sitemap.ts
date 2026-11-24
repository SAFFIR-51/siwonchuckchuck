import type { MetadataRoute } from "next";
import { articles } from "@/content/news";
import { siteOrigin, searchEnabled } from "@/shared/config/seo";
import { newsArticlePath, routes } from "@/shared/config/routes";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin || !searchEnabled) return [];
  return [
    "/",
    "/news",
    routes.orthopedicDetail,
    routes.painDetail,
    routes.clinicDetail,
    ...articles.filter((a) => a.indexable).map(newsArticlePath),
  ].map((path) => ({ url: new URL(path, siteOrigin).href }));
}
