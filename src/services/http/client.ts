import axios from 'axios';

import { ENDPOINTS } from '@/constants/endpoints';
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

let isRefreshing = false;
let queue: Array<(token: string) => void> = [];

function flushQueue(token: string) {
  queue.forEach((cb) => cb(token));
  queue = [];
}

function forceLogout() {
  queue = [];
  clearAuthToken();
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);
  window.location.href = '/login';
}

/**
 * Intercepts 401 TOKEN_EXPIRED responses and transparently refreshes the access token.
 *
 * - If a refresh is already in flight, queues the failed request and retries it
 *   once the refresh completes — preventing multiple simultaneous refresh calls.
 * - On refresh failure, clears all auth state and redirects to /login.
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
      return new Promise((resolve) => {
        queue.push((token) => {
          error.config.headers['Authorization'] = `Bearer ${token}`;
          resolve(client(error.config));
        });
      });
    }

    isRefreshing = true;
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken);
      const { data } = await axios.post(
        `${BASE_URL}${ENDPOINTS.refreshToken}`,
        {
          refresh_token: refreshToken,
        },
      );
      const newAccessToken: string = data.data.access_token;
      const newRefreshToken: string = data.data.refresh_token;
      localStorage.setItem(STORAGE_KEYS.accessToken, newAccessToken);
      localStorage.setItem(STORAGE_KEYS.refreshToken, newRefreshToken);
      setAuthToken(newAccessToken);
      flushQueue(newAccessToken);
      error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return client(error.config);
    } catch {
      forceLogout();
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);
