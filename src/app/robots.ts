import type { MetadataRoute } from "next";
import { siteOrigin, searchEnabled } from "@/shared/config/seo";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(searchEnabled && siteOrigin ? { sitemap: siteOrigin + "/sitemap.xml" } : {}),
  };
}
