import type { NewsArticle } from "@/types/content";
export type { NewsArticle } from "@/types/content";
// No unverified news is published. Historical source material belongs in history.
export const news: NewsArticle[] = [];
export const newsArticles = news;
export function getAllNewsArticles() {
  return news
    .filter((p) => p.status === "published" && p.publishedAt)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}
export function getNewsArticleBySlug(slug: string) {
  return getAllNewsArticles().find((p) => p.slug === slug);
}
export function getFeaturedNewsArticle() {
  return getAllNewsArticles().find((p) => p.featured);
}
export function getRelatedNewsArticles(
  slug: string,
  category?: string,
  limit = 3,
) {
  return getAllNewsArticles()
    .filter((p) => p.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.category === category) - Number(a.category === category),
    )
    .slice(0, limit);
}
export function formatNewsDate(value: string) {
  return new Intl.DateTimeFormat("fr-BI", {
    dateStyle: "long",
    timeZone: "Africa/Bujumbura",
  }).format(new Date(value));
}
