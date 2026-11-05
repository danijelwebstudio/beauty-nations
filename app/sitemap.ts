import type { MetadataRoute } from "next";
import { siteUrl, isPreRelease } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  // Preview deployments and unapproved legal drafts should not appear in the sitemap.
  if (isPreRelease) return [];

  return [{ url: siteUrl }];
}
