import type { InspectionTankerType } from './inspection';

export type InvoiceReportRow = {
  month: string;
  contractor: string;
  tanker_type: InspectionTankerType;
  inspections_approved: number;
  samples_collected: number;
  permits_issued: number;
};

export type InvoiceReportTotals = {
  inspections_approved: number;
  samples_collected: number;
  permits_issued: number;
};

export type InvoiceReportResponse = {
  rows: InvoiceReportRow[];
  totals: InvoiceReportTotals;
};

export type PaymentReportRow = {
  month: string;
  inspector: string;
  contractor: string;
  dw: number;
  sw: number;
  te: number;
  total: number;
};

export type PaymentReportTotals = {
  inspectors: number;
  dw: number;
  sw: number;
  te: number;
  total: number;
};

export type PaymentReportResponse = {
  rows: PaymentReportRow[];
  totals: PaymentReportTotals;
};
