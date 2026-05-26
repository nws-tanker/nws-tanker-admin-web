import { useAppSelector } from '@/store';
import { States } from '@/store/types';

/**
 * undefined = currentUser still loading; null = no cluster restriction (admin);
 * number = user is locked to that cluster.
 */
export function useUserClusterId(): number | null | undefined {
  const { apiState, data } = useAppSelector((s) => s.currentUserApi);
  const resolved = apiState === States.SUCCESS || apiState === States.ERROR;
  if (!resolved) return undefined;
  return data?.clusterId ?? null;
}
