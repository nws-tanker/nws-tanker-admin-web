import { PERMIT_LABELS, TYPE_LABELS } from '@/constants/fleet';
import type { LookupIndex } from '@/hooks/useLookups';
import type {
  Cluster,
  FleetFilters,
  Governorate,
  Inspector,
  SampleCollector,
  Tanker,
} from '@/types';

export const EMPTY_FILTERS: FleetFilters = {
  search: '',
  clusterIds: [],
  governorateIds: [],
  tankerTypes: [],
  permitStatuses: [],
};

/**
 * Given the lookup list of governorates and the currently-selected cluster
 * IDs, returns the governorates available for selection. Empty cluster
 * selection means "all clusters → all governorates".
 */
export function governoratesForClusters(
  governorates: Governorate[],
  selectedClusterIds: string[],
): Governorate[] {
  if (selectedClusterIds.length === 0) return governorates;
  return governorates.filter((g) => selectedClusterIds.includes(g.clusterId));
}

export function filterTankers(
  tankers: Tanker[],
  filters: FleetFilters,
): Tanker[] {
  const q = filters.search.trim().toLowerCase();
  return tankers.filter((t) => {
    if (q) {
      const match =
        t.plateNumber.toLowerCase().includes(q) ||
        t.ownerName.toLowerCase().includes(q) ||
        t.contact.includes(q);
      if (!match) return false;
    }
    if (filters.clusterIds.length && !filters.clusterIds.includes(t.clusterId))
      return false;
    if (
      filters.governorateIds.length &&
      !filters.governorateIds.includes(t.governorateId)
    )
      return false;
    if (
      filters.tankerTypes.length &&
      !filters.tankerTypes.includes(t.tankerType)
    )
      return false;
    if (
      filters.permitStatuses.length &&
      !filters.permitStatuses.includes(t.permit.status)
    )
      return false;
    return true;
  });
}

export function hasActiveFilters(filters: FleetFilters): boolean {
  return Boolean(
    filters.search ||
    filters.clusterIds.length ||
    filters.governorateIds.length ||
    filters.tankerTypes.length ||
    filters.permitStatuses.length,
  );
}

type CsvIndexes = {
  clustersById: LookupIndex<Cluster>;
  governoratesById: LookupIndex<Governorate>;
  inspectorsById: LookupIndex<Inspector>;
  sampleCollectorsById: LookupIndex<SampleCollector>;
};

export function buildCsvRows(
  tankers: Tanker[],
  indexes: CsvIndexes,
): (string | number)[][] {
  const {
    clustersById,
    governoratesById,
    inspectorsById,
    sampleCollectorsById,
  } = indexes;

  return tankers.map((t) => {
    const inspector = t.assignment
      ? (inspectorsById.get(t.assignment.inspectorId)?.name ?? '')
      : '';
    const sampler =
      t.assignment && t.assignment.samplerId
        ? (sampleCollectorsById.get(t.assignment.samplerId)?.name ?? '')
        : '';
    return [
      t.plateNumber,
      t.ownerName,
      TYPE_LABELS[t.tankerType],
      governoratesById.get(t.governorateId)?.name ?? '',
      clustersById.get(t.clusterId)?.name ?? '',
      t.contact,
      PERMIT_LABELS[t.permit.status],
      t.permit.permitNumber ?? '',
      t.permit.issuedAt ?? '',
      t.permit.validUntil ?? '',
      inspector,
      sampler,
    ];
  });
}

export const CSV_HEADER = [
  'Plate No.',
  'Owner',
  'Tanker Type',
  'Governorate',
  'Cluster',
  'Contact',
  'Permit Status',
  'Permit No.',
  'Permit Issued',
  'Permit Expiry',
  'Assigned Inspector',
  'Sample Collector',
];
