import type { Challenge } from "@/types/content";

/**
 * SEAFA Challenge registry.
 *
 * A SEAFA Challenge:
 * - is played between two teams selected by two captains;
 * - uses a best-of-three format;
 * - is won by the first team to win two matches.
 *
 * Captain records, private team selection and internal statistics will belong
 * to the future private member portal.
 */
export const challenges: Challenge[] = [];

/**
 * Keep Challenges as drafts until the captains, matches and official result
 * have been verified and approved for public publication.
 */
