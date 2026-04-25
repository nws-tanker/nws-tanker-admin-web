export enum States {
  PRELOADING = 'PRELOADING',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export type ApiError = {
  code: string;
  description: string;
};

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  error: ApiError;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type ApiState<T> = {
  apiState: States;
  data: T | null;
  error: ApiError | null;
};

/**
 * Roll up multiple API states into a single state for screens that depend on
 * several endpoints loading together.
 *   - any ERROR     → ERROR
 *   - all SUCCESS   → SUCCESS
 *   - otherwise     → LOADING
 */
export function rollupApiStates(...states: States[]): States {
  if (states.some((s) => s === States.ERROR)) return States.ERROR;
  if (states.every((s) => s === States.SUCCESS)) return States.SUCCESS;
  return States.LOADING;
}
