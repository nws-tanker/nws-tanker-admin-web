import type { Tanker } from '@/types';

const SEED_TANKERS: Tanker[] = [
  {
    id: 'T-0001',
    plateNo: '1234 M',
    owner: 'Ahmed Al-Balushi',
    tankerType: 'drinking_water',
    governorate: 'Muscat',
    cluster: 'Cluster 1',
    contact: '+968 9123 4567',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0001',
      issuedAt: '15 Jan 2026',
      validUntil: '14 Jan 2027',
    },
  },
  {
    id: 'T-0002',
    plateNo: '5521 K',
    owner: 'Khalid Al-Farsi',
    tankerType: 'sewage_water',
    governorate: 'Muscat',
    cluster: 'Cluster 1',
    contact: '+968 9876 1234',
    permit: {
      status: 'expired',
      permitNumber: 'PMT-2025-0042',
      issuedAt: '10 Mar 2025',
      validUntil: '09 Mar 2026',
    },
  },
  {
    id: 'T-0003',
    plateNo: '7734 B',
    owner: 'Yousuf Al-Kindi',
    tankerType: 'drinking_water',
    governorate: 'North Batinah',
    cluster: 'Cluster 1',
    contact: '+968 9234 5678',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0003',
      issuedAt: '20 Feb 2026',
      validUntil: '19 Feb 2027',
    },
  },
  {
    id: 'T-0004',
    plateNo: '0812 M',
    owner: 'Badar Al-Zaabi',
    tankerType: 'treated_effluent',
    governorate: 'Al Dhahirah',
    cluster: 'Cluster 2',
    contact: '+968 9345 6789',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0004',
      issuedAt: '01 Mar 2026',
      validUntil: '28 Feb 2027',
    },
  },
  {
    id: 'T-0005',
    plateNo: '3301 A',
    owner: 'Nasser Al-Rawahi',
    tankerType: 'drinking_water',
    governorate: 'Al Buraimi',
    cluster: 'Cluster 1',
    contact: '+968 9456 7890',
    permit: {
      status: 'no_permit',
      permitNumber: null,
      issuedAt: null,
      validUntil: null,
    },
  },
  {
    id: 'T-0006',
    plateNo: '9982 S',
    owner: 'Hamad Al-Harthi',
    tankerType: 'sewage_water',
    governorate: 'Dhofar',
    cluster: 'Cluster 3',
    contact: '+968 9567 8901',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0006',
      issuedAt: '05 Jan 2026',
      validUntil: '04 Jan 2027',
    },
  },
  {
    id: 'T-0007',
    plateNo: '4456 M',
    owner: 'Salim Al-Hinai',
    tankerType: 'drinking_water',
    governorate: 'Muscat',
    cluster: 'Cluster 1',
    contact: '+968 9678 9012',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0007',
      issuedAt: '12 Feb 2026',
      validUntil: '11 Feb 2027',
    },
  },
  {
    id: 'T-0008',
    plateNo: '6623 K',
    owner: 'Talib Al-Siyabi',
    tankerType: 'drinking_water',
    governorate: 'South Batinah',
    cluster: 'Cluster 1',
    contact: '+968 9789 0123',
    permit: {
      status: 'expired',
      permitNumber: 'PMT-2025-0088',
      issuedAt: '18 Apr 2025',
      validUntil: '17 Apr 2026',
    },
  },
  {
    id: 'T-0009',
    plateNo: '2211 B',
    owner: 'Hamed Al-Rashdi',
    tankerType: 'sewage_water',
    governorate: 'Al Dakhiliyah',
    cluster: 'Cluster 2',
    contact: '+968 9890 1234',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0009',
      issuedAt: '22 Mar 2026',
      validUntil: '21 Mar 2027',
    },
  },
  {
    id: 'T-0010',
    plateNo: '8843 M',
    owner: 'Faisal Al-Busaidi',
    tankerType: 'treated_effluent',
    governorate: 'North Sharqiyah',
    cluster: 'Cluster 2',
    contact: '+968 9901 2345',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0010',
      issuedAt: '08 Jan 2026',
      validUntil: '07 Jan 2027',
    },
  },
  {
    id: 'T-0011',
    plateNo: '1122 A',
    owner: 'Mansoor Al-Zadjali',
    tankerType: 'drinking_water',
    governorate: 'South Sharqiyah',
    cluster: 'Cluster 3',
    contact: '+968 9012 3456',
    permit: {
      status: 'no_permit',
      permitNumber: null,
      issuedAt: null,
      validUntil: null,
    },
  },
  {
    id: 'T-0012',
    plateNo: '5577 S',
    owner: 'Omar Al-Hajri',
    tankerType: 'sewage_water',
    governorate: 'Dhofar',
    cluster: 'Cluster 3',
    contact: '+968 9123 4568',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0012',
      issuedAt: '14 Feb 2026',
      validUntil: '13 Feb 2027',
    },
  },
  {
    id: 'T-0013',
    plateNo: '3398 M',
    owner: 'Waleed Al-Maqbali',
    tankerType: 'drinking_water',
    governorate: 'Muscat',
    cluster: 'Cluster 1',
    contact: '+968 9234 5679',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0013',
      issuedAt: '03 Mar 2026',
      validUntil: '02 Mar 2027',
    },
  },
  {
    id: 'T-0014',
    plateNo: '7701 K',
    owner: 'Ibrahim Al-Ghafri',
    tankerType: 'treated_effluent',
    governorate: 'Al Buraimi',
    cluster: 'Cluster 1',
    contact: '+968 9345 6780',
    permit: {
      status: 'expired',
      permitNumber: 'PMT-2025-0114',
      issuedAt: '25 Jan 2025',
      validUntil: '24 Jan 2026',
    },
  },
  {
    id: 'T-0015',
    plateNo: '4499 B',
    owner: 'Sulaiman Al-Qasmi',
    tankerType: 'drinking_water',
    governorate: 'Musandam',
    cluster: 'Cluster 2',
    contact: '+968 9456 7891',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0015',
      issuedAt: '17 Apr 2026',
      validUntil: '16 Apr 2027',
    },
  },
  {
    id: 'T-0016',
    plateNo: '2266 M',
    owner: 'Abdullah Al-Balushi',
    tankerType: 'sewage_water',
    governorate: 'North Batinah',
    cluster: 'Cluster 1',
    contact: '+968 9567 8902',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0016',
      issuedAt: '09 Feb 2026',
      validUntil: '08 Feb 2027',
    },
  },
  {
    id: 'T-0017',
    plateNo: '8855 A',
    owner: 'Rashid Al-Amri',
    tankerType: 'drinking_water',
    governorate: 'Al Dhahirah',
    cluster: 'Cluster 2',
    contact: '+968 9678 9013',
    permit: {
      status: 'no_permit',
      permitNumber: null,
      issuedAt: null,
      validUntil: null,
    },
  },
  {
    id: 'T-0018',
    plateNo: '6644 S',
    owner: 'Juma Al-Muqaini',
    tankerType: 'treated_effluent',
    governorate: 'Al Wusta',
    cluster: 'Cluster 3',
    contact: '+968 9789 0124',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0018',
      issuedAt: '28 Jan 2026',
      validUntil: '27 Jan 2027',
    },
  },
  {
    id: 'T-0019',
    plateNo: '1188 M',
    owner: 'Said Al-Lawati',
    tankerType: 'drinking_water',
    governorate: 'Muscat',
    cluster: 'Cluster 1',
    contact: '+968 9890 1235',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0019',
      issuedAt: '11 Mar 2026',
      validUntil: '10 Mar 2027',
    },
  },
  {
    id: 'T-0020',
    plateNo: '9933 K',
    owner: 'Mohammed Al-Kalbani',
    tankerType: 'sewage_water',
    governorate: 'South Sharqiyah',
    cluster: 'Cluster 3',
    contact: '+968 9901 2346',
    permit: {
      status: 'expired',
      permitNumber: 'PMT-2025-0120',
      issuedAt: '06 Feb 2025',
      validUntil: '05 Feb 2026',
    },
  },
  {
    id: 'T-0021',
    plateNo: '3312 B',
    owner: 'Turki Al-Wahaibi',
    tankerType: 'drinking_water',
    governorate: 'North Batinah',
    cluster: 'Cluster 1',
    contact: '+968 9112 3450',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0021',
      issuedAt: '19 Jan 2026',
      validUntil: '18 Jan 2027',
    },
  },
  {
    id: 'T-0022',
    plateNo: '7790 M',
    owner: 'Saif Al-Mahrouqi',
    tankerType: 'sewage_water',
    governorate: 'Dhofar',
    cluster: 'Cluster 3',
    contact: '+968 9223 4561',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0022',
      issuedAt: '24 Mar 2026',
      validUntil: '23 Mar 2027',
    },
  },
  {
    id: 'T-0023',
    plateNo: '0044 A',
    owner: 'Hilal Al-Busaidi',
    tankerType: 'drinking_water',
    governorate: 'Muscat',
    cluster: 'Cluster 1',
    contact: '+968 9334 5672',
    permit: {
      status: 'expired',
      permitNumber: 'PMT-2025-0123',
      issuedAt: '13 Apr 2025',
      validUntil: '12 Apr 2026',
    },
  },
  {
    id: 'T-0024',
    plateNo: '5589 K',
    owner: 'Zaher Al-Abri',
    tankerType: 'treated_effluent',
    governorate: 'Muscat',
    cluster: 'Cluster 1',
    contact: '+968 9445 6783',
    permit: {
      status: 'active',
      permitNumber: 'PMT-2026-0024',
      issuedAt: '02 Feb 2026',
      validUntil: '01 Feb 2027',
    },
  },
  {
    id: 'T-0025',
    plateNo: '2277 S',
    owner: 'Qais Al-Riyami',
    tankerType: 'drinking_water',
    governorate: 'Al Wusta',
    cluster: 'Cluster 3',
    contact: '+968 9556 7894',
    permit: {
      status: 'no_permit',
      permitNumber: null,
      issuedAt: null,
      validUntil: null,
    },
  },
];

const GOVERNORATES: Array<{ name: string; cluster: string }> = [
  { name: 'Muscat', cluster: 'Cluster 1' },
  { name: 'North Batinah', cluster: 'Cluster 1' },
  { name: 'South Batinah', cluster: 'Cluster 1' },
  { name: 'Al Buraimi', cluster: 'Cluster 1' },
  { name: 'Al Dakhiliyah', cluster: 'Cluster 2' },
  { name: 'Al Dhahirah', cluster: 'Cluster 2' },
  { name: 'North Sharqiyah', cluster: 'Cluster 2' },
  { name: 'Musandam', cluster: 'Cluster 2' },
  { name: 'Dhofar', cluster: 'Cluster 3' },
  { name: 'South Sharqiyah', cluster: 'Cluster 3' },
  { name: 'Al Wusta', cluster: 'Cluster 3' },
];

const TANKER_TYPES = [
  'drinking_water',
  'sewage_water',
  'treated_effluent',
] as const;

const PERMIT_STATUSES = ['active', 'expired', 'no_permit'] as const;

const FIRST_NAMES = [
  'Ahmed',
  'Khalid',
  'Yousuf',
  'Badar',
  'Nasser',
  'Hamad',
  'Salim',
  'Talib',
  'Hamed',
  'Faisal',
  'Mansoor',
  'Omar',
  'Waleed',
  'Ibrahim',
  'Sulaiman',
  'Abdullah',
  'Rashid',
  'Juma',
  'Said',
  'Mohammed',
  'Turki',
  'Saif',
  'Hilal',
  'Zaher',
  'Qais',
  'Tariq',
  'Yaqoob',
  'Fahad',
  'Majid',
  'Hussain',
  'Sami',
  'Adel',
  'Bader',
  'Issa',
  'Jamal',
  'Khamis',
  'Marwan',
  'Nabil',
  'Raed',
  'Saud',
  'Tamim',
  'Walid',
  'Younis',
  'Zayed',
  'Aziz',
  'Ghassan',
  'Hatim',
];

const LAST_NAMES = [
  'Al-Balushi',
  'Al-Farsi',
  'Al-Kindi',
  'Al-Zaabi',
  'Al-Rawahi',
  'Al-Harthi',
  'Al-Hinai',
  'Al-Siyabi',
  'Al-Rashdi',
  'Al-Busaidi',
  'Al-Zadjali',
  'Al-Hajri',
  'Al-Maqbali',
  'Al-Ghafri',
  'Al-Qasmi',
  'Al-Amri',
  'Al-Muqaini',
  'Al-Lawati',
  'Al-Kalbani',
  'Al-Wahaibi',
  'Al-Mahrouqi',
  'Al-Abri',
  'Al-Riyami',
  'Al-Hadhrami',
  'Al-Mukhaini',
  'Al-Saadi',
  'Al-Habsi',
  'Al-Shukaili',
  'Al-Hashmi',
  'Al-Nabhani',
];

const PLATE_LETTERS = ['M', 'K', 'A', 'S', 'B'];

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Mulberry32 — deterministic PRNG so the generated dataset is stable.
function makeRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function pad(n: number, width: number): string {
  return String(n).padStart(width, '0');
}

function formatDate(day: number, monthIdx: number, year: number): string {
  return `${pad(day, 2)} ${MONTHS[monthIdx]} ${year}`;
}

function generateTanker(index: number): Tanker {
  const rng = makeRng(index * 2654435761);
  const id = `T-${pad(index, 4)}`;
  const gov = pick(rng, GOVERNORATES);
  const tankerType = pick(rng, TANKER_TYPES);
  const owner = `${pick(rng, FIRST_NAMES)} ${pick(rng, LAST_NAMES)}`;
  const plateNo = `${pad(Math.floor(rng() * 10000), 4)} ${pick(rng, PLATE_LETTERS)}`;
  const contact = `+968 9${pad(Math.floor(rng() * 10000000), 7)}`;

  const permitStatus = pick(rng, PERMIT_STATUSES);
  let permit: Tanker['permit'];
  if (permitStatus === 'no_permit') {
    permit = {
      status: 'no_permit',
      permitNumber: null,
      issuedAt: null,
      validUntil: null,
    };
  } else {
    const issuedYear = permitStatus === 'active' ? 2026 : 2025;
    const issuedMonth = Math.floor(rng() * 12);
    const issuedDay = 1 + Math.floor(rng() * DAYS_IN_MONTH[issuedMonth]);
    const validDay = Math.max(1, issuedDay - 1);
    permit = {
      status: permitStatus,
      permitNumber: `PMT-${issuedYear}-${pad(index, 4)}`,
      issuedAt: formatDate(issuedDay, issuedMonth, issuedYear),
      validUntil: formatDate(validDay, issuedMonth, issuedYear + 1),
    };
  }

  return {
    id,
    plateNo,
    owner,
    tankerType,
    governorate: gov.name,
    cluster: gov.cluster,
    contact,
    permit,
  };
}

const TOTAL_TANKERS = 5000;

const GENERATED_TANKERS: Tanker[] = Array.from(
  { length: TOTAL_TANKERS - SEED_TANKERS.length },
  (_, i) => generateTanker(SEED_TANKERS.length + i + 1),
);

export const MOCK_TANKERS: Tanker[] = [...SEED_TANKERS, ...GENERATED_TANKERS];
