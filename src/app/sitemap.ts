import type { MetadataRoute } from "next";
import { articles } from "@/content/news";
import { siteOrigin, searchEnabled } from "@/shared/config/seo";
import { newsArticlePath } from "@/shared/config/routes";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin || !searchEnabled) return [];
  return ["/", "/news", ...articles.filter((a) => a.indexable).map(newsArticlePath)].map(
    (path) => ({ url: new URL(path, siteOrigin).href }),
  );
}
