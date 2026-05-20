import type {
  ClusterSetupCluster,
  ClusterSetupGovernorate,
  GovernorateClusterMapping,
} from '@/types/configuration';

export function sortGovernoratesByCluster(
  governorates: ClusterSetupGovernorate[],
  clusters: ClusterSetupCluster[],
  assignments: Record<string, number>,
): ClusterSetupGovernorate[] {
  const order = new Map(clusters.map((c, i) => [c.clusterId, i]));
  return [...governorates].sort((a, b) => {
    const ai = order.get(assignments[a.name]) ?? Number.MAX_SAFE_INTEGER;
    const bi = order.get(assignments[b.name]) ?? Number.MAX_SAFE_INTEGER;
    return ai - bi;
  });
}

export function buildMappingsPayload(
  governorates: ClusterSetupGovernorate[],
  assignments: Record<string, number>,
): GovernorateClusterMapping[] {
  return governorates
    .filter((g) => assignments[g.name] !== undefined)
    .map((g) => ({ governorateId: g.id, clusterId: assignments[g.name] }));
}

export function countTotalTankers(
  governorates: ClusterSetupGovernorate[],
): number {
  return governorates.reduce(
    (s, g) => s + g.dwCount + g.swCount + g.teCount,
    0,
  );
}
