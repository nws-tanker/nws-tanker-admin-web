import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

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
