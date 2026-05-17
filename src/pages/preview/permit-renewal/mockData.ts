// PREVIEW ONLY — delete with src/pages/preview/ when real implementation begins.

import { kpi, OPERATIONAL } from '../dashboard/mockData';

export { kpi };

export const CLUSTER_REGIONS: Record<string, string[]> = {
  'Cluster 1': ['Muscat', 'North Batinah', 'South Batinah', 'Al Buraimi'],
  'Cluster 2': ['Al Dakhiliyah', 'Al Dhahirah', 'North Sharqiyah', 'Musandam'],
  'Cluster 3': ['Dhofar', 'South Sharqiyah', 'Al Wusta'],
};

export const ALL_CLUSTERS = Object.keys(CLUSTER_REGIONS);

export const INSPECTORS = [
  'Ahmed Al-Balushi',
  'Salim Al-Hinai',
  'Khalid Al-Rawahi',
  'Fatma Al-Zadjali',
  'Omar Al-Siyabi',
  'Hamed Al-Rashdi',
];

const OWNERS = [
  'Ahmed Al-Balushi',
  'Khalid Al-Farsi',
  'Yousuf Al-Kindi',
  'Badar Al-Zaabi',
  'Nasser Al-Rawahi',
  'Hamad Al-Harthi',
  'Talib Al-Siyabi',
  'Hamed Al-Rashdi',
  'Faisal Al-Busaidi',
  'Mansoor Al-Zadjali',
  'Omar Al-Hajri',
  'Waleed Al-Maqbali',
  'Ibrahim Al-Ghafri',
  'Sulaiman Al-Qasmi',
  'Rashid Al-Amri',
];

// Fixed reference date matching the design (2026-04-20)
const TODAY = new Date('2026-04-20T00:00:00Z');
const TODAY_MS = TODAY.getTime();

function pad(n: number, w = 2) {
  return String(n).padStart(w, '0');
}

function addDays(ms: number, n: number) {
  return new Date(ms + n * 86400000).toISOString().split('T')[0];
}

export function daysUntil(iso: string) {
  return Math.ceil((new Date(iso).getTime() - TODAY_MS) / 86400000);
}

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export const H24 = 24 * 3600 * 1000;

export interface Permit {
  id: string;
  plate: string;
  permitNo: string;
  owner: string;
  type: 'DW' | 'SW' | 'TE';
  gov: string;
  cluster: string;
  validUntil: string;
  lastInspector: string;
  lastReminder: number | null;
}

function makePermit(i: number, daysOffset: number): Permit {
  const cluster = ALL_CLUSTERS[i % 3];
  const regions = CLUSTER_REGIONS[cluster];
  const gov = regions[i % regions.length];
  const type = (['DW', 'SW', 'TE'] as const)[i % 3];
  const validUntil = addDays(TODAY_MS, daysOffset);
  let lastReminder: number | null = null;
  const r = i % 5;
  if (r === 1) lastReminder = TODAY_MS - 30 * 3600000;
  if (r === 2) lastReminder = TODAY_MS - 8 * 3600000;
  return {
    id: 'P-' + pad(i + 1, 3),
    plate: `OM ${pad((i * 7 + 11) % 99)} ${String.fromCharCode(65 + (i % 5))}${String.fromCharCode(65 + ((i + 2) % 5))}`,
    permitNo: 'PMT-2026-' + pad(1000 + i, 4),
    owner: OWNERS[i % OWNERS.length],
    type,
    gov,
    cluster,
    validUntil,
    lastInspector: INSPECTORS[i % INSPECTORS.length],
    lastReminder,
  };
}

const _expired = OPERATIONAL.lifecycle.permitsExpiredInQueue; // 18
const _exp7 = OPERATIONAL.kpi.exp7; // 81
const _exp30 = kpi.expiringSoon - _exp7; // 381 - 81 = 300

export const PERMITS: Permit[] = [];
for (let i = 0; i < _expired; i++) PERMITS.push(makePermit(i, -(i + 1)));
for (let i = 0; i < _exp7; i++) PERMITS.push(makePermit(_expired + i, i + 1));
for (let i = 0; i < _exp30; i++)
  PERMITS.push(makePermit(_expired + _exp7 + i, i + 8));
