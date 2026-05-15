import { useEffect, useState } from 'react';
import type { ActiveUsersFilters } from '@/services/configurationService';
import { fetchActiveUsersThunk } from '@/store/apiSlices/activeUsersApiSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { States } from '@/store/types';
import type { ActiveUser, UserRole } from '@/types/configuration';

type ActiveUsersState = {
  users: ActiveUser[];
  state: States;
  retry: () => void;
};

export function useActiveUsers(
  filters: ActiveUsersFilters = {},
): ActiveUsersState {
  const dispatch = useAppDispatch();
  const { data, apiState } = useAppSelector((s) => s.activeUsersApi);
  const [version, setVersion] = useState(0);
  const { roleId, clusterId } = filters;

  useEffect(() => {
    dispatch(fetchActiveUsersThunk({ roleId, clusterId }));
  }, [roleId, clusterId, version, dispatch]);

  const users: ActiveUser[] =
    data?.map((u) => ({
      id: u.userID,
      name: u.name,
      role: u.role as UserRole,
      cluster: u.cluster,
      email: u.email,
      mobile: u.mobile,
      status: u.status === 'ACTIVE' ? 'active' : 'inactive',
      lastActive: u.lastActive,
    })) ?? [];

  const retry = () => setVersion((n) => n + 1);

  return { users, state: apiState, retry };
}
