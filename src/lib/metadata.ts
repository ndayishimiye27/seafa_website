import type { Metadata } from "next";
import { brandLogos } from "@/content/brand";
export const siteUrl = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000"
).replace(/\/+$/, "");
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
      ...(path ? { url: path } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
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
  icons: {
    icon: { url: brandLogos.favicon.src, sizes: "32x32", type: "image/png" },
    apple: { url: brandLogos.apple.src, sizes: "180x180", type: "image/png" },
  },
  robots: { index: process.env.SITE_INDEXABLE === "true", follow: true },
  openGraph: {
    type: "website",
    locale: "fr_BI",
    siteName: "SEAFA",
    title: "SEAFA — Une famille, un héritage",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "SEAFA — Une famille, un héritage",
    description: siteDescription,
  },
};
