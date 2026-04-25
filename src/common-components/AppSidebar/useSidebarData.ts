import { useEffect } from 'react';
import { fetchSidebarData } from '@/store/apiSlices/sidebarApiSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { States } from '@/store/types';

export function useSidebarData() {
  const dispatch = useAppDispatch();
  const { data, apiState } = useAppSelector((s) => s.sidebarApi);

  useEffect(() => {
    if (apiState === States.PRELOADING) {
      dispatch(fetchSidebarData());
    }
  }, [dispatch, apiState]);

  return data;
}
