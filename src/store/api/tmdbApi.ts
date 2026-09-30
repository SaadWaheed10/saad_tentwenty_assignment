import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@api/index';

/**
 * Base RTK Query API slice for TMDb. Intentionally has NO endpoints — each
 * screen slice (movie list, detail, search) injects its own endpoints via
 * `tmdbApi.injectEndpoints()`. Keeps this bootstrap slice small and every
 * future slice additive rather than a rewrite.
 *
 * HTTP calls go through axios (see src/api/axiosClient.ts) via a custom
 * baseQuery — RTK Query still owns caching/tags/persistence, axios owns the
 * actual request (interceptors, timeouts, api_key injection).
 */
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
