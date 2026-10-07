/**
 * SEAFA public-content models.
 *
 * Rules:
 * - Unknown information stays optional.
 * - Dates use ISO 8601 strings.
 * - Images are registered once as MediaAsset records.
 * - Public pages only display published content.
 */

export type ID = string;

export type Locale = "fr" | "en";

export type PublicationStatus = "draft" | "published" | "archived";

export interface EventDate {
  value: string;
  precision: "year" | "month" | "day" | "datetime";
  timezone?: string;
}

export interface SEOInfo {
  title?: string;
  description?: string;
  socialImageId?: ID;
  canonicalPath?: string;
  noIndex?: boolean;
}

export interface ContentLink {
  label: string;
  href: string;
  external?: boolean;
}

export type ContentReferenceType =
  | "interview"
  | "diaspora"
  | "activity"
  | "challenge"
  | "event"
  | "award"
  | "milestone"
  | "album"
  | "news";

export interface ContentReference {
  type: ContentReferenceType;
  id: ID;
}

/* -------------------------------------------------------------------------- */
/* Media                                                                       */
/* -------------------------------------------------------------------------- */

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: string;
}

export interface MediaAsset extends ImageAsset {
  id: ID;
  caption?: string;
  blurDataURL?: string;
}

/* -------------------------------------------------------------------------- */
/* Members and team                                                            */
/* -------------------------------------------------------------------------- */

export type PlayingPosition =
  "goalkeeper" | "defender" | "midfielder" | "forward";

export type SquadFilter = PlayingPosition | "captain";

export type CaptaincyStatus = "captain" | "vice-captain" | "none";

export interface PublicStatistic {
  label: string;
  value: number;
  approvedAt: string;
  source: string;
}

export interface Player {
  id: ID;
  fullName: string;
  photograph?: ImageAsset;
  shirtNumber?: number;
  position?: PlayingPosition;
  preferredFoot?: "left" | "right" | "both";
  yearJoined?: number;
  captaincy?: CaptaincyStatus;
  biography?: string;
  publicStatistics: PublicStatistic[];
}

export type LeadershipRole =
  | "president"
  | "vice-president"
  | "secretary"
  | "treasurer"
  | "disciplinary-committee"
  | "match-statistics-administrator"
  | "executive-member";

export interface LeadershipMember {
  id: ID;
  fullName: string;
  role: LeadershipRole;
  roleLabel?: string;
  photograph?: ImageAsset;
  biography?: string;
  termStart?: EventDate;
  termEnd?: EventDate;
}

export type SupportRole =
  | "coach-coordinator"
  | "assistant-coach"
  | "physiotherapy-medical"
  | "equipment-manager"
  | "match-support";

export interface SupportMember {
  id: ID;
  fullName: string;
  role: SupportRole;
  roleLabel?: string;
  photograph?: ImageAsset;
  biography?: string;
}

export type HeritageCategory =
  | "founder"
  | "former-captain"
  | "long-serving"
  | "honorary"
  | "contributor"
  | "memorial";

export interface HonoraryMember {
  id: ID;
  fullName: string;
  category: HeritageCategory;
  photograph?: ImageAsset;
  description?: string;
  publicationApprovedAt: string;
}

export interface FormerPresident {
  id: ID;
  fullName: string;
  termStart?: EventDate;
  termEnd?: EventDate;
  photograph?: ImageAsset;
  biography?: string;
}

/* -------------------------------------------------------------------------- */
/* History                                                                     */
/* -------------------------------------------------------------------------- */

export interface HistoricalMilestone {
  mediaIds?: ID[];
  albumId?: ID;
  id: ID;
  slug: string;
  title: string;
  date?: EventDate;
  description: string;
  mediaId?: ID;
  source: string;
  verified: boolean;
  publicationStatus: PublicationStatus;
}

/* -------------------------------------------------------------------------- */
/* Shared albums                                                               */
/* -------------------------------------------------------------------------- */

export type AlbumType =
  | "activity"
  | "challenge"
  | "event"
  | "award"
  | "history"
  | "community"
  | "general";

export interface AlbumImage {
  mediaId: ID;
  caption?: string;
  date?: EventDate;
  order: number;
}

export interface Album {
  videos?: {
    src: string;
    title: string;
    originalSrc?: string;
    posterMediaId?: ID;
  }[];
  category?:
    | "football"
    | "challenges"
    | "history"
    | "awards"
    | "community"
    | "social"
    | "education"
    | "trips"
    | "diaspora"
    | "celebrations";
  id: ID;
  slug: string;
  title: string;
  type: AlbumType;
  categoryLabel?: string;
  coverMediaId?: ID;
  images: AlbumImage[];
  eventDate?: EventDate;
  endDate?: EventDate;
  location?: string;
  summary?: string;
  description?: string;
  relatedContent: ContentReference[];
  featured: boolean;
  publicationStatus: PublicationStatus;
  publishedAt?: string;
  seo?: SEOInfo;
}

/* -------------------------------------------------------------------------- */
/* Matches and Challenges                                                      */
/* -------------------------------------------------------------------------- */

export interface Match {
  id: ID;
  slug: string;
  title: string;
  date?: EventDate;
  location?: string;
  teams: [string, string];
  score?: [number, number];
  status: "scheduled" | "completed" | "cancelled";
  activityId?: ID;
  albumId?: ID;
  publicationStatus: PublicationStatus;
}

export interface Challenge {
  id: ID;
  slug: string;
  title: string;
  activityId: ID;
  albumId?: ID;
  format: "best-of-three";
  winsRequired: 2;
  captains?: [ID, ID];
  teamNames?: [string, string];
  matchIds: ID[];
  winnerTeam?: string;
  status: "planned" | "ongoing" | "completed";
  publicationStatus: PublicationStatus;
}

/* -------------------------------------------------------------------------- */
/* Activities                                                                  */
/* -------------------------------------------------------------------------- */

export type ActivityCategory =
  | "football"
  | "challenge"
  | "training"
  | "wellness"
  | "community-project"
  | "women-community"
  | "excursion"
  | "friendly-match"
  | "other";

export interface ApprovedParticipant {
  memberId: ID;
  publicationApprovedAt: string;
}

export interface Activity {
  id: ID;
  slug: string;
  title: string;
  category: ActivityCategory;
  albumId?: ID;
  date?: EventDate;
  endDate?: EventDate;
  location?: string;
  summary?: string;
  description?: string;
  matchId?: ID;
  challengeId?: ID;
  participants: ApprovedParticipant[];
  featured: boolean;
  publicationStatus: PublicationStatus;
  publishedAt?: string;
  newsId?: ID;
  eventId?: ID;
  seo?: SEOInfo;
}

/* -------------------------------------------------------------------------- */
/* Events                                                                      */
/* -------------------------------------------------------------------------- */

export type EventCategory =
  | "anniversary"
  | "meeting"
  | "celebration"
  | "community-gathering"
  | "special-visit"
  | "trip"
  | "social"
  | "other";

export type EventStatus = "upcoming" | "ongoing" | "completed";

export interface Event {
  id: ID;
  slug: string;
  title: string;
  category: EventCategory;
  albumId?: ID;
  startDate?: EventDate;
  endDate?: EventDate;
  location?: string;
  status: EventStatus;
  summary?: string;
  description?: string;
  activityId?: ID;
  featured: boolean;
  publicationStatus: PublicationStatus;
  publishedAt?: string;
  cta?: ContentLink;
  seo?: SEOInfo;
}

/* -------------------------------------------------------------------------- */
/* Awards                                                                      */
/* -------------------------------------------------------------------------- */

export type AwardCategory =
  | "team-trophy"
  | "challenge-champion"
  | "player-of-year"
  | "top-scorer"
  | "best-goalkeeper"
  | "best-captain"
  | "fair-play"
  | "leadership"
  | "long-service"
  | "community-contribution"
  | "ceremony"
  | "season-collection"
  | "other";

export interface AwardRecipient {
  type: "person" | "team";
  name: string;
  memberId?: ID;
}

export interface Award {
  recipientMediaId?: ID;
  actionMediaId?: ID;
  presentationMediaId?: ID;
  relatedAwardIds?: ID[];
  source?: string;
  id: ID;
  slug: string;
  title: string;
  category: AwardCategory;
  albumId?: ID;
  recipients: AwardRecipient[];
  year?: number;
  season?: string;
  description?: string;
  eventId?: ID;
  challengeId?: ID;
  memberIds: ID[];
  featured: boolean;
  publicationStatus: PublicationStatus;
  publishedAt?: string;
  seo?: SEOInfo;
}

/* -------------------------------------------------------------------------- */
/* News                                                                        */
/* -------------------------------------------------------------------------- */

export interface NewsArticle {
  category?: string;
  author?: string;
  featured?: boolean;
  sections?: { heading?: string; paragraphs: string[] }[];
  id: ID;
  slug: string;
  locale: Locale;
  title: string;
  summary?: string;
  body: string;
  coverMediaId?: ID;
  publishedAt?: string;
  status: "draft" | "published";
  activityId?: ID;
  eventId?: ID;
  awardId?: ID;
  albumId?: ID;
  seo?: SEOInfo;
}

/* -------------------------------------------------------------------------- */
/* Homepage highlights                                                         */
/* -------------------------------------------------------------------------- */

export type HighlightType =
  | "membership"
  | "recent-activity"
  | "historical-memory"
  | "match-invitation"
  | "upcoming-event"
  | "award"
  | "announcement";

export type HighlightTextAlignment = "left" | "center" | "right";

export interface HomepageHighlight {
  id: ID;
  title: string;
  message: string;
  desktopMediaId?: ID;
  mobileMediaId?: ID;
  type: HighlightType;
  date?: EventDate;
  relativeTimeLabel?: string;
  cta: ContentLink;
  textAlignment: HighlightTextAlignment;
  overlayStrength: number;
  displayOrder: number;
  publishFrom?: string;
  publishUntil?: string;
  active: boolean;
  relatedContent?: ContentReference;
}

/* -------------------------------------------------------------------------- */
/* Site settings                                                               */
/* -------------------------------------------------------------------------- */

export interface SocialLink {
  label: string;
  url: string;
}

export interface ContactDetails {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
}

export interface SiteSettings {
  heroMediaId?: ID;
  introductionMediaId?: ID;
  communityMediaId?: ID;
  diasporaMediaId?: ID;
  name: string;
  shortName: string;
  defaultLocale: "fr";
  supportedLocales: Locale[];
  foundingYear: number | null;
  foundingYearStatus: "unconfirmed" | "confirmed";
  slogan?: string;
  description?: string;
  mainLogoPath?: string;
  whiteLogoPath?: string;
  blackLogoPath?: string;
  stackedLogoPath?: string;
  iconLogoPath?: string;
  contact?: ContactDetails;
  socialLinks: SocialLink[];
  siteUrl?: string;
}

/* -------------------------------------------------------------------------- */
/* Compatibility aliases                                                       */
/* -------------------------------------------------------------------------- */

export type GalleryAlbum = Album;

export interface Interview {
  id: ID;
  slug: string;
  fullName: string;
  nickname?: string;
  relationship: string;
  kind: "interview" | "memory";
  highlight: string;
  summary: string;
  paragraphs: string[];
  portraitMediaId?: ID;
  activityMediaId?: ID;
  historicalMediaId?: ID;
  albumId?: ID;
  source: string;
  publicationStatus: PublicationStatus;
  seo?: SEOInfo;
}
export interface DiasporaProfile {
  id: ID;
  fullName: string;
  country: string;
  portraitMediaId?: ID;
  testimonial?: string;
  publicationStatus: PublicationStatus;
}
export interface DiasporaInitiative {
  id: ID;
  title: string;
  description: string;
  albumId?: ID;
  publicationStatus: PublicationStatus;
}
export type SEAFAChallenge = Challenge;

export interface GalleryImage extends MediaAsset {
  caption?: string;
  date?: EventDate;
  relatedHref?: string;
}
