import type { TmdbUpcomingMoviesResponse } from '@app-types/tmdb';
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
  }),
  overrideExisting: false,
});

export const { useGetUpcomingMoviesInfiniteQuery } = moviesApi;
