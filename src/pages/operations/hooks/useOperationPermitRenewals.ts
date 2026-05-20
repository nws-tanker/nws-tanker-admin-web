import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchOperationPermitRenewalsThunk,
  resetOperationPermitRenewals,
} from '@/store/apiSlices/operationPermitRenewalsApiSlice';

export function useOperationPermitRenewals(limit: number) {
  const dispatch = useAppDispatch();
  const { apiState, data, error } = useAppSelector(
    (s) => s.operationPermitRenewalsApi,
  );

  useEffect(() => {
    dispatch(fetchOperationPermitRenewalsThunk(limit));
    return () => {
      dispatch(resetOperationPermitRenewals());
    };
  }, [dispatch, limit]);

  return {
    state: apiState,
    data,
    error,
    retry: () => dispatch(fetchOperationPermitRenewalsThunk(limit)),
  };
}
