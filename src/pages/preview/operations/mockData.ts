// PREVIEW ONLY — delete with src/pages/preview/ when real implementation begins.

// Re-uses the same fleet KPIs from the dashboard mock
export { kpi } from '../dashboard/mockData';

export const INSPECTIONS = [
  {
    plate: '1234 M',
    inspector: 'Salim Al-Hinai',
    type: 'DW',
    gov: 'Muscat',
    date: '2 hrs ago',
    status: 'Submitted',
    sCls: 'blue',
  },
  {
    plate: '8821 B',
    inspector: 'Fatma Al-Saadi',
    type: 'SW',
    gov: 'North Batinah',
    date: '4 hrs ago',
    status: 'Lab Pending',
    sCls: 'purple',
  },
  {
    plate: '4456 D',
    inspector: 'Yusuf Al-Balushi',
    type: 'DW',
    gov: 'Dhofar',
    date: '6 hrs ago',
    status: 'Approved',
    sCls: 'green',
  },
  {
    plate: '7790 A',
    inspector: 'Mariam Al-Zadjali',
    type: 'TE',
    gov: 'Al Dakhiliyah',
    date: 'Yesterday',
    status: 'Rejected',
    sCls: 'red',
  },
  {
    plate: '3312 M',
    inspector: 'Hamed Al-Rashdi',
    type: 'SW',
    gov: 'Muscat',
    date: 'Yesterday',
    status: 'Pending',
    sCls: 'gray',
  },
  {
    plate: '5607 N',
    inspector: 'Salim Al-Hinai',
    type: 'DW',
    gov: 'South Batinah',
    date: '2 days ago',
    status: 'Submitted',
    sCls: 'blue',
  },
  {
    plate: '9981 M',
    inspector: 'Khalid Al-Farsi',
    type: 'DW',
    gov: 'Muscat',
    date: '2 days ago',
    status: 'Approved',
    sCls: 'green',
  },
] as const;

export const RENEWALS = [
  { plate: '2201 M', owner: 'Aldar', type: 'DW', exp: '22 Apr 2026', days: 2 },
  { plate: '8112 B', owner: 'Maulam', type: 'SW', exp: '26 Apr 2026', days: 6 },
  {
    plate: '4490 D',
    owner: 'Dhofar Services',
    type: 'TE',
    exp: '02 May 2026',
    days: 12,
  },
  {
    plate: '1998 S',
    owner: 'Salalah Waters',
    type: 'DW',
    exp: '08 May 2026',
    days: 18,
  },
  {
    plate: '5544 A',
    owner: 'Al Mawarid Co.',
    type: 'SW',
    exp: '15 May 2026',
    days: 25,
  },
  {
    plate: '7712 M',
    owner: 'Nizwa Logistics',
    type: 'DW',
    exp: '20 May 2026',
    days: 30,
  },
] as const;
