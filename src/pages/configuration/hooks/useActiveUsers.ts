import { useEffect, useState } from 'react';
import { fetchActiveUsers } from '@/services/configurationService';
import type { ActiveUsersFilters } from '@/services/configurationService';
// TODO: activeUsersApiSlice not yet created; activeUsersApi not yet in store
// import { useAppSelector } from '@/store';
// import { fetchActiveUsers } from '@/store/apiSlices/activeUsersApiSlice';
import { States } from '@/store/types';
import type { ActiveUser, UserRole } from '../configurationHelpers';

type ActiveUsersState = {
  users: ActiveUser[];
  state: States;
  retry: () => void;
};

export function useActiveUsers(
  filters: ActiveUsersFilters = {},
): ActiveUsersState {
  const [users, setUsers] = useState<ActiveUser[]>([]);
  const [state, setState] = useState(States.LOADING);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState(States.LOADING);

    fetchActiveUsers(filters).then((res) => {
      if (cancelled) return;
      if (res.success) {
        setUsers(
          res.data.map((u) => ({
            id: u.userID,
            name: u.name,
            role: u.role as UserRole,
            cluster: u.cluster,
            email: u.email,
            status: u.status === 'ACTIVE' ? 'active' : 'inactive',
            lastActive: u.lastActive,
          })),
        );
        setState(States.SUCCESS);
      } else {
        setState(States.ERROR);
      }
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.roleId, filters.clusterId, tick]);

  const retry = () => setTick((n) => n + 1);

  return { users, state, retry };
}
