import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { hasRouteAccess, type RouteKey } from '@/constants/routes';
import type { AuthUser, JwtPayload } from '@/types';
import type { RootState } from '../index';

/**
 * Represents the authentication state stored in Redux.
 *
 * - token        : the raw JWT string received from the server after login.
 * - user         : the decoded user info (email, role, access list).
 * - bootstrapped : becomes true once the app has finished checking localStorage
 *                  on startup. Guards like ProtectedRoute must wait for this
 *                  before deciding whether the user is logged in or not.
 */
type AuthState = {
  token: string | null;
  user: AuthUser | null;
  bootstrapped: boolean;
};

const initialState: AuthState = {
  token: null,
  user: null,
  bootstrapped: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Called after a successful login or when a valid token is restored
     * from localStorage on page load. Stores the token and user details.
     */
    setAuth: (
      state,
      action: PayloadAction<{
        token: string;
        payload: JwtPayload;
        userName: string;
      }>,
    ) => {
      const { token, payload, userName } = action.payload;
      state.token = token;
      state.bootstrapped = true;
      state.user = {
        email: payload.sub,
        userName,
        roleName: payload.role_name,
        userAccess: payload.user_access,
      };
    },

    /**
     * Called on logout, or when no valid token is found on page load.
     * Resets auth back to the empty state but keeps bootstrapped=true
     * so ProtectedRoute knows the check is done and can redirect to login.
     */
    clearAuth: () => ({ ...initialState, bootstrapped: true }),
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;

/** Returns the full user object, or null if not logged in. */
export const selectAuthUser = (state: RootState) => state.auth.user;

/**
 * Returns true once the startup token check is complete.
 * ProtectedRoute returns null until this is true to avoid
 * a premature redirect on page reload.
 */
export const selectIsBootstrapped = (state: RootState) =>
  state.auth.bootstrapped;

/** Returns true if a user is currently logged in. */
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.user !== null;

/** Returns the list of access keys the current user holds. */
export const selectUserAccess = (state: RootState) =>
  state.auth.user?.userAccess ?? [];

/**
 * Returns a selector that checks whether the current user is allowed
 * to visit a given route based on their access list.
 * Routes with a null access requirement are open to all logged-in users.
 */
export const selectCanAccessRoute =
  (route: RouteKey) =>
  (state: RootState): boolean =>
    hasRouteAccess(route, state.auth.user?.userAccess ?? []);
