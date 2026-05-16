import { AVATAR_PALETTE } from '@/constants/configuration';
import type { ClusterSetupGovernorate } from '@/types/configuration';

export function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}

export function getGovCountForCluster(
  clusterId: number,
  governorates: ClusterSetupGovernorate[],
  govAssignments: Record<string, number>,
): number {
  return governorates.filter((g) => govAssignments[g.name] === clusterId)
    .length;
}

export function getTankerCountForCluster(
  clusterId: number,
  governorates: ClusterSetupGovernorate[],
  govAssignments: Record<string, number>,
): number {
  return governorates
    .filter((g) => govAssignments[g.name] === clusterId)
    .reduce((s, g) => s + g.dwCount + g.swCount + g.teCount, 0);
}
