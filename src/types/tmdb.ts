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
