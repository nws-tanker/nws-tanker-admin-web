import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchTankerUploadColumns } from '@/store/apiSlices/tankerUploadColumnsApiSlice';
import { States } from '@/store/types';

export function useTankerUploadColumns() {
  const dispatch = useAppDispatch();
  const { data, apiState } = useAppSelector((s) => s.tankerUploadColumnsApi);

  useEffect(() => {
    if (apiState === States.PRELOADING) {
      dispatch(fetchTankerUploadColumns());
    }
  }, [dispatch, apiState]);

  return {
    columns: data ?? [],
    state: apiState,
    retry: () => {
      dispatch(fetchTankerUploadColumns());
    },
  };
}
