import type { MetadataRoute } from "next";
import { siteDescription } from "@/lib/metadata";
import { brandLogos } from "@/content/brand";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SEAFA — Saint Esprit Alumni Football Academy",
    short_name: "SEAFA",
    description: siteDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#071d3b",
    lang: "fr-BI",
    dir: "ltr",
    icons: [
      {
        src: brandLogos.icon.src,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
