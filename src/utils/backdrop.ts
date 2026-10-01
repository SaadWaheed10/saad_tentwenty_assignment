import type { TmdbImage } from '@app-types/tmdb';

/**
 * Picks the best landscape backdrop path from TMDb `/images` results.
 * Prefers higher `vote_average`, then falls back to the first entry.
 * Returns `null` when there are no usable backdrops.
 */
export function pickBestBackdropPath(backdrops: TmdbImage[] | undefined): string | null {
  if (!backdrops || backdrops.length === 0) {
    return null;
  }
  const ranked = [...backdrops].sort((a, b) => b.vote_average - a.vote_average);
  return ranked[0]?.file_path ?? null;
}
