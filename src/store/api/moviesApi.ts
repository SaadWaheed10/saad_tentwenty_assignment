import type {
  TmdbGenresResponse,
  TmdbMovieDetail,
  TmdbSearchMoviesResponse,
  TmdbUpcomingMoviesResponse,
  TmdbVideosResponse,
} from '@app-types/tmdb';
import { tmdbApi } from './tmdbApi';

/**
 * Pure page-param logic for the upcoming-movies list, pulled out of the
 * endpoint definition so it's unit-testable without spinning up RTK Query.
 * TMDb's `total_pages` tells us when to stop asking for more.
 */
export function getNextUpcomingPageParam(
  lastPage: TmdbUpcomingMoviesResponse,
  lastPageParam: number,
): number | undefined {
  return lastPageParam < lastPage.total_pages ? lastPageParam + 1 : undefined;
}

/**
 * Movie-resource endpoints, injected into the shared `tmdbApi` base slice
 * (see tmdbApi.ts for why it starts endpoint-free). Grouped by TMDb
 * resource ("movies") rather than by screen, since detail/search slices
 * will extend this same file later.
 */
export const moviesApi = tmdbApi.injectEndpoints({
  endpoints: builder => ({
    /**
     * `GET /movie/upcoming`, paginated. Screen 01 (movie list) drives this
     * via `useGetUpcomingMoviesInfiniteQuery`, which appends pages as the
     * user scrolls and re-serves the merged cache instantly on relaunch
     * (persisted by redux-persist — see src/store/store.ts).
     */
    getUpcomingMovies: builder.infiniteQuery<TmdbUpcomingMoviesResponse, void, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) =>
          getNextUpcomingPageParam(lastPage, lastPageParam),
      },
      query: ({ pageParam }) => ({
        url: '/movie/upcoming',
        params: { page: pageParam },
      }),
    }),

    /**
     * `GET /movie/{id}` — Screen 02 (movie detail, Figma frame 42:756).
     * Cached per movie id so revisiting a detail screen is instant and
     * offline-capable, same persisted-cache strategy as the list.
     */
    getMovieDetail: builder.query<TmdbMovieDetail, number>({
      query: id => ({ url: `/movie/${id}` }),
    }),

    /**
     * `GET /movie/{id}/videos` — source of the trailer's YouTube key for
     * the full-screen trailer flow (see screens/TrailerPlayer).
     */
    getMovieVideos: builder.query<TmdbVideosResponse, number>({
      query: id => ({ url: `/movie/${id}/videos` }),
    }),

    /**
     * `GET /search/movie` — Screen 03. Keyed by the raw query string, so
     * each distinct search term gets its own RTK Query cache entry. This
     * is what actually guarantees "results always match the current
     * query": changing the hook's arg (query) switches which cache entry
     * is read, so an older in-flight request resolving late can never
     * overwrite what's on screen for a newer query — no manual
     * abort/race-tracking needed.
     */
    searchMovies: builder.query<TmdbSearchMoviesResponse, string>({
      query: query => ({ url: '/search/movie', params: { query } }),
    }),

    /**
     * `GET /genre/movie/list` — a small, static, unparameterised lookup
     * table (no `id` arg, one shared cache entry). Used to label search
     * results with a genre name (Figma's search result rows show a genre
     * under the title) instead of the raw `genre_ids` TMDb returns.
     */
    getGenres: builder.query<TmdbGenresResponse, void>({
      query: () => ({ url: '/genre/movie/list' }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUpcomingMoviesInfiniteQuery,
  useGetMovieDetailQuery,
  useGetMovieVideosQuery,
  useSearchMoviesQuery,
  useGetGenresQuery,
} = moviesApi;
