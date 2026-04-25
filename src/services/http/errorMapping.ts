import type { ApiResponse } from '@/store/types';

export function buildErrorResponse<T>(
  code: string,
  description: string,
): ApiResponse<T> {
  return {
    success: false,
    error: { code, description },
  };
}

const STATUS_CODE_MAP: Record<number, string> = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  408: 'TIMEOUT',
  409: 'CONFLICT',
  422: 'UNPROCESSABLE_ENTITY',
  429: 'TOO_MANY_REQUESTS',
  500: 'INTERNAL_SERVER_ERROR',
  502: 'BAD_GATEWAY',
  503: 'SERVICE_UNAVAILABLE',
  504: 'GATEWAY_TIMEOUT',
};

const STATUS_DESCRIPTION_MAP: Record<number, string> = {
  400: 'The request was invalid',
  401: 'Authentication required. Please log in again',
  403: 'You do not have permission to perform this action',
  404: 'The requested resource was not found',
  408: 'Request timed out',
  409: 'Request conflicts with current state',
  422: 'The submitted data is invalid',
  429: 'Too many requests. Please try again later',
  500: 'An internal server error occurred',
  502: 'Server is temporarily unavailable',
  503: 'Service is temporarily unavailable',
  504: 'Server did not respond in time',
};

export function httpStatusToCode(status: number): string {
  return STATUS_CODE_MAP[status] ?? `HTTP_${status}`;
}

export function httpStatusToDescription(status: number): string {
  return STATUS_DESCRIPTION_MAP[status] ?? `Server returned status ${status}`;
}
