// PREVIEW ONLY — delete with src/pages/preview/ when real implementation begins.

export { kpi, types, CLUSTER_TYPES, OPERATIONAL } from '../dashboard/mockData';

// [name, fleet, active, expired, cluster]
// neverInspected = fleet - active - expired; comp% = round(active/fleet*100)
const GOV_RAW = [
  ['Muscat', 648, 583, 18, 'Cluster 1'],
  ['North Batinah', 476, 376, 28, 'Cluster 1'],
  ['South Batinah', 440, 348, 26, 'Cluster 1'],
  ['Al Buraimi', 150, 117, 10, 'Cluster 1'],
  ['Al Dakhiliyah', 480, 370, 44, 'Cluster 2'],
  ['Al Dhahirah', 362, 264, 40, 'Cluster 2'],
  ['North Sharqiyah', 488, 345, 57, 'Cluster 2'],
  ['Musandam', 168, 139, 12, 'Cluster 2'],
  ['Dhofar', 428, 308, 70, 'Cluster 3'],
  ['South Sharqiyah', 396, 238, 92, 'Cluster 3'],
  ['Al Wusta', 218, 145, 43, 'Cluster 3'],
] as const;

export const GOVS = GOV_RAW.map(([name, fleet, active, expired, cluster]) => ({
  name,
  fleet,
  active,
  expired,
  neverInspected: fleet - active - expired,
  comp: Math.round((active / fleet) * 100),
  cluster,
}));

export const INSPECTORS = [
  {
    name: 'Salim Al-Hinai',
    inspected: 142,
    rejected: 8,
    permits: 134,
    compRate: 94,
    cluster: 'Cluster 1',
  },
  {
    name: 'Mariam Al-Zadjali',
    inspected: 104,
    rejected: 6,
    permits: 98,
    compRate: 94,
    cluster: 'Cluster 1',
  },
  {
    name: 'Fatma Al-Saadi',
    inspected: 118,
    rejected: 4,
    permits: 114,
    compRate: 97,
    cluster: 'Cluster 2',
  },
  {
    name: 'Hamed Al-Rashdi',
    inspected: 76,
    rejected: 14,
    permits: 62,
    compRate: 82,
    cluster: 'Cluster 2',
  },
  {
    name: 'Yusuf Al-Balushi',
    inspected: 98,
    rejected: 11,
    permits: 87,
    compRate: 89,
    cluster: 'Cluster 3',
  },
  {
    name: 'Khalid Al-Farsi',
    inspected: 89,
    rejected: 3,
    permits: 86,
    compRate: 97,
    cluster: 'Cluster 3',
  },
] as const;

export const LIFECYCLE_ROWS = [
  {
    plate: '2201 M',
    owner: 'Aldar',
    type: 'DW',
    region: 'Muscat',
    stage: 'Permit Issued',
    sCls: 'green',
    since: '14 Mar 2026',
  },
  {
    plate: '8821 B',
    owner: 'Maulam',
    type: 'SW',
    region: 'N. Batinah',
    stage: 'Under Review',
    sCls: 'amber',
    since: '4 days ago',
  },
  {
    plate: '4490 D',
    owner: 'Dhofar Services',
    type: 'TE',
    region: 'Dhofar',
    stage: 'Permit Issued',
    sCls: 'green',
    since: '22 Feb 2026',
  },
  {
    plate: '7790 A',
    owner: 'Al Waha Co.',
    type: 'DW',
    region: 'Dakhiliyah',
    stage: 'Lab Pending',
    sCls: 'purple',
    since: 'Yesterday',
  },
  {
    plate: '3301 A',
    owner: 'Nasser Al-Rawahi',
    type: 'DW',
    region: 'Al Buraimi',
    stage: 'Inspection In Progress',
    sCls: 'blue',
    since: '23 Apr 2026',
  },
  {
    plate: '3312 K',
    owner: 'Al Rawahi Trans.',
    type: 'DW',
    region: 'Muscat',
    stage: 'Under Review',
    sCls: 'amber',
    since: '21 Apr 2026',
  },
  {
    plate: '7701 K',
    owner: 'Ibrahim Al-Ghafri',
    type: 'TE',
    region: 'Al Buraimi',
    stage: 'Inspection In Progress',
    sCls: 'blue',
    since: '24 Apr 2026',
  },
  {
    plate: '1998 S',
    owner: 'Salalah Waters',
    type: 'DW',
    region: 'Dhofar',
    stage: 'Expired',
    sCls: 'red',
    since: '02 Apr 2026',
  },
  {
    plate: '5544 A',
    owner: 'Al Mawarid',
    type: 'SW',
    region: 'N. Sharqiyah',
    stage: 'Registered',
    sCls: 'gray',
    since: '18 Apr 2026',
  },
  {
    plate: '6677 F',
    owner: 'Gulf Tankers Co.',
    type: 'TE',
    region: 'Al Buraimi',
    stage: 'Inspection Rejected',
    sCls: 'red',
    since: '19 Apr 2026',
  },
  {
    plate: '9912 M',
    owner: 'Gulf Water Co.',
    type: 'DW',
    region: 'Muscat',
    stage: 'Decommissioned',
    sCls: 'gray',
    since: '10 Jan 2026',
  },
] as const;

export const COMPLIANCE_TREND = [
  68, 70, 69, 71, 73, 72, 74, 73, 75, 74, 76, 76,
];
