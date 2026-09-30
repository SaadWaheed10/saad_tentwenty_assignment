import { TMDB_IMAGE_BASE_URL } from '@env';

// Fallback only used if TMDB_IMAGE_BASE_URL is missing from .env — mirrors
// the pattern in axiosClient.ts (real value should come from env).
const FALLBACK_TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

/** Poster sizes TMDb serves — narrowed to what this app actually uses. */
export type TmdbPosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'original';

/**
 * Builds a full TMDb image URL from a `poster_path`/`backdrop_path` and a
 * size. Returns `null` when there's no path so callers can render a
 * placeholder instead of a broken image.
 */
export function getTmdbImageUrl(
  path: string | null | undefined,
  size: TmdbPosterSize = 'w342',
): string | null {
  if (!path) {
    return null;
  }
  const base = TMDB_IMAGE_BASE_URL ?? FALLBACK_TMDB_IMAGE_BASE_URL;
  return `${base}/${size}${path}`;
}
