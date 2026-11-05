import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  // Preview deployments and unapproved legal drafts should not appear in the sitemap.
  if (process.env.VERCEL_ENV === "preview") return [];

  return [{ url: siteUrl }];
}
