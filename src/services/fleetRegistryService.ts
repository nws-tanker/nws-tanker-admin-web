import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type { Tanker, TankerType } from '@/types';
import { TANKER_TYPE } from '@/types';
import { get } from './http';
import { mockDelay, USE_MOCK } from './mockConfig';
import { MOCK_TANKERS } from '@/mocks/fleet-registry/tankers';

type ApiTanker = {
  tankerId: number;
  plateNo: string;
  owner: string;
  tankerType: string;
  governorate: string;
  cluster: string;
  contact: string;
  permit: Tanker['permit'];
};

const TANKER_TYPE_BY_LABEL: Record<string, TankerType> = {
  'Drinking Water': TANKER_TYPE.DRINKING_WATER,
  'Sewage Water': TANKER_TYPE.SEWAGE_WATER,
  'Treated Effluent': TANKER_TYPE.TREATED_EFFLUENT,
};

function mapApiTanker(raw: ApiTanker): Tanker {
  return {
    id: String(raw.tankerId),
    plateNo: raw.plateNo,
    owner: raw.owner,
    tankerType:
      TANKER_TYPE_BY_LABEL[raw.tankerType] ?? TANKER_TYPE.DRINKING_WATER,
    governorate: raw.governorate,
    cluster: raw.cluster,
    contact: raw.contact,
    permit: raw.permit,
  };
}

export async function fetchFleetTankersApi(): Promise<ApiResponse<Tanker[]>> {
  if (USE_MOCK) {
    await mockDelay();
    return { success: true, data: MOCK_TANKERS };
  }

  const response = await get<ApiTanker[]>(ENDPOINTS.fleetRegistry);
  if (!response.success) return response;
  return { success: true, data: response.data.map(mapApiTanker) };
}
