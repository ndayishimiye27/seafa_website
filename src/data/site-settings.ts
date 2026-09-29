import type { SiteSettings } from "@/types/content";
import { brandLogos } from "@/content/brand";

export const siteSettings: SiteSettings = {
  name: "Saint Esprit Alumni Football Academy",
  shortName: "SEAFA",
  mainLogoPath: brandLogos.main.src,
  whiteLogoPath: brandLogos.white.src,
  blackLogoPath: brandLogos.black.src,
  stackedLogoPath: brandLogos.stacked.src,
  iconLogoPath: brandLogos.icon.src,
  defaultLocale: "fr",
  supportedLocales: ["fr"],
  foundingYear: 2013,
  foundingYearStatus: "confirmed",
  slogan: "Tugire Iteka",
  description:
    "Depuis 2013, une famille issue des anciens du Lycée du Saint Esprit, unie par le football, la fraternité et le service.",
  heroMediaId: "media-brand-seafa-main-background-2013",
  introductionMediaId: "media-brand-seafa-hero-background-02",
  communityMediaId: "media-community-jenda-group-photo",
  socialLinks: [],
};
