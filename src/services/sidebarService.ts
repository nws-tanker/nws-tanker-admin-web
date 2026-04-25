import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type { SidebarData } from '@/types';
import { get } from './http';
import { MOCK_SIDEBAR_DATA } from '@/mocks/sidebar/sidebar';
import { mockDelay, USE_MOCK } from './mockConfig';

export async function fetchSidebarApi(): Promise<ApiResponse<SidebarData>> {
  if (USE_MOCK) {
    await mockDelay();
    return { success: true, data: MOCK_SIDEBAR_DATA };
  }

  return get<SidebarData>(ENDPOINTS.sidebar);
}
