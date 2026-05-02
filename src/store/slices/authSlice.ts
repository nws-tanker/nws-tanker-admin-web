import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ROUTE_ACCESS, type RouteKey } from '@/constants/routes';
import type { AuthUser, JwtPayload } from '@/types';
import type { RootState } from '../index';

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
    setAuth: (
      state,
      action: PayloadAction<{ token: string; payload: JwtPayload }>,
    ) => {
      const { token, payload } = action.payload;
      state.token = token;
      state.bootstrapped = true;
      state.user = {
        email: payload.sub,
        roleName: payload.role_name,
        userAccess: payload.user_access,
      };
    },
    clearAuth: () => ({ ...initialState, bootstrapped: true }),
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectIsBootstrapped = (state: RootState) =>
  state.auth.bootstrapped;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.user !== null;
export const selectUserAccess = (state: RootState) =>
  state.auth.user?.userAccess ?? [];

export const selectCanAccessRoute =
  (route: RouteKey) =>
  (state: RootState): boolean => {
    const required = ROUTE_ACCESS[route];
    if (required === null) return true;
    return state.auth.user?.userAccess.includes(required) ?? false;
  };
