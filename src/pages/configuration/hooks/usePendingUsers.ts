import { useEffect, useState } from 'react';
import {
  fetchPendingUsersThunk,
  resetPendingUsers,
} from '@/store/apiSlices/pendingUsersApiSlice';
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
    if (apiState === States.PRELOADING) {
      dispatch(fetchPendingUsersThunk());
    }
  }, [apiState, version, dispatch]);

  const retry = () => {
    dispatch(resetPendingUsers());
    setVersion((n) => n + 1);
  };

  return {
    requests: data ?? [],
    state: apiState,
    retry,
  };
}
