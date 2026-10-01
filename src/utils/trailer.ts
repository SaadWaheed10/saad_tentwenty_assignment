import type { TmdbVideo } from '@app-types/tmdb';

/**
 * Picks the best YouTube trailer from a `/movie/{id}/videos` response:
 * prefers an official "Trailer" over any other YouTube video type (e.g.
 * "Teaser", "Clip"), and ignores non-YouTube sites entirely since we can
 * only construct a playback URL (per AGENTS.md) for YouTube's `site`+`key`.
 */
export function pickBestTrailer(videos: TmdbVideo[] | undefined): TmdbVideo | null {
  if (!videos || videos.length === 0) {
    return null;
  }
  const youtube = videos.filter(v => v.site === 'YouTube');
  if (youtube.length === 0) {
    return null;
  }
  const officialTrailer = youtube.find(v => v.type === 'Trailer' && v.official);
  if (officialTrailer) {
    return officialTrailer;
  }
  const anyTrailer = youtube.find(v => v.type === 'Trailer');
  if (anyTrailer) {
    return anyTrailer;
  }
  return youtube[0];
}
