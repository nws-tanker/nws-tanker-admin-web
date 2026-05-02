export function commonHeaders(): Record<string, string> {
  return {
    Accept: 'application/json',
    'X-Platform': 'web',
    'X-App-Version': import.meta.env.VITE_APP_VERSION ?? '0.0.0',
    'X-Request-Timestamp': new Date().toISOString(),
  };
}
