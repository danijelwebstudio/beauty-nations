import type { MetadataRoute } from "next";
import { siteUrl, isPreRelease } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  if (isPreRelease) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
