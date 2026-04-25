import { PERMIT_STATUS, TANKER_TYPE } from '@/types';
import type { Lookups } from '@/types';

export const MOCK_LOOKUPS: Lookups = {
  clusters: [
    { id: 'cluster-1', name: 'Cluster 1' },
    { id: 'cluster-2', name: 'Cluster 2' },
    { id: 'cluster-3', name: 'Cluster 3' },
  ],
  governorates: [
    { id: 'gov-muscat', name: 'Muscat', clusterId: 'cluster-1' },
    {
      id: 'gov-north-batinah',
      name: 'North Batinah',
      clusterId: 'cluster-1',
    },
    {
      id: 'gov-south-batinah',
      name: 'South Batinah',
      clusterId: 'cluster-1',
    },
    { id: 'gov-al-buraimi', name: 'Al Buraimi', clusterId: 'cluster-1' },
    {
      id: 'gov-al-dakhiliyah',
      name: 'Al Dakhiliyah',
      clusterId: 'cluster-2',
    },
    { id: 'gov-al-dhahirah', name: 'Al Dhahirah', clusterId: 'cluster-2' },
    {
      id: 'gov-north-sharqiyah',
      name: 'North Sharqiyah',
      clusterId: 'cluster-2',
    },
    { id: 'gov-musandam', name: 'Musandam', clusterId: 'cluster-2' },
    { id: 'gov-dhofar', name: 'Dhofar', clusterId: 'cluster-3' },
    {
      id: 'gov-south-sharqiyah',
      name: 'South Sharqiyah',
      clusterId: 'cluster-3',
    },
    { id: 'gov-al-wusta', name: 'Al Wusta', clusterId: 'cluster-3' },
  ],
  tankerTypes: [
    { id: TANKER_TYPE.DRINKING_WATER, name: 'Drinking Water' },
    { id: TANKER_TYPE.SEWAGE_WATER, name: 'Sewage Water' },
    { id: TANKER_TYPE.TREATED_EFFLUENT, name: 'Treated Effluent' },
  ],
  permitStatuses: [
    { id: PERMIT_STATUS.ACTIVE, name: 'Active' },
    { id: PERMIT_STATUS.EXPIRED, name: 'Expired' },
    { id: PERMIT_STATUS.NO_PERMIT, name: 'No Permit' },
  ],
  inspectors: [
    { id: 'INS-01', name: 'Salim Al-Hinai', clusterId: 'cluster-1' },
    { id: 'INS-02', name: 'Khalid Al-Rawahi', clusterId: 'cluster-1' },
    { id: 'INS-03', name: 'Fatma Al-Zadjali', clusterId: 'cluster-2' },
    { id: 'INS-04', name: 'Omar Al-Siyabi', clusterId: 'cluster-2' },
    { id: 'INS-05', name: 'Ahmed Al-Balushi', clusterId: 'cluster-3' },
    { id: 'INS-06', name: 'Hamed Al-Rashdi', clusterId: 'cluster-3' },
  ],
  sampleCollectors: [
    { id: 'SC-01', name: 'Mariam Al-Zadjali', clusterId: 'cluster-1' },
    { id: 'SC-02', name: 'Aisha Al-Kindi', clusterId: 'cluster-1' },
    { id: 'SC-03', name: 'Tariq Al-Harthi', clusterId: 'cluster-1' },
    { id: 'SC-04', name: 'Yusuf Al-Balushi', clusterId: 'cluster-2' },
    { id: 'SC-05', name: 'Reem Al-Maqbali', clusterId: 'cluster-2' },
    { id: 'SC-06', name: 'Majid Al-Ghafri', clusterId: 'cluster-2' },
    { id: 'SC-07', name: 'Nadia Al-Siyabi', clusterId: 'cluster-3' },
    { id: 'SC-08', name: 'Hussain Al-Rashdi', clusterId: 'cluster-3' },
    { id: 'SC-09', name: 'Layla Al-Amri', clusterId: 'cluster-3' },
  ],
};
