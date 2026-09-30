import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TMDB_API_KEY } from '@env';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Base RTK Query API slice for TMDb. Intentionally has NO endpoints — each
 * screen slice (movie list, detail, search) injects its own endpoints via
 * `tmdbApi.injectEndpoints()`. Keeps this bootstrap slice small and every
 * future slice additive rather than a rewrite.
 *
 * Auth: TMDb accepts either an `api_key` query param or a bearer token.
 * We use the query param form here since `TMDB_API_KEY` is documented as a
 * v3 API key. Read from `.env` (via react-native-dotenv) — never hardcoded.
 */
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: TMDB_BASE_URL,
    prepareHeaders: headers => {
      headers.set('Accept', 'application/json');
      return headers;
    },
    paramsSerializer: (params: Record<string, unknown>) => {
      const search = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          search.append(key, String(value));
        }
      });
      if (TMDB_API_KEY) {
        search.append('api_key', TMDB_API_KEY);
      }
      return search.toString();
    },
  }),
  endpoints: () => ({}),
});
