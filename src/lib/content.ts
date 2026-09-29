import { activities } from "@/data/activities";
import { challenges } from "@/data/activities/challenges";
import { albums } from "@/data/albums";
import { awards } from "@/data/awards";
import { events } from "@/data/events";
import { highlights } from "@/data/highlights";
import { mediaAssets } from "@/data/media";
import {
  compareDatesAscending,
  compareDatesDescending,
  compareDisplayOrder,
  getSortableDateValue,
  isPublished,
} from "@/lib/content-utils";
import type {
  Activity,
  Album,
  AlbumType,
  Award,
  Challenge,
  Event,
  HomepageHighlight,
  MediaAsset,
} from "@/types/content";

function copyArray<T>(items: readonly T[]): T[] {
  return [...items];
}

/* -------------------------------------------------------------------------- */
/* Albums                                                                      */
/* -------------------------------------------------------------------------- */

export function getAllAlbums(): Album[] {
  return copyArray(albums).sort((first, second) =>
    compareDatesDescending(first.eventDate, second.eventDate),
  );
}

export function getPublishedAlbums(): Album[] {
  return getAllAlbums().filter((album) => isPublished(album.publicationStatus));
}

export function getAlbumBySlug(slug: string): Album | null {
  return getPublishedAlbums().find((album) => album.slug === slug) ?? null;
}

export function getAlbumById(id: string): Album | null {
  return getPublishedAlbums().find((album) => album.id === id) ?? null;
}

export function getAlbumsByType(type: AlbumType): Album[] {
  return getPublishedAlbums().filter((album) => album.type === type);
}

export function getFeaturedAlbums(): Album[] {
  return getPublishedAlbums().filter((album) => album.featured);
}

/* -------------------------------------------------------------------------- */
/* Activities                                                                  */
/* -------------------------------------------------------------------------- */

export function getAllActivities(): Activity[] {
  return copyArray(activities).sort((first, second) =>
    compareDatesDescending(first.date, second.date),
  );
}

export function getPublishedActivities(): Activity[] {
  return getAllActivities().filter((activity) =>
    isPublished(activity.publicationStatus),
  );
}

export function getActivityBySlug(slug: string): Activity | null {
  return (
    getPublishedActivities().find((activity) => activity.slug === slug) ?? null
  );
}

export function getActivityById(id: string): Activity | null {
  return (
    getPublishedActivities().find((activity) => activity.id === id) ?? null
  );
}

export function getFeaturedActivities(): Activity[] {
  return getPublishedActivities().filter((activity) => activity.featured);
}

/* -------------------------------------------------------------------------- */
/* Challenges                                                                  */
/* -------------------------------------------------------------------------- */

export function getAllChallenges(): Challenge[] {
  return copyArray(challenges);
}

export function getPublishedChallenges(): Challenge[] {
  return getAllChallenges().filter((challenge) =>
    isPublished(challenge.publicationStatus),
  );
}

export function getChallengeBySlug(slug: string): Challenge | null {
  return (
    getPublishedChallenges().find((challenge) => challenge.slug === slug) ??
    null
  );
}

export function getChallengeById(id: string): Challenge | null {
  return (
    getPublishedChallenges().find((challenge) => challenge.id === id) ?? null
  );
}

/* -------------------------------------------------------------------------- */
/* Events                                                                      */
/* -------------------------------------------------------------------------- */

export function getAllEvents(): Event[] {
  return copyArray(events).sort((first, second) =>
    compareDatesDescending(first.startDate, second.startDate),
  );
}

export function getPublishedEvents(): Event[] {
  return getAllEvents().filter((event) => isPublished(event.publicationStatus));
}

export function getEventBySlug(slug: string): Event | null {
  return getPublishedEvents().find((event) => event.slug === slug) ?? null;
}

export function getEventById(id: string): Event | null {
  return getPublishedEvents().find((event) => event.id === id) ?? null;
}

export function getUpcomingEvents(referenceDate = new Date()): Event[] {
  const referenceTime = referenceDate.getTime();

  return getPublishedEvents()
    .filter((event) => {
      const eventTime = getSortableDateValue(event.startDate);

      return (
        event.status === "upcoming" &&
        (!Number.isFinite(eventTime) || eventTime >= referenceTime)
      );
    })
    .sort((first, second) =>
      compareDatesAscending(first.startDate, second.startDate),
    );
}

export function getOngoingEvents(): Event[] {
  return getPublishedEvents().filter((event) => event.status === "ongoing");
}

export function getPastEvents(referenceDate = new Date()): Event[] {
  const referenceTime = referenceDate.getTime();

  return getPublishedEvents()
    .filter((event) => {
      const eventTime = getSortableDateValue(event.endDate ?? event.startDate);

      return (
        event.status === "completed" ||
        (event.status === "upcoming" &&
          Number.isFinite(eventTime) &&
          eventTime < referenceTime)
      );
    })
    .sort((first, second) =>
      compareDatesDescending(first.startDate, second.startDate),
    );
}

/* -------------------------------------------------------------------------- */
/* Awards                                                                      */
/* -------------------------------------------------------------------------- */

export function getAllAwards(): Award[] {
  return copyArray(awards).sort((first, second) => {
    const firstYear = first.year ?? Number.NEGATIVE_INFINITY;
    const secondYear = second.year ?? Number.NEGATIVE_INFINITY;

    return secondYear - firstYear;
  });
}

export function getPublishedAwards(): Award[] {
  return getAllAwards().filter((award) => isPublished(award.publicationStatus));
}

export function getAwardBySlug(slug: string): Award | null {
  return getPublishedAwards().find((award) => award.slug === slug) ?? null;
}

export function getAwardById(id: string): Award | null {
  return getPublishedAwards().find((award) => award.id === id) ?? null;
}

export function getFeaturedAwards(): Award[] {
  return getPublishedAwards().filter((award) => award.featured);
}

/* -------------------------------------------------------------------------- */
/* Media                                                                       */
/* -------------------------------------------------------------------------- */

export function getAllMediaAssets(): MediaAsset[] {
  return copyArray(mediaAssets);
}

export function getMediaAssetById(id: string): MediaAsset | null {
  return mediaAssets.find((media) => media.id === id) ?? null;
}

/* -------------------------------------------------------------------------- */
/* Highlights                                                                  */
/* -------------------------------------------------------------------------- */

function isHighlightActiveAt(
  highlight: HomepageHighlight,
  referenceDate: Date,
): boolean {
  if (!highlight.active) {
    return false;
  }

  const referenceTime = referenceDate.getTime();

  if (highlight.publishFrom) {
    const publishFromTime = Date.parse(highlight.publishFrom);

    if (Number.isNaN(publishFromTime) || referenceTime < publishFromTime) {
      return false;
    }
  }

  if (highlight.publishUntil) {
    const publishUntilTime = Date.parse(highlight.publishUntil);

    if (Number.isNaN(publishUntilTime) || referenceTime > publishUntilTime) {
      return false;
    }
  }

  return true;
}

export function getAllHighlights(): HomepageHighlight[] {
  return copyArray(highlights).sort(compareDisplayOrder);
}

export function getActiveHighlights(
  referenceDate = new Date(),
): HomepageHighlight[] {
  return getAllHighlights().filter((highlight) =>
    isHighlightActiveAt(highlight, referenceDate),
  );
}

/* -------------------------------------------------------------------------- */
/* Relationships                                                               */
/* -------------------------------------------------------------------------- */

export function getAlbumForActivity(activity: Activity): Album | null {
  if (!activity.albumId) {
    return null;
  }

  return getAlbumById(activity.albumId);
}

export function getAlbumForEvent(event: Event): Album | null {
  if (!event.albumId) {
    return null;
  }

  return getAlbumById(event.albumId);
}

export function getAlbumForAward(award: Award): Album | null {
  if (!award.albumId) {
    return null;
  }

  return getAlbumById(award.albumId);
}

export function getAlbumMedia(album: Album): MediaAsset[] {
  return album.images
    .slice()
    .sort((first, second) => first.order - second.order)
    .map((image) => getMediaAssetById(image.mediaId))
    .filter((media): media is MediaAsset => media !== null);
}

export function getAlbumCover(album: Album): MediaAsset | null {
  if (album.coverMediaId) {
    return getMediaAssetById(album.coverMediaId);
  }

  const firstImage = album.images
    .slice()
    .sort((first, second) => first.order - second.order)[0];

  if (!firstImage) {
    return null;
  }

  return getMediaAssetById(firstImage.mediaId);
}
