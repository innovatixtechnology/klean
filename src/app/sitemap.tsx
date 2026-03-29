import type { MetadataRoute } from "next";
import { siteConfig } from "../../config";
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["/"].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    priority: 1,
  }));

  return [...routes];
}
