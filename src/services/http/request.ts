import axios, { type AxiosRequestConfig } from 'axios';

import type { ApiResponse } from '@/store/types';

import { client, DEFAULT_TIMEOUT } from './client';
import { commonHeaders } from './commonHeaders';
import {
  buildErrorResponse,
  httpStatusToCode,
  httpStatusToDescription,
} from './errorMapping';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiRequestConfig = {
  url: string;
  method?: HttpMethod;
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
  baseUrl?: string;
};

export async function apiRequest<T>(
  config: ApiRequestConfig,
): Promise<ApiResponse<T>> {
  const {
    url,
    method = 'GET',
    params,
    body,
    headers = {},
    timeout,
    baseUrl,
  } = config;

  try {
    const axiosConfig: AxiosRequestConfig = {
      url,
      method,
      params,
      data: body,
      timeout: timeout ?? DEFAULT_TIMEOUT,
      headers: {
        ...commonHeaders(),
        ...headers,
      },
    };

    if (baseUrl) {
      axiosConfig.baseURL = baseUrl;
    }

    const response = await client.request<ApiResponse<T>>(axiosConfig);
    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      return buildErrorResponse(
        'UNKNOWN_ERROR',
        'An unexpected error occurred',
      );
    }

    if (error.response) {
      const { status, data } = error.response;
      if (data && data.success === false && data.error) {
        return data as ApiResponse<T>;
      }
      return buildErrorResponse(
        httpStatusToCode(status),
        httpStatusToDescription(status),
      );
    }

    if (error.request) {
      if (error.code === 'ECONNABORTED') {
        return buildErrorResponse('TIMEOUT', 'Request timed out');
      }
      return buildErrorResponse('NETWORK_ERROR', 'Unable to connect to server');
    }

    return buildErrorResponse('REQUEST_SETUP_ERROR', error.message);
  }
}

// ── Shorthand methods ─────────────────────────────────────────────
export function get<T>(
  url: string,
  params?: ApiRequestConfig['params'],
  config?: Omit<ApiRequestConfig, 'url' | 'method' | 'params'>,
) {
  return apiRequest<T>({ ...config, url, method: 'GET', params });
}

export function post<T>(
  url: string,
  body?: unknown,
  config?: Omit<ApiRequestConfig, 'url' | 'method' | 'body'>,
) {
  return apiRequest<T>({ ...config, url, method: 'POST', body });
}

export function put<T>(
  url: string,
  body?: unknown,
  config?: Omit<ApiRequestConfig, 'url' | 'method' | 'body'>,
) {
  return apiRequest<T>({ ...config, url, method: 'PUT', body });
}

export function patch<T>(
  url: string,
  body?: unknown,
  config?: Omit<ApiRequestConfig, 'url' | 'method' | 'body'>,
) {
  return apiRequest<T>({ ...config, url, method: 'PATCH', body });
}

export function del<T>(
  url: string,
  config?: Omit<ApiRequestConfig, 'url' | 'method'>,
) {
  return apiRequest<T>({ ...config, url, method: 'DELETE' });
}
