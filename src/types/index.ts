export type Nullable<T> = T | null;

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};
