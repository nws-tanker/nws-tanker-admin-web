import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type { Lookups } from '@/types';
import { get } from './http';
import { MOCK_LOOKUPS } from '@/mocks/lookups/lookups';
import { mockDelay, USE_MOCK } from './mockConfig';

export async function fetchLookupsApi(): Promise<ApiResponse<Lookups>> {
  if (USE_MOCK) {
    await mockDelay();
    return { success: true, data: MOCK_LOOKUPS };
  }

  return get<Lookups>(ENDPOINTS.lookups);
}
