import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchPaymentReportThunk,
  resetPaymentReport,
} from '@/store/apiSlices/paymentReportApiSlice';

export function usePaymentReport() {
  const dispatch = useAppDispatch();
  const { apiState, data, error } = useAppSelector((s) => s.paymentReportApi);

  useEffect(() => {
    dispatch(fetchPaymentReportThunk());
    return () => {
      dispatch(resetPaymentReport());
    };
  }, [dispatch]);

  return {
    state: apiState,
    data,
    error,
    retry: () => dispatch(fetchPaymentReportThunk()),
  };
}
