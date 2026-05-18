import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchOperationInspectionsThunk,
  resetOperationInspections,
} from '@/store/apiSlices/operationInspectionsApiSlice';

export function useOperationInspections(limit: number) {
  const dispatch = useAppDispatch();
  const { apiState, data, error } = useAppSelector(
    (s) => s.operationInspectionsApi,
  );

  useEffect(() => {
    dispatch(fetchOperationInspectionsThunk(limit));
    return () => {
      dispatch(resetOperationInspections());
    };
  }, [dispatch, limit]);

  return {
    state: apiState,
    data,
    error,
    retry: () => dispatch(fetchOperationInspectionsThunk(limit)),
  };
}
