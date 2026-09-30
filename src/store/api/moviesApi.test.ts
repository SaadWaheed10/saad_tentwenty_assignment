import { getNextUpcomingPageParam } from './moviesApi';
import type { TmdbUpcomingMoviesResponse } from '@app-types/tmdb';

function page(overrides: Partial<TmdbUpcomingMoviesResponse>): TmdbUpcomingMoviesResponse {
  return {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0,
    ...overrides,
  };
}

describe('getNextUpcomingPageParam', () => {
  it('requests the next page while more pages remain', () => {
    const lastPage = page({ total_pages: 5 });
    expect(getNextUpcomingPageParam(lastPage, 1)).toBe(2);
    expect(getNextUpcomingPageParam(lastPage, 4)).toBe(5);
  });

  it('stops paginating once the last page has been fetched', () => {
    const lastPage = page({ total_pages: 5 });
    expect(getNextUpcomingPageParam(lastPage, 5)).toBeUndefined();
  });

  it('stops immediately when TMDb reports a single page', () => {
    const lastPage = page({ total_pages: 1 });
    expect(getNextUpcomingPageParam(lastPage, 1)).toBeUndefined();
  });
});
