import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type { CurrentUser } from '@/types/currentUser';
import { get } from './http';

export async function fetchCurrentUserApi(): Promise<ApiResponse<CurrentUser>> {
  return get<CurrentUser>(ENDPOINTS.currentUser);
}
