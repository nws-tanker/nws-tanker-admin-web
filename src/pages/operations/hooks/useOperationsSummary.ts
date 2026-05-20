import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchOperationsSummaryThunk,
  resetOperationsSummary,
} from '@/store/apiSlices/operationsSummaryApiSlice';

export function useOperationsSummary() {
  const dispatch = useAppDispatch();
  const { apiState, data, error } = useAppSelector(
    (s) => s.operationsSummaryApi,
  );

  useEffect(() => {
    dispatch(fetchOperationsSummaryThunk());
    return () => {
      dispatch(resetOperationsSummary());
    };
  }, [dispatch]);

  return {
    state: apiState,
    data,
    error,
    retry: () => dispatch(fetchOperationsSummaryThunk()),
  };
}
