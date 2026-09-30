import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { axiosClient } from './axiosClient';

type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
};

type AxiosBaseQueryError = {
  status?: number;
  data: unknown;
};

/**
 * Custom RTK Query `baseQuery` backed by our axios instance, instead of the
 * default `fetchBaseQuery`. Keeps RTK Query's caching/tags/persistence while
 * every actual HTTP call goes through axios (interceptors, timeouts, etc.).
 */
export function axiosBaseQuery(): BaseQueryFn<
  AxiosBaseQueryArgs,
  unknown,
  AxiosBaseQueryError
> {
  return async ({ url, method = 'GET', data, params }) => {
    try {
      const result = await axiosClient({ url, method, data, params });
      return { data: result.data };
    } catch (err) {
      const error = err as AxiosError;
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data ?? error.message,
        },
      };
    }
  };
}
