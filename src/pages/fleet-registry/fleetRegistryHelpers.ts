import { PERMIT_LABELS, TYPE_LABELS } from '@/constants/fleet';
import type { Cluster, FleetFilters, Governorate, Tanker } from '@/types';

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
  clusters: Cluster[],
  governorates: Governorate[],
): Tanker[] {
  const q = filters.search.trim().toLowerCase();
  const clusterNames = filters.clusterIds.length
    ? new Set(
        clusters
          .filter((c) => filters.clusterIds.includes(c.id))
          .map((c) => c.name),
      )
    : null;
  const governorateNames = filters.governorateIds.length
    ? new Set(
        governorates
          .filter((g) => filters.governorateIds.includes(g.id))
          .map((g) => g.name),
      )
    : null;

  return tankers.filter((t) => {
    if (q) {
      const match =
        (t.plateNo?.toLowerCase().includes(q) ?? false) ||
        (t.owner?.toLowerCase().includes(q) ?? false) ||
        (t.contact?.includes(q) ?? false);
      if (!match) return false;
    }
    if (clusterNames && !clusterNames.has(t.cluster)) return false;
    if (governorateNames && !governorateNames.has(t.governorate)) return false;
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

export function buildCsvRows(tankers: Tanker[]): (string | number)[][] {
  return tankers.map((t) => [
    t.plateNo,
    t.owner,
    TYPE_LABELS[t.tankerType],
    t.governorate,
    t.cluster,
    t.contact,
    PERMIT_LABELS[t.permit.status],
    t.permit.permitNumber ?? '',
    t.permit.issuedAt ?? '',
    t.permit.validUntil ?? '',
  ]);
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
];
