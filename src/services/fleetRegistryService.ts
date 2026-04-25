import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type { Tanker } from '@/types';
import { get } from './http';
import { MOCK_TANKERS } from '@/mocks/fleet-registry/tankers';
import { mockDelay, USE_MOCK } from './mockConfig';

export async function fetchFleetTankersApi(): Promise<ApiResponse<Tanker[]>> {
  if (USE_MOCK) {
    await mockDelay();
    return { success: true, data: MOCK_TANKERS };
  }

  return get<Tanker[]>(ENDPOINTS.fleetRegistry);
}
