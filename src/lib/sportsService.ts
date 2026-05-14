// src/lib/sportsService.ts
import { FileCache } from './cache';
import { fetchAllSports } from './api/odds';
import { STATIC_IMAGE_MAP } from './leagueImages';
import type { OddsSport } from './api/odds';

export interface EnrichedSport extends OddsSport {
  image: string | null;
}

const CACHE_FILE = 'enriched_sports.json';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
const cache = new FileCache<EnrichedSport[]>(CACHE_FILE, CACHE_TTL);

/**
 * Enrich a single OddsSport with its image URL.
 * Uses the sport_key directly to look up the static map.
 */
function enrichSport(sport: OddsSport): EnrichedSport {
  return {
    ...sport,
    image: STATIC_IMAGE_MAP[sport.key] ?? null,
  };
}

/**
 * Returns all available sports enriched with images.
 * Data is cached locally (TTL 24h) to respect the free API tier.
 * Pass forceRefresh = true to bypass cache and fetch fresh data.
 */
export async function getEnrichedSports(
  forceRefresh = false
): Promise<EnrichedSport[]> {
  if (!forceRefresh) {
    const cached = await cache.get();
    if (cached) return cached;
  }

  const oddsSports = await fetchAllSports();
  const enriched = oddsSports.map(enrichSport);

  await cache.set(enriched, CACHE_TTL);
  return enriched;
}