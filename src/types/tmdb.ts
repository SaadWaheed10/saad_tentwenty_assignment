/**
 * Shared TMDb response shapes. Kept close to the raw API response — screens
 * map these to view-friendly props rather than us inventing a parallel
 * "domain model" for a 4-screen assignment.
 *
 * Reference: https://developer.themoviedb.org/reference/movie-upcoming-list
 */
export type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  adult: boolean;
  genre_ids: number[];
};

export type TmdbPagedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type TmdbUpcomingMoviesResponse = TmdbPagedResponse<TmdbMovie>;

export type TmdbGenre = { id: number; name: string };

/**
 * `GET /movie/{id}` — superset of the list-item shape (TmdbMovie) plus
 * detail-only fields the Detail screen (Figma frame 42:756) actually uses.
 */
export type TmdbMovieDetail = TmdbMovie & {
  genres: TmdbGenre[];
  runtime: number | null;
  tagline: string;
};

/** `GET /movie/{id}/videos` — we only use YouTube trailers from this. */
export type TmdbVideo = {
  id: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
  name: string;
};

export type TmdbVideosResponse = {
  id: number;
  results: TmdbVideo[];
};
