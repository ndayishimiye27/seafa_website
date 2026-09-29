import {
  getActiveHighlights,
  getAlbumBySlug,
  getAwardBySlug,
  getEventBySlug,
  getMediaAssetById,
  getPublishedActivities,
  getPublishedAlbums,
  getPublishedAwards,
  getPublishedChallenges,
  getPublishedEvents,
} from "@/lib/content";
import { getAllNewsArticles, getNewsArticleBySlug } from "@/data/news";
import type {
  Activity,
  Album,
  Award,
  Challenge,
  Event,
  HomepageHighlight,
  MediaAsset,
  NewsArticle,
} from "@/types/content";

export interface PublishedCollection<T> {
  list(): Promise<readonly T[]>;
  findBySlug(slug: string): Promise<T | null>;
}

export interface ContentRepository {
  albums: PublishedCollection<Album>;
  activities: PublishedCollection<Activity>;
  events: PublishedCollection<Event>;
  awards: PublishedCollection<Award>;
  news: PublishedCollection<NewsArticle>;
  findPublishedChallenge(id: string): Promise<Challenge | null>;
  listActiveHighlights(at: Date): Promise<readonly HomepageHighlight[]>;
  findMedia(id: string): Promise<MediaAsset | null>;
}

function findPublishedNewsBySlug(slug: string): NewsArticle | null {
  return getNewsArticleBySlug(slug) ?? null;
}

export const localContentRepository: ContentRepository = {
  albums: {
    async list() {
      return getPublishedAlbums();
    },

    async findBySlug(slug) {
      return getAlbumBySlug(slug);
    },
  },

  activities: {
    async list() {
      return getPublishedActivities();
    },

    async findBySlug(slug) {
      return (
        getPublishedActivities().find((activity) => activity.slug === slug) ??
        null
      );
    },
  },

  events: {
    async list() {
      return getPublishedEvents();
    },

    async findBySlug(slug) {
      return getEventBySlug(slug);
    },
  },

  awards: {
    async list() {
      return getPublishedAwards();
    },

    async findBySlug(slug) {
      return getAwardBySlug(slug);
    },
  },

  news: {
    async list() {
      return getAllNewsArticles();
    },

    async findBySlug(slug) {
      return findPublishedNewsBySlug(slug);
    },
  },

  async findPublishedChallenge(id) {
    return (
      getPublishedChallenges().find((challenge) => challenge.id === id) ?? null
    );
  },

  async listActiveHighlights(at) {
    return getActiveHighlights(at);
  },

  async findMedia(id) {
    return getMediaAssetById(id);
  },
};
