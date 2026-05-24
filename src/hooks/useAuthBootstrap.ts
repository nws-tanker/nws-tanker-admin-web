import { useEffect } from 'react';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import {
  clearAuthToken,
  refreshAccessToken,
  setAuthToken,
} from '@/services/http';
import { useAppDispatch } from '@/store';
import { clearAuth, setAuth } from '@/store/slices/authSlice';
import { decodeJwt, isJwtExpired } from '@/utils';

/**
 * Runs once on app startup to restore the user's session from localStorage.
 *
 * On every page load, Redux starts fresh with no user logged in.
 * This hook checks if a saved token exists in localStorage and, if it is
 * still valid, loads it back into Redux so the user stays signed in.
 *
 * If the access token has expired but a refresh token is present, it tries
 * to obtain a new access token transparently before giving up. Without this
 * step, every reload after the (short) access-token TTL would silently sign
 * the user out even though their refresh token is still valid.
 *
 * It always finishes by dispatching either setAuth (valid token found or
 * refreshed) or clearAuth (no token / refresh failed), which flips the
 * `bootstrapped` flag to true so ProtectedRoute can safely check auth.
 */
export function useAuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const token = localStorage.getItem(STORAGE_KEYS.accessToken);

      /* No token saved — user has never logged in or already logged out. */
      if (!token) {
        clearAuthToken();
        if (!cancelled) dispatch(clearAuth());
        return;
      }

      const payload = decodeJwt(token);

      /* Token is unreadable — it cannot be refreshed either; treat as logged out. */
      if (!payload) {
        localStorage.removeItem(STORAGE_KEYS.accessToken);
        localStorage.removeItem(STORAGE_KEYS.userName);
        clearAuthToken();
        if (!cancelled) dispatch(clearAuth());
        return;
      }

      /* Access token expired — try the refresh token before signing out.
       * refreshAccessToken handles persisting the new tokens and setting
       * the axios Authorization header; it returns null on failure. */
      if (isJwtExpired(payload)) {
        const newAccessToken = await refreshAccessToken();
        if (cancelled) return;
        if (!newAccessToken) {
          localStorage.removeItem(STORAGE_KEYS.accessToken);
          localStorage.removeItem(STORAGE_KEYS.refreshToken);
          localStorage.removeItem(STORAGE_KEYS.userName);
          clearAuthToken();
          dispatch(clearAuth());
          return;
        }
        const newPayload = decodeJwt(newAccessToken);
        if (!newPayload) {
          clearAuthToken();
          dispatch(clearAuth());
          return;
        }
        const userName =
          localStorage.getItem(STORAGE_KEYS.userName) ?? newPayload.sub;
        dispatch(
          setAuth({ token: newAccessToken, payload: newPayload, userName }),
        );
        return;
      }

      const userName =
        localStorage.getItem(STORAGE_KEYS.userName) ?? payload.sub;

      /* Token is valid — restore the user's session in Redux. */
      setAuthToken(token);
      if (!cancelled) dispatch(setAuth({ token, payload, userName }));
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);
}
