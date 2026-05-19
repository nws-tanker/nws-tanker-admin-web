// /api/fleet-compliance/inspector-performance
import type { InspectorPerformanceResponse } from '@/types/fleetCompliance';

export const MOCK_INSPECTOR_PERFORMANCE: InspectorPerformanceResponse = {
  total_inspectors: 6,
  rows: [
    {
      inspector_name: 'Salim Al-Hinai',
      cluster: 'Cluster 1',
      inspected: 142,
      rejected: 8,
      permits_issued: 134,
      compliance_rate: 94,
    },
    {
      inspector_name: 'Mariam Al-Zadjali',
      cluster: 'Cluster 1',
      inspected: 104,
      rejected: 6,
      permits_issued: 98,
      compliance_rate: 94,
    },
    {
      inspector_name: 'Fatma Al-Saadi',
      cluster: 'Cluster 2',
      inspected: 118,
      rejected: 4,
      permits_issued: 114,
      compliance_rate: 97,
    },
    {
      inspector_name: 'Hamed Al-Rashdi',
      cluster: 'Cluster 2',
      inspected: 76,
      rejected: 14,
      permits_issued: 62,
      compliance_rate: 82,
    },
    {
      inspector_name: 'Yusuf Al-Balushi',
      cluster: 'Cluster 3',
      inspected: 98,
      rejected: 11,
      permits_issued: 87,
      compliance_rate: 89,
    },
    {
      inspector_name: 'Khalid Al-Farsi',
      cluster: 'Cluster 3',
      inspected: 89,
      rejected: 3,
      permits_issued: 86,
      compliance_rate: 97,
    },
  ],
};
