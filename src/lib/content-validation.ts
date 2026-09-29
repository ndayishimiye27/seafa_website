import { activities } from "@/data/activities";
import { interviews } from "@/data/interviews";
import { diasporaInitiatives } from "@/data/diaspora";
import { challenges } from "@/data/activities/challenges";
import { albums } from "@/data/albums";
import { awards } from "@/data/awards";
import { events } from "@/data/events";
import { highlights } from "@/data/highlights";
import { mediaAssets } from "@/data/media";
import { matches, milestones, news } from "@/data/placeholders";
import { isValidDateValue } from "@/lib/content-utils";
import type {
  ContentReference,
  EventDate,
  PublicationStatus,
} from "@/types/content";

export type ValidationSeverity = "error" | "warning";

export interface ValidationIssue {
  severity: ValidationSeverity;
  contentType: string;
  contentId: string;
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  issues: ValidationIssue[];
}

const validPublicationStatuses = new Set<PublicationStatus>([
  "draft",
  "published",
  "archived",
]);

function createIssue(
  severity: ValidationSeverity,
  contentType: string,
  contentId: string,
  field: string,
  message: string,
): ValidationIssue {
  return {
    severity,
    contentType,
    contentId,
    field,
    message,
  };
}

function validateRequiredText(
  value: string,
  contentType: string,
  contentId: string,
  field: string,
  issues: ValidationIssue[],
): void {
  if (!value.trim()) {
    issues.push(
      createIssue(
        "error",
        contentType,
        contentId,
        field,
        `${field} cannot be empty.`,
      ),
    );
  }
}

function validateDate(
  date: EventDate | undefined,
  contentType: string,
  contentId: string,
  field: string,
  issues: ValidationIssue[],
): void {
  if (date && !isValidDateValue(date)) {
    issues.push(
      createIssue(
        "error",
        contentType,
        contentId,
        field,
        `The value "${date.value}" is not valid for precision "${date.precision}".`,
      ),
    );
  }
}

function validatePublicationStatus(
  status: PublicationStatus,
  contentType: string,
  contentId: string,
  issues: ValidationIssue[],
): void {
  if (!validPublicationStatuses.has(status)) {
    issues.push(
      createIssue(
        "error",
        contentType,
        contentId,
        "publicationStatus",
        `Unsupported publication status "${status}".`,
      ),
    );
  }
}

function validateUniqueValues<T>(
  records: readonly T[],
  contentType: string,
  field: string,
  getValue: (record: T) => string,
  getId: (record: T) => string,
  issues: ValidationIssue[],
): void {
  const seen = new Map<string, string>();

  for (const record of records) {
    const value = getValue(record).trim();
    const recordId = getId(record);

    if (!value) {
      issues.push(
        createIssue(
          "error",
          contentType,
          recordId,
          field,
          `${field} cannot be empty.`,
        ),
      );

      continue;
    }

    const previousRecordId = seen.get(value);

    if (previousRecordId) {
      issues.push(
        createIssue(
          "error",
          contentType,
          recordId,
          field,
          `Duplicate ${field} "${value}". It is already used by "${previousRecordId}".`,
        ),
      );
    } else {
      seen.set(value, recordId);
    }
  }
}

function validateRelatedReference(
  reference: ContentReference,
  ownerType: string,
  ownerId: string,
  issues: ValidationIssue[],
): void {
  const referenceRegistries: Record<
    ContentReference["type"],
    ReadonlySet<string>
  > = {
    interview: new Set(interviews.map((item) => item.id)),
    diaspora: new Set(diasporaInitiatives.map((item) => item.id)),
    activity: new Set(activities.map((item) => item.id)),
    challenge: new Set(challenges.map((item) => item.id)),
    event: new Set(events.map((item) => item.id)),
    award: new Set(awards.map((item) => item.id)),
    milestone: new Set(milestones.map((item) => item.id)),
    album: new Set(albums.map((item) => item.id)),
    news: new Set(news.map((item) => item.id)),
  };

  if (!referenceRegistries[reference.type].has(reference.id)) {
    issues.push(
      createIssue(
        "error",
        ownerType,
        ownerId,
        "relatedContent",
        `Missing ${reference.type} reference "${reference.id}".`,
      ),
    );
  }
}

function validateMedia(issues: ValidationIssue[]): void {
  validateUniqueValues(
    mediaAssets,
    "media",
    "id",
    (media) => media.id,
    (media) => media.id,
    issues,
  );

  for (const media of mediaAssets) {
    validateRequiredText(media.src, "media", media.id, "src", issues);

    if (media.width <= 0) {
      issues.push(
        createIssue(
          "error",
          "media",
          media.id,
          "width",
          "Image width must be greater than zero.",
        ),
      );
    }

    if (media.height <= 0) {
      issues.push(
        createIssue(
          "error",
          "media",
          media.id,
          "height",
          "Image height must be greater than zero.",
        ),
      );
    }

    if (!media.alt.trim()) {
      issues.push(
        createIssue(
          "error",
          "media",
          media.id,
          "alt",
          "Every registered image requires meaningful alternative text.",
        ),
      );
    }

    if (!media.src.startsWith("/") && !media.src.startsWith("https://")) {
      issues.push(
        createIssue(
          "error",
          "media",
          media.id,
          "src",
          "Media paths must begin with / or use an HTTPS URL.",
        ),
      );
    }
  }
}

function validateAlbums(issues: ValidationIssue[]): void {
  const mediaIds = new Set(mediaAssets.map((media) => media.id));

  validateUniqueValues(
    albums,
    "album",
    "id",
    (album) => album.id,
    (album) => album.id,
    issues,
  );

  validateUniqueValues(
    albums,
    "album",
    "slug",
    (album) => album.slug,
    (album) => album.id,
    issues,
  );

  for (const album of albums) {
    validateRequiredText(album.title, "album", album.id, "title", issues);

    validatePublicationStatus(
      album.publicationStatus,
      "album",
      album.id,
      issues,
    );

    validateDate(album.eventDate, "album", album.id, "eventDate", issues);

    validateDate(album.endDate, "album", album.id, "endDate", issues);

    if (album.coverMediaId && !mediaIds.has(album.coverMediaId)) {
      issues.push(
        createIssue(
          album.publicationStatus === "published" ? "error" : "warning",
          "album",
          album.id,
          "coverMediaId",
          `Cover media "${album.coverMediaId}" is not registered.`,
        ),
      );
    }

    const usedMediaIds = new Set<string>();
    const usedOrders = new Set<number>();

    for (const image of album.images) {
      if (!mediaIds.has(image.mediaId)) {
        issues.push(
          createIssue(
            album.publicationStatus === "published" ? "error" : "warning",
            "album",
            album.id,
            "images",
            `Image media "${image.mediaId}" is not registered.`,
          ),
        );
      }

      if (usedMediaIds.has(image.mediaId)) {
        issues.push(
          createIssue(
            "error",
            "album",
            album.id,
            "images",
            `Media "${image.mediaId}" appears more than once in this album.`,
          ),
        );
      }

      if (usedOrders.has(image.order)) {
        issues.push(
          createIssue(
            "error",
            "album",
            album.id,
            "images.order",
            `Display order "${image.order}" is used more than once.`,
          ),
        );
      }

      if (!Number.isInteger(image.order) || image.order < 0) {
        issues.push(
          createIssue(
            "error",
            "album",
            album.id,
            "images.order",
            "Image order must be a non-negative integer.",
          ),
        );
      }

      validateDate(
        image.date,
        "album",
        album.id,
        `images.${image.mediaId}.date`,
        issues,
      );

      usedMediaIds.add(image.mediaId);
      usedOrders.add(image.order);
    }

    for (const reference of album.relatedContent) {
      validateRelatedReference(reference, "album", album.id, issues);
    }
  }
}

function validateActivities(issues: ValidationIssue[]): void {
  const albumIds = new Set(albums.map((album) => album.id));
  const matchIds = new Set(matches.map((match) => match.id));
  const challengeIds = new Set(challenges.map((challenge) => challenge.id));
  const eventIds = new Set(events.map((event) => event.id));
  const newsIds = new Set(news.map((article) => article.id));

  validateUniqueValues(
    activities,
    "activity",
    "id",
    (activity) => activity.id,
    (activity) => activity.id,
    issues,
  );

  validateUniqueValues(
    activities,
    "activity",
    "slug",
    (activity) => activity.slug,
    (activity) => activity.id,
    issues,
  );

  for (const activity of activities) {
    validateRequiredText(
      activity.title,
      "activity",
      activity.id,
      "title",
      issues,
    );

    validatePublicationStatus(
      activity.publicationStatus,
      "activity",
      activity.id,
      issues,
    );

    validateDate(activity.date, "activity", activity.id, "date", issues);

    validateDate(activity.endDate, "activity", activity.id, "endDate", issues);

    if (activity.albumId && !albumIds.has(activity.albumId)) {
      issues.push(
        createIssue(
          activity.publicationStatus === "published" ? "error" : "warning",
          "activity",
          activity.id,
          "albumId",
          `Album "${activity.albumId}" does not exist.`,
        ),
      );
    }

    if (activity.matchId && !matchIds.has(activity.matchId)) {
      issues.push(
        createIssue(
          "error",
          "activity",
          activity.id,
          "matchId",
          `Match "${activity.matchId}" does not exist.`,
        ),
      );
    }

    if (activity.challengeId && !challengeIds.has(activity.challengeId)) {
      issues.push(
        createIssue(
          "error",
          "activity",
          activity.id,
          "challengeId",
          `Challenge "${activity.challengeId}" does not exist.`,
        ),
      );
    }

    if (activity.eventId && !eventIds.has(activity.eventId)) {
      issues.push(
        createIssue(
          "error",
          "activity",
          activity.id,
          "eventId",
          `Event "${activity.eventId}" does not exist.`,
        ),
      );
    }

    if (activity.newsId && !newsIds.has(activity.newsId)) {
      issues.push(
        createIssue(
          "error",
          "activity",
          activity.id,
          "newsId",
          `News article "${activity.newsId}" does not exist.`,
        ),
      );
    }
  }
}

function validateEvents(issues: ValidationIssue[]): void {
  const albumIds = new Set(albums.map((album) => album.id));
  const activityIds = new Set(activities.map((activity) => activity.id));

  validateUniqueValues(
    events,
    "event",
    "id",
    (event) => event.id,
    (event) => event.id,
    issues,
  );

  validateUniqueValues(
    events,
    "event",
    "slug",
    (event) => event.slug,
    (event) => event.id,
    issues,
  );

  for (const event of events) {
    validateRequiredText(event.title, "event", event.id, "title", issues);

    validatePublicationStatus(
      event.publicationStatus,
      "event",
      event.id,
      issues,
    );

    validateDate(event.startDate, "event", event.id, "startDate", issues);

    validateDate(event.endDate, "event", event.id, "endDate", issues);

    if (event.albumId && !albumIds.has(event.albumId)) {
      issues.push(
        createIssue(
          event.publicationStatus === "published" ? "error" : "warning",
          "event",
          event.id,
          "albumId",
          `Album "${event.albumId}" does not exist.`,
        ),
      );
    }

    if (event.activityId && !activityIds.has(event.activityId)) {
      issues.push(
        createIssue(
          "error",
          "event",
          event.id,
          "activityId",
          `Activity "${event.activityId}" does not exist.`,
        ),
      );
    }
  }
}

function validateAwards(issues: ValidationIssue[]): void {
  const albumIds = new Set(albums.map((album) => album.id));
  const eventIds = new Set(events.map((event) => event.id));
  const challengeIds = new Set(challenges.map((challenge) => challenge.id));

  validateUniqueValues(
    awards,
    "award",
    "id",
    (award) => award.id,
    (award) => award.id,
    issues,
  );

  validateUniqueValues(
    awards,
    "award",
    "slug",
    (award) => award.slug,
    (award) => award.id,
    issues,
  );

  for (const award of awards) {
    validateRequiredText(award.title, "award", award.id, "title", issues);

    validatePublicationStatus(
      award.publicationStatus,
      "award",
      award.id,
      issues,
    );

    if (award.albumId && !albumIds.has(award.albumId)) {
      issues.push(
        createIssue(
          award.publicationStatus === "published" ? "error" : "warning",
          "award",
          award.id,
          "albumId",
          `Album "${award.albumId}" does not exist.`,
        ),
      );
    }

    if (award.eventId && !eventIds.has(award.eventId)) {
      issues.push(
        createIssue(
          "error",
          "award",
          award.id,
          "eventId",
          `Event "${award.eventId}" does not exist.`,
        ),
      );
    }

    if (award.challengeId && !challengeIds.has(award.challengeId)) {
      issues.push(
        createIssue(
          "error",
          "award",
          award.id,
          "challengeId",
          `Challenge "${award.challengeId}" does not exist.`,
        ),
      );
    }

    if (
      award.publicationStatus === "published" &&
      award.category !== "season-collection" &&
      award.recipients.length === 0
    ) {
      issues.push(
        createIssue(
          "error",
          "award",
          award.id,
          "recipients",
          "A published award requires at least one official recipient.",
        ),
      );
    }
  }
}

function validateChallenges(issues: ValidationIssue[]): void {
  const activityIds = new Set(activities.map((activity) => activity.id));
  const albumIds = new Set(albums.map((album) => album.id));
  const matchIds = new Set(matches.map((match) => match.id));

  validateUniqueValues(
    challenges,
    "challenge",
    "id",
    (challenge) => challenge.id,
    (challenge) => challenge.id,
    issues,
  );

  validateUniqueValues(
    challenges,
    "challenge",
    "slug",
    (challenge) => challenge.slug,
    (challenge) => challenge.id,
    issues,
  );

  for (const challenge of challenges) {
    validateRequiredText(
      challenge.title,
      "challenge",
      challenge.id,
      "title",
      issues,
    );

    validatePublicationStatus(
      challenge.publicationStatus,
      "challenge",
      challenge.id,
      issues,
    );

    if (!activityIds.has(challenge.activityId)) {
      issues.push(
        createIssue(
          "error",
          "challenge",
          challenge.id,
          "activityId",
          `Activity "${challenge.activityId}" does not exist.`,
        ),
      );
    }

    if (challenge.albumId && !albumIds.has(challenge.albumId)) {
      issues.push(
        createIssue(
          "error",
          "challenge",
          challenge.id,
          "albumId",
          `Album "${challenge.albumId}" does not exist.`,
        ),
      );
    }

    for (const matchId of challenge.matchIds) {
      if (!matchIds.has(matchId)) {
        issues.push(
          createIssue(
            "error",
            "challenge",
            challenge.id,
            "matchIds",
            `Match "${matchId}" does not exist.`,
          ),
        );
      }
    }

    if (challenge.format !== "best-of-three" || challenge.winsRequired !== 2) {
      issues.push(
        createIssue(
          "error",
          "challenge",
          challenge.id,
          "format",
          "A SEAFA Challenge must be best-of-three with two wins required.",
        ),
      );
    }
  }
}

function validateHighlights(issues: ValidationIssue[]): void {
  const mediaIds = new Set(mediaAssets.map((media) => media.id));
  const usedOrders = new Set<number>();

  validateUniqueValues(
    highlights,
    "highlight",
    "id",
    (highlight) => highlight.id,
    (highlight) => highlight.id,
    issues,
  );

  for (const highlight of highlights) {
    validateRequiredText(
      highlight.title,
      "highlight",
      highlight.id,
      "title",
      issues,
    );

    validateRequiredText(
      highlight.message,
      "highlight",
      highlight.id,
      "message",
      issues,
    );

    if (!highlight.desktopMediaId || !mediaIds.has(highlight.desktopMediaId)) {
      issues.push(
        createIssue(
          highlight.active ? "error" : "warning",
          "highlight",
          highlight.id,
          "desktopMediaId",
          `Desktop media "${highlight.desktopMediaId}" is not registered.`,
        ),
      );
    }

    if (highlight.mobileMediaId && !mediaIds.has(highlight.mobileMediaId)) {
      issues.push(
        createIssue(
          highlight.active ? "error" : "warning",
          "highlight",
          highlight.id,
          "mobileMediaId",
          `Mobile media "${highlight.mobileMediaId}" is not registered.`,
        ),
      );
    }

    if (highlight.overlayStrength < 0 || highlight.overlayStrength > 1) {
      issues.push(
        createIssue(
          "error",
          "highlight",
          highlight.id,
          "overlayStrength",
          "Overlay strength must be between 0 and 1.",
        ),
      );
    }

    if (usedOrders.has(highlight.displayOrder)) {
      issues.push(
        createIssue(
          "error",
          "highlight",
          highlight.id,
          "displayOrder",
          `Display order "${highlight.displayOrder}" is duplicated.`,
        ),
      );
    }

    if (
      highlight.publishFrom &&
      Number.isNaN(Date.parse(highlight.publishFrom))
    ) {
      issues.push(
        createIssue(
          "error",
          "highlight",
          highlight.id,
          "publishFrom",
          "publishFrom must be a valid ISO date.",
        ),
      );
    }

    if (
      highlight.publishUntil &&
      Number.isNaN(Date.parse(highlight.publishUntil))
    ) {
      issues.push(
        createIssue(
          "error",
          "highlight",
          highlight.id,
          "publishUntil",
          "publishUntil must be a valid ISO date.",
        ),
      );
    }

    if (highlight.relatedContent) {
      validateRelatedReference(
        highlight.relatedContent,
        "highlight",
        highlight.id,
        issues,
      );
    }

    usedOrders.add(highlight.displayOrder);
  }
}

export function validateContent(): ValidationResult {
  const issues: ValidationIssue[] = [];

  const mediaIds = new Set(mediaAssets.map((item) => item.id));
  const albumIds = new Set(albums.map((item) => item.id));
  for (const [kind, records] of Object.entries({
    milestone: milestones,
    interview: interviews,
    news,
    award: awards,
    diaspora: diasporaInitiatives,
  })) {
    validateUniqueValues(
      records as readonly { id: string }[],
      kind,
      "id",
      (item) => item.id,
      (item) => item.id,
      issues,
    );
    for (const record of records) {
      validatePublicationStatus(
        "publicationStatus" in record
          ? record.publicationStatus
          : record.status,
        kind,
        record.id,
        issues,
      );
      for (const [field, value] of Object.entries(record)) {
        if (
          field.endsWith("MediaId") ||
          field === "mediaId" ||
          field === "mediaIds"
        ) {
          for (const id of Array.isArray(value)
            ? value
            : value
              ? [value]
              : []) {
            if (!mediaIds.has(id))
              issues.push(
                createIssue(
                  "error",
                  kind,
                  record.id,
                  field,
                  `Media "${id}" is not registered.`,
                ),
              );
          }
        }
        if (field === "albumId" && value && !albumIds.has(value))
          issues.push(
            createIssue(
              "error",
              kind,
              record.id,
              field,
              `Album "${value}" does not exist.`,
            ),
          );
      }
    }
  }

  validateMedia(issues);
  validateAlbums(issues);
  validateActivities(issues);
  validateEvents(issues);
  validateAwards(issues);
  validateChallenges(issues);
  validateHighlights(issues);

  const errors = issues.filter((issue) => issue.severity === "error");

  const warnings = issues.filter((issue) => issue.severity === "warning");

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    issues,
  };
}

export function assertValidContent(): void {
  const result = validateContent();

  if (result.valid) {
    return;
  }

  const message = result.errors
    .map(
      (issue) =>
        `[${issue.contentType}:${issue.contentId}] ${issue.field}: ${issue.message}`,
    )
    .join("\n");

  throw new Error(`SEAFA content validation failed:\n${message}`);
}
