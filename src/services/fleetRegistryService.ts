import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type { Permit, Tanker } from '@/types';
import { PERMIT_STATUS, TANKER_TYPE } from '@/types';
import { PERMIT_STATUS_BY_API, TANKER_TYPE_BY_CODE } from './fleetMappings';
import { get } from './http';

type ApiPermit = {
  permitNo: string | null;
  permitStatus: string;
  issuedAt: string | null;
  expiry: string | null;
};

type ApiTanker = {
  plateNumber: string;
  tankerType: string;
  ownerName: string;
  inspectionStatus: string | null;
  cardNo: string | null;
  contractType: number | string | null;
  capacityM3: number | null;
  capacityGallons: number | null;
  sizeCategory: number | null;
  governorateId: number | null;
  clusterId: number | null;
  cluster: string | null;
  governorate: string | null;
  wilayat: string | null;
  operationRegion: string | null;
  tfs: string | null;
  contactNumber: string;
  email: string | null;
  dueDate: string | null;
  daysUntilDue: number | null;
  createdAt: string | null;
  submittedAt: string | null;
  permit: ApiPermit | null;
};

type ApiFleetResponse = {
  vehicles: ApiTanker[];
  metaData: { renewalThresholdDays: number };
};

const IN_PROGRESS_INSPECTION_STATES = new Set(['submitted']);

function mapPermit(
  raw: ApiPermit | null,
  inspectionStatus: string | null,
): Permit {
  if (!raw) {
    const status =
      inspectionStatus && IN_PROGRESS_INSPECTION_STATES.has(inspectionStatus)
        ? PERMIT_STATUS.INSPECTION_IN_PROGRESS
        : PERMIT_STATUS.NO_PERMIT;
    return { status, permitNumber: null, issuedAt: null, validUntil: null };
  }
  return {
    status: PERMIT_STATUS_BY_API[raw.permitStatus] ?? PERMIT_STATUS.NO_PERMIT,
    permitNumber: raw.permitNo,
    issuedAt: raw.issuedAt,
    validUntil: raw.expiry,
  };
}

function mapApiTanker(raw: ApiTanker): Tanker {
  return {
    id: raw.plateNumber,
    plateNo: raw.plateNumber,
    owner: raw.ownerName,
    tankerType:
      TANKER_TYPE_BY_CODE[raw.tankerType] ?? TANKER_TYPE.DRINKING_WATER,
    governorate: raw.governorate ?? '',
    cluster: raw.cluster ?? '',
    contact: raw.contactNumber,
    permit: mapPermit(raw.permit, raw.inspectionStatus),
  };
}

export async function fetchFleetTankersApi(): Promise<ApiResponse<Tanker[]>> {
  const response = await get<ApiFleetResponse>(ENDPOINTS.fleetRegistry);
  if (!response.success) return response;
  return { success: true, data: response.data.vehicles.map(mapApiTanker) };
}
