import { get } from './http';
import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type { CurrentUser } from '@/types/currentUser';
import { MOCK_CURRENT_USER } from '@/mocks/current-user/me';
import { mockDelay, USE_MOCK } from './mockConfig';

export async function fetchCurrentUserApi(): Promise<ApiResponse<CurrentUser>> {
  if (USE_MOCK) {
    await mockDelay(300);
    return { success: true, data: MOCK_CURRENT_USER };
  }
  return get<CurrentUser>(ENDPOINTS.currentUser);
}
