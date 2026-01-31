export interface ApiSuccess<T> {
  success: true;
  httpStatus: number;
  message?: string;
  data: T;
}

export interface ApiFailure {
  success: false;
  httpStatus: number;
  message: string;
  errors?: unknown;
  isAuthError?: boolean;
  isNetworkError?: boolean;
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;
