import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchActiveUsers } from '@/store/apiSlices/activeUsersApiSlice';
import { States } from '@/store/types';

export function useActiveUsers() {
  const dispatch = useAppDispatch();
  const { data, apiState } = useAppSelector((s) => s.activeUsersApi);

  useEffect(() => {
    if (apiState === States.PRELOADING) {
      dispatch(fetchActiveUsers());
    }
  }, [dispatch, apiState]);

  return {
    users: data ?? [],
    state: apiState,
    retry: () => {
      dispatch(fetchActiveUsers());
    },
  };
}
