import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";
import { navigation, footerNavigation } from "@/content/fr";
import {
  getPublishedActivities,
  getPublishedAlbums,
  getPublishedAwards,
  getPublishedEvents,
} from "@/lib/content";
import { getAllNewsArticles } from "@/data/news";
import { getPublishedInterviews } from "@/data/interviews";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...navigation,
    ...footerNavigation,
    { href: "/request-match" },
    { href: "/interviews/book" },
  ].map((l) => l.href);
  const dynamic = [
    ...getPublishedActivities().map((p) => `/activities/${p.slug}`),
    ...getPublishedAlbums().map((p) => `/gallery/${p.slug}`),
    ...getPublishedAwards().map((p) => `/awards/${p.slug}`),
    ...getPublishedEvents().map((p) => `/events/${p.slug}`),
    ...getAllNewsArticles().map((p) => `/news/${p.slug}`),
    ...getPublishedInterviews().map((p) => `/interviews/${p.slug}`),
  ];
  return [...new Set([...routes, ...dynamic])].map((path) => ({
    url: siteUrl + (path === "/" ? "" : path),
  }));
}
