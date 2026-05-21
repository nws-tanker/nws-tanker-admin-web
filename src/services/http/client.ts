import axios, { type AxiosRequestConfig } from 'axios';

import { ENDPOINTS } from '@/constants/endpoints';
import { ROUTES } from '@/constants/routes';
import { STORAGE_KEYS } from '@/constants/storageKeys';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

const TOKEN_EXPIRED_CODE = 'UNAUTHORIZED';
const TOKEN_EXPIRED_DESCRIPTION =
  'Your session has expired or the token is no longer valid. Please sign in again.';

export const DEFAULT_TIMEOUT = 30_000;

export const client = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
});

export function setAuthToken(token: string) {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function clearAuthToken() {
  delete client.defaults.headers.common['Authorization'];
}

type QueuedRequest = {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: AxiosRequestConfig;
};

let isRefreshing = false;
let queue: QueuedRequest[] = [];

function flushQueue(token: string) {
  const pending = queue;
  queue = [];
  pending.forEach(({ config, resolve, reject }) => {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    client(config).then(resolve).catch(reject);
  });
}

function rejectQueue(reason: unknown) {
  const pending = queue;
  queue = [];
  pending.forEach(({ reject }) => reject(reason));
}

function forceLogout() {
  clearAuthToken();
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);
  localStorage.removeItem(STORAGE_KEYS.userName);
  import('@/store').then(({ store, resetAllApiData }) => {
    store.dispatch(resetAllApiData());
  });
  window.location.href = ROUTES.authentication;
}

/**
 * Performs a one-shot refresh of the access token using the stored refresh
 * token, persists the new tokens, and updates the axios default Authorization
 * header. Returns the new access token, or null if refresh failed / no refresh
 * token was available.
 *
 * Exposed so non-axios call sites (e.g. session bootstrap on page load) can
 * reuse the same refresh path as the response interceptor.
 */
export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken);
  if (!refreshToken) return null;
  try {
    const { data } = await axios.post(
      `${BASE_URL}${ENDPOINTS.refreshToken}`,
      { refresh_token: refreshToken },
      { timeout: DEFAULT_TIMEOUT },
    );
    const newAccessToken: string = data.data.access_token;
    const newRefreshToken: string = data.data.refresh_token;
    localStorage.setItem(STORAGE_KEYS.accessToken, newAccessToken);
    localStorage.setItem(STORAGE_KEYS.refreshToken, newRefreshToken);
    setAuthToken(newAccessToken);
    return newAccessToken;
  } catch {
    return null;
  }
}

/**
 * Intercepts 401 TOKEN_EXPIRED responses and transparently refreshes the access
 * token.
 *
 * - If a refresh is already in flight, queues the failed request and retries it
 *   once the refresh completes — preventing multiple simultaneous refresh calls.
 * - If no refresh token is stored, short-circuits to forceLogout (no point
 *   calling the refresh endpoint with a null token).
 * - On refresh failure, rejects every queued request so callers stop hanging,
 *   clears all auth state, and redirects to the authentication page.
 */
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorData = error.response?.data?.error;
    const isTokenExpired =
      errorData?.code === TOKEN_EXPIRED_CODE &&
      errorData?.description === TOKEN_EXPIRED_DESCRIPTION;

    if (!isTokenExpired) return Promise.reject(error);

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject, config: error.config });
      });
    }

    if (!localStorage.getItem(STORAGE_KEYS.refreshToken)) {
      forceLogout();
      return Promise.reject(error);
    }

    isRefreshing = true;
    try {
      const newAccessToken = await refreshAccessToken();
      if (!newAccessToken) {
        rejectQueue(error);
        forceLogout();
        return Promise.reject(error);
      }
      flushQueue(newAccessToken);
      error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return client(error.config);
    } catch (refreshError) {
      rejectQueue(refreshError);
      forceLogout();
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);
