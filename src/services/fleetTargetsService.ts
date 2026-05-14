import { ENDPOINTS } from '@/constants/endpoints';
import type {
  FleetTargetsApiResponse,
  SaveFleetTargetsRequest,
} from '@/types/configuration';
import type { ApiResponse } from '@/store/types';
import { get, put } from './http';

export async function fetchFleetTargetsApi(): Promise<
  ApiResponse<FleetTargetsApiResponse>
> {
  return get<FleetTargetsApiResponse>(ENDPOINTS.fleetTargets, undefined);
}

export async function saveFleetTargetsApi(
  body: SaveFleetTargetsRequest,
): Promise<ApiResponse<void>> {
  return put<void>(ENDPOINTS.fleetTargets, body);
}
