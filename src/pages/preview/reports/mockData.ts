// PREVIEW ONLY — delete with src/pages/preview/ when real implementation begins.

export const INVOICE = [
  {
    month: 'Apr 2026',
    contractor: 'Cluster 1 · Aldar',
    type: 'DW' as const,
    approved: 142,
    samples: 138,
    permits: 119,
  },
  {
    month: 'Apr 2026',
    contractor: 'Cluster 1 · Aldar',
    type: 'SW' as const,
    approved: 98,
    samples: 0,
    permits: 79,
  },
  {
    month: 'Apr 2026',
    contractor: 'Cluster 1 · Aldar',
    type: 'TE' as const,
    approved: 42,
    samples: 0,
    permits: 34,
  },
  {
    month: 'Apr 2026',
    contractor: 'Cluster 2 · Maulam',
    type: 'DW' as const,
    approved: 122,
    samples: 119,
    permits: 93,
  },
  {
    month: 'Apr 2026',
    contractor: 'Cluster 2 · Maulam',
    type: 'SW' as const,
    approved: 88,
    samples: 0,
    permits: 61,
  },
  {
    month: 'Apr 2026',
    contractor: 'Cluster 2 · Maulam',
    type: 'TE' as const,
    approved: 36,
    samples: 0,
    permits: 22,
  },
  {
    month: 'Apr 2026',
    contractor: 'Cluster 3 · Dhofar Comp.',
    type: 'DW' as const,
    approved: 74,
    samples: 71,
    permits: 71,
  },
  {
    month: 'Apr 2026',
    contractor: 'Cluster 3 · Dhofar Comp.',
    type: 'SW' as const,
    approved: 62,
    samples: 0,
    permits: 59,
  },
  {
    month: 'Apr 2026',
    contractor: 'Cluster 3 · Dhofar Comp.',
    type: 'TE' as const,
    approved: 44,
    samples: 0,
    permits: 43,
  },
] as const;

export const INVOICE_TOTALS = INVOICE.reduce(
  (s, r) => ({
    approved: s.approved + r.approved,
    samples: s.samples + r.samples,
    permits: s.permits + r.permits,
  }),
  { approved: 0, samples: 0, permits: 0 },
);

export const PAYMENT = [
  {
    month: 'Apr 2026',
    inspector: 'Salim Al-Hinai',
    cluster: 'Cluster 1',
    dw: 72,
    sw: 48,
    te: 22,
    total: 142,
  },
  {
    month: 'Apr 2026',
    inspector: 'Fatma Al-Saadi',
    cluster: 'Cluster 2',
    dw: 58,
    sw: 42,
    te: 18,
    total: 118,
  },
  {
    month: 'Apr 2026',
    inspector: 'Yusuf Al-Balushi',
    cluster: 'Cluster 3',
    dw: 44,
    sw: 32,
    te: 22,
    total: 98,
  },
  {
    month: 'Apr 2026',
    inspector: 'Mariam Al-Zadjali',
    cluster: 'Cluster 1',
    dw: 52,
    sw: 38,
    te: 14,
    total: 104,
  },
  {
    month: 'Apr 2026',
    inspector: 'Hamed Al-Rashdi',
    cluster: 'Cluster 2',
    dw: 38,
    sw: 26,
    te: 12,
    total: 76,
  },
  {
    month: 'Apr 2026',
    inspector: 'Khalid Al-Farsi',
    cluster: 'Cluster 3',
    dw: 40,
    sw: 30,
    te: 19,
    total: 89,
  },
] as const;

export const PAYMENT_TOTALS = PAYMENT.reduce(
  (s, r) => ({
    dw: s.dw + r.dw,
    sw: s.sw + r.sw,
    te: s.te + r.te,
    total: s.total + r.total,
  }),
  { dw: 0, sw: 0, te: 0, total: 0 },
);
