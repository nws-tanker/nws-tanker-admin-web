import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type {
  Lookups,
  PermitStatus,
  PermitStatusLookup,
  TankerType,
  TankerTypeLookup,
} from '@/types';
import { PERMIT_STATUS } from '@/types';
import { PERMIT_STATUS_BY_API, TANKER_TYPE_BY_CODE } from './fleetMappings';
import { get } from './http';

type ApiTankerTypeLookup = { id: string; name: string };
type ApiPermitStatusLookup = { id: string; name: string };

type ApiLookups = Omit<Lookups, 'tankerTypes' | 'permitStatuses'> & {
  tankerTypes: ApiTankerTypeLookup[];
  permitStatuses: ApiPermitStatusLookup[];
};

function mapTankerType(raw: ApiTankerTypeLookup): TankerTypeLookup | null {
  const id = TANKER_TYPE_BY_CODE[raw.id] as TankerType | undefined;
  return id ? { id, name: raw.name } : null;
}

function mapPermitStatus(
  raw: ApiPermitStatusLookup,
): PermitStatusLookup | null {
  const id = PERMIT_STATUS_BY_API[raw.id] as PermitStatus | undefined;
  return id ? { id, name: raw.name } : null;
}

function isPresent<T>(value: T | null): value is T {
  return value !== null;
}

const CLIENT_PERMIT_STATUSES: PermitStatusLookup[] = [
  { id: PERMIT_STATUS.ACTIVE, name: 'Valid' },
  { id: PERMIT_STATUS.EXPIRED, name: 'Expired' },
  { id: PERMIT_STATUS.NO_PERMIT, name: 'No Permit' },
  { id: PERMIT_STATUS.INSPECTION_IN_PROGRESS, name: 'Inspection In Progress' },
];

function mergePermitStatuses(api: PermitStatusLookup[]): PermitStatusLookup[] {
  const seen = new Set(api.map((p) => p.id));
  return [...api, ...CLIENT_PERMIT_STATUSES.filter((p) => !seen.has(p.id))];
}

export async function fetchLookupsApi(): Promise<ApiResponse<Lookups>> {
  const response = await get<ApiLookups>(ENDPOINTS.lookups);
  if (!response.success) return response;
  const { tankerTypes, permitStatuses, ...rest } = response.data;
  return {
    success: true,
    data: {
      ...rest,
      tankerTypes: tankerTypes.map(mapTankerType).filter(isPresent),
      permitStatuses: mergePermitStatuses(
        permitStatuses.map(mapPermitStatus).filter(isPresent),
      ),
    },
  };
}
