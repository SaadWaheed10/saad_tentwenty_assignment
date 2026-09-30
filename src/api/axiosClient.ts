import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '@env';

// Fallback only used if TMDB_BASE_URL is missing from .env — the real value
// should come from env, not be hardcoded here.
const FALLBACK_TMDB_BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Single axios instance for all TMDb calls. Injects `api_key` on every
 * request via an interceptor so callers never have to remember it.
 */
export const axiosClient = axios.create({
  baseURL: TMDB_BASE_URL ?? FALLBACK_TMDB_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
});

axiosClient.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    ...(TMDB_API_KEY ? { api_key: TMDB_API_KEY } : {}),
  };
  return config;
});
