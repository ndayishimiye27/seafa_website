import type {
  FormerPresident,
  HonoraryMember,
  LeadershipMember,
  Match,
  Player,
  SupportMember,
} from "@/types/content";

export const players: Player[] = [];

export const leadership: LeadershipMember[] = [];

export const support: SupportMember[] = [];

export const honoraryMembers: HonoraryMember[] = [];

export const formerPresidents: FormerPresident[] = [];

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
