import { post } from './http';
import { LoginResponse, RefreshTokenResponse } from '@/types';
import { ApiResponse } from '@/store/types';
import { ENDPOINTS } from '@/constants/endpoints';

export async function handleLogin(
  email: string,
  password: string,
): Promise<ApiResponse<LoginResponse>> {
  return post<LoginResponse>(ENDPOINTS.login, {
    email,
    password,
  });
}

export async function handleRefreshAccessToken(
  refresh_token: string,
): Promise<ApiResponse<RefreshTokenResponse>> {
  return post<RefreshTokenResponse>(ENDPOINTS.refreshToken, {
    refresh_token,
  });
}
