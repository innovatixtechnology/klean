import type { MetadataRoute } from "next";
import { siteConfig } from "@/config";
import { getAllCategories } from "@/actions";
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["/", "/about", "/contact", "/service", "/privacy-policy", "/terms-of-service"].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    priority: 1,
  }));

  const categories = await getAllCategories();

  const categoryRoutes = categories.map((category) => ({
    url: `${siteConfig.siteUrl}/service/${category.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    priority: 0.8,
  }));

  const subCategoryRoutes = categories.flatMap((category) =>
    category.subCategories.map((subCategory) => ({
      url: `${siteConfig.siteUrl}/service/${category.slug}/${subCategory.slug}`,
      lastModified: new Date().toISOString().split("T")[0],
      priority: 0.6,
    }))
  );

  return [...routes, ...categoryRoutes, ...subCategoryRoutes];
}
