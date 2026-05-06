import { useEffect } from 'react';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { clearAuthToken, setAuthToken } from '@/services/http';
import { useAppDispatch } from '@/store';
import { clearAuth, setAuth } from '@/store/slices/authSlice';
import { decodeJwt, isJwtExpired } from '@/utils';

/**
 * Runs once on app startup to restore the user's session from localStorage.
 *
 * On every page load, Redux starts fresh with no user logged in.
 * This hook checks if a saved token exists in localStorage and,
 * if it is still valid, loads it back into the Redux store so the
 * user stays logged in without having to sign in again.
 *
 * It always finishes by dispatching either setAuth (valid token found)
 * or clearAuth (no token / expired token), which flips the `bootstrapped`
 * flag to true. That flag tells ProtectedRoute it is safe to check auth.
 */
export function useAuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.accessToken);

    /* No token saved — user has never logged in or already logged out. */
    if (!token) {
      clearAuthToken();
      dispatch(clearAuth());
      return;
    }

    const payload = decodeJwt(token);

    /* Token is unreadable or has expired — treat the user as logged out
     * and remove the stale token so it does not get used again. */
    if (!payload || isJwtExpired(payload)) {
      localStorage.removeItem(STORAGE_KEYS.accessToken);
      localStorage.removeItem(STORAGE_KEYS.userName);
      clearAuthToken();
      dispatch(clearAuth());
      return;
    }

    const userName = localStorage.getItem(STORAGE_KEYS.userName) ?? payload.sub;

    /* Token is valid — restore the user's session in Redux. */
    setAuthToken(token);
    dispatch(setAuth({ token, payload, userName }));
  }, [dispatch]);
}
