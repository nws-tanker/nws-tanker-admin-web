// nama/v1/api/master/lookups
import type { Lookups } from '@/types/lookups';

export const MOCK_MASTER_LOOKUPS: Lookups = {
  fiscal_year: [
    {
      year: 2026,
      default: true,
      start: { month: 'May', year: 2025 },
      end: { month: 'Apr', year: 2026 },
    },
    {
      year: 2025,
      start: { month: 'May', year: 2024 },
      end: { month: 'Apr', year: 2025 },
    },
    {
      year: 2024,
      start: { month: 'May', year: 2023 },
      end: { month: 'Apr', year: 2024 },
    },
  ],
  quarters: [
    { quarter: 'Q1', start_month: 'May', end_month: 'Jul' },
    { quarter: 'Q2', start_month: 'Aug', end_month: 'Oct' },
    { quarter: 'Q3', start_month: 'Nov', end_month: 'Jan' },
    { quarter: 'Q4', start_month: 'Feb', end_month: 'Apr' },
  ],
  clusters: [
    { id: 1, name: 'Cluster 1' },
    { id: 2, name: 'Cluster 2' },
    { id: 3, name: 'Cluster 3' },
  ],
  governorates: [
    { id: 1, name: 'Muscat', clusterId: '1' },
    { id: 2, name: 'North Batinah', clusterId: '1' },
    { id: 3, name: 'South Batinah', clusterId: '1' },
    { id: 4, name: 'Al Buraimi', clusterId: '1' },
    { id: 5, name: 'Al Dakhiliyah', clusterId: '2' },
    { id: 6, name: 'Al Dhahirah', clusterId: '2' },
    { id: 7, name: 'North Sharqiyah', clusterId: '2' },
    { id: 8, name: 'Musandam', clusterId: '2' },
    { id: 9, name: 'Dhofar', clusterId: '3' },
    { id: 10, name: 'South Sharqiyah', clusterId: '3' },
    { id: 11, name: 'Al Wusta', clusterId: '3' },
  ],
  tankerTypes: [],
  permitStatuses: [],
  inspectors: [],
  sampleCollectors: [],
};
