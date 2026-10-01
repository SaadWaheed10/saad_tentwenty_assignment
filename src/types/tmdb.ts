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

/** `GET /search/movie?query=...` — Screen 03. Same shape as the upcoming list. */
export type TmdbSearchMoviesResponse = TmdbPagedResponse<TmdbMovie>;

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

/** `GET /genre/movie/list` — used to label search results by genre name. */
export type TmdbGenresResponse = { genres: TmdbGenre[] };

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

/** One image entry from `GET /movie/{id}/images` (posters or backdrops). */
export type TmdbImage = {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
  vote_average: number;
  vote_count: number;
  iso_639_1: string | null;
};

export type TmdbImagesResponse = {
  id: number;
  backdrops: TmdbImage[];
  posters: TmdbImage[];
};
