import type { Metadata } from "next";
import { brandLogos } from "@/content/brand";
// The apex domain redirects to www. Production and preview builds must never
// publish a preview host or a stale environment value as the canonical origin.
export const productionSiteUrl =
  "https://www.saintespritfootballacademyalumni.com";
export const siteUrl =
  process.env.NODE_ENV === "production"
    ? productionSiteUrl
    : (
        process.env.SITE_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        "http://localhost:3000"
      ).replace(/\/+$/, "");
export const siteIndexable =
  process.env.SITE_INDEXABLE === "true" &&
  (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production");
const socialImage = {
  url: `${siteUrl}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "SEAFA — Une famille, un héritage. Depuis 2013. Tugire Iteka.",
};
export const siteDescription =
  "Depuis 2013, SEAFA réunit les anciens du Lycée du Saint Esprit et leurs amis autour du football, de la fraternité et du service. Tugire Iteka.";
export function pageMetadata(
  title: string,
  path?: string,
  description = siteDescription,
): Metadata {
  return {
    title,
    description,
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title,
      description,
      locale: "fr_BI",
      type: "website",
      siteName: "SEAFA",
      images: [socialImage],
      ...(path ? { url: path } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SEAFA — Une famille, un héritage",
    template: "%s | SEAFA",
  },
  description: siteDescription,
  applicationName: "SEAFA",
  other: { "seafa:release": process.env.VERCEL_GIT_COMMIT_SHA ?? "local" },
  icons: {
    icon: { url: brandLogos.favicon.src, sizes: "32x32", type: "image/png" },
    apple: { url: brandLogos.apple.src, sizes: "180x180", type: "image/png" },
  },
  robots: { index: siteIndexable, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_BI",
    siteName: "SEAFA",
    title: "SEAFA — Une famille, un héritage",
    description: siteDescription,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEAFA — Une famille, un héritage",
    description: siteDescription,
    images: [socialImage],
  },
};
