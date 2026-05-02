import { post } from './http';
import { LoginResponse } from '@/types';
import { ApiResponse } from '@/store/types';
import { ENDPOINTS } from '@/constants/endpoints';

export async function handleLogin(
  email: string,
  password: string,
): Promise<ApiResponse<LoginResponse>> {
  return post<LoginResponse>(ENDPOINTS.login, {
    userName: email,
    password,
  });
}
