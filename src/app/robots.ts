import type { MetadataRoute } from "next";
import { siteUrl, siteIndexable } from "@/lib/metadata";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(siteIndexable
        ? {
            allow: "/",
            disallow: ["/api", "/admin", "/portal", "/dashboard", "/private"],
          }
        : { disallow: "/" }),
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
