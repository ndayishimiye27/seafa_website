import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(process.env.SITE_INDEXABLE === "true"
        ? {
            allow: "/",
            disallow: ["/api", "/admin", "/portal", "/dashboard", "/private"],
          }
        : { disallow: "/" }),
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
