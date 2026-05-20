import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/store/types';
import type { InvoiceReportResponse, PaymentReportResponse } from '@/types';
import { get } from './http';

export async function fetchInvoiceReport(): Promise<
  ApiResponse<InvoiceReportResponse>
> {
  return get<InvoiceReportResponse>(ENDPOINTS.invoiceReport);
}

export async function fetchPaymentReport(): Promise<
  ApiResponse<PaymentReportResponse>
> {
  return get<PaymentReportResponse>(ENDPOINTS.paymentReport);
}
