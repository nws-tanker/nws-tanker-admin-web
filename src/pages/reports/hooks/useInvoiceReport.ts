import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchInvoiceReportThunk,
  resetInvoiceReport,
} from '@/store/apiSlices/invoiceReportApiSlice';

export function useInvoiceReport() {
  const dispatch = useAppDispatch();
  const { apiState, data, error } = useAppSelector((s) => s.invoiceReportApi);

  useEffect(() => {
    dispatch(fetchInvoiceReportThunk());
    return () => {
      dispatch(resetInvoiceReport());
    };
  }, [dispatch]);

  return {
    state: apiState,
    data,
    error,
    retry: () => dispatch(fetchInvoiceReportThunk()),
  };
}
