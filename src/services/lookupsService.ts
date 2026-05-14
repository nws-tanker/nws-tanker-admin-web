import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type { Lookups } from '@/types';
import { get } from './http';

export async function fetchLookupsApi(): Promise<ApiResponse<Lookups>> {
  return get<Lookups>(ENDPOINTS.lookups);
}
