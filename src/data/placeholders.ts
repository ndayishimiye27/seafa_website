import type {
  HonoraryMember,
  Match,
  Player,
  SupportMember,
} from "@/types/content";

export const players: Player[] = [];

import { currentPresident } from "@/data/presidency";
export const leadership = [currentPresident];

export const support: SupportMember[] = [];

export const honoraryMembers: HonoraryMember[] = [];

export { presidentialSuccession as formerPresidents } from "@/data/presidency";

export { milestones } from "@/data/history";

export const matches: Match[] = [];

export { news } from "@/data/news";

/**
 * Compatibility exports.
 *
 * These records retain one canonical source while older imports continue
 * working during implementation.
 */
export { activities } from "@/data/activities";
export { challenges } from "@/data/activities/challenges";
export { awards } from "@/data/awards";
