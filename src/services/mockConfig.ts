/**
 * When true, services return canned mock responses instead of hitting the real API.
 * Controlled via the VITE_USE_MOCK_API env var (see .env.example).
 */
export const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

/** Simulates network latency for mock responses. */
export function mockDelay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
