import { useEffect, useState } from 'react';
import { fetchPendingUsersThunk } from '@/store/apiSlices/pendingUsersApiSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { States } from '@/store/types';
import type { PendingRequest } from '@/types/configuration';

type PendingUsersState = {
  requests: PendingRequest[];
  state: States;
  retry: () => void;
};

export function usePendingUsers(): PendingUsersState {
  const dispatch = useAppDispatch();
  const { data, apiState } = useAppSelector((s) => s.pendingUsersApi);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    dispatch(fetchPendingUsersThunk());
  }, [version, dispatch]);

  const retry = () => setVersion((n) => n + 1);

  return {
    requests: data ?? [],
    state: apiState,
    retry,
  };
}
