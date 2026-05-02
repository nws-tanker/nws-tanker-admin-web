import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type { Permit, PermitStatus, Tanker, TankerType } from '@/types';
import { PERMIT_STATUS, TANKER_TYPE } from '@/types';
import { get } from './http';
import { mockDelay, USE_MOCK } from './mockConfig';
import { MOCK_TANKERS } from '@/mocks/fleet-registry/tankers';

type ApiTanker = {
  plateNumber: string;
  tankerType: string;
  ownerName: string;
  status: string | null;
  cardNo: string | null;
  contractType: string;
  governorate: string;
  operationRegion: string | null;
  contactNumber: string;
  dueDate: string | null;
  daysUntilDue: number | null;
  submittedAt: string | null;
};

type ApiFleetResponse = {
  vehicles: ApiTanker[];
  metaData: { renewalThresholdDays: number };
};

const TANKER_TYPE_BY_LABEL: Record<string, TankerType> = {
  'Drinking Water': TANKER_TYPE.DRINKING_WATER,
  'Sewage Water': TANKER_TYPE.SEWAGE_WATER,
  'Treated Effluent': TANKER_TYPE.TREATED_EFFLUENT,
};

function mapPermit(raw: ApiTanker): Permit {
  let status: PermitStatus = PERMIT_STATUS.NO_PERMIT;
  if (raw.status === 'approved') {
    status =
      raw.daysUntilDue !== null && raw.daysUntilDue < 0
        ? PERMIT_STATUS.EXPIRED
        : PERMIT_STATUS.ACTIVE;
  }
  return {
    status,
    permitNumber: raw.cardNo,
    issuedAt: raw.submittedAt,
    validUntil: raw.dueDate,
  };
}

function mapApiTanker(raw: ApiTanker): Tanker {
  return {
    id: raw.plateNumber,
    plateNo: raw.plateNumber,
    owner: raw.ownerName,
    tankerType:
      TANKER_TYPE_BY_LABEL[raw.tankerType] ?? TANKER_TYPE.DRINKING_WATER,
    governorate: raw.governorate,
    cluster: raw.operationRegion ?? '',
    contact: raw.contactNumber,
    permit: mapPermit(raw),
  };
}

export async function fetchFleetTankersApi(): Promise<ApiResponse<Tanker[]>> {
  if (USE_MOCK) {
    await mockDelay();
    return { success: true, data: MOCK_TANKERS };
  }

  const response = await get<ApiFleetResponse>(ENDPOINTS.fleetRegistry);
  if (!response.success) return response;
  return { success: true, data: response.data.vehicles.map(mapApiTanker) };
}
